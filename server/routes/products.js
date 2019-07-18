var express = require('express');
var router = express.Router();
const passport = require("passport");
const { Product, validateProductCreation, validateName, validatePrice } = require('../models/products');
const { Shop } = require('../models/shops');

/* Create new product ----------------------------------------------------------------*/
router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        const data = req.body;
        // Check all needed parameters are provided
        const { errors, isValid } = validateProductCreation(data);
       
        if (!isValid) {
            return res.status(400).send({ errors: { message: "There are errors"}});
        }

        const email = req.user.email;
        let shop = await Shop.findOne({userEmail: email});

        if (shop) {
            //Create product
            let product = new Product({
                shopID: shop._id,
                name: data.name ? data.name : "",
                description: data.description ? data.description : "default description",
                price: data.price ? data.price : "0",
                sizes: data.sizes ? data.sizes : { xsmall: 0, small: 0, medium: 0, large: 0, xlarge: 0, xxlarge: 0 },
                photos: data.photos ? data.photos : [] //array of objects {url: __, id: __}
            })

            await product.save();
            return res.status(200).send(product);
        } else {
			return res.status(400).send({ errors: { message: "There is no shop associated with this account"}});
        } 
    } catch (err) {
		return res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

/* Get product info --------------------------------------------------------------------*/
router.get('/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        let product = await Product.findOne({_id: id});

        if (product) {
            return res.status(200).send(product);
        } else {
			return res.status(400).send({ errors: { message: "There is no product associated with that product ID."}});
        } 
    } catch (err) {
		return res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

/* Update product info --------------------------------------------------------------------*/
router.put('/:id', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        const keys = Object.keys(req.body);
        const id = req.params.id;
        let product = await Product.findOne({_id: id});
        let error = "";

        if (product) {
            keys.forEach(key => {
                if((key === "_id") || (key === "shopID")){
                    error = "Cannot change product ID or shop ID";
                    return;
                } else if((key === 'name') && !validateName(req.body[key]).isValid) {
                    error = "Product name cannot be blank";
                    return;
                } else if((key === 'price') && !validatePrice(req.body[key]).isValid) {
                    error = "Price cannot be blank";
                    return;
                }
                product[key] = req.body[key];
            });   

            if(error) {
                return res.status(400).send({ errors: { message: error }});
            } else {
                await product.save();
                return res.status(200).send(product);
            }  


        } else {
			return res.status(400).send({ errors: { message: "There is no product associated with that product ID."}});
        } 
    } catch (err) {
		return res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

module.exports = router;
