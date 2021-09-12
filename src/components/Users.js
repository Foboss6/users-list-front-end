import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SERVER_PATH } from '../variables/variables';
import useLocalContextActions from '../hooks/useLocalContextActions';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
    backgroundColor: 'transparent',
  },
  table: {
    minWidth: 700,
  },
  head: {
    fontSize: 20,
  },
  body: {
    fontSize: 16,
  },
  floatingButton: {
    position: 'fixed',
    top: 'auto',
    right: '10%',
    bottom: '2%',
    left: 'auto',
  },
});

const Users = (props) => {
  const { classes } = props;
  const history = useHistory();

  const sortByFirstNameUp = 'sort-by-first-name-up';
  const sortByFirstNameDown = 'sort-by-first-name-down';
  const sortByLastNameUp = 'sort-by-last-name-up';
  const sortByLastNameDown = 'sort-by-last-name-down';
  const sortByPositionUp = 'sort-by-position-up';
  const sortByPositionDown = 'sort-by-position-down';

  let sortButtonColor = {
    sortByFirstNameUp: 'primary',
    sortByFirstNameDown: 'default',
    sortByLastNameUp: 'default',
    sortByLastNameDown: 'default',
    sortByPositionUp: 'default',
    sortByPositionDown: 'default'
  }

  const setDefaultColor = (obj) => {
    for(let key in obj)
      if(obj.hasOwnProperty(key))
        obj[key] = 'default';
  }

  // const {users, deleteUser, addNewUser} = useUsersActions();
  const { items } = useLocalContextActions();
  const [users, setUsers] = useState({});

  const [sortingBy, setSortingBy] = useState(sortByFirstNameUp);

  const [arrayUsers, setArrayUsers] = useState(Object.values(users));

  // function for loading users from database
  const loadUsers = () => {
    setUsers({});
    fetch(`${SERVER_PATH}/users`)
    .then(res => res.json())
    .then(data => {
      data.forEach((el) => {
        setUsers((prevState) => {
          return {
            ...prevState,
            [el.id]: el,
          }
        })
      });
    })
    .catch(console.log);
  }

  // function for sorting array
  const sortingArray = (array, direction, fieldName) => {
    array.sort((a, b) => {
      if(direction === 'up') {
        if(a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) return 1;
        if(a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) return -1;
        return 0;
      } else {
        if(a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) return 1;
        if(a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) return -1;
        return 0;
      }
    });
    return array;
  }
  
  const sortedUsers = useMemo(() => {
    setDefaultColor(sortButtonColor);

    switch(sortingBy) {
      case sortByFirstNameUp : 
        sortButtonColor.sortByFirstNameUp='primary';
        return sortingArray(arrayUsers, 'up', 'firstname');

      case sortByFirstNameDown :
        sortButtonColor.sortByFirstNameDown='primary';
        return sortingArray(arrayUsers, 'down', 'firstname');

      case sortByLastNameUp :
        sortButtonColor.sortByLastNameUp='primary';
        return sortingArray(arrayUsers, 'up', 'lastname');

      case sortByLastNameDown :
        sortButtonColor.sortByLastNameDown='primary';
        return sortingArray(arrayUsers, 'down', 'lastname');

        case sortByPositionUp :
          sortButtonColor.sortByPositionUp='primary';
          return sortingArray(arrayUsers, 'up', 'position');

      case sortByPositionDown :
        sortButtonColor.sortByPositionDown='primary';
        return sortingArray(arrayUsers, 'down', 'position');

      default : return arrayUsers;
    }
  }, [sortingBy, arrayUsers]);

  const handleDeleteButtonClick = (event) => {

    const usersId = event.currentTarget.value;

    fetch(`${SERVER_PATH}/users/delete`, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: usersId})
    })
    .then((res) => res.json())
    .then(data => {
      if(data === 'success') {
        // if the user was successfully delete from database, delete him from the list
        setUsers((prevState) => {
          const users = {...prevState}
          delete users[usersId];
          return users;
        })
      }
      else console.log(data);
    })
    .catch(console.log);
  }

  const handleEditButtonClick = (event) => {
    history.push(`/users/${event.currentTarget.value}`);
  }

  const handleFloatButtonClick = () => {
    history.push(`/users/create`);
  } 

  React.useEffect(()=>{
    if(items.search) {
      setArrayUsers(Object.values(users).filter(user => (
        user.firstname 
          ? user.firstname.toLowerCase().includes(items.search.name.toLowerCase()) || 
            user.lastname.toLowerCase().includes(items.search.name.toLowerCase())
          : false)));
    } else setArrayUsers(Object.values(users));
    console.log(items);
  }, [items.search, users]);

  // React.useEffect(() => {
  //   fetch('https://users-list-server.herokuapp.com/users')
  //   .then(res => res.json())
  //   .then(data => {
  //     data.forEach((el) => {
  //       addNewUser(el);
  //     });
  //   })
  //   .catch(console.log);
  // }, []);

  React.useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.head} align="center">
              <span>First Name</span>
              <IconButton 
                aria-label="sort" 
                value={sortByFirstNameUp} 
                className={classes.margin} 
                size="small"
                color={sortButtonColor.sortByFirstNameUp}
                onClick={() => setSortingBy(sortByFirstNameUp)}
              >
                <ArrowUpwardIcon fontSize="inherit" />
              </IconButton>
              <IconButton 
                aria-label="sort" 
                value={sortByFirstNameDown} 
                className={classes.margin} 
                size="small"
                color={sortButtonColor.sortByFirstNameDown}
                onClick={() => setSortingBy(sortByFirstNameDown)}
              >
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </TableCell>
            <TableCell className={classes.head} align="center">
              <span>Last Name</span>
              <IconButton 
                aria-label="sort" 
                value={sortByLastNameUp}
                className={classes.margin} 
                size="small"
                color={sortButtonColor.sortByLastNameUp}
                onClick={() => setSortingBy(sortByLastNameUp)}
              >
                <ArrowUpwardIcon fontSize="inherit" />
              </IconButton>
              <IconButton 
                aria-label="sort" 
                value={sortByLastNameDown} 
                className={classes.margin} 
                size="small"
                color={sortButtonColor.sortByLastNameDown}
                onClick={() => setSortingBy(sortByLastNameDown)}
              >
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </TableCell>
            <TableCell className={classes.head} align="center">
              <span>Position</span>
              <IconButton 
                aria-label="sort" 
                value={sortByPositionUp}
                className={classes.margin} 
                size="small"
                color={sortButtonColor.sortByPositionUp}
                onClick={() => setSortingBy(sortByPositionUp)}
              >
                <ArrowUpwardIcon fontSize="inherit" />
              </IconButton>
              <IconButton 
                aria-label="sort" 
                value={sortByPositionDown} 
                className={classes.margin} 
                size="small"
                color={sortButtonColor.sortByPositionDown}
                onClick={() => setSortingBy(sortByPositionDown)}
              >
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className={classes.body} align="center">{user.firstname}</TableCell>
              <TableCell className={classes.body} align="center">{user.lastname}</TableCell>
              <TableCell className={classes.body} align="center">{user.position}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" value={user.id} onClick={handleEditButtonClick}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" value={user.id} onClick={handleDeleteButtonClick}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <div className={classes.floatingButton}>
      <Fab color="primary" aria-label="add" onClick={handleFloatButtonClick}>
        <AddIcon />
      </Fab>
    </div>
    </>
  );
}

export default withStyles(styles)(Users);