import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import useAdminsActions from '../hooks/useAdminsActions';

import { makeStyles, withStyles, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import useUsersActions from '../hooks/useUsersActions';

// for navigation bar
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.success.light,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// for menu
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.success.light,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Header = () => {
  // for drop menu   ********************
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    if(path) {
      setAnchorEl(null);
      history.push(path);
    }
  }
  // ************************************
  // for search *************************
  const { addNewUser, deleteUser } = useUsersActions();
  
  const handleSearchInputChange = (event) => {    
    if(event.target.value) {
      addNewUser({
        id: 'search',
        name: event.target.value,
      });
    } else {
      deleteUser('search');
    }
  }
  // ************************************

  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const { admins } = useAdminsActions();

  // NEEDs to remake for taking data from Context
  const [login, setLogin] = useState((localStorage.getItem('isLoggedIn') === 'true') ? 'logout' : 'login');

  const [pathname, setPathname] = useState();

  const handleButtonClick = () => {
    if(login === 'logout') {
      history.push('/login');
    }
  }

  useEffect(() => {
    setLogin(() => (admins.CurrentAdmin ? 'logout' : 'login'));
  }, [admins]);

  useEffect(() => {
    let localPath;
    if(location.pathname.search('/users/') !== -1 && location.pathname !== '/users/create') localPath='Editing User data';
    else {
      switch (location.pathname) {
        case ('/'): localPath = 'Home Page'; break;
        case ('/login'): localPath = 'LogIn'; break;
        case ('/register'): localPath = 'Register'; break;
        case ('/users'): localPath = 'Users List'; break;
        case ('/users/create'): localPath = 'Add New User'; break;
        default : localPath = location.pathname;
      };
    }
    
    setPathname(() => (localPath));
  }, [location]);

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={() => handleMenuItemClick('/')}>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleMenuItemClick('/users')}>
              <ListItemIcon>
                <PeopleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Users List" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleMenuItemClick('/users/create')}>
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Add new user" />
            </StyledMenuItem>
          </StyledMenu>
          <Typography variant="h6" className={classes.title}>
            {`Users List App: ${pathname}`}
          </Typography>
          {/* Display Search only if we in '/users' route */}
          {(pathname === 'Users List')
            ?
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(ev) => {handleSearchInputChange(ev)}}
              />
            </div>
            :
            <></>
          }
          <Button color="inherit" onClick={handleButtonClick}>{login}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;