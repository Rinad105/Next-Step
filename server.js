const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const filePath = path.join(__dirname, "projects.json");

app.get("/api/projects", (req, res) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
  const data = fs.readFileSync(filePath);
  res.json(JSON.parse(data));
});

app.post("/api/projects", (req, res) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
  const newProject = req.body;
  const data = JSON.parse(fs.readFileSync(filePath));
  data.push(newProject);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "Project added successfully" });
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});