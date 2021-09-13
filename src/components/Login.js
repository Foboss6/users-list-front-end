import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

  const { items, addNewItem, deleteItem } = useLocalContextActions();

  const [credentials = {}, setCredentials] = useState();

  const [helperText, setHelperText] = useState({
    helperTextEmail: '',
    helperTextPass: '',
    helperTextPassConfirm: '',
  });

  // LOGOUT automaticaly when entered to LOGIN route
  React.useEffect(() => {
    if(items.CurrentAdmin) deleteItem('CurrentAdmin');
    }, []);

  // ***** For tabs *******************************************
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  // ***********************************************************

  const onInputChange = (event, fieldName) => {
    setCredentials((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value
    }));
  }

  // ******** For INPUT tab ************************************
  const handleLoginPassBlur = (event) => {
    if(!event.target.value) setHelper('helperTextPass', 'Enter password');
    else setHelper('helperTextPass', '');
  }

  const handleLogInButtonClick = () => {
    if( checkEmail(credentials.loginEmail) && credentials.loginPassword ) {
      fetch(`${SERVER_PATH}/login`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
      })
      .then((res) => res.json())
      .then(data => {
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
  const [checkState, setChecState] = useState(true);

  const handleCheckChange = () => {
    checkState
      ? setChecState(false)
      : setChecState(true)
  }

  React.useEffect(() => {
    if( !checkState ) {
      setCredentials((prevState) => ({
        ...prevState,
        firstname: '',
        lastname: '',
        position: '',
      }));
    }
  }, [checkState]);

  const setHelper = (fieldName, text) => {
    setHelperText((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
    
    if(text) return false;
    else return true;
  }

  const checkEmail = (email) => {
    setHelper('helperTextEmail', '');
    
    if( !email ) return setHelper('helperTextEmail', 'Enter email');
    
    if( !(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) ) return setHelper('helperTextEmail', 'Enter valid email');

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
    setHelperText((prevState) => ({
      ...prevState,
      helperTextFN: '',
      helperTextLN: '',
      helperTextPOS: '',
    }));
    
    if( !credentials.firstname ) return setHelper('helperTextFN', 'Enter First Name');
    if( !credentials.lastname ) return setHelper('helperTextLN', 'Enter Last Name');
    if( !credentials.position ) return setHelper('helperTextPOS', 'Enter Position');

    return true;
  }

  const handleRegisterButtonClick = () => {   
    if( 
      checkState 
      ? checkEmail(credentials.email) && checkPassword() && checkUsersData() 
      : checkEmail(credentials.email) && checkPassword()
    ) {
      fetch(`${SERVER_PATH}/login/register`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.id) {
          addNewItem({
            ...data,
            id: 'CurrentAdmin',
          });
          return history.push('/');
        } else {
          if(data.includes('exists')) return setHelper('helperTextEmail', 'This email is already occupied');
          else console.log(data);
        }
      })
      .catch(console.log);
    } 
  }
  // **********************************************************

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
                  onBlur={() => checkEmail(credentials.loginEmail)}
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
                <div>
                  <TextField
                    required
                    className={classes.input}
                    error={!!helperText.helperTextEmail}
                    helperText={helperText.helperTextEmail}
                    id="outlined-required-email"
                    label="Email"
                    variant="outlined"
                    margin='normal'
                    onBlur={() => checkEmail(credentials.email)}
                    onChange={(ev)=> onInputChange(ev, 'email')}
                  />
                </div>
                <div>
                  <TextField
                    className={classes.input}
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
                </div>
                <div>
                  <TextField
                    className={classes.input}
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
              {
                checkState
                ?
                <div>
                  <div>
                    <TextField
                      className={classes.input}
                      id="outlined-required-first-name"
                      label="First Name"
                      variant="outlined"
                      margin='normal'
                      error={!!helperText.helperTextFN}
                      helperText={helperText.helperTextFN}
                      onChange={(ev)=> onInputChange(ev, 'firstname')}
                    />
                  </div>
                  <div>
                    <TextField
                      className={classes.input}
                      id="outlined-required-last-name"
                      label="Last Name"
                      variant="outlined"
                      margin='normal'
                      error={!!helperText.helperTextLN}
                      helperText={helperText.helperTextLN}
                      onChange={(ev)=> onInputChange(ev, 'lastname')}
                    />
                  </div>
                  <div>
                    <TextField
                      className={classes.input}
                      id="outlined-required-position"
                      label="Position"
                      variant="outlined"
                      margin='normal'
                      error={!!helperText.helperTextPOS}
                      helperText={helperText.helperTextPOS}
                      onChange={(ev)=> onInputChange(ev, 'position')}
                    />
                  </div>
                </div>
                :
                <></>
              }
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