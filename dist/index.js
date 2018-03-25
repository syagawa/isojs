'use strict';
'user strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nunjucks2.default.configure('./dist');

var server = _hapi2.default.Server({
  host: "localhost",
  port: 8000
});

server.route({
  method: "GET",
  path: "/hello",
  handler: function handler(request, reply) {
    return _nunjucks2.default.render('index.html', {
      fname: 'Rick',
      lname: 'Sanchez'
      // function(err, html){
      //   // console.info(this);
      //   // console.info(reply);
      //   // console.info(reply.length);
      //   // console.info(html);
      //   // reply.response(html);
      //   // return html;
      //   // console.info(reply.file);
      //   // reply(html);
      //   // return html;
      //   // reply.view(html);
      //   // return reply;
      //   // return reply.context;
      //   console.log(reply);
      //   // console.log(reply.authenticated);
      //   // console.log(reply.response);
      //   // console.log(reply.entity);
      //   // console.log(reply.request);
      //   // reply.authenticated(html);
      //   reply.response(html);
      // }
    });
  }
});

async function start() {

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at: ", server.info.uri);
}

start();

// server.start();