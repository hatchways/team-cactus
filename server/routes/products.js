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
        console.log(isValid);
        console.log(errors);

        const email = req.user.email;
        let shop = await Shop.findOne({userEmail: email});
        //res.status(200).send(shop);
        

        if (shop) {
            //Create product
            let product = new Product({
                shopID: shop._id,
                name: data.name ? data.name : "",
                description: data.description ? data.description : "default description",
                price: data.price ? data.price : "0",
                sizes: data.sizes ? data.sizes : { xsmall: 0, small: 0, medium: 0, large: 0, xlarge: 0, xxlarge: 0 },
                photos: data.photos ? data.photos : []
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

module.exports = router;
