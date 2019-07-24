import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Elements, StripeProvider} from 'react-stripe-elements';
import axios from 'axios';
import TitleWrapper from '../Wrappers/TitleWrapper';
import FormCardWrapper from '../Wrappers/FormCardWrapper';
import CheckoutForm from '../CheckoutForm';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const STRIPE_PK = "pk_test_gwivf5Iq9bKkDQjzqDs7lFdj00SezimkV7";

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'left',
		width: '100%',
		padding: '30px'
  	},
  	form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        marginTop: '60px',
        width: '60%',
        padding: '30px'
  	},
  	title: {
        margin: '6px 0 20px 0',
        fontWeight: 600,
        letterSpacing: '1px',
        textDecoration: 'none',
        fontSize: '30px'
  	},
  	checkoutTopBar: {

  	},
  	summary: {
  		borderTop: '10px',
  		width: '40%',
  		margin: '60px 30px'
  	}
});

class CheckoutPage extends React.Component {

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<Paper className={classes.form} square={true} >
					<div className={classes.checkoutTopBar}>
						<Typography className={classes.title}> Checkout </Typography>

						<hr/>
					</div>
					<StripeProvider apiKey={STRIPE_PK}>
						<Elements>
							<CheckoutForm />
						</Elements>
					</StripeProvider>
				</Paper>

				<Paper className={classes.summary} square={true}>
					
				</Paper>
			</div>
		);
	}
	
}

export default withStyles(styles)(CheckoutPage);

