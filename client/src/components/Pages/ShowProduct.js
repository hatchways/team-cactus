import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
import ImageScroll from '../ImageScroll';
import PageWrapper from '../Wrappers/PageWrapper';
import Profile from '../Profile';
import SizePicker from '../SizePicker';
import TitleProductWrapper from '../Wrappers/TitleProductWrapper';

const styles = theme => ({
    button: {
        marginRight: '10px'
    },
    buttonContainer: {
        marginTop: '50px'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    description: {
        marginTop: '15px',
        color: '#777',
        fontSize: '16px'
    },
    imageScroll: {
        width: '60%'
    },
    infoContainer: {
        width: '40%',
        paddingRight: '30px'
    },
    message: {
        fontWeight: 600,
        textDecoration: 'underline'
    },
    price: {
        fontWeight: 600,
        fontSize: '15px',
        marginTop: '30px',
    },
    question: {
        marginTop: '15px'
    },
    sizePicker: {
        marginTop: '30px',
    },
    title: {
        marginTop: '25px',
    }
});

class ShowProduct extends Component {

    state = {
        data: {
            name: '',
            description: '',
            price: '',
            sizes: {
                xsmall: 0,
                small: 0,
                medium: 0,
                large: 0,
                xlarge: 0,
                xxlarge: 0
            },
            photos: [
                {URL: '', ID: ''}
            ]
        },
        responseError: ""
    }

    componentDidMount() {
        const pathName = window.location.pathname;
        const productID = pathName.replace('/product/','');

        axios({
            method: 'get',
            url: `http://localhost:3001/products/${productID}`,
        }).then(response => {
            this.setState({ data: response.data })
        }).catch(error => {
            //TO DO: fix error messages
            if(error){
              this.setState({ responseError: error});
            } else {
                this.setState({ responseError: 'Something went wrong :('});
            }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <PageWrapper>
                <div className={classes.container}>
                    <ImageScroll images={this.state.data.photos} classes={{ container: classes.imageScroll }}/>
                    <div className={classes.infoContainer}>
                        <Profile />{/*TO DO Dynamic Name*/}
                        <TitleProductWrapper classes={{ title: classes.title }}>
                            {this.state.data.name}
                        </TitleProductWrapper>
                        <div className={classes.description}>
                            {this.state.data.description}
                        </div>
                        <div className={classes.price}>
                            CAD ${this.state.data.price}
                        </div>
                        <div className={classes.sizePicker}>
                            <SizePicker sizesAvailable={this.state.data.sizes} />
                        </div>
                        <div className={classes.buttonContainer}>
                            <ButtonWrapper type="black" classes={{ button: classes.button }}>Add to Cart</ButtonWrapper>
                            <ButtonWrapper type="white">Request a Custom Design</ButtonWrapper>
                        </div>
                        <div className={classes.question}>
                            Have a question about an item? <span className={classes.message}>Send a message.</span><br />
                            The seller usually responds in a few hours.
                        </div>
                    </div>
                </div>
            </PageWrapper>
        );
    }
}

export default withStyles(styles)(ShowProduct);
