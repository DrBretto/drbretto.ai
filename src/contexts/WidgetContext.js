import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  widgetOutputs: {},
};

// Actions
const ADD_WIDGET = 'ADD_WIDGET';

// Reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return { ...state, widgets: [...state.widgets, action.payload] };
    default:
      return state;
  }
}

// Create context
const WidgetContext = createContext();

// Create a custom hook to use the WidgetContext, this is just to simplify import in component files
export function useWidgetContext() {
  return useContext(WidgetContext);
}

// Provider component
export function WidgetProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions to be passed in the Provider value prop
  const actions = {
    addWidget: (widget) => dispatch({ type: ADD_WIDGET, payload: widget }),
  };

  return (
    <WidgetContext.Provider value={{ state, actions }}>
      {children}
    </WidgetContext.Provider>
  );
}
