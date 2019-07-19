import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        margin: 'auto',
        padding: '50px 0px',
        width: '90%',
        [theme.breakpoints.up('lg')]: {
            width: '1030px',
        },
    },
});

class PageWrapper extends Component {

    render() {
        const { classes, children } = this.props;

        return (
            <div className={classes.container} >
                { children }
            </div>           
        );
    }
}

export default withStyles(styles)(PageWrapper);