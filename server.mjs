import express from "express";
import mongoose from "mongoose";
import messages from  "./models/dbMessages.mjs";

const app = express();
const port = process.env.PORT || 9000;

//database
const connectionDbURl = "mongodb+srv://admin:RDeL4qWKhlh4Q8S5@cluster0.vq2xgak.mongodb.net/whatsappwebdb?retryWrites=true&w=majority";
//admin
//3!urKGR@U.E@RG2
mongoose.connect(connectionDbURl,
    {
        useCreateIndex : true,
        useNewUrlParser : true,
        useUnifiedTopology: true
    },
(err)=>{
    if(!err) console.log("mongoDB connect");
});

app.get('/api',(req,res) => {
    res.status(200).send("Benvenuto sul server");
});

app.listen(port,()=>{
    console.log(`server start on port: ${port}`);
});