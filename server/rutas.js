const Router = require('express').Router();
const Users = require('./modelUser.js')
const Events = require('./modelEvent.js')

//Obtener todos los usuarios
Router.post('/users/init', function(req, res) {
    Users.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json({usuarios: docs.length})
        //res.json(docs)
    })
})


//Obtener todos los usuarios
Router.get('/events/all', function(req, res) {
  res.json({id: "evento1"})
  /*
    Users.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
    */
})

module.exports = Router
