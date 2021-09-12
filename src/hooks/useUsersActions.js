import { useCallback, useContext } from "react";
import { UsersContext } from "../context/UsersContext";

const useUsersActions = () => {
  const { context, setContext } = useContext(UsersContext);

  const addNewUser = useCallback((newUser) => {
    setContext((prevState) => {
      return {
        ...prevState,
        users: {
          ...prevState.users,
          [newUser.id]: newUser,
        }
      }
    });
  }, [setContext]);

  const deleteUser = useCallback((key) => {
    setContext((prevState)=>{
      const users = { ...prevState.users };

      delete users[key];
      
      return {
        ...prevState,
        users,
      }
    });
  }, [setContext]);
  
  return {
    ...context,
    addNewUser,
    deleteUser,
  };
};

export default useUsersActions;