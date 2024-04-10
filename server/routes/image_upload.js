const express = require("express");
const multer = require("multer");
const fileType = require("file-type");
const fs = require("fs");
const readChunk = require("read-chunk");
const path = require("path");
const axios = require("axios"); // Make sure to install this package

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10000000, files: 1 }, // 10 MB, 1 file
}).single("avatar");

router.post("/avatar", (req, res, next) => {
  upload(req, res, async function (err) {
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

      // Move the image into the correct directory
      const newPath = path.join(
        __dirname,
        "../../client/public/images",
        req.file.originalname
      );
      fs.renameSync(req.file.path, newPath);

      // Update the user's avatar_path
      const user_id = req.body.user_id; // Get the user ID from the request body
      const avatarUrl = `/images/${req.file.originalname}`;
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

module.exports = router;
