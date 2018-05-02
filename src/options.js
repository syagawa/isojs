'use strict';

import Hapi from 'hapi';
import path from 'path';
import nunjucks from 'nunjucks';
import Inert from 'inert';

const server = new Hapi.Server({
  debug: {
    request: ['error']
  }
});

server.register(Inert, () => {});

server.connection({
  host: 'localhost',
  port: 8000
});

const APP_FILE_PATH = '/application.js';

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

export default {
  // nunjucks: './dist',
  nunjucks: {
    path: './dist',
    options: {
      autoescape: false
    }
  },
  server: server,
  document: function(application, controller, request, reply, body, callback){
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
    )
  }
};