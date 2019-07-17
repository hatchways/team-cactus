const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Validator = require("validator");
const isEmpty = require("is-empty");
const argon2 = require("argon2"); // for password hashing
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.SECRETORKEY;
const createShop = require("../routes/shops").createShop;

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
});

//-----------------------------------------------------------------
UserSchema.pre('save', async function() {     
    // Before adding a new user document to the collection, also create a new store for them iff they
    // have signed up as a shopowner
    if (this.isShopkeeper) {
        data = { userEmail: this.email };
        //     data = { userEmail: this.email, name: "My Store" };
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


module.exports = {
    User: mongoose.model("users", UserSchema),
    validateRegister: validateRegisterFields,
    validateLogin: validateLoginFields
}