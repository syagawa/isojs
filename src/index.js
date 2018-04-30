'use strict';

import Hapi from 'hapi';
import Application from './lib';

import HelloController from './hello-controller';

import nunjucks from 'nunjucks';
import path from 'path';


import Inert from 'inert';

console.info("@index.js 1");

nunjucks.configure(
  './dist',
  { autoescape: false }
);

const APP_FILE_PATH = '/application.js';

const server = new Hapi.Server();
server.connection({
  host: "localhost",
  port: 8000
});

server.register(Inert, () => {});

server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: (request, reply) => {
    reply.file('dist/build/application.js');
  }
});

server.route({
  method: 'GET',
  path: '/templates/{template*}',
  handler: {
    file: (request) => {
      return path.join('dist', request.params.template);
    }
  }
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

application.start();
