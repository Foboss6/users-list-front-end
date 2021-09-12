import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h4>You can go to:</h4>
      <ul>
        <li>
          <Link to='/users'>Users List</Link>
        </li>
        <li>
          <Link to='/users/create'>Add new user</Link>
        </li>
        <li>
          <Link to='/login'>Quit</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;