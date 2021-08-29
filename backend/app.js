const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');

const commentRoutes = require('./routes/comment');
// const limiter = require('./middleware/limiter');

const app = express();

//CORS Policy
app.use(cors());

//BordyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());

// app.use(limiter);

// app.use(function (err, req, res, next) {
//     console.log('This is the invalid field ->', err.field)
//     next(err)
// })
// permet de charger les fiichiers qui soont dans le dossier (path.join permet d'avoir la path complet du dossier)
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/users', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/publications', commentRoutes);

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.status(200).send('<h1>Bonjour</h1>');
});

module.exports = app;