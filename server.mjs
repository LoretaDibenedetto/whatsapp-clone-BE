import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import Messages from  "./models/dbMessages.mjs";

const app = express();
const port = process.env.PORT || 9000;

//database
const MONGO_URI = "mongodb+srv://admin:8RdCpQbAXbdyFLdd@cluster0.kezrngw.mongodb.net/MyDB?retryWrites=true&w=majority";
//admin
//const url = process.env.MONGO_URL
mongoose.connect(MONGO_URI,
     {
        
        useNewUrlParser: true, 
        useUnifiedTopology: true 
     })
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log("N", err);
});

app.get('/api',(req,res) => {
    res.status(200).send("Benvenuto sul server");
});

app.listen(port,()=>{
    console.log(`server start on port: ${port}`);
});