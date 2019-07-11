const { User, validateRegister } = require('../models/user');
const argon2 = require("argon2"); // for password hashing
 
 async function register(req, res) {    // First validate register parameters
    try {
        // Make sure all fields are filled
        const { errors, isValid } = validateRegister(req.body);
        if (!isValid) {
            return res.status(400).json({ errors: errors });
        }
 
        // Check if this user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ errors: { email: 'The email address provided is already in use' } });
        } else {
            // Insert the new user if they do not exist yet
            let hashedPassword = await hashPassword(req.body.password);
            if (hashedPassword === "") { // could not hash password
                return res.status(500);
            }
            user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            await user.save();
            res.status(201).send(user);
            // TODO: jwt signin here
        }
    }
    catch (errorCantSave) {
        // console.error(errorCantSave);
        res.status(500).send({ errors: { err : 'The user could not be created' } });
    }
}


async function hashPassword(plaintextPwd) {
    // Assume the password has been validated
    try {
        const hash = await argon2.hash(plaintextPwd);
        return hash;
    } catch (err) {
        console.log(`Could not hash password. Error: ${err}`);
        return "";

    }
}
 
module.exports = register;