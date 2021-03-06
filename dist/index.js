'use strict';

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

var _helloController = require('./hello-controller');

var _helloController2 = _interopRequireDefault(_helloController);

var _homeController = require('./home-controller');

var _homeController2 = _interopRequireDefault(_homeController);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.info("@index.js");

_nunjucks2.default.configure(_options2.default.nunjucks.path, _options2.default.nunjucks.options);

var application = new _lib2.default({
  '/hello/{name*}': _helloController2.default,
  '/': _homeController2.default
}, _options2.default);

application.start();