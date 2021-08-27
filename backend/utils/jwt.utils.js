const jwt = require('jsonwebtoken');
require('dotenv').config();

// const getUserToken = (authorization) => {
//     let userToken = {};
//     const token = authorization.split(' ')[1];
//     if (token != null) {
//         try {
//             const decodedToken = jwt.verify(token, process.env.BD_TOKEN);
//             if (decodedToken != null) {
//                 userToken = decodedToken;
//             }
//         } catch(err) {
//             throw new Error('Cannot decode token');
//         }
//     }
//     console.log(userToken);
//     return userToken;
// }

// module.exports = getUserToken;

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

