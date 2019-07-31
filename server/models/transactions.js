const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose, 2);

const TransactionSchema = new Schema({
	purchaserUserID: {
		type: String,
		required: true
	},
	products: [{
		productID: {
			type: String,
			required: true
		},
		amount: {
			type: Float,
			required: true
		}
	}],
	stripeChargeID: {
		type: String,
		required: true
	},
	total: {
		type: Number,
		required: true
	}
});


module.exports = {
	Transaction: mongoose.model("transactions", TransactionSchema),
}