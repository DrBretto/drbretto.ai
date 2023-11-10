import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Fake stock data for 5 days
const fakeStockData = [
  { date: '2023-09-01', stockA: 200, stockB: 250 },
  { date: '2023-09-02', stockA: 210, stockB: 240 },
  { date: '2023-09-03', stockA: 205, stockB: 235 },
  { date: '2023-09-04', stockA: 215, stockB: 255 },
  { date: '2023-09-05', stockA: 220, stockB: 260 },
];

const StockChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={fakeStockData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="stockA" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="stockB" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
