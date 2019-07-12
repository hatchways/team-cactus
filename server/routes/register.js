const User = require('../models/users').User;
const validateRegister = require('../models/users').validateRegister;
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.SECRETORKEY;

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
            return res.status(409).json({ errors: { message: 'The email address provided is already in use.' } });
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
        const payload = { email: user.email };
        jwt.sign(
            payload,
            secretOrKey,
            { expiresIn: 31556926 }, // 1 year in seconds
            // Append token to a Bearer string since we chose bearer scheme in config
            (err, token) => {
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
        );
    }
    catch (errorCantSave) {
        return res.status(503).json({ errors: { err : "The user could not be created" }});
        // return res.status(503).json({ errors: { err : errorCantSave.message }});
        
        try {
            console.log(user.email);
            
        } catch (err) { // some issue trying to access the database or check the passwords
            res.status(503).send({ errors: {message: "Could not sign in" } });
        }
    }
}

module.exports = register;