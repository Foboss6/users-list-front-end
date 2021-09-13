import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useAdminsActions from '../hooks/useAdminsActions';
import useLocalContextActions from '../hooks/useLocalContextActions';
import { SERVER_PATH } from '../variables/variables';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  paperRoot: {
    margin: '10% auto',
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    background: 'transparent',
  },
  button: {
    margin: '10px 0px 20px 0px',
    width: '30%',
  },
  input: {
    width: '60%',
  },
});

const Login = () => {
  
  const history = useHistory();
  
  const { admins, addNewAdmin, deleteAdmin } = useAdminsActions();

  const { items, addNewItem, deleteItem } = useLocalContextActions();

  // ***** For tabs *******************************
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  // **********************************************

  // ******** For BOTH tabs ***********************************
  
  const [helperText, setHelperText] = useState({
    helperTextEmail: '',
    helperTextPass: '',
    helperTextPassConfirm: '',
  });

  const emailValidation = (email) => (
    /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)
    ? true
    : false
  );

  const handleEmailBlur = (event) => {
    if(event.target.value) {
      // if email was entered go to its validation
      if (emailValidation(event.target.value)) {
        //If email is valid, write it to local context and clear an error
        setAdmin((prevState) => ({
          ...prevState,
          email: event.target.value,
        }));
        
        setHelperText((prevState) => ({
          ...prevState,
          helperTextEmail: '',
        }));
      } else {
        // If email is not valid go out with error
        setHelperText((prevState) => ({
          ...prevState,
          helperTextEmail: 'Enter a valid email',
        }));
      }
    } else {
      // if email wasn't entered go out with error
      setHelperText((prevState) => ({
        ...prevState,
        helperTextEmail: 'Enter an email',
      }));
    }
  }
  // ***********************************************************

  // ******** For INPUT tab ************************************
  const [credentials = {}, setCredentials] = useState();

  const onInputChange = (event, fieldName) => {
    setCredentials((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value
    }));
  }

  const handleLoginPassBlur = (event) => {
    if(!event.target.value) {
      setHelperText((prevState) => ({
        ...prevState,
        helperTextPass: 'Enter password',
      }));
    } else {
      setHelperText((prevState) => ({
        ...prevState,
        helperTextPass: '',
      }));
    }
  }

  const handleLogInButtonClick = () => {
    if(credentials.loginEmail && credentials.loginPassword) {
      fetch(`${SERVER_PATH}/login`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
      })
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        if(data.id) {
          addNewItem({
            ...data,
            id: 'CurrentAdmin',
          })
          return history.push('/');
        } else {
          console.log(data);
          return (
            setHelperText((prevState) => ({
              ...prevState,
              helperTextEmail: 'Invalid login data',
              helperTextPass: 'Invalid login data',
            }))
          );
        }
      })
      .catch(console.log);
    } 
  }
  // **********************************************************

  // ******** For REGISTER tab ***********************************
  const [registerData, setRegisterData] = useState();

  const [checkState, setChecState] = useState(true);

  const handleRegisterButtonClick = () => {
    if( checkEmail() && checkPassword() && checkUsersData() ) {
      fetch(`${SERVER_PATH}/login/register`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.id) {
          console.log(data);
        } else console.log(data);
      })
    } 
  }

  const setHelper = (fieldName, text) => {
    setHelperText((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
    
    if(text) return false;
    else return true;
  }

  const checkEmail = () => {
    if( !credentials.email ) {
      updateCredentials({isEmailChecked: false});
      return setHelper('helperTextEmail', 'Enter email');}
    
    if( !(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(credentials.email)) ) {
      updateCredentials({isEmailChecked: false});
      return setHelper('helperTextEmail', 'Enter valid email');}

    return true;
  }

  const checkPassword = () => {
    setHelper('helperTextPass', '');
    setHelper('helperTextPassConfirm', '');
    
    if( !credentials.password ) return setHelper('helperTextPass', 'Enter password');
    if( !credentials.passwordConfirm ) return setHelper('helperTextPassConfirm', 'Enter confirm password');

    if( credentials.password.length < 6 ) return setHelper('helperTextPass', 'The password must be more than 6 symbols');
    if( credentials.passwordConfirm.length < 6 ) return setHelper('helperTextPassConfirm', 'The password must be more than 6 symbols');

    if( credentials.password === credentials.passwordConfirm ) {
      return true;
    } else {
      setHelper('helperTextPass', 'Passwords are not the same');
      setHelper('helperTextPassConfirm', 'Passwords are not the same');
      return false;
    }
  }

  const checkUsersData = () => {
    setCredentials((prevState) => ({
      ...prevState,
      helperTextFN: '',
      helperTextLN: '',
      helperTextPOS: '',
    }));
    
    if( !credentials.firstname ) {
      setHelper('helperTextFN', 'Enter First Name');
      return false;
    }
    if( !credentials.lastname ) {
      setHelper('helperTextLN', 'Enter Last Name');
      return false;
    }
    if( !credentials.position ) {
      setHelper('helperTextPOS', 'Enter Position');
      return false;
    }

    return true;
  }

  const updateCredentials = (data) => {
    setCredentials((prevState) => ({
      ...prevState,
      data,
    }));
  };

  const handleCheckChange = () => {
    checkState
      ? setChecState(false)
      : setChecState(true)
  }
  // **********************************************************

  React.useEffect(() => {
    console.log(items);
  }, [items.CurrentAdmin]);

  React.useEffect(() => {
  // LOGOUT automaticaly when entered to LOGIN route
  if(items.CurrentAdmin) deleteItem('CurrentAdmin');
  }, []);

  return (
    <section style={{textAlign: 'center'}}>
      <div id='tabs-container' style={{margin: '0 auto', display: 'table', width: '40%'}}>
        <Paper className={classes.paperRoot}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant="fullWidth"
          >
            <Tab label="LOGIN" />
            <Tab label="REGISTER" />
          </Tabs>
          {/* *********  LOGIN TAB ********* */}
          {
            !value
            ?
            <div>
              <div>
                <TextField
                  className={classes.input}
                  required
                  id="outlined-required-email"
                  error={!!helperText.helperTextEmail}
                  helperText={helperText.helperTextEmail}
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin='normal'
                  onBlur={(ev) => handleEmailBlur(ev)}
                  onChange={(ev)=> onInputChange(ev, 'loginEmail')}
                />
              </div>
              <div>
                <TextField
                  className={classes.input}
                  id="outlined-password-input-pass"
                  error={!!helperText.helperTextPass}
                  helperText={helperText.helperTextPass}
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  margin='normal'
                  onBlur={(ev) => handleLoginPassBlur(ev)}
                  onChange={(ev)=> onInputChange(ev, 'loginPassword')}
                />
              </div>
              <div>
                <Button className={classes.button} variant="contained" onClick={handleLogInButtonClick}>
                  LogIn
                </Button>
              </div>
            </div>
            :
            <></>
          }
          {/* *********  REGISTER TAB ********* */}
          {
            value
            ?
            <div>
              <div>
              <TextField
                required
                error={!!helperText.helperTextEmail}
                helperText={helperText.helperTextEmail}
                id="outlined-required-email"
                label="Email"
                variant="outlined"
                margin='normal'
                onBlur={checkEmail}
                onChange={(ev)=> onInputChange(ev, 'email')}
              />
              <TextField
                id="outlined-password-input-pass"
                label="Password"
                type="password"
                autoComplete="new-password"
                variant="outlined"
                margin='normal'
                error={!!helperText.helperTextPass}
                helperText={helperText.helperTextPass}
                onBlur={checkPassword}
                onChange={(ev)=> onInputChange(ev, 'password')}
              />
              <TextField
                id="outlined-password-input-pass-confirm"
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                variant="outlined"
                margin='normal'
                error={!!helperText.helperTextPassConfirm}
                helperText={helperText.helperTextPassConfirm}
                onBlur={checkPassword}
                onChange={(ev)=> onInputChange(ev, 'passwordConfirm')}
              />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkState}
                      onChange={handleCheckChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Add me to the users list"
                />
                </div>
                <div style={{visibility: checkState ? 'visible' : 'hidden'}}>
                <TextField
                    id="outlined-required-first-name"
                    label="First Name"
                    variant="outlined"
                    margin='normal'
                    onChange={(ev)=> onInputChange(ev, 'firstname')}
                  />
                <TextField
                    id="outlined-required-last-name"
                    label="Last Name"
                    variant="outlined"
                    margin='normal'
                    error={!!helperText.helperTextLastName}
                    helperText={helperText.helperTextLastName}
                    onChange={(ev)=> onInputChange(ev, 'lastname')}
                  />
                  <TextField
                    id="outlined-required-position"
                    label="Position"
                    variant="outlined"
                    margin='normal'
                    error={!!helperText.helperTextPosition}
                    helperText={helperText.helperTextPosition}
                    onChange={(ev)=> onInputChange(ev, 'position')}
                  />
              </div>
              <div>
                <Button className={classes.button} variant='contained' onClick={handleRegisterButtonClick}>Register</Button>
              </div>
            </div>
            :
            <></>
          }
        </Paper>
      </div>
    </section>
  );
}

export default Login;