const { User, validateRegister } = require('../models/user');
const express = require('express');
const router = express.Router();
const argon2 = require("argon2"); // for password hashing
 
router.post('/register', async (req, res) => {
    // First validate register parameters
    const { error } = validateRegister(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('The email address provided is already in use');
    } else {
        try {
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
        }
        catch (errorCantSave) {
            res.status(500).send('The user could not be created');
            console.error(errorCantSave);
        }
    }
});

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
 
module.exports = router;