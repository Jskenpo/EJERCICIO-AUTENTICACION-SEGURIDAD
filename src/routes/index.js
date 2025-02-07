const { Router } = require('express');
const router = Router();
const { keycloak } = require('../keycloak/keycloak.js');


const {GetPublic, GetPrivate, POSTJson} = require('../controllers/index.controllers');

//GET 
router.get('/public', GetPublic);
router.get('/private', keycloak.protect(), GetPrivate);

//POST
router.post('/data', keycloak.protect(), POSTJson);

module.exports = router;