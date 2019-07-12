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
    data.name = !isEmpty(data.name) ? data.name : "My Store";

    // Email check
    if (Validator.isEmpty(data.userEmail)) {
        errors.email = "Email field is required";
    }
    //Name check
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

// function validateFetchShop(data) {
// 	return { isValid: !isEmpty(data.userEmail) };
// }

function validateCoverURL(data) {
	return { isValid: !isEmpty(data.coverURL) && !isEmpty(data.userEmail) };
}

function validateName(data) {
	return { isValid: !isEmpty(data.name) && !isEmpty(data.userEmail) };
}

function validateDescription(data) {
	return { isValid: !isEmpty(data.description) && !isEmpty(data.userEmail) };
}



module.exports = {
	Shop: mongoose.model("shops", ShopSchema),
	validateShopCreation: validateShopCreation,
	// validateFetchShop: validateFetchShop,
	validateCoverURL: validateCoverURL
}
