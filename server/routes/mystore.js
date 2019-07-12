const { Shop, validateShopCreation, validateCoverURL } = require('../models/shops');
 
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
            description: data.description ? data.description : "default description",
            coverPhoto: data.coverPhoto ? data.coverPhoto : "https://source.unsplash.com/user/erondu"
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
		const email = req.user.email;
		let shop = await Shop.findOne({userEmail: email});

		if (shop) {
			return res.status(200).json(shop);
		} else {
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
 }

 async function editCoverPhoto(req, res) {
 	try {
 		if (!validateCoverURL(req.body).isValid) {
 			return res.status(400);
 		}
 		let shop = await Shop.findOne({userEmail: req.body.userEmail});
 		if (shop) {
 			shop.coverPhoto = req.body.coverURL;
 			shop.save();
 			return res.status(200).send(shop);
 		} else {
 			return res.status(400).json({ errors: { email: "There is no shop associated with this account"}});
 		}
 	} catch (err) {
 		return res.status(503);
 	}
 }

 async function editName(req, res) {
 	try {
 		if (!validateName(req.body).isValid) {
 			return res.status(400);
 		}
 		let shop = await Shop.findOne({userEmail: req.body.userEmail});
 		if (shop) {
 			shop.name = req.body.name;
 			shop.save();
 		} else {
 			return res.status(400).json({ errors: { email: "There is no shop associated with this account"}});
 		}
 	} catch (err) {
 		return res.status(503);
 	}
 }

 async function editDescription(req, res) {
 	try {
 		if (!validateDescription(req.body).isValid) {
 			return res.status(400);
 		}
 		let shop = await Shop.findOne({userEmail: req.body.userEmail});
 		if (shop) {
 			shop.description = req.body.description;
 			shop.save();
 		} else {
 			return res.status(400).json({ errors: { email: "There is no shop associated with this account"}});
 		}
 	} catch (err) {
 		return res.status(503);
 	}
 }

module.exports = {
	fetchShop: fetchShop,
	createShop: createShop,
	editCoverPhoto: editCoverPhoto,
	editName: editName,
	editDescription: editDescription
}