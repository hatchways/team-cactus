import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import UploadCardWrapper from '../Wrappers/UploadCardWrapper';
import DropzoneWrapper from '../Wrappers/DropzoneWrapper';


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
        fontSize: '30px',
        padding: '0px 30px 30px 30px'
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
    	margin: '60px'
    },
    toggleButton: {
        // margin: '0 10px',
        border: '1px solid rgba(0, 0, 0, .6) !important',
        borderRadius: '0 !important',
        color: '#000'
    }, 
    toggleButtonGroup: {
        backgroundColor: 'transparent',
    },
    toggleButtonSelected: {
        backgroundColor: 'rgba(0, 0, 0, .83) !important',
        color: '#fff !important'
    }
});

class UploadJacketPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: []
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

						{/* The form */}
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
                            		<Grid container item direction="row" spacing={2} justify="space-around" alignItems="center">
	                            		<Grid item>
		                    			    <FormHelperText component='span'> <b> Price: </b> </FormHelperText> <br/>
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
	  									<Grid item>
											<FormHelperText component='span'> <b> Sizes: </b> </FormHelperText><br/>
			                            	<ToggleButtonGroup size="medium" value={this.state.size} className={classes.toggleButtonGroup}
			                            		onChange={(e, newSize) => this.setState({size: newSize})}>

			                            		<ToggleButton key={1} value="xs" classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected}} >
										    		xs
										    	</ToggleButton>,
										    	<ToggleButton key={2} value="s" classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected}} >
										    		s
										    	</ToggleButton>,
										    	<ToggleButton key={3} value="m" classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected}} >
										    		m
										    	</ToggleButton>,
										    	<ToggleButton key={4} value="l" classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected}} >
										    		l
										    	</ToggleButton>
										    	<ToggleButton key={5} value="xl" classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected}} >
										    		xl
										    	</ToggleButton>
										    	<ToggleButton key={6} value="xxl" classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected}} >
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

	constructor(props) {
		super(props);
		this.state = {
			uploadedImg: {url: "", key: ""}
		};

		this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this);
	}

	async uploadPhoto(file) {

        try {
            let data = new FormData();
            data.append( 'image', file );

            await axios({
                method: 'post',
                url: `http://localhost:3001/images/single`,
                headers: {
                    'Authorization': localStorage.token, 
                    'Content-Type': `multipart/form-data;boundary=${data._boundary}`
                },
                data: data
            }).then(response => {
                // Change only the uploaded image and not the permanent one
                this.setState({ uploadedImg: {url: response.data.imageUrl, key: response.data.imageID }});
            }).catch(error => {
                this.setState({ responseError: 'Could not upload image'});
            });
        } 
        catch (asyncErr) {}
    }

    async handlePhotoUpdate(newJacketImg) {
        await this.uploadPhoto(newJacketImg); // this sets state of uploadedImg
    }

	render() {

		return (
			<Grid container>
				<Grid item> 
					<DropzoneWrapper handleUpdate={this.handlePhotoUpdate}>
						<UploadCardWrapper imgSrc={this.state.uploadedImg.url} />
					</DropzoneWrapper>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(UploadJacketPage);