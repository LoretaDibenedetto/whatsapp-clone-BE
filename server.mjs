import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import Messages from  "./models/dbMessages.mjs";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

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

app.post("/api/v1/messages", (req,res) =>{
    const dbMessages = req.body;

    Messages.create(dbMessages)
  
    .then((res) => {
    
        console.log(res);
     
    })
    .catch((err) => {
       
           console.log(err);
        });
      
    });
    

   



app.listen(port,()=>{
    console.log(`server start on port: ${port}`);
});