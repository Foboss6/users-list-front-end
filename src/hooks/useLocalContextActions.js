import { useCallback, useContext } from "react";
import { LocalContext } from "../context/LocalContext";

const useLocalContextActions = () => {
  const { context, setContext } = useContext(LocalContext);

  const addNewItem = useCallback((newItem) => {
    setContext((prevState) => {
      return {
        ...prevState,
        items: {
          ...prevState.items,
          [newItem.id]: newItem,
        }
      }
    });
  }, [setContext]);

  const deleteItem = useCallback((key) => {
    setContext((prevState)=>{
      const items = { ...prevState.items };

      delete items[key];
      
      return {
        ...prevState,
        items,
      }
    });
  }, [setContext]);
  
  return {
    ...context,
    addNewItem,
    deleteItem,
  };
};

export default useLocalContextActions;