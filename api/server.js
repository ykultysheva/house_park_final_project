var models = require("./models");
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app/'));

// middleware
var authentication = require("./middleware/auth");

// route configuration
var user_routes = require('./routes/user_routes');
var house_routes = require('./routes/house_routes');
var auth_routes = require('./routes/auth_routes');


// set routes
// Pass all the incoming data, headers and body json,
// through the authentication file first. Then if it
// passes the checks it will go onto the routes.
// This represents a CLOSED endpoint
app.use('/api/auth',auth_routes);
// app.use('/api/users',authentication,user_routes);
app.use('/api/users',user_routes);
app.use('/api/houses',house_routes);



// start server and database (no db set up yet)
models.sequelize.sync().then(function(){
  app.listen(8080, function() {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
  });
});
