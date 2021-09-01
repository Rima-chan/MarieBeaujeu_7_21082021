const models = require('../models');
const User = require('../models/index').User;
const Publication = require('../models/index').Publication;
const Comment = require('../models/index').Comment;
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');
const fs = require('fs');

exports.createNewComment = (req, res) => {
    const publicationId = parseInt(req.params.publicationId);
    const content = req.body.content;
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);
    
    if (content === '' || !publicationId) {
        return res.status(400).json({error: 'Missing parameters'});
    } 

    Publication.findOne({where: {id: publicationId}})
        .then(publicationFound => {
            Comment.create({
                UserId: userToken.userId,
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
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);

    Comment.findOne({where: {id: commentId}})
        .then(commentFound => {
            if(commentFound.UserId != userToken.userId) {
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
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);
    Comment.findOne({where: {id: commentId}})
        .then(commentFound => {
            if (userToken.userId === commentFound.UserId || userToken.isAdmin) {
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
        where: {publicationId: publicationId},
        includes: [{
            model: User,
            attributes: ['username', 'imageUrl', 'isAdmin']
        }],
        order: [
            ['createdAt', 'ASC'],
        ],
        limit: size
    })
    .then(comments => {
        res.status(200).json({comments});
    })
    .catch(err => res.status(400).json({error: 'There are no comments for this publication : ' + err}));
}