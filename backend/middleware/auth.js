const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/index').User;

module.exports = async (req, res, next) => {
    try {
        const headers = req.headers;
        const cookie = req.headers.cookie;
        const access_token = cookie.split('=')[1];
        // JWT store in cookie header
        // XSRF token from Login function store in localStorage (part of JWT payload)
        if (!cookie  || !access_token) {
            return res.status(401).json({error: 'Missing token in cookie'});
        }
        if (!headers || !headers['x-xsrf-token']) {
            return res.status(401).json({error: 'Missing XSRF token in headers'});
        }
        const xsrfToken = headers['x-xsrf-token'];
        const decodedToken = jwt.verify(access_token, process.env.DB_TOKEN);
        if (xsrfToken !== decodedToken.xsrfToken) {
            return res.status(401).json({error: 'Bad XSRF token'});
        }
        const userId = decodedToken.userId;
        const user = await User.findOne({ where: {id: userId}});
        if (!user) {
          return res.status(401).json({error: 'User not exists'});
        } else {
            req.user = user;
            next();
        }
    } catch(error) {
        res.status(500).json({error: 'Internal error : ' + error});
    }
}