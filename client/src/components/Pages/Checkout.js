import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Elements, StripeProvider} from 'react-stripe-elements';
import axios from 'axios';
import TitleWrapper from '../Wrappers/TitleWrapper';
import PageWrapper from '../Wrappers/PageWrapper';
import FormCardWrapper from '../Wrappers/FormCardWrapper';
import CheckoutForm from '../CheckoutForm';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const STRIPE_PK = "pk_test_gwivf5Iq9bKkDQjzqDs7lFdj00SezimkV7";

const styles = theme => ({
	// container: {
	// 	display: 'flex',
	// 	flexDirection: 'row',
	// 	alignItems: 'left',
	// 	width: '100%',
	// 	padding: '30px',
 //  	},
 	container: {
 		width: '100%',
 		padding: '60px'
 	},
  	form: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'left',
        justifyContent: 'center',
        // width: '65%',
        // padding: '30px',
  	},
  	title: {
        margin: '20px 40px',
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
  		// width: '100%',
  		// display: "flex",
	    // flexDirection: "column",
	    justifyContent: "center",
	    // flexShrink: 2
	    alignItems: 'flex-start'
  	}
});

class CheckoutPage extends React.Component {

	render() {
		const { classes } = this.props;
		let total = 500;
		let currency = "CAD";

		return (
			<PageWrapper>
				<Grid container direction="row" alignItems="flex-start" justify="center" spacing={3}>
					<Grid item md={8}>
						<Paper className={classes.form} square={true} >
							<div className={classes.checkoutTopBar}>
								<Typography className={classes.title}> Checkout </Typography>
							</div>
							<Divider/>
							<StripeProvider apiKey={STRIPE_PK}>
								<Elements>
									<CheckoutForm />
								</Elements>
							</StripeProvider>
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

export default withStyles(styles)(CheckoutPage);

