import React, { useState, useEffect, useCallback } from 'react';

const FakeTrader = ({ confidenceLevel, stock1Data, stock2Data }) => {
  const [trader, setTrader] = useState({
    cash: 0,
    holdings: '',
    shares: 0,
    lastTradePrice: 0,
    tradeHistory: [],
  });

  const [prices, setPrices] = useState({
    stock1Price: 0,
    stock2Price: 0,
  });

  // Fetch current prices
  const fetchCurrentPrices = useCallback(async () => {
    const fetchPriceForStock = async (symbol) => {
      try {
        console.log(`Fetching the latest price for ${symbol}...`);
        const response = await fetch(
          `http://localhost:8000/api/data/latest-price?symbol=${symbol}`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok for ${symbol}`);
        }
        const data = await response.json();
        console.log(`Latest price for ${symbol}: ${data.price}`);
        return parseFloat(data.price);
      } catch (error) {
        console.error(`Error fetching current price for ${symbol}:`, error);
        return 0;
      }
    };

    try {
      const stock1Price = await fetchPriceForStock('JDST');
      const stock2Price = await fetchPriceForStock('NUGT');
      setPrices({ stock1Price, stock2Price });
      return { stock1Price, stock2Price };
    } catch (error) {
      console.error('Error fetching current prices:', error);
      return { stock1Price: 0, stock2Price: 0 };
    }
  }, []);

  // Save trader data to backend
  const saveTraderData = useCallback(async (traderData) => {
    try {
      console.log('Saving trader data:', traderData);
      const response = await fetch(
        'http://localhost:8000/api/data/save-trader',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(traderData),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Trader data saved successfully');
    } catch (error) {
      console.error('Error saving trader data:', error);
    }
  }, []);

  // Load saved trader data
  useEffect(() => {
    const initializeTrader = async () => {
      try {
        console.log('Loading saved trader data...');
        const response = await fetch(
          'http://localhost:8000/api/data/load-trader'
        );
        if (response.ok) {
          const savedTrader = await response.json();
          console.log('Loaded saved trader data:', savedTrader);
          setTrader(savedTrader);
        } else {
          console.log('No saved trader data found. Initializing with $100...');
          const { stock1Price, stock2Price } = await fetchCurrentPrices();
          const initialStock = confidenceLevel.includes('JDST')
            ? 'JDST'
            : 'NUGT';
          const initialPrice =
            initialStock === 'JDST' ? stock1Price : stock2Price;
          const initialShares = 100 / initialPrice;
          const newTrader = {
            cash: 0,
            holdings: initialStock,
            shares: initialShares,
            lastTradePrice: initialPrice,
            tradeHistory: [
              {
                stock: initialStock,
                price: initialPrice,
                date: new Date(),
                cash: 0,
                shares: initialShares,
              },
            ],
          };
          console.log('Initialized trader data:', newTrader);
          setTrader(newTrader);
          await saveTraderData(newTrader);
        }
      } catch (error) {
        console.error('Error initializing trader:', error);
      }
    };

    initializeTrader();
  }, [confidenceLevel, fetchCurrentPrices, saveTraderData]);

  const performTrade = useCallback(
    (newStock, currentPrice) => {
      console.log(
        `Performing trade. New stock: ${newStock}, Current price: ${currentPrice}`
      );
      setTrader((prevTrader) => {
        let newShares;
        let newCash;
        if (prevTrader.holdings !== '') {
          newCash = prevTrader.shares * currentPrice;
          newShares = newCash / currentPrice;
        } else {
          newShares = prevTrader.cash / currentPrice;
          newCash = 0;
        }

        const tradeHistory = [
          ...prevTrader.tradeHistory,
          {
            stock: newStock,
            price: currentPrice,
            date: new Date(),
            cash: newCash,
            shares: newShares,
          },
        ];
        const updatedTrader = {
          ...prevTrader,
          cash: newCash,
          holdings: newStock,
          shares: newShares,
          lastTradePrice: currentPrice,
          tradeHistory,
        };
        console.log('Updated trader data after trade:', updatedTrader);
        saveTraderData(updatedTrader);

        return updatedTrader;
      });
    },
    [saveTraderData]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentPrices();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [fetchCurrentPrices]);

  useEffect(() => {
    if (stock1Data.length > 0 && stock2Data.length > 0) {
      const newStock = confidenceLevel.includes('JDST') ? 'JDST' : 'NUGT';
      const currentPrice =
        newStock === 'JDST'
          ? stock1Data[stock1Data.length - 1]
          : stock2Data[stock2Data.length - 1];
      console.log(
        `New recommendation: ${newStock}, Current price: ${currentPrice}`
      );
      if (trader.holdings !== newStock || trader.shares === 0) {
        performTrade(newStock, currentPrice);
      } else {
        setTrader((prevTrader) => {
          const updatedTrader = {
            ...prevTrader,
            cash: prevTrader.shares * currentPrice,
            lastTradePrice: currentPrice,
          };
          console.log('Updated trader data without trade:', updatedTrader);
          return updatedTrader;
        });
      }
    }
  }, [
    confidenceLevel,
    stock1Data,
    stock2Data,
    performTrade,
    trader.holdings,
    trader.shares,
  ]);

  return (
    <div>
      <h3>Fake Trader Portfolio</h3>
      <p>
        NUGT: ${prices.stock2Price.toFixed(2)} JDST: $
        {prices.stock1Price.toFixed(2)}
      </p>
      <p>
        Currently Holding: {trader.holdings} - {trader.shares.toFixed(2)} shares
      </p>
      <p>Total Value: ${trader.cash.toFixed(2)}</p>
    </div>
  );
};

export default FakeTrader;
