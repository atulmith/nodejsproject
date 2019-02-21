const mongoose = require('mongoose');

const dropdownSchema = new mongoose.Schema({
  keys: {
    type: String,
    required: true
  },
  values: {
    type: String,
    required: true
  }

});
module.exports = mongoose.model('dropdown', dropdownSchema,"dropdown");
