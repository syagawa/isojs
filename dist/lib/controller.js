"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.info("@Controller.js");

var Controller = function () {
  function Controller(context) {
    _classCallCheck(this, Controller);

    this.context = context;
    console.info("@lib/Controller.js Controller Class constructor");
  }

  _createClass(Controller, [{
    key: "index",
    value: function index(application, request, reply, callback) {
      callback(null);
      console.info("@lib/Controller.js Controller Class index");
    }
  }, {
    key: "toString",
    value: function toString(callback) {
      callback(null, '成功');
      console.info("@lib/Controller.js Controller Class toString");
    }
  }, {
    key: "render",
    value: function render(target, callback) {
      console.info("@lib/Controller.js Controller Class render");
      this.toString(function (err, body) {
        if (err) {
          return callback(err, null);
        }

        console.info("@lib/Controller.js Controller Class render toString callback", body);

        document.querySelector(target).innerHTML = body;
        callback(null, body);
      });
    }
  }, {
    key: "serialize",
    value: function serialize() {
      return JSON.stringify(this.context.data || {});
    }
  }, {
    key: "deserialize",
    value: function deserialize() {
      this.context.data = JSON.parse(window.__STATE__);
    }
  }, {
    key: "attach",
    value: function attach(el) {
      // to be implemented by the application
    }
  }, {
    key: "detach",
    value: function detach(el) {
      // to be implemented by the application
    }
  }]);

  return Controller;
}();

exports.default = Controller;