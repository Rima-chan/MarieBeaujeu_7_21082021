const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');

const commentRoutes = require('./routes/comment');
// const limiter = require('./middleware/limiter');

const app = express();

app.use(limiter);

//CORS Policy
const corsOptions = {
    //To allow requests from client
    origin: [
      "http://localhost:8080",
      "http://localhost:8081",
      "http://127.0.0.1",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };
// app.use(cors({credentials: true, origin: 'http://localhost:8081'}));
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

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