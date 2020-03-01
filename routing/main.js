const express = require("express");
const app = express();
const PORT = 9002;
const db = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const uuid = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));

app.post("/api/notes/", (req, res) => {
  const noted = req.body;
  noted.id = uuid.v4();
  db.push(noted);
  res.send(db);
  fs.writeFile("../db/db.json", JSON.stringify(db), err => {
    if (err) throw err;
  });
  console.log("New Note saved to database!");
});

app.delete('/api/notes/:id', (req, res) => {
  for (let i = 0; i < db.length; i++) {
    if (req.params.id === db[i].id) {
      db.splice(i, 1);
      res.send(db);
      fs.writeFile("../db/db.json", JSON.stringify(db), err => {
        if (err) throw err;
      });
      console.log('Note deleted from database.')
    }
  }
  
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