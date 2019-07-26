import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import JacketFilter from './../JacketFilter';
import PageWrapper from '../Wrappers/PageWrapper';
import TitleWrapperSmall from '../Wrappers/TitleWrapperSmall';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '50px'
  },
  expansionPanelContainer: {
    width: '25%'
  },
  filter: {
    width: '17%',
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
    },
  },
  jackets: {
    display: 'grid',
    width: '83%',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridTemplateRows: 'repeat(auto-fill, minmax(auto, 260px))',
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
    filterState: {
      type: '',
      size: '',
      lower_price: 0,
      higher_price: 500
    },
    responseError: ''
  }

  componentDidMount = async() => {
    await axios({
      method: 'get',
      // url: `${window.location.origin}/users`,
      url: `http://localhost:3001/products/`
    }).then(response => {
      this.setState({ jacketsSelected: response.data });
    }).catch(error => {
      if(error.response){
        this.setState({ responseError: error.response.data.errors.message});
      } else {
        this.setState({ responseError: 'Something went wrong :('});
      }
    });
  }

  handleFilterChange = async (newFilterSelection) => {

    const filterState = this.state.filterState; 
    const keys = Object.keys(newFilterSelection);
    
    keys.forEach((key) => {
      filterState[key] = newFilterSelection[key];
    });

    await axios({
        method: 'get',
        // url: `${window.location.origin}/users`,
        url: `http://localhost:3001/products/`,
        params: filterState
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

    this.setState({ filterState: filterState });
  }

  render() {
    const { classes } = this.props;
    const jacketsSelected = this.state.jacketsSelected;
    const displayJackets = [];
    
    jacketsSelected.forEach((jacket, index) => {
      displayJackets.push(
        <div className={classes.jacketContainer} key={index}>
          <Link to={`/product/${jacket._id}`}>
            {(jacket.photos[0] && jacket.photos[0].URL) ? <img src={jacket.photos[0].URL} className={classes.jacketPhoto} alt="jacket"/> : <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/ProductImagePlaceholder.png" className={classes.jacketPhotoPlaceholder} alt="placeholder jacket" />}
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
              <JacketFilter updateFilterState={this.handleFilterChange} filterState={this.state.filterState} />
            </div>
            <div className={classes.jackets}>
              {displayJackets.length ? displayJackets : 'No Jackets matched the criteria.'}
            </div>
          </div>
        </PageWrapper>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);