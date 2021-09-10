const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/index').User;

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
        const userId = decodedToken.userId;
        const userToCheck = req.body.userId;
        const user = await User.findOne({ where: {id: userId}});
        console.log(user);
        if (!user) {
          return res.status(401).json({error: 'User not exists'});
        }
        if (req.body.userId && req.body.userId != userId) {
            throw new Error('403: unauthorized request');
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({error: 'Invalid request Auth middleware : ' + error});
    }
}