const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUserToken = (authorization) => {
    let userToken = {};
    const token = authorization.split(' ')[1];
    if (token != null) {
        try {
            const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
            if (decodedToken != null) {
                userToken = decodedToken;
            }
        } catch(err) {
            throw new Error('Cannot decode token');
        }
    }
    return userToken;
}