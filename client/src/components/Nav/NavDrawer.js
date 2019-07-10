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
    listLink: {
        '& > a': {
            paddingTop: '5px',
            textDecoration: 'none',
            color: '#000',
            fontWeight: 600,
            fontSize: '.9em',
            '&:hover': {
                // borderTop: '2px solid #fff',
                // webkitTransition:  'all 0.1s ease-in',
                // mozTransition: 'all 0.1s ease-in',
                // msTransition: 'all 0.1s ease-in',
                // oTransition: 'all 0.1s ease-in',
                // transition: 'all 0.1s ease-in'
            }
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
        const { classes } = this.props;

        // const [state, setState] = React.useState({
        //     open: false,
        // });

        // const toggleDrawer = (open) => event => {
        //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //         return;
        //     }

        //     setState({ ...state, open: open });
        // };

        const sideList = () => (
            <div className={classes.list} >
                <List>
                    {this.props.navLinksShopper.map((entry) => (
                        <ListItem component="li" key={entry[0]}>
                            <Typography classes={{ root: classes.listLink }}>
                                <Link to={entry[1]}>{entry[0]}</Link>
                            </Typography>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {this.props.userType === 'shopkeeper' ? 
                    (<List>
                        {this.props.navLinksShopKeeper.map((entry) => (
                            <ListItem component="li" key={entry[0]}>
                                <Typography classes={{ root: classes.listLink }}>
                                    <Link to={entry[1]}>{entry[0]}</Link>
                                </Typography>
                            </ListItem>
                        ))} 
                    </List>) : '' 
                }
                {this.props.userType === 'shopkeeper' ? <Divider /> : ''}
                <List>
                    {this.createNavActions(this.props.userType).map((entry) => (
                        <ListItem component="li" key={entry[0]}>
                            <Typography classes={{ root: classes.listLink }}>
                                <Link to={entry[1]}>{entry[0]}</Link>
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div>
            <Drawer open={this.props.show} onClose={this.props.close}>
                {sideList()}
            </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(NavDrawer);