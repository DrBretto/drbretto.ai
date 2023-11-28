import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import ThermometerGauge from './ThermometerGauge';

const NewsWidget = ({ source, subject }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const lowerCaseSource = source.toLowerCase();
        const lowerCaseSubject = subject.toLowerCase();
        const response = await fetch(
          `https://api-x0xg.onrender.com/api/sentiment/?subject=${encodeURIComponent(
            lowerCaseSubject
          )}&source=${encodeURIComponent(lowerCaseSource)}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Fetched data:', result); // Log the fetched data
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
      }
      setLoading(false);
    };

    fetchData();

    // Set an interval to refresh the data every 15 minutes
    const interval = setInterval(fetchData, 60 * 1000); // 15 minutes in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [source, subject]); // Dependencies array

  return (
    <Card bg="dark" text="white" className="mb-3 news-widget">
      <Card.Header>
        Source: {source} Subject: {subject}
      </Card.Header>
      <Card.Body className="news-widget-body">
        <Row>
          <Col sm={8} className="summary-scrollable">
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              // Display summary text with scroll
              <div className="summary-text">
                {data ? data.summary : 'No data available'}
              </div>
            )}
          </Col>
          <Col sm={4}>
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : data && data.sentimentScores ? (
              <ThermometerGauge
                low={parseFloat(data.sentimentScores.low)}
                high={parseFloat(data.sentimentScores.high)}
                average={parseFloat(data.sentimentScores.average)}
              />
            ) : (
              <div>No data available</div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default NewsWidget;
