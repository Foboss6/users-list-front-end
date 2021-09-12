import React, { useState } from 'react';

const defaultAdminsContextState = {
  admins: {
    11: {
      id: 11,
      email: '11@i.ua',
      pass: '1234',
    },
    22: {
      id: 22,
      email: '22@i.ua',
      pass: '1234',
    },
    33: {
      id: 33,
      email: '33@i.ua',
      pass: '1234',
    },
  },
};

const defaultAdminsContext = {
  context: defaultAdminsContextState,
  setContext: () => {
    throw new Error('Please add the AdminsContextProvider to your page');
  }
}

export const AdminsContext = React.createContext(defaultAdminsContext);

export const AdminsProvider = ( { children } ) => {
  const [context, setContext] = useState(defaultAdminsContextState);
  return (
    <AdminsContext.Provider
      value={{context, setContext}}
    >
      {children}
    </AdminsContext.Provider>
  )
}

