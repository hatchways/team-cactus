import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

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
    listLink: {
        '& > a': {
            paddingTop: '5px',
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 600,
            fontSize: '.9em',
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

class NavLinks extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.listContainer}>
                <List classes={{ root: classes.list }} component="ul">
                    {this.props.navLinksShopper.map((entry) => (
                        <ListItem component="li" key={entry[0]}>
                            <Typography classes={{ root: classes.listLink }}>
                                <Link to={entry[1]}>{entry[0]}</Link>
                            </Typography>
                        </ListItem>
                    ))}
                </List>
                <List classes={{ root: classes.list }} component="ul">
                    {this.props.navLinksShopKeeper.map((entry) => (
                        <ListItem component="li" key={entry[0]}>
                            <Typography classes={{ root: classes.listLink }}>
                                <Link to={entry[1]}>{entry[0]}</Link>
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(NavLinks);
