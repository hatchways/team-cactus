import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';

const styles = theme => ({
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        listStyle: 'none',
    },
    listLink: {
        '& > a': {
            paddingTop: '5px',
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 600,
            fontSize: '.9em',
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

class NavActions extends Component {

    createNavActions = () => {
        let jsxArray = [];
        let jsx = null;

        if(window.location.pathname === '/login' && this.props.userType === 'shopper'){
            jsx = 
            <Typography classes={{ root: this.props.classes.listLink }}>
                <Link to='/register'>Create Shop</Link>
            </Typography>;

            jsxArray.push(jsx);

        } else if(window.location.pathname === '/register' && this.props.userType === 'shopper'){
            jsx = 
            <Typography classes={{ root: this.props.classes.listLink }}>
                <Link to='/login'>Shop Login</Link>
            </Typography>;

            jsxArray.push(jsx);
        }

        return (jsxArray);
    }


    render() {
        const { classes } = this.props;
    
        return (
            <List classes={{ root: classes.list }} component="ul">
                {this.createNavActions().map((action, index) => (
                    <ListItem component="li" key={index}>
                        {action}
                    </ListItem>
                ))}
                <ListItem>
                    <IconButton classes={{ root: classes.iconButton }} component={Link} to="/cart" edge="start" color="inherit" aria-label="Menu">
                        <ShoppingCartIcon />
                    </IconButton>
                </ListItem>
            </List>
        );
    }
}

export default withStyles(styles)(NavActions);