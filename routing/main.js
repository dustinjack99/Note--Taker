const express = require('express');
const app = express();
const PORT = 9001;
const db = require('../db/db.json');
const path = require('path');
const fs = require('fs');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  console.log(newNote);
//   console.log(res.json(db));
//   fs.writeFile('../db/db.json', db);

})

app.get('/api/notes', (req, res) => {
  res.json(db);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

app.listen(PORT, () => console.log(`app is listening on PORT: ${PORT}`));

