import React, { useState, useEffect, useCallback } from 'react';

const FakeTrader = ({ confidenceLevel }) => {
  const [prices, setPrices] = useState({ stock1Price: 0, stock2Price: 0 });
  const [trader, setTrader] = useState({
    cash: 0,
    holdings: '',
    shares: 0,
    purchasePrice: 0,
    portfolioValue: 0,
    tradeHistory: [],
  });

  const fetchCurrentPrices = useCallback(async () => {
    try {
      const response1 = await fetch(
        'http://localhost:8000/api/data/latest-price?symbol=JDST'
      );
      const data1 = await response1.json();
      const response2 = await fetch(
        'http://localhost:8000/api/data/latest-price?symbol=NUGT'
      );
      const data2 = await response2.json();
      setPrices({
        stock1Price: parseFloat(data1.price) || 0,
        stock2Price: parseFloat(data2.price) || 0,
      });
    } catch (error) {
      console.error('Error fetching current prices:', error);
    }
  }, []);

  const saveTraderData = useCallback(async (traderData) => {
    try {
      await fetch('http://localhost:8000/api/data/save-trader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(traderData),
      });
    } catch (error) {
      console.error('Error saving trader data:', error);
    }
  }, []);

  const initializeTrader = useCallback(
    (initialStock, initialPrice) => {
      const initialShares = 100 / initialPrice;
      const initialTraderData = {
        cash: 0,
        holdings: initialStock,
        shares: initialShares,
        purchasePrice: initialPrice,
        portfolioValue: 100,
        tradeHistory: [
          {
            timestamp: new Date().toISOString(),
            action: `Initialized with ${initialStock}`,
            shares: initialShares,
            purchasePrice: initialPrice,
          },
        ],
      };
      setTrader(initialTraderData);
      saveTraderData(initialTraderData);
    },
    [saveTraderData]
  );

  const fetchTraderData = useCallback(async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/api/data/load-trader'
      );
      const data = await response.json();
      if (data && data.holdings) {
        setTrader(data);
      } else {
        const preferredStock = confidenceLevel.includes('JDST')
          ? 'JDST'
          : 'NUGT';
        const initialPrice =
          preferredStock === 'JDST' ? prices.stock1Price : prices.stock2Price;
        if (initialPrice > 0) {
          initializeTrader(preferredStock, initialPrice);
        }
      }
    } catch (error) {
      console.error('Error loading trader data:', error);
    }
  }, [
    confidenceLevel,
    prices.stock1Price,
    prices.stock2Price,
    initializeTrader,
  ]);

  useEffect(() => {
    fetchCurrentPrices();
    fetchTraderData();
  }, [fetchCurrentPrices, fetchTraderData]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentPrices();
      fetchTraderData();
    }, 900000); // 15 minutes in milliseconds
    return () => clearInterval(interval);
  }, [fetchCurrentPrices, fetchTraderData]);

  useEffect(() => {
    if (trader.holdings && prices.stock1Price > 0 && prices.stock2Price > 0) {
      const currentPrice =
        trader.holdings === 'JDST' ? prices.stock1Price : prices.stock2Price;
      const portfolioValue = trader.shares * currentPrice;
      if (portfolioValue !== trader.portfolioValue) {
        const newTradeEntry = {
          timestamp: new Date().toISOString(),
          action: `Updated portfolio value`,
          shares: trader.shares,
          purchasePrice: currentPrice,
        };
        const updatedTrader = {
          ...trader,
          portfolioValue,
          tradeHistory: [...trader.tradeHistory, newTradeEntry],
        };
        setTrader(updatedTrader);
        saveTraderData(updatedTrader);
      }
    }
  }, [
    trader,
    prices,
    trader.portfolioValue,
    trader.holdings,
    trader.shares,
    saveTraderData,
  ]);

  useEffect(() => {
    const recommendedStock = confidenceLevel.includes('JDST') ? 'JDST' : 'NUGT';
    if (trader.holdings && trader.holdings !== recommendedStock) {
      const currentPrice =
        trader.holdings === 'JDST' ? prices.stock1Price : prices.stock2Price;
      const cashFromSale = trader.shares * currentPrice;
      const newPrice =
        recommendedStock === 'JDST' ? prices.stock1Price : prices.stock2Price;
      const newShares = cashFromSale / newPrice;

      const newTraderData = {
        cash: 0,
        holdings: recommendedStock,
        shares: newShares,
        purchasePrice: newPrice,
        portfolioValue: newShares * newPrice,
        tradeHistory: [
          ...trader.tradeHistory,
          {
            timestamp: new Date().toISOString(),
            action: `Traded ${trader.holdings} for ${recommendedStock}`,
            shares: newShares,
            purchasePrice: newPrice,
          },
        ],
      };

      setTrader(newTraderData);
      saveTraderData(newTraderData);
    }
  }, [
    trader.tradeHistory,
    confidenceLevel,
    prices.stock1Price,
    prices.stock2Price,
    trader.holdings,
    trader.shares,
    saveTraderData,
  ]);

  return (
    <div>
      <h3>Fake Trader Portfolio</h3>
      <p>
        NUGT: ${prices.stock2Price.toFixed(2)} JDST: $
        {prices.stock1Price.toFixed(2)}
      </p>
      <p>
        Currently Holding: {trader.holdings} - {trader.shares.toFixed(6)} shares
      </p>
      <p>Total Value: ${trader.portfolioValue.toFixed(2)}</p>
      <h4>Trade History</h4>
      {trader.tradeHistory && trader.tradeHistory.length > 0 && (
        <p>
          {trader.tradeHistory[trader.tradeHistory.length - 1].timestamp}:{' '}
          {trader.tradeHistory[trader.tradeHistory.length - 1].action} -{' '}
          {trader.tradeHistory[trader.tradeHistory.length - 1].shares.toFixed(
            6
          )}{' '}
          shares at $
          {trader.tradeHistory[
            trader.tradeHistory.length - 1
          ].purchasePrice.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default FakeTrader;
