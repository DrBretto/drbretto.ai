import React, { useState, useEffect } from 'react';

const StockStrengthIndicator = () => {
  const [stock1Data, setStock1Data] = useState([]);
  const [stock2Data, setStock2Data] = useState([]);

  useEffect(() => {
    const fetchLatestPrediction = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data/latest-prediction');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStock1Data(data.stock1_prediction);
        setStock2Data(data.stock2_prediction);
      } catch (error) {
        console.error('Error fetching latest prediction:', error);
      }
    };

    fetchLatestPrediction();
    const interval = setInterval(fetchLatestPrediction, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const normalizeData = (data) => {
    const maxPrice = Math.max(...data);
    const minPrice = Math.min(...data);
    return data.map(price => (price - minPrice) / (maxPrice - minPrice));
  };
  
  const calculateConfidence = (data1, data2) => {
    const sumChanges = (data) => data.slice(1).reduce((acc, value, index) => acc + (value - data[index]), 0);
  
    const totalChange1 = sumChanges(normalizeData(data1));
    const totalChange2 = sumChanges(normalizeData(data2));
  
    const totalChange = Math.abs(totalChange1) + Math.abs(totalChange2);
    
    if (totalChange === 0) return "Equal confidence in both stocks";
  
    const confidence1 = (Math.abs(totalChange1) / totalChange) * 100;
    const confidence2 = (Math.abs(totalChange2) / totalChange) * 100;
  
    const strongerStock = confidence1 > confidence2 ? "JDST" : "NUGT";
    const confidence = Math.abs(confidence1 - confidence2).toFixed(2);
  
    return `${strongerStock} is preferred with a confidence level of ${confidence}%`;
  };
  

  const getBackgroundColor = (confidenceLevel) => {
    const confidenceValue = parseFloat(confidenceLevel.split("%")[0].split(" ")[5]);
    const alpha = confidenceValue / 100;
    const greenColor = '2C2B3E';
    const blueColor = '2C022B';
    
    return confidenceValue > 50 
      ? `#${greenColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}` 
      : `#${blueColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
  };

  const confidenceLevel = calculateConfidence(stock1Data, stock2Data);
  const backgroundColor = getBackgroundColor(confidenceLevel);

  return (
    <div style={{ textAlign: 'center', backgroundColor, padding: '20px', borderRadius: '10px', color: 'white' }}>
      <h2>Stock Confidence Level</h2>
      <p>{confidenceLevel}</p>
    </div>
  );
};

export default StockStrengthIndicator;