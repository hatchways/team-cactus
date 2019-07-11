const { User, validateLogin } = require('../models/user');
const argon2 = require("argon2"); // for password hashing

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
	    	return res.status(401).send({ errMsg: "There is no account associated with the email address provided"});
	    }

	    // Check if the password matches
	    let hashedPassword = user.password;
		let plaintextPassword = req.body.password;
		if (await argon2.verify(hashedPassword, plaintextPassword)) {
			// success!
			return res.status(200).send("Credentials authenticated!");
			// Sign JWT token

		} else {
			return res.status(401).send({ errMsg: "Your password is incorrect" });
		}

	} catch (err) { // some issue trying to access the database or check the password
		// console.error(err);
		return res.status(500).send({ errMsg: "Could not check login details" });
	}
}

module.exports = login;