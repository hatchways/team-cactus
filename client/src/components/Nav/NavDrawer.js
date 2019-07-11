import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    list: {
        width: '200px'
    },
    navItem: {
        '& > a': {
            paddingTop: '5px',
            textDecoration: 'none',
            color: '#000',
            fontWeight: 600,
            fontSize: '.9em',
        }
    }
});

class NavDrawer extends Component {

    //Generate array of navActions
    createNavActions = (userType) => {
        let links, entries; 

        if(userType === "shopper"){
            links = {
                'My Cart': '/cart',
                'Create Shop': '/register',
                'Shop Login': '/login',
            };

        } else if(userType === "shopkeeper"){
            links = {
                'My Cart': '/placeholder',
                'Logout': '/placeholder',
            };
        }

        entries = Object.entries(links);
        return entries;
    }

    render() {
        const { classes, close, navLinksShopper, navLinksShopKeeper, show, userType } = this.props;

        const sideList = () => (
            <div className={classes.list} >
                <List>
                    {navLinksShopper.map((entry) => (
                        <ListItem component="li" key={entry[0]}>
                            <Typography classes={{ root: classes.navItem }}>
                                <Link to={entry[1]} onClick={close}>{entry[0]}</Link>
                            </Typography>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {userType === 'shopkeeper' ? 
                    (<List>
                        {navLinksShopKeeper.map((entry) => (
                            <ListItem component="li" key={entry[0]}>
                                <Typography classes={{ root: classes.navItem }}>
                                    <Link to={entry[1]} onClick={close}>{entry[0]}</Link>
                                </Typography>
                            </ListItem>
                        ))} 
                    </List>) : '' 
                }
                {userType === 'shopkeeper' ? <Divider /> : ''}
                <List>
                    {this.createNavActions(userType).map((entry) => (
                        <ListItem component="li" key={entry[0]}>
                            <Typography classes={{ root: classes.navItem }}>
                                <Link to={entry[1]} onClick={close}>{entry[0]}</Link>
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div>
            <Drawer open={show} onClose={close}>
                {sideList()}
            </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(NavDrawer);