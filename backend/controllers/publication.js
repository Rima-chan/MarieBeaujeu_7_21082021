const models = require('../models');
const User = require('../models/index').User;
const Publication = require('../models/index').Publication;
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');
const fs = require('fs');


// Toujours même soucis : enregistre l'image même si la publi n'est pas enregistrée dans la BDD
// --> Avec le front empêcher envoie valeur vide mais jamais sur
// AU niveau du back : ajouter un middleware mais question du form-data 
exports.createNewPublication = (req, res) => {
    const content = req.body.title;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/backend/images/${req.file.filename}` : null;
    const userId = parseInt(req.body.userId);

    if (content === '' || imageUrl === null || userId === '') {
        return res.status(400).json({error: 'Missing parameters : '});
    } 
    
    const newPublication = Publication.create({
        UserId: userId, // Je comprends pas pourquoi il y a une MAJ ?
        title: content,
        attachment: imageUrl,
        comments: 0
    })
    .then(newPublication => {
        res.status(201).json({newPublication});
    })
    .catch(err => res.status(500).json({error: 'Cannot create new publication : ' + err}));
}

exports.getOnePublication = (req, res) => {
    const publicationId = parseInt(req.params.id);

    Publication.findOne({where: {id: publicationId}})
        .then(publication => {
            res.status(200).json({publication})
        })
        .catch(err => res.status(404).json({error: 'Cannot find publication'}));
}

exports.updatePublication = (req, res) => {
    const content = req.body.title;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/backend/images/${req.file.filename}` : null;
    const userId = parseInt(req.body.userId);
    const publicationId = parseInt(req.body.publicationId);
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);

    if (userToken.userId === userId) {
        Publication.findOne({where: {id: publicationId}})
            .then(publication => {
                if (userToken.userId != publication.UserId) {
                    return res.status(403).json({error: 'Unauthroized user'});
                } else {
                    if (imageUrl != null) {
                        const filename = publication.attachment.split('/images/')[1];
                            fs.unlink(`images/${filename}`, (error) => {
                                    if (error) throw error;
                            })
                        publication.attachment = imageUrl;
                    }
                    publication.title = (content ? content: publication.title);
                    publication.save();
                    return res.status(200).json({message: 'Publication successfull udpated'});
                }
            })
            .catch(err => res.status(500).json( {error: 'Cannot find publication : ' + err}));
    } else {    
        return res.status(403).json({error: ' Unauthorized request 2 : '});
    }

}

exports.deletePublication = (req, res) => {
    const publicationId = parseInt(req.params.id);
    const headAuthorization = req.headers.authorization;
    const userToken = jwtUtils.getUserToken(headAuthorization);
    
    Publication.findOne({where: {id: publicationId}})
        .then((publication) => {
            if (publication.userId === userToken.userId || userToken.isAdmin) {
                const filename = publication.attachment.split('/images/')[1];
                console.log(filename);
                fs.unlink(`images/${filename}`, (error) => {
                        if (error) throw error;
                });
                Publication.destroy({where: {id: publication.id}})
                    .then( () => res.status(200).json({message: 'Publication successfully deleted'}))
                    .catch( err => res.status(400).json({error: 'Cannot delete publication : ' + err}));
            } else {
                return res.status(403).json({error: 'Unauthorized request'});
            }
        })
        .catch(err => res.status(404).json({error: 'Cannot find publication'}));
}

exports.getAllPublications = (req, res) => {
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
    
    Publication.findAndCountAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        limit: size,
        offset: page * size
    })
    .then(publications => {
        const totalPage = Math.ceil(publications.count / size);
        if (page >= totalPage) {
            return res.status(400).json({error: 'Page to higher'});
        } else {
            res.status(200).json({
                publications: publications.rows,
                totalPages: totalPage
            })
        }
    })
    .catch(err => res.status(404).json({error: 'Publication not found : ' + err}));
}