var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { User, validateRegister, validateLogin } = require('../models/users');
const secretOrKey = process.env.SECRETORKEY;

/* Create new user ----------------------------------------------------------------*/
router.post('/', async function(req, res, next) {
    try {
        // Make sure all fields are filled
        const { errors, isValid } = validateRegister(req.body);
        if (!isValid) {
            return res.status(400).json({ errors: errors });
        }
        let shopkeeperCheck = (req.body.isShopkeeper && req.body.isShopkeeper !== "false") ? true : false;
 
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
            isShopkeeper: shopkeeperCheck
        });

        await user.save();
        
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
                    isShopkeeper: user.isShopkeeper
                });
            }
        );
    }
    catch (error) {
        console.log(error);
        return res.status(503).json({ errors: { message : "The user could not be created" }});
    }
});

/* Login user ----------------------------------------------------------------*/
router.post('/login', async function(req, res, next) {
    try {
		// Make sure all fields are filled
		const { errors, isValid } = validateLogin(req.body);
		if (!isValid) {
	        return res.status(400).json(errors);
	    }

		// Check if sign-in address exists
		let user = await User.findOne({ email: req.body.email });
	    if (!user) {
	    	return res.status(401).send({ errors: { message: "There is no account associated with the email provided."} });
	    }

	    // Check if the password matches
		if (await user.validatePassword(req.body.password)) {
			// Passwords match! Create JWT payload and sign
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

		} else { // Passwords did not match
			res.status(401).send({ errors: {message: "Your password is incorrect." } });
		}

	} catch (err) { // some issue trying to access the database or check the passwords
		// console.error(err.message);
		res.status(503).send({ errors: {message: "Could not sign in." } });
    }
});

module.exports = router;