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

        let password = await User.hashPassword(req.body.password);
        if (password === "") { // could not hash password
            return res.status(422);
        }
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: password,
            isShopOwner: shopOwnerCheck
        });

        await user.save();

        res.status(201).send(user);
        // TODO: jwt signin here
    }
    catch (errorCantSave) {
        return res.status(503).json({ errors: { err : "The user could not be created" }});
        // return res.status(503).json({ errors: { err : errorCantSave.message }});
    }
}

 
module.exports = register;