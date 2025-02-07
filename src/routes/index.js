const { Router } = require('express');
const router = Router();
const { GetPublic, GetPrivate, POSTJson } = require('../controllers/index.controllers');
const { protect } = require('../keycloak/keycloak');

// Rutas públicas
router.get('/public', GetPublic);

// Rutas protegidas
router.get('/private', protect(), GetPrivate);
router.post('/data', protect(), POSTJson);

module.exports = router;
