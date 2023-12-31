import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import Pusher from "pusher";
import cors from "cors"
dotenv.config();
import Messages from  "./models/dbMessages.mjs";


const pusher = new Pusher({
  appId: "1669203",
  key: "4a923e7496e850c7e247",
  secret: "3eb7e7b105e86fe23eae",
  cluster: "eu",
  useTLS: true
});


const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());


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


const db = mongoose.connection;

db.once('open', function(){
  console.log("db connect");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change",(change) =>{
    console.log(change);
    if(change.operationType === "insert"){
      const record = change.fullDocument;

      pusher.trigger("messages", "inserted", {
        'name': record.name,
        'message': record.message
      });
    }else{
      console.log("not trigger pusher")
    }
  });
});




/*Endpoint */
app.get('/api',(req,res) => {
    res.status(200).send("Benvenuto sul server");
});

app.get('/api/v1/messages/sync',async(req,res)=>{
 
    const data = await Messages.find();
        if (data.error) {
            res.status(500).send(data.error);
          } else {
            res.status(201).send(data);
           
          }
    
  
})

app.post("/api/v1/messages",async (req,res) =>{
    const dbMessages = req.body;
   
    const data = await Messages.create(dbMessages);

    if (data.error) {
      res.status(500).send(data.error);
    } else {
      res.status(201).send(data);
     
    }
})
  
      

    

   



app.listen(port,()=>{
    console.log(`server start on port: ${port}`);
});