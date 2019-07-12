const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Validator = require("validator");
const isEmpty = require("is-empty");

const ShopSchema = new Schema({
	userEmail: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	coverPhoto: {
		type: String,
		required: false
	}
}, {collection: 'shops'});

function validateShopCreation(data) {
 	let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    // The following are allowed to be empty
    data.description = !isEmpty(data.description) ? data.description : "";
    data.coverPhoto = !isEmpty(data.coverPhoto) ? data.coverPhoto : "";

    // Email check
    if (Validator.isEmpty(data.userEmail)) {
        errors.email = "Email field is required";
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

function validateFetchShop(data) {
	return { isValid: !isEmpty(data.userEmail) && !isEmpty(data.name) };
}

module.exports = {
	Shop: mongoose.model("shops", ShopSchema),
	validateShopCreation: validateShopCreation,
	validateFetchShop: validateFetchShop
}