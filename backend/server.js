
const http = require('http');
require('dotenv').config();
const app = require('./app');

const server = http.createServer(app);

const port = process.env.DB_PORT || 8080;


server.listen(port, () => {
    console.log('Listening on port : ' + port);
});