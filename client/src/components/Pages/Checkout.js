import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
// import axios from 'axios';
import PageWrapper from '../Wrappers/PageWrapper';
import CheckoutStepper from '../CheckoutStepper';
import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import CheckoutForm from './PageComponents/CheckoutForm';
import ShippingForm from './PageComponents/ShippingForm';
import InformationForm from './PageComponents/CustomerInfoForm';
import { Elements, StripeProvider } from 'react-stripe-elements';

const STRIPE_PK = "pk_test_gwivf5Iq9bKkDQjzqDs7lFdj00SezimkV7";

const styles = theme => ({
 	container: {
 		width: '100%',
 		padding: '60px'
 	},
  	title: {
        // margin: '20px 40px',
        fontWeight: 600,
        letterSpacing: '1px',
        textDecoration: 'none',
        fontSize: '25px',
  	},
  	checkoutHeader: {
  		width: '100%',
  		display: 'flex',
  		flexDirection: "row",
  		justifyContent:"space-between",
		alignItems: "center",
		// display: 'flex',
		// flexDirection: 'row',
		// justifyContent: 'space-between'
		padding: '20px 40px'
  	},
  	summary: {
  		borderTop: '7px solid black',
	    justifyContent: "center",
	    alignItems: 'flex-start'
  	},
  	formContainer: {
  		padding: '40px'
  	}
  	// button: {
   //  	boxShadow: 'none',
   //  	borderRadius: 0,
   //  	padding: '15px 20px',
   //  	margin: '60px 0px',
   //  	width: '30%',
   //  },
});

class CheckoutPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: "",
			steps: ['Information', 'Shipping', 'Payment'],
			activeStep: 2
		}
	}

	handleNext = () => {
		let newStep = this.state.activeStep + 1;
		if (newStep < this.state.steps.length) {
			this.setState({activeStep: newStep})
		}
	}

	handleBack = () => {
		let newStep = this.state.activeStep - 1;
		if (newStep >= 0) {
			this.setState({activeStep: newStep})
		}
	}

	getActiveTab = () => {

		switch (this.state.activeStep) {
		    case 0:
		    	return (
		    		<InformationForm 
	    				setEmail={ (email) => {this.setState( {email: email} )} }
						handleNext={this.handleNext}
		    		/>
		    	);

		    case 1:
		    	return (
		    		<ShippingForm 
		    			email={this.state.email} 
		    			handleBack={this.handleBack}
		    			handleNext={this.handleNext}
					/>
				);

		    case 2:
		    	return (	
		    		<StripeProvider apiKey={STRIPE_PK}>
						<Elements>
							<CheckoutForm 
								email={this.state.email} 
				    			handleBack={this.handleBack} 
								handlePayment={() => {}}
								purchaseData={this.props.purchaseData}
							/>
						</Elements>
					</StripeProvider>
				);

		    default:
		    	return'Unknown step';
		}
	
	}

	render() {
		const { classes } = this.props;
		let purchaseData = {
			total: 500,
			currency: "CAD"
		}

		return (
			<PageWrapper>
				<Grid container direction="row" alignItems="flex-start" justify="center" spacing={3}>
					<Grid item xs={8}>
						<Paper square={true}>
							<div className={classes.checkoutHeader}>
								<div>
									<Typography component="span" className={classes.title}> Checkout </Typography>
								</div>
								<div>
									<CheckoutStepper 
										purchaseData={purchaseData} 
										currentStep={this.state.activeStep}
										steps={this.state.steps}
									/>
								</div>
							</div>
							<Divider/>
							<div className={classes.formContainer}>
								{this.getActiveTab()}
							</div>
						</Paper>
					</Grid>

					<Grid item xs={4}>
						<Paper className={classes.summary} square={true}>
							<div style={{height: '70%', margin: '0px 0px 40px 0px'}}>
								<Typography className={classes.title} align="center"> Your Order: </Typography>
								<Typography variant="subtitle1" align="center"> 
									<b>{purchaseData.currency} {purchaseData.total.toFixed(2)}</b> 
								</Typography>
								<Typography variant="subtitle2" align="center"> 
									Fast shipping: {purchaseData.currency} 15.00 
								</Typography>
							</div>
							<Divider />
							<div style={{width: '100%', display: 'inline-block', textAlign: 'center', margin: '10px'}}>
								<Typography className={classes.title} component="span" align="center">
									Total:
								</Typography> 
								<Typography variant="subtitle2" component="span" align="left">
									<b> {purchaseData.currency} {purchaseData.total.toFixed(2)} </b>
								</Typography>
							</div>
						</Paper>
					</Grid>
				</Grid>
			</PageWrapper>
		);
	}
}

export default withStyles(styles)(CheckoutPage);

