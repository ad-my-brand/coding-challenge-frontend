import React from 'react';
import TextField from '@mui/material/TextField';

const FormControllInput = ({label, isError, errorMsg, handleInputChange}) => {
    return (
            <TextField
                fullWidth
                onChange={(event)=>handleInputChange(event, label)}
                required
                label={label}
                error={isError}
                helperText={isError ? errorMsg: ""}
            />
    )
}

export default FormControllInput
