import React, { useState } from 'react';

const defaultUsersContextState = {
  users: {},
};

export const defaultUsersContext = {
  context: defaultUsersContextState,
  setContext: () => {
    throw new Error('Please add the UsersContextxProvider to your page!');
  },
};

export const UsersContext = React.createContext(defaultUsersContext);

export const UsersProvider = ({children}) => {
  const [context, setContext] = useState(defaultUsersContextState);
  return (
    <UsersContext.Provider
      value={{
        context,
        setContext,
      }}
    >
    {children}
    </UsersContext.Provider>
  );
}