import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TitleWrapperXSmall from '../'

const styles = theme => ({
    cartImage: {
        width: '20%'
    },
    cartItemWrapper: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '25px',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: '30px'
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        marginLeft: '30px'
    },
    price: {
        width: '20%',
        textAlign: 'right',
        fontWeight: 600
    }
});

class CartItemWrapper extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.cartItemWrapper}>
                <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/j1.jpg" className={classes.cartImage} /> 
                <div className={classes.description}>
                    <TitleWrapperXSmall>Levi Vintage</TitleWrapperXSmall>
                    <p>sldjflskjd lsdkjf sdlkfj sldkglskdf</p>
                </div>
                <div className={classes.price}>
                    CAD $120.50
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(CartItemWrapper);