import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import NavItemWrapper from './NavItemWrapper';

const styles = theme => ({
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        listStyle: 'none',
    },
});

class NavActions extends Component {

    createNavActions = () => {
        let jsxArray = [];
        let jsx = null;

        if(window.location.pathname === '/login' && this.props.userType === 'shopper'){
            jsx = 
            <NavItemWrapper>
                <Link to='/register'>Create Shop</Link>
            </NavItemWrapper>

            jsxArray.push(jsx);

        } else if(window.location.pathname === '/register' && this.props.userType === 'shopper'){
            jsx = 
            <NavItemWrapper>
                <Link to='/login'>Shop Login</Link>
            </NavItemWrapper>

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
                    <IconButton classes={{ root: classes.iconButton }} component={Link} to="/placeholder" edge="start"  color="secondary" aria-label="Menu">
                        <ShoppingCartIcon fontSize="small"/>
                    </IconButton>
                </ListItem>
            </List>
        );
    }
}

export default withStyles(styles)(NavActions);