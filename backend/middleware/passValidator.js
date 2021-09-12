
const passwordValidator = require('password-validator');

let schema = new passwordValidator();

// Add sth to avoid script characters ?
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['mdp123']); // Blacklist these values

module.exports = (req, res, next) => {
    if (!schema.validate(req.body.password)) {
        res.status(401).json({error: 'Mot de passe faible !'}); // More details ?
    } else {
        next();
    }
}