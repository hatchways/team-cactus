import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Elements, StripeProvider} from 'react-stripe-elements';
import axios from 'axios';
import TitleWrapper from '../Wrappers/TitleWrapper';
import FormCardWrapper from '../Wrappers/FormCardWrapper';
import CheckoutForm from '../CheckoutForm';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const STRIPE_PK = "pk_test_gwivf5Iq9bKkDQjzqDs7lFdj00SezimkV7";

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'left',
		width: '100%',
		padding: '30px',
  	},
  	form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        marginTop: '60px',
        width: '65%',
        padding: '30px',
  	},
  	title: {
        margin: '6px 0 20px 0',
        fontWeight: 600,
        letterSpacing: '1px',
        textDecoration: 'none',
        fontSize: '25px',
  	},
  	checkoutTopBar: {
		display: 'inline-block'
  	},
  	summary: {
  		borderTop: '7px solid black',
  		width: '35%',
  		margin: '60px 30px',
  		display: "flex",
	    flexDirection: "column",
	    justifyContent: "center",
	    flexShrink: 2
  	}
});

class CheckoutPage extends React.Component {

	render() {
		const { classes } = this.props;
		let total = 500;
		let currency = "CAD";

		return (
			<div className={classes.container}>
				<Paper className={classes.form} square={true} >
					<div className={classes.checkoutTopBar}>
						<Typography className={classes.title}> Checkout </Typography>
						<Divider/>
					</div>
					<StripeProvider apiKey={STRIPE_PK}>
						<Elements>
							<CheckoutForm />
						</Elements>
					</StripeProvider>
				</Paper>

				<Paper className={classes.summary} square={true}>
					<div style={{height: '70%'}}>
						<Typography className={classes.title} align="center"> Your Order: </Typography>
						<Typography variant="subtitle1" align="center">  </Typography>
						<Typography variant="subtitle2" align="center">  </Typography>
					</div>
					<Divider />
					<div style={{display: 'inline-block', textAlign: 'center', margin: '10px'}}>
						<Typography className={classes.title} component="span" align="center">
							Total: 
						</Typography> 
						<Typography variant="subtitle2" component="span" align="center"><b> {currency} {total} </b></Typography>
					</div>
				</Paper>
			</div>
		);
	}
	
}

export default withStyles(styles)(CheckoutPage);

