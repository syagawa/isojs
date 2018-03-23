'user strict';

import Hapi from 'hapi';
import nunjucks from 'nunjucks';

nunjucks.configure('./dist');

const server = Hapi.Server({
  host: "localhost",
  port: 8000
});

server.route({
  method: "GET",
  path: "/hello",
  handler: function(request, reply){
    nunjucks.render(
      'index.html',
      {
        fname: 'Rick',
        lname: 'Sanchez'
      },
      function(err, html){
        reply(html);
      }
    );
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