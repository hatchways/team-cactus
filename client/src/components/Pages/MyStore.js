import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
import ImageOverlayWrapper from '../Wrappers/ImageOverlayWrapper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dropzone from 'react-dropzone';
import TextField from '@material-ui/core/TextField';


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
            coverPhoto: "", // the URL of the image that's saved
            uploadedImg: {url: "", key: ""}, // the URL of the image once uploaded to server, before being saved
            shopID: "",
            isEditMode: false
        }

        this.handleEditStoreClick = this.handleEditStoreClick.bind(this);
        this.handleSaveStoreClick = this.handleSaveStoreClick.bind(this);
        this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this);
        this.handleNameUpdate = this.handleNameUpdate.bind(this);
        this.handleDescUpdate = this.handleDescUpdate.bind(this);
        // this.updatePhotoInDB = this.updatePhotoInDB.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.updateDB = this.updateDB.bind(this);
    }
    
    fetchStoreData = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:3001/shops`,
            headers: {'Authorization': localStorage.token },
          }).then(response => {
            this.setState({ storeName: response.data.name,
                            storeDesc: response.data.description,
                            coverURL: response.data.coverImage.URL,
                            shopID: response.data.shopID});

            if (!this.state.uploadedImg || this.state.uploadedImg.url === "") {
                this.setState({uploadedImg: {url: response.data.coverImage.URL, key: response.data.coverImage.ID}} );
            }

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

    async updateDB() {
        try {
            await axios({
                method: 'put',
                url: `http://localhost:3001/shops`,
                headers: {
                    'Authorization': localStorage.token
                },
                data: {
                    name: this.state.storeName,
                    description: this.state.storeDesc,
                    coverImage: {URL: this.state.uploadedImg.url, ID: this.state.uploadedImg.key}
                }
            }).then(response => {
                this.setState({ coverPhoto: this.state.uploadedImg.url});
            }).catch(error => {
                this.setState({responseError: "Could not update image in database"});
            })
        }
        catch (asyncErr) {}
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

    async handleEditStoreClick(e) {
        try {
            e.preventDefault();
            this.setState({isEditMode: true});
        } 
        catch (asyncErr) {
            this.setState( {responseError: "Could not update store" });
        }
    }

    async handleSaveStoreClick(e) {
        try {
            e.preventDefault();
            this.updateDB();
            this.setState({isEditMode: false});
        } catch (asyncErr) {
            this.setState( {responseError: "Could not save store"});
        }
    }

    async handlePhotoUpdate(newCoverFile) {
        await this.uploadPhoto(newCoverFile); // this sets state of uploadedImg
    }

    handleNameUpdate(newName) {
        this.setState({storeName: newName});
    }

    handleDescUpdate(newDesc) {
        this.setState({storeDesc: newDesc});
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
                                <EditableText isEditMode={this.state.isEditMode} handleUpdate={this.handleNameUpdate} 
                                                value={this.state.storeName} label="Store name"/>

                                <br/> <br/>
                                <EditableText isEditMode={this.state.isEditMode} handleUpdate={this.handleDescUpdate}
                                                value={this.state.storeDesc} label="Store description" />

                                <br/> <br/> <br/>
                                <ButtonWrapper classes={{ button: classes.button }} 
                                    onClick={this.state.isEditMode ? this.handleSaveStoreClick : this.handleEditStoreClick } 
                                    type="button">
                                    {this.state.isEditMode ? "Save Store" : "Edit Store"}
                                </ButtonWrapper>
                            </Grid>

                            <Grid item md={7}>
                                <div className={classes.coverPhoto}>
                                    <CoverPhoto imgSrc={this.state.uploadedImg.url} handlePhotoUpdate={this.handlePhotoUpdate} 
                                                isEditMode={this.state.isEditMode}/>
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

class EditableText extends Component {
    render() {
        let text = null;
        if (this.props.isEditMode) {
            text = <TextField value={this.props.value} label={this.props.label} 
                              onChange={(e) => this.props.handleUpdate(e.target.value)} 
                              multiline={this.props.label === "Store description"}
                    />
        }
        else {
            if (this.props.label === "Store name") {
                text = <Typography component="h1" variant="h3" color="inherit" gutterBottom> {this.props.value} </Typography>
            } else { // store description
                text = <Typography variant="body1" color="inherit" paragraph> {this.props.value} </Typography>
            }
            
        }

        return (
            <span> {text} </span>
        );
    }
}

// class JacketItem extends Component {

// }

class CoverPhoto extends Component {    

    render() {
        let image = <div> <img src={this.props.imgSrc} alt="background" style={{ maxHeight: '100%', maxWidth: '100%' }} /> </div>

        if (this.props.isEditMode) {
            image =  
                <ImageOverlayWrapper>
                    <ImageUpload uploadedImg={this.props.imgSrc} handleUpdate={this.props.handlePhotoUpdate} 
                                style={{ position: 'relative' }}/>
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
        this.handleDrop = this.handleDrop.bind(this)
    }

  
    handleDrop(uploadedFiles) {
        if (uploadedFiles.length > 0) {
            this.props.handleUpdate(uploadedFiles[0]);
        }
    }

    render() {
        // const { coverPhotoSrc } = this.state;
        const image = <img src={ this.props.uploadedImg } alt="" style={{ height: '100%', width:'100%' }}/>;
        
        return (    
            <section>
                <Dropzone onDrop={ this.handleDrop } accept="image/jpeg,image/jpg,image/tiff,image/gif" multiple={ false }>
                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {image}
                            </div>
                        </section>
                    )}
                </Dropzone>
            </section>
        )
    }

}

export default withStyles(styles)(MyStorePage);