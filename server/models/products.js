const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Validator = require("validator");
const isEmpty = require("is-empty");
var float = require('mongoose-float').loadType(mongoose, 2);

const ProductSchema = new Schema({
	shopID: {
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
	price: {
		price: { 
            type: Float,
            required: true 
        }
    },
    sizes: {
        xsmall: {
            type: Number,
            default: 0
        },
        small: {
            type: Number,
            default: 0
        },
        medium: {
            type: Number,
            default: 0
        },
        large: {
            type: Number,
            default: 0
        },
        xlarge: {
            type: Number,
            default: 0
        },
        xxlarge: {
            type: Number,
            default: 0
        },
    }, 
    photos: [{
        type: String
    }]
}, {collection: 'products'});

//-----------------------------------------------------------------
// function validateShopCreation(data) {
//  	let errors = {};
//     // Convert empty fields to an empty string so we can use validator functions
//     data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : "";
//     data.name = !isEmpty(data.name) ? data.name : "My Store";

//     // Email check
//     if (Validator.isEmpty(data.userEmail)) {
//         errors.email = "Email field is required";
//     }
//     //Name check
//     if (Validator.isEmpty(data.name)) {
//         errors.name = "Name field is required";
//     }

//     return {
//         errors,
//         isValid: isEmpty(errors)
//     };
// }

// //-----------------------------------------------------------------
// function validateCoverURL(data) {
// 	return { isValid: !isEmpty(data.coverURL) && !isEmpty(data.userEmail) };
// }

// //-----------------------------------------------------------------
// function validateName(data) {
// 	return { isValid: !isEmpty(data.name) && !isEmpty(data.userEmail) };
// }

// //-----------------------------------------------------------------
// function validateDescription(data) {
// 	return { isValid: !isEmpty(data.description) && !isEmpty(data.userEmail) };
// }



module.exports = {
	Shop: mongoose.model("shops", ShopSchema),
	// validateShopCreation: validateShopCreation,
	// validateCoverURL: validateCoverURL
}