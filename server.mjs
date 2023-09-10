import express from "express";
import mongoose from "mongoose";
import messages from  "./models/dbMessages.mjs";

const app = express();
const port = process.env.PORT || 9000;

//database
const connectionDbURl = "";

app.get('/api',(req,res) => {
    res.status(200).send("Benvenuto sul server");
});

app.listen(port,()=>{
    console.log(`server start on port: ${port}`);
});