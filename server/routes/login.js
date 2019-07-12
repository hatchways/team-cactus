const User = require('../models/user').User;
const validateLogin = require('../models/user').validateLogin;
const argon2 = require("argon2"); // for password hashing
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.SECRETORKEY;

async function login(req, res) {
	try {
		// Make sure all fields are filled
		const { errors, isValid } = validateLogin(req.body);
		if (!isValid) {
	        return res.status(400).json(errors);
	    }

		// Check if sign-in address exists
		let user = await User.findOne({ email: req.body.email });
	    if (!user) {
	    	return res.status(401).send({ errors: { email: "There is no account associated with the email address provided"} });
	    }

	    // Check if the password matches
		if (user.validatePassword(req.body.password)) {
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
						token: "Bearer " + token
					});
				}
    		);
		} else { // Passwords did not match
			res.status(401).send({ errors: {password: "Your password is incorrect" } });
		}

	} catch (err) { // some issue trying to access the database or check the passwords
		console.error(err.message);
		res.status(503).send({ errors: {err: "Could not sign in" } });
	}
}

module.exports = login;