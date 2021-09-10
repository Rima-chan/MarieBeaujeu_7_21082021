
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/index').User;
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');

// Constants 
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const SALT_ROUNDS = 10;

// Functions  
exports.signup = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const service = req.body.service;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/avatar_user.png`;

    if (email === '' || username === '' || password === '') {
        return res.status(400).json({'error' : 'Missing parameters'});
    }

    // Check parameters conformity
    if (username.length >= 13 || username.length < 3){
        return res.status(400).json({'error': 'Le pseudo doit avoir entre 3 et 12 charactères'});
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({'error': 'email is not valid'});
    }

    asyncLib.waterfall([
        // Check if email already exist in database
        function(done) {
            User.findOne({where: {email:email}})
            .then(userFound => {
                done(null, userFound);
            })
            .catch(err => res.status(500).json({error: 'Cannot verify user : ' + err}));
        },
        // Crypt password if user doesn't exist
        function(userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                    done(null, userFound, hash);
                })
            } else {
                return res.status(409).json({error: 'L\'email est déjà utilisé !'});
            }
        },
        // Create user in database 
        function(userFound, hash, done) {
            User.create({
                email: email,
                username: username,
                password: hash,
                service: service,
                imageUrl: imageUrl,
                isAdmin: false,
            })
            .then(newUser => {
                done(newUser);
            })
            .catch(err => res.status(500).json({'error': 'Cannot add user :' +  err}));
        }
        // Return new user Id if integration was successfull
    ], function (newUser) {
        if(newUser) {
            return res.status(201).json({'userId': newUser.id});
        } else {
            return res.status(500).json({'error': 'Cannot add user'});
        }
    });
}

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email === '' || password === ''){
        return res.status(400).json({error: 'missing parameters'});
    }

    asyncLib.waterfall([
        // Find user in DB
        function(done) {
            User.findOne({
                attributes: ['id', 'email', 'password', 'isAdmin', 'imageUrl'],
                where: {email:email}
            })
            .then(userFound => {
                done(null, userFound);
            })
            .catch(err => res.status(500).json({error: 'Cannot find user : ' + err}));
        },
        // Check if user exist and compare password
        function(userFound, done) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt) {
                    done(null, userFound, resBcrypt);
                })
            } else {
                return res.status(404).json({error: 'L\'email n\'existe pas'});
            }
        },
        // Check password match
        function(userFound, resBcrypt, done) {
            if (resBcrypt) {
                done(userFound);
            } else {
                return res.status(403).json({error: 'Le Mot de passe est incorrrect'});
            }
        }
        // Returns login infos 
    ], function(userFound) {
        if (!userFound) {
            return res.status(500).json({error: 'Cannot log user'});
        }
        const xsrfToken = crypto.randomBytes(64).toString('hex');
        const accessToken = jwt.sign({
            userId: userFound.id,
            isAdmin: userFound.isAdmin,
            xsrfToken: xsrfToken,
            },
            process.env.DB_TOKEN,
            {expiresIn: '8h'}
        );
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 10800000,
            // "Secure: true" with https for production
        });
        return res.status(200).json({
            'userId': userFound.id,
            'isAdmin': userFound.isAdmin,
            'imageUrl': userFound.imageUrl,
            xsrfToken,
            accessTokenExpiresIn: '8h',
        });
    });
}

exports.getOneUser = (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({error: 'Invalid parameters'});
    }
    User.findOne({
        attributes: ['id', 'username', 'service', 'imageUrl'],
        where: {id: userId}
    })
        .then(userFound => {
                if (!userFound) {
                    return res.status(404).json({error: 'User not found'});
                } else {
                    return res.status(200).json(userFound);
                }
        })
        .catch(err => res.status(404).json({error: 'User not found : ' + err}));
}

exports.updateProfilInfos = (req, res) => {
    const userId = parseInt(req.body.userId);
    const username = req.body.username;
    const service = req.body.service;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/backend/images/${req.file.filename}` : null;
    
    // To check if correct user
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);

    if (userId === userToken.userId) {
        User.findOne({where: {id: userToken.userId}})
            .then(userFound => {
                if (imageUrl != null) {
                    const filename = userFound.imageUrl.split('/images/')[1];
                    if (!filename.includes('avatar')) {
                        fs.unlink(`images/${filename}`, (error) => {
                            if (error) throw error;
                        })
                    }
                    userFound.imageUrl = imageUrl;
                }
                userFound.userName = (username ? username: userFound.userName);
                userFound.service = (service ? service: userFound.service);
                userFound.save();
                return res.status(200).json({'message' : 'Profil successfully updated'});
            })
            .catch(err => res.status(404).json({error: 'User not found : ' + err}));
    } else {
        return res.status(401).json({error: 'Unauthorized request'});
    }
}
 
// Est-ce qu'on envoie l'id dans le body ? Ou celui du token suffit ?
// Si Admin l'id sera différent et le middleware d'auth va stopper le process

exports.deleteUser = (req, res) => {
    const userIdToDelete = req.params.id;
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);
    console.log(userToken);
    console.log(userToken.iat);
    User.findOne({where: {id: userIdToDelete}})
        .then(userFound => {
            if (userFound.id === userToken.userId || userToken.isAdmin) {
                const filename = userFound.imageUrl.split('/images/')[1];
                    if (!filename.includes('avatar')) {
                        fs.unlink(`images/${filename}`, (error) => {
                            if (error) throw error;
                        })
                    }
                User.destroy({
                    where: {id: userIdToDelete},
                    // force: true // A enlever pour la production car permet de garder en mémoire les users
                })
                    .then(() => res.status(200).json({message: 'User deleted'}))
                    .catch(err => res.status(400).json({error: 'Cannot delet user : ' + err}));
            } else {
                return res.status(401).json({error: 'Unauthorized request'});
            }
        })
        .catch(err => res.status(404).json({error: 'User not exists in DB ' + err}));
}

exports.getAllUsers = (req, res) => {
    const pageAsNumber = parseInt(req.query.page);
    const sizeAsNumber = parseInt(req.query.size);

    let page = 0;
    if(!isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }

    let size = 5;
    if(!isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 5) {
        size = sizeAsNumber;
    }
    
    User.findAndCountAll({
        attributes: ['id', 'username', 'service', 'imageUrl'],
        limit: size,
        offset: page * size
    })
    .then(users => {
        const totalPage = Math.ceil(users.count / size);
        if (page >= totalPage) {
            return res.status(400).json({error: 'Page to higher'});
        } else {
            return res.status(200).json({
                users: users.rows,
                totalPages: totalPage
            });
        }
    })
    .catch(err => res.status(404).json({error: 'Users not found : ' + err}));
 }