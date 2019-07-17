var express = require('express');
var router = express.Router();
const passport = require("passport");
const { Shop, validateShopCreation, validateCoverImage, validateName } = require('../models/shops');
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
				res.status(503);
			}
		}
	} catch (err) {
		res.status(503);
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

            res.status(200).send(shop);
        } else {
			res.status(400).send({ errors: { message: "There is no shop associated with this account"}});
        } 
    } catch (err) {
		res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

module.exports.createShop = createShop;
module.exports.routes = router;
