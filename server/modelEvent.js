const mongoose = require('mongoose')

const Schema = mongoose.Schema

let EventSchema = new Schema({
  user_email: { type: String, required: true},
  titulo: { type: String, required: true },
  start_date: { type: Date, required: true},
  end_date: { type: Date, required: true}
})

let EventModel = mongoose.model('Evento', EventSchema)

module.exports = EventModel
