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
	 console.log('req', req);
	try {
		const email = req.user.email;

		let shop = await Shop.findOne({userEmail: email});

		if (shop) {
			return res.status(200).json(shop);
		} else {
			return createShop(req, res);
		}
	} catch (err) {
		// console.log(err);
		res.status(503);
		// return res.send("couldn't search shops");
	}
 }

module.exports = {
	fetchShop: fetchShop,
	createShop: createShop
}