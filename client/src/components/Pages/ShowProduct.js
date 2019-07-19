import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
import PageWrapper from '../Wrappers/PageWrapper';
import Profile from '../Profile';
import SizePicker from '../SizePicker';
import SizePicker1 from '../SizePicker1';
import TitleProductWrapper from '../Wrappers/TitleProductWrapper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    button: {
        marginRight: '10px'
    },
    buttonContainer: {
        marginTop: '30px'
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
    info: {
        
    },
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
    sizes: {
        fontWeight: 600,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginTop: '25px',
    },
    sizePicker: {
        marginTop: '30px',
    },
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
            photos: []
        },
        responseError: ""
    }

    componentDidMount() {
        const id = '5d31e247ffa4b808a0ab6fb2';

        axios({
            method: 'get',
            //url: `${window.location.origin}/users`,
            url: `http://localhost:3001/products/${id}`,
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
        console.log('this.state.data', this.state.data);

        return (
            <PageWrapper>
                <div className={classes.container}>
                    <div className={classes.imageContainer}>
                        <div className={classes.imageScroll}>
                            <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/j1.jpg" className={classes.imageScroll__image}/> 
                            <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/j2.jpg" className={classes.imageScroll__image}/>
                            <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/j3.jpg" className={classes.imageScroll__image}/>
                            <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/j4.jpg" className={classes.imageScroll__image}/>
                        </div>
                        <div className={classes.imageMain}>
                            <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/j1.jpg" width="100%" /> 
                        </div>
                    </div>
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
                            <SizePicker1 sizesAvailable={this.state.data.sizes} />
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
                {/* <div className={classes.bottomMenu}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </div> */}
            </PageWrapper>
        );
    }
}

export default withStyles(styles)(ShowProduct);
