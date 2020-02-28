const express = require("express");
const app = express();
const PORT = 9002;
const db = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const uuid = require('uuid');

///LOOK INTO UUID TO ENRICH THE DATABASE WITH UNIQUE ID
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));

app.post("/api/notes/", (req, res) => {
  const noted = req.body;
  noted.id = uuid.v4();
  console.log(noted);
  db.push(noted);
  res.send(db);
  fs.writeFile("../db/db.json", JSON.stringify(db), err => {
    if (err) throw err;
    console.log("New Note saved to database!");
  });
});

app.delete('/api/notes/:id', (req, res) => {
  let deleteId = req.params.id; //Get the id through req.params.id of the object you are going to delete
  let deleteObj = userJson.find(user => user.id == deleteId); // As you have only Id of the object, we want to get the entire object from the array. find() will fetch the object from the array whose id is equal to deleteId and assign it to deleteObj.
  let deleteIndex = userJson.indexOf(deleteObj); //Find the index of the object fetched from the JSON array.
  userJson.splice(deleteIndex, 1); // Splice/ remove the object from the JSON Array.
  res.send(deleteObj); // Send the deleted object as response.
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

