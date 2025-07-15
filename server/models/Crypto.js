import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  coin_id: String,
  symbol: String,
  name: String,
  current_price: Number,
  market_cap: Number,
  price_change_24h: Number,
  last_updated: String,
  timestamp: { type: Date, default: Date.now }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
export default Crypto;
