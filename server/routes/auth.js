const router = require("express").Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const {
      userType,
      userId,
      password,
      companyName,
      businessDescription,
      revenue,
    } = req.body;

    const newUser = new User({
      userType,
      userId,
      password,
      companyName,
      businessDescription,
      revenue,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login/startup", async (req, res) => {
  try {
    const { companyName, loginType } = req.body;
    if (loginType === "startup") {
      const user = await User.findOne({ companyName });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(400).json({ error: "Invalid login type" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login/investor", async (req, res) => {
  try {
    const { userId, password, loginType } = req.body;
    if (loginType === "investor") {
      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(400).json({ error: "Invalid login type" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
