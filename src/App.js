import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Home from './components/Home.js'
import Users from './components/Users.js';
import Create from './components/Create.js';
import Edit from './components/Edit.js';
import Login from './components/Login'
import Header from './components/Header'

import PrivateRoute from './hocs/PrivateRoute'

import { LocalContextProvider } from './context/LocalContext';
import { AdminsProvider } from './context/AdminsContext';

const App = () => {
  
  // for controll working of server
  React.useEffect(() => {
    fetch('https://users-list-server.herokuapp.com/users')
    .then(response => response.json())
    .then(console.log)
    .catch(console.log);
  });

  return (
    <AdminsProvider>
      <LocalContextProvider>
      <Header />
      <Switch>
          <PrivateRoute exact path='/'>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path='/users'>
            <Users />
          </PrivateRoute>
          <PrivateRoute exact path='/users/create'>
            <Create />
          </PrivateRoute>
          <PrivateRoute exact path='/users/:id'>
            <Edit />
          </PrivateRoute>
          <Route path='/login' component={Login} />
        </Switch>
      </LocalContextProvider>
    </AdminsProvider>
  );
}

export default App;
