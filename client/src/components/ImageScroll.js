import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '60%',
    },
    imageScroll: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingRight: '40px',
        width: '25%',
    },
    imageScroll__image: {
        marginBottom: '10px',
        width: '100%',
        opacity: 0.55,
        cursor: 'pointer',
        '&:hover': {
            opacity: 1
        }
    },
    imageMain: {
        width: '75%',
        paddingRight: '80px',
    },
    currentImage: {
        marginBottom: '10px',
        width: '100%',
        opacity: 1,
        cursor: 'pointer',
    }
});

class ImageScroll extends Component {

    state = {
        currentImage: 0
    }

    imageClick = (id) => {
        this.setState({ currentImage: id});
    }

    render() {
        const { classes, images } = this.props;
        const printImages = [];

        return (
            <div className={classes.imageContainer}>
                <div className={classes.imageScroll}>
                    {images.forEach((image, index) => {
                        let imageClasses = classes.imageScroll__image;
                        if(index===this.state.currentImage) {
                            imageClasses = classes.currentImage;
                        }
                        printImages.push(<img id={index} src={image.URL} onClick={()=>this.imageClick(index)} className={imageClasses} key={image._id ? image._id : index} alt="jacket"/>);
                    })}
                    {printImages}
                </div>
                <div className={classes.imageMain}>
                    <img src={images[this.state.currentImage].URL} key={images[this.state.currentImage]._id ? images[this.state.currentImage]._id : 1} width="100%" alt="jacket" /> 
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ImageScroll);
