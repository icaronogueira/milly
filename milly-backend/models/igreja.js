const mongoose = require('mongoose');

const igrejaSchema = mongoose.Schema({
      nome:  {type: String},
      senhaAdmin: {type: String}
});

module.exports = mongoose.model('Igreja', igrejaSchema);