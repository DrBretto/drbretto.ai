import React from 'react';
import { useBrainSpinalCordContext } from '../contexts/BrainSpinalCordContext';

const MotherBrainOutput = () => {
  const { state } = useBrainSpinalCordContext();
  const { widgetOutputs } = state;

  console.log(state);
  return (
    <div>
      <h2>Mother Brain Output:</h2>
      <ul>
        {Object.entries(widgetOutputs).map(([id, output]) => (
          <li key={id}>
            Widget {id}: {output}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotherBrainOutput;
