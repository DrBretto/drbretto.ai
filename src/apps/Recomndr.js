import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewsWidget from '../components/NewsWidget';
import StockChart from '../components/StockChart';

import './Recomndr.css';

const Recomndr = () => {

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={7} className="scrollable-column">
            {/* Example usage of NewsWidget */}
            <NewsWidget source="TradingView" subject="gold" />
            <NewsWidget source="TradingView" subject="dollar" />
            <p>These will now update automatically, you don't need to refresh or anything.
            Instead of constantly processign the same articles over and over again, they now 
            look for new articles on tradingview once per minute, and will only process new ones.
            This will save you time (as it's just pulling the latest valid data) and save a ton on
            GPT processing costs .</p>
            <p>This will be set up so that you can leave a tab open and it will just update automatically.</p>
            <p>I am still optimizing the routes and working on the notification part</p>
            
          </Col>
          <Col sm={5} className="scrollable-column">
          <StockChart />
          <p>This chart is still being developed, but is currently showing the last 24 hours of
          JDST and NUGT and normalizes them to illustrtate the relative movement.  
          The chart is updated every minute, and the data is pulled from the database, which still appears 
          to be yesterday's data (is the AlphaVantage account premium? it's a day behind with the free account).</p>
          </Col>
        </Row>
      </Container>
      {/* Footer */}
      <footer bg="dark" variant="dark" className="footer">
        <span>
          Hover over items for help (but not yet because that's not implemented
          yet)
        </span>
      </footer>
    </div>
  );
};

export default Recomndr;
