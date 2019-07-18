var express = require('express');
var router = express.Router();
const passport = require("passport");
const { Shop, validateShopCreation, validateCoverImage, validateName } = require('../models/shops');
const { Product } = require('../models/products');
const secretOrKey = process.env.SECRETORKEY;

/* Create new shop ----------------------------------------------------------------*/
async function createShop(data) {
    try {
        // Check all needed parameters are provided
        const { errors, isValid } = validateShopCreation(data);
       
        if (!isValid) {
           return { errors: errors };
        }

        // Create shop for user
        shop = new Shop({
           userEmail: data.userEmail,
           name: data.name ? data.name : "My Store",
           description: data.description ? data.description : "default description",
           coverImage: data.coverImage ? data.coverImage : { URL: "https://source.unsplash.com/user/erondu", ID: 'madeup1' }
        });

        await shop.save();
        return shop;

    } catch (err) {
        console.log('createShop error', err);
 		return null;
    }
}

/* Get shop data (user logged in) ----------------------------------------------------------------*/
router.get('/', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
		const email = req.user.email;
		let shop = await Shop.findOne({userEmail: email});

		if (shop) {
			return res.status(200).json(shop);
        } 
        else {
			let shop = await createShop({ userEmail: email, name: "My Store" });
			if (shop) {
				return res.status(201).json(shop);
			} else { // todo: does this get caught in catch anyway?
				return res.status(503);
			}
		}
	} catch (err) {
		return res.status(503);
    }
});

/* Get shop data (public) ----------------------------------------------------------------*/
// router.get('/{:id}', async function(req, res, next) {
// }

/* Edit shop data ----------------------------------------------------------------*/
router.put('/', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    
    try {
        const email = req.user.email;
        let shop = await Shop.findOne({userEmail: email});

        if (shop) {
            const keys = Object.keys(req.body);
            
            keys.forEach(key => {
                if((key === "_id") || (key === "userEmail")){
                    return res.status(400).send({ errors: { message: "Cannot change shop ID or user Email"}});
                } else if((key === 'name') && !validateName(req.body[key]).isValid) {
                    return res.status(400).send({ errors: { message: "Shop name cannot be blank"}});
                } else if((key === 'coverImage') && !validateCoverImage(req.body[key]).isValid) {
                    return res.status(400).send({ errors: { message: "Cover Image must have URL and ID"}});
                } 
                shop[key] = req.body[key];
            });  

            shop.save();
            return res.status(200).send(shop);
        } else {
			return res.status(400).send({ errors: { message: "There is no shop associated with this account"}});
        } 
    } catch (err) {
		return res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

/* Get list of products for shop --------------------------------------------------------------------*/
router.get('/:id/products', async function(req, res, next) {
    try {
        const shopID = req.params.id;
        console.log('shopId', shopID);
        
        let products = await Product.find({ shopID: shopID });

        if(products) {
            return res.status(200).send(products);
        } else {
            return res.status(204).send({ errors: { message: "No products found."}});
        }

    } catch (err) {
		return res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

module.exports.createShop = createShop;
module.exports.routes = router;
