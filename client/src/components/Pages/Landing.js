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
  jackets: {
    display: 'grid',
    gridTemplateColumns: '100px 50px 100px',
    gridTemplateRows: '80px auto 80px', 
    gridColumnGap: '10px',
    gridRowGap: '15px',
    width: '80%',
    backgroundColor: 'yellow'
  },

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
        <div>
          {(jacket.photos[0] && jacket.photos[0].URL) ? <Link to={`/product/${jacket._id}`}><img src={jacket.photos[0].URL} /></Link> : ''}
          <div>{jacket.name}</div>
          <div>{jacket.price}</div>
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