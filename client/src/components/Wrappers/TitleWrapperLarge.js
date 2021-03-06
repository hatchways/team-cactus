import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    title:{
        fontWeight: 600,
        letterSpacing: '1px',
        textDecoration: 'none',
        fontSize: '28px',
        width: '100%',
        lineHeight: '34px'
    }
});

class TitleWrapper extends Component {

    render() {
        const { classes, children } = this.props;

        return (
            <Typography classes={{ root: classes.title }} component="h1">
                { children }
            </Typography>         
        );
    }
}

export default withStyles(styles)(TitleWrapper);