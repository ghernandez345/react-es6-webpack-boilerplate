var express = require('express');
var morgan = require('morgan');
var PORT = 1337 || process.env.PORT;
var app = express();

// app middleware.
app.use(morgan('dev'));

// Init app.
app.listen(PORT);
console.log('App started and listening on port', PORT);


