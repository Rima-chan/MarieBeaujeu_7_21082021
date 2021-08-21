const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

//CORS Policy
app.use(cors());

//Replace BordyParser
app.use(express.json());

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.status(200).send('<h1>Bonjour</h1>');
})

module.exports = app;