const { Issuer } = require('openid-client');

let client; 

async function initOIDC() {
  const keycloakIssuer = await Issuer.discover('http://localhost:8080/realms/CybersecurityRealm'); 
  client = new keycloakIssuer.Client({
    client_id: 'api-client',
    client_secret: 'mysecret',
  });
}

function protect() {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const userInfo = await client.userinfo(token); 
      req.user = userInfo; 
      next();
    } catch (error) {
      console.error('Error de autenticación:', error.message);
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
  };
}

module.exports = { initOIDC, protect };
