import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ImageOverlayWrapper from '../Wrappers/ImageOverlayWrapper';
import UploadCardWrapper from '../Wrappers/UploadCardWrapper';
import DropzoneWrapper from '../Wrappers/DropzoneWrapper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    button: {
        // marginTop: '25px',
        borderRadius: 0,
        boxShadow: 'none',
    },
    storeBanner: {
        alignItems: 'center',
        justify: 'flex-start',
        textAlign: 'center',
        // display: 'inline-flex'
    },
    coverPhoto: {
        maxHeight: '450px',
        overflow: 'hidden',
        // objectFit: 'contain',
    },
    card: {
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        // width: '200px',
        // height: '300px',
        width: '100%',
        height: '100%'
    },
    cardContent: {
        backgroundColor: "black",
        color: "white",
        textAlign: 'center',
    },
    cardContainer: {
        width: '250px',
        // height: '300px',
    },
    paper: {
        padding: "80px",
        justify: "center"
    },
    cardImg: {
        height: '80%'
    },
    jacketTable: {
        // display: 'flex',
        width: '100vw',
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
                <Grid container direction="column">
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
                    <div>
                        {/*<Grid item className={classes.jacketTable} alignItems="center" justify="space-evenly">
                            <JacketTable {...this.props}/>
                        </Grid>*/}
                        <JacketTable {...this.props} />
                    </div>
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
        return (
            <Paper elevation={0} square={true}>
              <Grid container item spacing={4} justify="center" style={{padding: '30px'}}>
                <JacketRow row={this.state.jackets[0]} />
                <JacketRow row={this.state.jackets[1]} />
              </Grid>
            </Paper>
        );
    }
}

class JacketRow extends Component {
    render() {
        let jackets = this.props.row; // three jackets, possibly null
        return (
            <Grid container item direction="row" spacing={3} justify="center" style={{padding: '20px'}}>
                <Grid item> <StyledJacketCard jacket={jackets[0]} /> </Grid>
                <Grid item> <StyledJacketCard jacket={jackets[1]} /> </Grid>
                <Grid item> <StyledJacketCard jacket={jackets[2]} /> </Grid>
            </Grid>
        );
    }     
}

class JacketCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.setState({redirect: true});
    }

    render() {
        const { classes } = this.props;

        if (!this.props.jacket) { // we were passed null for non-existent jacket
            if (this.state.redirect) {
                // Show upload card slot for a jacket
                return <Redirect push to="/mystore/upload" />;
            }

            // Upload new jacket card
            return (
                <Grid item>
                    <div className={classes.cardContainer}>
                        <Card className={classes.card} elevation={2} square={true}>
                            <UploadCardWrapper handleClick={this.handleClick} />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="subtitle1" component="h2" align="center">
                                    <b> Upload a jacket here </b>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            );
        }

        else { // There is a jacket
            if (this.state.redirect) {
                // The card for this jacket was clicked, so take to edit page
                return <Redirect push to={`/product/${this.props.jacket._id}/edit`} />;
            }

            // Default: make the image an upload slot
            let image = <UploadCardWrapper handleClick={this.handleClick} />;

            if (this.props.jacket.photos.length > 0) {
                // If jacket photo: display available image for jacket card
                image = 
                    <div onClick={this.handleClick}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={this.props.jacket.name}
                                image={this.props.jacket.photos[0].url}
                                style={{width: '100%', height: '300px', objectFit:'cover'}}
                                title={this.props.jacket.name}
                            />
                        </CardActionArea>
                    </div>
            }

            // Display jacket card
            return (
                <Grid item key={this.props.jacket._id}>
                    <div className={classes.cardContainer}>
                        <Card className={classes.card} elevation={2} square={true}>
                            {image}
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="subtitle1" component="h2" align="center">
                                    <b>{this.props.jacket.name}</b>
                                </Typography>
                                <Typography component="p" variant="caption" align="center">{this.props.jacket.description}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            );
        }
    }
}


class CoverPhoto extends Component {    

    render() {
        let image = <div> <img src={this.props.imgSrc} alt="background" 
                            style={{ maxHeight: '100%', maxWidth: '100%' }} /> 
                    </div>

        if (this.props.isEditMode) {
            image = <ImageUpload style={{maxWidth: '100%'}} uploadedImg={this.props.imgSrc} handleUpdate={this.props.handlePhotoUpdate} />
        }

        return (
            <div> {image} </div>
        );
    }
}

class ImageUpload extends Component {

    render() {
        // const { coverPhotoSrc } = this.state;
        const image = <img src={ this.props.uploadedImg } alt="" style={{ height: '100%', width:'100%' }}/>;
        
        return (   
            <ImageOverlayWrapper> 
                <DropzoneWrapper handleUpdate={this.props.handleUpdate}>
                    {image}
                </DropzoneWrapper>
            </ImageOverlayWrapper>
        )
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

const StyledJacketCard = withStyles(styles)(JacketCard);

export default withStyles(styles)(MyStorePage);