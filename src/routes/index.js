const { Router } = require('express');
const router = Router();

const {GetInfo} = require('../controllers/info.controllers');

//GET 
router.get('/GetInfo', GetInfo);

module.exports = router;