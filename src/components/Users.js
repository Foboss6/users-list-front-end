import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

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

import useUsersActions from '../hooks/useUsersActions';


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

  const {users, deleteUser} = useUsersActions();

  const [sortingBy, setSortingBy] = useState(sortByFirstNameUp);

  const [arrayUsers, setArrayUsers] = useState(Object.values(users));

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
        return sortingArray(arrayUsers, 'up', 'firstName');

      case sortByFirstNameDown :
        sortButtonColor.sortByFirstNameDown='primary';
        return sortingArray(arrayUsers, 'down', 'firstName');

      case sortByLastNameUp :
        sortButtonColor.sortByLastNameUp='primary';
        return sortingArray(arrayUsers, 'up', 'lastName');

      case sortByLastNameDown :
        sortButtonColor.sortByLastNameDown='primary';
        return sortingArray(arrayUsers, 'down', 'lastName');

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
    deleteUser(event.currentTarget.value);
  }

  const handleEditButtonClick = (event) => {
    history.push(`/users/${event.currentTarget.value}`);
  }

  const handleFloatButtonClick = () => {
    history.push(`/users/create`);
  } 

  React.useEffect(()=>{
    if(users.search) {
      setArrayUsers(Object.values(users).filter(user => (
        user.firstName 
          ? user.firstName.toLowerCase().includes(users.search.name.toLowerCase()) || 
            user.lastName.toLowerCase().includes(users.search.name.toLowerCase())
          : false)));
    } else setArrayUsers(Object.values(users));
  }, [users]);

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
              <TableCell className={classes.body} align="center">{user.firstName}</TableCell>
              <TableCell className={classes.body} align="center">{user.lastName}</TableCell>
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