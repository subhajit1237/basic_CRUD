const express =require('express');
const route =express.Router();
const appController =require('../controllers/app.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./public/uploads');
        console.log(file, 'file');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+ '-' + Date.now() + '-' + 'img' + path.extname(file.originalname));
    }
});

const max_size = 1024*1024;

const upload = multer ({
    storage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/svg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('only jpg, png, jpeg, svg files allowed'))
        }
    },
    limits: max_size
})

route.get('/', appController.list);
route.get('/add', appController.create);
route.post('/insert', upload.single('image'), appController.insert);
// route.get('/delete/:id', appController.hardDelete);
route.get('/delete/:id', appController.softDelete);
route.get('/edit/:id', appController.edit);
route.post('/update', appController.update);
route.get('/statusChange/:id',appController.statusChange);

module.exports =route;