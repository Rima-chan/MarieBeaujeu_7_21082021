const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const User = require('../models/index').User;

const asyncLib = require('async');

exports.signup = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.username;
    const service = req.body.service;
    const isAdmin = req.body.isAdmin;
    const imageUrl = `${req.protocol}://${req.get('host')}/backend/images/avatar_user.png`;
    console.log('requete !: ' + req.body);

    if (email === '' || userName === '' || password === '') {
        return res.status(400).json({'error' : 'Missing parameters'});
    }

    // TODO VERIFY parameters    
    User.findOne({
        attributes: ['email'],
        where:{email: email}
    })
    .then(userFound => {
        if(!userFound) {
            bcrypt.hash(password, 10, (err, hash) => {
                const newUser = User.create({
                    email: email,
                    userName: userName,
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

exports.test = (req,res) => {
    res.status(200).json({'message' :'OK'});
}