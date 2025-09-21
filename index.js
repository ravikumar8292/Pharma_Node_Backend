import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import {syncDb} from "./src/models/index.js"

const PORT = process.env.PORT || 5000;

syncDb()
   .then(()=>{
      app.listen(PORT, ()=>{
         console.log(`Server running on port ${PORT}`);
      });
   })

   .catch((err)=>{
      console.error("DB sync error:", err)
   })