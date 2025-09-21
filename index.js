 import express from "express";
 import cors from "cors";


 const app = express();

 const PORT = process.env.PORT || 5000;

 app.get("/",(req,res)=>{
    res.send("hello developer");
 })

 app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
 })