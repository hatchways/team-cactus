var express = require('express');
var router = express.Router();
const passport = require("passport");
const { Product, validateProductCreation, validateName, validatePrice } = require('../models/products');
const { Shop } = require('../models/shops');

/* Create new product ----------------------------------------------------------------*/
router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        const data = req.body;
        const email = req.user.email;

        // Check all needed parameters are provided
        const { errors, isValid } = validateProductCreation(data);
        if (!isValid) {
            return res.status(400).send({ errors: { message: errors }});
        }

        // Find shop
        let shop = await Shop.findOne({ userEmail: email });

        if (shop) {
            // Create product
            let product = new Product({
                shopID: shop._id,
                name: data.name,
                description: data.description ? data.description : "",
                price: data.price,
                sizes: data.sizes ? data.sizes : { xsmall: 0, small: 0, medium: 0, large: 0, xlarge: 0, xxlarge: 0 },
                photos: data.photos ? data.photos : [], //array of objects {url: __, id: __}
                date: Date.now().toString()
            })

            // Save shop in db
            await product.save();
            return res.status(200).send(product);
        } else {
            return res.status(400).send({ errors: { message: "There is no shop associated with this user."}});
        } 
    } catch (err) {
        return res.status(503).send({ errors: { message: "Something went wrong :(" }});
    }
});

/* Get all products with possible filters ----------------------------------------------*/
// TODO: make this a function that is commonly called for disovery and for listing all products for a
// particular shop (?)
router.get('/', async function(req, res) {
    try { 
        let query = {};
        // Basic validation
        if (req.query.size && ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'].includes(req.query.size.toLowerCase())) {
            query[`sizes.${req.query.size}`] = {'$gt': 0};
        }
        if (req.query.lower_price && !isNaN(req.query.lower_price)) {
            if (!query.price) {
                query.price = {};
            }
            query.price['$gt'] = Number(req.query.lower_price);
        }
        if (req.query.higher_price && !isNaN(req.query.higher_price)) {
            if (!query.price) {
                query.price = {};
            }
            query.price['$lt'] = Number(req.query.higher_price);
        } 
        if (req.query.type && ['denim', 'vintage'].includes(req.query.type.toLowerCase())) {
            // Check that the description contains the type keyword
            query.description =  { $regex: `${req.query.type}`, $options: 'i' };
        }
        // if (req.query.gender && ['male', 'female'].includes(req.query.gender.toLowerCase())) {
        //     query.gender = req.query.gender;
        // }
    
        (req.query.toggleBy==='price' ? toggleBy = 'price' : toggleBy = 'date' );
        (req.query.orderBy==='asc' ? order = 1 : order = -1 );
        let sortBy = {};
        sortBy[toggleBy] = order;

        let products = await Product.find( query ).sort(sortBy);

        if (!products) {
            return res.status(204).send({ message: "No products found." });
        } 

        return res.status(200).send(products);

    } catch (asyncErr) {
        return res.status(503).send({ errors: {message: asyncErr.message}});
    }
});

/* Get product info --------------------------------------------------------------------*/
router.get('/:id', async function(req, res, next) {
    try {
        const id = req.params.id;

        // Find product
        let product = await Product.findOne({_id: id});

        if (product) {
            return res.status(200).send(product);
        } else {
			return res.status(400).send({ errors: { message: "There is no product associated with this product ID."}});
        } 
    } catch (err) {
		return res.status(503).send({ errors: { message: "Something went wrong :(" }});
    }
});

/* Update product info --------------------------------------------------------------------*/
router.put('/:id', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        
        const email = req.user.email;
        const keys = Object.keys(req.body);
        const id = req.params.id;
        let error = "";
        
        // Find product
        let product = await Product.findOne({_id: id});

        if (product) {
            // Find shop associated with this product
            let shop = await Shop.findOne({ _id: product.shopID });

            // Check that token's email matches shop's userEmail
            if(shop.userEmail === email) {
                keys.forEach(key => {
                    if((key === "_id") || (key === "shopID")){
                        error = "Cannot change product ID or shop ID.";
                        return;
                    } else if((key === 'name') && !validateName(req.body[key]).isValid) {
                        error = "Product name cannot be blank.";
                        return;
                    } else if((key === 'price') && !validatePrice(req.body[key]).isValid) {
                        error = "Price cannot be blank.";
                        return;
                    }
                    product[key] = req.body[key];
                });   
    
                if(error) {
                    return res.status(400).send({ errors: { message: error }});
                } else {
                    // Save product in db
                    await product.save();
                    return res.status(200).send(product);
                } 
            } else {
                return res.status(401).send({ errors: { message: "Cannot edit product that doesn't belong to this user's shop."}});
            }
        } else {
			return res.status(400).send({ errors: { message: "There is no product associated with that product ID."}});
        } 
    } catch (err) {
		return res.status(503).send({ errors: { message: "Something went wrong :(" }});
    }
});

module.exports = router;
