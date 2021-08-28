const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1h window ?
    max: 5,
    message:
        "Too many accounts created from this IP, please try again after an hour"
});

// Voir si on peut pas mettre interval progressifs entre chaque connexion ?
const connexionAccountLimiter = rateLimit({
    windowMs: 30000,
    max: 10,
    message: 
        "Too many connexion attempts, please try again after 30s"
});

module.exports = createAccountLimiter;
module.exports = connexionAccountLimiter;