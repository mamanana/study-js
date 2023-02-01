const express = require('express');
const path = require('path');

const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, '/assets')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/pacman', function(req, res) {
    res.sendFile(path.join(__dirname, '/pacman.html'));
});

app.get('/pokemon', function(req, res) {
    res.sendFile(path.join(__dirname, '/pokemon.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));