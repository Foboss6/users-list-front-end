import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputForm = ({onTextChange, label, inputRef}) => {
  return(
    <TextField
          id={`outlined-with-placeholder-${label}`}
          label={label}
          margin="normal"
          variant="outlined"
          inputRef={inputRef}
          onChange={onTextChange}
        />
  )
}

export default InputForm;