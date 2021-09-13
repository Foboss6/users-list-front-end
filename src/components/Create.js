import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { SERVER_PATH } from '../variables/variables.js';

import Button from '@material-ui/core/Button';

import InputForm from './InputForm.js';

const Create = () => {
  const history = useHistory();
  
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    position: ''
  });

  let inputs = [1, 2, 3];

  const initialInputs = (input, inputNumb) => {
    inputs[inputNumb] = input;
  }

  const clearInputs = () => {
    inputs.forEach((input) => {input.value = '';})
  }

  const [isDataValid, setDataValid] = useState(true);
  
  const onInputChange = (event, fieldName) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: event.target.value
    }));
  }

  const handleButtonClick = () => {
    if(user && user.firstname && user.lastname && user.position) {
      setDataValid(true);

      fetch(`${SERVER_PATH}/users/create`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
      .then((res) => res.json())
      .then(data => {
        if(data.id) {
          clearInputs('');
          return history.push('/users');
        } else {
          setDataValid(false);
          return console.log(data);
        }
      })
      .catch(console.log);
 
    } else setDataValid(false);
  }

  return(
    <div>
      <h3>Add new user</h3>
      <div>
        <InputForm label='First name' inputRef={(ev) => initialInputs(ev, 0)} onTextChange={(ev) => onInputChange(ev, 'firstname')} />
        <InputForm label='Last name' inputRef={(ev) => initialInputs(ev, 1)} onTextChange={(ev) => onInputChange(ev, 'lastname')} />
        <InputForm label='Position' inputRef={(ev) => initialInputs(ev, 2)} onTextChange={(ev) => onInputChange(ev, 'position')} />
      </div>
        {!isDataValid ? <p>Enter valid User's Data</p> : <></>}
      <div>
        <Button variant="contained" onClick={handleButtonClick}>SAVE</Button>
      </div>
    </div>
  )
}

export default Create;