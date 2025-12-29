import dotenv from 'dotenv'
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"
import { app } from './app.js';

import connectDB from "./db/index.js";


dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`server run at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongo db connection failed",err)
})
