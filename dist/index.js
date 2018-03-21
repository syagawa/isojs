'use strict';
'user strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _hapi2.default.Server({
  host: "localhost",
  port: 8000
});

server.route({
  method: "GET",
  path: "/hello",
  handler: function handler(request, reply) {
    return "hello world dayo";
  }
});

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

server.start();