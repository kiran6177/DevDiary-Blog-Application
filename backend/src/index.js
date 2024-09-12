import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api',userRouter);

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log("Server Listening on PORT ",PORT);
})