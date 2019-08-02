import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import JacketFilter from './../JacketFilter';
import PageWrapper from '../Wrappers/PageWrapper';
import TitleWrapperSmall from '../Wrappers/TitleWrapperSmall';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '50px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '83%',
    padding: '0 30px',
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
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridTemplateRows: 'repeat(auto-fill, minmax(auto, 270px))',
    gridGap: '1.5rem',
    justifyItems: 'center',

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
  },
  toggleButton: {
    height: 'auto',
    borderRadius: '0 !important',
    '& selected': {
      backgroundColor: '#000 !important',
      color: '#fff'
    }
  },
  toggleContainer: {
    marginBottom: '30px'
  },
  secondToggleGroup: {
    marginLeft: '20px'
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
      higher_price: 500,
      toggleBy: 'date',
      orderBy: 'desc',
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

  handleToggleChange = (event, newToggle) => {
    let newFilterSelection;
    if((newToggle === "price") || (newToggle === "date")) {
      newFilterSelection = { toggleBy: newToggle };
    } else if((newToggle === "asc") || (newToggle === "desc")){
      newFilterSelection = { orderBy: newToggle };
    }
    if(newToggle) {
      this.handleFilterChange(newFilterSelection);
    }
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
            <div className={classes.content}>
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup value={this.state.filterState.toggleBy} exclusive onChange={this.handleToggleChange}>
                  <ToggleButton value="date" classes={{ root: classes.toggleButton }}>
                      Date Added
                    </ToggleButton>
                  <ToggleButton value="price" classes={{ root: classes.toggleButton }}>
                    Price
                  </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup value={this.state.filterState.orderBy} exclusive onChange={this.handleToggleChange} className={classes.secondToggleGroup}>
                  <ToggleButton value="desc" classes={{ root: classes.toggleButton }}>
                    Descending
                  </ToggleButton>
                  <ToggleButton value="asc" classes={{ root: classes.toggleButton }}>
                    Ascending
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className={classes.jackets}>
                {displayJackets.length ? displayJackets : 'No Jackets matched the criteria.'}
              </div>
            </div>
            
          </div>
        </PageWrapper>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);