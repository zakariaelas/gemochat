const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.databaseUrl, {
  useCreateIndex: true,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.plugin((schema) => {
  schema.set('toJSON', {
    transform: function (doc, obj) {
      obj.id = obj._id;
      delete obj._id;
      delete obj.__v;
      delete obj.password;
      return obj;
    },
  });
});

mongoose.set('useFindAndModify', false);

mongoose.Promise = Promise;

module.exports = {
  User: require('./models/user'),
  Interview: require('./models/interview'),
  Job: require('./models/job'),
  connection: mongoose.connection,
};
