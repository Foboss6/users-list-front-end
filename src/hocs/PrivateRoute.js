import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import useAdminsActions from '../hooks/useAdminsActions';

const PrivateRoute = ({ children, ...props }) => {
  
  const {admins} = useAdminsActions();
  const isLoggedIn = admins.CurrentAdmin ? true : false;

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