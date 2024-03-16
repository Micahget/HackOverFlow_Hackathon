const express = require("express");
const cors = require("cors"); // Import the cors middleware
const multer = require("multer");
const path = require("path");
const axios = require("axios"); // Import axios for making HTTP requests
const { PythonShell } = require("python-shell"); // Import PythonShell for running Python scripts

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
app.post("/record", upload.single("video"), async (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const videoFilePath = path.join(__dirname, "uploads", req.file.filename);
  console.log("File uploaded:", videoFilePath);

    try {
      // Execute the Python script
      PythonShell.run(
        "model/main.py",
        { args: [videoFilePath] },
        (err, results) => {
          if (err) {
            console.error("Error executing Python script:", err);
            res.status(500).json({ error: "Failed to process video" });
          } else {
            console.log("Python script executed successfully");
            console.log("Output:", results);
            res.status(200).json({ message: "Video processed successfully" });
          }
        }
      );
    } catch (error) {
      console.error("Error processing video:", error.message);
      res.status(500).json({ error: "Failed to process video" });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
/*
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const multer = require("multer");
const path = require("path");
const axios = require("axios"); // Import axios for making HTTP requests
const { PythonShell } = require("python-shell"); // Import PythonShell for running Python scripts
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
*/
// Handle POST request to /record
// app.post("/record", upload.single("video"), (req, res) => {
//   if (!req.file) {
//     console.log("No file uploaded");
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const videoFilePath = path.join(__dirname, "uploads", req.file.filename);
//   console.log("Uploaded video file path:", videoFilePath);

//   try {
//     // Execute the Python script
//     PythonShell.run(
//       "cd ../ && model/main.py",
//       { args: [videoFilePath] },
//       (err, results) => {
//         if (err) {
//           console.error("Error executing Python script:", err);
//           res.status(500).json({ error: "Failed to process video" });
//         } else {
//           console.log("Python script executed successfully");
//           console.log("Output:", results);
//           res.status(200).json({ message: "Video processed successfully" });
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error processing video:", error.message);
//     res.status(500).json({ error: "Failed to process video" });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

