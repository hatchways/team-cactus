import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        borderRadius: 0,
        boxShadow: 'none',
        margin: '10px'
    }
});

class CardWrapper extends Component {

    render() {
        const { classes, children, type, onClick } = this.props;

        return (
            <Button type={type} variant="contained" color="primary" size="medium" classes={{ contained: classes.button }} onClick={onClick}>
                { children }
            </Button>         
        );
    }
}

export default withStyles(styles)(CardWrapper);