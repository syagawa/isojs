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

function getName(request) {
  var name = {
    fname: "Rick",
    lname: "Sanchez"
  };

  var nameParts = request.params.name ? request.params.name.split('/') : [];

  name.fname = nameParts[0] || request.query.fname || name.fname;
  name.lname = nameParts[1] || request.query.lname || name.lname;

  return name;
};

server.route({
  method: "GET",
  path: "/hello/{name*}",
  handler: function handler(request, reply) {
    return _nunjucks2.default.render('index.html', getName(request));
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