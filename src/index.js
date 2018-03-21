'user strict';

import Hapi from 'hapi';

const server = Hapi.Server({
  host: "localhost",
  port: 8000
});

server.route({
  method: "GET",
  path: "/hello",
  handler: function(request, reply){
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