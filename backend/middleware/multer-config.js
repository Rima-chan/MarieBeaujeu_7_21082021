const multer = require('multer');

const storage = multer.diskStorage({
    destination:  (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        console.log('File multer : ');
        console.log(file);
        const name = file.originalname.split(' ').join('_');
        callback(null, Date.now() + "--" + name);
    }
});

const fileFilter = (req, res, callback) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('jpg') || (file.mimetype).includes('png') || (file.mimetype).includes('gif')) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

module.exports = multer({storage: storage}).single('imageUrl');