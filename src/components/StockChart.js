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

const StockChart = () => {
  const [stockData, setStockData] = useState([]);

  const mergeStockData = (stock1Data, stock2Data) => {
    return stock1Data.map((item, index) => ({
      date: item.date_time, // Assuming 'date_time' is the common time reference
      JDST: item.normalized_price,
      NUGT: stock2Data[index]?.normalized_price,
    }));
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          'https://api-x0xg.onrender.com/api/stocks/last24hours'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { stock1Data, stock2Data } = await response.json();
        const mergedData = mergeStockData(stock1Data, stock2Data);
        setStockData(mergedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Fetch data every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={stockData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="JDST" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="NUGT" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
