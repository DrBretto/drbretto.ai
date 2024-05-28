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

// Function to calculate Simple Moving Average (SMA)
const calculateSMA = (data, dataIndex, windowSize) => {
  const smaValues = [];
  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) {
      smaValues.push(null); // Initial values are null until window size is reached
    } else {
      const sum = data
        .slice(i - windowSize + 1, i + 1)
        .reduce((acc, val) => acc + val[dataIndex], 0);
      const average = sum / windowSize;
      smaValues.push(average);
    }
  }
  return smaValues;
};

const fetchLatestPrediction = async () => {
  try {
    const response = await fetch(
      `https://api-x0xg.onrender.com/api/data/latest-prediction`
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const predictionData = await response.json();
    // Normalize the data
    const maxJDST = Math.max(...predictionData.stock1_prediction);
    const maxNUGT = Math.max(...predictionData.stock2_prediction);
    const minJDST = Math.min(...predictionData.stock1_prediction);
    const minNUGT = Math.min(...predictionData.stock2_prediction);
    const normalizedData = predictionData.stock1_prediction.map(
      (value, index) => ({
        date: `Prediction ${index + 1}`,
        JDST: ((value - minJDST) / (maxJDST - minJDST)) * 100, // Normalize JDST data
        NUGT:
          ((predictionData.stock2_prediction[index] - minNUGT) /
            (maxNUGT - minNUGT)) *
          100, // Normalize NUGT data
      })
    );
    return normalizedData;
  } catch (error) {
    console.error(`Error fetching latest prediction:`, error);
    throw error;
  }
};

const StockChart = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const predictionData = await fetchLatestPrediction();
        console.log('Latest Prediction Data:', predictionData);
        setStockData(predictionData);
      } catch (error) {
        console.error('Error fetching and processing prediction data:', error);
      }
    };

    fetchPredictionData();
    // const interval = setInterval(fetchPredictionData, 60000); // Update every minute

    // return () => clearInterval(interval);
  }, []);
  // Calculate SMA for JDST and NUGT with a window size of 5 (adjust as needed)
  const smaWindowSize = 5;
  const jdstSMA = calculateSMA(stockData, 'JDST', smaWindowSize);
  const nugtSMA = calculateSMA(stockData, 'NUGT', smaWindowSize);

  // Add SMA data to stockData
  const stockDataWithSMA = stockData.map((item, index) => ({
    ...item,
    JDST_SMA: jdstSMA[index],
    NUGT_SMA: nugtSMA[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={stockDataWithSMA}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" hide={true} />
        <YAxis domain={[0, 100]} hide={true} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="JDST"
          stroke="#8884d8"
          strokeWidth={1}
          strokeOpacity={0.25}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="NUGT"
          stroke="#82ca9d"
          strokeWidth={1}
          strokeOpacity={0.25}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="JDST_SMA"
          stroke="blue"
          strokeWidth={3}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="NUGT_SMA"
          stroke="green"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
