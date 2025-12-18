const express = require("express");
const connectDB = require("./config/mongo");
const shortenRoute = require("./routes/shorten");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" })); // allow all for testing

// Connect DB
connectDB();

// Routes
app.use("/api", shortenRoute); // API PREFIX

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
