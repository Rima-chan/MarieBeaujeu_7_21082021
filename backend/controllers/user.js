// Imports
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const User = require('../models/index').User;
const asyncLib = require('async');


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
    const isAdmin = req.body.isAdmin;
    const imageUrl = `${req.protocol}://${req.get('host')}/backend/images/avatar_user.png`;
    console.log('requete !: ' + req.body);

    if (email === '' || username === '' || password === '') {
        return res.status(400).json({'error' : 'Missing parameters'});
    }

    // Check parameters conformity
    if (username.length >= 13 || username.length < 4){
        return res.status(400).json({'error': 'wrong username (must be length 4 - 12)'});
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({'error': 'email is not valid'});
    }

    // if (!PASSWORD_REGEX.test(password)) {
    //     return res.status(400).json({'error': 'password is not valid (must length 4 - 8 and include 1 number at least'});
    // }

    // Check if user Exist 
    // Crypt password
    // Create new user 
    // Return new user Id
    User.findOne({
        attributes: ['email'],
        where:{email: email}
    })
    .then(userFound => {
        if(!userFound) {
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                const newUser = User.create({
                    email: email,
                    userName: username,
                    password: hash,
                    service: service,
                    imageUrl: imageUrl,
                    isAdmin: isAdmin
                })
                .then(newUser => res.status(201).json({'userId': newUser.id}))
                .catch(error => res.status(500).json({'error': 'Cannot add user' +  error}));
            })
        } else {
            return res.status(409).json({'error': 'already existe !'});
        }
    })
    .catch(error => res.status(500).json({'error': 'Cannot verify user ' + error}));


    // asyncLib.waterfall([
    //     function(callback) {
    //         User.findOne({
    //             attributes: ['email'],
    //             where: {email:email}
    //         })
    //         .then(function(userFound) {
    //             console.log('userFound : ');
    //             callback(null, userFound);
    //         })
    //         .catch(function(error) {
    //             return res.status(500).json({'error' : 'Enable to verify User ! Infos : ' + error.stack})
    //         });
    //     }, 
    //     function(userFound, callback) {
    //         if (!userFound) {
    //             bcrypt.hash(password, 10, (err, hash) => {
    //                 callback(null, userFound, hash);
    //             });
    //         } else {
    //             return res.status(409).json({'error' : 'User already exists ! Infos : ' + error});
    //         }
    //     },
    //     function(userFound, hash, callback) {
    //         const newUser = User.create({
    //             email: email,
    //             userName: userName,
    //             password: hash,
    //             service: service,
    //             imageUrl: imageUrl,
    //             isAdmin: isAdmin
    //         })
    //         .then(newUser => {
    //             console.log('NewUser : ' + newUser);
    //             callback(null, newUser);
    //         })
    //         .catch(error => res.status(500).json({'error' : 'Cannot add user ! Infos : ' + error})); // C'est ici que ça sort une erreur 
    //     }
    // ], function(err, newUser) {
    //     if(newUser) {
    //         return res.status(201).json({'user': newUser});
    //     } else {
    //         return res.status(400).json({'error' : 'Cannot add user ! Infos : ' + err});
    //     }
    // });

}

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email === '' || password === ''){
        return res.status(400).json({'error': 'missing parameters'});
    }

    User.findOne({where:{email: email}})
        .then(userFound => {
            bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt){
                if (resBcrypt) {
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': jwt.sign({
                            userId: userFound._id,
                            isAdmin: userFound.isAdmin,
                            },
                            process.env.DB_TOKEN,
                            {expiresIn: '8h'}
                        )
                    });
                } else {
                    return res.status(403).json({'error': 'Invalid password : ' + errBcrypt});
                }
            });
        })
        .catch(error => res.status(500).json({error: 'Cannot find user : ' + error}));

}

exports.deleteUser = (req, res) => {
    // Est-ce qu'on ne devrait pas mieux "cacher" l'id ?
    const 
}