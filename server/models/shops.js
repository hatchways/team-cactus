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
});

//-----------------------------------------------------------------
function validateShopCreation(data) {
 	let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : "";

    // Email check
    if (Validator.isEmpty(data.userEmail)) {
        errors.email = "Email field is required";
	}
	
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

//-----------------------------------------------------------------
function validateCoverPhoto(data) {
	return { isValid: !isEmpty(data.coverURL) };
}

//-----------------------------------------------------------------
function validateDescription(data) {
	return { isValid: !isEmpty(data.description) };
}

//-----------------------------------------------------------------
function validateName(data) {
	return { isValid: !isEmpty(data.name) };
}


module.exports = {
	Shop: mongoose.model("shops", ShopSchema),
	validateShopCreation: validateShopCreation,
	validateCoverPhoto: validateCoverPhoto,
	validateDescription: validateDescription,
	validateName: validateName

}
