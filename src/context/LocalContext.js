import React, { useState } from 'react';

const defaultLocalContextState = {
  items: {},
};

const defaultLocalContext = {
  context: defaultLocalContextState,
  setContext: () => {
    throw new Error('Please add the LocalContextxProvider to your page!');
  },
};

export const LocalContext = React.createContext(defaultLocalContext);

export const LocalContextProvider = ({children}) => {
  const [context, setContext] = useState(defaultLocalContextState);
  return (
    <LocalContext.Provider
      value={{
        context,
        setContext,
      }}
    >
    {children}
    </LocalContext.Provider>
  );
}