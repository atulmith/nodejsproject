const mongoose = require('mongoose');
 const CitySchema = new mongoose.Schema({
  cityname: {     type: String,     required: true   },
   cityaliasname: {     type: String,     required: true   },
 countryid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'country'   },
 stateid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'state'   }
 , createdAt: {     type: Date,     default: Date.now   } });
 module.exports = mongoose.model('city', CitySchema,'city');
