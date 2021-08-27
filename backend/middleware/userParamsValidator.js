const User = require('../models/index').User;
const multer = require('multer');
const upload = multer({dest: 'images/'});

module.exports = async (req, res, next) => {
    upload.single('imageUrl');
    console.log("req.body");
    console.log(req.body);
    console.log("TEST : ");
    console.log(req.files);
    console.log(JSON.stringify(req.files));
    const username = req.files;
    if(username) {
        try {
            // const usernameAlreadyExist = await User.findOne({where: {userName: username}});
            // console.log("Username : " + usernameAlreadyExist);
            // return res.status(406).json({message: "Username already Taken"});
        } catch (error) { 
            console.log("error : " + error);
        }
        if (username.length >= 13 || username.length < 4) {
            return res.status(400).json({'error': 'wrong username (must be length 4 - 12)'});
        }
    } else {
        next();
    }
}