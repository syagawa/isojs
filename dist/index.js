'use strict';
'user strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

var _helloController = require('./hello-controller');

var _helloController2 = _interopRequireDefault(_helloController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// nunjucks.configure('./dist');

// import nunjucks from 'nunjucks';
var server = _hapi2.default.Server({
  host: "localhost",
  port: 8000
});

var application = new _lib2.default({
  '/hello/{name*}': _helloController2.default
}, {
  server: server
});

application.start();

// server.route({
//   method: "GET",
//   path: "/hello/{name*}",
//   handler: function(request, reply){
//     return nunjucks.render(
//       'index.html',
//       getName(request)
//     );
//   }
// });

// async function start(){

//   try{
//     await server.start();
//   }catch(err){
//     console.log(err);
//     process.exit(1);
//   }

//   console.log("Server running at: ", server.info.uri);
// }

// start();


// server.start();