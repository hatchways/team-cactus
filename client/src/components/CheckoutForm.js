import React, { Component } from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import ButtonWrapper from './Wrappers/ButtonWrapper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

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
	 	//<form onSubmit={this.handleSubmit}>
	 	//<Checkbox
		//            checked={this.state.rememberCard}
		//            onChange={e => {this.setState({rememberCard: e.target.checked })}} />
	 	return (
				<div style={{padding: '30px'}}>
					<label>
	        			<Typography variant="body1"> <b> Enter your card details to pay </b> </Typography>
	        			<CardElement style={{base: {fontSize: '18px'}}} onReady={(el) => el.focus()} />
	      			</label>
			        <ButtonWrapper>Confirm order</ButtonWrapper>
		        </div>
	 	);
	 }
}

export default injectStripe(CheckoutForm);

