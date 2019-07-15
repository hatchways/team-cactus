import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
// import TitleWrapper from '../Wrappers/TitleWrapper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    button: {
        marginTop: '25px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    storeBanner: {
        alignItems: 'center',
        justify: 'center',
        textAlign: 'center'
    },
    coverPhoto: {
        height: '450px',
        overflow: 'hidden',
        objectFit: 'cover',
    }
});

class MyStorePage extends Component {
	state = {
		storeName: "",
		storeDesc: "",
		coverURL: ""
	}
    
    fetchStoreData = async () => {
        console.log('hereeeee');
        await axios({
            method: 'get',
            url: `http://localhost:3001/shops`,
            headers: {'Authorization': localStorage.token },
          }).then(response => {
            this.setState({ storeName: response.data.name});
            this.setState({ storeDesc: response.data.description});
            this.setState({ coverURL: response.data.coverPhoto});
          }).catch(error => {
            if (error.response){
                this.setState({ responseError: error.response});
            } else {
                this.setState({ responseError: 'Something went wrong :('});
            }
          });
    }

    ensureLoggedIn() {
        if (!localStorage.token) {
            this.props.history.push(`/login`);
        }
    }

    async componentDidMount() {
        await this.fetchStoreData();
    }

    render() {
		const { classes } = this.props;
        {this.ensureLoggedIn()};

		return (
			<div>
                <Grid container direction="column">
                    <div className={classes.storeBanner}>
        				<Grid container item direction="row" justify="flex-start" alignItems="center">
                            <Grid item md={5}>
                                <div>
                                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                        {this.state.storeName}
                                    </Typography>
                                    <Typography variant="h5" color="inherit" paragraph>
                                        {this.state.storeDesc}
                                    </Typography>
                                    <br/> <br/> <br/>
                                    <ButtonWrapper type="button" classes={{ button: classes.button }}>
                                        Edit Cover
                                    </ButtonWrapper>
                                </div>
                            </Grid>

                            <Grid item md={7}>
                                <div className={classes.coverPhoto}>
                                    <img
                                        style={{ height: '100%', width: '100%' }}
                                        src={this.state.coverURL}
                                        alt="background"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container item direction="row">
                            <Grid container item direction="column" justify="flex-start" alignItems="center">
                                <Grid item md={4}>
                                    
                                </Grid>
                                <Grid item md={4}>
                                    
                                </Grid>
                                <Grid item md={4}>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
		  	</div>
		);
    }

}

export default withStyles(styles)(MyStorePage);