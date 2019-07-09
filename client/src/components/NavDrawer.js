import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
}));

const NavDrawer = props => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        open: false,
    });

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, open: open });
    };

    const links = {
        Women: 'http://google.com',
        Men: 'http://google.com'
    };

    const entries = Object.entries(links);

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
        <List>
            {entries.map((link, index) => (
                <ListItem button key={link[0]}>
                    <ListItemText primary={link[0]} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['Sign Up', 'Sign In'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        </div>
    );


    return (
        <div>
        <Drawer open={props.show} onClose={props.close}>
            {sideList()}
        </Drawer>
        </div>
    );
}

export default NavDrawer;