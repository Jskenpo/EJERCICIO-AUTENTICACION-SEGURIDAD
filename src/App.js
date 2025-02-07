require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Enable CORS
app.use(cors({
    origin: '*',
    credentials: true
}));


//routes
app.use(require('./routes/index'));


app.listen(process.env.PORT);
console.log('Server on port: ', process.env.PORT);