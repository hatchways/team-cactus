import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
import ImageOverlayWrapper from '../Wrappers/ImageOverlayWrapper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dropzone from 'react-dropzone';


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
    },
});

class MyStorePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: "",
            storeDesc: "",
            coverURL: "",
            shopID: "",
            isEditMode: false
        }

        this.handleEditStoreClick = this.handleEditStoreClick.bind(this);
    }
    
    fetchStoreData = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:3001/shops`,
            headers: {'Authorization': localStorage.token },
          }).then(response => {
            this.setState({ storeName: response.data.name});
            this.setState({ storeDesc: response.data.description});
            this.setState({ coverURL: response.data.coverPhoto});
            this.setState({ shopID: response.data.shopID});
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

    // loadJackets() {
    //     axios({
    //         method: 'get',
    //         url: `http://localhost:3001/shops/{this.state.shopID/products}`,
    //         headers: {'Authorization': localStorage.token },
    //     }).then(response => {

    //     }).catch(err => {

    //     });
    // }

    getJacketItemRow() {

    }

    getNextJacketItem() {

    }

    handleEditStoreClick(e){
        e.preventDefault();
        console.log("clicked");
        this.setState({isEditMode: true});
    }

    render() {
		const { classes } = this.props;
        this.ensureLoggedIn();

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
                                    <Typography variant="subtitle1" color="inherit" paragraph>
                                        {this.state.storeDesc}
                                    </Typography>
                                    <br/> <br/> <br/>
                                    <ButtonWrapper classes={{ button: classes.button }} onClick={this.handleEditStoreClick} 
                                        type="button">
                                        Edit Store
                                    </ButtonWrapper>
                                </div>
                            </Grid>

                            <Grid item md={7}>
                                <div className={classes.coverPhoto}>
                                    <CoverPhoto isEditOn={this.state.isEditMode} 
                                                imgSrc={this.state.coverURL}/>
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

// class JacketItem extends Component {

// }

class CoverPhoto extends Component {    
    constructor(props) {
        super(props);
        this.state = { isEditOn : this.props.isEditOn }

        this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this);
    }

    handlePhotoUpdate() {
        console.log("resetting edit setting");
        this.setState({ isEditOn: false });
    }

    render() {
        let image = <div> <img src={this.props.imgSrc} alt="background" style={{ maxHeight: '100%', maxWidth: '100%' }} /> </div>

        if (this.props.isEditOn) {
            image =  
                <ImageOverlayWrapper>
                    <ImageUpload oldCover={this.props.imgSrc} handleUpdate={this.handlePhotoUpdate} style={{ position: 'relative' }}/>
                </ImageOverlayWrapper>
        }

        return (
            <div> {image} </div>
        );
    }


}

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { coverPhotoSrc: this.props.oldCover }
        this.handleDrop = this.handleDrop.bind(this)
    }

  
    handleDrop = async (uploadedFiles) => {
    	if (uploadedFiles.length > 0) {
	    	console.log(uploadedFiles[0]);

            let data = new FormData();
            data.append( 'image', uploadedFiles[0] );

	    	await axios({
				method: 'post',
				url: `http://localhost:3001/images`,
				headers: {
                    'Authorization': localStorage.token, 
                    'Content-Type': `multipart/form-data;boundary=${data._boundary}`
                },
				data: data
	      	}).then(response => {
	      		let newCoverSrc = response.data.imageUrl;
	      		console.log("new url: " + response.data.imageUrl);
	        	this.setState({ coverPhotoSrc: newCoverSrc });
	    	}).catch(error => {
                // if (error.response) console.log(error.response);
	    		console.log(error.response);
	    		this.setState({ responseError: 'Could not upload image'});
	    	});
		}
        this.props.handleUpdate();
    }


  
    render() {
        const { coverPhotoSrc } = this.state;
        const image = <img src={ coverPhotoSrc } alt="" style={{ height: '100%', width:'100%' }}/>;
        
        return (    
            <section>
                <Dropzone onDrop={ this.handleDrop } accept="image/jpeg,image/jpg,image/tiff,image/gif" multiple={ false }>
                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {!isDragActive && image}
                                {isDragActive && !isDragReject && image }
                                {isDragReject && image }
                            </div>
                        </section>
                    )}
                </Dropzone>
            </section>
        )
    }

}

export default withStyles(styles)(MyStorePage);