const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const User = require('../models/index').User;

const asyncLib = require('async');

exports.signup = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;
    const service = req.body.service;
    const isAdmin = req.body.isAdmin;
    console.log('OK');
    console.log(req.body);

    if (email === null || userName === null || password === null) {
        return res.status(400).json({'error' : 'Missing parameters'});
    }

    // TODO VERIFY parameters    

    asyncLib.waterfall([
        function(callback) {
            User.findOne({
                attributes: ['email'],
                where: {email:email}
            })
            .then(userFound => {
                console.log('userFound' + userFound);
                callback(null, userFound);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({'error' : 'Enable to verify User ! Infos : ' + error})
            });
        }, 
        function(userFound, callback) {
            if (!userFound) {
                bcrypt.hash(password, 10, (err, hash) => {
                    callback(null, userFound, hash);
                });
            } else {
                return res.status(409).json({'error' : 'User already exists ! Infos : ' + error});
            }
        },
        function(userFound, hash, callback) {
            const newUser = models.User.create({
                email:email,
                userName: userName,
                password: hash,
                service: service,
                imageUrl: `${req.protocol}://${req.get('host')}/images/avatar_user.png`,
                isAdmin: isAdmin
            })
            .then(newUser => {
                console.log(newUser);
                callback(null, newUser);
            })
            .catch(error => res.status(500).json({'error' : 'Cannot add user ! Infos : ' + error}));
        }
    ], function(newUser) {
        if(newUser) {
            return res.status(201).json({'user': newUser});
        } else {
            return res.status(500).json({'error' : 'Cannot add user ! Infos : ' + error});
        }
    });

}

exports.test = (req,res) => {
    res.status(200).json({'message' :'OK'});
}