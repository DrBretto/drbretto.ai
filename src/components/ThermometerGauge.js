import React from 'react';
import GaugeChart from 'react-gauge-chart';

const ThermometerGauge = ({ low, high, average }) => {
  // Assuming average, low, and high are normalized between -1 and 1

  // Function to blend between two colors based on the average value
  const blendColor = (color1, color2, blendFactor) => {
    let color = `rgb(${
      color1[0] + (color2[0] - color1[0]) * blendFactor
    }, ${
      color1[1] + (color2[1] - color1[1]) * blendFactor
    }, ${
      color1[2] + (color2[2] - color1[2]) * blendFactor
    })`;
    return color;
  };

  // Calculate the blend factor based on the average, where 0.5 is yellow, 1 is green, and 0 is red
  const blendFactor = Math.abs(average); // Absolute value of average for intensity
  const yellow = [255, 255, 0]; // RGB for yellow
  const green = [0, 128, 0]; // RGB for green
  const red = [255, 0, 0]; // RGB for red
  const color = average > 0 ? blendColor(yellow, green, blendFactor) : blendColor(yellow, red, blendFactor);

  return (
    <GaugeChart
      id="gauge-chart"
      nrOfLevels={420}
      arcsLength={[(low + 1) / 2, (high - low) / 2, (1 - high) / 2]} // Define the length of each arc
      colors={['#ddd', color, '#ddd']} // Define the colors for each arc
      percent={(average + 1) / 2} // Position the needle
      arcPadding={0.02}
      textColor={"#fff"}
    />
  );
};

export default ThermometerGauge;
