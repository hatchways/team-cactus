import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    imageMain: {
        width: '75%',
        paddingRight: '80px',
    },
    imageScroll: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingRight: '40px',
        width: '25%',
    },
    imageScrollCurrent: {
        marginBottom: '10px',
        width: '100%',
        opacity: 1,
        cursor: 'pointer',
    },
    imageScrollOption: {
        marginBottom: '10px',
        width: '100%',
        opacity: 0.55,
        cursor: 'pointer',
        '&:hover': {
            opacity: 1
        }
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
        const displayImages = [];

        return (
            <div className={classes.container}>
                <div className={classes.imageScroll}>
                    {images.forEach((image, index) => {
                        let imageClass = classes.imageScrollOption;
                        if(index===this.state.currentImage) {
                            imageClass = classes.imageScrollCurrent;
                        }
                        displayImages.push(<img src={image.URL} onClick={()=>this.imageClick(index)} className={imageClass} key={index} alt="jacket"/>);
                    })}
                    {displayImages}
                </div>
                <img src={images[this.state.currentImage].URL} className={classes.imageMain} alt="jacket" /> 
            </div>
        );
    }
}

export default withStyles(styles)(ImageScroll);
