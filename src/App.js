const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/index');
const {initOIDC} = require('./keycloak/keycloak');


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Enable CORS
app.use(cors({
    origin: '*',
    credentials: true
}));


initOIDC().then(() => {
    app.use('/api', router);
  
    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  }).catch(err => {
    console.error('Error al inicializar OIDC:', err);
  });