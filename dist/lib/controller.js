"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller(context) {
    _classCallCheck(this, Controller);

    this.context = context;
    console.info("@lib/index.js Controller Class constructor");
  }

  _createClass(Controller, [{
    key: "index",
    value: function index(application, request, reply, callback) {
      callback(null);
      console.info("@lib/index.js Controller Class callback");
    }
  }, {
    key: "toString",
    value: function toString(callback) {
      callback(null, '成功');
      console.info("@lib/index.js Controller Class callback");
    }
  }]);

  return Controller;
}();

exports.default = Controller;