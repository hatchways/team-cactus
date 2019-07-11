import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '60px',
        [theme.breakpoints.up('md')]: {
            width: '370px',
            padding: '30px 50px'
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            width: '320px',
            padding: '30px 26.6px'
        },
    },
});

class CardWrapper extends Component {

    render() {
        const { classes, children } = this.props;

        return (
            <Paper classes={{ root: classes.paper }} square={true} >
                { children }
            </Paper>           
        );
    }
}

export default withStyles(styles)(CardWrapper);