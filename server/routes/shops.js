var express = require('express');
var router = express.Router();
const passport = require("passport");
const { Shop, validateShopCreation, validateCoverImage, validateName } = require('../models/shops');
const secretOrKey = process.env.SECRETORKEY;
// const uploadPhoto = require("./images");

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

/* Edit shop cover photo --------------------------------------------------------------------------*/
// router.put('/coverPhoto', passport.authenticate('jwt', { session: false }), async function(req, res) {
//     try {
//         const email = req.user.email;
//         let shop = await Shop.findOne({userEmail: email});

//         if (!shop) {
//             return res.status(400).send("There is no store associated with this account");
//         }

//         result = uploadPhoto(req, res);
//         console.log(result);
//         if (!result || !result.imageUrl) { // could not upload
//             return res.status(422).send("boo");
//         }

//         shop.coverImage.URL = result.imageUrl;
//         shop.coverImage.ID = result.imageID;
//         shop.save();

//         res.status(200).send(result);

//         // TODO: what to do if photo uploaded but not saved to document?

//     } catch (asyncErr) {
//         console.log(asyncErr);
//         // res.status(503).send({ errors: { message: "Could not upload image" } });
//         res.status(503).send({ errors: { message: asyncErr.message } });
//     }
// });

/* Edit shop data -----------------------------------------------------------------------------*/
router.put('/', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    
    try {
        const email = req.user.email;
        let shop = await Shop.findOne({userEmail: email});

        if (shop) {
            const keys = Object.keys(req.body);
            const values = Object.values(req.body);

            if(!validateName(req.body).isValid) {
                res.status(400).send({ errors: { message: `Error with shop ${key}.`}});
            }
            // Set the new value for each the shop's columns that is specified in keys
            for (let i = 0; i < keys.length; i++) {
                shop[keys[i]] = values[i];
            }
            await shop.save();

            res.status(200).send(shop);
        } else {
			res.status(400).send({ errors: { message: "There is no shop associated with this account"}});
        } 
    } catch (err) {
		res.status(503).send({ errors: { message: "Something went wrong"}});
    }
});

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

 //  async function editCoverPhoto(req, res) {
 //  try {
 //    if (!validateCoverURL(req.body).isValid) {
 //      return res.status(400);
 //    }
 //    let shop = await Shop.findOne({userEmail: req.body.userEmail});
 //    if (shop) {
 //      shop.coverPhoto = req.body.coverURL;
 //      shop.save();
 //      return res.status(200).send(shop);
 //    } else {
 //      return res.status(400).json({ errors: { email: "There is no shop associated with this account"}});
 //    }
 //  } catch (err) {
 //    return res.status(503);
 //  }
 // }

module.exports.createShop = createShop;
module.exports.routes = router;
