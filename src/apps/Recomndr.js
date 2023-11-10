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
            There are the widgets to focus on at first. This may take a minute
            to load, but it is pulling the data in realtime for you.
            <br />
            <br />
            -Searches TradingView for "Gold" and "US Dollar" respectively,
            compiles a list of article URLs
            <br />
            -Scrapes the articles for text and summarizes a sentiment analysis
            via a series of GPT API calls
            <br />
            -This populates the gauge to display the scores. The needle points
            to the avg, the width of the bar is uncertainty
            <br />
            -This will refresh any time you refresh, and saves the results for
            the algorithm to learn on, but this will <br />
            cost like 1-2 cents in API calls each time so try not to spam it :P
            <br />
            <br />
            We can add more news sources
          </Col>
          <Col sm={5} className="scrollable-column">
          <StockChart />

          This chart is a fake placeholder for not, but I will have all the analysis in this column for at a glance predictions<br/>
          <br />
          The algorithm architecture is complete but the alrgorithms will need time to train and tweak. 
          I will add these changes as we go along. They will not need to preempt "Dave" work or any other.
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
