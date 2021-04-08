const express = require('express');
const path = require('path');
require('dotenv').config();


//DB
const { dbConnection } = require('./database/config');
dbConnection();

//app express
const app = express();

//lectura y parseo del body
app.use(express.json());

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');


//carpeta publica
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Rutas
app.use('/api/login', require('./routes/auth'));



server.listen(process.env.PORT, (error) => {
    if(error) throw new Error(error);

    console.log('Servidor corriendo en puerto', process.env.PORT);
});
