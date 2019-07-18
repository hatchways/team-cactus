var express = require('express');
var router = express.Router();
const passport = require("passport");
const { Product, validateProductCreation } = require('../models/products');
const { Shop } = require('../models/shops');

/* Create new product ----------------------------------------------------------------*/
router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        const data = req.body;
        // Check all needed parameters are provided
        const { errors, isValid } = validateProductCreation(data);
       
        if (!isValid) {
            res.status(400).send({ errors: { message: "There are errors"}});
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
            res.status(200).send(product);
        } else {
			res.status(400).send({ errors: { message: "There is no shop associated with this account"}});
        } 
    } catch (err) {
		res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

/* Get product info --------------------------------------------------------------------*/
router.get('/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        let product = await Product.findOne({_id: id});

        if (product) {
            res.status(200).send(product);
        } else {
			res.status(400).send({ errors: { message: "There is no product associated with that product ID."}});
        } 
    } catch (err) {
		res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

/* Update product info --------------------------------------------------------------------*/
router.put('/:id', async function(req, res, next) {
    try {
        const keys = Object.keys(req.body);
        const id = req.params.id;
        let product = await Product.findOne({_id: id});
        
        if (product) {
            keys.forEach(el => {
                product[el] = req.body[el];
            });       

            // let product = new Product({
            //     shopID: shop._id,
            //     name: data.name ? data.name : "",
            //     description: data.description ? data.description : "default description",
            //     price: data.price ? data.price : "0",
            //     sizes: data.sizes ? data.sizes : { xsmall: 0, small: 0, medium: 0, large: 0, xlarge: 0, xxlarge: 0 },
            //     photos: data.photos ? data.photos : [] //array of objects {url: __, id: __}
            // })

            await product.save();
            res.status(200).send(product);


            const key = Object.keys(req.body);
            const value = Object.values(req.body);

            //Check that required fields are not blank
            if((key[0] === 'name') && !validateName(value[0]).isValid) {
                res.status(400).send({ errors: { message: "Shop name cannot be empty"}});
            } else if((key[0] === 'coverImage') && !validateCoverImage(value[0]).isValid) {
                res.status(400).send({ errors: { message: "Cover Image must have URL and ID"}});
            }

            shop[key[0]] = value[0];
            shop.save();
        }

        if (product) {
            res.status(200).send(product);
        } else {
			res.status(400).send({ errors: { message: "There is no product associated with that product ID."}});
        } 
    } catch (err) {
		res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

module.exports = router;
