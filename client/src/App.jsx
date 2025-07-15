import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const apiKey = import.meta.env.VITE_BASE_URL

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiKey}/api/latest`);
      setCryptoData(res.data);
      console.log(res.data)
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to fetch crypto data:", err);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    },60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
     <div className="App">
      <h1 className="title">📈 Crypto Tracker</h1>
      {lastUpdated && <p className="last-updated">Last updated at: {lastUpdated}</p>}

      <div className="table-container">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Market Cap</th>
              <th>24h %</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map(coin => (
              <tr key={coin._id}>
                <td>{coin.name}</td>
                <td>{coin.symbol.toUpperCase()}</td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td>${coin.market_cap.toLocaleString()}</td>
                <td className={coin.price_change_24h > 0 ? 'positive' : 'negative'}>
                  {coin.price_change_24h?.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;