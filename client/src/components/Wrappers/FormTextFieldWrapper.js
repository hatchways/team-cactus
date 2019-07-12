import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';

class FormTextField extends Component {

    render() {
        const { error, label, helperText, id, onBlur, onChange, type, value } = this.props;

        return (
            <TextField
                error={error}
                fullWidth = {true}
                helperText = {helperText}
                id={id}
                label={label}
                margin="dense"
                onBlur={onBlur}
                onChange={onChange}
                type={type}
                value={value}
                variant="outlined"
            />          
        );
    }
}

export default FormTextField;