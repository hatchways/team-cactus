import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavLinks from './NavLinks';
import NavActions from './NavActions';
import NavDrawer from './NavDrawer';

const navBarStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  title: {
    textTransform: 'uppercase',
    margin: '0 15px',
    flexShrink: '0',
    fontSize: '1.1em',
    fontWeight: 600,
    letterSpacing: '3px'
  },
});

class NavBar extends Component {
  state = {
    navDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {navDrawerOpen: !prevState.navDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({navDrawerOpen: false});
  };
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" id="navBar">
          <Toolbar className={classes.toolBar}>
              <div className={classes.logo}>
                <IconButton onClick={this.drawerToggleClickHandler} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography component="h1" className={classes.title}>
                  Jackets Shop
                </Typography>
              </div>
              <NavLinks /> {/*pass in user status (logged in, shopper/shopkeeper) */}
              <NavActions/> {/*pass in user status (logged in, shopper/shopkeeper) */}
          </Toolbar>
        </AppBar>
        <NavDrawer show={this.state.navDrawerOpen} close={this.backdropClickHandler}/> {/*pass in user status (logged in, shopper/shopkeeper) */}
       
      </div>
    );
  }
}

export default withStyles(navBarStyles)(NavBar);