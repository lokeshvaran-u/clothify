require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

// Connect to MongoDB FIRST
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
    process.exit(1);
  });

// THEN import routes
const UserRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const ActivityLogRoutes = require("./routes/ActivityLogRoutes");

app.use(express.json());

app.use((req, res, next) => {
  console.log("Middleware Running");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Clothify");
});

app.use("/users", UserRoutes);

app.use("/products", productRoutes);

app.use("/activity-logs", ActivityLogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});