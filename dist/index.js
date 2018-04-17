'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

var _helloController = require('./hello-controller');

var _helloController2 = _interopRequireDefault(_helloController);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.info("@index.js 1");

_nunjucks2.default.configure('./dist');

var APP_FILE_PATH = '/application.js';

var server = new _hapi2.default.Server();
server.connection({
  host: "localhost",
  port: 8000
});

server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: function handler(request, reply) {
    console.info('@index.js in server route handler');
    // reply.file('dist/build/application.js');
    // return 'dist/build/application.js';
    reply.file('/dist/build/application.js');
  }
  // handler: {
  //   file: 'dist/build/application.js'
  // }
  // handler: {
  //   file: {
  //     path: APP_FILE_PATH,
  //     filename: 'dist/build/application.js', // override the filename in the Content-Disposition header
  //     mode: 'attachment', // specify the Content-Disposition is an attachment
  //     lookupCompressed: true // allow looking for script.js.gz if the request allows it
  //   }
  // }

});

var application = new _lib2.default({
  '/hello/{name*}': _helloController2.default
}, {
  server: server,
  document: function document(application, controller, request, reply, body, callback) {

    console.info("@index.js in application document", APP_FILE_PATH);
    return _nunjucks2.default.render('./index.html', {
      body: body,
      application: APP_FILE_PATH
    }, function (err, html) {
      if (err) {
        return callback(err, null);
      }
      callback(null, html);
    });
  }
});

console.info("@index.js 2");
// debugger;

application.start();