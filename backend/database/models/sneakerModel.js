const mongoose=require("mongoose")

const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  model: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  owner:{
    type: String,
    required: true,
    trim: true
  }
});

const Sneaker = mongoose.model('Sneakers', sneakerSchema);

module.exports = Sneaker;