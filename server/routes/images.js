const express = require('express');
const router = express.Router();
const { upload, s3 } = require('../config/image-upload');
const singleUpload = upload.single('image');
const multipleUpload = upload.array('images');
const passport = require("passport");

/* Upload single image to AWS S3 -------------------------------------------------------------- */
router.post('/single', passport.authenticate('jwt', { session: false }), function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{ message: 'Image Upload Error', detail: err.message }]});
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

/* Upload multiple images ----------------------------------------------------------------------- */
router.post('/multiple', passport.authenticate('jwt', { session: false }), function(req, res) {
  multipleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{ message: 'Images Upload Error', detail: err.message }]});
    }

    return res.send(req.files)
  });
});

module.exports = router;