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
        width: '100%'
    },
    imageMain: {
        width: '75%',
        paddingRight: '80px',
    },
});

class ImageScroll extends Component {
    state = {
        size: ''
    }

    displayImage = (image) => {
        console.log('url', image.URL);
        return(
            <img src={image.URL} />
        )
    }

    render() {
        const { classes, images } = this.props;
        const printImages = [];

        return (
            <div className={classes.imageContainer}>
                <div className={classes.imageScroll}>
                    {images.forEach((image, index) => {
                        printImages.push(<img src={image.URL} className={classes.imageScroll__image} key={image._id ? image._id : index}/>);
                    })}
                    {printImages}
                </div>
                <div className={classes.imageMain}>
                    <img src={images[0].URL} className={classes.imageScroll__image} key={images[0]._id ? images[0]._id : 1} width="100%" /> 
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ImageScroll);
