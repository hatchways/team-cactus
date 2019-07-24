const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	purchaserID: {
		type: String,
		required: true
	},
	productIDs: [String], // ids from Products collection for all purchases in this transaction
	stripeID: {
		type: String,
		required: true
	}
});


module.exports = {
	Transaction: mongoose.model("transactions", TransactionSchema),
}