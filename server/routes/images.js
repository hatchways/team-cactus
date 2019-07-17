const express = require('express');
const router = express.Router();
const upload = require('../config/image-upload');
const singleUpload = upload.single('image');
const passport = require("passport");

/* Upload single image ----------------------------------------------------------------------- */
router.post('/single', passport.authenticate('jwt', { session: false }), function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.status(200).json({'imageUrl': req.file.location, 'imageID': req.file.key });
  });
});

module.exports = router;