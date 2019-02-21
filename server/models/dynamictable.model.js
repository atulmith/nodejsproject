const mongoose = require('mongoose');

const DynamicTableSchema = new mongoose.Schema({
  tablename: {
    type: String,
    required: true
  },
  fields: {
    type: String,
    required: true
  },
  uifields: {
    type: Array,
    default:[],
    required: true
  },
  subtables: {
    type: Array,
    default:[],
    required: true
  },
  subtablesid:{
    type: Array,
    default:[],
    required: true
  },
  gridfields:{
    type: Array,
    default:[],
    required: true
  },
  key:{
    type: String
  }
  

});


module.exports = mongoose.model('dynamictable', DynamicTableSchema,'dynamictable');
