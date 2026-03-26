require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Models
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }
}));

const Shipment = mongoose.model("Shipment", new mongoose.Schema({
  trackingId: String,
  sender: String,
  receiver: String,
  currentStatus: String,
  history: [
    {
      status: String,
      location: String,
      comment: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
}));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Auth
app.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashed });
  await user.save();
  res.send("Registered");
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.send({ token, role: user.role });
});

// Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("No token");
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};

// Routes
app.post("/shipment", auth, async (req, res) => {
  const shipment = new Shipment({
    ...req.body,
    currentStatus: "Pending",
    history: [{ status: "Pending", location: "Warehouse", comment: "Created" }]
  });
  await shipment.save();
  res.send(shipment);
});

app.get("/shipment/:id", auth, async (req, res) => {
  const s = await Shipment.findOne({ trackingId: req.params.id });
  res.send(s);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
