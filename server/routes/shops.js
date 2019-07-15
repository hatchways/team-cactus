var express = require('express');
var router = express.Router();
const passport = require("passport");
const { Shop, validateShopCreation, validateCoverURL } = require('../models/shops');
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
           coverPhoto: data.coverPhoto ? data.coverPhoto : "https://source.unsplash.com/user/erondu"
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
// router.put('/', passport.authenticate('jwt'), async function(req, res, next) {
//     try {
// 		const email = req.user.email;
// 		let shop = await Shop.findOne({userEmail: email});

//         //data.coverURL
//         //data.description

// 		if (shop) {
// 			return res.status(200).json(shop);
//         } 
// });

module.exports.createShop = createShop;
module.exports.routes = router;
