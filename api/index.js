//Import statements
import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"
import { MongoClient } from "mongodb"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

//Initializing 
var users;
var sessions;
var profiles;
var db;
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
config()
const port=process.env.PORT//PORT
const client=new MongoClient(process.env.MONGO_URI)//New Client
async function initialization(){
    try{
        await client.connect();//connecting to mongo atlas
        db=client.db('app');//connecting to db
        users=db.collection('users');//users collection
        profiles=db.collection('profiles');//profiles collection
        console.log('Initialized');
    }catch(e){
        console.log('Error initializing')
        console.log(e.message);
    }
}
initialization();

app.listen(port,()=>{
    try{
        console.log(`Server running on port ${port}`)
    }catch(e){
        console.log(`Error running server`)
    }
})

async function createToken(req,res){
    try{const secret=process.env.JWT_SECRET;
    const payload={Email:req.body.Email}
    const doc=await users.findOne({Email:req.body.Email})
    if(doc.Username){
        payload['Username']=doc.Username;
    }
    const token=jwt.sign(payload,secret);
    return token;}catch(e){
        console.log(e.message);
    }
}
async function verifyToken(req,res,next){
    try{
        const secret=process.env.JWT_SECRET
        const result=jwt.verify(req.cookies.token,secret);
        console.log(result);
        next();
    }catch(e){
        res.status(400).send('Not authorized');
    }
}
//Routes
app.get('/',async(req,res)=>{
    try{
        res.send('You hit the server succesfully')
    }catch(e){
        res.send('Failed to connect to server properly')
    }
})
app.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        if(await users.findOne({Email:data.Email})){ //Checiking if email exists
            console.log(await users.findOne({Email:data.Email}))
            res.send('User already exists,try logging in');
        }else{
            await users.insertOne(data);
            const token=await createToken(req,res);
            res.cookie("token",token,{expires: new Date(Date.now() + 1000*60*60*24*2)});
            res.status(200).send('User succesfully signed up');
            console.log(`Added user ${data.Email}`)
        }
    }catch(e){
        console.log(e.message);
        res.send('Signup not available right now');
    }
})
app.post('/login',async(req,res)=>{
    try{
        const data=req.body;
        if(await users.findOne({Email:data.Email,Password:data.Password})){//Checking for user
            console.log(`${data.Email} signed in `);
            const token=await createToken(req,res);
            res.cookie("token",token,{expires: new Date(Date.now() + 1000*60*60*24*2)});
            res.status(200).send('Succesfully Logged in');
        }else{
            console.log(`${data.Email} login attempt failed`);
            res.send('Incorrect password or email');
        }
    }catch(e){
        console.log(e.message);
        res.send('Login not available right now');
    }
})

app.post('/setup_profile',verifyToken,async (req,res)=>{
    try{
        const user_data=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        const data=req.body;
        if(await profiles.findOne({Username:data.Username})){
            res.status(200).send('Username already exists,choose another one');
        }else{
            await profiles.insertOne({
                Username:data.Username,
                Email:user_data.Email,
                Bio:data.Bio,
                Interest:data.Interests,
                Requests:[],
                Friends:[]
            })
            await users.updateOne({Email:user_data.Email},{$set:{
                Username:data.Username
            }})
            const token=jwt.sign({Email:user_data.Email,Username:data.Username},process.env.JWT_SECRET)
            res.cookie("token",token,{expires: new Date(Date.now() + 1000*60*60*24*2)});
            res.status(200).send(`Added ${data.Username}'s profile`)
        }
    }catch(e){
        res.status(400).send('Something went wrong');
        console.log(e.message);
    }
})
app.get('/verify',verifyToken,async (req,res)=>{
    try{const secret=process.env.JWT_SECRET
    const result=jwt.verify(req.cookies.token,secret);
    res.status(200).send(result);
    }
    catch(e){
        res.status(300).send('Something went wrong');
        console.log(e.message);
    }
})

app.get('/recommend', verifyToken, async (req, res) => {
    try {
        const secret = process.env.JWT_SECRET;
        const result = jwt.verify(req.cookies.token, secret);
        const user_prof = await profiles.findOne({ Username: result.Username });
        const user_friends = user_prof.Friends ? user_prof.Friends : [];
        const user_interests = user_prof.Interest ? user_prof.Interest : [];
        let pot_profiles;
        if (user_friends.length !== 0) {
            pot_profiles = await profiles.find({ Username: { $nin: user_friends } });
        } else {
            pot_profiles = await profiles.find({ Username: { $ne: user_prof.Username } });
        }
        pot_profiles=await pot_profiles.toArray();
        const ranked_profs = pot_profiles.map((profile) => {
            const profileFriends = profile.Friends ? profile.Friends : [];
            const profileInterests = profile.Interest ? profile.Interest : [];
            const mutuals = profileFriends.filter((friend) => user_friends.includes(friend));
            const commonInterests = profileInterests.filter((interest) => user_interests.includes(interest));
            const noncommonInterests=profileInterests.filter((interest) => !user_interests.includes(interest));
            return {
                Username:profile.Username,
                Mutuals: mutuals.length,
                M_Interests: commonInterests,
                N_Interests:noncommonInterests
            };
        });
        ranked_profs.sort((a, b) => {
            if (b.Mutuals === a.Mutuals) {
                return b.M_Interests.length - a.M_Interests.length;
            }
            return b.Mutuals - a.Mutuals;
        });
        const limitedResults = ranked_profs.slice(0, 10);
        res.status(200).json(limitedResults);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/search',verifyToken,async (req,res)=>{
    try{const phrase=req.body.Phrase
    const result=await profiles.find({Username:{$regex: '^' +phrase,$options: 'i'}})
    const final=await result.toArray()
    const send=await final.map((item)=>{
        return {
            Username:item.Username
        }
    })
    console.log(send)
    res.status(200).send(send)}
    catch(e){
        console.log(e.messgae);
    }
})
app.post('/send_request',verifyToken,async(req,res)=>{
    try{
        const user_data=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        const Sender=user_data.Username;
        const data=req.body
        const rec=await profiles.findOne({Username:data.Receiver})
        if(!rec.Requests.includes(Sender)&&Sender!==data.Receiver){
            await profiles.updateOne({Username:data.Receiver},{$addToSet:{ Requests:Sender}})
        }
        res.send('Succesfully request')
    }catch(e){
        console.log(e.message)
    }
})

app.get('/inbox',verifyToken,async(req,res)=>{
    try{const user_data=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
    const user=await profiles.findOne({Username:user_data.Username});
    const final=user.Requests.map((req)=>{
        return {Username:req}
    })
    console.log(final);
    res.send(final);
    }catch(e){
        console.log(e.message)
    }
})
app.post('/add_friend',verifyToken,async(req,res)=>{
    try{
        const user_data=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        const Sender=user_data.Username;
        const data=req.body
        const rec=await profiles.findOne({Username:data.Receiver})
        if(!rec.Friends.includes(Sender)&&Sender!==data.Receiver){
            await profiles.updateOne({Username:data.Receiver},{$addToSet:{Friends:Sender},$pull: {Requests: Sender}})
            await profiles.updateOne({Username:Sender},{$addToSet:{Friends:data.Receiver}})
        }
        res.send('Succesfully request')
    }catch(e){
        console.log(e.message)
    }
})
app.get('/sign_out',verifyToken,async(req,res)=>{
    try{
        res.clearCookie('token');
        res.send('Logged Out');
    }catch(e){
        res.send('Error signing Out')
    }
})
