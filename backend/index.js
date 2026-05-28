const express = require("express");
const cors = require("cors");
require("dotenv").config();
const uploadRoutes = require("./routes/uploadRoutes");
const recordRoutes = require("./routes/recordRoutes");
const auditRoutes = require("./routes/auditRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Breathe ESG API Running");
});

app.use("/upload", uploadRoutes);
app.use("/records", recordRoutes);
app.use("/audit-logs", auditRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});