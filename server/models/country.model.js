const mongoose = require('mongoose'); 
const CountrySchema = new mongoose.Schema(
    {  name: {     type: String,     required: true   },  
     aliasname: {     type: String,     required: true   }, 
      createdAt: {     type: Date,     default: Date.now   } }); 
      module.exports = mongoose.model('country', CountrySchema,'country');