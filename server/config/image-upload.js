const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

aws.config.update({
  secretAccessKey: IAM_USER_SECRET,
  accessKeyId: IAM_USER_KEY,
  regiona: 'us-east-2'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = { 
  upload: upload,
  s3: s3
}