// Imports
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
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
                            userId: userFound.id,
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

exports.getOneUser = (req, res) => {
    const userId = req.params.id;
    User.findOne({where: {id: userId}})
        .then(userFound => res.status(200).json(userFound))
        .catch(error => res.status(404).json({error: 'User not find : ' + error}));
}

exports.updateProfilInfos = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userId = parseInt(req.body.id);
    const username = req.body.username;
    const service = req.body.service;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/backend/images/${req.file.filename}` : null;
    console.log("req.file dans controller");
    console.log(req.file);
    console.log("req.body dans controller");
    console.log(req.body);
    // To check if correct user
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);

    // Gérer avec les promesses pour exdecuter que si à trouvé ?
    // const usernameAlreadyExist = await User.findOne({where: {userName: username}});
    // // const emailAlreadyExist = await User.findOne({where: {email: email}});
    // console.log("check : " + usernameAlreadyExist);

    // if (emailAlreadyExist != null) {
    //     return res.status(400).json({error: 'Email already taken'});
    // }

    // if (!EMAIL_REGEX.test(email)) {
    //     return res.status(400).json({'error': 'email is not valid'});
    // }

    // if (usernameAlreadyExist != null) {
    //     return res.status(400).json({error: 'Username already taken please choose another one'});
    // } 
    // if (username && (username.length >= 13 || username.length < 4)){
    //     return res.status(400).json({'error': 'wrong username (must be length 4 - 12)'});
    // } 
        if (userId === userToken.userId) {
            User.findOne({where: {id: userToken.userId}})
                .then(userFound => {
                    if (imageUrl != null) {
                        const filename = userFound.imageUrl.split('/images/')[1];
                        if (!filename.includes('avatar')) {
                            console.log('filename : ' + filename);
                            fs.unlink(`images/${filename}`, (error) => {
                                if (error) throw error;
                            })
                        }
                        userFound.imageUrl = imageUrl;
                    }
                    userFound.userName = (username ? username: userFound.userName);
                    userFound.service = (service ? service: userFound.service);
                    userFound.email = (email ? email: userFound.email);
                    userFound.save();
                    res.status(200).json({'message' : 'Profil successfully updated'});
                })
                .catch(error => res.status(403).json({error: 'unauthrozied requete'}));
        } else {
            return res.status(403).json({error: 'unauthrozied requete'});
        }
}

// if (password === '') {
//     User.findOne({where: {id:userToken.userId}})
//         .then(userFound => {
//             userFound.email = (email ? email: userGound.email);
//             userFound.userName = (username ? username: userFound.userName);
//             userFound.service =(service ? service: userFound.service);
//             console.log(userFound);
//             return res.status(200).json({'message': 'Ok'})
//         })
//         .catch(error => res.status(404).json({error: 'User not found : ' + error}));
// }

// exports.updateProfil = async (req,res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     const userId = parseInt(req.params.id);
//     const username = req.body.username;
//     const service = req.body.service;
//     // console.log("req body : " + req.body);
//     // console.log("req file : " + req.file);
//     // const imageUrl = req.body && req.file ? `${req.protocol}://${req.get('host')}/backend/images${req.file.filename}` : null;
    
//     console.log("email : " + email);
//     // User infos that make the request

//     // try {
//     //     const usernameAlreadyExist = await User.findOne({where: {username: username}});
//     //     const emailAlreadyExist = await User.findOne({where: {email: email}});
//     //     console.log(usernameAlreadyExist);
//     //     console.log(emailAlreadyExist);
//     //     if (usernameAlreadyExist) {
//     //         return res.status(400).json({error: 'Username already taken'});
//     //     }
//     //     if (emailAlreadyExist) {
//     //         return res.status(400).json({error: 'Email already taken'});
//     //     }
//     // } catch (error) {
//     //     console.log("Erreur : " + error);
//     // }
//     // If user wants to change email or pseudo : must check that arn't used
    
//     const headAuthorization = req.headers.authorization;
//     const userToken = jwtUtils.getUserToken(headAuthorization);
//     console.log('user id from token : ' + userToken.userId);
//     console.log('id from param : ' + userId);
//     console.log("pass : " + password);

//     if (userToken.userId === userId) {
//         if (password != '') {
//             bcrypt.hash(password, SALT_ROUNDS, function(errBcrypt, resBcrypt) {
//                 User.findOne({where: {id: userId}})
//                     .then(userFound => {
//                         userFound.update({
//                             email: (email ? email : userFound.email),
//                             password: resBcrypt,
//                             username: (username ? username : userFound.userName),
//                             service: (service ? service : userFound.service),
//                             imageUrl: (imageUrl ? imageUrl : userFound.imageUrl)
//                         })
//                     })
//                     .catch(error => res.status(500).json({error: 'Cannot find user : ' + error}))
//             });
//         } else if (password === '') {
//             User.findOne({where: {id: userId}})
//                 .then(userFound => {
//                     userFound.update({
//                         email: (email ? email : userFound.email),
//                         password: userFound.password,
//                         username: (username ? username : userFound.userName),
//                         service: (service ? service : userFound.service),
//                         imageUrl: (imageUrl ? imageUrl : userFound.imageUrl)
//                     })
//                 })
//                 .catch(error => res.status(500).json({error: 'Cannot find user : ' + error}))
//         }
//     } else {
//         return res.status(403).json({error: 'Unauthorized request'});
//     }
// }

// Dans tous les cas le middleware check si l'user qui envoie la requête à le bon ID (mais obligé d'entrer un Id dans le body)
// Obligé de savoir si l'user est admin ou pas --> meilleur de passer par token/header ou par infos dans la requete ? 
exports.deleteUser = (req, res) => {
    // On récupère l'id des paramètres de la page profil qui doit être supprimée
    // On récupère également les infos du Token envoyé par le header (soit par celui qui fait la requête)
    // On cherche l'user dont l'id correspond à celui de la page profile
        // Si on le trouve 
            // On vérifie que l'id de l'user trouvé correspond à celui qui a envoyé la requête OU qu'il soit admin
            // On supprime le user
        // Sinon Renvoi erreur serveur - user pas trouvable
    const userIdToDelete = req.params.id;
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);
    User.findOne({where: {id: userIdToDelete}})
        .then(userFound => {
            // Soit j'envoie via le front info is Admin mais surement pas secure ?
            // Soit je trouve isAdmin via le token passé dans les headers ?
            // Pas redondant avec le middleware auth au niveau du check de l'id ?
            if (userFound.id === userToken.userId || userToken.isAdmin === true) {
                User.destroy({
                    where: {id: userIdToDelete},
                    // force: true // A enlever pour la production car permet de garder en mémoire les users
                })
                .then(() => res.status(200).json({message: 'User deleted'}))
                .catch(error => res.status(400).json({error: 'Cannot delet user : ' + error}));
            } else {
                return res.status(401).json({error: 'Unthaurized user'});
            }
        })
        .catch(error => res.status(500).json({error: 'Cannot find user : ' + error}));
}

exports.getAllUsers = (req, res) => {
    User.findAll({where: {deletedAt: null}})
     .then(users => {
         res.status(200).json(users)
     })
     .catch(error => res.status(404).json({error: 'Cannot find users : ' + error}));
 }