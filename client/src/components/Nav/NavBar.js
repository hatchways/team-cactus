import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import HamburgerIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavActions from './NavActions';
import NavDrawer from './NavDrawer';
import NavLinks from './NavLinks';

const styles = theme => ({
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  navMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolBar: {
    justifyContent: 'space-between',
  },
  logo: {
    '& > a': {
      fontFamily: 'Source Sans Pro',
      textTransform: 'uppercase',
      padding: '0 30px 0 15px',
      margin: '0 16px 0 0',
      whiteSpace: 'nowrap',
      fontWeight: 600,
      letterSpacing: '3px',
      color: '#fff',
      textDecoration: 'none',
      [theme.breakpoints.up('md')]: {
        borderRight: '1px solid #444',
      }
    }
  },
});

class NavBar extends Component {

  state = {
    userType: this.props.userType,
    navDrawerOpen: false
  };

  static getDerivedStateFromProps(nextProps) {    
    return {
      userType: nextProps.userType,
    }
  }

  //When area outside of drawer clicked, close NavDrawer
  backdropClickHandler = () => {
    this.setState({navDrawerOpen: false});
  };

  //Generate array of navLinks for all userTypes
  createNavLinksShopper = () => {
    let links, entries = 0; 

    links = {
        Women: '/placeholder',
        Men: '/placeholder'
    };
    
    entries = Object.entries(links);
    return entries;
  }

  //Generate array of navLinks for shopkeeper
  createNavLinksShopKeeper = (userType) => {
    let links, entries = 0; 
    console.log('userType', userType);
    if(userType == "shopkeeper"){
        links = {
            'My Shop': '/placeholder',
        };
    } else {
      links = 0;
    }
    
    entries = Object.entries(links);
    console.log('entries', entries);
    return entries;
  }

  //When hamburger icon clicked, open NavDrawer
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {navDrawerOpen: !prevState.navDrawerOpen};
    });
  };

  render() {
    const { classes } = this.props;
    console.log('navbar', this.props);
    console.log('userTypeState', this.state.userType);
    const navLinksShopper = this.createNavLinksShopper();
    const navLinksShopKeeper = this.createNavLinksShopKeeper(this.state.userType);

    return (
      <div>
        <AppBar position="static" id="navBar" color="primary">
          <Toolbar classes={{ root: classes.toolBar }} component="nav">
              <div className={classes.navMain}>
                <IconButton onClick={this.drawerToggleClickHandler} classes={{ root: classes.menuButton }} color="secondary" aria-label="Menu">
                  <HamburgerIcon />
                </IconButton>
                <Typography classes={{ root: classes.logo }} color="secondary" component="h1" >
                  <Link to='/'>Jackets Shop</Link>
                </Typography>
              </div>
              <NavLinks navLinksShopper={navLinksShopper} navLinksShopKeeper={navLinksShopKeeper} /> 
              <NavActions userType={this.state.userType} />
          </Toolbar>
        </AppBar>
        <NavDrawer show={this.state.navDrawerOpen} close={this.backdropClickHandler} navLinksShopper={navLinksShopper} navLinksShopKeeper={navLinksShopKeeper} userType={this.state.userType} />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(NavBar));