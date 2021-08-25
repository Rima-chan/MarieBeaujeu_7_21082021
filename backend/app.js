const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const limiter = require('./middleware/limiter');

const app = express();

//CORS Policy
app.use(cors());

//BordyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(limiter);
app.use('/api/users', userRoutes); 

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.status(200).send('<h1>Bonjour</h1>');
});

module.exports = app;