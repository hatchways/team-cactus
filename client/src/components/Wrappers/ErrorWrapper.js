import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    error: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        color: '#df5353',
        textAlign: 'center',
        padding: '8px',
        margin: '8px',
        backgroundColor: '#ffd0cc',
        width: '100%'
    }
});

class ErrorWrapper extends Component {

    render() {
        const { classes, children } = this.props;

        return (
            <div className={classes.error}>
                { children }
            </div>         
        );
    }
}

export default withStyles(styles)(ErrorWrapper); 