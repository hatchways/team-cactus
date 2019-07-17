const express = require('express');
const router = express.Router();
const upload = require('../config/image-upload');
const singleUpload = upload.single('image');
const multipleUpload = upload.array('images');
const passport = require("passport");

/* Upload single image ----------------------------------------------------------------------- */
router.post('/single', passport.authenticate('jwt', { session: false }), function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.json({'imageUrl': req.file.location, 'imageID': req.file.key });
  });
});

/* Upload multiple image ----------------------------------------------------------------------- */
router.post('/multiple', passport.authenticate('jwt', { session: false }), function(req, res) {
  multipleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Images Upload Error', detail: err.message}]});
    }

    return res.send(req.files)
  });
});

module.exports = router;