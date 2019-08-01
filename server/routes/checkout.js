const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const router = require('express').Router();
const passport = require("passport");
const { Transaction } = require('../models/transactions');
const { User } = require('../models/users');

/* Create a charge ---------------------------------------------------------------------- */
router.put('/checkout', passport.authenticate('jwt', { session: false }), async function(req, res) {
	try {
		let user = await User.findOne( {email: req.user.email} );

		if (!user) {
			// TODO: allow unsigned in users to also checkout
			return res.status(401).send({ errors: {message: "You must be signed in to check out"}})
		}

		let stripeCustomerID = user.stripeCustomerID ? user.stripeCustomerID : null;
		let total = req.body.purchaseData.total;
		let currency = req.body.purchaseData.currency;
		let rememberCard = req.body.rememberCard;
		let useStoredCard=  req.body.useStoredCard
		let productsPurchased = req.body.productsPurchased; // [{ productID: _, amount: _}]

		if (rememberCard && !stripeCustomerID) {
			// Save customer information for next time
			stripeCustomerID = await stripe.customers.create({
				description: `Customer for user ${req.user.email}`,
				source: req.body.source,
			});
		}

		let chargeParameters = {
			amount: total,
			currency: currency,
			description: `Purchase for user ${req.user.email}`,
			receipt_email: req.user.email,
		}

		// Configure the source of the funds for the transaction based on whether the user
		// has a card saved to their account, or if they provided it
		if (useStoredCard) {
			if (!stripeCustomerID) {
				return res.status(400).send({error: {message: "There is no card saved in your account"}});
			}
			chargeParameters["customer"] = stripeCustomerID;
		} else {
			chargeParameters["source"] = req.body.source.id;
		}

		// Create and capture the charge
		let charge = await stripe.charges.create(chargeParameters);

		// Save the charge information in our database
		let tx = new Transaction({
			purchaserUserID: req.user._id,
			products: productsPurchased,
			total: total,
			stripeChargeID: charge.id
		})

		await tx.save();

		// Store stripeCustomerID in user document if transaction successfully saved
		if (rememberCard) {
			user.stripeCustomerID = stripeCustomerID;
			await user.save();
		}

		// Send back transaction document just created
		return res.status(201).send(tx);
	} 
	catch (asyncErr) {
		console.log("error: " + asyncErr.message);
		res.status(503).send({error: asyncErr.message});
	}
});

module.exports = router;