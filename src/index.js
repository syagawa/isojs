'user strict';

import Hapi from 'hapi';
import Application from './lib';

import HelloController from './hello-controller';

import nunjucks from 'nunjucks';

console.info("@index.js 1");

nunjucks.configure('./dist');

const APP_FILE_PATH = '/application.js';

const server = new Hapi.Server();
server.connection({
  host: "localhost",
  port: 8000
});

const application = new Application(
  {
    '/hello/{name*}': HelloController
  },
  {
    server: server,
    document: function(application, controller, request, reply, body, callback){

      console.info("@index.js in application document", APP_FILE_PATH);
      return nunjucks.render(
        './index.html',
         {
           body: body,
           path: APP_FILE_PATH
         },
         (err, html) => {
           if(err){
             return callback(err, null);
           }
           callback(null, html);
         }
      );
    }
  }
);

server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: (request, reply) => {
    console.info('@index.js in server route handler');
    // reply.file('dist/build/application.js');
    return 'dist/build/application.js';
  }

});

console.info("@index.js 2");
// debugger;

application.start();
