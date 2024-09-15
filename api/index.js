//Import statements
import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"

//Initializing 
const app=express()
app.use(bodyParser.urlencoded({extended:True}))
config()
const port=process.env.port

app.listen(port,()=>{
    try{
        console.log(`Server running on port ${port}`)
    }catch(e){
        console.log(`Error running server`)
    }
})

//Routes


