// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // heroku will set NODE_ENV to pruction
  // production - return the prod set of keys
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'ci') {
  module.exports = require('./ci');
}  else {
  // on local machine will be undefined or development
  // development - return the dev set of keys
  module.exports = require('./dev');
}
