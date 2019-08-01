import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles"; 
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const styles = theme => ({
 	formLabel: {
  		// margin: '50px',
  	},
  	sectionHeader: {
        // margin: '20px 50px',
        fontWeight: 600,
        letterSpacing: '1px',
        textDecoration: 'none',
  	},
  	button: {
    	boxShadow: 'none',
    	borderRadius: 0,
    	padding: '15px 20px',
    	margin: '60px 0px',
    	width: '30%',
    },
});

class ShippingForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			address: ""
		}
	}

	async getCustomerAddress() {
		await axios({
			method: 'get',
			url: 'http://localhost:3000/users',
			headers: {'Authorization': localStorage.token }
		}).then(response => {
			if (response.data.address) {
				this.setState({address: response.data.address});
			}
		}).catch(err => {

		})
	}

	async componentDidMount() {
		this.getCustomerAddress();
	}

	render() {
		const { classes } = this.props;

		return (
        	<div>
				<form onSubmit={this.handleSubmit}>
					<Typography className={classes.sectionHeader} variant="body1"> 
	    				<b> Shipping information </b> 
		        	</Typography>
		        	<Divider/>

		        	<div style={{margin: '30px'}}>
			        	<span>
		        			<label className={classes.formLabel}> Contact: </label>
		        			<Typography component="span"> {this.props.email} </Typography>
			        		<Button variant="outlined" color="inherit" className={classes.button}>Change</Button>
			        	</span>
		        	</div>
		        </form>

				<div style={{textAlign: 'center'}}>
					<Button 
						variant="outlined"
						color="inherit"
						onClick={this.props.handleBack}
						className={classes.button}
					>
						Back
					</Button>

					<Button
						variant="outlined"
						color="inherit"
						onClick={this.props.handleNext}
						className={classes.button}
					>
						Next
					</Button>
				</div>
	        </div>
		);
	}
}

export default withStyles(styles)(ShippingForm);
