import { useCallback, useContext } from "react";
import { AdminsContext } from "../context/AdminsContext";

const useAdminsActions = () => {
  const { context, setContext } = useContext(AdminsContext);

  const addNewAdmin = useCallback((newAdmin) => {
    setContext((prevState) => {
      return {
        ...prevState,
        admins: {
          ...prevState.admins,
          [newAdmin.id]: newAdmin,
        }
      }
    });
  }, [setContext]);

  const deleteAdmin = useCallback((key) => {
    setContext((prevState)=>{
      const admins = { ...prevState.admins };

      delete admins[key];
      
      return {
        ...prevState,
        admins,
      }
    });
  }, [setContext]);

  return {
    ...context,
    addNewAdmin,
    deleteAdmin,
  };
}

export default useAdminsActions;