import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cron from 'node-cron';
import dotenv from 'dotenv';
import fetchCryptoData from '../corn/fetchCrypto.js';
import Crypto from '../models/Crypto.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(' MongoDB error:', err));
await fetchCryptoData();

cron.schedule('0 * * * *', fetchCryptoData); //  every hour 
app.get('/', (req,res)=>{
  res.send("wasddddup")
})

// API route to get latest 15 entries (most recent set)
app.get('/api/latest', async (req, res) => {
  const latest = await Crypto.find().sort({ timestamp: -1 }).limit(15);
  // console.log(latest)
  res.json(latest);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));