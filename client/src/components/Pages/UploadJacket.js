import React, { Component } from "react";
// import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';


const styles = theme => ( {
	container: {
        padding: '30px',
        alignItems: 'center',

	},
	pageTitle:{
        whiteSpace: 'nowrap',
        fontWeight: 600,
        letterSpacing: '1px',
        textDecoration: 'none',
        fontSize: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
    	boxShadow: 'none',
    	borderRadius: 0,
    	padding: '15px 60px',
    },
    toggleButton: {
    	selected: {
      		backgroundColor: 'black',
      		color: 'white'
    	},
    },
    toggleButtonGroup: {
    	// margin: '5px'
    },
});

class UploadJacketPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alignment: []
		};
		// this.ensureLoggedIn = this.ensureLoggedIn.bind(this);
	}

	ensureLoggedIn() { // don't bind this
    	if (!localStorage.token) {
        	this.props.history.push(`/login`);
        }
    }

	render() {

        this.ensureLoggedIn();

		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<div className={classes.pageTitle}>
					Upload new product
				</div>

				<Grid container direction="column" className={classes.container}>
					{/* Where the images and form will go */}
					<Grid container item direction="row"> 
						{/* The images */}
						<Grid item xs={6}>
							<ImageUploadArea />
						</Grid>

						<Grid item xs={6}>
							<form onSubmit={this.handleSubmit} className={classes.form} noValidate>
								<FormHelperText component='span'> <b> Title: </b></FormHelperText>
								<TextField
									fullWidth={true}
		                            // error={this.state.touched.name ? (errors.name ? true : false) : false}
                            		// helperText={this.state.touched.name ? errors.name : ''}
                            		variant="outlined"
								/>

								<FormHelperText component='span'> <b> Description: </b></FormHelperText>
								<TextField
									fullWidth={true}
		                            // error={this.state.touched.name ? (errors.name ? true : false) : false}
                            		// helperText={this.state.touched.name ? errors.name : ''}
                            		variant="outlined"
                            		multiline={true}
                            		rows={6}
                            	/>

                            	<Grid container>
                            		<Grid container item direction="row" spacing={2}>
	                            		<Grid item xs={6}>
		                    			    <FormHelperText component='span'> <b> Price: </b></FormHelperText> <br/>
		                    			    <TextField
										        id="adornment-price"
										        // className={clsx(classes.margin, classes.textField)}
										        variant="outlined"
										        // value={values.amount}
										        // onChange={handleChange('amount')}
										        InputProps={{
										          startAdornment: <InputAdornment position="start">$</InputAdornment>,
										        }}
		  									/>
	  									</Grid>
	  									<Grid item xs={6}>
											<FormHelperText component='span'> <b> Sizes: </b></FormHelperText><br/>
			                            	<ToggleButtonGroup size="medium" value={this.state.alignment} className={classes.toggleButtonGroup}
			                            		onChange={(e, newAlignment) => this.setState({alignment: newAlignment})}>

			                            		<ToggleButton key={1} value="xs" className={classes.toggleButton} >
										    		xs
										    	</ToggleButton>,
										    	<ToggleButton key={2} value="s" className={classes.toggleButton} >
										    		s
										    	</ToggleButton>,
										    	<ToggleButton key={3} value="m" className={classes.toggleButton} >
										    		m
										    	</ToggleButton>,
										    	<ToggleButton key={4} value="l" className={classes.toggleButton} >
										    		l
										    	</ToggleButton>
										    	<ToggleButton key={5} value="xl" className={classes.toggleButton} >
										    		xl
										    	</ToggleButton>
										    	<ToggleButton key={6} value="xxl" className={classes.toggleButton} >
										    		xxl
										    	</ToggleButton>

			                            	</ToggleButtonGroup>
	                            		</Grid>
	                            	</Grid>
                            	</Grid>
							</form>
						</Grid>
					</Grid>

					<br/> <br/>

					<Grid item xs={12}>
						<Button variant="outlined" color="inherit" type="button" className={classes.button}> 
							<Typography variant="button" display="block" gutterBottom> Upload </Typography>
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

class ImageUploadArea extends Component {


	render() {
		return (
			<div> 

			</div>
		);
	}
}

export default withStyles(styles)(UploadJacketPage);