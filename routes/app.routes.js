const router = require('express').Router();
const appController = require('../controllers/app.controller');

router.get('/',appController.list);
router.get('/add',appController.create);
router.post('/insert',appController.insert);

module.exports = router;