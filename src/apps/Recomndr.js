import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewsWidget from '../components/NewsWidget';
import StockChart from '../components/StockChart';
import StockStrengthIndicator from '../components/StockStrengthIndicator';

import './Recomndr.css';

const Recomndr = () => {
  return (
    <div className="recomndr-container">
      {/* Set the background color for the entire page */}
      <div className="homepage-background">
        <Container fluid>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <StockChart />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <StockStrengthIndicator />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <NewsWidget source="TradingView" subject="gold" />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <NewsWidget source="TradingView" subject="dollar" />
            </Col>
          </Row>
        </Container>
      </div>
      {/* Footer */}
      <footer bg="dark" variant="dark" className="footer">
        <span></span>
      </footer>
    </div>
  );
};

export default Recomndr;
