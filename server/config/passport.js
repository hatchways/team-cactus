const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const secretorkey = process.env.SECRETORKEY;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretorkey;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findOne({ email : jwt_payload.email })
		    	.then(user => {
		      		if (user) {
		        		return done(null, user);
					  }
		      		return done(null, false);
		    	})
		    	.catch(err => console.log('jwt error', err));
		})
	);
}