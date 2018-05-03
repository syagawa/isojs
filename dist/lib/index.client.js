'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _call = require('call');

var _call2 = _interopRequireDefault(_call);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.info("@lib/index.client.js");

var Application = function () {
  function Application(routes, options) {
    _classCallCheck(this, Application);

    this.routes = routes;
    this.options = options;

    console.info("@lib/index.client.js Application Class constructor");

    this.router = new _call2.default.Router();
    this.registerRoutes(routes);
  }

  _createClass(Application, [{
    key: 'registerRoutes',
    value: function registerRoutes(routes) {
      console.info("@lib/index.client.js Application Class registerRoutes");
      for (var path in routes) {
        this.router.add({
          path: path,
          method: 'get'
        });
      }
    }
  }, {
    key: 'navigate',
    value: function navigate(url) {
      var _this = this;

      var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


      console.info("@lib/index.client.js Application Class navigate");

      if (!history.pushState) {
        window.location = url;
        return;
      }

      var urlParts = url.split('?');

      var _urlParts = _slicedToArray(urlParts, 2),
          path = _urlParts[0],
          search = _urlParts[1];

      var match = this.router.route('get', path);
      var route = match.route,
          params = match.params;

      var Controller = this.routes[route];

      if (route && Controller) {
        console.log(match);
        console.log(Controller);

        var controller = new Controller({
          query: _queryString2.default.parse(search),
          params: params
        });

        var request = function request() {};
        var reply = function reply() {};

        controller.index(this, request, reply, function (err) {
          if (err) {
            return reply(err);
          }

          console.info("@lib/index.client.js Application Class navigate controller.index");
          controller.render(_this.options.target, function (err, response) {
            if (err) {
              return reply(err);
            }

            reply(response);
          });
        });
      }

      if (push) {
        history.pushState({}, null, url);
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      console.info("@lib/index.client.js Application Class start");
      this.poStateListener = window.addEventListener('popstate', function (e) {
        var _window$location = window.location,
            pathname = _window$location.pathname,
            search = _window$location.search;

        var url = '' + pathname + search;
        _this2.navigate(url, false);
      });
      this.clickListener = document.addEventListener('click', function (e) {
        var target = e.target;

        var identifier = target.dataset.navigate;
        var href = target.getAttribute('href');

        console.info("@lib/index.client.js Application Class click");

        if (identifier !== undefined) {
          if (href) {
            e.preventDefault();
          }

          _this2.navigate(identifier || href);
        }
      });
    }
  }]);

  return Application;
}();

exports.default = Application;