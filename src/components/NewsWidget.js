import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import ThermometerGauge from './ThermometerGauge';

const NewsWidget = ({ source, subject }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const mockData = {
  //     sentimentScores: {
  //       low: -0.5,
  //       high: 0.7,
  //       average: 0.4,
  //     },
  //     summary:
  //       subject === 'gold'
  //         ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  //         : 'Short lorem ipsum dolor sit amet, consectetur.',
  //   };
  //   setLoading(true);
  //   // Simulate API call delay
  //   setTimeout(() => {
  //     setData(mockData);
  //     setLoading(false);
  //   }, 1000);
  // }, [source, subject]);

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
  }, [source, subject]);

  return (
    <Card bg="dark" text="white" className="mb-3 news-widget">
      <Card.Header>
        Source: {source} Subject: {subject}
      </Card.Header>
      <Card.Body className="news-widget-body">
        <Row>
          <Col sm={10} className="summary-scrollable">
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              // Display summary text with scroll
              <div className="summary-text">
                {data ? data.summary : 'No data available'}
              </div>
            )}
          </Col>
          <Col sm={2}>
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

            {data && data.sentimentScores && (
              <div className="sentiment-summary">
                {parseFloat(data.sentimentScores.average) >= 0
                  ? `${(parseFloat(data.sentimentScores.average) * 100).toFixed(
                      0
                    )}% Positive`
                  : `${Math.abs(
                      parseFloat(data.sentimentScores.average) * 100
                    ).toFixed(0)}% Negative`}
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default NewsWidget;
