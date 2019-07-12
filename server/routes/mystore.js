const { Shop, validateShopCreation, validateFetchShop } = require('../models/shops');
 
 async function createShop(req, res) {
 	try {
	 	// Check all needed parameters are provided
	 	const { errors, isValid } = validateShopCreation(req.body);
	    if (!isValid) {
	        return res.status(400).json({ errors: errors });
	    }

    	// Create shop for user
 		store = new Shop({
            userEmail: req.body.userEmail,
            name: req.body.name,
            description: req.body.description,
            coverPhoto: req.body.coverPhoto
        });

        await store.save();
        return res.status(201).json(store);

 	} catch (err) {
		 console.log(err);
 		return res.status(503);
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