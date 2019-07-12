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

        //TODO: change this according to req
        let isShopkeeper = true;
 
        // Check if this user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).json({ errors: { email: 'The email address provided is already in use' } });
        }
        // Insert the new user since they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await User.hashPassword(req.body.password)
        });

        if (user.password === "") { // could not hash password
            return res.status(422);
        }

        await user.save();

        if (isShopkeeper) {
            let name = "store name";
            data = { userEmail: email, name: name };
            createShop(data, res);
        }
        res.status(201).send(user);
        // TODO: jwt signin here
    }
    catch (errorCantSave) {
        // console.error(errorCantSave);
        return res.status(503).json({ errors: { err : "The user could not be created" }});
            // 'The user could not be created' } });
    }
}

 
module.exports = register;