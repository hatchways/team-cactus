import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    NavBarResponsiveMenu: {
        minWidth: '80px',
        display: 'flex',
        flexDirection: 'column',
        listStyle: 'none',
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        top: 0,
        color: 
        paddingTop: '80px',
        zIndex: 100,
        marginBlockStart: '0em',
        marginBlockEnd: '0em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        paddingInlineStart: '0px',
        '& > li': {
            padding: '10px 40px',
            margin: '0px 10px',
            borderBottom: '1px solid #ccc',
            '& a': {
                textDecoration: 'none',
                color: '#fff'
            }
        }
    }
}));

export default function NavBarExpandedMenu() {
    const classes = useStyles();

    return (
        <ul className={classes.NavBarResponsiveMenu}>
            <li><a href="http://google.com">Women</a></li>
            <li><a href="http://google.com">Men</a></li>
        </ul> 
    );
}