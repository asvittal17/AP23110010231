const express = require("express");
const app = express();
const logger = require("./middleware/logger");

app.use(express.json());
app.use(logger);

app.get("/notifications", (req, res) => {
  res.json([
    { id: 1, type: "Event", message: "tech-fest", timestamp: new Date() },
    { id: 2, type: "Placement", message: "Amazon hiring", timestamp: new Date() }
  ]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});