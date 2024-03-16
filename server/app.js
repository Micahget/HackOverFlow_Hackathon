const express = require("express");
const cors = require("cors"); // Import the cors middleware
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5050;

// Use the cors middleware
app.use(cors());

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Handle POST request to /record
app.post("/record", upload.single("video"), (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const localFilePath = path.join(__dirname, "uploads", req.file.filename);


  res.status(200).json({ filePath: localFilePath });
});

// now 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
