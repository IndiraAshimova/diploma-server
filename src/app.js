const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const xpRoutes = require("./routes/xpRoutes");
const streakRoutes = require("./routes/streakRoutes"); 

const config = require("./config/env");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/xp", xpRoutes);
app.use("/api/streak", streakRoutes); 

app.listen(config.port, () => {
  console.log("Server running on port " + config.port);
});