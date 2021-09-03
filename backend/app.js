const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');

const commentRoutes = require('./routes/comment');
// const limiter = require('./middleware/limiter');

const app = express();

// app.use(limiter);

//CORS Policy
app.use(cors());
app.use(helmet());

//BordyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());

// permet de charger les fiichiers qui soont dans le dossier (path.join permet d'avoir la path complet du dossier)
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/users', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/publications', commentRoutes);

module.exports = app;