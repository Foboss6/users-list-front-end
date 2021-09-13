import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useLocalContextActions from '../hooks/useLocalContextActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { SERVER_PATH } from '../variables/variables';

const Edit = () => {
  
  const history = useHistory();
  const location = useLocation();
  
  const { items, deleteItem } = useLocalContextActions();

  //take user ID from pathname
  const splittedPathname = location.pathname.split('/');
  const userToEditId = splittedPathname[splittedPathname.length - 1];

  const [user, setUser] = React.useState(items[userToEditId]);

  const onInputChange = (event, fieldName) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: event.target.value
    }));
  }

  const handleButtonClick = () => {
    fetch(`${SERVER_PATH}/users/${userToEditId}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then(data => data.includes('success') ? history.push('/users') : console.log(`The server responded with "${data}"`))
    .catch(console.log);

    // for now, return to '/users' in any case
    history.push('/users');
  }

  React.useEffect(() => {
    // delete user's data from Context when it exactly was load to 'user'
    if(items[userToEditId]) deleteItem(userToEditId);
  }, [user.id])
  
  return(
      !!user.id
      ?
        <div>
          <h3>Edit {user.firstname}'s data</h3>
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
            <Button 
              style={{height: '55px'}} 
              variant="contained" 
              onClick={handleButtonClick}
            >
              Save
            </Button>
        </div>
      :
      <div>
        <h3>An error in loading user's data</h3>
      </div>
  )
}

export default Edit;