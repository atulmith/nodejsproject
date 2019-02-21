const mongoose = require('mongoose');
 const CategorySchema = new mongoose.Schema({
  categoryname: {     type: String,     required: true   },
   categoryaliasname: {     type: String,     required: true   },
 categorytypeid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'categorytype'   },  createdAt: {     type: Date,     default: Date.now   } });
 module.exports = mongoose.model('category', CategorySchema,'category');
