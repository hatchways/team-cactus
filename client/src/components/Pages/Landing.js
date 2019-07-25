import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import PageWrapper from '../Wrappers/PageWrapper';
import TitleWrapperLarge from '../Wrappers/TitleWrapperLarge';
import TitleWrapperSmall from '../Wrappers/TitleWrapperSmall';
import JacketFilter from './../JacketFilter';
import axios from 'axios';


const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  expansionPanelContainer: {
    width: '25%'
  },
  filter: {
    width: '20%',
  },
  jacketContainer: {
    width: '100%',
    textAlign: 'center',
    '& a':{
      textDecoration: 'none',
      color: '#000'
    },
    webkitBoxShadow: '1px 1px 4px 1px #eeefff',  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    mozBoxShadow: '1px 1px 4px 1px #eeefff',  /* Firefox 3.5 - 3.6 */
    boxShadow: '1px 1px 4px 1px #eeefff',
    '&:hover': {
      filter: 'brightness(95%)'
    }
  },
  jackets: {
    display: 'grid',
    width: '80%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridGap: '1.5rem',
    justifyItems: 'center',
    padding: '0 30px',
  },
  jacketName: {
    color: '#000',
    fontWeight: '600'
  },
  jacketPrice: {
    color: '#000'
  },
  jacketPhoto: {
    width: '100%',
    objectFit: 'cover',
    objectPosition: '0 0',
    height: '200px'
  },
  jacketPhotoPlaceholder: {
    width: '100%',
    objectFit: 'cover',
    objectPosition: '50 50',
    height: '200px' 
  }
});

class LandingPage extends Component {
  
  state = {
    jacketsSelected: [{
      photos: [{
        URL: '',
        ID: ''
      }]
    }],
    responseError: ''
  }

  componentDidMount = async() => {
    await axios({
      method: 'get',
      // url: `${window.location.origin}/users`,
      url: `http://localhost:3001/products/`
    }).then(response => {
      console.log('responsemount', response);
      this.setState({ jacketsSelected: response.data });
    }).catch(error => {
      if(error.response){
        this.setState({ responseError: error.response.data.errors.message});
      } else {
        this.setState({ responseError: 'Something went wrong :('});
      }
    });
  }

  handleFilterChange = async (filterSelection, newfilterSelection) => {

    const keys = Object.keys(newfilterSelection);

    keys.forEach((key) => {
      filterSelection[key] = newfilterSelection[key];
    });

    await axios({
        method: 'get',
        // url: `${window.location.origin}/users`,
        url: `http://localhost:3001/products/`,
        params: newfilterSelection
    }).then(response => {
        console.log('response', response);
        this.setState({ jacketsSelected: response.data });
    }).catch(error => {
        if(error.response){
          this.setState({ responseError: error.response.data.errors.message});
        } else {
          this.setState({ responseError: 'Something went wrong :('});
        }
    });
  }

  render() {
    const { classes } = this.props;
    const jacketsSelected = this.state.jacketsSelected;
    const displayJackets = [];
    
    jacketsSelected.forEach((jacket) => {
      displayJackets.push(
        <div className={classes.jacketContainer}>
          <Link to={`/product/${jacket._id}`}>
            {(jacket.photos[0] && jacket.photos[0].URL) ? <img src={jacket.photos[0].URL} className={classes.jacketPhoto} alt="jacket"/> : <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/ProductImagePlaceholder.png" className={classes.jacketPhotoPlaceholder} alt="placeholder jacket image" />}
            <div className={classes.jacketName}>{jacket.name}</div>
            <div className={classes.jacketPrice}>${jacket.price}</div>
          </Link>
        </div>
      );
    });

    return (
      <div>
        <PageWrapper>
          <TitleWrapperSmall>
            Discover Jackets
          </TitleWrapperSmall>
          <div className={classes.container}>
            <div className={classes.filter}>
              <JacketFilter update={this.handleFilterChange} />
            </div>
            <div className={classes.jackets}>
              {displayJackets}
            </div>
          </div>
        </PageWrapper>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);