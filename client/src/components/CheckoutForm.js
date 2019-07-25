import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import ButtonWrapper from './Wrappers/ButtonWrapper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
	button: {
    	boxShadow: 'none',
    	borderRadius: 0,
    	padding: '15px 20px',
    	margin: '60px 0px',
    	width: '30%',
    },
    form: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '100%',
    }
});

class CheckoutForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rememberCard: false,
			billingInfo: {
				name: '',
				address: ''
			},
			source: ""
		}
	}


	
	handleSubmit(e) {
		console.log("submit!");
		this.props.stripe.createSource({
			type: 'card',
			owner: {
				name: 'Jenny Rosen',
			},
	    }).then(async function(result) {
	    	if (result.error) {
	    		console.log("Could not create stripe source");
	    	} else {
	    		// Create and capture the charge
	    		let data = {
	    			source: result.source,

	    		};
	    		await axios({
	    			method: 'put',
	    			url: 'http://localhost:3000/cart/checkout',
	    			data: data,
	    			headers: {'Authorization': localStorage.token }
	    		}).then(response => {
	    			console.log("purchase successful!");
	    		}).catch(error => {
	    			console.log("purchase failure: " + error);
	    		})

	    	}
	    });
	 }

	 render() {
	 	const { classes } = this.props;

	 	return (
			<div style={{padding: '30px'}}>
				<form onSubmit={this.handleSubmit} className={classes.form}>
        			<Typography style={{padding: '20px 0px'}} variant="body1"> 
        				<b> Enter your card details to pay: </b> 
        			</Typography>

        			<CardField type="number" />
        			<CardField type="expiry" />
        			<CardField type="cvc" />
        			
        			<FormControlLabel
        				control={
          					<Checkbox
					            checked={this.state.rememberCard}
					            onChange={e => {this.setState({rememberCard: e.target.checked })}}
					            color="primary"
				        	/>
        				}
        				label="Remember card"
      				/>
      		
					<br/> <br/>

					<div style={{textAlign: 'center'}}>
						<Button variant="outlined" color="inherit" type="submit" className={classes.button}> 
							<Typography variant="button" display="block" gutterBottom> <b> Pay now </b> </Typography>
						</Button>
					</div>
		        </form>
	        </div>
	 	);
	 }
}

class CardField extends Component {

	render() {
		const { type } = this.props;

		let formField;
		let label;

		switch(type) {
			case "number":
				formField = <CardNumberElement style={{base: {fontSize: '18px'}}} onReady={(el) => el.focus()} />
				label = "Card number: ";
				break;
			case "expiry":
				formField = <CardExpiryElement style={{base: {fontSize: '18px'}}} onReady={(el) => el.focus()} />
				label = "Expiry date: ";
				break;
			case "cvc":
				formField = <CardCvcElement style={{base: {fontSize: '18px'}}} onReady={(el) => el.focus()} />
				label = "CVC number: ";
				break;
			default:
				formField = "";
				label = "";
				break;
		}

		return (
			<div style={{margin: '10px 0px'}}>
				<FormHelperText component='span'> {label} </FormHelperText>
		    	{formField}
		    </div>
	    );
	}
}

export default withStyles(styles)(injectStripe(CheckoutForm));

