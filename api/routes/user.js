const express = require('express');
const User = require("../models/User");
const path = require('path');

const router = express.Router();

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1', 
  accessKeyId: 'AKIAXSI6TO7ANQL2AF6B', 
  secretAccessKey: process.env.AWS_SK,
});
const s3 = new AWS.S3();
const BUCKET_NAME = 'sonepfps';

const multer = require('multer');
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      cb(null, `profilePics/${Date.now().toString()}${path.extname(file.originalname)}`);
    }
  }),
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
}).single('profilePic');

router.get("/profile", async (req, res) => {
  if (!req.user) {
    return res.json({ status: "not_logged_in" });
  }
  
  const user = await User.findOne({ email: req.user.email });
  return res.json({ status: "ok", user: user });
});


router.post("/uploadPfp", (req, res) => {
  console.log("Entered uploadPfp endpoint");
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error in multer:", err);
      return res.status(500).json({ error: err });
    }

    console.log("Upload to S3 was successful, file URL:", req.file.location);

    const fileUrl = req.file.location;

    try {
      const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { profilePicture: fileUrl },
        { new: true }
      );

      if (!user) {
        console.error("User not found for email:", req.user.email);
        return res.status(404).json({ error: 'User not found' });
      }

      console.log("Database update was successful, updated user:", user);

      res.json({ status: 'ok', fileUrl });

    } catch (error) {
      console.error("Error in DB operation:", error);
      res.status(500).json({ error: error.message });
    }

  });
});


module.exports = router;