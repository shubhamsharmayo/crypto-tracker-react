import axios from 'axios';
import Crypto from '../models/Crypto.js';

const fetchCryptoData = async () => {
  try {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&meta_info=VR6'
    );
// console.log(data)
    const mapped = data.map(coin => ({
      coin_id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      price_change_24h: coin.price_change_percentage_24h,
      last_updated: coin.last_updated,
      timestamp: new Date()
    }));

    await Crypto.insertMany(mapped);
    console.log('✅ Crypto data fetched and saved');
  } catch (error) {
    console.error('❌ Failed to fetch data from CoinGecko:', error.message);
  }
};

export default fetchCryptoData;