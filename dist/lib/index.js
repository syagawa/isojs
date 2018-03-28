"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function () {
  function Application(routes, options) {
    _classCallCheck(this, Application);

    this.server = options.server;
    console.info("koko1");
    this.registerRoutes(routes);
    console.info("koko2");
  }

  _createClass(Application, [{
    key: "registerRoutes",
    value: function registerRoutes(routes) {
      for (var path in routes) {
        this.addRoute(path, routes[path]);
      }
    }
  }, {
    key: "addRoute",
    value: function addRoute(path, Controller) {
      var _this = this;

      this.server.route({
        path: path,
        method: 'GET',
        handler: function handler(request, reply) {
          var controller = new Controller({
            query: request.query,
            params: request.params
          });
          console.info(controller);

          controller.index(_this, request, reply, function (err) {
            // console.info(request,reply);
            if (err) {
              return reply(err);
            }

            controller.toString(function (err, html) {
              if (err) {
                return reply(err);
              }

              // reply(html);

              // console.info("this");
              // console.info(this);
              // console.info("err");
              // console.info(err);
              // console.info("html");
              // console.info(html);
              // console.info("request");
              // console.info(request);
              // console.info("reply");
              // console.info(reply);

              // console.info(reply.context);
              // reply.response(html);
              // html;

              return html;
            });
          });
        }
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.server.start();
    }
  }]);

  return Application;
}();

// const handler = function (request, h) {

//     return this.message;    // Or h.context.message
// };

// exports.plugin = {
//     name: 'example',
//     register: function (server, options) {

//         const bind = {
//             message: 'hello'
//         };

//         server.bind(bind);
//         server.route({ method: 'GET', path: '/', handler });
//     }
// };

// const Hapi = require('hapi');
// const server = Hapi.server({ port: 80 });

// const handler = function (request, h) {

//     return h.response('The page was not found').code(404);
// };

// server.route({ method: '*', path: '/{p*}', handler });


exports.default = Application;