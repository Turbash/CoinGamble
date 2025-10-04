const express= require('express');
const dotenv=require('dotenv');
const path = require('path');
dotenv.config();

const app=express();

const cors = require('cors'); 

const corsOptions = {
    origin: 'https://coin-gamble.vercel.app',    
};

app.use(cors(corsOptions)); 

const dbConnect = require('./db/db');
const userRouter = require('./routers/user');
const coinCollectorRouter = require('./routers/coinCollector');
const coinExpertRouter = require('./routers/coinExpert');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRouter);
app.use('/coins', coinCollectorRouter);
app.use('/expert', coinExpertRouter);

app.get('/',(req,res)=>{
    res.send("Hello World");
});

const startServer = async () => {
  try {
    await dbConnect();
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log(`Server is running on 3000`);
    });

  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

startServer();