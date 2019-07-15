const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Validator = require("validator");
const isEmpty = require("is-empty");
const argon2 = require("argon2"); // for password hashing
const createShop = require("../routes/shops").createShop;
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.SECRETORKEY;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    isShopkeeper: {
        type: Boolean,
        required: true
    }
}, {collection: 'users'});

//-----------------------------------------------------------------
UserSchema.pre('save', async function() {
    if (this.isShopkeeper) {
        data = { userEmail: this.email };
        
        let shop = await createShop(data);
        if (!shop || shop.errors) {
            throw new Error(shop.errors ? shop.errors : {errors: { shop: "Could not create shop"} });
        }
    }
});

//-----------------------------------------------------------------
function validateRegisterFields(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password check
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    // Name check
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

//-----------------------------------------------------------------
function validateLoginFields(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

//-----------------------------------------------------------------
UserSchema.statics.hashPassword = async function(plaintextPassword) {
    try {
        return await argon2.hash(plaintextPassword);
    } catch (err) {
        console.log(`Could not hash password. Error: ${err}`);
        return "";
    }
};

//-----------------------------------------------------------------
UserSchema.methods.validatePassword = async function(plaintextPassword) {
    return await argon2.verify(this.password, plaintextPassword);
};

//-----------------------------------------------------------------
// UserSchema.methods.generateJWT = async function(payload) {
//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(today.getDate() + 60);

//     return await jwt.sign(
//         payload,
//         secretOrKey,
//         { expiresIn: 31556926 }, // 1 year in seconds
//         // Append token to a Bearer string since we chose bearer scheme in config
//         (err, token) => {
//             res.status(200).json({
//                 success: true,
//                 token: "Bearer " + token,
//             });
//         }
//     );

// }

// UserSchema.methods.toAuthJSON = function() {
//   return {
//     _id: this._id,
//     email: this.email,
//     token: this.generateJWT()
//   };
// };

module.exports = {
    User: mongoose.model("users", UserSchema),
    validateRegister: validateRegisterFields,
    validateLogin: validateLoginFields
}