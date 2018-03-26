'user strict';

import Hapi from 'hapi';
// import nunjucks from 'nunjucks';
import Application from './lib';

import HelloController from './hello-controller';


// nunjucks.configure('./dist');

const server = Hapi.Server({
  host: "localhost",
  port: 8000
});



const application = new Application(
  {
    '/hello/{name*}': HelloController
  },
  {
    server: server
  }
);

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