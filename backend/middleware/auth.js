const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    console.log("id : " + req.body.id);
    console.log("req nody: " + req.body);
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
        const userId = decodedToken.userId;
        const userToCheck = req.body.id;
        if (req.body.id && req.body.id != userId) {
            throw new Error('403: unauthorized request');
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({error: 'Invalid request Auth middleware : ' + error});
    }
}