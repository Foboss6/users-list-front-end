import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useHistory } from 'react-router-dom';
import useAdminsActions from '../hooks/useAdminsActions';
import useUsersActions from '../hooks/useUsersActions';

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
  
  // LOGOUT automaticaly
  if(admins.CurrentAdmin) deleteAdmin('CurrentAdmin');

  // ***** For tabs *******************************
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  // **********************************************

  // ******** For BOTH tabs ************************************
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
  const [loginData = {}, setLoginData] = useState();

  const onInputChange = (event, fieldName) => {
    setLoginData((prevState) => ({
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

  const handleEnterButtonClick = () => {
    if(loginData.email && loginData.pass) {
      const adminsList = Object.values(admins);
      const currentAdmin = adminsList.find((admin) => (admin.email === loginData.email && admin.pass === loginData.pass));

      if(currentAdmin) {
        addNewAdmin({
          ...currentAdmin,
          id: 'CurrentAdmin',
          currentId: currentAdmin.id,
        });

        history.push('/');
      } else {
        setHelperText((prevState) => ({
          ...prevState,
          helperTextEmail: 'We don\'t know you!',
        }));
      }
    }
  }
  // **********************************************************

  // ******** For REGISTER tab ***********************************
  const { addNewUser } = useUsersActions();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    position: ''
  });

  const [admin, setAdmin] = useState({
    email: '',
    pass: '',
    passConfirmed: false,
  });

  const [checkState, setChecState] = useState(true);
  
  const registerId = Date.now();

  const onUserInputChange = (event, fieldName) => {
    setUser((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
  }

  const onAdminInputChange = (event, fieldName) => {
    setAdmin((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
    
    if(fieldName === 'pass') {
      setHelperText((prevState) => ({
        ...prevState,
        helperTextPass: '',
      }));
    }
  }

  const handleRegisterButtonClick = () => {

    // save admin's data to context
    if( !admin.email ) {
      setHelperText((prevState) => ({
        ...prevState,
        helperTextEmail: 'Enter email',
      }));
    } else {
      if( !admin.pass ) {
        setHelperText((prevState) => ({
          ...prevState,
          helperTextPass: 'Enter password',
        }));
      } else {
        setHelperText((prevState) => ({
          ...prevState,
          helperTextPass: '',
        }));

        if(!admin.passConfirmed) {
          setHelperText((prevState) => ({
            ...prevState,
            helperTextPassConfirm: 'Enter confirm password',
          }));
        } else {
          if(checkState) {
            // save user's data to it's oun context to display it in the users list
            if(user.firstName) {
              if(user.lastName) {
                if(user.position) {
                  setHelperText((prevState) => ({
                    ...prevState,
                    helperTextLastName: '',
                    helperTextPosition: '',
                  }));
      
                  addNewUser({
                    id: registerId,
                    ...user,
                  });

                  addNewAdmin({
                    id: registerId,
                    email: admin.email,
                    pass: admin.pass,
                  });
                  // add CurrentAdmin to context
                  addNewAdmin({
                    id: 'CurrentAdmin',
                    email: admin.email,
                    pass: admin.pass,
                    currentId: registerId,
                  });

                  history.push('/');
                } else {
                  setHelperText((prevState) => ({
                    ...prevState,
                    helperTextPosition: 'Enter your Position',
                  }));
                }
              } else {
                setHelperText((prevState) => ({
                  ...prevState,
                  helperTextLastName: 'Enter your Last Name',
                }));
              }
            }
          } else {
            addNewAdmin({
              id: registerId,
              email: admin.email,
              pass: admin.pass,
            });

            history.push('/');
          }
        }
      }
    } 
  }

  const checkPasswordConfirm = (event) => {

    if(admin.pass) { // If password field is not empty, go on
      if(event.target.value) { // if confirm pass field is not empty, go on
        // when bouth password are not empty, go on and check are they the same
        if(admin.pass === event.target.value) {
          // if bouth passwords are the same, turn off errors, toggle flag about confirm pass
          setHelperText((prevState) => ({
            ...prevState,
            helperTextPass: '',
            helperTextPassConfirm: '',
          }));

          setAdmin((prevState) => ({
            ...prevState,
            passConfirmed: true,
          }));
        } else { //if password are not the same, go out with massage
          setHelperText((prevState) => ({
          ...prevState,
          helperTextPassConfirm: 'Passwords are not the same',
        }));

        setAdmin((prevState) => ({
          ...prevState,
          passConfirmed: false,
        }));
        }
      } else {        // if confirm pass field is empty, go out with message
        setHelperText((prevState) => ({
          ...prevState,
          helperTextPassConfirm: 'Enter confirm password',
        }));
      }
    } else {         // If password field is empty, go out with message
      setHelperText((prevState) => ({
          ...prevState,
          helperTextPass: 'Enter password',
        }));
    }
  }

  const handleCheckChange = () => {
    checkState
      ? setChecState(false)
      : setChecState(true)
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
                  onBlur={(ev) => handleEmailBlur(ev)}
                  onChange={(ev)=> onInputChange(ev, 'email')}
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
                  onChange={(ev)=> onInputChange(ev, 'pass')}
                />
              </div>
              <div>
                <Button className={classes.button} variant="contained" onClick={handleEnterButtonClick}>
                  Enter
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
                onBlur={(ev) => handleEmailBlur(ev)}
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
                onChange={(ev) => onAdminInputChange(ev, 'pass')}
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
                onBlur={(ev) => checkPasswordConfirm(ev)}
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
                    onChange={(ev)=> onUserInputChange(ev, 'firstName')}
                  />
                <TextField
                    id="outlined-required-last-name"
                    label="Last Name"
                    variant="outlined"
                    margin='normal'
                    error={!!helperText.helperTextLastName}
                    helperText={helperText.helperTextLastName}
                    onChange={(ev)=> onUserInputChange(ev, 'lastName')}
                  />
                  <TextField
                    id="outlined-required-position"
                    label="Position"
                    variant="outlined"
                    margin='normal'
                    error={!!helperText.helperTextPosition}
                    helperText={helperText.helperTextPosition}
                    onChange={(ev)=> onUserInputChange(ev, 'position')}
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