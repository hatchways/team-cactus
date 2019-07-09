import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';

const useStyles = makeStyles(theme => ({
    navActions: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        listStyle: 'none',
        alignItems: 'center',
        float: 'right',
        '& > li': {
            marginRight: '40px',
            flexShrink: '0',
            '& a': {
                textDecoration: 'none',
                color: '#fff',
                display: 'block'
            }
        }
    },
    iconButton: {
        padding: 0
    }
}));

export default function NavActions() {
    const classes = useStyles();

    const links = {
        'Sign Up': 'http://google.com',
    };

    const entries = Object.entries(links);

    return (
        <ul className={classes.navActions}>
            {entries.map((link, index) => (
                <li><a href={link[1]}>{link[0]}</a></li>
            ))}
            <li><IconButton classes={{ root: classes.iconButton }} edge="start" color="inherit" aria-label="Menu">
                <ShoppingCart />
            </IconButton></li>
        </ul>
    );
}