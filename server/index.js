const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      session    =  require("express-session");


const PORT = 3000
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/agenda')

// Se usan las librerias para el proyecto
app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({ secret: 'LFInextU', resave: false, saveUninitialized: false, proxy: false}))
app.use('/', Routing)

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
