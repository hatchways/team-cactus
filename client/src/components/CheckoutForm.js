import React, { Component } from "react";
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends React.Component {
	constructor(props){
		this.state = {
			rememberCard: false;
		}
	}
	handleSubmit(e) {
		this.props.stripe.createSource({
			type: 'card',
			owner: {
				name: 'Jenny Rosen',
			},
	    }).then(function(result) {
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
	    			data: data
	    		}).then(response => {
	    			console.log("purchase successful!");
	    		}).catch(error => {
	    			console.log("purchase failure: " + error);
	    		})

	    	}
	    });
	 }

	 render() {
	 	return (
			<form onSubmit={this.handleSubmit}>
		        <input
		            name="rememberCard"
		            type="checkbox"
		            checked={this.state.rememberCard}
		            onChange={(e) => {this.setState({rememberCard: e.target.checked })}} />
		        <button>Confirm order</button>
      		</form>
	 	);
	 }
}

export default injectStripe(CheckoutForm);

