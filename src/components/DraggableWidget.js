import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useBrainSpinalCordContext } from '../contexts/BrainSpinalCordContext';

const DraggableWidget = ({ id, children, width, height }) => {
  const { actions } = useBrainSpinalCordContext(); // use the context
  const { setWidgetOutput } = actions;

  const [isZoomed, setIsZoomed] = useState(false);
  const [output, setOutput] = useState(Math.random()); // Generate a random output for this instance

  // Set this widget's output in the context when it's created or changes
  useEffect(() => {
    setWidgetOutput(id, output);
  }, [id, output, setWidgetOutput]);

  const toggleZoom = () => {
    console.log('toggleZoom');
    setIsZoomed(!isZoomed);
    console.log('isZoomed', isZoomed);
  };

  const zoomStyle = useSpring({
    transform: isZoomed ? 'scale(2)' : 'scale(1)',
    config: {
      tension: 210,
      friction: 20,
    },
  });

  return (
    <Draggable>
      <a.div
        style={{
          ...zoomStyle,
          width,
          height,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}
        onDoubleClick={toggleZoom}
      >
        {children}
      </a.div>
    </Draggable>
  );
};

export default DraggableWidget;
