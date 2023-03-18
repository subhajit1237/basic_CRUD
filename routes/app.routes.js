const express =require('express');
const route =express.Router();
const appController =require('../controllers/app.controller');


route.get('/', appController.list);
route.get('/add', appController.create);
route.post('/insert', appController.insert);
// route.get('/delete/:id', appController.hardDelete);
route.get('/delete/:id', appController.softDelete);
route.get('/edit/:id', appController.edit);
route.post('/update', appController.update);

module.exports =route;