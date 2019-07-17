const express = require('express');
const router = express.Router();
const upload = require('../config/image-upload');
const singleUpload = upload.single('image');
const passport = require("passport");

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.json({'imageUrl': req.file.location, 'imageID': req.file.key });
  });
});

module.exports = router;