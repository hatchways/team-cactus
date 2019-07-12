const User = require('../models/users').User;
const validateRegister = require('../models/users').validateRegister;
const createShop = require('./mystore').createShop;

 async function register(req, res) {    // First validate register parameters
    try {
        // Make sure all fields are filled
        const { errors, isValid } = validateRegister(req.body);
        if (!isValid) {
            return res.status(400).json({ errors: errors });
        }
        let shopOwnerCheck = (req.body.isShopOwner && req.body.isShopOwner !== "false") ? true : false;
 
        // Check if this user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).json({ errors: { email: 'The email address provided is already in use' } });
        }
        // Insert the new user since they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await User.hashPassword(req.body.password),
            isShopOwner: shopOwnerCheck
        });

        if (user.password === "") { // could not hash password
            return res.status(422);
        }

        await user.save();

        // Create their shop first and then try to save the user, to make sure
        // we don't get a shopowner account with an unitialized shop
        // if (isShopkeeper) {
        //     let name = "store name";
        //     data = { userEmail: req.body.email, name: name };
        //     let store = await createShop(data);
        //     if (!store || store.errors) {
        //         return res.status(400).json({ errors: { shop: "Unable to create shop; user was not created" } });
        //     }
        // }
        res.status(201).send(user);
        // TODO: jwt signin here
    }
    catch (errorCantSave) {
        // console.error(errorCantSave);
        // return res.status(503).json({ errors: { err : "The user could not be created" }});
        return res.status(503).json({ errors: { err : errorCantSave.message }});
    }
}

 
module.exports = register;