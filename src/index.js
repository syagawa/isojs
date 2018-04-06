'user strict';

import Hapi from 'hapi';
import Application from './lib';

import HelloController from './hello-controller';

import nunjucks from 'nunjucks';

console.info("@index.js");

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
    reply.file('dist/build/application.js');
  }
});

application.start();
