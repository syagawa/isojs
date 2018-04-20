'use strict';

import Hapi from 'hapi';
import Application from './lib';

import HelloController from './hello-controller';

import nunjucks from 'nunjucks';

import Inert from 'inert';

console.info("@index.js 1");

nunjucks.configure('./dist');

const APP_FILE_PATH = '/application.js';

const server = new Hapi.Server();
server.connection({
  host: "localhost",
  port: 8000
});

server.register(Inert, () => {});

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
           application: APP_FILE_PATH
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

console.info("@index.js 2");

server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: {
    file: 'dist/build/application.js'
  }
});


application.start();
