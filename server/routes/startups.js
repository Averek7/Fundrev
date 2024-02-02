const router = require("express").Router();
const User = require("../models/User");
const multer = require("multer");
const csvtojson = require("csvtojson");
const { PythonShell } = require("python-shell");
const fs = require("fs");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/startups", async (req, res) => {
  try {
    const startups = await User.find({
      userType: "startup",
    });
    res.json(startups);
  } catch (error) {
    console.error("Error fetching startups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/interest/:startupId", async (req, res) => {
  try {
    const { startupId } = req.params;
    const startup = await User.findByIdAndUpdate(startupId);

    startup.$set({
      interestedStartups: !startup.interestedStartups,
    });

    await startup.save();
    res.status(200).json({ message: "Interest expressed" });
  } catch (error) {
    console.error("Error during express interest:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const salesDataBuffer = req.file.buffer.toString();
    const salesDataJson = await csvtojson().fromString(salesDataBuffer);

    // Save the sales data to MongoDB or process it as needed
    // (e.g., calculate monthly sales figures)

    // Pass the processed data to Python script for chart generation
    const jsonString = JSON.stringify(salesDataJson, null, 2);
    const filePath = "./file.json";

    // Write the JSON data to the file asynchronously
    fs.writeFile(filePath, jsonString, (err) => {
      if (err) {
        console.error("Error writing JSON data to file:", err);
      } else {
        console.log("JSON data has been written to", filePath);
      }
    });

    const options = {
      mode: "text",
      scriptPath: "./generate-charts.py",
      args: [req.body.startDate, req.body.endDate],
    };

    console.log(options);

    PythonShell.run("./generate_charts.py", options, (err, results) => {
      if (err) throw err;

      const chartData = JSON.parse(results[0]);
      console.log(chartData);
      res.status(200).json({ chartData });
    });
  } catch (error) {
    console.error("Error during file upload:", error);
  }
});

module.exports = router;
