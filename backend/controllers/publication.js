require('dotenv').config();
const User = require('../models/index').User;
const Publication = require('../models/index').Publication;
const Comment = require('../models/index').Comment;
const fs = require('fs');

exports.createNewPublication = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.imageLink;
    const userId = parseInt(req.body.userId);
    // Check inputs
    if (imageUrl === null || userId === '') {
        return res.status(400).json({error: 'Missing parameters : '});
    } 

    const newPublication = Publication.create({
        UserId: userId, 
        title: title,
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
    const title = req.body.title;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/backend/images/${req.file.filename}` : req.body.imageLink;
    const userId = parseInt(req.body.userId);
    const publicationId = parseInt(req.params.id);
    // Check user access
    const cookie = req.headers.cookie;
    const access_token = cookie.split('=')[1];
    if (!cookie  || !access_token) {
        return res.status(401).json({error: 'Missing token in cookie'});
    }
    const decodedToken = jwt.verify(access_token, process.env.DB_TOKEN);

    if (decodedToken.userId === userId) {
        Publication.findOne({where: {id: publicationId}})
            .then(publication => {
                if (decodedToken.userId != publication.UserId) {
                    return res.status(403).json({error: 'Unauthorized user'});
                } else {
                    if (imageUrl != null) {
                        const filename = publication.attachment.split('/images/')[1];

                        fs.unlink(`images/${filename}`, (error) => {
                            if (error) throw error;
                        });
                    }
                    publication.title = (title ? title: publication.title);
                    publication.save();
                    return res.status(200).json({message: 'Publication successfully updated'});
                }
            })
            .catch(err => res.status(500).json( {error: 'Cannot find publication : ' + err}));
    } else {    
        return res.status(403).json({error: 'Unauthorized user'});
    }

}

exports.deletePublication = (req, res) => {
    const publicationId = parseInt(req.params.id);
    const cookie = req.headers.cookie;
    const access_token = cookie.split('=')[1];
    // Check user access
    if (!cookie  || !access_token) {
        return res.status(401).json({error: 'Missing token in cookie'});
    }
    const decodedToken = jwt.verify(access_token, process.env.DB_TOKEN);
    
    Publication.findOne({where: {id: publicationId}})
        .then((publication) => {
            console.log(publication);
            if (publication.UserId === decodedToken.userId || decodedToken.isAdmin) {
                const filename = publication.attachment.split('/images/')[1];
                if (filename) {
                    fs.unlink(`images/${filename}`, (error) => {
                        if (error) throw error;
                    });
                }
                Publication.destroy({where: {id: publication.id}})
                    .then( () => res.status(200).json({message: 'Publication successfully deleted'}))
                    .catch(err => res.status(400).json({error: 'Cannot delete publication : ' + err}));
            } else {
                return res.status(403).json({error: 'Unauthorized user'});
            }
        })
        .catch(err => res.status(404).json({error: 'Cannot find publication : ' + err}));
}

exports.getAllPublications = (req, res) => {
    // Pagination
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
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['username', 'imageUrl', 'isAdmin']
          },
          {
            model: Comment,
            as: 'Comments',
          }
        ],
        order: [
            ['createdAt', 'DESC'],
        ],
        limit: size,
        offset: page * size
    })
    .then(publications => {
        if(publications.rows.length === 0) {
          return res.status(404).json({error: 'No publications !'});
        }
        const totalPages = Math.ceil(publications.count / size);
        if (page >= totalPages) {
            return res.status(400).json({error: 'Page to higher'}); 
        } else {
            res.status(200).json({
                publications: publications.rows,
                totalPages: totalPages
            })
        }
    })
    .catch(err => res.status(404).json({error: 'Publication not found : ' + err}));
}