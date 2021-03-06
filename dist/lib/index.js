"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookie = require("./cookie");

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.info("@lib/index.js");

var Application = function () {
  function Application(routes, options) {
    _classCallCheck(this, Application);

    this.server = options.server;
    this.document = options.document;
    this.registerRoutes(routes);
    console.info("@lib/index.js Application Class constructor");
  }

  _createClass(Application, [{
    key: "registerRoutes",
    value: function registerRoutes(routes) {
      for (var path in routes) {
        this.addRoute(path, routes[path]);
      }
      console.info("@lib/index.js Application Class registerRoute");
    }
  }, {
    key: "addRoute",
    value: function addRoute(path, Controller) {
      var _this = this;

      this.server.route({
        path: path,
        method: 'GET',
        handler: function handler(request, reply) {
          console.info("@lib/index.js Application Class addRoute handler1");
          var controller = new Controller({
            query: request.query,
            params: request.params,
            cookie: (0, _cookie2.default)(request, reply)
          });
          controller.index(_this, request, reply, function (err) {
            console.info("@lib/index.js Application Class addRoute handler controller.index");

            if (err) {
              return reply(err);
            }
            controller.toString(function (err, html) {
              console.info("@lib/index.js Application Class addRoute handler controller.index toString");
              if (err) {
                return reply(err);
              }
              _this.document(_this, controller, request, reply, html, function (err, html) {
                console.info("@lib/index.js Application Class addRoute handler controller.index toString document callback");
                if (err) {
                  return reply(err);
                }
                reply(html);
              });
            });
          });
          console.info("@lib/index.js Application Class addRoute handler2");
        }
      });
      console.info("@lib/index.js Application Class addRoute");
    }
  }, {
    key: "start",
    value: function start() {
      this.server.start();
      console.info("@lib/index.js Application Class start");
    }
  }]);

  return Application;
}();

exports.default = Application;