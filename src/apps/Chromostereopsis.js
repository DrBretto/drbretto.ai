import React, { Component } from 'react';
import Sketch from '../components/Sketch';
import '../css/Chromostereopsis.css';

export default class Chromostereopsis extends Component {
  render() {
    function generateRandomData(length) {
      const colors = [];
      const numbers = [];

      for (let i = 0; i < length; i++) {
        // Generate random color
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(color);

        // Generate random number between 0 and 20
        const number = Math.floor(Math.random() * 21);
        numbers.push(number);
      }

      return { colors, numbers };
    }

    let colors1 = generateRandomData(16).colors;
    let colors2 = generateRandomData(16).colors;

    let thicknesses1 = generateRandomData(16).numbers;
    let thicknesses2 = generateRandomData(16).numbers;

    return (
      <div className="Chromostereopsis">
        <div className="header">Chromostereopsis</div>

        <div className="sketchContainer">
          <div>
            <div className="sketchHeader">Sketch 1</div>
            <div className="sketch">
              <Sketch colors={colors1} thicknesses={thicknesses1} />
            </div>
            <button>Choose Sketch 1</button>
          </div>

          <div>
            <div className="sketchHeader">Sketch 2</div>
            <div className="sketch">
              <Sketch colors={colors2} thicknesses={thicknesses2} />
            </div>
            <button>Choose Sketch 2</button>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="submitButton">Submit</button>
        </div>
      </div>
    );
  }
}
