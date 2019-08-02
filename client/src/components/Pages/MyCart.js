import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
import CartItem from '../CartItem';
import PageWrapper from '../Wrappers/PageWrapper.js';
import TitleWrapperSmall from '../Wrappers/TitleWrapperSmall.js';


const styles = theme => ({
    button: {
        width: '100%'
    },
    cartItems: {
        width: '70%',
    },
    cartTotal: {
        width: '28%',
        backgroundColor: '#fff',
        padding: '25px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        textAlign: 'center',
        height: '130px'
    },
    cartTotals: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexBasis: '46%',
        '&> p':{
            marginBlockStart: '0',
            marginBlockEnd: '0'
        }
    },
    description: {
        backgroundColor: 'purple'
    },
    cartItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

class MyCart extends Component {

    state = {
        cart: []
    }

    async componentDidMount() {
        let cart = localStorage.getItem('cart');
        if(cart){
            cart = JSON.parse(cart);
            let products = [];

            
            for(const product of cart) {
                let response = await axios({
                    method: 'get',
                    // url: `${window.location.origin}/users`,
                    url: `http://localhost:3001/products/${product.productID}`,
                });
                products.push(response.data);
            };
            this.setState({ cart: products });
        }
    }

    render() {
        console.log('state', this.state);
        const { classes } = this.props;

        const displayProducts = [];
        let totalPrice = 0;
        this.state.cart.forEach((product, index) => {
            const image = (product.photos[0] ? product.photos[0].URL : '');
            displayProducts.push(<CartItem name={product.name} description={product.description} price={product.price} image={image} key={index}/>);
            totalPrice += product.price;
        })

        return (
            <PageWrapper className={classes.myCart}>
                <TitleWrapperSmall>{this.state.cart.length} item(s) in your basket</TitleWrapperSmall>
                <div className={classes.cartItemContainer}>
                    <div className={classes.cartItems}>
                        {displayProducts}
                    </div>
                    <div className={classes.cartTotal}>
                        <div className={classes.cartTotals}>
                            <p>Item(s) total: </p>
                            <p>CAD {totalPrice}</p>
                        </div>
                        <ButtonWrapper classes={{ button: classes.button }} component={Link} to="/checkout">Proceed to checkout</ButtonWrapper>
                    </div>
                </div>
            </PageWrapper>
        );
    }
}
export default withStyles(styles)(MyCart);