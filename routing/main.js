const express = require('express');
const app = express();
const PORT = 9001;
const db = require('../db/db.json')


app.get('/', (req, res) => {
    res.send('Future Note Taker');
});

app.get('/api/notes', (req, res) => {
    res.json(db);
})

app.listen(PORT, () => console.log(`app is listening on PORT: ${PORT}`));