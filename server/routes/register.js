const User = require('../models/user').User;
const validateRegister = require('../models/user').validateRegister;
 
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
            res.status(201).send(user);
            // TODO: jwt signin here
        }
    }
    catch (errorCantSave) {
        // console.error(errorCantSave);
        res.status(503).send({ errors: { err : errorCantSave.message }});
            // 'The user could not be created' } });
    }
}

 
module.exports = register;