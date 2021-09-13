import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import useAdminsActions from '../hooks/useAdminsActions';
import useLocalContextActions from '../hooks/useLocalContextActions';

const PrivateRoute = ({ children, ...props }) => {
  
  const { items } = useLocalContextActions();
  const isLoggedIn = items.CurrentAdmin ? true : false;

  return (
    <Route
      {...props}
      render={() => (
        isLoggedIn 
        ? children
        : <Redirect to='/login' />
      )}
    />
  )
}

export default PrivateRoute;