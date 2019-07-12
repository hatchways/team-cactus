import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
// import FormCardWrapper from '../Wrappers/FormCardWrapper';
// import FormTextFieldWrapper from '../Wrappers/FormTextFieldWrapper';
// import TitleWrapper from '../Wrappers/TitleWrapper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    button: {
        marginTop: '25px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    storeBanner: {
    	backgroundSize: 'cover',
    }
});

class MyStorePage extends Component {
	state = {
		storeName: "",
		storeDesc: "",
		coverURL: ""
	}
    
    fetchStoreData = () => {
    	console.log("fetching store");
        axios({
            method: 'post',
            url: `http://localhost:3001/users/mystore`,
            headers: {'Authorization': localStorage.token },
          }).then(response => {
            console.log('I GOT STORE DATA!');
            this.setState({ storeName: response.data.name});
          }).catch(error => {
            console.log('ERROR');
            if(error.response){
                this.setState({ responseError: error.response});
            } else {
                this.setState({ responseError: 'Something went wrong :('});
            }
          });
         console.log(this.state.storeName);
    }

    render() {
		const { classes } = this.props;
    	this.fetchStoreData();

		return (
			<div className={classes.storeBanner}>
                <Grid container direction="column">
    				<Grid container item direction="row" justify="flex-start" alignItems="center">
                        <Grid item md={5}>
                            <div>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    Store name
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                    Store description
                                </Typography>
                                <ButtonWrapper type="button" classes={{ button: classes.button }}>
                                    Edit Cover
                                </ButtonWrapper>
                            </div>
                        </Grid>

                        <Grid item md={7}>
                            <div>
                                <img
                                    // style={{ display: 'none' }}
                                    src="https://source.unsplash.com/user/erondu"
                                    alt="background"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
		  	</div>
		);
    }

}

export default withStyles(styles)(MyStorePage);