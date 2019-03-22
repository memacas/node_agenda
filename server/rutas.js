const Router = require('express').Router(),
      Users = require('./modelUser.js'),
      Events = require('./modelEvent.js'),
      Moment = require('moment'),
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


//Inserta un evento en mongodb
Router.post('/events/new', function(req, res) {
   if (!req.session.email) res.send(false)

    //Crea el evento con el esquema
    let evento = new Events({
      user_email: req.session.email,
      titulo: req.body.title,
      start_date: req.body.start,
      end_date: req.body.end
    })

    evento.save(function(error, nuevo_evento) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.json({msg: "Registro guardado", _id: nuevo_evento._id})
    })
})


//Actualiza un evento en mongodb
Router.post('/events/update', function(req, res) {
   //if (!req.session.email) res.send(false)

   Events.update(
                  {_id: req.body._id},
                  {start_date: req.body.start, end_date: req.body.end},
                  function(err, evento){
                    if (err) {
                      res.status(500)
                      res.json(err)
                    }
                    res.json({msg: "Registro actualizado"})
         })
  })

  // Eliminar un evento por su id
  Router.post('/events/delete/:id', function(req, res) {
    let uid = req.params.id
    Events.remove({userId: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})

//Obtener todos los eventos
Router.get('/events/all', function(req, res) {

  Events.find({}).lean().exec(function(err, eventos) {
    var userMap = new Array();
    eventos.forEach(function(evento) {
      evento.start = Moment(evento.start_date).format("YYYY-MM-DDTHH:mm:ss")
      evento.end = Moment(evento.end_date).format("YYYY-MM-DDTHH:mm:ss")
      evento.title = evento.titulo
      console.log(evento)
      userMap.push({title: evento.titulo, start: evento.start, end: evento.end, _id: evento._id})
    });


    res.json(userMap);
  });

})

module.exports = Router
