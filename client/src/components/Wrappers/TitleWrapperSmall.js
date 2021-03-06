import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    title:{
        margin: '6px 0 20px 0',
        fontWeight: 600,
        letterSpacing: '1px',
        textDecoration: 'none',
        fontSize: '19px'
    }
});

class TitleWrapperSmall extends Component {

    render() {
        const { classes, children } = this.props;

        return (
            <Typography classes={{ root: classes.title }} component="h1">
                { children }
            </Typography>         
        );
    }
}

export default withStyles(styles)(TitleWrapperSmall);