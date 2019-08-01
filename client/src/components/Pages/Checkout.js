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
  	checkout: {
		// display: 'inline-block',
		padding: '40px 0px',
  	},
  	summary: {
  		borderTop: '7px solid black',
	    justifyContent: "center",
	    alignItems: 'flex-start'
  	},
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
			activeStep: 0,// "info", "shipping", "payment"
			email: "",
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
					<Grid item md={8}>
						<Paper square={true} >
							<div className={classes.checkout}>
								<Typography component="span" className={classes.title}> Checkout </Typography>
								<CheckoutStepper purchaseData={purchaseData} />
							</div>
						</Paper>
					</Grid>

					<Grid item md={4}>
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
							<div style={{display: 'inline-block', textAlign: 'center', margin: '10px'}}>
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

