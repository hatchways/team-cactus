import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Elements, StripeProvider} from 'react-stripe-elements';
// import axios from 'axios';
import PageWrapper from '../Wrappers/PageWrapper';
import CheckoutForm from './PageComponents/CheckoutForm';
import ShippingForm from './PageComponents/ShippingForm';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const STRIPE_PK = "pk_test_gwivf5Iq9bKkDQjzqDs7lFdj00SezimkV7";

const styles = theme => ({
 	container: {
 		width: '100%',
 		padding: '60px'
 	},
  	title: {
        margin: '20px 40px',
        fontWeight: 600,
        letterSpacing: '1px',
        textDecoration: 'none',
        fontSize: '25px',
  	},
  	checkoutTopBar: {
		display: 'inline-block',
		margin: '30px',
		width: '100%'
  	},
  	summary: {
  		borderTop: '7px solid black',
	    justifyContent: "center",
	    alignItems: 'flex-start'
  	},
});

class CheckoutPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: "shipping", // "info", "shipping", "payment", "success",
			email: ""
		}
	}

	render() {
		const { classes } = this.props;
		let total = 500;
		let currency = "CAD";
		let activeTab;

		switch(this.state.page) {
			case "info":
				activeTab = <CartTab />
				break;
			case "shipping":
				activeTab = <ShippingTab setEmail={(email) => {this.setState({email: email})}}/>
				break;
			case "payment":
				activeTab = <PaymentTab email={this.state.email}/>
				break;
			case "success":
				activeTab = <SuccessTab />
				break;
			default:
				break;
		}

		return (
			<PageWrapper>
				<Grid container direction="row" alignItems="flex-start" justify="center" spacing={3}>
					<Grid item md={8}>
						<Paper square={true} >
							<div className={classes.checkoutTopBar}>
								<Typography component="span" className={classes.title}> Checkout </Typography>
								<span style={{textAlign: 'right'}}> Information Billing Shipment </span>
							</div>
							<Divider/>
							{activeTab}
						</Paper>
					</Grid>

					<Grid item md={4}>
						<Paper className={classes.summary} square={true}>
							<div style={{height: '70%', margin: '0px 0px 40px 0px'}}>
								<Typography className={classes.title} align="center"> Your Order: </Typography>
								<Typography variant="subtitle1" align="center"> <b>{currency} {total.toFixed(2)}</b> </Typography>
								<Typography variant="subtitle2" align="center"> Fast shipping: {currency} 15.00 </Typography>
							</div>
							<Divider />
							<div style={{display: 'inline-block', textAlign: 'center', margin: '10px'}}>
								<Typography className={classes.title} component="span" align="center">
									Total:
								</Typography> 
								<Typography variant="subtitle2" component="span" align="left">
									<b> {currency} {total.toFixed(2)} </b>
								</Typography>
							</div>
						</Paper>
					</Grid>
				</Grid>
			</PageWrapper>
		);
	}
}

class PaymentTab extends Component {
	render() {
		return (
			<StripeProvider apiKey={STRIPE_PK}>
				<Elements>
					<CheckoutForm email={this.props.email} handlePayment={() => {this.setState({page: "success"})}}/>
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

class CartTab extends Component {
	render() {
		return (
			<p> </p>
		);
	}
}

class SuccessTab extends Component {
	render() {
		return (
			<p> </p>
		);
	}
}

export default withStyles(styles)(CheckoutPage);

