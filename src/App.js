const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session')
const { keycloak, memoryStore } = require('./keycloak/keycloak.js');

//MemoryStore
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(keycloak.middleware());


// Enable CORS
app.use(cors({
    origin: '*',
    credentials: true
}));


//routes
app.use(require('./routes/index'));


app.listen(3000);
console.log('Server on port: ', 3000);