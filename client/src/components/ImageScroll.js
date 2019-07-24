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
                {images.forEach((image, index) => {
                    let imageClass = classes.imageScrollOption;
                    if(index===this.state.currentImage) {
                        imageClass = classes.imageScrollCurrent;
                    }
                    displayImages.push(<img src={image.URL} onClick={()=>this.imageClick(index)} className={imageClass} key={index} alt="jacket"/>);
                })}
                <div className={classes.imageScrollSideContainer}>
                    {displayImages}
                </div>
                <div class={classes.imageMainContainer}>
                    <img src={images[this.state.currentImage].URL} className={classes.imageMain} alt="jacket" /> 
                    <div className={classes.imageScrollBottomContainer}>
                        {displayImages}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ImageScroll);
