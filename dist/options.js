'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.info("@options.js");

var server = new _hapi2.default.Server({
  debug: {
    request: ['error']
  }
});

server.register(_inert2.default, function () {});

server.connection({
  host: 'localhost',
  port: 8000
});

var APP_FILE_PATH = '/application.js';

server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: function handler(request, reply) {
    console.info("@options.js application.js handler");
    reply.file('dist/build/application.js');
  }
});

server.route({
  method: 'GET',
  path: '/templates/{template*}',
  handler: {
    file: function file(request) {
      console.info("@options.js templates handler");
      return _path2.default.join('dist', request.params.template);
    }
  }
});

exports.default = {
  // nunjucks: './dist',
  nunjucks: {
    path: './dist',
    options: {
      autoescape: false
    }
  },
  server: server,
  document: function document(application, controller, request, reply, body, callback) {
    return _nunjucks2.default.render('./index.html', {
      body: body,
      application: APP_FILE_PATH
    }, function (err, html) {
      if (err) {
        return callback(err, null);
      }
      console.info("@options.js document nunjucks render");
      callback(null, html);
    });
  }
};