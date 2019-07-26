import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        borderRadius: 0,
        boxShadow: 'none'
    },
});

class ButtonWrapper extends Component {

    render() {

//         const { classes, children, type, onClick } = this.props;

//         return (
//             <Button type={type} variant="contained" color="primary" size="medium" classes={{ contained: classes.button }} onClick={onClick}>

        const { classes, children, type } = this.props;
        const variant = (type === "white" ? 'outlined' : 'contained');
        const color = (type === "white" ? 'inherit' : 'primary');

        return (
            <Button variant={variant} size="medium" color={color} classes={{ contained: classes.button, outlined: classes.button }}>
                { children }
            </Button>         
        );
    }
}

export default withStyles(styles)(ButtonWrapper);