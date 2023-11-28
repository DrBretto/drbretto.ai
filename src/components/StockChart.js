import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const fetchStockData = async (stockId) => {
  try {
    const response = await fetch(
      `https://api-x0xg.onrender.com/api/stocks/last24hours?stockSymbol=${stockId}`
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok for stock_id ${stockId}`);
    }
    const rawData = await response.json();
    return normalizeData(rawData);
  } catch (error) {
    console.error(`Error fetching stock data for stock_id ${stockId}:`, error);
    throw error; // Rethrow to handle in calling function
  }
};

const normalizeData = (data) => {
  const prices = data.map(item => item.closing_price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const range = maxPrice - minPrice;

  // Avoid division by zero in case all prices are equal
  return range === 0 
    ? data.map(item => ({ ...item, normalized_price: 0 }))
    : data.map(item => ({
        date: item.date_time,
        normalized_price: ((item.closing_price - minPrice) / range) * 2 - 1
      }));
};

const StockChart = () => {
  const [stockData, setStockData] = useState([]);

   const mergeData = (data1, data2) => {
    // Assuming data1 and data2 are arrays of the same length
    return data1.map((item, index) => ({
      date: item.date,
      JDST: item.normalized_price,
      NUGT: data2[index]?.normalized_price,
    }));
  };

  useEffect(() => {
    const fetchDataForBothStocks = async () => {
      try {
        const stock1Data = await fetchStockData('JDST'); 
        const stock2Data = await fetchStockData('NUGT'); 
        console.log('Raw JDST Data:', stock1Data); // Log for debugging
        console.log('Raw NUGT Data:', stock2Data); // Log for debugging
    

        // Merging the data assumes that both data sets have the same length and corresponding dates
        // If this assumption may not hold, further data processing would be needed
        setStockData(mergeData(stock1Data, stock2Data));
      } catch (error) {
        console.error('Error fetching and processing stock data:', error);
      }
    };

    fetchDataForBothStocks();
    const interval = setInterval(fetchDataForBothStocks, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={stockData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[-1, 1]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="JDST" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="NUGT" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
