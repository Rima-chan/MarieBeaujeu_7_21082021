const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUserToken = (authorization) => {
    let userToken = {};
    const token = authorization.split(' ')[1];
    console.log(token);
    if (token != null) {
        try {
            const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
            if (decodedToken != null) {
                userToken = decodedToken;
                console.log(userToken);
            }
        } catch(err) {
            throw new Error('Cannot decode token');
        }
    }
    return userToken;
}
