import React, { useReducer } from 'react';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_FONT_CARD':
      return { ...state, selectedCard: state.selectedCard === payload ? null : payload };
    case 'SET_TABS':
      return { ...state, tabs: payload };
    case 'SET_TAB_CONTENT':
      return { ...state, tabContents: { ...state.tabContents, [payload.id]: payload.data } };
    default:
      throw new Error();
  }
};

const initialState = {
  tabs: [],
  tabContents: {},
  selectedCard: null,
};

const GlobalStateContext = React.createContext();

function GlobalStateProvider({ children }) {
  const [globalState, setGlobalState] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export { GlobalStateContext, GlobalStateProvider };
