import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    navItem: {
        '& > a': {
            paddingTop: '5px',
            textDecoration: 'none',
            color: '#fff',
            letterSpacing: '1px',
            fontSize: '.8em',
            whiteSpace: 'nowrap',
            '&:hover': {
                borderTop: '2px solid #fff',
                webkitTransition:  'all 0.1s ease-in',
                mozTransition: 'all 0.1s ease-in',
                msTransition: 'all 0.1s ease-in',
                oTransition: 'all 0.1s ease-in',
                transition: 'all 0.1s ease-in'
            }
        }
    }
});

class NavItemWrapper extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Typography classes={{ root: classes.navItem }}>
                { this.props.children }
            </Typography>
                        
        );
    }
}

export default withStyles(styles)(NavItemWrapper);
