import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexShrink: '0'
    },
    imageMain: {
        width: '100%'
    },
    imageMainContainer: {
        display: 'flex',
        flexDirection: 'column',
        // paddingRight: '80px',
        width: '75%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            // paddingRight: '50px',
        },
    },
    imageScrollBottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    imageScrollSideContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingRight: '40px',
        width: '25%',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    imageScrollCurrent: {
        width: '100%',
        marginBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            width: '25%',
            height: 'auto',
        },
        opacity: 1,
        cursor: 'pointer',
        '&:hover': {
            opacity: 1
        }
    },
    imageScrollOption: {
        width: '100%',
        marginBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            width: '25%',
            height: 'auto',
        },
        opacity: 0.55,
        cursor: 'pointer',
        '&:hover': {
            opacity: 1
        }
    },
    imagePlaceholder: {
        width: '100%',
        backgroundColor: 'grey'
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

        if(images && images.length){
            images.forEach((image, index) => {
                let imageClass = classes.imageScrollOption;
                if(index===this.state.currentImage) {
                    imageClass = classes.imageScrollCurrent;
                }
                displayImages.push(<img src={image.URL} onClick={()=>this.imageClick(index)} className={imageClass} key={index} alt="jacket"/>);
            });
        }
        
        return (
            <div className={classes.container}> 
                {images && images.length? 
                <div className={classes.imageScrollSideContainer}>
                    {displayImages}
                </div> : '' }
                <div className={classes.imageMainContainer}>
                    {images && images.length ? <img src={images[this.state.currentImage].URL} className={classes.imageMain} alt="jacket" /> : <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/ProductImagePlaceholder.png" alt="placeholder jacket image" /> }
                    <div className={classes.imageScrollBottomContainer}>
                        {images && images.length ? 
                        <div className={classes.imageScrollSideContainer}>
                            {displayImages}
                        </div> : '' }
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ImageScroll);
