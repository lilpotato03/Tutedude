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
        sessions=db.collection('sessions');//user-sessions collection 
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
    const secret=process.env.JWT_SECRET;
    const payload={Email:req.body.Email}
    const token=jwt.sign(payload,secret);
    return token;
}
async function verifyToken(req,res,next){
    try{
        const secret=process.env.JWT_SECRET
        const result=jwt.verify(req.cookies.token,secret);
        res.status(400).send(result);
        next();
    }catch(e){
        res.status(400).send('Not authorized');
    }
}
//Routes
app.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        if(await users.findOne({Email:data.Email})){ //Checiking if email exists
            console.log(await users.findOne({Email:data.Email}))
            res.send('User already exists,try logging in');
        }else{
            await users.insertOne(data);
            res.send('User succesfully signed up');
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
            res.cookie("token",token);
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

app.post('/verify',verifyToken,(req,res)=>{

})


