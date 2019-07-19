import React, { Component } from "react";
// import { Redirect } from "react-router";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ImageOverlayWrapper from '../Wrappers/ImageOverlayWrapper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dropzone from 'react-dropzone';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    button: {
        // marginTop: '25px',
        borderRadius: 0,
        boxShadow: 'none',
    },
    storeBanner: {
        alignItems: 'center',
        justify: 'center',
        textAlign: 'center',
        display: 'inline-flex'
    },
    coverPhoto: {
        height: '450px',
        overflow: 'hidden',
        objectFit: 'contain',
    },
    card: {
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        width: '200px',
        height: '300px'
    },
    cardContent: {
        backgroundColor: "black",
        color: "white",
        textAlign: 'center',
        justify: 'flex-end'
    },
    paper: {
        padding: "80px",
        justify: "center"
    },
    table: {
        // alignItems: 'center',
        // justify: 'center',
        // textAlign: 'center',
        // // display: 'inline-flex'
    }
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
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.updateDB = this.updateDB.bind(this);
    }
    
    ensureLoggedIn() {
        if (!localStorage.token) {
            this.props.history.push(`/login`);
        }
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
                            shopID: response.data._id,
                            uploadedImg: {url: response.data.coverImage.URL, key: response.data.coverImage.ID}
                        });
          }).catch(error => {
            if (error.response){
                this.setState({ responseError: error.response});
            } else {
                this.setState({ responseError: 'Something went wrong :('});
            }
          });
    }

    async componentDidMount() {
        await this.fetchStoreData();
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
                <Grid container justify="center" direction="column">
                    {/* The top of the store representing the store banner */}
                    <div className={classes.storeBanner}>
        				<Grid container item direction="row" justify="center" alignItems="center">
                            <Grid item md={5}>
                                <EditableText isEditMode={this.state.isEditMode} handleUpdate={this.handleNameUpdate} 
                                                value={this.state.storeName} label="Store name"/>

                                {this.state.isEditMode ? <div> <br/> <br/> </div>: ""}

                                <EditableText isEditMode={this.state.isEditMode} handleUpdate={this.handleDescUpdate}
                                                value={this.state.storeDesc} label="Store description" />

                                <br/> <br/> <br/>
                                <Button variant="outlined" color="inherit" className={classes.button}
                                    onClick={this.state.isEditMode ? this.handleSaveStoreClick : this.handleEditStoreClick } 
                                    type="button">
                                    {this.state.isEditMode ? "Save Store" : "Edit Store"}
                                </Button>
                            </Grid>

                            <Grid item md={7}>
                                <div className={classes.coverPhoto}>
                                    <CoverPhoto imgSrc={this.state.uploadedImg.url} handlePhotoUpdate={this.handlePhotoUpdate} 
                                                isEditMode={this.state.isEditMode}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    {/* The bottom of the store representing the jackets for sale */}
                    <JacketTable {...this.props}/>
                </Grid>
		  	</div>
		);
    }
}

class JacketTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            jackets : [[null, null, null], [null, null, null]],
            haveShopID: false
        };

        this.loadJackets = this.loadJackets.bind(this);
        this.getShopID = this.getShopID.bind(this);
        // console.log("shop id: " + this.props.shopid);
    }

    async getShopID() {
        await axios({
            method: 'get',
            url: `http://localhost:3001/shops`,
            headers: {'Authorization': localStorage.token },
        }).then(response => {
            this.setState({ haveShopID: true, shopID: response.data._id });
        }).catch(error => {
            this.setState({ haveShopID: false});
        });
    }

    constructJacketsArray(desiredNumRows, jacketsPerRow, jacketsArray) {
        /* Construct an array of all jackets belonging to this store, separated into
         subarrays of 3 jackets each (to be interpreted as rows for the UI)
         */
        let allJackets = [];
        let row = []; // current row we're constructing
        let rowCount = 0; // number of jackets in current row
        for (var i = 0; i < jacketsArray.length; i++) {
            if (rowCount < jacketsPerRow) {
                row.push(jacketsArray[i]);
                rowCount++;
            } else {
                // add and begin a new row
                allJackets.push(row);
                rowCount = 0;
                row = [];
            }
        }
        // Fill the last row with nulls if no more jackets, to ensure that there are jacketsPerRow items per row
        while (rowCount < jacketsPerRow) {
            row.push(null);
            rowCount++;
        }
        allJackets.push(row);

        // Ensure that there are desiredNumRows rows
        while (allJackets.length < desiredNumRows) {
            allJackets.push([null, null, null]);
        }

        return allJackets;
    }

    async loadJackets() {
        if (!this.state.haveShopID) {
            return;
        }

        try {
            await axios({
                method: 'get',
                url: `http://localhost:3001/shops/${this.state.shopID}/products`
            })
            .then(response => {
                let tabularJacketList = this.constructJacketsArray(2, 3, response.data);
                this.setState({jackets: tabularJacketList});
                // console.log(this.state.jackets);
            })
            .catch(error => {
                console.log("load jacket error");
            });
        } 
        catch (asyncErr) {

        }
    }

    async componentDidMount() {
        await this.getShopID();
        await this.loadJackets();
        // console.log(this.state.jackets);
    }

    render() {
        // Three rows and three columns of jackets per page
        const { classes } = this.props;

        return (
            <div className={classes.table}>
                <Paper elevation={0} square={true} spacing={5} className={classes.paper}>
                <Grid container justify="center" item direction="column" spacing={5}>
                    <JacketRow classes={classes} row={this.state.jackets[0]} />
                    <JacketRow classes={classes} row={this.state.jackets[1]} />
                </Grid>
                </Paper>
            </div>
        );
    }
}

