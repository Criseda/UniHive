const express = require("express");
const multer = require("multer");
const fileType = require("file-type");
const fs = require("fs");
const readChunk = require("read-chunk");
const path = require("path");
const axios = require("axios"); // Make sure to install this package

const router = express.Router();

// avatar upload

const avatarUpload = multer({
  dest: "uploads/",
  limits: { fileSize: 10000000, files: 1 }, // 10 MB, 1 file
}).single("avatar");

router.post("/avatar", (req, res, next) => {
  avatarUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send({
        error: "File too large. Please upload a file smaller than 10MB.",
      });
    } else if (err) {
      return res.status(500).send(err.toString());
    }

    try {
      const buffer = await readChunk(req.file.path, 0, 4100);
      const type = await fileType.fromBuffer(buffer);

      if (!type || !type.mime.startsWith("image/")) {
        fs.unlinkSync(req.file.path); // Delete the file
        return res
          .status(400)
          .send({ error: "Invalid file type. Please upload an image." });
      }

      // Use the original filename without appending a timestamp
      const newName = req.file.originalname;

      // Create the avatars directory if it doesn't exist
      const dirPath = path.join(
        __dirname,
        "../../client/public/images/avatars"
      );
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Move the image into the correct directory
      const newPath = path.join(dirPath, newName);
      fs.renameSync(req.file.path, newPath);

      // Update the user's avatar_path
      const user_id = req.body.user_id; // Get the user ID from the request body
      const avatarUrl = `/images/avatars/${newName}`;
      await axios.put(`http://localhost:5000/api/users/${user_id}`, {
        avatar_path: avatarUrl,
      });

      // Send the URL of the uploaded image back to the client
      res.send({ avatarUrl });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
});

// item image upload

const itemImagesUpload = multer({
  dest: "uploads/",
  limits: { fileSize: 10000000, files: 10 }, // 10 MB, 10 files
}).array("items", 10); // Handle up to 10 images

router.post("/itemImages", (req, res, next) => {
  itemImagesUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send({
          error: "File too large. Please upload a file smaller than 10MB.",
        });
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).send({
          error: "Too many files. Maximum is 10 images.",
        });
      }
    } else if (err) {
      return res.status(500).send(err.toString());
    }

    try {
      const imageUrls = [];

      for (let i = 0; i < req.files.length; i++) {
        const buffer = await readChunk(req.files[i].path, 0, 4100);
        const type = await fileType.fromBuffer(buffer);

        if (!type || !type.mime.startsWith("image/")) {
          fs.unlinkSync(req.files[i].path); // Delete the file
          return res
            .status(400)
            .send({ error: "Invalid file type. Please upload an image." });
        }

        // Generate a new filename by appending a timestamp to the original filename
        const originalName = path.parse(req.files[i].originalname).name;
        const extension = path.parse(req.files[i].originalname).ext;
        const newName = `${originalName}_${Date.now()}${extension}`;

        // Create the item_images directory if it doesn't exist
        const dirPath = path.join(
          __dirname,
          "../../client/public/images/item_images"
        );
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        // Move the image into the correct directory
        const newPath = path.join(dirPath, newName);
        fs.renameSync(req.files[i].path, newPath);

        // Add the URL the uploaded image to the array
        const imageUrl = `/images/item_images/${newName}`;
        imageUrls.push(imageUrl);
      }

      // Send the URLs of the uploaded images back to the client
      res.send({ imageUrls });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
});

module.exports = router;
