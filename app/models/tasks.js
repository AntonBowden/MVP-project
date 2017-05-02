var mongoose = require('mongoose');

module.exports = mongoose.model('Tasks', {
  text : String,
  done : false
});
