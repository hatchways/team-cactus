const express = require('express');
const router = express.Router();
const { upload, s3 } = require('../config/image-upload');
const singleUpload = upload.single('image');
const passport = require("passport");

/* Upload single image to AWS S3 -------------------------------------------------------------- */
router.post('/single', passport.authenticate('jwt', { session: false }), function(req, res) {
// function uploadPhoto(req, res) {
	// singleUpload reads 'image' from request's multipart form data
	singleUpload(req, res, function(err) {
		if (err) {
			// console.log(err.message);
	     	return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
	    }

	    res.status(200).send({'imageUrl': req.file.location, 'imageID': req.file.key });
  	});
});

// Delete a photo from S3 ------------------------------------------------------------------- */
// router.delete('/single', passport.authenticate('jwt', { session: false }), function(req, res) {
// 	s3.deleteObject({
// 	 	Bucket: process.env.BUCKET_NAME,
// 		Key: req.data.imgKey
// 	}, function (err,data) {})
// });

module.exports = router;