/* eslint no-console: 0 */
'use strict';

var app = require('./server');

app.listen(8000, function() {
  console.log("Server listening on port 8000!")
});
