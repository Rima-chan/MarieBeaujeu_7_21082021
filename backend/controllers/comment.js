const models = require('../models');
const User = require('../models/index').User;
const Publication = require('../models/index').Publication;
const Comment = require('../models/index').Comment;
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');
const fs = require('fs');

exports.createNewComment = (req, res) => {
    const publicationId = parseInt(req.params.publicationId);
    console.log(publicationId);
    const content = req.body.content;
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);
    
    if (content === '' || !publicationId) {
        return res.status(400).json({error: 'Missing parameters : '});
    } 

    Publication.findOne({where: {id: publicationId}})
        .then(publicationFound => {
            const newComment = Comment.create({
                UserId: userToken.userId,
                PublicationId: publicationFound.id,
                content: content
            })
            .then(newComment => {
                console.log(newComment);
                return res.status(201).json({
                    message: newComment,
                    autre: newComment.id,
                });
            })
            .catch(err => res.status(400).json({error: 'Cannot create comment : ' + err}));
        })
        .catch(err => res.status(404).json({error: 'Publication not found : ' + err}))
}

exports.updateComment = (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const publicationId = parseInt(req.params.publicationId);
    const newContent = req.body.content;
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);

    Comment.findOne({where: {id: commentId}})
        .then(commentFound => {
            if(commentFound.userId != userToken.userId) {
                return res.status(403).json({error: 'Unauthorized user'});
            }
            commentFound.update({
                content: newContent ? newContent : commentFound.content
            })
            .then(newComment => {
                res.status(200).json({commentFound});
            })
            .catch(err => res.status(400).json({error: 'Cannot update Comment : ' + err}))
        })
        .catch(err => res.status(404).json({error: 'Comment not found'}));
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