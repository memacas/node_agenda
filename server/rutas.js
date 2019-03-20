const Router = require('express').Router(),
      Users = require('./modelUser.js'),
      Events = require('./modelEvent.js'),
      bcrypt = require('bcrypt'),
      salt_rounds = 10;


//Cargar en mongodb el usuario inicial en caso de que no exista
Router.post('/users/init', function(req, res) {

  Users.find({}).countDocuments(function(err, qty_users) {
    if (err) {
        res.status(500)
        res.json(err)
    }

    //Si no existen usuarios, el sistema creara 1
    if (qty_users == 0){
      let user = new Users({
        nombres: "prueba1",
        apellidos: "apellido_prueba1",
        password: bcrypt.hashSync("prueba1", salt_rounds),
        email: "prueba1@gmail.com"
      })

      user.save(function(error) {
        if (error) {
          res.status(500)
          res.json(error)
        }
        res.json({respuesta: "Registro guardado"})
      })
    }else{
      res.json({respuesta: "Ya existen " + qty_users + " usuarios"})
    }
  })

})

Router.post('/login', function(req, res) {
  //Busca el usuario en mongodb
  Users.findOne({email: req.body.user}).exec(function(err, doc){
      if (err) {
          res.status(500)
          res.json(err)
      }
      //Si el email existe....
      if (doc != null){
        //Si el password coincide, asigna a la variasble de sesion el email
        if (bcrypt.compareSync(req.body.pass, doc.password)){
          req.session.email = doc.email
          res.json("Validado")
        }else res.json({res: "no coindice el password"})
      }else{
          res.json({res: "no existe este usuario"})
      }

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
