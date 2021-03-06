const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Validator = require("validator");
const isEmpty = require("is-empty");
const Float = require('mongoose-float').loadType(mongoose, 2);

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
        type: Float,
        required: true
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
        URL: {
			type: String,
			required: false
		},
		ID: {
			type: String,
			required: false
		}
    }],
    date: {
        type: String,
		required: true
    }
});

//-----------------------------------------------------------------
function validateProductCreation(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use Validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.price = !isEmpty(data.price) ? data.price : "";

    // Name check
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required.";
    }
    
    // Price check
    if (Validator.isEmpty(data.price)) {
        errors.price = "Price field is required.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

//-----------------------------------------------------------------
function validatePrice(price) {
	return { isValid: !isEmpty(price) };
}

//-----------------------------------------------------------------
function validateName(name) {
	return { isValid: !isEmpty(name) };
}

module.exports = {
	Product: mongoose.model("products", ProductSchema),
	validateProductCreation: validateProductCreation,
    validateName: validateName,
    validatePrice: validatePrice
}