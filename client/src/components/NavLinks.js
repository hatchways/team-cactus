import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    navLinks: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        paddingLeft: '100px',
        width: '60%',
        listStyle: 'none',
        alignItems: 'center',
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'none',
        },
        '& > li': {
            marginRight: '55px',
            '& a': {
                textDecoration: 'none',
                color: '#fff',
                fontWeight: 600,
            }
        }
    }
}));

const NavLinks = props => {
    const classes = useStyles();

    const links = {
        Women: 'http://google.com',
        Men: 'http://google.com'
    };

    const entries = Object.entries(links);

    return (
        <ul className={classes.navLinks}>
            {entries.map((link) => (
                <li><a href={link[1]}>{link[0]}</a></li>
            ))}
        </ul> 
    );
}

export default NavLinks;