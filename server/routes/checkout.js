const stripe = require("stripe")(process.env.STRIPE_PUBLIC_TEST);
const router = require('express').Router();
const { Transaction } = require('../models/transactions');
const { User } = require('../models/users');

/* Create a charge ---------------------------------------------------------------------- */
router.put('/checkout', passport.authenticate('jwt', { session: false }), async function(req, res) {
	try {
		const email = req.user.email;
		let user = await User.findOne( {email: email} );

		if (!user) {
			// TODO: allow unsigned in users to also checkout
			return res.status(401).send({ errors: {message: "You must be signed in to check out"}})
		}

		let stripeCustomerID = user.stripeCustomerID ? user.stripeCustomerID : null;
		let amount = req.body.amount;
		let billingInfo = req.body.billingInfo;
		let rememberCard = req.body.rememberCard;

		if (rememberCard && !stripeCustomerID) {
			stripeCustomerID = await stripe.customers.create({
				email: email,
				source: req.body.source,
			});
		}

		let charge = await stripe.charges.create({
			amount: amount,
			currency: "cad",
			source: req.body.source,
			description: `Purchase for user ${email}`,
			customer: stripeCustomerID
		});

		return res.status(201).send(charge);
	} 
	catch (asyncErr) {
		res.status(503);
	}
});