'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function () {
  function Application(routes, options) {
    _classCallCheck(this, Application);

    this.server = options.server;
    this.registerRoutes(routes);
  }

  _createClass(Application, [{
    key: 'registerRoutes',
    value: function registerRoutes(routes) {
      for (var path in routes) {
        this.addRoute(path, routes[path]);
      }
    }
  }, {
    key: 'addRoute',
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

          controller.index(_this, request, reply, function (err) {
            if (err) {
              return reply(err);
            }

            controller.toString(function (err, html) {
              if (err) {
                return reply(err);
              }

              reply(html);
            });
          });

          return controller.index;
        }
      });
    }
  }, {
    key: 'start',
    value: function start() {
      this.server.start();
    }
  }]);

  return Application;
}();

exports.default = Application;