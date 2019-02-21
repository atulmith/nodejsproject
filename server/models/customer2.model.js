const mongoose = require('mongoose');
 const Customer2Schema = new mongoose.Schema({
  customername: {     type: String,     required: true   },
   customeraliasname: {     type: String,     required: true   },
 countryid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'country'   },
 stateid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'state'   }
 , cityid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'city'   }
 , customerdob: {type: Date},  createdAt: {     type: Date,     default: Date.now   } });
 module.exports = mongoose.model('customer2', Customer2Schema,'customer2');
