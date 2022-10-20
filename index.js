import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRouter from './Routers/postRouter.js';
import authRouter from './Routers/authRouter.js';
import panierRouter from './Routers/panierRouter.js';
import cors from 'cors'
import morgan from "morgan"


dotenv.config();
const app = express();
// Conecter MongoDB
mongoose.connect(process.env.MONGO_DB_URI,() => {
      console.log("Connected to MongoDB");
    }
  );

  app.use(cors({origin:"*"}))
app.use(morgan('tiny'))
app.use(express.json());
app.get('/',(req,res)=>{
  res.send('Hello Freelancer')
});

app.use("/api/users", authRouter);
app.use("/api/post",postRouter);
app.use('/api/panier',panierRouter);
const port = process.env.PORT || 8000;
  app.listen(port, () => {
  console.log(`backend is running at http://localhost:${port}`);
  
})