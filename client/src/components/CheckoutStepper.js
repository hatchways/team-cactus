import React, { Component }from 'react';
import { withStyles } from "@material-ui/core/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from "@material-ui/core/Typography";
import CheckoutForm from './Pages/PageComponents/CheckoutForm';
import ShippingForm from './Pages/PageComponents/ShippingForm';
import InformationForm from './Pages/PageComponents/CustomerInfoForm';
import Divider from "@material-ui/core/Divider";
import { Elements, StripeProvider } from 'react-stripe-elements';


const STRIPE_PK = "pk_test_gwivf5Iq9bKkDQjzqDs7lFdj00SezimkV7";

const styles = theme => ({
  	formContainer: {
  		margin: '30px 40px'
  	},
  	button: {
    	boxShadow: 'none',
    	borderRadius: 0,
    	padding: '15px 20px',
    	margin: '60px 0px',
    	width: '30%',
    },
});

class CheckoutStepper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			steps: ['Information', 'Shipping', 'Payment'],
			activeStep: 2,
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
		    	return 'Unknown step';
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

	render() {

		const { classes } = this.props;
		return (
			<div>
	      		<Stepper activeStep={this.state.activeStep}>
	        		{this.state.steps.map((label, index) => {
						return (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						);
	        		})}
	      		</Stepper>

				<Divider/>

				<div className={classes.formContainer}>
					{this.getActiveTab()}
				</div>
			</div>
	    );
	}
}


export default withStyles(styles)(CheckoutStepper);