const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
        const userId = decodedToken.indexOf;
        const isAdmin = decodedToken.isAdmin;
        const userToCheck = req.body;

        if (userToCheck.id && userToCheck.id != userId) {
            throw new Error('403: unauthorized request');
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({error: 'Invalid request : ' + error});
    }
}