const express = require("express");
const app = express();
const PORT = 9002;
const db = require("../db/db.json");
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));

app.post("/api/notes", (req, res) => {
  const noted = req.body;
  db.push(noted);
  res.send(db);
  fs.writeFile("../db/db.json", JSON.stringify(db), err => {
    if (err) throw err;
    console.log("New Note saved to database!");
  });
});

app.delete('/api/notes', (req, res) => {
  console.log('maybe deleted a note?');

});

app.get("/api/notes", (req, res) => {
  res.send(db);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.listen(PORT, () => console.log(`app is listening on PORT: ${PORT}`));
