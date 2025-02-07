const express = require('express');
const bodyParser = require('body-parser');
const verifyToken = require('./verifyToken');

const app = express();
app.use(bodyParser.json());

app.get('/public', (req, res) => {
    res.json({message: 'Este es un endpoint público. ?'});
});

app.get('/private', verifyToken, (req, res) => {  // Protected
    res.json({message: 'Acceso autorizado con token válido', user: req.user});
});

app.post('/data', verifyToken, (req, res) => {  // Protected
    const data = req.body;
    console.log(data);
    res.json({message: 'Datos recibidos', receivedData: data});
});

app.listen(3000, () => {
    console.log('API escuchando puerto 3000');
});