class JacketRow extends Component {
    render() {
        return (
            <Grid container item direction="row" justify="center" spacing={5} alignItems="center">
                <Grid item md={4}>
                    <JacketCard {...this.props.classes} jacket={this.props.row[0]} />
                </Grid>
                <Grid item md={4}>
                    <JacketCard {...this.props.classes} jacket={this.props.row[1]} />
                </Grid>
                <Grid item md={4}>
                    <JacketCard {...this.props.classes} jacket={this.props.row[2]} />
                </Grid>
            </Grid>
        );  
    }     
}

class JacketCard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         redirect: false
    //     }
    //     this.handleClick = this.handleClick.bind(this);
    // }

    // handleClick(e){
    //     this.setState({redirect: true});
    // }

    render() {
        let defaultImg = "https://cactus-jacketshop.s3.us-east-2.amazonaws.com/j1.jpg";
        if (!this.props.jacket) {
            // if (this.state.redirect) {
            //     return <Redirect push to="/mystore/upload" />;
            // }

            return (
                <Card className={this.props.card} elevation={2} square={true}>
                    <CardActionArea>
                        <CardMedia 
                            src={defaultImg}
                            component="img"
                            alt=""
                            //onClick={this.handleClick}
                        />
                    </CardActionArea>
                    <CardContent className={this.props.cardContent}>
                        <Typography variant="subtitle1"> Upload a jacket here </Typography>
                    </CardContent>
                </Card>
            );
        } 

        else {
            // if (this.state.redirect) {
            //     return <Redirect push to="/mystore/edit" />;
            // }

            // console.log(this.props.jacket);
            return (
                <Card className={this.props.card} elevation={2} square={true}>
                    <CardActionArea>
                        <CardMedia 
                            src={this.props.jacket.photos.length > 0 ? this.props.jacket.photos[0].url : defaultImg}
                            component="img"
                            alt=""
                        />
                        </CardActionArea>
                    <CardContent className={this.props.cardContent}>
                        <Typography variant="subtitle1"> {this.props.jacket.name} </Typography>
                        <Typography variant="subtitle2"> ${this.props.jacket.price} </Typography>
                    </CardContent>
                </Card>
            );
        }
    }
}


class EditableText extends Component {
    constructor(props){
        super(props);
        this.state = {
            isValueUpdated: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
        this.setState({value: newValue, isValueUpdated: true});
    }

    render() {

        let isDescription = this.props.label === "Store description";
        let text = null;
        let value = this.state.isValueUpdated ? this.state.value : this.props.value

        if (this.props.isEditMode) {
            if (isDescription) {
                text = <TextField value={value} label={this.props.label} 
                            onChange={(e) => this.handleChange(e.target.value)}
                            onBlur={(e) => this.props.handleUpdate(e.target.value)}
                            multiline={true} rowsMax={6}
                        />
            } else {
                text = <TextField value={value} label={this.props.label} 
                            onChange={(e) => this.handleChange(e.target.value)}
                            onBlur={(e) => this.props.handleUpdate(e.target.value)}
                            inputProps={{maxLength: 22}}
                        />
            }
        }
        else {
            if (!isDescription) {
                text = <Typography component="h3" variant="h3" color="inherit" styles={{margin: '10px'}} gutterBottom> 
                    {value} </Typography>
            } else { // store description
                text = <Typography variant="body1" color="inherit" styles={{margin: '10px'}} paragraph> 
                    {value} </Typography>
            }
        }

        return (
            <span> {text} </span>
        );
    }
}


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