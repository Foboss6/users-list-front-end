import { useContext } from "react";
import { LocalContext } from "../context/LocalContext";

const useLocalContextActions = () => {
  const { context, setContext } = useContext(LocalContext);

  const addNewItem = (newItem) => {
    setContext((prevState) => {
      return {
        ...prevState,
        items: {
          ...prevState.items,
          [newItem.id]: newItem,
        }
      }
    })
  };

  const deleteItem = (key) => {
    setContext((prevState) => {
      const items = {...prevState.items};

      delete items[key];

      return {
        ...prevState,
        items,
      }
    })
  };
  
  return {
    ...context,
    addNewItem,
    deleteItem,
  };
};

export default useLocalContextActions;