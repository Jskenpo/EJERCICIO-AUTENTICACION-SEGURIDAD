const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore }, {
  clientId: 'api-client',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080',
  realm: 'CybersecurityRealm',
  credentials: {
    secret: 'mysecret'
  }
});

module.exports = { keycloak, memoryStore };