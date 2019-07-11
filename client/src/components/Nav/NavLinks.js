import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NavItemWrapper from './NavItemWrapper';

const styles = theme => ({
    listContainer: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'none',
        },
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none'
    },
});

class NavLinks extends Component {

    render() {
        const { classes, navLinksShopper, navLinksShopKeeper } = this.props;

        return (
            <div className={classes.listContainer}>
                <List classes={{ root: classes.list }} component="ul">
                    {navLinksShopper.map((entry) => (
                        <ListItem component="li" key={entry[0]}>
                            <NavItemWrapper>
                                <Link to={entry[1]}>{entry[0]}</Link>
                            </NavItemWrapper>
                        </ListItem>
                    ))}
                </List>
                <List classes={{ root: classes.list }} component="ul">
                    {navLinksShopKeeper.map((entry) => (
                        <ListItem component="li" key={entry[0]}>
                            <NavItemWrapper>
                                <Link to={entry[1]}>{entry[0]}</Link>
                            </NavItemWrapper>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(NavLinks);
