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
	coverImage: {
		URL: {
			type: String,
			required: false
		},
		ID: {
			type: String,
			required: false
		},
	},
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
function validateCoverImage(image) {
	return { isValid: ((!isEmpty(image.URL) && !isEmpty(image.ID)) || (isEmpty(image.URL) && isEmpty(image.ID))) };
}

//-----------------------------------------------------------------
function validateName(name) {
	return { isValid: !isEmpty(name) };
}


module.exports = {
	Shop: mongoose.model("shops", ShopSchema),
	validateShopCreation: validateShopCreation,
	validateCoverImage: validateCoverImage,
	validateName: validateName

}
