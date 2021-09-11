const models = require('../models');
const User = require('../models/index').User;
const Publication = require('../models/index').Publication;
const Comment = require('../models/index').Comment;
const jwtUtils = require('../utils/jwt.utils');
const jwt = require('jsonwebtoken');
const asyncLib = require('async');
const fs = require('fs');

exports.createNewComment = (req, res) => {
    const publicationId = parseInt(req.params.publicationId);
    const content = req.body.content;
    if (content === '' || !publicationId) {
        return res.status(400).json({error: 'Missing parameters'});
    }
    Publication.findOne({where: {id: publicationId}})
        .then(publicationFound => {
            Comment.create({
                UserId: req.user.id,
                PublicationId: publicationFound.id,
                content: content
            }, {
                include: [{
                    model: User,
                    attributes: ['username', 'imageUrl', 'isAdmin']
                }]
            })
            .then(newComment => {
                publicationFound.comments ++;
                publicationFound.save();
                return res.status(201).json({newComment});
            })
            .catch(err => res.status(400).json({error: 'Cannot create comment : ' + err}));
        })
        .catch(err => res.status(404).json({error: 'Publication not found : ' + err}))
}

exports.getOneComment = (req,res) => {
    const commentId = req.params.commentId;
    Comment.findOne({
            where: {id: commentId},
            include: [{
                model: User,
                attributes: ['username', 'imageUrl', 'isAdmin']
            }]
        })
        .then(commentFound => res.status(200).json(commentFound))
        .catch(err => res.status(404).json({error: 'User not find : ' + err}));
}

exports.updateComment = (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const publicationId = parseInt(req.params.publicationId);
    const newContent = req.body.content;
    // const headAuthorization = req.headers.authorization;
    // const userToken = jwtUtils.getUserToken(headAuthorization);

    const cookie = req.headers.cookie;
    const access_token = cookie.split('=')[1];
    if (!cookie  || !access_token) {
        return res.status(401).json({error: 'Missing token in cookie'});
    }
    const decodedToken = jwt.verify(access_token, process.env.DB_TOKEN);

    Comment.findOne({where: {id: commentId}})
        .then(commentFound => {
            if(commentFound.UserId != decodedToken.userId) {
                return res.status(401).json({error: 'Unauthorized request'});
            }
            commentFound.update({
                content: newContent ? newContent : commentFound.content
            })
            .then(newComment => {
                res.status(200).json({commentFound});
            })
            .catch(err => res.status(400).json({error: 'Cannot update Comment : ' + err}))
        })
        .catch(err => res.status(404).json({error: 'Comment not found : ' + err}));
}

exports.deleteOneComment = (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const publicationId = parseInt(req.params.publicationId);
    // const headAuthorization = req.headers.authorization;
    // const userToken = jwtUtils.getUserToken(headAuthorization);
    const cookie = req.headers.cookie;
    const access_token = cookie.split('=')[1];
    if (!cookie  || !access_token) {
        return res.status(401).json({error: 'Missing token in cookie'});
    }
    const decodedToken = jwt.verify(access_token, process.env.DB_TOKEN);

    Comment.findOne({where: {id: commentId}})
        .then(commentFound => {
            if (decodedToken.userId === commentFound.UserId || decodedToken.isAdmin) {
                Publication.findOne({where: {id: publicationId}})
                    .then(publicationFound => {
                        publicationFound.comments--;
                        publicationFound.save();
                        Comment.destroy({where: {id: commentId}});    
                        return res.status(200).json({message: 'Comment succcessfully deleted'});
                    })
                    .catch(err => res.status(404).json({error: 'Cannot find publication'}));
            } else {
                return res.status(401).json({error: 'Unauthorized request'});
            }
        })
        .catch(err => res.status(404).json({error: 'Cannot find comment : ' + err}));
}

exports.getAllComments = (req, res) => {
    const sizeAsNumber = parseInt(req.query.size);
    const publicationId = parseInt(req.params.publicationId);

    let size = 10;
    if(!isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
        size = sizeAsNumber;
    }
    
    Comment.findAndCountAll({
        include: [{
            model: User,
            attributes: ['username', 'imageUrl', 'isAdmin']
        }],
        where: {publicationId: publicationId},
        order: [
            ['createdAt', 'ASC'],
        ],
        limit: size
    })
    .then(comments => {
        if (comments.rows.length === 0) {
            return res.status(204).json({message: 'There are no comments'});
        } else {
            res.status(200).json({
                comments: comments.rows
            });
        }
    })
    .catch(err => res.status(400).json({error: 'Bad request ' + err}));
}