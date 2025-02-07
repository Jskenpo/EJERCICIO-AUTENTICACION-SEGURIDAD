const { Router } = require('express');
const router = Router();

const {GetPublic, GetPrivate, POSTJson} = require('../controllers/index.controllers');

//GET 
router.get('/public', GetPublic);
router.get('/private', GetPrivate);

//POST
router.post('/data', POSTJson);

module.exports = router;