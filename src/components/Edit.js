import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import useUsersActions from '../hooks/useLocalContextActions'

const Edit = () => {
  
  const history = useHistory();
  const location = useLocation();
  
  // const {users, deleteUser, addNewUser} = useUsersActions();

  //take user ID from pathname
  const splittedPathname = location.pathname.split('/');
  const userToEditId = splittedPathname[splittedPathname.length - 1];

  // const [user, setUser] = React.useState(users[userToEditId]);

  const onInputChange = (event, fieldName) => {
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   [fieldName]: event.target.value
    // }));
  }

  const handleButtonClick = () => {
    // deleteUser(user.id);
    
    // addNewUser({
    //   id: user,
    //   ...user,
    // });

    history.push('/users');
  }
  
  return(
    <div>
      {/* <h3>Edit {user.firstname}'s data</h3>
      <TextField
          id="outlined-helperText-firstname"
          label="First Name"
          defaultValue={user.firstname}
          variant="outlined"
          onChange={(ev) => onInputChange(ev, 'firstname')}
        />
        <TextField
          id="outlined-helperText-lastname"
          label="Larst Name"
          defaultValue={user.lastname}
          variant="outlined"
          onChange={(ev) => onInputChange(ev, 'lastname')}
        />
        <TextField
          id="outlined-helperText-position"
          label="Position"
          defaultValue={user.position}
          variant="outlined"
          onChange={(ev) => onInputChange(ev, 'position')}
        />
        <Button style={{height: '55px'}} variant="contained" onClick={handleButtonClick}>Save</Button> */}
    </div>
  )
}

export default Edit;