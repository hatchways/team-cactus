import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
import FormCardWrapper from '../Wrappers/FormCardWrapper';
import FormTextFieldWrapper from '../Wrappers/FormTextFieldWrapper';
import TitleWrapper from '../Wrappers/TitleWrapper';

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
    }
});

class MyStorePage extends Component {
	// state = {

    // }
    
    fetchStoreData = () => {
        axios({
            method: 'post',
            // url: `${window.location.origin}/users`,
            url: `http://localhost:3001/users/mystore`,
            headers: {'Authorization': localStorage.token },
          }).then(response => {
            console.log('I GOT STORE DATA!', response);
          }).catch(error => {
            console.log('ERROR', error);
            if(error.response){
                this.setState({ responseError: error.response});
            } else {
                this.setState({ responseError: 'Something went wrong :('});
            }
          });

        return(
            <div>testing</div>
        );
    }

	render() {
        const { classes } = this.props;

		return (
			<div className={classes.container}>
                HIII
                {this.fetchStoreData()}
				{/* {`${localStorage.name}'s Store!`} */}
			</div>
		);
	}
}

export default withStyles(styles)(MyStorePage);