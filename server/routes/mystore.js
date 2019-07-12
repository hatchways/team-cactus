const { Shop, validateShopCreation, validateFetchShop } = require('../models/shops');
 
 async function createShop(data) {
 	try {
	 	// Check all needed parameters are provided
	 	const { errors, isValid } = validateShopCreation(data);
	    if (!isValid) {
	        return { errors: errors };
	    }

    	// Create shop for user
 		store = new Shop({
            userEmail: data.userEmail,
            name: data.name,
            description: data.description,
            coverPhoto: data.coverPhoto
        });

        await store.save();
        return store;

 	} catch (err) {
		// console.log(err);
 		return null;
 	}
 }

 async function fetchShop(req, res) {
 	try {
 		if (!validateFetchShop(req.body).isValid) {
 			return res.status(400).send("not enough parameters");
 		}
	 	// Create a new shop if this user doesn't already have one,
	 	// or else return the existing one
	 	let shop = await Shop.findOne({userEmail: req.body.userEmail});
	 	if (shop) {
	 		return res.status(200).json(shop);
	 	} else {
	 		return createShop(req, res);
	 	}
	} catch (err) {
		console.log(err);
		res.status(503);
		return res.send("couldn't search shops");
	}
 }

module.exports = {
	fetchShop: fetchShop,
	createShop: createShop
}