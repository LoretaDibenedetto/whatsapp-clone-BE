import express from "express";


const app = express();
const port = process.env.PORT || 9000;

app.get('/api',(req,res) => {
    res.status(200).send("Benvenuto sul server");
});

app.listen(port,()=>{
    console.log(`server start on port: ${port}`);
});