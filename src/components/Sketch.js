import React from 'react';
import p5 from 'p5';

class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth / 2, p.windowHeight / 1.5);
      p.background(0);
    };

    p.draw = () => {
      p.background(0);
      let centerX = p.width / 2;
      let centerY = p.height / 2;
      let radius = Math.min(p.width, p.height) / 2.25;

      for (let i = 0; i < this.props.colors.length; i++) {
        p.stroke(this.props.colors[i]);
        p.strokeWeight(this.props.thicknesses[i]);
        p.noFill();
        p.circle(centerX, centerY, radius * 2);
        radius -= this.props.thicknesses[i];
      }
      p.noLoop();
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  componentDidUpdate() {
    this.myP5.remove();
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  componentWillUnmount() {
    this.myP5.remove();
  }

  render() {
    return <div ref={this.myRef}>{/* Your component goes here */}</div>;
  }
}

export default Sketch;
