//Import statements
import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"
import { MongoClient } from "mongodb"

//Initializing 
var users;
var sessions;
var profiles;
var db;
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
config()
const port=process.env.PORT
const client=new MongoClient(process.env.MONGO_URI)
async function initialization(){
    try{
        await client.connect();
        db=client.db('app');
        users=db.collection('users');
        profiles=db.collection('profiles');
        sessions=db.collection('sessions');
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

app.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        if(await users.findOne({Email:data.Email})){
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
        if(await users.findOne({Email:data.Email,Password:data.Password})){
            console.log(`${data.Email} signed in `);
            res.send('Succesfully Logged in');
        }else{
            console.log(`${data.Email} login attempt failed`);
            res.send('Incorrect password or email');
        }
    }catch(e){
        console.log(e.message);
        res.send('Login not available right now');
    }
})
//Routes


