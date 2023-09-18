import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recomndr = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace this URL with the URL of your Python API
    const url = 'http://localhost:5000/api/recomndr';

    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  if (!data) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      {/* Render your data here. This is just an example. */}
      {data.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Recomndr;
