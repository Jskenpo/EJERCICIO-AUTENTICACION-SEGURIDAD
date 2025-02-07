const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jwkToPem = require('jwk-to-pem');

const app = express();
app.use(bodyParser.json());

// Define la clave pública directamente como una constante
const publicKeyJwk = {
  kty: 'RSA',  // Tipo de clave (RSA)
  n: 'qISnG_q2pzoCLQH8Zx1O99UL0taee_XiL6e0kk5ahIb2Hey1kKzI2xsN7GPJ-Uzu7DIR3StIsZYCH94pI_AmpExQrNbHXsKlWrTp8NhgrOZjMTE-6EM6h0mXH7tMeiB1gMMO0IvX4KoUfLgQ1knyOmyL8KOtcsMasBoECPxziUtr4its7J-ACBwnL5wDTmsGXbVxJYQ1W98_WFtvCYfm88o5SJAnarUJaY8elPAx8aYzuiHPYbJiMMko5_ACAQtQm4FB0j9WgDLquJ1XWH5mL81dddAnRvCzkQTtS_ZI3DPLu2l5DcWNxV-piETyVegSToEXLEx5xT00RzGOoUhf0w', // Módulo
  e: 'AQAB'  // Exponente público (comúnmente es 'AQAB' que es 65537 en decimal)
};

// Convierte la clave JWK a PEM
const publicKeyPem = jwkToPem(publicKeyJwk);

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  try {
    jwt.verify(token, publicKeyPem, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar el token' });
  }
};

app.get('/public', (req, res) => {
  res.json({ message: 'Esta ruta es pública' });
});

app.get('/private', verifyToken, (req, res) => {
  res.json({ message: 'Acceso autorizado con token válido', user: req.user });
});

app.post('/data', verifyToken, (req, res) => {
  const data = req.body;
  console.log(data);
  res.json({ message: 'Datos recibidos', receivedData: data });
});

app.listen(3000, () => {
  console.log('API REST escuchando en http://localhost:3000');
});
