import React, { Component }from 'react';
import { withStyles } from "@material-ui/core/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import CheckoutForm from './Pages/PageComponents/CheckoutForm';
import ShippingForm from './Pages/PageComponents/ShippingForm';
import Divider from "@material-ui/core/Divider";
import { Elements, StripeProvider} from 'react-stripe-elements';


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
			activeStep: 0,
		}
	}

	getActiveTab = () => {
		switch (this.state.activeStep) {
		    case 0:
		    	return <InfoTab/>;
		    case 1:
		    	return <ShippingTab setEmail={(email) => {this.setState({email: email})}} />;
		    case 2:
		    	return <PaymentTab email={this.state.email} />;
		    default:
		    	return 'Unknown step';
		}
	}

	handleNext = () => {
		let newStep = this.state.activeStep + 1;
		this.setState({activeStep: newStep})
		// this.props.setActiveStep(newStep);
	}

	handleBack = () => {
		let newStep = this.state.activeStep - 1;
		this.setState({activeStep: newStep})
		// this.props.setActiveStep(newStep);
	}

	getButtonArea = () => {
		const { classes } = this.props;

		if (this.state.activeStep === this.state.steps.length - 1) {
			return (				
				<div style={{textAlign: 'center'}}>
					<Button 
						variant="outlined"
						color="inherit"
						disabled={this.state.activeStep === 0} 
						onClick={this.handleBack}
						className={classes.button}
					>
						Back
					</Button>

					<Button variant="outlined" color="inherit" type="submit" className={classes.button}> 
						<Typography variant="button" display="block" gutterBottom> <b> Pay now </b> </Typography>
					</Button>
				</div>
			);
		} 
		else {
			return (
				<div style={{textAlign: 'center'}}>
					<Button 
						variant="outlined"
						color="inherit"
						disabled={this.state.activeStep === 0} 
						onClick={this.handleBack}
						className={classes.button}
					>
						Back
					</Button>

					<Button
						variant="outlined"
						color="inherit"
						onClick={this.handleNext}
						disabled={this.state.activeStep === this.state.steps.length - 1}
						className={classes.button}
					>
						Next
					</Button>
				</div>
			);
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
				
				<div>
					{this.getButtonArea()}
				</div>
			</div>
	    );
	}
}

class PaymentTab extends Component {
	render() {
		return (
			<StripeProvider apiKey={STRIPE_PK}>
				<Elements>
					<CheckoutForm 
						email={this.props.email} 
						handlePayment={() => {this.setState({page: "success"})}}
					/>
				</Elements>
			</StripeProvider>
		);
	}
}

class ShippingTab extends Component {

	handleSubmit(e) {
		e.preventDefault();
	}

	render() {
		return (
			<ShippingForm />
		);
	}
}

class InfoTab extends Component {
	render() {
		return (
			<p></p>
		);
	}
}

class SuccessTab extends Component {
	render() {
		return (
			<p></p>
		);
	}
}

export default withStyles(styles)(CheckoutStepper);