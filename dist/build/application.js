(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){
/*! Browser bundle of nunjucks 3.1.2  */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["nunjucks"] = factory();
	else
		root["nunjucks"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;
var escapeMap = {
  '&': '&amp;',
  '"': '&quot;',
  '\'': '&#39;',
  '<': '&lt;',
  '>': '&gt;'
};
var escapeRegex = /[&"'<>]/g;
var exports = module.exports = {};

function hasOwnProp(obj, k) {
  return ObjProto.hasOwnProperty.call(obj, k);
}

exports.hasOwnProp = hasOwnProp;

function lookupEscape(ch) {
  return escapeMap[ch];
}

function _prettifyError(path, withInternals, err) {
  if (!err.Update) {
    // not one of ours, cast it
    err = new exports.TemplateError(err);
  }

  err.Update(path); // Unless they marked the dev flag, show them a trace from here

  if (!withInternals) {
    var old = err;
    err = new Error(old.message);
    err.name = old.name;
  }

  return err;
}

exports._prettifyError = _prettifyError;

function TemplateError(message, lineno, colno) {
  var _this = this;

  var err;
  var cause;

  if (message instanceof Error) {
    cause = message;
    message = cause.name + ": " + cause.message;
  }

  if (Object.setPrototypeOf) {
    err = new Error(message);
    Object.setPrototypeOf(err, TemplateError.prototype);
  } else {
    err = this;
    Object.defineProperty(err, 'message', {
      enumerable: false,
      writable: true,
      value: message
    });
  }

  Object.defineProperty(err, 'name', {
    value: 'Template render error'
  });

  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, this.constructor);
  }

  var getStack;

  if (cause) {
    var stackDescriptor = Object.getOwnPropertyDescriptor(cause, 'stack');

    getStack = stackDescriptor && (stackDescriptor.get || function () {
      return stackDescriptor.value;
    });

    if (!getStack) {
      getStack = function getStack() {
        return cause.stack;
      };
    }
  } else {
    var stack = new Error(message).stack;

    getStack = function getStack() {
      return stack;
    };
  }

  Object.defineProperty(err, 'stack', {
    get: function get() {
      return getStack.call(_this);
    }
  });
  Object.defineProperty(err, 'cause', {
    value: cause
  });
  err.lineno = lineno;
  err.colno = colno;
  err.firstUpdate = true;

  err.Update = function (path) {
    var msg = '(' + (path || 'unknown path') + ')'; // only show lineno + colno next to path of template
    // where error occurred

    if (_this.firstUpdate) {
      if (_this.lineno && _this.colno) {
        msg += " [Line " + _this.lineno + ", Column " + _this.colno + "]";
      } else if (_this.lineno) {
        msg += " [Line " + _this.lineno + "]";
      }
    }

    msg += '\n ';

    if (_this.firstUpdate) {
      msg += ' ';
    }

    _this.message = msg + (_this.message || '');
    _this.firstUpdate = false;
    return _this;
  };

  return err;
}

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(TemplateError.prototype, Error.prototype);
} else {
  TemplateError.prototype = Object.create(Error.prototype, {
    constructor: {
      value: TemplateError
    }
  });
}

exports.TemplateError = TemplateError;

function escape(val) {
  return val.replace(escapeRegex, lookupEscape);
}

exports.escape = escape;

function isFunction(obj) {
  return ObjProto.toString.call(obj) === '[object Function]';
}

exports.isFunction = isFunction;

function isArray(obj) {
  return ObjProto.toString.call(obj) === '[object Array]';
}

exports.isArray = isArray;

function isString(obj) {
  return ObjProto.toString.call(obj) === '[object String]';
}

exports.isString = isString;

function isObject(obj) {
  return ObjProto.toString.call(obj) === '[object Object]';
}

exports.isObject = isObject;

function groupBy(obj, val) {
  var result = {};
  var iterator = isFunction(val) ? val : function (o) {
    return o[val];
  };

  for (var i = 0; i < obj.length; i++) {
    var value = obj[i];
    var key = iterator(value, i);
    (result[key] || (result[key] = [])).push(value);
  }

  return result;
}

exports.groupBy = groupBy;

function toArray(obj) {
  return Array.prototype.slice.call(obj);
}

exports.toArray = toArray;

function without(array) {
  var result = [];

  if (!array) {
    return result;
  }

  var length = array.length;
  var contains = toArray(arguments).slice(1);
  var index = -1;

  while (++index < length) {
    if (indexOf(contains, array[index]) === -1) {
      result.push(array[index]);
    }
  }

  return result;
}

exports.without = without;

function repeat(char_, n) {
  var str = '';

  for (var i = 0; i < n; i++) {
    str += char_;
  }

  return str;
}

exports.repeat = repeat;

function each(obj, func, context) {
  if (obj == null) {
    return;
  }

  if (ArrayProto.forEach && obj.forEach === ArrayProto.forEach) {
    obj.forEach(func, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      func.call(context, obj[i], i, obj);
    }
  }
}

exports.each = each;

function map(obj, func) {
  var results = [];

  if (obj == null) {
    return results;
  }

  if (ArrayProto.map && obj.map === ArrayProto.map) {
    return obj.map(func);
  }

  for (var i = 0; i < obj.length; i++) {
    results[results.length] = func(obj[i], i);
  }

  if (obj.length === +obj.length) {
    results.length = obj.length;
  }

  return results;
}

exports.map = map;

function asyncIter(arr, iter, cb) {
  var i = -1;

  function next() {
    i++;

    if (i < arr.length) {
      iter(arr[i], i, next, cb);
    } else {
      cb();
    }
  }

  next();
}

exports.asyncIter = asyncIter;

function asyncFor(obj, iter, cb) {
  var keys = keys_(obj || {});
  var len = keys.length;
  var i = -1;

  function next() {
    i++;
    var k = keys[i];

    if (i < len) {
      iter(k, obj[k], i, len, next);
    } else {
      cb();
    }
  }

  next();
}

exports.asyncFor = asyncFor;

function indexOf(arr, searchElement, fromIndex) {
  return Array.prototype.indexOf.call(arr || [], searchElement, fromIndex);
}

exports.indexOf = indexOf;

function keys_(obj) {
  /* eslint-disable no-restricted-syntax */
  var arr = [];

  for (var k in obj) {
    if (hasOwnProp(obj, k)) {
      arr.push(k);
    }
  }

  return arr;
}

exports.keys = keys_;

function _entries(obj) {
  return keys_(obj).map(function (k) {
    return [k, obj[k]];
  });
}

exports._entries = _entries;

function _values(obj) {
  return keys_(obj).map(function (k) {
    return obj[k];
  });
}

exports._values = _values;

function extend(obj1, obj2) {
  obj1 = obj1 || {};
  keys_(obj2).forEach(function (k) {
    obj1[k] = obj2[k];
  });
  return obj1;
}

exports._assign = exports.extend = extend;

function inOperator(key, val) {
  if (isArray(val) || isString(val)) {
    return val.indexOf(key) !== -1;
  } else if (isObject(val)) {
    return key in val;
  }

  throw new Error('Cannot use "in" operator to search for "' + key + '" in unexpected types.');
}

exports.inOperator = inOperator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // A simple class system, more documentation to come

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var lib = __webpack_require__(0);

function parentWrap(parent, prop) {
  if (typeof parent !== 'function' || typeof prop !== 'function') {
    return prop;
  }

  return function wrap() {
    // Save the current parent method
    var tmp = this.parent; // Set parent to the previous method, call, and restore

    this.parent = parent;
    var res = prop.apply(this, arguments);
    this.parent = tmp;
    return res;
  };
}

function extendClass(cls, name, props) {
  props = props || {};
  lib.keys(props).forEach(function (k) {
    props[k] = parentWrap(cls.prototype[k], props[k]);
  });

  var subclass =
  /*#__PURE__*/
  function (_cls) {
    _inheritsLoose(subclass, _cls);

    function subclass() {
      return _cls.apply(this, arguments) || this;
    }

    _createClass(subclass, [{
      key: "typename",
      get: function get() {
        return name;
      }
    }]);

    return subclass;
  }(cls);

  lib._assign(subclass.prototype, props);

  return subclass;
}

var Obj =
/*#__PURE__*/
function () {
  function Obj() {
    // Unfortunately necessary for backwards compatibility
    this.init.apply(this, arguments);
  }

  var _proto = Obj.prototype;

  _proto.init = function init() {};

  Obj.extend = function extend(name, props) {
    if (typeof name === 'object') {
      props = name;
      name = 'anonymous';
    }

    return extendClass(this, name, props);
  };

  _createClass(Obj, [{
    key: "typename",
    get: function get() {
      return this.constructor.name;
    }
  }]);

  return Obj;
}();

module.exports = Obj;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var arrayFrom = Array.from;
var supportsIterators = typeof Symbol === 'function' && Symbol.iterator && typeof arrayFrom === 'function'; // Frames keep track of scoping both at compile-time and run-time so
// we know how to access variables. Block tags can introduce special
// variables, for example.

var Frame =
/*#__PURE__*/
function () {
  function Frame(parent, isolateWrites) {
    this.variables = {};
    this.parent = parent;
    this.topLevel = false; // if this is true, writes (set) should never propagate upwards past
    // this frame to its parent (though reads may).

    this.isolateWrites = isolateWrites;
  }

  var _proto = Frame.prototype;

  _proto.set = function set(name, val, resolveUp) {
    // Allow variables with dots by automatically creating the
    // nested structure
    var parts = name.split('.');
    var obj = this.variables;
    var frame = this;

    if (resolveUp) {
      if (frame = this.resolve(parts[0], true)) {
        frame.set(name, val);
        return;
      }
    }

    for (var i = 0; i < parts.length - 1; i++) {
      var id = parts[i];

      if (!obj[id]) {
        obj[id] = {};
      }

      obj = obj[id];
    }

    obj[parts[parts.length - 1]] = val;
  };

  _proto.get = function get(name) {
    var val = this.variables[name];

    if (val !== undefined) {
      return val;
    }

    return null;
  };

  _proto.lookup = function lookup(name) {
    var p = this.parent;
    var val = this.variables[name];

    if (val !== undefined) {
      return val;
    }

    return p && p.lookup(name);
  };

  _proto.resolve = function resolve(name, forWrite) {
    var p = forWrite && this.isolateWrites ? undefined : this.parent;
    var val = this.variables[name];

    if (val !== undefined) {
      return this;
    }

    return p && p.resolve(name);
  };

  _proto.push = function push(isolateWrites) {
    return new Frame(this, isolateWrites);
  };

  _proto.pop = function pop() {
    return this.parent;
  };

  return Frame;
}();

function makeMacro(argNames, kwargNames, func) {
  var _this = this;

  return function () {
    for (var _len = arguments.length, macroArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      macroArgs[_key] = arguments[_key];
    }

    var argCount = numArgs(macroArgs);
    var args;
    var kwargs = getKeywordArgs(macroArgs);

    if (argCount > argNames.length) {
      args = macroArgs.slice(0, argNames.length); // Positional arguments that should be passed in as
      // keyword arguments (essentially default values)

      macroArgs.slice(args.length, argCount).forEach(function (val, i) {
        if (i < kwargNames.length) {
          kwargs[kwargNames[i]] = val;
        }
      });
      args.push(kwargs);
    } else if (argCount < argNames.length) {
      args = macroArgs.slice(0, argCount);

      for (var i = argCount; i < argNames.length; i++) {
        var arg = argNames[i]; // Keyword arguments that should be passed as
        // positional arguments, i.e. the caller explicitly
        // used the name of a positional arg

        args.push(kwargs[arg]);
        delete kwargs[arg];
      }

      args.push(kwargs);
    } else {
      args = macroArgs;
    }

    return func.apply(_this, args);
  };
}

function makeKeywordArgs(obj) {
  obj.__keywords = true;
  return obj;
}

function isKeywordArgs(obj) {
  return obj && Object.prototype.hasOwnProperty.call(obj, '__keywords');
}

function getKeywordArgs(args) {
  var len = args.length;

  if (len) {
    var lastArg = args[len - 1];

    if (isKeywordArgs(lastArg)) {
      return lastArg;
    }
  }

  return {};
}

function numArgs(args) {
  var len = args.length;

  if (len === 0) {
    return 0;
  }

  var lastArg = args[len - 1];

  if (isKeywordArgs(lastArg)) {
    return len - 1;
  } else {
    return len;
  }
} // A SafeString object indicates that the string should not be
// autoescaped. This happens magically because autoescaping only
// occurs on primitive string objects.


function SafeString(val) {
  if (typeof val !== 'string') {
    return val;
  }

  this.val = val;
  this.length = val.length;
}

SafeString.prototype = Object.create(String.prototype, {
  length: {
    writable: true,
    configurable: true,
    value: 0
  }
});

SafeString.prototype.valueOf = function valueOf() {
  return this.val;
};

SafeString.prototype.toString = function toString() {
  return this.val;
};

function copySafeness(dest, target) {
  if (dest instanceof SafeString) {
    return new SafeString(target);
  }

  return target.toString();
}

function markSafe(val) {
  var type = typeof val;

  if (type === 'string') {
    return new SafeString(val);
  } else if (type !== 'function') {
    return val;
  } else {
    return function wrapSafe(args) {
      var ret = val.apply(this, arguments);

      if (typeof ret === 'string') {
        return new SafeString(ret);
      }

      return ret;
    };
  }
}

function suppressValue(val, autoescape) {
  val = val !== undefined && val !== null ? val : '';

  if (autoescape && !(val instanceof SafeString)) {
    val = lib.escape(val.toString());
  }

  return val;
}

function ensureDefined(val, lineno, colno) {
  if (val === null || val === undefined) {
    throw new lib.TemplateError('attempted to output null or undefined value', lineno + 1, colno + 1);
  }

  return val;
}

function memberLookup(obj, val) {
  if (obj === undefined || obj === null) {
    return undefined;
  }

  if (typeof obj[val] === 'function') {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return obj[val].apply(obj, args);
    };
  }

  return obj[val];
}

function callWrap(obj, name, context, args) {
  if (!obj) {
    throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
  } else if (typeof obj !== 'function') {
    throw new Error('Unable to call `' + name + '`, which is not a function');
  }

  return obj.apply(context, args);
}

function contextOrFrameLookup(context, frame, name) {
  var val = frame.lookup(name);
  return val !== undefined ? val : context.lookup(name);
}

function handleError(error, lineno, colno) {
  if (error.lineno) {
    return error;
  } else {
    return new lib.TemplateError(error, lineno, colno);
  }
}

function asyncEach(arr, dimen, iter, cb) {
  if (lib.isArray(arr)) {
    var len = arr.length;
    lib.asyncIter(arr, function iterCallback(item, i, next) {
      switch (dimen) {
        case 1:
          iter(item, i, len, next);
          break;

        case 2:
          iter(item[0], item[1], i, len, next);
          break;

        case 3:
          iter(item[0], item[1], item[2], i, len, next);
          break;

        default:
          item.push(i, len, next);
          iter.apply(this, item);
      }
    }, cb);
  } else {
    lib.asyncFor(arr, function iterCallback(key, val, i, len, next) {
      iter(key, val, i, len, next);
    }, cb);
  }
}

function asyncAll(arr, dimen, func, cb) {
  var finished = 0;
  var len;
  var outputArr;

  function done(i, output) {
    finished++;
    outputArr[i] = output;

    if (finished === len) {
      cb(null, outputArr.join(''));
    }
  }

  if (lib.isArray(arr)) {
    len = arr.length;
    outputArr = new Array(len);

    if (len === 0) {
      cb(null, '');
    } else {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];

        switch (dimen) {
          case 1:
            func(item, i, len, done);
            break;

          case 2:
            func(item[0], item[1], i, len, done);
            break;

          case 3:
            func(item[0], item[1], item[2], i, len, done);
            break;

          default:
            item.push(i, len, done);
            func.apply(this, item);
        }
      }
    }
  } else {
    var keys = lib.keys(arr || {});
    len = keys.length;
    outputArr = new Array(len);

    if (len === 0) {
      cb(null, '');
    } else {
      for (var _i = 0; _i < keys.length; _i++) {
        var k = keys[_i];
        func(k, arr[k], _i, len, done);
      }
    }
  }
}

function fromIterator(arr) {
  if (typeof arr !== 'object' || arr === null || lib.isArray(arr)) {
    return arr;
  } else if (supportsIterators && Symbol.iterator in arr) {
    return arrayFrom(arr);
  } else {
    return arr;
  }
}

module.exports = {
  Frame: Frame,
  makeMacro: makeMacro,
  makeKeywordArgs: makeKeywordArgs,
  numArgs: numArgs,
  suppressValue: suppressValue,
  ensureDefined: ensureDefined,
  memberLookup: memberLookup,
  contextOrFrameLookup: contextOrFrameLookup,
  callWrap: callWrap,
  handleError: handleError,
  isArray: lib.isArray,
  keys: lib.keys,
  SafeString: SafeString,
  copySafeness: copySafeness,
  markSafe: markSafe,
  asyncEach: asyncEach,
  asyncAll: asyncAll,
  inOperator: lib.inOperator,
  fromIterator: fromIterator
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Obj = __webpack_require__(1);

function traverseAndCheck(obj, type, results) {
  if (obj instanceof type) {
    results.push(obj);
  }

  if (obj instanceof Node) {
    obj.findAll(type, results);
  }
}

var Node =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Node, _Obj);

  function Node() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto = Node.prototype;

  _proto.init = function init(lineno, colno) {
    var _this = this,
        _arguments = arguments;

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.lineno = lineno;
    this.colno = colno;
    this.fields.forEach(function (field, i) {
      // The first two args are line/col numbers, so offset by 2
      var val = _arguments[i + 2]; // Fields should never be undefined, but null. It makes
      // testing easier to normalize values.

      if (val === undefined) {
        val = null;
      }

      _this[field] = val;
    });
  };

  _proto.findAll = function findAll(type, results) {
    var _this2 = this;

    results = results || [];

    if (this instanceof NodeList) {
      this.children.forEach(function (child) {
        return traverseAndCheck(child, type, results);
      });
    } else {
      this.fields.forEach(function (field) {
        return traverseAndCheck(_this2[field], type, results);
      });
    }

    return results;
  };

  _proto.iterFields = function iterFields(func) {
    var _this3 = this;

    this.fields.forEach(function (field) {
      func(_this3[field], field);
    });
  };

  return Node;
}(Obj); // Abstract nodes


var Value =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Value, _Node);

  function Value() {
    return _Node.apply(this, arguments) || this;
  }

  _createClass(Value, [{
    key: "typename",
    get: function get() {
      return 'Value';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['value'];
    }
  }]);

  return Value;
}(Node); // Concrete nodes


var NodeList =
/*#__PURE__*/
function (_Node2) {
  _inheritsLoose(NodeList, _Node2);

  function NodeList() {
    return _Node2.apply(this, arguments) || this;
  }

  var _proto2 = NodeList.prototype;

  _proto2.init = function init(lineno, colno, nodes) {
    _Node2.prototype.init.call(this, lineno, colno, nodes || []);
  };

  _proto2.addChild = function addChild(node) {
    this.children.push(node);
  };

  _createClass(NodeList, [{
    key: "typename",
    get: function get() {
      return 'NodeList';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['children'];
    }
  }]);

  return NodeList;
}(Node);

var Root = NodeList.extend('Root');
var Literal = Value.extend('Literal');
var Symbol = Value.extend('Symbol');
var Group = NodeList.extend('Group');
var ArrayNode = NodeList.extend('Array');
var Pair = Node.extend('Pair', {
  fields: ['key', 'value']
});
var Dict = NodeList.extend('Dict');
var LookupVal = Node.extend('LookupVal', {
  fields: ['target', 'val']
});
var If = Node.extend('If', {
  fields: ['cond', 'body', 'else_']
});
var IfAsync = If.extend('IfAsync');
var InlineIf = Node.extend('InlineIf', {
  fields: ['cond', 'body', 'else_']
});
var For = Node.extend('For', {
  fields: ['arr', 'name', 'body', 'else_']
});
var AsyncEach = For.extend('AsyncEach');
var AsyncAll = For.extend('AsyncAll');
var Macro = Node.extend('Macro', {
  fields: ['name', 'args', 'body']
});
var Caller = Macro.extend('Caller');
var Import = Node.extend('Import', {
  fields: ['template', 'target', 'withContext']
});

var FromImport =
/*#__PURE__*/
function (_Node3) {
  _inheritsLoose(FromImport, _Node3);

  function FromImport() {
    return _Node3.apply(this, arguments) || this;
  }

  var _proto3 = FromImport.prototype;

  _proto3.init = function init(lineno, colno, template, names, withContext) {
    _Node3.prototype.init.call(this, lineno, colno, template, names || new NodeList(), withContext);
  };

  _createClass(FromImport, [{
    key: "typename",
    get: function get() {
      return 'FromImport';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['template', 'names', 'withContext'];
    }
  }]);

  return FromImport;
}(Node);

var FunCall = Node.extend('FunCall', {
  fields: ['name', 'args']
});
var Filter = FunCall.extend('Filter');
var FilterAsync = Filter.extend('FilterAsync', {
  fields: ['name', 'args', 'symbol']
});
var KeywordArgs = Dict.extend('KeywordArgs');
var Block = Node.extend('Block', {
  fields: ['name', 'body']
});
var Super = Node.extend('Super', {
  fields: ['blockName', 'symbol']
});
var TemplateRef = Node.extend('TemplateRef', {
  fields: ['template']
});
var Extends = TemplateRef.extend('Extends');
var Include = Node.extend('Include', {
  fields: ['template', 'ignoreMissing']
});
var Set = Node.extend('Set', {
  fields: ['targets', 'value']
});
var Switch = Node.extend('Switch', {
  fields: ['expr', 'cases', 'default']
});
var Case = Node.extend('Case', {
  fields: ['cond', 'body']
});
var Output = NodeList.extend('Output');
var Capture = Node.extend('Capture', {
  fields: ['body']
});
var TemplateData = Literal.extend('TemplateData');
var UnaryOp = Node.extend('UnaryOp', {
  fields: ['target']
});
var BinOp = Node.extend('BinOp', {
  fields: ['left', 'right']
});
var In = BinOp.extend('In');
var Is = BinOp.extend('Is');
var Or = BinOp.extend('Or');
var And = BinOp.extend('And');
var Not = UnaryOp.extend('Not');
var Add = BinOp.extend('Add');
var Concat = BinOp.extend('Concat');
var Sub = BinOp.extend('Sub');
var Mul = BinOp.extend('Mul');
var Div = BinOp.extend('Div');
var FloorDiv = BinOp.extend('FloorDiv');
var Mod = BinOp.extend('Mod');
var Pow = BinOp.extend('Pow');
var Neg = UnaryOp.extend('Neg');
var Pos = UnaryOp.extend('Pos');
var Compare = Node.extend('Compare', {
  fields: ['expr', 'ops']
});
var CompareOperand = Node.extend('CompareOperand', {
  fields: ['expr', 'type']
});
var CallExtension = Node.extend('CallExtension', {
  init: function init(ext, prop, args, contentArgs) {
    this.parent();
    this.extName = ext.__name || ext;
    this.prop = prop;
    this.args = args || new NodeList();
    this.contentArgs = contentArgs || [];
    this.autoescape = ext.autoescape;
  },
  fields: ['extName', 'prop', 'args', 'contentArgs']
});
var CallExtensionAsync = CallExtension.extend('CallExtensionAsync'); // This is hacky, but this is just a debugging function anyway

function print(str, indent, inline) {
  var lines = str.split('\n');
  lines.forEach(function (line, i) {
    if (line && (inline && i > 0 || !inline)) {
      process.stdout.write(' '.repeat(indent));
    }

    var nl = i === lines.length - 1 ? '' : '\n';
    process.stdout.write("" + line + nl);
  });
} // Print the AST in a nicely formatted tree format for debuggin


function printNodes(node, indent) {
  indent = indent || 0;
  print(node.typename + ': ', indent);

  if (node instanceof NodeList) {
    print('\n');
    node.children.forEach(function (n) {
      printNodes(n, indent + 2);
    });
  } else if (node instanceof CallExtension) {
    print(node.extName + "." + node.prop + "\n");

    if (node.args) {
      printNodes(node.args, indent + 2);
    }

    if (node.contentArgs) {
      node.contentArgs.forEach(function (n) {
        printNodes(n, indent + 2);
      });
    }
  } else {
    var nodes = [];
    var props = null;
    node.iterFields(function (val, fieldName) {
      if (val instanceof Node) {
        nodes.push([fieldName, val]);
      } else {
        props = props || {};
        props[fieldName] = val;
      }
    });

    if (props) {
      print(JSON.stringify(props, null, 2) + '\n', null, true);
    } else {
      print('\n');
    }

    nodes.forEach(function (_ref) {
      var fieldName = _ref[0],
          n = _ref[1];
      print("[" + fieldName + "] =>", indent + 2);
      printNodes(n, indent + 4);
    });
  }
}

module.exports = {
  Node: Node,
  Root: Root,
  NodeList: NodeList,
  Value: Value,
  Literal: Literal,
  Symbol: Symbol,
  Group: Group,
  Array: ArrayNode,
  Pair: Pair,
  Dict: Dict,
  Output: Output,
  Capture: Capture,
  TemplateData: TemplateData,
  If: If,
  IfAsync: IfAsync,
  InlineIf: InlineIf,
  For: For,
  AsyncEach: AsyncEach,
  AsyncAll: AsyncAll,
  Macro: Macro,
  Caller: Caller,
  Import: Import,
  FromImport: FromImport,
  FunCall: FunCall,
  Filter: Filter,
  FilterAsync: FilterAsync,
  KeywordArgs: KeywordArgs,
  Block: Block,
  Super: Super,
  Extends: Extends,
  Include: Include,
  Set: Set,
  Switch: Switch,
  Case: Case,
  LookupVal: LookupVal,
  BinOp: BinOp,
  In: In,
  Is: Is,
  Or: Or,
  And: And,
  Not: Not,
  Add: Add,
  Concat: Concat,
  Sub: Sub,
  Mul: Mul,
  Div: Div,
  FloorDiv: FloorDiv,
  Mod: Mod,
  Pow: Pow,
  Neg: Neg,
  Pos: Pos,
  Compare: Compare,
  CompareOperand: CompareOperand,
  CallExtension: CallExtension,
  CallExtensionAsync: CallExtensionAsync,
  printNodes: printNodes
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var parser = __webpack_require__(8);

var transformer = __webpack_require__(16);

var nodes = __webpack_require__(3);

var _require = __webpack_require__(0),
    TemplateError = _require.TemplateError;

var _require2 = __webpack_require__(2),
    Frame = _require2.Frame;

var Obj = __webpack_require__(1); // These are all the same for now, but shouldn't be passed straight
// through


var compareOps = {
  '==': '==',
  '===': '===',
  '!=': '!=',
  '!==': '!==',
  '<': '<',
  '>': '>',
  '<=': '<=',
  '>=': '>='
};

var Compiler =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Compiler, _Obj);

  function Compiler() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto = Compiler.prototype;

  _proto.init = function init(templateName, throwOnUndefined) {
    this.templateName = templateName;
    this.codebuf = [];
    this.lastId = 0;
    this.buffer = null;
    this.bufferStack = [];
    this._scopeClosers = '';
    this.inBlock = false;
    this.throwOnUndefined = throwOnUndefined;
  };

  _proto.fail = function fail(msg, lineno, colno) {
    if (lineno !== undefined) {
      lineno += 1;
    }

    if (colno !== undefined) {
      colno += 1;
    }

    throw new TemplateError(msg, lineno, colno);
  };

  _proto._pushBuffer = function _pushBuffer() {
    var id = this._tmpid();

    this.bufferStack.push(this.buffer);
    this.buffer = id;

    this._emit("var " + this.buffer + " = \"\";");

    return id;
  };

  _proto._popBuffer = function _popBuffer() {
    this.buffer = this.bufferStack.pop();
  };

  _proto._emit = function _emit(code) {
    this.codebuf.push(code);
  };

  _proto._emitLine = function _emitLine(code) {
    this._emit(code + '\n');
  };

  _proto._emitLines = function _emitLines() {
    var _this = this;

    for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
      lines[_key] = arguments[_key];
    }

    lines.forEach(function (line) {
      return _this._emitLine(line);
    });
  };

  _proto._emitFuncBegin = function _emitFuncBegin(name) {
    this.buffer = 'output';
    this._scopeClosers = '';

    this._emitLine('function ' + name + '(env, context, frame, runtime, cb) {');

    this._emitLine('var lineno = null;');

    this._emitLine('var colno = null;');

    this._emitLine('var ' + this.buffer + ' = "";');

    this._emitLine('try {');
  };

  _proto._emitFuncEnd = function _emitFuncEnd(noReturn) {
    if (!noReturn) {
      this._emitLine('cb(null, ' + this.buffer + ');');
    }

    this._closeScopeLevels();

    this._emitLine('} catch (e) {');

    this._emitLine('  cb(runtime.handleError(e, lineno, colno));');

    this._emitLine('}');

    this._emitLine('}');

    this.buffer = null;
  };

  _proto._addScopeLevel = function _addScopeLevel() {
    this._scopeClosers += '})';
  };

  _proto._closeScopeLevels = function _closeScopeLevels() {
    this._emitLine(this._scopeClosers + ';');

    this._scopeClosers = '';
  };

  _proto._withScopedSyntax = function _withScopedSyntax(func) {
    var _scopeClosers = this._scopeClosers;
    this._scopeClosers = '';
    func.call(this);

    this._closeScopeLevels();

    this._scopeClosers = _scopeClosers;
  };

  _proto._makeCallback = function _makeCallback(res) {
    var err = this._tmpid();

    return 'function(' + err + (res ? ',' + res : '') + ') {\n' + 'if(' + err + ') { cb(' + err + '); return; }';
  };

  _proto._tmpid = function _tmpid() {
    this.lastId++;
    return 't_' + this.lastId;
  };

  _proto._templateName = function _templateName() {
    return this.templateName == null ? 'undefined' : JSON.stringify(this.templateName);
  };

  _proto._compileChildren = function _compileChildren(node, frame) {
    var _this2 = this;

    node.children.forEach(function (child) {
      _this2.compile(child, frame);
    });
  };

  _proto._compileAggregate = function _compileAggregate(node, frame, startChar, endChar) {
    var _this3 = this;

    if (startChar) {
      this._emit(startChar);
    }

    node.children.forEach(function (child, i) {
      if (i > 0) {
        _this3._emit(',');
      }

      _this3.compile(child, frame);
    });

    if (endChar) {
      this._emit(endChar);
    }
  };

  _proto._compileExpression = function _compileExpression(node, frame) {
    // TODO: I'm not really sure if this type check is worth it or
    // not.
    this.assertType(node, nodes.Literal, nodes.Symbol, nodes.Group, nodes.Array, nodes.Dict, nodes.FunCall, nodes.Caller, nodes.Filter, nodes.LookupVal, nodes.Compare, nodes.InlineIf, nodes.In, nodes.And, nodes.Or, nodes.Not, nodes.Add, nodes.Concat, nodes.Sub, nodes.Mul, nodes.Div, nodes.FloorDiv, nodes.Mod, nodes.Pow, nodes.Neg, nodes.Pos, nodes.Compare, nodes.NodeList);
    this.compile(node, frame);
  };

  _proto.assertType = function assertType(node) {
    for (var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      types[_key2 - 1] = arguments[_key2];
    }

    if (!types.some(function (t) {
      return node instanceof t;
    })) {
      this.fail("assertType: invalid type: " + node.typename, node.lineno, node.colno);
    }
  };

  _proto.compileCallExtension = function compileCallExtension(node, frame, async) {
    var _this4 = this;

    var args = node.args;
    var contentArgs = node.contentArgs;
    var autoescape = typeof node.autoescape === 'boolean' ? node.autoescape : true;

    if (!async) {
      this._emit(this.buffer + " += runtime.suppressValue(");
    }

    this._emit("env.getExtension(\"" + node.extName + "\")[\"" + node.prop + "\"](");

    this._emit('context');

    if (args || contentArgs) {
      this._emit(',');
    }

    if (args) {
      if (!(args instanceof nodes.NodeList)) {
        this.fail('compileCallExtension: arguments must be a NodeList, ' + 'use `parser.parseSignature`');
      }

      args.children.forEach(function (arg, i) {
        // Tag arguments are passed normally to the call. Note
        // that keyword arguments are turned into a single js
        // object as the last argument, if they exist.
        _this4._compileExpression(arg, frame);

        if (i !== args.children.length - 1 || contentArgs.length) {
          _this4._emit(',');
        }
      });
    }

    if (contentArgs.length) {
      contentArgs.forEach(function (arg, i) {
        if (i > 0) {
          _this4._emit(',');
        }

        if (arg) {
          _this4._emitLine('function(cb) {');

          _this4._emitLine('if(!cb) { cb = function(err) { if(err) { throw err; }}}');

          var id = _this4._pushBuffer();

          _this4._withScopedSyntax(function () {
            _this4.compile(arg, frame);

            _this4._emitLine("cb(null, " + id + ");");
          });

          _this4._popBuffer();

          _this4._emitLine("return " + id + ";");

          _this4._emitLine('}');
        } else {
          _this4._emit('null');
        }
      });
    }

    if (async) {
      var res = this._tmpid();

      this._emitLine(', ' + this._makeCallback(res));

      this._emitLine(this.buffer + " += runtime.suppressValue(" + res + ", " + autoescape + " && env.opts.autoescape);");

      this._addScopeLevel();
    } else {
      this._emit(')');

      this._emit(", " + autoescape + " && env.opts.autoescape);\n");
    }
  };

  _proto.compileCallExtensionAsync = function compileCallExtensionAsync(node, frame) {
    this.compileCallExtension(node, frame, true);
  };

  _proto.compileNodeList = function compileNodeList(node, frame) {
    this._compileChildren(node, frame);
  };

  _proto.compileLiteral = function compileLiteral(node) {
    if (typeof node.value === 'string') {
      var val = node.value.replace(/\\/g, '\\\\');
      val = val.replace(/"/g, '\\"');
      val = val.replace(/\n/g, '\\n');
      val = val.replace(/\r/g, '\\r');
      val = val.replace(/\t/g, '\\t');

      this._emit("\"" + val + "\"");
    } else if (node.value === null) {
      this._emit('null');
    } else {
      this._emit(node.value.toString());
    }
  };

  _proto.compileSymbol = function compileSymbol(node, frame) {
    var name = node.value;
    var v = frame.lookup(name);

    if (v) {
      this._emit(v);
    } else {
      this._emit('runtime.contextOrFrameLookup(' + 'context, frame, "' + name + '")');
    }
  };

  _proto.compileGroup = function compileGroup(node, frame) {
    this._compileAggregate(node, frame, '(', ')');
  };

  _proto.compileArray = function compileArray(node, frame) {
    this._compileAggregate(node, frame, '[', ']');
  };

  _proto.compileDict = function compileDict(node, frame) {
    this._compileAggregate(node, frame, '{', '}');
  };

  _proto.compilePair = function compilePair(node, frame) {
    var key = node.key;
    var val = node.value;

    if (key instanceof nodes.Symbol) {
      key = new nodes.Literal(key.lineno, key.colno, key.value);
    } else if (!(key instanceof nodes.Literal && typeof key.value === 'string')) {
      this.fail('compilePair: Dict keys must be strings or names', key.lineno, key.colno);
    }

    this.compile(key, frame);

    this._emit(': ');

    this._compileExpression(val, frame);
  };

  _proto.compileInlineIf = function compileInlineIf(node, frame) {
    this._emit('(');

    this.compile(node.cond, frame);

    this._emit('?');

    this.compile(node.body, frame);

    this._emit(':');

    if (node.else_ !== null) {
      this.compile(node.else_, frame);
    } else {
      this._emit('""');
    }

    this._emit(')');
  };

  _proto.compileIn = function compileIn(node, frame) {
    this._emit('runtime.inOperator(');

    this.compile(node.left, frame);

    this._emit(',');

    this.compile(node.right, frame);

    this._emit(')');
  };

  _proto.compileIs = function compileIs(node, frame) {
    // first, we need to try to get the name of the test function, if it's a
    // callable (i.e., has args) and not a symbol.
    var right = node.right.name ? node.right.name.value // otherwise go with the symbol value
    : node.right.value;

    this._emit('env.getTest("' + right + '").call(context, ');

    this.compile(node.left, frame); // compile the arguments for the callable if they exist

    if (node.right.args) {
      this._emit(',');

      this.compile(node.right.args, frame);
    }

    this._emit(') === true');
  };

  _proto._binOpEmitter = function _binOpEmitter(node, frame, str) {
    this.compile(node.left, frame);

    this._emit(str);

    this.compile(node.right, frame);
  }; // ensure concatenation instead of addition
  // by adding empty string in between


  _proto.compileOr = function compileOr(node, frame) {
    return this._binOpEmitter(node, frame, ' || ');
  };

  _proto.compileAnd = function compileAnd(node, frame) {
    return this._binOpEmitter(node, frame, ' && ');
  };

  _proto.compileAdd = function compileAdd(node, frame) {
    return this._binOpEmitter(node, frame, ' + ');
  };

  _proto.compileConcat = function compileConcat(node, frame) {
    return this._binOpEmitter(node, frame, ' + "" + ');
  };

  _proto.compileSub = function compileSub(node, frame) {
    return this._binOpEmitter(node, frame, ' - ');
  };

  _proto.compileMul = function compileMul(node, frame) {
    return this._binOpEmitter(node, frame, ' * ');
  };

  _proto.compileDiv = function compileDiv(node, frame) {
    return this._binOpEmitter(node, frame, ' / ');
  };

  _proto.compileMod = function compileMod(node, frame) {
    return this._binOpEmitter(node, frame, ' % ');
  };

  _proto.compileNot = function compileNot(node, frame) {
    this._emit('!');

    this.compile(node.target, frame);
  };

  _proto.compileFloorDiv = function compileFloorDiv(node, frame) {
    this._emit('Math.floor(');

    this.compile(node.left, frame);

    this._emit(' / ');

    this.compile(node.right, frame);

    this._emit(')');
  };

  _proto.compilePow = function compilePow(node, frame) {
    this._emit('Math.pow(');

    this.compile(node.left, frame);

    this._emit(', ');

    this.compile(node.right, frame);

    this._emit(')');
  };

  _proto.compileNeg = function compileNeg(node, frame) {
    this._emit('-');

    this.compile(node.target, frame);
  };

  _proto.compilePos = function compilePos(node, frame) {
    this._emit('+');

    this.compile(node.target, frame);
  };

  _proto.compileCompare = function compileCompare(node, frame) {
    var _this5 = this;

    this.compile(node.expr, frame);
    node.ops.forEach(function (op) {
      _this5._emit(" " + compareOps[op.type] + " ");

      _this5.compile(op.expr, frame);
    });
  };

  _proto.compileLookupVal = function compileLookupVal(node, frame) {
    this._emit('runtime.memberLookup((');

    this._compileExpression(node.target, frame);

    this._emit('),');

    this._compileExpression(node.val, frame);

    this._emit(')');
  };

  _proto._getNodeName = function _getNodeName(node) {
    switch (node.typename) {
      case 'Symbol':
        return node.value;

      case 'FunCall':
        return 'the return value of (' + this._getNodeName(node.name) + ')';

      case 'LookupVal':
        return this._getNodeName(node.target) + '["' + this._getNodeName(node.val) + '"]';

      case 'Literal':
        return node.value.toString();

      default:
        return '--expression--';
    }
  };

  _proto.compileFunCall = function compileFunCall(node, frame) {
    // Keep track of line/col info at runtime by settings
    // variables within an expression. An expression in javascript
    // like (x, y, z) returns the last value, and x and y can be
    // anything
    this._emit('(lineno = ' + node.lineno + ', colno = ' + node.colno + ', ');

    this._emit('runtime.callWrap('); // Compile it as normal.


    this._compileExpression(node.name, frame); // Output the name of what we're calling so we can get friendly errors
    // if the lookup fails.


    this._emit(', "' + this._getNodeName(node.name).replace(/"/g, '\\"') + '", context, ');

    this._compileAggregate(node.args, frame, '[', '])');

    this._emit(')');
  };

  _proto.compileFilter = function compileFilter(node, frame) {
    var name = node.name;
    this.assertType(name, nodes.Symbol);

    this._emit('env.getFilter("' + name.value + '").call(context, ');

    this._compileAggregate(node.args, frame);

    this._emit(')');
  };

  _proto.compileFilterAsync = function compileFilterAsync(node, frame) {
    var name = node.name;
    var symbol = node.symbol.value;
    this.assertType(name, nodes.Symbol);
    frame.set(symbol, symbol);

    this._emit('env.getFilter("' + name.value + '").call(context, ');

    this._compileAggregate(node.args, frame);

    this._emitLine(', ' + this._makeCallback(symbol));

    this._addScopeLevel();
  };

  _proto.compileKeywordArgs = function compileKeywordArgs(node, frame) {
    this._emit('runtime.makeKeywordArgs(');

    this.compileDict(node, frame);

    this._emit(')');
  };

  _proto.compileSet = function compileSet(node, frame) {
    var _this6 = this;

    var ids = []; // Lookup the variable names for each identifier and create
    // new ones if necessary

    node.targets.forEach(function (target) {
      var name = target.value;
      var id = frame.lookup(name);

      if (id === null || id === undefined) {
        id = _this6._tmpid(); // Note: This relies on js allowing scope across
        // blocks, in case this is created inside an `if`

        _this6._emitLine('var ' + id + ';');
      }

      ids.push(id);
    });

    if (node.value) {
      this._emit(ids.join(' = ') + ' = ');

      this._compileExpression(node.value, frame);

      this._emitLine(';');
    } else {
      this._emit(ids.join(' = ') + ' = ');

      this.compile(node.body, frame);

      this._emitLine(';');
    }

    node.targets.forEach(function (target, i) {
      var id = ids[i];
      var name = target.value; // We are running this for every var, but it's very
      // uncommon to assign to multiple vars anyway

      _this6._emitLine("frame.set(\"" + name + "\", " + id + ", true);");

      _this6._emitLine('if(frame.topLevel) {');

      _this6._emitLine("context.setVariable(\"" + name + "\", " + id + ");");

      _this6._emitLine('}');

      if (name.charAt(0) !== '_') {
        _this6._emitLine('if(frame.topLevel) {');

        _this6._emitLine("context.addExport(\"" + name + "\", " + id + ");");

        _this6._emitLine('}');
      }
    });
  };

  _proto.compileSwitch = function compileSwitch(node, frame) {
    var _this7 = this;

    this._emit('switch (');

    this.compile(node.expr, frame);

    this._emit(') {');

    node.cases.forEach(function (c, i) {
      _this7._emit('case ');

      _this7.compile(c.cond, frame);

      _this7._emit(': ');

      _this7.compile(c.body, frame); // preserve fall-throughs


      if (c.body.children.length) {
        _this7._emitLine('break;');
      }
    });

    if (node.default) {
      this._emit('default:');

      this.compile(node.default, frame);
    }

    this._emit('}');
  };

  _proto.compileIf = function compileIf(node, frame, async) {
    var _this8 = this;

    this._emit('if(');

    this._compileExpression(node.cond, frame);

    this._emitLine(') {');

    this._withScopedSyntax(function () {
      _this8.compile(node.body, frame);

      if (async) {
        _this8._emit('cb()');
      }
    });

    if (node.else_) {
      this._emitLine('}\nelse {');

      this._withScopedSyntax(function () {
        _this8.compile(node.else_, frame);

        if (async) {
          _this8._emit('cb()');
        }
      });
    } else if (async) {
      this._emitLine('}\nelse {');

      this._emit('cb()');
    }

    this._emitLine('}');
  };

  _proto.compileIfAsync = function compileIfAsync(node, frame) {
    this._emit('(function(cb) {');

    this.compileIf(node, frame, true);

    this._emit('})(' + this._makeCallback());

    this._addScopeLevel();
  };

  _proto._emitLoopBindings = function _emitLoopBindings(node, arr, i, len) {
    var _this9 = this;

    var bindings = [{
      name: 'index',
      val: i + " + 1"
    }, {
      name: 'index0',
      val: i
    }, {
      name: 'revindex',
      val: len + " - " + i
    }, {
      name: 'revindex0',
      val: len + " - " + i + " - 1"
    }, {
      name: 'first',
      val: i + " === 0"
    }, {
      name: 'last',
      val: i + " === " + len + " - 1"
    }, {
      name: 'length',
      val: len
    }];
    bindings.forEach(function (b) {
      _this9._emitLine("frame.set(\"loop." + b.name + "\", " + b.val + ");");
    });
  };

  _proto.compileFor = function compileFor(node, frame) {
    var _this10 = this;

    // Some of this code is ugly, but it keeps the generated code
    // as fast as possible. ForAsync also shares some of this, but
    // not much.
    var i = this._tmpid();

    var len = this._tmpid();

    var arr = this._tmpid();

    frame = frame.push();

    this._emitLine('frame = frame.push();');

    this._emit("var " + arr + " = ");

    this._compileExpression(node.arr, frame);

    this._emitLine(';');

    this._emit("if(" + arr + ") {");

    this._emitLine(arr + ' = runtime.fromIterator(' + arr + ');'); // If multiple names are passed, we need to bind them
    // appropriately


    if (node.name instanceof nodes.Array) {
      this._emitLine("var " + i + ";"); // The object could be an arroy or object. Note that the
      // body of the loop is duplicated for each condition, but
      // we are optimizing for speed over size.


      this._emitLine("if(runtime.isArray(" + arr + ")) {");

      this._emitLine("var " + len + " = " + arr + ".length;");

      this._emitLine("for(" + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {"); // Bind each declared var


      node.name.children.forEach(function (child, u) {
        var tid = _this10._tmpid();

        _this10._emitLine("var " + tid + " = " + arr + "[" + i + "][" + u + "];");

        _this10._emitLine("frame.set(\"" + child + "\", " + arr + "[" + i + "][" + u + "]);");

        frame.set(node.name.children[u].value, tid);
      });

      this._emitLoopBindings(node, arr, i, len);

      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });

      this._emitLine('}');

      this._emitLine('} else {'); // Iterate over the key/values of an object


      var _node$name$children = node.name.children,
          key = _node$name$children[0],
          val = _node$name$children[1];

      var k = this._tmpid();

      var v = this._tmpid();

      frame.set(key.value, k);
      frame.set(val.value, v);

      this._emitLine(i + " = -1;");

      this._emitLine("var " + len + " = runtime.keys(" + arr + ").length;");

      this._emitLine("for(var " + k + " in " + arr + ") {");

      this._emitLine(i + "++;");

      this._emitLine("var " + v + " = " + arr + "[" + k + "];");

      this._emitLine("frame.set(\"" + key.value + "\", " + k + ");");

      this._emitLine("frame.set(\"" + val.value + "\", " + v + ");");

      this._emitLoopBindings(node, arr, i, len);

      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });

      this._emitLine('}');

      this._emitLine('}');
    } else {
      // Generate a typical array iteration
      var _v = this._tmpid();

      frame.set(node.name.value, _v);

      this._emitLine("var " + len + " = " + arr + ".length;");

      this._emitLine("for(var " + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");

      this._emitLine("var " + _v + " = " + arr + "[" + i + "];");

      this._emitLine("frame.set(\"" + node.name.value + "\", " + _v + ");");

      this._emitLoopBindings(node, arr, i, len);

      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });

      this._emitLine('}');
    }

    this._emitLine('}');

    if (node.else_) {
      this._emitLine('if (!' + len + ') {');

      this.compile(node.else_, frame);

      this._emitLine('}');
    }

    this._emitLine('frame = frame.pop();');
  };

  _proto._compileAsyncLoop = function _compileAsyncLoop(node, frame, parallel) {
    var _this11 = this;

    // This shares some code with the For tag, but not enough to
    // worry about. This iterates across an object asynchronously,
    // but not in parallel.
    var i = this._tmpid();

    var len = this._tmpid();

    var arr = this._tmpid();

    var asyncMethod = parallel ? 'asyncAll' : 'asyncEach';
    frame = frame.push();

    this._emitLine('frame = frame.push();');

    this._emit('var ' + arr + ' = runtime.fromIterator(');

    this._compileExpression(node.arr, frame);

    this._emitLine(');');

    if (node.name instanceof nodes.Array) {
      var arrayLen = node.name.children.length;

      this._emit("runtime." + asyncMethod + "(" + arr + ", " + arrayLen + ", function(");

      node.name.children.forEach(function (name) {
        _this11._emit(name.value + ",");
      });

      this._emit(i + ',' + len + ',next) {');

      node.name.children.forEach(function (name) {
        var id = name.value;
        frame.set(id, id);

        _this11._emitLine("frame.set(\"" + id + "\", " + id + ");");
      });
    } else {
      var id = node.name.value;

      this._emitLine("runtime." + asyncMethod + "(" + arr + ", 1, function(" + id + ", " + i + ", " + len + ",next) {");

      this._emitLine('frame.set("' + id + '", ' + id + ');');

      frame.set(id, id);
    }

    this._emitLoopBindings(node, arr, i, len);

    this._withScopedSyntax(function () {
      var buf;

      if (parallel) {
        buf = _this11._pushBuffer();
      }

      _this11.compile(node.body, frame);

      _this11._emitLine('next(' + i + (buf ? ',' + buf : '') + ');');

      if (parallel) {
        _this11._popBuffer();
      }
    });

    var output = this._tmpid();

    this._emitLine('}, ' + this._makeCallback(output));

    this._addScopeLevel();

    if (parallel) {
      this._emitLine(this.buffer + ' += ' + output + ';');
    }

    if (node.else_) {
      this._emitLine('if (!' + arr + '.length) {');

      this.compile(node.else_, frame);

      this._emitLine('}');
    }

    this._emitLine('frame = frame.pop();');
  };

  _proto.compileAsyncEach = function compileAsyncEach(node, frame) {
    this._compileAsyncLoop(node, frame);
  };

  _proto.compileAsyncAll = function compileAsyncAll(node, frame) {
    this._compileAsyncLoop(node, frame, true);
  };

  _proto._compileMacro = function _compileMacro(node, frame) {
    var _this12 = this;

    var args = [];
    var kwargs = null;

    var funcId = 'macro_' + this._tmpid();

    var keepFrame = frame !== undefined; // Type check the definition of the args

    node.args.children.forEach(function (arg, i) {
      if (i === node.args.children.length - 1 && arg instanceof nodes.Dict) {
        kwargs = arg;
      } else {
        _this12.assertType(arg, nodes.Symbol);

        args.push(arg);
      }
    });
    var realNames = args.map(function (n) {
      return "l_" + n.value;
    }).concat(['kwargs']); // Quoted argument names

    var argNames = args.map(function (n) {
      return "\"" + n.value + "\"";
    });
    var kwargNames = (kwargs && kwargs.children || []).map(function (n) {
      return "\"" + n.key.value + "\"";
    }); // We pass a function to makeMacro which destructures the
    // arguments so support setting positional args with keywords
    // args and passing keyword args as positional args
    // (essentially default values). See runtime.js.

    var currFrame;

    if (keepFrame) {
      currFrame = frame.push(true);
    } else {
      currFrame = new Frame();
    }

    this._emitLines("var " + funcId + " = runtime.makeMacro(", "[" + argNames.join(', ') + "], ", "[" + kwargNames.join(', ') + "], ", "function (" + realNames.join(', ') + ") {", 'var callerFrame = frame;', 'frame = ' + (keepFrame ? 'frame.push(true);' : 'new runtime.Frame();'), 'kwargs = kwargs || {};', 'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {', 'frame.set("caller", kwargs.caller); }'); // Expose the arguments to the template. Don't need to use
    // random names because the function
    // will create a new run-time scope for us


    args.forEach(function (arg) {
      _this12._emitLine("frame.set(\"" + arg.value + "\", l_" + arg.value + ");");

      currFrame.set(arg.value, "l_" + arg.value);
    }); // Expose the keyword arguments

    if (kwargs) {
      kwargs.children.forEach(function (pair) {
        var name = pair.key.value;

        _this12._emit("frame.set(\"" + name + "\", ");

        _this12._emit("Object.prototype.hasOwnProperty.call(kwargs, \"" + name + "\")");

        _this12._emit(" ? kwargs[\"" + name + "\"] : ");

        _this12._compileExpression(pair.value, currFrame);

        _this12._emit(');');
      });
    }

    var bufferId = this._pushBuffer();

    this._withScopedSyntax(function () {
      _this12.compile(node.body, currFrame);
    });

    this._emitLine('frame = ' + (keepFrame ? 'frame.pop();' : 'callerFrame;'));

    this._emitLine("return new runtime.SafeString(" + bufferId + ");");

    this._emitLine('});');

    this._popBuffer();

    return funcId;
  };

  _proto.compileMacro = function compileMacro(node, frame) {
    var funcId = this._compileMacro(node); // Expose the macro to the templates


    var name = node.name.value;
    frame.set(name, funcId);

    if (frame.parent) {
      this._emitLine("frame.set(\"" + name + "\", " + funcId + ");");
    } else {
      if (node.name.value.charAt(0) !== '_') {
        this._emitLine("context.addExport(\"" + name + "\");");
      }

      this._emitLine("context.setVariable(\"" + name + "\", " + funcId + ");");
    }
  };

  _proto.compileCaller = function compileCaller(node, frame) {
    // basically an anonymous "macro expression"
    this._emit('(function (){');

    var funcId = this._compileMacro(node, frame);

    this._emit("return " + funcId + ";})()");
  };

  _proto._compileGetTemplate = function _compileGetTemplate(node, frame, eagerCompile, ignoreMissing) {
    var parentTemplateId = this._tmpid();

    var parentName = this._templateName();

    var cb = this._makeCallback(parentTemplateId);

    var eagerCompileArg = eagerCompile ? 'true' : 'false';
    var ignoreMissingArg = ignoreMissing ? 'true' : 'false';

    this._emit('env.getTemplate(');

    this._compileExpression(node.template, frame);

    this._emitLine(", " + eagerCompileArg + ", " + parentName + ", " + ignoreMissingArg + ", " + cb);

    return parentTemplateId;
  };

  _proto.compileImport = function compileImport(node, frame) {
    var target = node.target.value;

    var id = this._compileGetTemplate(node, frame, false, false);

    this._addScopeLevel();

    this._emitLine(id + '.getExported(' + (node.withContext ? 'context.getVariables(), frame, ' : '') + this._makeCallback(id));

    this._addScopeLevel();

    frame.set(target, id);

    if (frame.parent) {
      this._emitLine("frame.set(\"" + target + "\", " + id + ");");
    } else {
      this._emitLine("context.setVariable(\"" + target + "\", " + id + ");");
    }
  };

  _proto.compileFromImport = function compileFromImport(node, frame) {
    var _this13 = this;

    var importedId = this._compileGetTemplate(node, frame, false, false);

    this._addScopeLevel();

    this._emitLine(importedId + '.getExported(' + (node.withContext ? 'context.getVariables(), frame, ' : '') + this._makeCallback(importedId));

    this._addScopeLevel();

    node.names.children.forEach(function (nameNode) {
      var name;
      var alias;

      var id = _this13._tmpid();

      if (nameNode instanceof nodes.Pair) {
        name = nameNode.key.value;
        alias = nameNode.value.value;
      } else {
        name = nameNode.value;
        alias = name;
      }

      _this13._emitLine("if(Object.prototype.hasOwnProperty.call(" + importedId + ", \"" + name + "\")) {");

      _this13._emitLine("var " + id + " = " + importedId + "." + name + ";");

      _this13._emitLine('} else {');

      _this13._emitLine("cb(new Error(\"cannot import '" + name + "'\")); return;");

      _this13._emitLine('}');

      frame.set(alias, id);

      if (frame.parent) {
        _this13._emitLine("frame.set(\"" + alias + "\", " + id + ");");
      } else {
        _this13._emitLine("context.setVariable(\"" + alias + "\", " + id + ");");
      }
    });
  };

  _proto.compileBlock = function compileBlock(node) {
    var id = this._tmpid(); // If we are executing outside a block (creating a top-level
    // block), we really don't want to execute its code because it
    // will execute twice: once when the child template runs and
    // again when the parent template runs. Note that blocks
    // within blocks will *always* execute immediately *and*
    // wherever else they are invoked (like used in a parent
    // template). This may have behavioral differences from jinja
    // because blocks can have side effects, but it seems like a
    // waste of performance to always execute huge top-level
    // blocks twice


    if (!this.inBlock) {
      this._emit('(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : ');
    }

    this._emit("context.getBlock(\"" + node.name.value + "\")");

    if (!this.inBlock) {
      this._emit(')');
    }

    this._emitLine('(env, context, frame, runtime, ' + this._makeCallback(id));

    this._emitLine(this.buffer + " += " + id + ";");

    this._addScopeLevel();
  };

  _proto.compileSuper = function compileSuper(node, frame) {
    var name = node.blockName.value;
    var id = node.symbol.value;

    var cb = this._makeCallback(id);

    this._emitLine("context.getSuper(env, \"" + name + "\", b_" + name + ", frame, runtime, " + cb);

    this._emitLine(id + " = runtime.markSafe(" + id + ");");

    this._addScopeLevel();

    frame.set(id, id);
  };

  _proto.compileExtends = function compileExtends(node, frame) {
    var k = this._tmpid();

    var parentTemplateId = this._compileGetTemplate(node, frame, true, false); // extends is a dynamic tag and can occur within a block like
    // `if`, so if this happens we need to capture the parent
    // template in the top-level scope


    this._emitLine("parentTemplate = " + parentTemplateId);

    this._emitLine("for(var " + k + " in parentTemplate.blocks) {");

    this._emitLine("context.addBlock(" + k + ", parentTemplate.blocks[" + k + "]);");

    this._emitLine('}');

    this._addScopeLevel();
  };

  _proto.compileInclude = function compileInclude(node, frame) {
    this._emitLine('var tasks = [];');

    this._emitLine('tasks.push(');

    this._emitLine('function(callback) {');

    var id = this._compileGetTemplate(node, frame, false, node.ignoreMissing);

    this._emitLine("callback(null," + id + ");});");

    this._emitLine('});');

    var id2 = this._tmpid();

    this._emitLine('tasks.push(');

    this._emitLine('function(template, callback){');

    this._emitLine('template.render(context.getVariables(), frame, ' + this._makeCallback(id2));

    this._emitLine('callback(null,' + id2 + ');});');

    this._emitLine('});');

    this._emitLine('tasks.push(');

    this._emitLine('function(result, callback){');

    this._emitLine(this.buffer + " += result;");

    this._emitLine('callback(null);');

    this._emitLine('});');

    this._emitLine('env.waterfall(tasks, function(){');

    this._addScopeLevel();
  };

  _proto.compileTemplateData = function compileTemplateData(node, frame) {
    this.compileLiteral(node, frame);
  };

  _proto.compileCapture = function compileCapture(node, frame) {
    var _this14 = this;

    // we need to temporarily override the current buffer id as 'output'
    // so the set block writes to the capture output instead of the buffer
    var buffer = this.buffer;
    this.buffer = 'output';

    this._emitLine('(function() {');

    this._emitLine('var output = "";');

    this._withScopedSyntax(function () {
      _this14.compile(node.body, frame);
    });

    this._emitLine('return output;');

    this._emitLine('})()'); // and of course, revert back to the old buffer id


    this.buffer = buffer;
  };

  _proto.compileOutput = function compileOutput(node, frame) {
    var _this15 = this;

    var children = node.children;
    children.forEach(function (child) {
      // TemplateData is a special case because it is never
      // autoescaped, so simply output it for optimization
      if (child instanceof nodes.TemplateData) {
        if (child.value) {
          _this15._emit(_this15.buffer + " += ");

          _this15.compileLiteral(child, frame);

          _this15._emitLine(';');
        }
      } else {
        _this15._emit(_this15.buffer + " += runtime.suppressValue(");

        if (_this15.throwOnUndefined) {
          _this15._emit('runtime.ensureDefined(');
        }

        _this15.compile(child, frame);

        if (_this15.throwOnUndefined) {
          _this15._emit("," + node.lineno + "," + node.colno + ")");
        }

        _this15._emit(', env.opts.autoescape);\n');
      }
    });
  };

  _proto.compileRoot = function compileRoot(node, frame) {
    var _this16 = this;

    if (frame) {
      this.fail('compileRoot: root node can\'t have frame');
    }

    frame = new Frame();

    this._emitFuncBegin('root');

    this._emitLine('var parentTemplate = null;');

    this._compileChildren(node, frame);

    this._emitLine('if(parentTemplate) {');

    this._emitLine('parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);');

    this._emitLine('} else {');

    this._emitLine("cb(null, " + this.buffer + ");");

    this._emitLine('}');

    this._emitFuncEnd(true);

    this.inBlock = true;
    var blockNames = [];
    var blocks = node.findAll(nodes.Block);
    blocks.forEach(function (block, i) {
      var name = block.name.value;

      if (blockNames.indexOf(name) !== -1) {
        throw new Error("Block \"" + name + "\" defined more than once.");
      }

      blockNames.push(name);

      _this16._emitFuncBegin("b_" + name);

      var tmpFrame = new Frame();

      _this16._emitLine('var frame = frame.push(true);');

      _this16.compile(block.body, tmpFrame);

      _this16._emitFuncEnd();
    });

    this._emitLine('return {');

    blocks.forEach(function (block, i) {
      var blockName = "b_" + block.name.value;

      _this16._emitLine(blockName + ": " + blockName + ",");
    });

    this._emitLine('root: root\n};');
  };

  _proto.compile = function compile(node, frame) {
    var _compile = this['compile' + node.typename];

    if (_compile) {
      _compile.call(this, node, frame);
    } else {
      this.fail("compile: Cannot compile node: " + node.typename, node.lineno, node.colno);
    }
  };

  _proto.getCode = function getCode() {
    return this.codebuf.join('');
  };

  return Compiler;
}(Obj);

module.exports = {
  compile: function compile(src, asyncFilters, extensions, name, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var c = new Compiler(name, opts.throwOnUndefined); // Run the extension preprocessors against the source.

    var preprocessors = (extensions || []).map(function (ext) {
      return ext.preprocess;
    }).filter(function (f) {
      return !!f;
    });
    var processedSrc = preprocessors.reduce(function (s, processor) {
      return processor(s);
    }, src);
    c.compile(transformer.transform(parser.parse(processedSrc, extensions, opts), asyncFilters, name));
    return c.getCode();
  },
  Compiler: Compiler
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var path = __webpack_require__(4);

var Obj = __webpack_require__(1);

module.exports =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Loader, _Obj);

  function Loader() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto = Loader.prototype;

  _proto.on = function on(name, func) {
    this.listeners = this.listeners || {};
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(func);
  };

  _proto.emit = function emit(name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.listeners && this.listeners[name]) {
      this.listeners[name].forEach(function (listener) {
        listener.apply(void 0, args);
      });
    }
  };

  _proto.resolve = function resolve(from, to) {
    return path.resolve(path.dirname(from), to);
  };

  _proto.isRelative = function isRelative(filename) {
    return filename.indexOf('./') === 0 || filename.indexOf('../') === 0;
  };

  return Loader;
}(Obj);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var asap = __webpack_require__(12);

var _waterfall = __webpack_require__(15);

var lib = __webpack_require__(0);

var compiler = __webpack_require__(5);

var filters = __webpack_require__(17);

var _require = __webpack_require__(10),
    FileSystemLoader = _require.FileSystemLoader,
    WebLoader = _require.WebLoader,
    PrecompiledLoader = _require.PrecompiledLoader;

var tests = __webpack_require__(19);

var globals = __webpack_require__(20);

var Obj = __webpack_require__(1);

var globalRuntime = __webpack_require__(2);

var handleError = globalRuntime.handleError,
    Frame = globalRuntime.Frame;

var expressApp = __webpack_require__(21); // If the user is using the async API, *always* call it
// asynchronously even if the template was synchronous.


function callbackAsap(cb, err, res) {
  asap(function () {
    cb(err, res);
  });
}
/**
 * A no-op template, for use with {% include ignore missing %}
 */


var noopTmplSrc = {
  type: 'code',
  obj: {
    root: function root(env, context, frame, runtime, cb) {
      try {
        cb(null, '');
      } catch (e) {
        cb(handleError(e, null, null));
      }
    }
  }
};

var Environment =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Environment, _Obj);

  function Environment() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto = Environment.prototype;

  _proto.init = function init(loaders, opts) {
    var _this = this;

    // The dev flag determines the trace that'll be shown on errors.
    // If set to true, returns the full trace from the error point,
    // otherwise will return trace starting from Template.render
    // (the full trace from within nunjucks may confuse developers using
    //  the library)
    // defaults to false
    opts = this.opts = opts || {};
    this.opts.dev = !!opts.dev; // The autoescape flag sets global autoescaping. If true,
    // every string variable will be escaped by default.
    // If false, strings can be manually escaped using the `escape` filter.
    // defaults to true

    this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true; // If true, this will make the system throw errors if trying
    // to output a null or undefined value

    this.opts.throwOnUndefined = !!opts.throwOnUndefined;
    this.opts.trimBlocks = !!opts.trimBlocks;
    this.opts.lstripBlocks = !!opts.lstripBlocks;
    this.loaders = [];

    if (!loaders) {
      // The filesystem loader is only available server-side
      if (FileSystemLoader) {
        this.loaders = [new FileSystemLoader('views')];
      } else if (WebLoader) {
        this.loaders = [new WebLoader('/views')];
      }
    } else {
      this.loaders = lib.isArray(loaders) ? loaders : [loaders];
    } // It's easy to use precompiled templates: just include them
    // before you configure nunjucks and this will automatically
    // pick it up and use it


    if (typeof window !== 'undefined' && window.nunjucksPrecompiled) {
      this.loaders.unshift(new PrecompiledLoader(window.nunjucksPrecompiled));
    }

    this.initCache();
    this.globals = globals();
    this.filters = {};
    this.tests = {};
    this.asyncFilters = [];
    this.extensions = {};
    this.extensionsList = [];

    lib._entries(filters).forEach(function (_ref) {
      var name = _ref[0],
          filter = _ref[1];
      return _this.addFilter(name, filter);
    });

    lib._entries(tests).forEach(function (_ref2) {
      var name = _ref2[0],
          test = _ref2[1];
      return _this.addTest(name, test);
    });
  };

  _proto.initCache = function initCache() {
    // Caching and cache busting
    this.loaders.forEach(function (loader) {
      loader.cache = {};

      if (typeof loader.on === 'function') {
        loader.on('update', function (template) {
          loader.cache[template] = null;
        });
      }
    });
  };

  _proto.addExtension = function addExtension(name, extension) {
    extension.__name = name;
    this.extensions[name] = extension;
    this.extensionsList.push(extension);
    return this;
  };

  _proto.removeExtension = function removeExtension(name) {
    var extension = this.getExtension(name);

    if (!extension) {
      return;
    }

    this.extensionsList = lib.without(this.extensionsList, extension);
    delete this.extensions[name];
  };

  _proto.getExtension = function getExtension(name) {
    return this.extensions[name];
  };

  _proto.hasExtension = function hasExtension(name) {
    return !!this.extensions[name];
  };

  _proto.addGlobal = function addGlobal(name, value) {
    this.globals[name] = value;
    return this;
  };

  _proto.getGlobal = function getGlobal(name) {
    if (typeof this.globals[name] === 'undefined') {
      throw new Error('global not found: ' + name);
    }

    return this.globals[name];
  };

  _proto.addFilter = function addFilter(name, func, async) {
    var wrapped = func;

    if (async) {
      this.asyncFilters.push(name);
    }

    this.filters[name] = wrapped;
    return this;
  };

  _proto.getFilter = function getFilter(name) {
    if (!this.filters[name]) {
      throw new Error('filter not found: ' + name);
    }

    return this.filters[name];
  };

  _proto.addTest = function addTest(name, func) {
    this.tests[name] = func;
    return this;
  };

  _proto.getTest = function getTest(name) {
    if (!this.tests[name]) {
      throw new Error('test not found: ' + name);
    }

    return this.tests[name];
  };

  _proto.resolveTemplate = function resolveTemplate(loader, parentName, filename) {
    var isRelative = loader.isRelative && parentName ? loader.isRelative(filename) : false;
    return isRelative && loader.resolve ? loader.resolve(parentName, filename) : filename;
  };

  _proto.getTemplate = function getTemplate(name, eagerCompile, parentName, ignoreMissing, cb) {
    var _this2 = this;

    var that = this;
    var tmpl = null;

    if (name && name.raw) {
      // this fixes autoescape for templates referenced in symbols
      name = name.raw;
    }

    if (lib.isFunction(parentName)) {
      cb = parentName;
      parentName = null;
      eagerCompile = eagerCompile || false;
    }

    if (lib.isFunction(eagerCompile)) {
      cb = eagerCompile;
      eagerCompile = false;
    }

    if (name instanceof Template) {
      tmpl = name;
    } else if (typeof name !== 'string') {
      throw new Error('template names must be a string: ' + name);
    } else {
      for (var i = 0; i < this.loaders.length; i++) {
        var loader = this.loaders[i];
        tmpl = loader.cache[this.resolveTemplate(loader, parentName, name)];

        if (tmpl) {
          break;
        }
      }
    }

    if (tmpl) {
      if (eagerCompile) {
        tmpl.compile();
      }

      if (cb) {
        cb(null, tmpl);
        return undefined;
      } else {
        return tmpl;
      }
    }

    var syncResult;

    var createTemplate = function createTemplate(err, info) {
      if (!info && !err && !ignoreMissing) {
        err = new Error('template not found: ' + name);
      }

      if (err) {
        if (cb) {
          cb(err);
          return;
        } else {
          throw err;
        }
      }

      var newTmpl;

      if (!info) {
        newTmpl = new Template(noopTmplSrc, _this2, '', eagerCompile);
      } else {
        newTmpl = new Template(info.src, _this2, info.path, eagerCompile);

        if (!info.noCache) {
          info.loader.cache[name] = newTmpl;
        }
      }

      if (cb) {
        cb(null, newTmpl);
      } else {
        syncResult = newTmpl;
      }
    };

    lib.asyncIter(this.loaders, function (loader, i, next, done) {
      function handle(err, src) {
        if (err) {
          done(err);
        } else if (src) {
          src.loader = loader;
          done(null, src);
        } else {
          next();
        }
      } // Resolve name relative to parentName


      name = that.resolveTemplate(loader, parentName, name);

      if (loader.async) {
        loader.getSource(name, handle);
      } else {
        handle(null, loader.getSource(name));
      }
    }, createTemplate);
    return syncResult;
  };

  _proto.express = function express(app) {
    return expressApp(this, app);
  };

  _proto.render = function render(name, ctx, cb) {
    if (lib.isFunction(ctx)) {
      cb = ctx;
      ctx = null;
    } // We support a synchronous API to make it easier to migrate
    // existing code to async. This works because if you don't do
    // anything async work, the whole thing is actually run
    // synchronously.


    var syncResult = null;
    this.getTemplate(name, function (err, tmpl) {
      if (err && cb) {
        callbackAsap(cb, err);
      } else if (err) {
        throw err;
      } else {
        syncResult = tmpl.render(ctx, cb);
      }
    });
    return syncResult;
  };

  _proto.renderString = function renderString(src, ctx, opts, cb) {
    if (lib.isFunction(opts)) {
      cb = opts;
      opts = {};
    }

    opts = opts || {};
    var tmpl = new Template(src, this, opts.path);
    return tmpl.render(ctx, cb);
  };

  _proto.waterfall = function waterfall(tasks, callback, forceAsync) {
    return _waterfall(tasks, callback, forceAsync);
  };

  return Environment;
}(Obj);

var Context =
/*#__PURE__*/
function (_Obj2) {
  _inheritsLoose(Context, _Obj2);

  function Context() {
    return _Obj2.apply(this, arguments) || this;
  }

  var _proto2 = Context.prototype;

  _proto2.init = function init(ctx, blocks, env) {
    var _this3 = this;

    // Has to be tied to an environment so we can tap into its globals.
    this.env = env || new Environment(); // Make a duplicate of ctx

    this.ctx = lib.extend({}, ctx);
    this.blocks = {};
    this.exported = [];
    lib.keys(blocks).forEach(function (name) {
      _this3.addBlock(name, blocks[name]);
    });
  };

  _proto2.lookup = function lookup(name) {
    // This is one of the most called functions, so optimize for
    // the typical case where the name isn't in the globals
    if (name in this.env.globals && !(name in this.ctx)) {
      return this.env.globals[name];
    } else {
      return this.ctx[name];
    }
  };

  _proto2.setVariable = function setVariable(name, val) {
    this.ctx[name] = val;
  };

  _proto2.getVariables = function getVariables() {
    return this.ctx;
  };

  _proto2.addBlock = function addBlock(name, block) {
    this.blocks[name] = this.blocks[name] || [];
    this.blocks[name].push(block);
    return this;
  };

  _proto2.getBlock = function getBlock(name) {
    if (!this.blocks[name]) {
      throw new Error('unknown block "' + name + '"');
    }

    return this.blocks[name][0];
  };

  _proto2.getSuper = function getSuper(env, name, block, frame, runtime, cb) {
    var idx = lib.indexOf(this.blocks[name] || [], block);
    var blk = this.blocks[name][idx + 1];
    var context = this;

    if (idx === -1 || !blk) {
      throw new Error('no super block available for "' + name + '"');
    }

    blk(env, context, frame, runtime, cb);
  };

  _proto2.addExport = function addExport(name) {
    this.exported.push(name);
  };

  _proto2.getExported = function getExported() {
    var _this4 = this;

    var exported = {};
    this.exported.forEach(function (name) {
      exported[name] = _this4.ctx[name];
    });
    return exported;
  };

  return Context;
}(Obj);

var Template =
/*#__PURE__*/
function (_Obj3) {
  _inheritsLoose(Template, _Obj3);

  function Template() {
    return _Obj3.apply(this, arguments) || this;
  }

  var _proto3 = Template.prototype;

  _proto3.init = function init(src, env, path, eagerCompile) {
    this.env = env || new Environment();

    if (lib.isObject(src)) {
      switch (src.type) {
        case 'code':
          this.tmplProps = src.obj;
          break;

        case 'string':
          this.tmplStr = src.obj;
          break;

        default:
          throw new Error("Unexpected template object type " + src.type + "; expected 'code', or 'string'");
      }
    } else if (lib.isString(src)) {
      this.tmplStr = src;
    } else {
      throw new Error('src must be a string or an object describing the source');
    }

    this.path = path;

    if (eagerCompile) {
      try {
        this._compile();
      } catch (err) {
        throw lib._prettifyError(this.path, this.env.opts.dev, err);
      }
    } else {
      this.compiled = false;
    }
  };

  _proto3.render = function render(ctx, parentFrame, cb) {
    var _this5 = this;

    if (typeof ctx === 'function') {
      cb = ctx;
      ctx = {};
    } else if (typeof parentFrame === 'function') {
      cb = parentFrame;
      parentFrame = null;
    } // If there is a parent frame, we are being called from internal
    // code of another template, and the internal system
    // depends on the sync/async nature of the parent template
    // to be inherited, so force an async callback


    var forceAsync = !parentFrame; // Catch compile errors for async rendering

    try {
      this.compile();
    } catch (e) {
      var err = lib._prettifyError(this.path, this.env.opts.dev, e);

      if (cb) {
        return callbackAsap(cb, err);
      } else {
        throw err;
      }
    }

    var context = new Context(ctx || {}, this.blocks, this.env);
    var frame = parentFrame ? parentFrame.push(true) : new Frame();
    frame.topLevel = true;
    var syncResult = null;
    var didError = false;
    this.rootRenderFunc(this.env, context, frame, globalRuntime, function (err, res) {
      if (didError) {
        // prevent multiple calls to cb
        return;
      }

      if (err) {
        err = lib._prettifyError(_this5.path, _this5.env.opts.dev, err);
        didError = true;
      }

      if (cb) {
        if (forceAsync) {
          callbackAsap(cb, err, res);
        } else {
          cb(err, res);
        }
      } else {
        if (err) {
          throw err;
        }

        syncResult = res;
      }
    });
    return syncResult;
  };

  _proto3.getExported = function getExported(ctx, parentFrame, cb) {
    // eslint-disable-line consistent-return
    if (typeof ctx === 'function') {
      cb = ctx;
      ctx = {};
    }

    if (typeof parentFrame === 'function') {
      cb = parentFrame;
      parentFrame = null;
    } // Catch compile errors for async rendering


    try {
      this.compile();
    } catch (e) {
      if (cb) {
        return cb(e);
      } else {
        throw e;
      }
    }

    var frame = parentFrame ? parentFrame.push() : new Frame();
    frame.topLevel = true; // Run the rootRenderFunc to populate the context with exported vars

    var context = new Context(ctx || {}, this.blocks, this.env);
    this.rootRenderFunc(this.env, context, frame, globalRuntime, function (err) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, context.getExported());
      }
    });
  };

  _proto3.compile = function compile() {
    if (!this.compiled) {
      this._compile();
    }
  };

  _proto3._compile = function _compile() {
    var props;

    if (this.tmplProps) {
      props = this.tmplProps;
    } else {
      var source = compiler.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts);
      var func = new Function(source); // eslint-disable-line no-new-func

      props = func();
    }

    this.blocks = this._getBlocks(props);
    this.rootRenderFunc = props.root;
    this.compiled = true;
  };

  _proto3._getBlocks = function _getBlocks(props) {
    var blocks = {};
    lib.keys(props).forEach(function (k) {
      if (k.slice(0, 2) === 'b_') {
        blocks[k.slice(2)] = props[k];
      }
    });
    return blocks;
  };

  return Template;
}(Obj);

module.exports = {
  Environment: Environment,
  Template: Template
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var lexer = __webpack_require__(9);

var nodes = __webpack_require__(3);

var Obj = __webpack_require__(1);

var lib = __webpack_require__(0);

var Parser =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Parser, _Obj);

  function Parser() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto = Parser.prototype;

  _proto.init = function init(tokens) {
    this.tokens = tokens;
    this.peeked = null;
    this.breakOnBlocks = null;
    this.dropLeadingWhitespace = false;
    this.extensions = [];
  };

  _proto.nextToken = function nextToken(withWhitespace) {
    var tok;

    if (this.peeked) {
      if (!withWhitespace && this.peeked.type === lexer.TOKEN_WHITESPACE) {
        this.peeked = null;
      } else {
        tok = this.peeked;
        this.peeked = null;
        return tok;
      }
    }

    tok = this.tokens.nextToken();

    if (!withWhitespace) {
      while (tok && tok.type === lexer.TOKEN_WHITESPACE) {
        tok = this.tokens.nextToken();
      }
    }

    return tok;
  };

  _proto.peekToken = function peekToken() {
    this.peeked = this.peeked || this.nextToken();
    return this.peeked;
  };

  _proto.pushToken = function pushToken(tok) {
    if (this.peeked) {
      throw new Error('pushToken: can only push one token on between reads');
    }

    this.peeked = tok;
  };

  _proto.error = function error(msg, lineno, colno) {
    if (lineno === undefined || colno === undefined) {
      var tok = this.peekToken() || {};
      lineno = tok.lineno;
      colno = tok.colno;
    }

    if (lineno !== undefined) {
      lineno += 1;
    }

    if (colno !== undefined) {
      colno += 1;
    }

    return new lib.TemplateError(msg, lineno, colno);
  };

  _proto.fail = function fail(msg, lineno, colno) {
    throw this.error(msg, lineno, colno);
  };

  _proto.skip = function skip(type) {
    var tok = this.nextToken();

    if (!tok || tok.type !== type) {
      this.pushToken(tok);
      return false;
    }

    return true;
  };

  _proto.expect = function expect(type) {
    var tok = this.nextToken();

    if (tok.type !== type) {
      this.fail('expected ' + type + ', got ' + tok.type, tok.lineno, tok.colno);
    }

    return tok;
  };

  _proto.skipValue = function skipValue(type, val) {
    var tok = this.nextToken();

    if (!tok || tok.type !== type || tok.value !== val) {
      this.pushToken(tok);
      return false;
    }

    return true;
  };

  _proto.skipSymbol = function skipSymbol(val) {
    return this.skipValue(lexer.TOKEN_SYMBOL, val);
  };

  _proto.advanceAfterBlockEnd = function advanceAfterBlockEnd(name) {
    var tok;

    if (!name) {
      tok = this.peekToken();

      if (!tok) {
        this.fail('unexpected end of file');
      }

      if (tok.type !== lexer.TOKEN_SYMBOL) {
        this.fail('advanceAfterBlockEnd: expected symbol token or ' + 'explicit name to be passed');
      }

      name = this.nextToken().value;
    }

    tok = this.nextToken();

    if (tok && tok.type === lexer.TOKEN_BLOCK_END) {
      if (tok.value.charAt(0) === '-') {
        this.dropLeadingWhitespace = true;
      }
    } else {
      this.fail('expected block end in ' + name + ' statement');
    }

    return tok;
  };

  _proto.advanceAfterVariableEnd = function advanceAfterVariableEnd() {
    var tok = this.nextToken();

    if (tok && tok.type === lexer.TOKEN_VARIABLE_END) {
      this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.VARIABLE_END.length - 1) === '-';
    } else {
      this.pushToken(tok);
      this.fail('expected variable end');
    }
  };

  _proto.parseFor = function parseFor() {
    var forTok = this.peekToken();
    var node;
    var endBlock;

    if (this.skipSymbol('for')) {
      node = new nodes.For(forTok.lineno, forTok.colno);
      endBlock = 'endfor';
    } else if (this.skipSymbol('asyncEach')) {
      node = new nodes.AsyncEach(forTok.lineno, forTok.colno);
      endBlock = 'endeach';
    } else if (this.skipSymbol('asyncAll')) {
      node = new nodes.AsyncAll(forTok.lineno, forTok.colno);
      endBlock = 'endall';
    } else {
      this.fail('parseFor: expected for{Async}', forTok.lineno, forTok.colno);
    }

    node.name = this.parsePrimary();

    if (!(node.name instanceof nodes.Symbol)) {
      this.fail('parseFor: variable name expected for loop');
    }

    var type = this.peekToken().type;

    if (type === lexer.TOKEN_COMMA) {
      // key/value iteration
      var key = node.name;
      node.name = new nodes.Array(key.lineno, key.colno);
      node.name.addChild(key);

      while (this.skip(lexer.TOKEN_COMMA)) {
        var prim = this.parsePrimary();
        node.name.addChild(prim);
      }
    }

    if (!this.skipSymbol('in')) {
      this.fail('parseFor: expected "in" keyword for loop', forTok.lineno, forTok.colno);
    }

    node.arr = this.parseExpression();
    this.advanceAfterBlockEnd(forTok.value);
    node.body = this.parseUntilBlocks(endBlock, 'else');

    if (this.skipSymbol('else')) {
      this.advanceAfterBlockEnd('else');
      node.else_ = this.parseUntilBlocks(endBlock);
    }

    this.advanceAfterBlockEnd();
    return node;
  };

  _proto.parseMacro = function parseMacro() {
    var macroTok = this.peekToken();

    if (!this.skipSymbol('macro')) {
      this.fail('expected macro');
    }

    var name = this.parsePrimary(true);
    var args = this.parseSignature();
    var node = new nodes.Macro(macroTok.lineno, macroTok.colno, name, args);
    this.advanceAfterBlockEnd(macroTok.value);
    node.body = this.parseUntilBlocks('endmacro');
    this.advanceAfterBlockEnd();
    return node;
  };

  _proto.parseCall = function parseCall() {
    // a call block is parsed as a normal FunCall, but with an added
    // 'caller' kwarg which is a Caller node.
    var callTok = this.peekToken();

    if (!this.skipSymbol('call')) {
      this.fail('expected call');
    }

    var callerArgs = this.parseSignature(true) || new nodes.NodeList();
    var macroCall = this.parsePrimary();
    this.advanceAfterBlockEnd(callTok.value);
    var body = this.parseUntilBlocks('endcall');
    this.advanceAfterBlockEnd();
    var callerName = new nodes.Symbol(callTok.lineno, callTok.colno, 'caller');
    var callerNode = new nodes.Caller(callTok.lineno, callTok.colno, callerName, callerArgs, body); // add the additional caller kwarg, adding kwargs if necessary

    var args = macroCall.args.children;

    if (!(args[args.length - 1] instanceof nodes.KeywordArgs)) {
      args.push(new nodes.KeywordArgs());
    }

    var kwargs = args[args.length - 1];
    kwargs.addChild(new nodes.Pair(callTok.lineno, callTok.colno, callerName, callerNode));
    return new nodes.Output(callTok.lineno, callTok.colno, [macroCall]);
  };

  _proto.parseWithContext = function parseWithContext() {
    var tok = this.peekToken();
    var withContext = null;

    if (this.skipSymbol('with')) {
      withContext = true;
    } else if (this.skipSymbol('without')) {
      withContext = false;
    }

    if (withContext !== null) {
      if (!this.skipSymbol('context')) {
        this.fail('parseFrom: expected context after with/without', tok.lineno, tok.colno);
      }
    }

    return withContext;
  };

  _proto.parseImport = function parseImport() {
    var importTok = this.peekToken();

    if (!this.skipSymbol('import')) {
      this.fail('parseImport: expected import', importTok.lineno, importTok.colno);
    }

    var template = this.parseExpression();

    if (!this.skipSymbol('as')) {
      this.fail('parseImport: expected "as" keyword', importTok.lineno, importTok.colno);
    }

    var target = this.parseExpression();
    var withContext = this.parseWithContext();
    var node = new nodes.Import(importTok.lineno, importTok.colno, template, target, withContext);
    this.advanceAfterBlockEnd(importTok.value);
    return node;
  };

  _proto.parseFrom = function parseFrom() {
    var fromTok = this.peekToken();

    if (!this.skipSymbol('from')) {
      this.fail('parseFrom: expected from');
    }

    var template = this.parseExpression();

    if (!this.skipSymbol('import')) {
      this.fail('parseFrom: expected import', fromTok.lineno, fromTok.colno);
    }

    var names = new nodes.NodeList();
    var withContext;

    while (1) {
      // eslint-disable-line no-constant-condition
      var nextTok = this.peekToken();

      if (nextTok.type === lexer.TOKEN_BLOCK_END) {
        if (!names.children.length) {
          this.fail('parseFrom: Expected at least one import name', fromTok.lineno, fromTok.colno);
        } // Since we are manually advancing past the block end,
        // need to keep track of whitespace control (normally
        // this is done in `advanceAfterBlockEnd`


        if (nextTok.value.charAt(0) === '-') {
          this.dropLeadingWhitespace = true;
        }

        this.nextToken();
        break;
      }

      if (names.children.length > 0 && !this.skip(lexer.TOKEN_COMMA)) {
        this.fail('parseFrom: expected comma', fromTok.lineno, fromTok.colno);
      }

      var name = this.parsePrimary();

      if (name.value.charAt(0) === '_') {
        this.fail('parseFrom: names starting with an underscore cannot be imported', name.lineno, name.colno);
      }

      if (this.skipSymbol('as')) {
        var alias = this.parsePrimary();
        names.addChild(new nodes.Pair(name.lineno, name.colno, name, alias));
      } else {
        names.addChild(name);
      }

      withContext = this.parseWithContext();
    }

    return new nodes.FromImport(fromTok.lineno, fromTok.colno, template, names, withContext);
  };

  _proto.parseBlock = function parseBlock() {
    var tag = this.peekToken();

    if (!this.skipSymbol('block')) {
      this.fail('parseBlock: expected block', tag.lineno, tag.colno);
    }

    var node = new nodes.Block(tag.lineno, tag.colno);
    node.name = this.parsePrimary();

    if (!(node.name instanceof nodes.Symbol)) {
      this.fail('parseBlock: variable name expected', tag.lineno, tag.colno);
    }

    this.advanceAfterBlockEnd(tag.value);
    node.body = this.parseUntilBlocks('endblock');
    this.skipSymbol('endblock');
    this.skipSymbol(node.name.value);
    var tok = this.peekToken();

    if (!tok) {
      this.fail('parseBlock: expected endblock, got end of file');
    }

    this.advanceAfterBlockEnd(tok.value);
    return node;
  };

  _proto.parseExtends = function parseExtends() {
    var tagName = 'extends';
    var tag = this.peekToken();

    if (!this.skipSymbol(tagName)) {
      this.fail('parseTemplateRef: expected ' + tagName);
    }

    var node = new nodes.Extends(tag.lineno, tag.colno);
    node.template = this.parseExpression();
    this.advanceAfterBlockEnd(tag.value);
    return node;
  };

  _proto.parseInclude = function parseInclude() {
    var tagName = 'include';
    var tag = this.peekToken();

    if (!this.skipSymbol(tagName)) {
      this.fail('parseInclude: expected ' + tagName);
    }

    var node = new nodes.Include(tag.lineno, tag.colno);
    node.template = this.parseExpression();

    if (this.skipSymbol('ignore') && this.skipSymbol('missing')) {
      node.ignoreMissing = true;
    }

    this.advanceAfterBlockEnd(tag.value);
    return node;
  };

  _proto.parseIf = function parseIf() {
    var tag = this.peekToken();
    var node;

    if (this.skipSymbol('if') || this.skipSymbol('elif') || this.skipSymbol('elseif')) {
      node = new nodes.If(tag.lineno, tag.colno);
    } else if (this.skipSymbol('ifAsync')) {
      node = new nodes.IfAsync(tag.lineno, tag.colno);
    } else {
      this.fail('parseIf: expected if, elif, or elseif', tag.lineno, tag.colno);
    }

    node.cond = this.parseExpression();
    this.advanceAfterBlockEnd(tag.value);
    node.body = this.parseUntilBlocks('elif', 'elseif', 'else', 'endif');
    var tok = this.peekToken();

    switch (tok && tok.value) {
      case 'elseif':
      case 'elif':
        node.else_ = this.parseIf();
        break;

      case 'else':
        this.advanceAfterBlockEnd();
        node.else_ = this.parseUntilBlocks('endif');
        this.advanceAfterBlockEnd();
        break;

      case 'endif':
        node.else_ = null;
        this.advanceAfterBlockEnd();
        break;

      default:
        this.fail('parseIf: expected elif, else, or endif, got end of file');
    }

    return node;
  };

  _proto.parseSet = function parseSet() {
    var tag = this.peekToken();

    if (!this.skipSymbol('set')) {
      this.fail('parseSet: expected set', tag.lineno, tag.colno);
    }

    var node = new nodes.Set(tag.lineno, tag.colno, []);
    var target;

    while (target = this.parsePrimary()) {
      node.targets.push(target);

      if (!this.skip(lexer.TOKEN_COMMA)) {
        break;
      }
    }

    if (!this.skipValue(lexer.TOKEN_OPERATOR, '=')) {
      if (!this.skip(lexer.TOKEN_BLOCK_END)) {
        this.fail('parseSet: expected = or block end in set tag', tag.lineno, tag.colno);
      } else {
        node.body = new nodes.Capture(tag.lineno, tag.colno, this.parseUntilBlocks('endset'));
        node.value = null;
        this.advanceAfterBlockEnd();
      }
    } else {
      node.value = this.parseExpression();
      this.advanceAfterBlockEnd(tag.value);
    }

    return node;
  };

  _proto.parseSwitch = function parseSwitch() {
    /*
     * Store the tag names in variables in case someone ever wants to
     * customize this.
     */
    var switchStart = 'switch';
    var switchEnd = 'endswitch';
    var caseStart = 'case';
    var caseDefault = 'default'; // Get the switch tag.

    var tag = this.peekToken(); // fail early if we get some unexpected tag.

    if (!this.skipSymbol(switchStart) && !this.skipSymbol(caseStart) && !this.skipSymbol(caseDefault)) {
      this.fail('parseSwitch: expected "switch," "case" or "default"', tag.lineno, tag.colno);
    } // parse the switch expression


    var expr = this.parseExpression(); // advance until a start of a case, a default case or an endswitch.

    this.advanceAfterBlockEnd(switchStart);
    this.parseUntilBlocks(caseStart, caseDefault, switchEnd); // this is the first case. it could also be an endswitch, we'll check.

    var tok = this.peekToken(); // create new variables for our cases and default case.

    var cases = [];
    var defaultCase; // while we're dealing with new cases nodes...

    do {
      // skip the start symbol and get the case expression
      this.skipSymbol(caseStart);
      var cond = this.parseExpression();
      this.advanceAfterBlockEnd(switchStart); // get the body of the case node and add it to the array of cases.

      var body = this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
      cases.push(new nodes.Case(tok.line, tok.col, cond, body)); // get our next case

      tok = this.peekToken();
    } while (tok && tok.value === caseStart); // we either have a default case or a switch end.


    switch (tok.value) {
      case caseDefault:
        this.advanceAfterBlockEnd();
        defaultCase = this.parseUntilBlocks(switchEnd);
        this.advanceAfterBlockEnd();
        break;

      case switchEnd:
        this.advanceAfterBlockEnd();
        break;

      default:
        // otherwise bail because EOF
        this.fail('parseSwitch: expected "case," "default" or "endswitch," got EOF.');
    } // and return the switch node.


    return new nodes.Switch(tag.lineno, tag.colno, expr, cases, defaultCase);
  };

  _proto.parseStatement = function parseStatement() {
    var tok = this.peekToken();
    var node;

    if (tok.type !== lexer.TOKEN_SYMBOL) {
      this.fail('tag name expected', tok.lineno, tok.colno);
    }

    if (this.breakOnBlocks && lib.indexOf(this.breakOnBlocks, tok.value) !== -1) {
      return null;
    }

    switch (tok.value) {
      case 'raw':
        return this.parseRaw();

      case 'verbatim':
        return this.parseRaw('verbatim');

      case 'if':
      case 'ifAsync':
        return this.parseIf();

      case 'for':
      case 'asyncEach':
      case 'asyncAll':
        return this.parseFor();

      case 'block':
        return this.parseBlock();

      case 'extends':
        return this.parseExtends();

      case 'include':
        return this.parseInclude();

      case 'set':
        return this.parseSet();

      case 'macro':
        return this.parseMacro();

      case 'call':
        return this.parseCall();

      case 'import':
        return this.parseImport();

      case 'from':
        return this.parseFrom();

      case 'filter':
        return this.parseFilterStatement();

      case 'switch':
        return this.parseSwitch();

      default:
        if (this.extensions.length) {
          for (var i = 0; i < this.extensions.length; i++) {
            var ext = this.extensions[i];

            if (lib.indexOf(ext.tags || [], tok.value) !== -1) {
              return ext.parse(this, nodes, lexer);
            }
          }
        }

        this.fail('unknown block tag: ' + tok.value, tok.lineno, tok.colno);
    }

    return node;
  };

  _proto.parseRaw = function parseRaw(tagName) {
    tagName = tagName || 'raw';
    var endTagName = 'end' + tagName; // Look for upcoming raw blocks (ignore all other kinds of blocks)

    var rawBlockRegex = new RegExp('([\\s\\S]*?){%\\s*(' + tagName + '|' + endTagName + ')\\s*(?=%})%}');
    var rawLevel = 1;
    var str = '';
    var matches = null; // Skip opening raw token
    // Keep this token to track line and column numbers

    var begun = this.advanceAfterBlockEnd(); // Exit when there's nothing to match
    // or when we've found the matching "endraw" block

    while ((matches = this.tokens._extractRegex(rawBlockRegex)) && rawLevel > 0) {
      var all = matches[0];
      var pre = matches[1];
      var blockName = matches[2]; // Adjust rawlevel

      if (blockName === tagName) {
        rawLevel += 1;
      } else if (blockName === endTagName) {
        rawLevel -= 1;
      } // Add to str


      if (rawLevel === 0) {
        // We want to exclude the last "endraw"
        str += pre; // Move tokenizer to beginning of endraw block

        this.tokens.backN(all.length - pre.length);
      } else {
        str += all;
      }
    }

    return new nodes.Output(begun.lineno, begun.colno, [new nodes.TemplateData(begun.lineno, begun.colno, str)]);
  };

  _proto.parsePostfix = function parsePostfix(node) {
    var lookup;
    var tok = this.peekToken();

    while (tok) {
      if (tok.type === lexer.TOKEN_LEFT_PAREN) {
        // Function call
        node = new nodes.FunCall(tok.lineno, tok.colno, node, this.parseSignature());
      } else if (tok.type === lexer.TOKEN_LEFT_BRACKET) {
        // Reference
        lookup = this.parseAggregate();

        if (lookup.children.length > 1) {
          this.fail('invalid index');
        }

        node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup.children[0]);
      } else if (tok.type === lexer.TOKEN_OPERATOR && tok.value === '.') {
        // Reference
        this.nextToken();
        var val = this.nextToken();

        if (val.type !== lexer.TOKEN_SYMBOL) {
          this.fail('expected name as lookup value, got ' + val.value, val.lineno, val.colno);
        } // Make a literal string because it's not a variable
        // reference


        lookup = new nodes.Literal(val.lineno, val.colno, val.value);
        node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup);
      } else {
        break;
      }

      tok = this.peekToken();
    }

    return node;
  };

  _proto.parseExpression = function parseExpression() {
    var node = this.parseInlineIf();
    return node;
  };

  _proto.parseInlineIf = function parseInlineIf() {
    var node = this.parseOr();

    if (this.skipSymbol('if')) {
      var condNode = this.parseOr();
      var bodyNode = node;
      node = new nodes.InlineIf(node.lineno, node.colno);
      node.body = bodyNode;
      node.cond = condNode;

      if (this.skipSymbol('else')) {
        node.else_ = this.parseOr();
      } else {
        node.else_ = null;
      }
    }

    return node;
  };

  _proto.parseOr = function parseOr() {
    var node = this.parseAnd();

    while (this.skipSymbol('or')) {
      var node2 = this.parseAnd();
      node = new nodes.Or(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseAnd = function parseAnd() {
    var node = this.parseNot();

    while (this.skipSymbol('and')) {
      var node2 = this.parseNot();
      node = new nodes.And(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseNot = function parseNot() {
    var tok = this.peekToken();

    if (this.skipSymbol('not')) {
      return new nodes.Not(tok.lineno, tok.colno, this.parseNot());
    }

    return this.parseIn();
  };

  _proto.parseIn = function parseIn() {
    var node = this.parseIs();

    while (1) {
      // eslint-disable-line no-constant-condition
      // check if the next token is 'not'
      var tok = this.nextToken();

      if (!tok) {
        break;
      }

      var invert = tok.type === lexer.TOKEN_SYMBOL && tok.value === 'not'; // if it wasn't 'not', put it back

      if (!invert) {
        this.pushToken(tok);
      }

      if (this.skipSymbol('in')) {
        var node2 = this.parseIs();
        node = new nodes.In(node.lineno, node.colno, node, node2);

        if (invert) {
          node = new nodes.Not(node.lineno, node.colno, node);
        }
      } else {
        // if we'd found a 'not' but this wasn't an 'in', put back the 'not'
        if (invert) {
          this.pushToken(tok);
        }

        break;
      }
    }

    return node;
  }; // I put this right after "in" in the operator precedence stack. That can
  // obviously be changed to be closer to Jinja.


  _proto.parseIs = function parseIs() {
    var node = this.parseCompare(); // look for an is

    if (this.skipSymbol('is')) {
      // look for a not
      var not = this.skipSymbol('not'); // get the next node

      var node2 = this.parseCompare(); // create an Is node using the next node and the info from our Is node.

      node = new nodes.Is(node.lineno, node.colno, node, node2); // if we have a Not, create a Not node from our Is node.

      if (not) {
        node = new nodes.Not(node.lineno, node.colno, node);
      }
    } // return the node.


    return node;
  };

  _proto.parseCompare = function parseCompare() {
    var compareOps = ['==', '===', '!=', '!==', '<', '>', '<=', '>='];
    var expr = this.parseConcat();
    var ops = [];

    while (1) {
      // eslint-disable-line no-constant-condition
      var tok = this.nextToken();

      if (!tok) {
        break;
      } else if (compareOps.indexOf(tok.value) !== -1) {
        ops.push(new nodes.CompareOperand(tok.lineno, tok.colno, this.parseConcat(), tok.value));
      } else {
        this.pushToken(tok);
        break;
      }
    }

    if (ops.length) {
      return new nodes.Compare(ops[0].lineno, ops[0].colno, expr, ops);
    } else {
      return expr;
    }
  }; // finds the '~' for string concatenation


  _proto.parseConcat = function parseConcat() {
    var node = this.parseAdd();

    while (this.skipValue(lexer.TOKEN_TILDE, '~')) {
      var node2 = this.parseAdd();
      node = new nodes.Concat(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseAdd = function parseAdd() {
    var node = this.parseSub();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '+')) {
      var node2 = this.parseSub();
      node = new nodes.Add(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseSub = function parseSub() {
    var node = this.parseMul();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '-')) {
      var node2 = this.parseMul();
      node = new nodes.Sub(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseMul = function parseMul() {
    var node = this.parseDiv();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '*')) {
      var node2 = this.parseDiv();
      node = new nodes.Mul(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseDiv = function parseDiv() {
    var node = this.parseFloorDiv();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '/')) {
      var node2 = this.parseFloorDiv();
      node = new nodes.Div(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseFloorDiv = function parseFloorDiv() {
    var node = this.parseMod();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '//')) {
      var node2 = this.parseMod();
      node = new nodes.FloorDiv(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseMod = function parseMod() {
    var node = this.parsePow();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '%')) {
      var node2 = this.parsePow();
      node = new nodes.Mod(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parsePow = function parsePow() {
    var node = this.parseUnary();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '**')) {
      var node2 = this.parseUnary();
      node = new nodes.Pow(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseUnary = function parseUnary(noFilters) {
    var tok = this.peekToken();
    var node;

    if (this.skipValue(lexer.TOKEN_OPERATOR, '-')) {
      node = new nodes.Neg(tok.lineno, tok.colno, this.parseUnary(true));
    } else if (this.skipValue(lexer.TOKEN_OPERATOR, '+')) {
      node = new nodes.Pos(tok.lineno, tok.colno, this.parseUnary(true));
    } else {
      node = this.parsePrimary();
    }

    if (!noFilters) {
      node = this.parseFilter(node);
    }

    return node;
  };

  _proto.parsePrimary = function parsePrimary(noPostfix) {
    var tok = this.nextToken();
    var val;
    var node = null;

    if (!tok) {
      this.fail('expected expression, got end of file');
    } else if (tok.type === lexer.TOKEN_STRING) {
      val = tok.value;
    } else if (tok.type === lexer.TOKEN_INT) {
      val = parseInt(tok.value, 10);
    } else if (tok.type === lexer.TOKEN_FLOAT) {
      val = parseFloat(tok.value);
    } else if (tok.type === lexer.TOKEN_BOOLEAN) {
      if (tok.value === 'true') {
        val = true;
      } else if (tok.value === 'false') {
        val = false;
      } else {
        this.fail('invalid boolean: ' + tok.value, tok.lineno, tok.colno);
      }
    } else if (tok.type === lexer.TOKEN_NONE) {
      val = null;
    } else if (tok.type === lexer.TOKEN_REGEX) {
      val = new RegExp(tok.value.body, tok.value.flags);
    }

    if (val !== undefined) {
      node = new nodes.Literal(tok.lineno, tok.colno, val);
    } else if (tok.type === lexer.TOKEN_SYMBOL) {
      node = new nodes.Symbol(tok.lineno, tok.colno, tok.value);
    } else {
      // See if it's an aggregate type, we need to push the
      // current delimiter token back on
      this.pushToken(tok);
      node = this.parseAggregate();
    }

    if (!noPostfix) {
      node = this.parsePostfix(node);
    }

    if (node) {
      return node;
    } else {
      throw this.error("unexpected token: " + tok.value, tok.lineno, tok.colno);
    }
  };

  _proto.parseFilterName = function parseFilterName() {
    var tok = this.expect(lexer.TOKEN_SYMBOL);
    var name = tok.value;

    while (this.skipValue(lexer.TOKEN_OPERATOR, '.')) {
      name += '.' + this.expect(lexer.TOKEN_SYMBOL).value;
    }

    return new nodes.Symbol(tok.lineno, tok.colno, name);
  };

  _proto.parseFilterArgs = function parseFilterArgs(node) {
    if (this.peekToken().type === lexer.TOKEN_LEFT_PAREN) {
      // Get a FunCall node and add the parameters to the
      // filter
      var call = this.parsePostfix(node);
      return call.args.children;
    }

    return [];
  };

  _proto.parseFilter = function parseFilter(node) {
    while (this.skip(lexer.TOKEN_PIPE)) {
      var name = this.parseFilterName();
      node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [node].concat(this.parseFilterArgs(node))));
    }

    return node;
  };

  _proto.parseFilterStatement = function parseFilterStatement() {
    var filterTok = this.peekToken();

    if (!this.skipSymbol('filter')) {
      this.fail('parseFilterStatement: expected filter');
    }

    var name = this.parseFilterName();
    var args = this.parseFilterArgs(name);
    this.advanceAfterBlockEnd(filterTok.value);
    var body = new nodes.Capture(name.lineno, name.colno, this.parseUntilBlocks('endfilter'));
    this.advanceAfterBlockEnd();
    var node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [body].concat(args)));
    return new nodes.Output(name.lineno, name.colno, [node]);
  };

  _proto.parseAggregate = function parseAggregate() {
    var tok = this.nextToken();
    var node;

    switch (tok.type) {
      case lexer.TOKEN_LEFT_PAREN:
        node = new nodes.Group(tok.lineno, tok.colno);
        break;

      case lexer.TOKEN_LEFT_BRACKET:
        node = new nodes.Array(tok.lineno, tok.colno);
        break;

      case lexer.TOKEN_LEFT_CURLY:
        node = new nodes.Dict(tok.lineno, tok.colno);
        break;

      default:
        return null;
    }

    while (1) {
      // eslint-disable-line no-constant-condition
      var type = this.peekToken().type;

      if (type === lexer.TOKEN_RIGHT_PAREN || type === lexer.TOKEN_RIGHT_BRACKET || type === lexer.TOKEN_RIGHT_CURLY) {
        this.nextToken();
        break;
      }

      if (node.children.length > 0) {
        if (!this.skip(lexer.TOKEN_COMMA)) {
          this.fail('parseAggregate: expected comma after expression', tok.lineno, tok.colno);
        }
      }

      if (node instanceof nodes.Dict) {
        // TODO: check for errors
        var key = this.parsePrimary(); // We expect a key/value pair for dicts, separated by a
        // colon

        if (!this.skip(lexer.TOKEN_COLON)) {
          this.fail('parseAggregate: expected colon after dict key', tok.lineno, tok.colno);
        } // TODO: check for errors


        var value = this.parseExpression();
        node.addChild(new nodes.Pair(key.lineno, key.colno, key, value));
      } else {
        // TODO: check for errors
        var expr = this.parseExpression();
        node.addChild(expr);
      }
    }

    return node;
  };

  _proto.parseSignature = function parseSignature(tolerant, noParens) {
    var tok = this.peekToken();

    if (!noParens && tok.type !== lexer.TOKEN_LEFT_PAREN) {
      if (tolerant) {
        return null;
      } else {
        this.fail('expected arguments', tok.lineno, tok.colno);
      }
    }

    if (tok.type === lexer.TOKEN_LEFT_PAREN) {
      tok = this.nextToken();
    }

    var args = new nodes.NodeList(tok.lineno, tok.colno);
    var kwargs = new nodes.KeywordArgs(tok.lineno, tok.colno);
    var checkComma = false;

    while (1) {
      // eslint-disable-line no-constant-condition
      tok = this.peekToken();

      if (!noParens && tok.type === lexer.TOKEN_RIGHT_PAREN) {
        this.nextToken();
        break;
      } else if (noParens && tok.type === lexer.TOKEN_BLOCK_END) {
        break;
      }

      if (checkComma && !this.skip(lexer.TOKEN_COMMA)) {
        this.fail('parseSignature: expected comma after expression', tok.lineno, tok.colno);
      } else {
        var arg = this.parseExpression();

        if (this.skipValue(lexer.TOKEN_OPERATOR, '=')) {
          kwargs.addChild(new nodes.Pair(arg.lineno, arg.colno, arg, this.parseExpression()));
        } else {
          args.addChild(arg);
        }
      }

      checkComma = true;
    }

    if (kwargs.children.length) {
      args.addChild(kwargs);
    }

    return args;
  };

  _proto.parseUntilBlocks = function parseUntilBlocks() {
    var prev = this.breakOnBlocks;

    for (var _len = arguments.length, blockNames = new Array(_len), _key = 0; _key < _len; _key++) {
      blockNames[_key] = arguments[_key];
    }

    this.breakOnBlocks = blockNames;
    var ret = this.parse();
    this.breakOnBlocks = prev;
    return ret;
  };

  _proto.parseNodes = function parseNodes() {
    var tok;
    var buf = [];

    while (tok = this.nextToken()) {
      if (tok.type === lexer.TOKEN_DATA) {
        var data = tok.value;
        var nextToken = this.peekToken();
        var nextVal = nextToken && nextToken.value; // If the last token has "-" we need to trim the
        // leading whitespace of the data. This is marked with
        // the `dropLeadingWhitespace` variable.

        if (this.dropLeadingWhitespace) {
          // TODO: this could be optimized (don't use regex)
          data = data.replace(/^\s*/, '');
          this.dropLeadingWhitespace = false;
        } // Same for the succeeding block start token


        if (nextToken && (nextToken.type === lexer.TOKEN_BLOCK_START && nextVal.charAt(nextVal.length - 1) === '-' || nextToken.type === lexer.TOKEN_VARIABLE_START && nextVal.charAt(this.tokens.tags.VARIABLE_START.length) === '-' || nextToken.type === lexer.TOKEN_COMMENT && nextVal.charAt(this.tokens.tags.COMMENT_START.length) === '-')) {
          // TODO: this could be optimized (don't use regex)
          data = data.replace(/\s*$/, '');
        }

        buf.push(new nodes.Output(tok.lineno, tok.colno, [new nodes.TemplateData(tok.lineno, tok.colno, data)]));
      } else if (tok.type === lexer.TOKEN_BLOCK_START) {
        this.dropLeadingWhitespace = false;
        var n = this.parseStatement();

        if (!n) {
          break;
        }

        buf.push(n);
      } else if (tok.type === lexer.TOKEN_VARIABLE_START) {
        var e = this.parseExpression();
        this.dropLeadingWhitespace = false;
        this.advanceAfterVariableEnd();
        buf.push(new nodes.Output(tok.lineno, tok.colno, [e]));
      } else if (tok.type === lexer.TOKEN_COMMENT) {
        this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.COMMENT_END.length - 1) === '-';
      } else {
        // Ignore comments, otherwise this should be an error
        this.fail('Unexpected token at top-level: ' + tok.type, tok.lineno, tok.colno);
      }
    }

    return buf;
  };

  _proto.parse = function parse() {
    return new nodes.NodeList(0, 0, this.parseNodes());
  };

  _proto.parseAsRoot = function parseAsRoot() {
    return new nodes.Root(0, 0, this.parseNodes());
  };

  return Parser;
}(Obj); // var util = require('util');
// var l = lexer.lex('{%- if x -%}\n hello {% endif %}');
// var t;
// while((t = l.nextToken())) {
//     console.log(util.inspect(t));
// }
// var p = new Parser(lexer.lex('hello {% filter title %}' +
//                              'Hello madam how are you' +
//                              '{% endfilter %}'));
// var n = p.parseAsRoot();
// nodes.printNodes(n);


module.exports = {
  parse: function parse(src, extensions, opts) {
    var p = new Parser(lexer.lex(src, opts));

    if (extensions !== undefined) {
      p.extensions = extensions;
    }

    return p.parseAsRoot();
  },
  Parser: Parser
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var whitespaceChars = " \n\t\r\xA0";
var delimChars = '()[]{}%*-+~/#,:|.<>=!';
var intChars = '0123456789';
var BLOCK_START = '{%';
var BLOCK_END = '%}';
var VARIABLE_START = '{{';
var VARIABLE_END = '}}';
var COMMENT_START = '{#';
var COMMENT_END = '#}';
var TOKEN_STRING = 'string';
var TOKEN_WHITESPACE = 'whitespace';
var TOKEN_DATA = 'data';
var TOKEN_BLOCK_START = 'block-start';
var TOKEN_BLOCK_END = 'block-end';
var TOKEN_VARIABLE_START = 'variable-start';
var TOKEN_VARIABLE_END = 'variable-end';
var TOKEN_COMMENT = 'comment';
var TOKEN_LEFT_PAREN = 'left-paren';
var TOKEN_RIGHT_PAREN = 'right-paren';
var TOKEN_LEFT_BRACKET = 'left-bracket';
var TOKEN_RIGHT_BRACKET = 'right-bracket';
var TOKEN_LEFT_CURLY = 'left-curly';
var TOKEN_RIGHT_CURLY = 'right-curly';
var TOKEN_OPERATOR = 'operator';
var TOKEN_COMMA = 'comma';
var TOKEN_COLON = 'colon';
var TOKEN_TILDE = 'tilde';
var TOKEN_PIPE = 'pipe';
var TOKEN_INT = 'int';
var TOKEN_FLOAT = 'float';
var TOKEN_BOOLEAN = 'boolean';
var TOKEN_NONE = 'none';
var TOKEN_SYMBOL = 'symbol';
var TOKEN_SPECIAL = 'special';
var TOKEN_REGEX = 'regex';

function token(type, value, lineno, colno) {
  return {
    type: type,
    value: value,
    lineno: lineno,
    colno: colno
  };
}

var Tokenizer =
/*#__PURE__*/
function () {
  function Tokenizer(str, opts) {
    this.str = str;
    this.index = 0;
    this.len = str.length;
    this.lineno = 0;
    this.colno = 0;
    this.in_code = false;
    opts = opts || {};
    var tags = opts.tags || {};
    this.tags = {
      BLOCK_START: tags.blockStart || BLOCK_START,
      BLOCK_END: tags.blockEnd || BLOCK_END,
      VARIABLE_START: tags.variableStart || VARIABLE_START,
      VARIABLE_END: tags.variableEnd || VARIABLE_END,
      COMMENT_START: tags.commentStart || COMMENT_START,
      COMMENT_END: tags.commentEnd || COMMENT_END
    };
    this.trimBlocks = !!opts.trimBlocks;
    this.lstripBlocks = !!opts.lstripBlocks;
  }

  var _proto = Tokenizer.prototype;

  _proto.nextToken = function nextToken() {
    var lineno = this.lineno;
    var colno = this.colno;
    var tok;

    if (this.in_code) {
      // Otherwise, if we are in a block parse it as code
      var cur = this.current();

      if (this.isFinished()) {
        // We have nothing else to parse
        return null;
      } else if (cur === '"' || cur === '\'') {
        // We've hit a string
        return token(TOKEN_STRING, this._parseString(cur), lineno, colno);
      } else if (tok = this._extract(whitespaceChars)) {
        // We hit some whitespace
        return token(TOKEN_WHITESPACE, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.BLOCK_END)) || (tok = this._extractString('-' + this.tags.BLOCK_END))) {
        // Special check for the block end tag
        //
        // It is a requirement that start and end tags are composed of
        // delimiter characters (%{}[] etc), and our code always
        // breaks on delimiters so we can assume the token parsing
        // doesn't consume these elsewhere
        this.in_code = false;

        if (this.trimBlocks) {
          cur = this.current();

          if (cur === '\n') {
            // Skip newline
            this.forward();
          } else if (cur === '\r') {
            // Skip CRLF newline
            this.forward();
            cur = this.current();

            if (cur === '\n') {
              this.forward();
            } else {
              // Was not a CRLF, so go back
              this.back();
            }
          }
        }

        return token(TOKEN_BLOCK_END, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.VARIABLE_END)) || (tok = this._extractString('-' + this.tags.VARIABLE_END))) {
        // Special check for variable end tag (see above)
        this.in_code = false;
        return token(TOKEN_VARIABLE_END, tok, lineno, colno);
      } else if (cur === 'r' && this.str.charAt(this.index + 1) === '/') {
        // Skip past 'r/'.
        this.forwardN(2); // Extract until the end of the regex -- / ends it, \/ does not.

        var regexBody = '';

        while (!this.isFinished()) {
          if (this.current() === '/' && this.previous() !== '\\') {
            this.forward();
            break;
          } else {
            regexBody += this.current();
            this.forward();
          }
        } // Check for flags.
        // The possible flags are according to https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp)


        var POSSIBLE_FLAGS = ['g', 'i', 'm', 'y'];
        var regexFlags = '';

        while (!this.isFinished()) {
          var isCurrentAFlag = POSSIBLE_FLAGS.indexOf(this.current()) !== -1;

          if (isCurrentAFlag) {
            regexFlags += this.current();
            this.forward();
          } else {
            break;
          }
        }

        return token(TOKEN_REGEX, {
          body: regexBody,
          flags: regexFlags
        }, lineno, colno);
      } else if (delimChars.indexOf(cur) !== -1) {
        // We've hit a delimiter (a special char like a bracket)
        this.forward();
        var complexOps = ['==', '===', '!=', '!==', '<=', '>=', '//', '**'];
        var curComplex = cur + this.current();
        var type;

        if (lib.indexOf(complexOps, curComplex) !== -1) {
          this.forward();
          cur = curComplex; // See if this is a strict equality/inequality comparator

          if (lib.indexOf(complexOps, curComplex + this.current()) !== -1) {
            cur = curComplex + this.current();
            this.forward();
          }
        }

        switch (cur) {
          case '(':
            type = TOKEN_LEFT_PAREN;
            break;

          case ')':
            type = TOKEN_RIGHT_PAREN;
            break;

          case '[':
            type = TOKEN_LEFT_BRACKET;
            break;

          case ']':
            type = TOKEN_RIGHT_BRACKET;
            break;

          case '{':
            type = TOKEN_LEFT_CURLY;
            break;

          case '}':
            type = TOKEN_RIGHT_CURLY;
            break;

          case ',':
            type = TOKEN_COMMA;
            break;

          case ':':
            type = TOKEN_COLON;
            break;

          case '~':
            type = TOKEN_TILDE;
            break;

          case '|':
            type = TOKEN_PIPE;
            break;

          default:
            type = TOKEN_OPERATOR;
        }

        return token(type, cur, lineno, colno);
      } else {
        // We are not at whitespace or a delimiter, so extract the
        // text and parse it
        tok = this._extractUntil(whitespaceChars + delimChars);

        if (tok.match(/^[-+]?[0-9]+$/)) {
          if (this.current() === '.') {
            this.forward();

            var dec = this._extract(intChars);

            return token(TOKEN_FLOAT, tok + '.' + dec, lineno, colno);
          } else {
            return token(TOKEN_INT, tok, lineno, colno);
          }
        } else if (tok.match(/^(true|false)$/)) {
          return token(TOKEN_BOOLEAN, tok, lineno, colno);
        } else if (tok === 'none') {
          return token(TOKEN_NONE, tok, lineno, colno);
          /*
           * Added to make the test `null is null` evaluate truthily.
           * Otherwise, Nunjucks will look up null in the context and
           * return `undefined`, which is not what we want. This *may* have
           * consequences is someone is using null in their templates as a
           * variable.
           */
        } else if (tok === 'null') {
          return token(TOKEN_NONE, tok, lineno, colno);
        } else if (tok) {
          return token(TOKEN_SYMBOL, tok, lineno, colno);
        } else {
          throw new Error('Unexpected value while parsing: ' + tok);
        }
      }
    } else {
      // Parse out the template text, breaking on tag
      // delimiters because we need to look for block/variable start
      // tags (don't use the full delimChars for optimization)
      var beginChars = this.tags.BLOCK_START.charAt(0) + this.tags.VARIABLE_START.charAt(0) + this.tags.COMMENT_START.charAt(0) + this.tags.COMMENT_END.charAt(0);

      if (this.isFinished()) {
        return null;
      } else if ((tok = this._extractString(this.tags.BLOCK_START + '-')) || (tok = this._extractString(this.tags.BLOCK_START))) {
        this.in_code = true;
        return token(TOKEN_BLOCK_START, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.VARIABLE_START + '-')) || (tok = this._extractString(this.tags.VARIABLE_START))) {
        this.in_code = true;
        return token(TOKEN_VARIABLE_START, tok, lineno, colno);
      } else {
        tok = '';
        var data;
        var inComment = false;

        if (this._matches(this.tags.COMMENT_START)) {
          inComment = true;
          tok = this._extractString(this.tags.COMMENT_START);
        } // Continually consume text, breaking on the tag delimiter
        // characters and checking to see if it's a start tag.
        //
        // We could hit the end of the template in the middle of
        // our looping, so check for the null return value from
        // _extractUntil


        while ((data = this._extractUntil(beginChars)) !== null) {
          tok += data;

          if ((this._matches(this.tags.BLOCK_START) || this._matches(this.tags.VARIABLE_START) || this._matches(this.tags.COMMENT_START)) && !inComment) {
            if (this.lstripBlocks && this._matches(this.tags.BLOCK_START) && this.colno > 0 && this.colno <= tok.length) {
              var lastLine = tok.slice(-this.colno);

              if (/^\s+$/.test(lastLine)) {
                // Remove block leading whitespace from beginning of the string
                tok = tok.slice(0, -this.colno);

                if (!tok.length) {
                  // All data removed, collapse to avoid unnecessary nodes
                  // by returning next token (block start)
                  return this.nextToken();
                }
              }
            } // If it is a start tag, stop looping


            break;
          } else if (this._matches(this.tags.COMMENT_END)) {
            if (!inComment) {
              throw new Error('unexpected end of comment');
            }

            tok += this._extractString(this.tags.COMMENT_END);
            break;
          } else {
            // It does not match any tag, so add the character and
            // carry on
            tok += this.current();
            this.forward();
          }
        }

        if (data === null && inComment) {
          throw new Error('expected end of comment, got end of file');
        }

        return token(inComment ? TOKEN_COMMENT : TOKEN_DATA, tok, lineno, colno);
      }
    }
  };

  _proto._parseString = function _parseString(delimiter) {
    this.forward();
    var str = '';

    while (!this.isFinished() && this.current() !== delimiter) {
      var cur = this.current();

      if (cur === '\\') {
        this.forward();

        switch (this.current()) {
          case 'n':
            str += '\n';
            break;

          case 't':
            str += '\t';
            break;

          case 'r':
            str += '\r';
            break;

          default:
            str += this.current();
        }

        this.forward();
      } else {
        str += cur;
        this.forward();
      }
    }

    this.forward();
    return str;
  };

  _proto._matches = function _matches(str) {
    if (this.index + str.length > this.len) {
      return null;
    }

    var m = this.str.slice(this.index, this.index + str.length);
    return m === str;
  };

  _proto._extractString = function _extractString(str) {
    if (this._matches(str)) {
      this.index += str.length;
      return str;
    }

    return null;
  };

  _proto._extractUntil = function _extractUntil(charString) {
    // Extract all non-matching chars, with the default matching set
    // to everything
    return this._extractMatching(true, charString || '');
  };

  _proto._extract = function _extract(charString) {
    // Extract all matching chars (no default, so charString must be
    // explicit)
    return this._extractMatching(false, charString);
  };

  _proto._extractMatching = function _extractMatching(breakOnMatch, charString) {
    // Pull out characters until a breaking char is hit.
    // If breakOnMatch is false, a non-matching char stops it.
    // If breakOnMatch is true, a matching char stops it.
    if (this.isFinished()) {
      return null;
    }

    var first = charString.indexOf(this.current()); // Only proceed if the first character doesn't meet our condition

    if (breakOnMatch && first === -1 || !breakOnMatch && first !== -1) {
      var t = this.current();
      this.forward(); // And pull out all the chars one at a time until we hit a
      // breaking char

      var idx = charString.indexOf(this.current());

      while ((breakOnMatch && idx === -1 || !breakOnMatch && idx !== -1) && !this.isFinished()) {
        t += this.current();
        this.forward();
        idx = charString.indexOf(this.current());
      }

      return t;
    }

    return '';
  };

  _proto._extractRegex = function _extractRegex(regex) {
    var matches = this.currentStr().match(regex);

    if (!matches) {
      return null;
    } // Move forward whatever was matched


    this.forwardN(matches[0].length);
    return matches;
  };

  _proto.isFinished = function isFinished() {
    return this.index >= this.len;
  };

  _proto.forwardN = function forwardN(n) {
    for (var i = 0; i < n; i++) {
      this.forward();
    }
  };

  _proto.forward = function forward() {
    this.index++;

    if (this.previous() === '\n') {
      this.lineno++;
      this.colno = 0;
    } else {
      this.colno++;
    }
  };

  _proto.backN = function backN(n) {
    for (var i = 0; i < n; i++) {
      this.back();
    }
  };

  _proto.back = function back() {
    this.index--;

    if (this.current() === '\n') {
      this.lineno--;
      var idx = this.src.lastIndexOf('\n', this.index - 1);

      if (idx === -1) {
        this.colno = this.index;
      } else {
        this.colno = this.index - idx;
      }
    } else {
      this.colno--;
    }
  }; // current returns current character


  _proto.current = function current() {
    if (!this.isFinished()) {
      return this.str.charAt(this.index);
    }

    return '';
  }; // currentStr returns what's left of the unparsed string


  _proto.currentStr = function currentStr() {
    if (!this.isFinished()) {
      return this.str.substr(this.index);
    }

    return '';
  };

  _proto.previous = function previous() {
    return this.str.charAt(this.index - 1);
  };

  return Tokenizer;
}();

module.exports = {
  lex: function lex(src, opts) {
    return new Tokenizer(src, opts);
  },
  TOKEN_STRING: TOKEN_STRING,
  TOKEN_WHITESPACE: TOKEN_WHITESPACE,
  TOKEN_DATA: TOKEN_DATA,
  TOKEN_BLOCK_START: TOKEN_BLOCK_START,
  TOKEN_BLOCK_END: TOKEN_BLOCK_END,
  TOKEN_VARIABLE_START: TOKEN_VARIABLE_START,
  TOKEN_VARIABLE_END: TOKEN_VARIABLE_END,
  TOKEN_COMMENT: TOKEN_COMMENT,
  TOKEN_LEFT_PAREN: TOKEN_LEFT_PAREN,
  TOKEN_RIGHT_PAREN: TOKEN_RIGHT_PAREN,
  TOKEN_LEFT_BRACKET: TOKEN_LEFT_BRACKET,
  TOKEN_RIGHT_BRACKET: TOKEN_RIGHT_BRACKET,
  TOKEN_LEFT_CURLY: TOKEN_LEFT_CURLY,
  TOKEN_RIGHT_CURLY: TOKEN_RIGHT_CURLY,
  TOKEN_OPERATOR: TOKEN_OPERATOR,
  TOKEN_COMMA: TOKEN_COMMA,
  TOKEN_COLON: TOKEN_COLON,
  TOKEN_TILDE: TOKEN_TILDE,
  TOKEN_PIPE: TOKEN_PIPE,
  TOKEN_INT: TOKEN_INT,
  TOKEN_FLOAT: TOKEN_FLOAT,
  TOKEN_BOOLEAN: TOKEN_BOOLEAN,
  TOKEN_NONE: TOKEN_NONE,
  TOKEN_SYMBOL: TOKEN_SYMBOL,
  TOKEN_SPECIAL: TOKEN_SPECIAL,
  TOKEN_REGEX: TOKEN_REGEX
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Loader = __webpack_require__(6);

var _require = __webpack_require__(18),
    PrecompiledLoader = _require.PrecompiledLoader;

var WebLoader =
/*#__PURE__*/
function (_Loader) {
  _inheritsLoose(WebLoader, _Loader);

  function WebLoader(baseURL, opts) {
    var _this;

    _this = _Loader.call(this) || this;
    _this.baseURL = baseURL || '.';
    opts = opts || {}; // By default, the cache is turned off because there's no way
    // to "watch" templates over HTTP, so they are re-downloaded
    // and compiled each time. (Remember, PRECOMPILE YOUR
    // TEMPLATES in production!)

    _this.useCache = !!opts.useCache; // We default `async` to false so that the simple synchronous
    // API can be used when you aren't doing anything async in
    // your templates (which is most of the time). This performs a
    // sync ajax request, but that's ok because it should *only*
    // happen in development. PRECOMPILE YOUR TEMPLATES.

    _this.async = !!opts.async;
    return _this;
  }

  var _proto = WebLoader.prototype;

  _proto.resolve = function resolve(from, to) {
    throw new Error('relative templates not support in the browser yet');
  };

  _proto.getSource = function getSource(name, cb) {
    var useCache = this.useCache;
    var result;
    this.fetch(this.baseURL + '/' + name, function (err, src) {
      if (err) {
        if (cb) {
          cb(err.content);
        } else if (err.status === 404) {
          result = null;
        } else {
          throw err.content;
        }
      } else {
        result = {
          src: src,
          path: name,
          noCache: !useCache
        };

        if (cb) {
          cb(null, result);
        }
      }
    }); // if this WebLoader isn't running asynchronously, the
    // fetch above would actually run sync and we'll have a
    // result here

    return result;
  };

  _proto.fetch = function fetch(url, cb) {
    // Only in the browser please
    if (typeof window === 'undefined') {
      throw new Error('WebLoader can only by used in a browser');
    }

    var ajax = new XMLHttpRequest();
    var loading = true;

    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4 && loading) {
        loading = false;

        if (ajax.status === 0 || ajax.status === 200) {
          cb(null, ajax.responseText);
        } else {
          cb({
            status: ajax.status,
            content: ajax.responseText
          });
        }
      }
    };

    url += (url.indexOf('?') === -1 ? '?' : '&') + 's=' + new Date().getTime();
    ajax.open('GET', url, this.async);
    ajax.send();
  };

  return WebLoader;
}(Loader);

module.exports = {
  WebLoader: WebLoader,
  PrecompiledLoader: PrecompiledLoader
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var _require = __webpack_require__(7),
    Environment = _require.Environment,
    Template = _require.Template;

var Loader = __webpack_require__(6);

var loaders = __webpack_require__(10);

var precompile = __webpack_require__(22);

var compiler = __webpack_require__(5);

var parser = __webpack_require__(8);

var lexer = __webpack_require__(9);

var runtime = __webpack_require__(2);

var nodes = __webpack_require__(3);

var installJinjaCompat = __webpack_require__(24); // A single instance of an environment, since this is so commonly used


var e;

function configure(templatesPath, opts) {
  opts = opts || {};

  if (lib.isObject(templatesPath)) {
    opts = templatesPath;
    templatesPath = null;
  }

  var TemplateLoader;

  if (loaders.FileSystemLoader) {
    TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
      watch: opts.watch,
      noCache: opts.noCache
    });
  } else if (loaders.WebLoader) {
    TemplateLoader = new loaders.WebLoader(templatesPath, {
      useCache: opts.web && opts.web.useCache,
      async: opts.web && opts.web.async
    });
  }

  e = new Environment(TemplateLoader, opts);

  if (opts && opts.express) {
    e.express(opts.express);
  }

  return e;
}

module.exports = {
  Environment: Environment,
  Template: Template,
  Loader: Loader,
  FileSystemLoader: loaders.FileSystemLoader,
  PrecompiledLoader: loaders.PrecompiledLoader,
  WebLoader: loaders.WebLoader,
  compiler: compiler,
  parser: parser,
  lexer: lexer,
  runtime: runtime,
  lib: lib,
  nodes: nodes,
  installJinjaCompat: installJinjaCompat,
  configure: configure,
  reset: function reset() {
    e = undefined;
  },
  compile: function compile(src, env, path, eagerCompile) {
    if (!e) {
      configure();
    }

    return new Template(src, env, path, eagerCompile);
  },
  render: function render(name, ctx, cb) {
    if (!e) {
      configure();
    }

    return e.render(name, ctx, cb);
  },
  renderString: function renderString(src, ctx, cb) {
    if (!e) {
      configure();
    }

    return e.renderString(src, ctx, cb);
  },
  precompile: precompile ? precompile.precompile : undefined,
  precompileString: precompile ? precompile.precompileString : undefined
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// rawAsap provides everything we need except exception management.
var rawAsap = __webpack_require__(13);
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// MIT license (by Elan Shanker).
(function(globals) {
  'use strict';

  var executeSync = function(){
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'function'){
      args[0].apply(null, args.splice(1));
    }
  };

  var executeAsync = function(fn){
    if (typeof setImmediate === 'function') {
      setImmediate(fn);
    } else if (typeof process !== 'undefined' && process.nextTick) {
      process.nextTick(fn);
    } else {
      setTimeout(fn, 0);
    }
  };

  var makeIterator = function (tasks) {
    var makeCallback = function (index) {
      var fn = function () {
        if (tasks.length) {
          tasks[index].apply(null, arguments);
        }
        return fn.next();
      };
      fn.next = function () {
        return (index < tasks.length - 1) ? makeCallback(index + 1): null;
      };
      return fn;
    };
    return makeCallback(0);
  };
  
  var _isArray = Array.isArray || function(maybeArray){
    return Object.prototype.toString.call(maybeArray) === '[object Array]';
  };

  var waterfall = function (tasks, callback, forceAsync) {
    var nextTick = forceAsync ? executeAsync : executeSync;
    callback = callback || function () {};
    if (!_isArray(tasks)) {
      var err = new Error('First argument to waterfall must be an array of functions');
      return callback(err);
    }
    if (!tasks.length) {
      return callback();
    }
    var wrapIterator = function (iterator) {
      return function (err) {
        if (err) {
          callback.apply(null, arguments);
          callback = function () {};
        } else {
          var args = Array.prototype.slice.call(arguments, 1);
          var next = iterator.next();
          if (next) {
            args.push(wrapIterator(next));
          } else {
            args.push(callback);
          }
          nextTick(function () {
            iterator.apply(null, args);
          });
        }
      };
    };
    wrapIterator(makeIterator(tasks))();
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return waterfall;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // RequireJS
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = waterfall; // CommonJS
  } else {
    globals.waterfall = waterfall; // <script>
  }
})(this);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nodes = __webpack_require__(3);

var lib = __webpack_require__(0);

var sym = 0;

function gensym() {
  return 'hole_' + sym++;
} // copy-on-write version of map


function mapCOW(arr, func) {
  var res = null;

  for (var i = 0; i < arr.length; i++) {
    var item = func(arr[i]);

    if (item !== arr[i]) {
      if (!res) {
        res = arr.slice();
      }

      res[i] = item;
    }
  }

  return res || arr;
}

function walk(ast, func, depthFirst) {
  if (!(ast instanceof nodes.Node)) {
    return ast;
  }

  if (!depthFirst) {
    var astT = func(ast);

    if (astT && astT !== ast) {
      return astT;
    }
  }

  if (ast instanceof nodes.NodeList) {
    var children = mapCOW(ast.children, function (node) {
      return walk(node, func, depthFirst);
    });

    if (children !== ast.children) {
      ast = new nodes[ast.typename](ast.lineno, ast.colno, children);
    }
  } else if (ast instanceof nodes.CallExtension) {
    var args = walk(ast.args, func, depthFirst);
    var contentArgs = mapCOW(ast.contentArgs, function (node) {
      return walk(node, func, depthFirst);
    });

    if (args !== ast.args || contentArgs !== ast.contentArgs) {
      ast = new nodes[ast.typename](ast.extName, ast.prop, args, contentArgs);
    }
  } else {
    var props = ast.fields.map(function (field) {
      return ast[field];
    });
    var propsT = mapCOW(props, function (prop) {
      return walk(prop, func, depthFirst);
    });

    if (propsT !== props) {
      ast = new nodes[ast.typename](ast.lineno, ast.colno);
      propsT.forEach(function (prop, i) {
        ast[ast.fields[i]] = prop;
      });
    }
  }

  return depthFirst ? func(ast) || ast : ast;
}

function depthWalk(ast, func) {
  return walk(ast, func, true);
}

function _liftFilters(node, asyncFilters, prop) {
  var children = [];
  var walked = depthWalk(prop ? node[prop] : node, function (descNode) {
    var symbol;

    if (descNode instanceof nodes.Block) {
      return descNode;
    } else if (descNode instanceof nodes.Filter && lib.indexOf(asyncFilters, descNode.name.value) !== -1 || descNode instanceof nodes.CallExtensionAsync) {
      symbol = new nodes.Symbol(descNode.lineno, descNode.colno, gensym());
      children.push(new nodes.FilterAsync(descNode.lineno, descNode.colno, descNode.name, descNode.args, symbol));
    }

    return symbol;
  });

  if (prop) {
    node[prop] = walked;
  } else {
    node = walked;
  }

  if (children.length) {
    children.push(node);
    return new nodes.NodeList(node.lineno, node.colno, children);
  } else {
    return node;
  }
}

function liftFilters(ast, asyncFilters) {
  return depthWalk(ast, function (node) {
    if (node instanceof nodes.Output) {
      return _liftFilters(node, asyncFilters);
    } else if (node instanceof nodes.Set) {
      return _liftFilters(node, asyncFilters, 'value');
    } else if (node instanceof nodes.For) {
      return _liftFilters(node, asyncFilters, 'arr');
    } else if (node instanceof nodes.If) {
      return _liftFilters(node, asyncFilters, 'cond');
    } else if (node instanceof nodes.CallExtension) {
      return _liftFilters(node, asyncFilters, 'args');
    } else {
      return undefined;
    }
  });
}

function liftSuper(ast) {
  return walk(ast, function (blockNode) {
    if (!(blockNode instanceof nodes.Block)) {
      return;
    }

    var hasSuper = false;
    var symbol = gensym();
    blockNode.body = walk(blockNode.body, function (node) {
      // eslint-disable-line consistent-return
      if (node instanceof nodes.FunCall && node.name.value === 'super') {
        hasSuper = true;
        return new nodes.Symbol(node.lineno, node.colno, symbol);
      }
    });

    if (hasSuper) {
      blockNode.body.children.unshift(new nodes.Super(0, 0, blockNode.name, new nodes.Symbol(0, 0, symbol)));
    }
  });
}

function convertStatements(ast) {
  return depthWalk(ast, function (node) {
    if (!(node instanceof nodes.If) && !(node instanceof nodes.For)) {
      return undefined;
    }

    var async = false;
    walk(node, function (child) {
      if (child instanceof nodes.FilterAsync || child instanceof nodes.IfAsync || child instanceof nodes.AsyncEach || child instanceof nodes.AsyncAll || child instanceof nodes.CallExtensionAsync) {
        async = true; // Stop iterating by returning the node

        return child;
      }

      return undefined;
    });

    if (async) {
      if (node instanceof nodes.If) {
        return new nodes.IfAsync(node.lineno, node.colno, node.cond, node.body, node.else_);
      } else if (node instanceof nodes.For && !(node instanceof nodes.AsyncAll)) {
        return new nodes.AsyncEach(node.lineno, node.colno, node.arr, node.name, node.body, node.else_);
      }
    }

    return undefined;
  });
}

function cps(ast, asyncFilters) {
  return convertStatements(liftSuper(liftFilters(ast, asyncFilters)));
}

function transform(ast, asyncFilters) {
  return cps(ast, asyncFilters || []);
} // var parser = require('./parser');
// var src = 'hello {% foo %}{% endfoo %} end';
// var ast = transform(parser.parse(src, [new FooExtension()]), ['bar']);
// nodes.printNodes(ast);


module.exports = {
  transform: transform
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var r = __webpack_require__(2);

var exports = module.exports = {};

function normalize(value, defaultValue) {
  if (value === null || value === undefined || value === false) {
    return defaultValue;
  }

  return value;
}

exports.abs = Math.abs;

function isNaN(num) {
  return num !== num; // eslint-disable-line no-self-compare
}

function batch(arr, linecount, fillWith) {
  var i;
  var res = [];
  var tmp = [];

  for (i = 0; i < arr.length; i++) {
    if (i % linecount === 0 && tmp.length) {
      res.push(tmp);
      tmp = [];
    }

    tmp.push(arr[i]);
  }

  if (tmp.length) {
    if (fillWith) {
      for (i = tmp.length; i < linecount; i++) {
        tmp.push(fillWith);
      }
    }

    res.push(tmp);
  }

  return res;
}

exports.batch = batch;

function capitalize(str) {
  str = normalize(str, '');
  var ret = str.toLowerCase();
  return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
}

exports.capitalize = capitalize;

function center(str, width) {
  str = normalize(str, '');
  width = width || 80;

  if (str.length >= width) {
    return str;
  }

  var spaces = width - str.length;
  var pre = lib.repeat(' ', spaces / 2 - spaces % 2);
  var post = lib.repeat(' ', spaces / 2);
  return r.copySafeness(str, pre + str + post);
}

exports.center = center;

function default_(val, def, bool) {
  if (bool) {
    return val || def;
  } else {
    return val !== undefined ? val : def;
  }
} // TODO: it is confusing to export something called 'default'


exports['default'] = default_; // eslint-disable-line dot-notation

function dictsort(val, caseSensitive, by) {
  if (!lib.isObject(val)) {
    throw new lib.TemplateError('dictsort filter: val must be an object');
  }

  var array = []; // deliberately include properties from the object's prototype

  for (var k in val) {
    // eslint-disable-line guard-for-in, no-restricted-syntax
    array.push([k, val[k]]);
  }

  var si;

  if (by === undefined || by === 'key') {
    si = 0;
  } else if (by === 'value') {
    si = 1;
  } else {
    throw new lib.TemplateError('dictsort filter: You can only sort by either key or value');
  }

  array.sort(function (t1, t2) {
    var a = t1[si];
    var b = t2[si];

    if (!caseSensitive) {
      if (lib.isString(a)) {
        a = a.toUpperCase();
      }

      if (lib.isString(b)) {
        b = b.toUpperCase();
      }
    }

    return a > b ? 1 : a === b ? 0 : -1; // eslint-disable-line no-nested-ternary
  });
  return array;
}

exports.dictsort = dictsort;

function dump(obj, spaces) {
  return JSON.stringify(obj, null, spaces);
}

exports.dump = dump;

function escape(str) {
  if (str instanceof r.SafeString) {
    return str;
  }

  str = str === null || str === undefined ? '' : str;
  return r.markSafe(lib.escape(str.toString()));
}

exports.escape = escape;

function safe(str) {
  if (str instanceof r.SafeString) {
    return str;
  }

  str = str === null || str === undefined ? '' : str;
  return r.markSafe(str.toString());
}

exports.safe = safe;

function first(arr) {
  return arr[0];
}

exports.first = first;

function groupby(arr, attr) {
  return lib.groupBy(arr, attr);
}

exports.groupby = groupby;

function indent(str, width, indentfirst) {
  str = normalize(str, '');

  if (str === '') {
    return '';
  }

  width = width || 4; // let res = '';

  var lines = str.split('\n');
  var sp = lib.repeat(' ', width);
  var res = lines.map(function (l, i) {
    return i === 0 && !indentfirst ? l + "\n" : "" + sp + l + "\n";
  }).join('');
  return r.copySafeness(str, res);
}

exports.indent = indent;

function join(arr, del, attr) {
  del = del || '';

  if (attr) {
    arr = lib.map(arr, function (v) {
      return v[attr];
    });
  }

  return arr.join(del);
}

exports.join = join;

function last(arr) {
  return arr[arr.length - 1];
}

exports.last = last;

function lengthFilter(val) {
  var value = normalize(val, '');

  if (value !== undefined) {
    if (typeof Map === 'function' && value instanceof Map || typeof Set === 'function' && value instanceof Set) {
      // ECMAScript 2015 Maps and Sets
      return value.size;
    }

    if (lib.isObject(value) && !(value instanceof r.SafeString)) {
      // Objects (besides SafeStrings), non-primative Arrays
      return lib.keys(value).length;
    }

    return value.length;
  }

  return 0;
}

exports.length = lengthFilter;

function list(val) {
  if (lib.isString(val)) {
    return val.split('');
  } else if (lib.isObject(val)) {
    return lib._entries(val || {}).map(function (_ref) {
      var key = _ref[0],
          value = _ref[1];
      return {
        key: key,
        value: value
      };
    });
  } else if (lib.isArray(val)) {
    return val;
  } else {
    throw new lib.TemplateError('list filter: type not iterable');
  }
}

exports.list = list;

function lower(str) {
  str = normalize(str, '');
  return str.toLowerCase();
}

exports.lower = lower;

function nl2br(str) {
  if (str === null || str === undefined) {
    return '';
  }

  return r.copySafeness(str, str.replace(/\r\n|\n/g, '<br />\n'));
}

exports.nl2br = nl2br;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

exports.random = random;

function rejectattr(arr, attr) {
  return arr.filter(function (item) {
    return !item[attr];
  });
}

exports.rejectattr = rejectattr;

function selectattr(arr, attr) {
  return arr.filter(function (item) {
    return !!item[attr];
  });
}

exports.selectattr = selectattr;

function replace(str, old, new_, maxCount) {
  var originalStr = str;

  if (old instanceof RegExp) {
    return str.replace(old, new_);
  }

  if (typeof maxCount === 'undefined') {
    maxCount = -1;
  }

  var res = ''; // Output
  // Cast Numbers in the search term to string

  if (typeof old === 'number') {
    old = '' + old;
  } else if (typeof old !== 'string') {
    // If it is something other than number or string,
    // return the original string
    return str;
  } // Cast numbers in the replacement to string


  if (typeof str === 'number') {
    str = '' + str;
  } // If by now, we don't have a string, throw it back


  if (typeof str !== 'string' && !(str instanceof r.SafeString)) {
    return str;
  } // ShortCircuits


  if (old === '') {
    // Mimic the python behaviour: empty string is replaced
    // by replacement e.g. "abc"|replace("", ".") -> .a.b.c.
    res = new_ + str.split('').join(new_) + new_;
    return r.copySafeness(str, res);
  }

  var nextIndex = str.indexOf(old); // if # of replacements to perform is 0, or the string to does
  // not contain the old value, return the string

  if (maxCount === 0 || nextIndex === -1) {
    return str;
  }

  var pos = 0;
  var count = 0; // # of replacements made

  while (nextIndex > -1 && (maxCount === -1 || count < maxCount)) {
    // Grab the next chunk of src string and add it with the
    // replacement, to the result
    res += str.substring(pos, nextIndex) + new_; // Increment our pointer in the src string

    pos = nextIndex + old.length;
    count++; // See if there are any more replacements to be made

    nextIndex = str.indexOf(old, pos);
  } // We've either reached the end, or done the max # of
  // replacements, tack on any remaining string


  if (pos < str.length) {
    res += str.substring(pos);
  }

  return r.copySafeness(originalStr, res);
}

exports.replace = replace;

function reverse(val) {
  var arr;

  if (lib.isString(val)) {
    arr = list(val);
  } else {
    // Copy it
    arr = lib.map(val, function (v) {
      return v;
    });
  }

  arr.reverse();

  if (lib.isString(val)) {
    return r.copySafeness(val, arr.join(''));
  }

  return arr;
}

exports.reverse = reverse;

function round(val, precision, method) {
  precision = precision || 0;
  var factor = Math.pow(10, precision);
  var rounder;

  if (method === 'ceil') {
    rounder = Math.ceil;
  } else if (method === 'floor') {
    rounder = Math.floor;
  } else {
    rounder = Math.round;
  }

  return rounder(val * factor) / factor;
}

exports.round = round;

function slice(arr, slices, fillWith) {
  var sliceLength = Math.floor(arr.length / slices);
  var extra = arr.length % slices;
  var res = [];
  var offset = 0;

  for (var i = 0; i < slices; i++) {
    var start = offset + i * sliceLength;

    if (i < extra) {
      offset++;
    }

    var end = offset + (i + 1) * sliceLength;
    var currSlice = arr.slice(start, end);

    if (fillWith && i >= extra) {
      currSlice.push(fillWith);
    }

    res.push(currSlice);
  }

  return res;
}

exports.slice = slice;

function sum(arr, attr, start) {
  if (start === void 0) {
    start = 0;
  }

  if (attr) {
    arr = lib.map(arr, function (v) {
      return v[attr];
    });
  }

  return start + arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

exports.sum = sum;
exports.sort = r.makeMacro(['value', 'reverse', 'case_sensitive', 'attribute'], [], function (arr, reversed, caseSens, attr) {
  // Copy it
  var array = lib.map(arr, function (v) {
    return v;
  });
  array.sort(function (a, b) {
    var x = attr ? a[attr] : a;
    var y = attr ? b[attr] : b;

    if (!caseSens && lib.isString(x) && lib.isString(y)) {
      x = x.toLowerCase();
      y = y.toLowerCase();
    }

    if (x < y) {
      return reversed ? 1 : -1;
    } else if (x > y) {
      return reversed ? -1 : 1;
    } else {
      return 0;
    }
  });
  return array;
});

function string(obj) {
  return r.copySafeness(obj, obj);
}

exports.string = string;

function striptags(input, preserveLinebreaks) {
  input = normalize(input, '');
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
  var trimmedInput = trim(input.replace(tags, ''));
  var res = '';

  if (preserveLinebreaks) {
    res = trimmedInput.replace(/^ +| +$/gm, '') // remove leading and trailing spaces
    .replace(/ +/g, ' ') // squash adjacent spaces
    .replace(/(\r\n)/g, '\n') // normalize linebreaks (CRLF -> LF)
    .replace(/\n\n\n+/g, '\n\n'); // squash abnormal adjacent linebreaks
  } else {
    res = trimmedInput.replace(/\s+/gi, ' ');
  }

  return r.copySafeness(input, res);
}

exports.striptags = striptags;

function title(str) {
  str = normalize(str, '');
  var words = str.split(' ').map(function (word) {
    return capitalize(word);
  });
  return r.copySafeness(str, words.join(' '));
}

exports.title = title;

function trim(str) {
  return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
}

exports.trim = trim;

function truncate(input, length, killwords, end) {
  var orig = input;
  input = normalize(input, '');
  length = length || 255;

  if (input.length <= length) {
    return input;
  }

  if (killwords) {
    input = input.substring(0, length);
  } else {
    var idx = input.lastIndexOf(' ', length);

    if (idx === -1) {
      idx = length;
    }

    input = input.substring(0, idx);
  }

  input += end !== undefined && end !== null ? end : '...';
  return r.copySafeness(orig, input);
}

exports.truncate = truncate;

function upper(str) {
  str = normalize(str, '');
  return str.toUpperCase();
}

exports.upper = upper;

function urlencode(obj) {
  var enc = encodeURIComponent;

  if (lib.isString(obj)) {
    return enc(obj);
  } else {
    var keyvals = lib.isArray(obj) ? obj : lib._entries(obj);
    return keyvals.map(function (_ref2) {
      var k = _ref2[0],
          v = _ref2[1];
      return enc(k) + "=" + enc(v);
    }).join('&');
  }
}

exports.urlencode = urlencode; // For the jinja regexp, see
// https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23

var puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/; // from http://blog.gerv.net/2011/05/html5_email_address_regexp/

var emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
var httpHttpsRe = /^https?:\/\/.*$/;
var wwwRe = /^www\./;
var tldRe = /\.(?:org|net|com)(?:\:|\/|$)/;

function urlize(str, length, nofollow) {
  if (isNaN(length)) {
    length = Infinity;
  }

  var noFollowAttr = nofollow === true ? ' rel="nofollow"' : '';
  var words = str.split(/(\s+)/).filter(function (word) {
    // If the word has no length, bail. This can happen for str with
    // trailing whitespace.
    return word && word.length;
  }).map(function (word) {
    var matches = word.match(puncRe);
    var possibleUrl = matches ? matches[1] : word;
    var shortUrl = possibleUrl.substr(0, length); // url that starts with http or https

    if (httpHttpsRe.test(possibleUrl)) {
      return "<a href=\"" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    } // url that starts with www.


    if (wwwRe.test(possibleUrl)) {
      return "<a href=\"http://" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    } // an email address of the form username@domain.tld


    if (emailRe.test(possibleUrl)) {
      return "<a href=\"mailto:" + possibleUrl + "\">" + possibleUrl + "</a>";
    } // url that ends in .com, .org or .net that is not an email address


    if (tldRe.test(possibleUrl)) {
      return "<a href=\"http://" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    }

    return word;
  });
  return words.join('');
}

exports.urlize = urlize;

function wordcount(str) {
  str = normalize(str, '');
  var words = str ? str.match(/\w+/g) : null;
  return words ? words.length : null;
}

exports.wordcount = wordcount;

function float(val, def) {
  var res = parseFloat(val);
  return isNaN(res) ? def : res;
}

exports.float = float;

function int(val, def) {
  var res = parseInt(val, 10);
  return isNaN(res) ? def : res;
}

exports.int = int; // Aliases

exports.d = exports.default;
exports.e = exports.escape;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Loader = __webpack_require__(6);

var PrecompiledLoader =
/*#__PURE__*/
function (_Loader) {
  _inheritsLoose(PrecompiledLoader, _Loader);

  function PrecompiledLoader(compiledTemplates) {
    var _this;

    _this = _Loader.call(this) || this;
    _this.precompiled = compiledTemplates || {};
    return _this;
  }

  var _proto = PrecompiledLoader.prototype;

  _proto.getSource = function getSource(name) {
    if (this.precompiled[name]) {
      return {
        src: {
          type: 'code',
          obj: this.precompiled[name]
        },
        path: name
      };
    }

    return null;
  };

  return PrecompiledLoader;
}(Loader);

module.exports = {
  PrecompiledLoader: PrecompiledLoader
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SafeString = __webpack_require__(2).SafeString;
/**
 * Returns `true` if the object is a function, otherwise `false`.
 * @param { any } value
 * @returns { boolean }
 */


function callable(value) {
  return typeof value === 'function';
}

exports.callable = callable;
/**
 * Returns `true` if the object is strictly not `undefined`.
 * @param { any } value
 * @returns { boolean }
 */

function defined(value) {
  return value !== undefined;
}

exports.defined = defined;
/**
 * Returns `true` if the operand (one) is divisble by the test's argument
 * (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function divisibleby(one, two) {
  return one % two === 0;
}

exports.divisibleby = divisibleby;
/**
 * Returns true if the string has been escaped (i.e., is a SafeString).
 * @param { any } value
 * @returns { boolean }
 */

function escaped(value) {
  return value instanceof SafeString;
}

exports.escaped = escaped;
/**
 * Returns `true` if the arguments are strictly equal.
 * @param { any } one
 * @param { any } two
 */

function equalto(one, two) {
  return one === two;
}

exports.equalto = equalto; // Aliases

exports.eq = exports.equalto;
exports.sameas = exports.equalto;
/**
 * Returns `true` if the value is evenly divisible by 2.
 * @param { number } value
 * @returns { boolean }
 */

function even(value) {
  return value % 2 === 0;
}

exports.even = even;
/**
 * Returns `true` if the value is falsy - if I recall correctly, '', 0, false,
 * undefined, NaN or null. I don't know if we should stick to the default JS
 * behavior or attempt to replicate what Python believes should be falsy (i.e.,
 * empty arrays, empty dicts, not 0...).
 * @param { any } value
 * @returns { boolean }
 */

function falsy(value) {
  return !value;
}

exports.falsy = falsy;
/**
 * Returns `true` if the operand (one) is greater or equal to the test's
 * argument (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function ge(one, two) {
  return one >= two;
}

exports.ge = ge;
/**
 * Returns `true` if the operand (one) is greater than the test's argument
 * (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function greaterthan(one, two) {
  return one > two;
}

exports.greaterthan = greaterthan; // alias

exports.gt = exports.greaterthan;
/**
 * Returns `true` if the operand (one) is less than or equal to the test's
 * argument (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function le(one, two) {
  return one <= two;
}

exports.le = le;
/**
 * Returns `true` if the operand (one) is less than the test's passed argument
 * (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function lessthan(one, two) {
  return one < two;
}

exports.lessthan = lessthan; // alias

exports.lt = exports.lessthan;
/**
 * Returns `true` if the string is lowercased.
 * @param { string } value
 * @returns { boolean }
 */

function lower(value) {
  return value.toLowerCase() === value;
}

exports.lower = lower;
/**
 * Returns `true` if the operand (one) is less than or equal to the test's
 * argument (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function ne(one, two) {
  return one !== two;
}

exports.ne = ne;
/**
 * Returns true if the value is strictly equal to `null`.
 * @param { any }
 * @returns { boolean }
 */

function nullTest(value) {
  return value === null;
}

exports.null = nullTest;
/**
 * Returns true if value is a number.
 * @param { any }
 * @returns { boolean }
 */

function number(value) {
  return typeof value === 'number';
}

exports.number = number;
/**
 * Returns `true` if the value is *not* evenly divisible by 2.
 * @param { number } value
 * @returns { boolean }
 */

function odd(value) {
  return value % 2 === 1;
}

exports.odd = odd;
/**
 * Returns `true` if the value is a string, `false` if not.
 * @param { any } value
 * @returns { boolean }
 */

function string(value) {
  return typeof value === 'string';
}

exports.string = string;
/**
 * Returns `true` if the value is not in the list of things considered falsy:
 * '', null, undefined, 0, NaN and false.
 * @param { any } value
 * @returns { boolean }
 */

function truthy(value) {
  return !!value;
}

exports.truthy = truthy;
/**
 * Returns `true` if the value is undefined.
 * @param { any } value
 * @returns { boolean }
 */

function undefinedTest(value) {
  return value === undefined;
}

exports.undefined = undefinedTest;
/**
 * Returns `true` if the string is uppercased.
 * @param { string } value
 * @returns { boolean }
 */

function upper(value) {
  return value.toUpperCase() === value;
}

exports.upper = upper;
/**
 * If ES6 features are available, returns `true` if the value implements the
 * `Symbol.iterator` method. If not, it's a string or Array.
 *
 * Could potentially cause issues if a browser exists that has Set and Map but
 * not Symbol.
 *
 * @param { any } value
 * @returns { boolean }
 */

function iterable(value) {
  if (typeof Symbol !== 'undefined') {
    return !!value[Symbol.iterator];
  } else {
    return Array.isArray(value) || typeof value === 'string';
  }
}

exports.iterable = iterable;
/**
 * If ES6 features are available, returns `true` if the value is an object hash
 * or an ES6 Map. Otherwise just return if it's an object hash.
 * @param { any } value
 * @returns { boolean }
 */

function mapping(value) {
  // only maps and object hashes
  var bool = value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value);

  if (Set) {
    return bool && !(value instanceof Set);
  } else {
    return bool;
  }
}

exports.mapping = mapping;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _cycler(items) {
  var index = -1;
  return {
    current: null,
    reset: function reset() {
      index = -1;
      this.current = null;
    },
    next: function next() {
      index++;

      if (index >= items.length) {
        index = 0;
      }

      this.current = items[index];
      return this.current;
    }
  };
}

function _joiner(sep) {
  sep = sep || ',';
  var first = true;
  return function () {
    var val = first ? '' : sep;
    first = false;
    return val;
  };
} // Making this a function instead so it returns a new object
// each time it's called. That way, if something like an environment
// uses it, they will each have their own copy.


function globals() {
  return {
    range: function range(start, stop, step) {
      if (typeof stop === 'undefined') {
        stop = start;
        start = 0;
        step = 1;
      } else if (!step) {
        step = 1;
      }

      var arr = [];

      if (step > 0) {
        for (var i = start; i < stop; i += step) {
          arr.push(i);
        }
      } else {
        for (var _i = start; _i > stop; _i += step) {
          // eslint-disable-line for-direction
          arr.push(_i);
        }
      }

      return arr;
    },
    cycler: function cycler() {
      return _cycler(Array.prototype.slice.call(arguments));
    },
    joiner: function joiner(sep) {
      return _joiner(sep);
    }
  };
}

module.exports = globals;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(4);

module.exports = function express(env, app) {
  function NunjucksView(name, opts) {
    this.name = name;
    this.path = name;
    this.defaultEngine = opts.defaultEngine;
    this.ext = path.extname(name);

    if (!this.ext && !this.defaultEngine) {
      throw new Error('No default engine was specified and no extension was provided.');
    }

    if (!this.ext) {
      this.name += this.ext = (this.defaultEngine[0] !== '.' ? '.' : '') + this.defaultEngine;
    }
  }

  NunjucksView.prototype.render = function render(opts, cb) {
    env.render(this.name, opts, cb);
  };

  app.set('view', NunjucksView);
  app.set('nunjucksEnv', env);
  return env;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(4);

var path = __webpack_require__(4);

var _require = __webpack_require__(0),
    _prettifyError = _require._prettifyError;

var compiler = __webpack_require__(5);

var _require2 = __webpack_require__(7),
    Environment = _require2.Environment;

var precompileGlobal = __webpack_require__(23);

function match(filename, patterns) {
  if (!Array.isArray(patterns)) {
    return false;
  }

  return patterns.some(function (pattern) {
    return filename.match(pattern);
  });
}

function precompileString(str, opts) {
  opts = opts || {};
  opts.isString = true;
  var env = opts.env || new Environment([]);
  var wrapper = opts.wrapper || precompileGlobal;

  if (!opts.name) {
    throw new Error('the "name" option is required when compiling a string');
  }

  return wrapper([_precompile(str, opts.name, env)], opts);
}

function precompile(input, opts) {
  // The following options are available:
  //
  // * name: name of the template (auto-generated when compiling a directory)
  // * isString: input is a string, not a file path
  // * asFunction: generate a callable function
  // * force: keep compiling on error
  // * env: the Environment to use (gets extensions and async filters from it)
  // * include: which file/folders to include (folders are auto-included, files are auto-excluded)
  // * exclude: which file/folders to exclude (folders are auto-included, files are auto-excluded)
  // * wrapper: function(templates, opts) {...}
  //       Customize the output format to store the compiled template.
  //       By default, templates are stored in a global variable used by the runtime.
  //       A custom loader will be necessary to load your custom wrapper.
  opts = opts || {};
  var env = opts.env || new Environment([]);
  var wrapper = opts.wrapper || precompileGlobal;

  if (opts.isString) {
    return precompileString(input, opts);
  }

  var pathStats = fs.existsSync(input) && fs.statSync(input);
  var precompiled = [];
  var templates = [];

  function addTemplates(dir) {
    fs.readdirSync(dir).forEach(function (file) {
      var filepath = path.join(dir, file);
      var subpath = filepath.substr(path.join(input, '/').length);
      var stat = fs.statSync(filepath);

      if (stat && stat.isDirectory()) {
        subpath += '/';

        if (!match(subpath, opts.exclude)) {
          addTemplates(filepath);
        }
      } else if (match(subpath, opts.include)) {
        templates.push(filepath);
      }
    });
  }

  if (pathStats.isFile()) {
    precompiled.push(_precompile(fs.readFileSync(input, 'utf-8'), opts.name || input, env));
  } else if (pathStats.isDirectory()) {
    addTemplates(input);

    for (var i = 0; i < templates.length; i++) {
      var name = templates[i].replace(path.join(input, '/'), '');

      try {
        precompiled.push(_precompile(fs.readFileSync(templates[i], 'utf-8'), name, env));
      } catch (e) {
        if (opts.force) {
          // Don't stop generating the output if we're
          // forcing compilation.
          console.error(e); // eslint-disable-line no-console
        } else {
          throw e;
        }
      }
    }
  }

  return wrapper(precompiled, opts);
}

function _precompile(str, name, env) {
  env = env || new Environment([]);
  var asyncFilters = env.asyncFilters;
  var extensions = env.extensionsList;
  var template;
  name = name.replace(/\\/g, '/');

  try {
    template = compiler.compile(str, asyncFilters, extensions, name, env.opts);
  } catch (err) {
    throw _prettifyError(name, false, err);
  }

  return {
    name: name,
    template: template
  };
}

module.exports = {
  precompile: precompile,
  precompileString: precompileString
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function precompileGlobal(templates, opts) {
  var out = '';
  opts = opts || {};

  for (var i = 0; i < templates.length; i++) {
    var name = JSON.stringify(templates[i].name);
    var template = templates[i].template;
    out += '(function() {' + '(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})' + '[' + name + '] = (function() {\n' + template + '\n})();\n';

    if (opts.asFunction) {
      out += 'return function(ctx, cb) { return nunjucks.render(' + name + ', ctx, cb); }\n';
    }

    out += '})();\n';
  }

  return out;
}

module.exports = precompileGlobal;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

function installCompat() {
  'use strict';
  /* eslint-disable camelcase */
  // This must be called like `nunjucks.installCompat` so that `this`
  // references the nunjucks instance

  var runtime = this.runtime;
  var lib = this.lib; // Handle slim case where these 'modules' are excluded from the built source

  var Compiler = this.compiler.Compiler;
  var Parser = this.parser.Parser;
  var nodes = this.nodes;
  var lexer = this.lexer;
  var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
  var orig_memberLookup = runtime.memberLookup;
  var orig_Compiler_assertType;
  var orig_Parser_parseAggregate;

  if (Compiler) {
    orig_Compiler_assertType = Compiler.prototype.assertType;
  }

  if (Parser) {
    orig_Parser_parseAggregate = Parser.prototype.parseAggregate;
  }

  function uninstall() {
    runtime.contextOrFrameLookup = orig_contextOrFrameLookup;
    runtime.memberLookup = orig_memberLookup;

    if (Compiler) {
      Compiler.prototype.assertType = orig_Compiler_assertType;
    }

    if (Parser) {
      Parser.prototype.parseAggregate = orig_Parser_parseAggregate;
    }
  }

  runtime.contextOrFrameLookup = function contextOrFrameLookup(context, frame, key) {
    var val = orig_contextOrFrameLookup.apply(this, arguments);

    if (val !== undefined) {
      return val;
    }

    switch (key) {
      case 'True':
        return true;

      case 'False':
        return false;

      case 'None':
        return null;

      default:
        return undefined;
    }
  };

  function getTokensState(tokens) {
    return {
      index: tokens.index,
      lineno: tokens.lineno,
      colno: tokens.colno
    };
  }

  if ("STD" !== 'SLIM' && nodes && Compiler && Parser) {
    // i.e., not slim mode
    var Slice = nodes.Node.extend('Slice', {
      fields: ['start', 'stop', 'step'],
      init: function init(lineno, colno, start, stop, step) {
        start = start || new nodes.Literal(lineno, colno, null);
        stop = stop || new nodes.Literal(lineno, colno, null);
        step = step || new nodes.Literal(lineno, colno, 1);
        this.parent(lineno, colno, start, stop, step);
      }
    });

    Compiler.prototype.assertType = function assertType(node) {
      if (node instanceof Slice) {
        return;
      }

      orig_Compiler_assertType.apply(this, arguments);
    };

    Compiler.prototype.compileSlice = function compileSlice(node, frame) {
      this._emit('(');

      this._compileExpression(node.start, frame);

      this._emit('),(');

      this._compileExpression(node.stop, frame);

      this._emit('),(');

      this._compileExpression(node.step, frame);

      this._emit(')');
    };

    Parser.prototype.parseAggregate = function parseAggregate() {
      var _this = this;

      var origState = getTokensState(this.tokens); // Set back one accounting for opening bracket/parens

      origState.colno--;
      origState.index--;

      try {
        return orig_Parser_parseAggregate.apply(this);
      } catch (e) {
        var errState = getTokensState(this.tokens);

        var rethrow = function rethrow() {
          lib._assign(_this.tokens, errState);

          return e;
        }; // Reset to state before original parseAggregate called


        lib._assign(this.tokens, origState);

        this.peeked = false;
        var tok = this.peekToken();

        if (tok.type !== lexer.TOKEN_LEFT_BRACKET) {
          throw rethrow();
        } else {
          this.nextToken();
        }

        var node = new Slice(tok.lineno, tok.colno); // If we don't encounter a colon while parsing, this is not a slice,
        // so re-raise the original exception.

        var isSlice = false;

        for (var i = 0; i <= node.fields.length; i++) {
          if (this.skip(lexer.TOKEN_RIGHT_BRACKET)) {
            break;
          }

          if (i === node.fields.length) {
            if (isSlice) {
              this.fail('parseSlice: too many slice components', tok.lineno, tok.colno);
            } else {
              break;
            }
          }

          if (this.skip(lexer.TOKEN_COLON)) {
            isSlice = true;
          } else {
            var field = node.fields[i];
            node[field] = this.parseExpression();
            isSlice = this.skip(lexer.TOKEN_COLON) || isSlice;
          }
        }

        if (!isSlice) {
          throw rethrow();
        }

        return new nodes.Array(tok.lineno, tok.colno, [node]);
      }
    };
  }

  function sliceLookup(obj, start, stop, step) {
    obj = obj || [];

    if (start === null) {
      start = step < 0 ? obj.length - 1 : 0;
    }

    if (stop === null) {
      stop = step < 0 ? -1 : obj.length;
    } else if (stop < 0) {
      stop += obj.length;
    }

    if (start < 0) {
      start += obj.length;
    }

    var results = [];

    for (var i = start;; i += step) {
      if (i < 0 || i > obj.length) {
        break;
      }

      if (step > 0 && i >= stop) {
        break;
      }

      if (step < 0 && i <= stop) {
        break;
      }

      results.push(runtime.memberLookup(obj, i));
    }

    return results;
  }

  function hasOwnProp(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  var ARRAY_MEMBERS = {
    pop: function pop(index) {
      if (index === undefined) {
        return this.pop();
      }

      if (index >= this.length || index < 0) {
        throw new Error('KeyError');
      }

      return this.splice(index, 1);
    },
    append: function append(element) {
      return this.push(element);
    },
    remove: function remove(element) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
          return this.splice(i, 1);
        }
      }

      throw new Error('ValueError');
    },
    count: function count(element) {
      var count = 0;

      for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
          count++;
        }
      }

      return count;
    },
    index: function index(element) {
      var i;

      if ((i = this.indexOf(element)) === -1) {
        throw new Error('ValueError');
      }

      return i;
    },
    find: function find(element) {
      return this.indexOf(element);
    },
    insert: function insert(index, elem) {
      return this.splice(index, 0, elem);
    }
  };
  var OBJECT_MEMBERS = {
    items: function items() {
      return lib._entries(this);
    },
    values: function values() {
      return lib._values(this);
    },
    keys: function keys() {
      return lib.keys(this);
    },
    get: function get(key, def) {
      var output = this[key];

      if (output === undefined) {
        output = def;
      }

      return output;
    },
    has_key: function has_key(key) {
      return hasOwnProp(this, key);
    },
    pop: function pop(key, def) {
      var output = this[key];

      if (output === undefined && def !== undefined) {
        output = def;
      } else if (output === undefined) {
        throw new Error('KeyError');
      } else {
        delete this[key];
      }

      return output;
    },
    popitem: function popitem() {
      var keys = lib.keys(this);

      if (!keys.length) {
        throw new Error('KeyError');
      }

      var k = keys[0];
      var val = this[k];
      delete this[k];
      return [k, val];
    },
    setdefault: function setdefault(key, def) {
      if (def === void 0) {
        def = null;
      }

      if (!(key in this)) {
        this[key] = def;
      }

      return this[key];
    },
    update: function update(kwargs) {
      lib._assign(this, kwargs);

      return null; // Always returns None
    }
  };
  OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
  OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
  OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;

  runtime.memberLookup = function memberLookup(obj, val, autoescape) {
    if (arguments.length === 4) {
      return sliceLookup.apply(this, arguments);
    }

    obj = obj || {}; // If the object is an object, return any of the methods that Python would
    // otherwise provide.

    if (lib.isArray(obj) && hasOwnProp(ARRAY_MEMBERS, val)) {
      return ARRAY_MEMBERS[val].bind(obj);
    }

    if (lib.isObject(obj) && hasOwnProp(OBJECT_MEMBERS, val)) {
      return OBJECT_MEMBERS[val].bind(obj);
    }

    return orig_memberLookup.apply(this, arguments);
  };

  return uninstall;
}

module.exports = installCompat;

/***/ })
/******/ ]);
});

}).call(this,require('_process'))

},{"_process":2}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./lib/controller');

var _controller2 = _interopRequireDefault(_controller);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.info("@hello-controller.js");

_nunjucks2.default.configure('./dist');

function getName(request) {
  var name = {
    fname: "Rick",
    lname: "Sanchez"
  };

  var nameParts = request.params.name ? request.params.name.split('/') : [];

  name.fname = nameParts[0] || request.query.fname || name.fname;
  name.lname = nameParts[1] || request.query.lname || name.lname;

  console.info("@hello-controller.js in getName()");

  return name;
};

var HelloController = function (_Controller) {
  _inherits(HelloController, _Controller);

  function HelloController() {
    _classCallCheck(this, HelloController);

    return _possibleConstructorReturn(this, (HelloController.__proto__ || Object.getPrototypeOf(HelloController)).apply(this, arguments));
  }

  _createClass(HelloController, [{
    key: 'toString',
    value: function toString(callback) {
      console.info("@hello-controller.js in HelloController Class");
      return _nunjucks2.default.render('hello.html', getName(this.context), function (err, html) {
        if (err) {
          return callback(err, null);
        }
        callback(null, html);
      });
    }
  }]);

  return HelloController;
}(_controller2.default);

exports.default = HelloController;

},{"./lib/controller":5,"nunjucks":1}],4:[function(require,module,exports){
'use strict';

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

var _helloController = require('./hello-controller');

var _helloController2 = _interopRequireDefault(_helloController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var application = new _lib2.default({
  '/hello/{name*}': _helloController2.default
}, {
  target: 'body'
});

application.start();

console.info('hello hello client');

},{"./hello-controller":3,"./lib":6}],5:[function(require,module,exports){
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
      console.info("@lib/index.js Controller Class index");
    }
  }, {
    key: "toString",
    value: function toString(callback) {
      callback(null, '成功');
      console.info("@lib/index.js Controller Class toString");
    }
  }]);

  return Controller;
}();

exports.default = Controller;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function () {
  function Application() {
    _classCallCheck(this, Application);
  }

  _createClass(Application, [{
    key: 'navigate',
    value: function navigate(url) {
      var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


      if (!history.pushState) {
        window.location = url;
        return;
      }

      console.log(url);

      if (push) {
        history.pushState({}, null, url);
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      this.poStateListener = window.addEventListener('popstate', function (e) {
        var _window$location = window.location,
            pathname = _window$location.pathname,
            search = _window$location.search;

        var url = '${pathname}${search}';
        _this.navigate(url, false);
      });
      this.clickListener = document.addEventListener('click', function (e) {
        var target = e.target;

        var identifier = target.dataset.navigate;
        var href = target.getAttribute('href');

        if (identifier !== undefined) {
          if (href) {
            e.preventDefault();
          }

          _this.navigate(identifier || href);
        }
      });
    }
  }]);

  return Application;
}();

exports.default = Application;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnVuanVja3MvYnJvd3Nlci9udW5qdWNrcy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJzcmMvaGVsbG8tY29udHJvbGxlci5qcyIsInNyYy9pbmRleC5jbGllbnQuanMiLCJzcmMvbGliL2NvbnRyb2xsZXIuanMiLCJzcmMvbGliL2luZGV4LmNsaWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeG9QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDeExBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLFFBQVEsSUFBUixDQUFhLHNCQUFiOztBQUVBLG1CQUFTLFNBQVQsQ0FBbUIsUUFBbkI7O0FBRUEsU0FBUyxPQUFULENBQWlCLE9BQWpCLEVBQXlCO0FBQ3ZCLE1BQUksT0FBTztBQUNULFdBQU8sTUFERTtBQUVULFdBQU87QUFGRSxHQUFYOztBQUtBLE1BQUksWUFBWSxRQUFRLE1BQVIsQ0FBZSxJQUFmLEdBQXNCLFFBQVEsTUFBUixDQUFlLElBQWYsQ0FBb0IsS0FBcEIsQ0FBMEIsR0FBMUIsQ0FBdEIsR0FBdUQsRUFBdkU7O0FBRUEsT0FBSyxLQUFMLEdBQWMsVUFBVSxDQUFWLEtBQWdCLFFBQVEsS0FBUixDQUFjLEtBQS9CLElBQXlDLEtBQUssS0FBM0Q7QUFDQSxPQUFLLEtBQUwsR0FBYyxVQUFVLENBQVYsS0FBZ0IsUUFBUSxLQUFSLENBQWMsS0FBL0IsSUFBeUMsS0FBSyxLQUEzRDs7QUFFQSxVQUFRLElBQVIsQ0FBYSxtQ0FBYjs7QUFFQSxTQUFPLElBQVA7QUFDRDs7SUFHb0IsZTs7Ozs7Ozs7Ozs7NkJBQ1YsUSxFQUFTO0FBQ2hCLGNBQVEsSUFBUixDQUFhLCtDQUFiO0FBQ0EsYUFBTyxtQkFBUyxNQUFULENBQ0wsWUFESyxFQUVMLFFBQVEsS0FBSyxPQUFiLENBRkssRUFHTCxVQUFDLEdBQUQsRUFBTSxJQUFOLEVBQWU7QUFDYixZQUFHLEdBQUgsRUFBTztBQUNMLGlCQUFPLFNBQVMsR0FBVCxFQUFjLElBQWQsQ0FBUDtBQUNEO0FBQ0QsaUJBQVMsSUFBVCxFQUFlLElBQWY7QUFDRCxPQVJJLENBQVA7QUFVRDs7Ozs7O2tCQWJrQixlOzs7QUN4QnJCOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sY0FBYyxrQkFDbEI7QUFDQTtBQURBLENBRGtCLEVBSWxCO0FBQ0UsVUFBUTtBQURWLENBSmtCLENBQXBCOztBQVNBLFlBQVksS0FBWjs7QUFFQSxRQUFRLElBQVIsQ0FBYSxvQkFBYjs7Ozs7Ozs7Ozs7OztJQ2hCcUIsVTtBQUNuQixzQkFBWSxPQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFNBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxZQUFRLElBQVIsQ0FBYSw0Q0FBYjtBQUNEOzs7OzBCQUVLLFcsRUFBYSxPLEVBQVMsSyxFQUFPLFEsRUFBUztBQUMxQyxlQUFTLElBQVQ7QUFDQSxjQUFRLElBQVIsQ0FBYSxzQ0FBYjtBQUNEOzs7NkJBRVEsUSxFQUFTO0FBQ2hCLGVBQVMsSUFBVCxFQUFlLElBQWY7QUFDQSxjQUFRLElBQVIsQ0FBYSx5Q0FBYjtBQUNEOzs7Ozs7a0JBZGtCLFU7Ozs7Ozs7Ozs7Ozs7SUNBQSxXOzs7Ozs7OzZCQUNWLEcsRUFBZTtBQUFBLFVBQVYsSUFBVSx1RUFBTCxJQUFLOzs7QUFFdEIsVUFBRyxDQUFDLFFBQVEsU0FBWixFQUFzQjtBQUNwQixlQUFPLFFBQVAsR0FBa0IsR0FBbEI7QUFDQTtBQUNEOztBQUVELGNBQVEsR0FBUixDQUFZLEdBQVo7O0FBRUEsVUFBRyxJQUFILEVBQVE7QUFDTixnQkFBUSxTQUFSLENBQWtCLEVBQWxCLEVBQXNCLElBQXRCLEVBQTRCLEdBQTVCO0FBQ0Q7QUFFRjs7OzRCQUVNO0FBQUE7O0FBQ0wsV0FBSyxlQUFMLEdBQXVCLE9BQU8sZ0JBQVAsQ0FBd0IsVUFBeEIsRUFBb0MsVUFBQyxDQUFELEVBQU87QUFBQSwrQkFDdkMsT0FBTyxRQURnQztBQUFBLFlBQzNELFFBRDJELG9CQUMzRCxRQUQyRDtBQUFBLFlBQ2pELE1BRGlELG9CQUNqRCxNQURpRDs7QUFFaEUsWUFBSSxNQUFNLHNCQUFWO0FBQ0EsY0FBSyxRQUFMLENBQWMsR0FBZCxFQUFtQixLQUFuQjtBQUNELE9BSnNCLENBQXZCO0FBS0EsV0FBSyxhQUFMLEdBQXFCLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBQyxDQUFELEVBQU87QUFBQSxZQUN4RCxNQUR3RCxHQUM5QyxDQUQ4QyxDQUN4RCxNQUR3RDs7QUFFN0QsWUFBSSxhQUFhLE9BQU8sT0FBUCxDQUFlLFFBQWhDO0FBQ0EsWUFBSSxPQUFPLE9BQU8sWUFBUCxDQUFvQixNQUFwQixDQUFYOztBQUVBLFlBQUcsZUFBZSxTQUFsQixFQUE0QjtBQUMxQixjQUFHLElBQUgsRUFBUTtBQUNOLGNBQUUsY0FBRjtBQUNEOztBQUVELGdCQUFLLFFBQUwsQ0FBZSxjQUFjLElBQTdCO0FBQ0Q7QUFDRixPQVpvQixDQUFyQjtBQWFEOzs7Ozs7a0JBbkNrQixXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyohIEJyb3dzZXIgYnVuZGxlIG9mIG51bmp1Y2tzIDMuMS4yICAqL1xuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibnVuanVja3NcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibnVuanVja3NcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG52YXIgT2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xudmFyIGVzY2FwZU1hcCA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgJ1xcJyc6ICcmIzM5OycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7J1xufTtcbnZhciBlc2NhcGVSZWdleCA9IC9bJlwiJzw+XS9nO1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wKG9iaiwgaykge1xuICByZXR1cm4gT2JqUHJvdG8uaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGspO1xufVxuXG5leHBvcnRzLmhhc093blByb3AgPSBoYXNPd25Qcm9wO1xuXG5mdW5jdGlvbiBsb29rdXBFc2NhcGUoY2gpIHtcbiAgcmV0dXJuIGVzY2FwZU1hcFtjaF07XG59XG5cbmZ1bmN0aW9uIF9wcmV0dGlmeUVycm9yKHBhdGgsIHdpdGhJbnRlcm5hbHMsIGVycikge1xuICBpZiAoIWVyci5VcGRhdGUpIHtcbiAgICAvLyBub3Qgb25lIG9mIG91cnMsIGNhc3QgaXRcbiAgICBlcnIgPSBuZXcgZXhwb3J0cy5UZW1wbGF0ZUVycm9yKGVycik7XG4gIH1cblxuICBlcnIuVXBkYXRlKHBhdGgpOyAvLyBVbmxlc3MgdGhleSBtYXJrZWQgdGhlIGRldiBmbGFnLCBzaG93IHRoZW0gYSB0cmFjZSBmcm9tIGhlcmVcblxuICBpZiAoIXdpdGhJbnRlcm5hbHMpIHtcbiAgICB2YXIgb2xkID0gZXJyO1xuICAgIGVyciA9IG5ldyBFcnJvcihvbGQubWVzc2FnZSk7XG4gICAgZXJyLm5hbWUgPSBvbGQubmFtZTtcbiAgfVxuXG4gIHJldHVybiBlcnI7XG59XG5cbmV4cG9ydHMuX3ByZXR0aWZ5RXJyb3IgPSBfcHJldHRpZnlFcnJvcjtcblxuZnVuY3Rpb24gVGVtcGxhdGVFcnJvcihtZXNzYWdlLCBsaW5lbm8sIGNvbG5vKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIGVycjtcbiAgdmFyIGNhdXNlO1xuXG4gIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICBjYXVzZSA9IG1lc3NhZ2U7XG4gICAgbWVzc2FnZSA9IGNhdXNlLm5hbWUgKyBcIjogXCIgKyBjYXVzZS5tZXNzYWdlO1xuICB9XG5cbiAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgIGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZXJyLCBUZW1wbGF0ZUVycm9yLnByb3RvdHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgZXJyID0gdGhpcztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCAnbWVzc2FnZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogbWVzc2FnZVxuICAgIH0pO1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgJ25hbWUnLCB7XG4gICAgdmFsdWU6ICdUZW1wbGF0ZSByZW5kZXIgZXJyb3InXG4gIH0pO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVyciwgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH1cblxuICB2YXIgZ2V0U3RhY2s7XG5cbiAgaWYgKGNhdXNlKSB7XG4gICAgdmFyIHN0YWNrRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY2F1c2UsICdzdGFjaycpO1xuXG4gICAgZ2V0U3RhY2sgPSBzdGFja0Rlc2NyaXB0b3IgJiYgKHN0YWNrRGVzY3JpcHRvci5nZXQgfHwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YWNrRGVzY3JpcHRvci52YWx1ZTtcbiAgICB9KTtcblxuICAgIGlmICghZ2V0U3RhY2spIHtcbiAgICAgIGdldFN0YWNrID0gZnVuY3Rpb24gZ2V0U3RhY2soKSB7XG4gICAgICAgIHJldHVybiBjYXVzZS5zdGFjaztcbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBzdGFjayA9IG5ldyBFcnJvcihtZXNzYWdlKS5zdGFjaztcblxuICAgIGdldFN0YWNrID0gZnVuY3Rpb24gZ2V0U3RhY2soKSB7XG4gICAgICByZXR1cm4gc3RhY2s7XG4gICAgfTtcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnIsICdzdGFjaycsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBnZXRTdGFjay5jYWxsKF90aGlzKTtcbiAgICB9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCAnY2F1c2UnLCB7XG4gICAgdmFsdWU6IGNhdXNlXG4gIH0pO1xuICBlcnIubGluZW5vID0gbGluZW5vO1xuICBlcnIuY29sbm8gPSBjb2xubztcbiAgZXJyLmZpcnN0VXBkYXRlID0gdHJ1ZTtcblxuICBlcnIuVXBkYXRlID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB2YXIgbXNnID0gJygnICsgKHBhdGggfHwgJ3Vua25vd24gcGF0aCcpICsgJyknOyAvLyBvbmx5IHNob3cgbGluZW5vICsgY29sbm8gbmV4dCB0byBwYXRoIG9mIHRlbXBsYXRlXG4gICAgLy8gd2hlcmUgZXJyb3Igb2NjdXJyZWRcblxuICAgIGlmIChfdGhpcy5maXJzdFVwZGF0ZSkge1xuICAgICAgaWYgKF90aGlzLmxpbmVubyAmJiBfdGhpcy5jb2xubykge1xuICAgICAgICBtc2cgKz0gXCIgW0xpbmUgXCIgKyBfdGhpcy5saW5lbm8gKyBcIiwgQ29sdW1uIFwiICsgX3RoaXMuY29sbm8gKyBcIl1cIjtcbiAgICAgIH0gZWxzZSBpZiAoX3RoaXMubGluZW5vKSB7XG4gICAgICAgIG1zZyArPSBcIiBbTGluZSBcIiArIF90aGlzLmxpbmVubyArIFwiXVwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1zZyArPSAnXFxuICc7XG5cbiAgICBpZiAoX3RoaXMuZmlyc3RVcGRhdGUpIHtcbiAgICAgIG1zZyArPSAnICc7XG4gICAgfVxuXG4gICAgX3RoaXMubWVzc2FnZSA9IG1zZyArIChfdGhpcy5tZXNzYWdlIHx8ICcnKTtcbiAgICBfdGhpcy5maXJzdFVwZGF0ZSA9IGZhbHNlO1xuICAgIHJldHVybiBfdGhpcztcbiAgfTtcblxuICByZXR1cm4gZXJyO1xufVxuXG5pZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihUZW1wbGF0ZUVycm9yLnByb3RvdHlwZSwgRXJyb3IucHJvdG90eXBlKTtcbn0gZWxzZSB7XG4gIFRlbXBsYXRlRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IFRlbXBsYXRlRXJyb3JcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnRzLlRlbXBsYXRlRXJyb3IgPSBUZW1wbGF0ZUVycm9yO1xuXG5mdW5jdGlvbiBlc2NhcGUodmFsKSB7XG4gIHJldHVybiB2YWwucmVwbGFjZShlc2NhcGVSZWdleCwgbG9va3VwRXNjYXBlKTtcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGU7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBPYmpQcm90by50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gIHJldHVybiBPYmpQcm90by50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICByZXR1cm4gT2JqUHJvdG8udG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cblxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIE9ialByb3RvLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gZ3JvdXBCeShvYmosIHZhbCkge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpdGVyYXRvciA9IGlzRnVuY3Rpb24odmFsKSA/IHZhbCA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG9bdmFsXTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWx1ZSA9IG9ialtpXTtcbiAgICB2YXIga2V5ID0gaXRlcmF0b3IodmFsdWUsIGkpO1xuICAgIChyZXN1bHRba2V5XSB8fCAocmVzdWx0W2tleV0gPSBbXSkpLnB1c2godmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0cy5ncm91cEJ5ID0gZ3JvdXBCeTtcblxuZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaik7XG59XG5cbmV4cG9ydHMudG9BcnJheSA9IHRvQXJyYXk7XG5cbmZ1bmN0aW9uIHdpdGhvdXQoYXJyYXkpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIGlmICghYXJyYXkpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgdmFyIGNvbnRhaW5zID0gdG9BcnJheShhcmd1bWVudHMpLnNsaWNlKDEpO1xuICB2YXIgaW5kZXggPSAtMTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpbmRleE9mKGNvbnRhaW5zLCBhcnJheVtpbmRleF0pID09PSAtMSkge1xuICAgICAgcmVzdWx0LnB1c2goYXJyYXlbaW5kZXhdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnRzLndpdGhvdXQgPSB3aXRob3V0O1xuXG5mdW5jdGlvbiByZXBlYXQoY2hhcl8sIG4pIHtcbiAgdmFyIHN0ciA9ICcnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgc3RyICs9IGNoYXJfO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0cy5yZXBlYXQgPSByZXBlYXQ7XG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChvYmogPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChBcnJheVByb3RvLmZvckVhY2ggJiYgb2JqLmZvckVhY2ggPT09IEFycmF5UHJvdG8uZm9yRWFjaCkge1xuICAgIG9iai5mb3JFYWNoKGZ1bmMsIGNvbnRleHQpO1xuICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmdW5jLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLmVhY2ggPSBlYWNoO1xuXG5mdW5jdGlvbiBtYXAob2JqLCBmdW5jKSB7XG4gIHZhciByZXN1bHRzID0gW107XG5cbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBpZiAoQXJyYXlQcm90by5tYXAgJiYgb2JqLm1hcCA9PT0gQXJyYXlQcm90by5tYXApIHtcbiAgICByZXR1cm4gb2JqLm1hcChmdW5jKTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0c1tyZXN1bHRzLmxlbmd0aF0gPSBmdW5jKG9ialtpXSwgaSk7XG4gIH1cblxuICBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcbiAgICByZXN1bHRzLmxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZXhwb3J0cy5tYXAgPSBtYXA7XG5cbmZ1bmN0aW9uIGFzeW5jSXRlcihhcnIsIGl0ZXIsIGNiKSB7XG4gIHZhciBpID0gLTE7XG5cbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICBpKys7XG5cbiAgICBpZiAoaSA8IGFyci5sZW5ndGgpIHtcbiAgICAgIGl0ZXIoYXJyW2ldLCBpLCBuZXh0LCBjYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpO1xufVxuXG5leHBvcnRzLmFzeW5jSXRlciA9IGFzeW5jSXRlcjtcblxuZnVuY3Rpb24gYXN5bmNGb3Iob2JqLCBpdGVyLCBjYikge1xuICB2YXIga2V5cyA9IGtleXNfKG9iaiB8fCB7fSk7XG4gIHZhciBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAtMTtcblxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIGkrKztcbiAgICB2YXIgayA9IGtleXNbaV07XG5cbiAgICBpZiAoaSA8IGxlbikge1xuICAgICAgaXRlcihrLCBvYmpba10sIGksIGxlbiwgbmV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpO1xufVxuXG5leHBvcnRzLmFzeW5jRm9yID0gYXN5bmNGb3I7XG5cbmZ1bmN0aW9uIGluZGV4T2YoYXJyLCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYXJyIHx8IFtdLCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpO1xufVxuXG5leHBvcnRzLmluZGV4T2YgPSBpbmRleE9mO1xuXG5mdW5jdGlvbiBrZXlzXyhvYmopIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbiAgdmFyIGFyciA9IFtdO1xuXG4gIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093blByb3Aob2JqLCBrKSkge1xuICAgICAgYXJyLnB1c2goayk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0cy5rZXlzID0ga2V5c187XG5cbmZ1bmN0aW9uIF9lbnRyaWVzKG9iaikge1xuICByZXR1cm4ga2V5c18ob2JqKS5tYXAoZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gW2ssIG9ialtrXV07XG4gIH0pO1xufVxuXG5leHBvcnRzLl9lbnRyaWVzID0gX2VudHJpZXM7XG5cbmZ1bmN0aW9uIF92YWx1ZXMob2JqKSB7XG4gIHJldHVybiBrZXlzXyhvYmopLm1hcChmdW5jdGlvbiAoaykge1xuICAgIHJldHVybiBvYmpba107XG4gIH0pO1xufVxuXG5leHBvcnRzLl92YWx1ZXMgPSBfdmFsdWVzO1xuXG5mdW5jdGlvbiBleHRlbmQob2JqMSwgb2JqMikge1xuICBvYmoxID0gb2JqMSB8fCB7fTtcbiAga2V5c18ob2JqMikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIG9iajFba10gPSBvYmoyW2tdO1xuICB9KTtcbiAgcmV0dXJuIG9iajE7XG59XG5cbmV4cG9ydHMuX2Fzc2lnbiA9IGV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuXG5mdW5jdGlvbiBpbk9wZXJhdG9yKGtleSwgdmFsKSB7XG4gIGlmIChpc0FycmF5KHZhbCkgfHwgaXNTdHJpbmcodmFsKSkge1xuICAgIHJldHVybiB2YWwuaW5kZXhPZihrZXkpICE9PSAtMTtcbiAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgcmV0dXJuIGtleSBpbiB2YWw7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgXCJpblwiIG9wZXJhdG9yIHRvIHNlYXJjaCBmb3IgXCInICsga2V5ICsgJ1wiIGluIHVuZXhwZWN0ZWQgdHlwZXMuJyk7XG59XG5cbmV4cG9ydHMuaW5PcGVyYXRvciA9IGluT3BlcmF0b3I7XG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcbiAvLyBBIHNpbXBsZSBjbGFzcyBzeXN0ZW0sIG1vcmUgZG9jdW1lbnRhdGlvbiB0byBjb21lXG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBsaWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5mdW5jdGlvbiBwYXJlbnRXcmFwKHBhcmVudCwgcHJvcCkge1xuICBpZiAodHlwZW9mIHBhcmVudCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgcHJvcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBwcm9wO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgLy8gU2F2ZSB0aGUgY3VycmVudCBwYXJlbnQgbWV0aG9kXG4gICAgdmFyIHRtcCA9IHRoaXMucGFyZW50OyAvLyBTZXQgcGFyZW50IHRvIHRoZSBwcmV2aW91cyBtZXRob2QsIGNhbGwsIGFuZCByZXN0b3JlXG5cbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB2YXIgcmVzID0gcHJvcC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMucGFyZW50ID0gdG1wO1xuICAgIHJldHVybiByZXM7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4dGVuZENsYXNzKGNscywgbmFtZSwgcHJvcHMpIHtcbiAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgbGliLmtleXMocHJvcHMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICBwcm9wc1trXSA9IHBhcmVudFdyYXAoY2xzLnByb3RvdHlwZVtrXSwgcHJvcHNba10pO1xuICB9KTtcblxuICB2YXIgc3ViY2xhc3MgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfY2xzKSB7XG4gICAgX2luaGVyaXRzTG9vc2Uoc3ViY2xhc3MsIF9jbHMpO1xuXG4gICAgZnVuY3Rpb24gc3ViY2xhc3MoKSB7XG4gICAgICByZXR1cm4gX2Nscy5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKHN1YmNsYXNzLCBbe1xuICAgICAga2V5OiBcInR5cGVuYW1lXCIsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIHN1YmNsYXNzO1xuICB9KGNscyk7XG5cbiAgbGliLl9hc3NpZ24oc3ViY2xhc3MucHJvdG90eXBlLCBwcm9wcyk7XG5cbiAgcmV0dXJuIHN1YmNsYXNzO1xufVxuXG52YXIgT2JqID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gT2JqKCkge1xuICAgIC8vIFVuZm9ydHVuYXRlbHkgbmVjZXNzYXJ5IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIHRoaXMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE9iai5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge307XG5cbiAgT2JqLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZChuYW1lLCBwcm9wcykge1xuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHByb3BzID0gbmFtZTtcbiAgICAgIG5hbWUgPSAnYW5vbnltb3VzJztcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kQ2xhc3ModGhpcywgbmFtZSwgcHJvcHMpO1xuICB9O1xuXG4gIF9jcmVhdGVDbGFzcyhPYmosIFt7XG4gICAga2V5OiBcInR5cGVuYW1lXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBPYmo7XG59KCk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqO1xuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBhcnJheUZyb20gPSBBcnJheS5mcm9tO1xudmFyIHN1cHBvcnRzSXRlcmF0b3JzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3IgJiYgdHlwZW9mIGFycmF5RnJvbSA9PT0gJ2Z1bmN0aW9uJzsgLy8gRnJhbWVzIGtlZXAgdHJhY2sgb2Ygc2NvcGluZyBib3RoIGF0IGNvbXBpbGUtdGltZSBhbmQgcnVuLXRpbWUgc29cbi8vIHdlIGtub3cgaG93IHRvIGFjY2VzcyB2YXJpYWJsZXMuIEJsb2NrIHRhZ3MgY2FuIGludHJvZHVjZSBzcGVjaWFsXG4vLyB2YXJpYWJsZXMsIGZvciBleGFtcGxlLlxuXG52YXIgRnJhbWUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGcmFtZShwYXJlbnQsIGlzb2xhdGVXcml0ZXMpIHtcbiAgICB0aGlzLnZhcmlhYmxlcyA9IHt9O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMudG9wTGV2ZWwgPSBmYWxzZTsgLy8gaWYgdGhpcyBpcyB0cnVlLCB3cml0ZXMgKHNldCkgc2hvdWxkIG5ldmVyIHByb3BhZ2F0ZSB1cHdhcmRzIHBhc3RcbiAgICAvLyB0aGlzIGZyYW1lIHRvIGl0cyBwYXJlbnQgKHRob3VnaCByZWFkcyBtYXkpLlxuXG4gICAgdGhpcy5pc29sYXRlV3JpdGVzID0gaXNvbGF0ZVdyaXRlcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBGcmFtZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnNldCA9IGZ1bmN0aW9uIHNldChuYW1lLCB2YWwsIHJlc29sdmVVcCkge1xuICAgIC8vIEFsbG93IHZhcmlhYmxlcyB3aXRoIGRvdHMgYnkgYXV0b21hdGljYWxseSBjcmVhdGluZyB0aGVcbiAgICAvLyBuZXN0ZWQgc3RydWN0dXJlXG4gICAgdmFyIHBhcnRzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgIHZhciBvYmogPSB0aGlzLnZhcmlhYmxlcztcbiAgICB2YXIgZnJhbWUgPSB0aGlzO1xuXG4gICAgaWYgKHJlc29sdmVVcCkge1xuICAgICAgaWYgKGZyYW1lID0gdGhpcy5yZXNvbHZlKHBhcnRzWzBdLCB0cnVlKSkge1xuICAgICAgICBmcmFtZS5zZXQobmFtZSwgdmFsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSBwYXJ0c1tpXTtcblxuICAgICAgaWYgKCFvYmpbaWRdKSB7XG4gICAgICAgIG9ialtpZF0gPSB7fTtcbiAgICAgIH1cblxuICAgICAgb2JqID0gb2JqW2lkXTtcbiAgICB9XG5cbiAgICBvYmpbcGFydHNbcGFydHMubGVuZ3RoIC0gMV1dID0gdmFsO1xuICB9O1xuXG4gIF9wcm90by5nZXQgPSBmdW5jdGlvbiBnZXQobmFtZSkge1xuICAgIHZhciB2YWwgPSB0aGlzLnZhcmlhYmxlc1tuYW1lXTtcblxuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBfcHJvdG8ubG9va3VwID0gZnVuY3Rpb24gbG9va3VwKG5hbWUpIHtcbiAgICB2YXIgcCA9IHRoaXMucGFyZW50O1xuICAgIHZhciB2YWwgPSB0aGlzLnZhcmlhYmxlc1tuYW1lXTtcblxuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcCAmJiBwLmxvb2t1cChuYW1lKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUobmFtZSwgZm9yV3JpdGUpIHtcbiAgICB2YXIgcCA9IGZvcldyaXRlICYmIHRoaXMuaXNvbGF0ZVdyaXRlcyA/IHVuZGVmaW5lZCA6IHRoaXMucGFyZW50O1xuICAgIHZhciB2YWwgPSB0aGlzLnZhcmlhYmxlc1tuYW1lXTtcblxuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHAgJiYgcC5yZXNvbHZlKG5hbWUpO1xuICB9O1xuXG4gIF9wcm90by5wdXNoID0gZnVuY3Rpb24gcHVzaChpc29sYXRlV3JpdGVzKSB7XG4gICAgcmV0dXJuIG5ldyBGcmFtZSh0aGlzLCBpc29sYXRlV3JpdGVzKTtcbiAgfTtcblxuICBfcHJvdG8ucG9wID0gZnVuY3Rpb24gcG9wKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgfTtcblxuICByZXR1cm4gRnJhbWU7XG59KCk7XG5cbmZ1bmN0aW9uIG1ha2VNYWNybyhhcmdOYW1lcywga3dhcmdOYW1lcywgZnVuYykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1hY3JvQXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIG1hY3JvQXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnQ291bnQgPSBudW1BcmdzKG1hY3JvQXJncyk7XG4gICAgdmFyIGFyZ3M7XG4gICAgdmFyIGt3YXJncyA9IGdldEtleXdvcmRBcmdzKG1hY3JvQXJncyk7XG5cbiAgICBpZiAoYXJnQ291bnQgPiBhcmdOYW1lcy5sZW5ndGgpIHtcbiAgICAgIGFyZ3MgPSBtYWNyb0FyZ3Muc2xpY2UoMCwgYXJnTmFtZXMubGVuZ3RoKTsgLy8gUG9zaXRpb25hbCBhcmd1bWVudHMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIGluIGFzXG4gICAgICAvLyBrZXl3b3JkIGFyZ3VtZW50cyAoZXNzZW50aWFsbHkgZGVmYXVsdCB2YWx1ZXMpXG5cbiAgICAgIG1hY3JvQXJncy5zbGljZShhcmdzLmxlbmd0aCwgYXJnQ291bnQpLmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgICBpZiAoaSA8IGt3YXJnTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAga3dhcmdzW2t3YXJnTmFtZXNbaV1dID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGFyZ3MucHVzaChrd2FyZ3MpO1xuICAgIH0gZWxzZSBpZiAoYXJnQ291bnQgPCBhcmdOYW1lcy5sZW5ndGgpIHtcbiAgICAgIGFyZ3MgPSBtYWNyb0FyZ3Muc2xpY2UoMCwgYXJnQ291bnQpO1xuXG4gICAgICBmb3IgKHZhciBpID0gYXJnQ291bnQ7IGkgPCBhcmdOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXJnID0gYXJnTmFtZXNbaV07IC8vIEtleXdvcmQgYXJndW1lbnRzIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCBhc1xuICAgICAgICAvLyBwb3NpdGlvbmFsIGFyZ3VtZW50cywgaS5lLiB0aGUgY2FsbGVyIGV4cGxpY2l0bHlcbiAgICAgICAgLy8gdXNlZCB0aGUgbmFtZSBvZiBhIHBvc2l0aW9uYWwgYXJnXG5cbiAgICAgICAgYXJncy5wdXNoKGt3YXJnc1thcmddKTtcbiAgICAgICAgZGVsZXRlIGt3YXJnc1thcmddO1xuICAgICAgfVxuXG4gICAgICBhcmdzLnB1c2goa3dhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJncyA9IG1hY3JvQXJncztcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuYy5hcHBseShfdGhpcywgYXJncyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VLZXl3b3JkQXJncyhvYmopIHtcbiAgb2JqLl9fa2V5d29yZHMgPSB0cnVlO1xuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBpc0tleXdvcmRBcmdzKG9iaikge1xuICByZXR1cm4gb2JqICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosICdfX2tleXdvcmRzJyk7XG59XG5cbmZ1bmN0aW9uIGdldEtleXdvcmRBcmdzKGFyZ3MpIHtcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuXG4gIGlmIChsZW4pIHtcbiAgICB2YXIgbGFzdEFyZyA9IGFyZ3NbbGVuIC0gMV07XG5cbiAgICBpZiAoaXNLZXl3b3JkQXJncyhsYXN0QXJnKSkge1xuICAgICAgcmV0dXJuIGxhc3RBcmc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBudW1BcmdzKGFyZ3MpIHtcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuXG4gIGlmIChsZW4gPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBsYXN0QXJnID0gYXJnc1tsZW4gLSAxXTtcblxuICBpZiAoaXNLZXl3b3JkQXJncyhsYXN0QXJnKSkge1xuICAgIHJldHVybiBsZW4gLSAxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsZW47XG4gIH1cbn0gLy8gQSBTYWZlU3RyaW5nIG9iamVjdCBpbmRpY2F0ZXMgdGhhdCB0aGUgc3RyaW5nIHNob3VsZCBub3QgYmVcbi8vIGF1dG9lc2NhcGVkLiBUaGlzIGhhcHBlbnMgbWFnaWNhbGx5IGJlY2F1c2UgYXV0b2VzY2FwaW5nIG9ubHlcbi8vIG9jY3VycyBvbiBwcmltaXRpdmUgc3RyaW5nIG9iamVjdHMuXG5cblxuZnVuY3Rpb24gU2FmZVN0cmluZyh2YWwpIHtcbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIHRoaXMudmFsID0gdmFsO1xuICB0aGlzLmxlbmd0aCA9IHZhbC5sZW5ndGg7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdHJpbmcucHJvdG90eXBlLCB7XG4gIGxlbmd0aDoge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogMFxuICB9XG59KTtcblxuU2FmZVN0cmluZy5wcm90b3R5cGUudmFsdWVPZiA9IGZ1bmN0aW9uIHZhbHVlT2YoKSB7XG4gIHJldHVybiB0aGlzLnZhbDtcbn07XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0aGlzLnZhbDtcbn07XG5cbmZ1bmN0aW9uIGNvcHlTYWZlbmVzcyhkZXN0LCB0YXJnZXQpIHtcbiAgaWYgKGRlc3QgaW5zdGFuY2VvZiBTYWZlU3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBTYWZlU3RyaW5nKHRhcmdldCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0LnRvU3RyaW5nKCk7XG59XG5cbmZ1bmN0aW9uIG1hcmtTYWZlKHZhbCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG5cbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5ldyBTYWZlU3RyaW5nKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBTYWZlKGFyZ3MpIHtcbiAgICAgIHZhciByZXQgPSB2YWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgaWYgKHR5cGVvZiByZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2FmZVN0cmluZyhyZXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VwcHJlc3NWYWx1ZSh2YWwsIGF1dG9lc2NhcGUpIHtcbiAgdmFsID0gdmFsICE9PSB1bmRlZmluZWQgJiYgdmFsICE9PSBudWxsID8gdmFsIDogJyc7XG5cbiAgaWYgKGF1dG9lc2NhcGUgJiYgISh2YWwgaW5zdGFuY2VvZiBTYWZlU3RyaW5nKSkge1xuICAgIHZhbCA9IGxpYi5lc2NhcGUodmFsLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZW5zdXJlRGVmaW5lZCh2YWwsIGxpbmVubywgY29sbm8pIHtcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBsaWIuVGVtcGxhdGVFcnJvcignYXR0ZW1wdGVkIHRvIG91dHB1dCBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZScsIGxpbmVubyArIDEsIGNvbG5vICsgMSk7XG4gIH1cblxuICByZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBtZW1iZXJMb29rdXAob2JqLCB2YWwpIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9ialt2YWxdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmpbdmFsXS5hcHBseShvYmosIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gb2JqW3ZhbF07XG59XG5cbmZ1bmN0aW9uIGNhbGxXcmFwKG9iaiwgbmFtZSwgY29udGV4dCwgYXJncykge1xuICBpZiAoIW9iaikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNhbGwgYCcgKyBuYW1lICsgJ2AsIHdoaWNoIGlzIHVuZGVmaW5lZCBvciBmYWxzZXknKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY2FsbCBgJyArIG5hbWUgKyAnYCwgd2hpY2ggaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHJldHVybiBvYmouYXBwbHkoY29udGV4dCwgYXJncyk7XG59XG5cbmZ1bmN0aW9uIGNvbnRleHRPckZyYW1lTG9va3VwKGNvbnRleHQsIGZyYW1lLCBuYW1lKSB7XG4gIHZhciB2YWwgPSBmcmFtZS5sb29rdXAobmFtZSk7XG4gIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/IHZhbCA6IGNvbnRleHQubG9va3VwKG5hbWUpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvciwgbGluZW5vLCBjb2xubykge1xuICBpZiAoZXJyb3IubGluZW5vKSB7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgbGliLlRlbXBsYXRlRXJyb3IoZXJyb3IsIGxpbmVubywgY29sbm8pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzeW5jRWFjaChhcnIsIGRpbWVuLCBpdGVyLCBjYikge1xuICBpZiAobGliLmlzQXJyYXkoYXJyKSkge1xuICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICAgIGxpYi5hc3luY0l0ZXIoYXJyLCBmdW5jdGlvbiBpdGVyQ2FsbGJhY2soaXRlbSwgaSwgbmV4dCkge1xuICAgICAgc3dpdGNoIChkaW1lbikge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaXRlcihpdGVtLCBpLCBsZW4sIG5leHQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBpdGVyKGl0ZW1bMF0sIGl0ZW1bMV0sIGksIGxlbiwgbmV4dCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGl0ZXIoaXRlbVswXSwgaXRlbVsxXSwgaXRlbVsyXSwgaSwgbGVuLCBuZXh0KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGl0ZW0ucHVzaChpLCBsZW4sIG5leHQpO1xuICAgICAgICAgIGl0ZXIuYXBwbHkodGhpcywgaXRlbSk7XG4gICAgICB9XG4gICAgfSwgY2IpO1xuICB9IGVsc2Uge1xuICAgIGxpYi5hc3luY0ZvcihhcnIsIGZ1bmN0aW9uIGl0ZXJDYWxsYmFjayhrZXksIHZhbCwgaSwgbGVuLCBuZXh0KSB7XG4gICAgICBpdGVyKGtleSwgdmFsLCBpLCBsZW4sIG5leHQpO1xuICAgIH0sIGNiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3luY0FsbChhcnIsIGRpbWVuLCBmdW5jLCBjYikge1xuICB2YXIgZmluaXNoZWQgPSAwO1xuICB2YXIgbGVuO1xuICB2YXIgb3V0cHV0QXJyO1xuXG4gIGZ1bmN0aW9uIGRvbmUoaSwgb3V0cHV0KSB7XG4gICAgZmluaXNoZWQrKztcbiAgICBvdXRwdXRBcnJbaV0gPSBvdXRwdXQ7XG5cbiAgICBpZiAoZmluaXNoZWQgPT09IGxlbikge1xuICAgICAgY2IobnVsbCwgb3V0cHV0QXJyLmpvaW4oJycpKTtcbiAgICB9XG4gIH1cblxuICBpZiAobGliLmlzQXJyYXkoYXJyKSkge1xuICAgIGxlbiA9IGFyci5sZW5ndGg7XG4gICAgb3V0cHV0QXJyID0gbmV3IEFycmF5KGxlbik7XG5cbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICBjYihudWxsLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gYXJyW2ldO1xuXG4gICAgICAgIHN3aXRjaCAoZGltZW4pIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBmdW5jKGl0ZW0sIGksIGxlbiwgZG9uZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGZ1bmMoaXRlbVswXSwgaXRlbVsxXSwgaSwgbGVuLCBkb25lKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgZnVuYyhpdGVtWzBdLCBpdGVtWzFdLCBpdGVtWzJdLCBpLCBsZW4sIGRvbmUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXRlbS5wdXNoKGksIGxlbiwgZG9uZSk7XG4gICAgICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBrZXlzID0gbGliLmtleXMoYXJyIHx8IHt9KTtcbiAgICBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBvdXRwdXRBcnIgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgIGNiKG51bGwsICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGtleXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBrID0ga2V5c1tfaV07XG4gICAgICAgIGZ1bmMoaywgYXJyW2tdLCBfaSwgbGVuLCBkb25lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZnJvbUl0ZXJhdG9yKGFycikge1xuICBpZiAodHlwZW9mIGFyciAhPT0gJ29iamVjdCcgfHwgYXJyID09PSBudWxsIHx8IGxpYi5pc0FycmF5KGFycikpIHtcbiAgICByZXR1cm4gYXJyO1xuICB9IGVsc2UgaWYgKHN1cHBvcnRzSXRlcmF0b3JzICYmIFN5bWJvbC5pdGVyYXRvciBpbiBhcnIpIHtcbiAgICByZXR1cm4gYXJyYXlGcm9tKGFycik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRnJhbWU6IEZyYW1lLFxuICBtYWtlTWFjcm86IG1ha2VNYWNybyxcbiAgbWFrZUtleXdvcmRBcmdzOiBtYWtlS2V5d29yZEFyZ3MsXG4gIG51bUFyZ3M6IG51bUFyZ3MsXG4gIHN1cHByZXNzVmFsdWU6IHN1cHByZXNzVmFsdWUsXG4gIGVuc3VyZURlZmluZWQ6IGVuc3VyZURlZmluZWQsXG4gIG1lbWJlckxvb2t1cDogbWVtYmVyTG9va3VwLFxuICBjb250ZXh0T3JGcmFtZUxvb2t1cDogY29udGV4dE9yRnJhbWVMb29rdXAsXG4gIGNhbGxXcmFwOiBjYWxsV3JhcCxcbiAgaGFuZGxlRXJyb3I6IGhhbmRsZUVycm9yLFxuICBpc0FycmF5OiBsaWIuaXNBcnJheSxcbiAga2V5czogbGliLmtleXMsXG4gIFNhZmVTdHJpbmc6IFNhZmVTdHJpbmcsXG4gIGNvcHlTYWZlbmVzczogY29weVNhZmVuZXNzLFxuICBtYXJrU2FmZTogbWFya1NhZmUsXG4gIGFzeW5jRWFjaDogYXN5bmNFYWNoLFxuICBhc3luY0FsbDogYXN5bmNBbGwsXG4gIGluT3BlcmF0b3I6IGxpYi5pbk9wZXJhdG9yLFxuICBmcm9tSXRlcmF0b3I6IGZyb21JdGVyYXRvclxufTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBPYmogPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG5mdW5jdGlvbiB0cmF2ZXJzZUFuZENoZWNrKG9iaiwgdHlwZSwgcmVzdWx0cykge1xuICBpZiAob2JqIGluc3RhbmNlb2YgdHlwZSkge1xuICAgIHJlc3VsdHMucHVzaChvYmopO1xuICB9XG5cbiAgaWYgKG9iaiBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICBvYmouZmluZEFsbCh0eXBlLCByZXN1bHRzKTtcbiAgfVxufVxuXG52YXIgTm9kZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX09iaikge1xuICBfaW5oZXJpdHNMb29zZShOb2RlLCBfT2JqKTtcblxuICBmdW5jdGlvbiBOb2RlKCkge1xuICAgIHJldHVybiBfT2JqLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBOb2RlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQobGluZW5vLCBjb2xubykge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgICB0aGlzLmNvbG5vID0gY29sbm87XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQsIGkpIHtcbiAgICAgIC8vIFRoZSBmaXJzdCB0d28gYXJncyBhcmUgbGluZS9jb2wgbnVtYmVycywgc28gb2Zmc2V0IGJ5IDJcbiAgICAgIHZhciB2YWwgPSBfYXJndW1lbnRzW2kgKyAyXTsgLy8gRmllbGRzIHNob3VsZCBuZXZlciBiZSB1bmRlZmluZWQsIGJ1dCBudWxsLiBJdCBtYWtlc1xuICAgICAgLy8gdGVzdGluZyBlYXNpZXIgdG8gbm9ybWFsaXplIHZhbHVlcy5cblxuICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIF90aGlzW2ZpZWxkXSA9IHZhbDtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uZmluZEFsbCA9IGZ1bmN0aW9uIGZpbmRBbGwodHlwZSwgcmVzdWx0cykge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIHJldHVybiB0cmF2ZXJzZUFuZENoZWNrKGNoaWxkLCB0eXBlLCByZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICByZXR1cm4gdHJhdmVyc2VBbmRDaGVjayhfdGhpczJbZmllbGRdLCB0eXBlLCByZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIF9wcm90by5pdGVyRmllbGRzID0gZnVuY3Rpb24gaXRlckZpZWxkcyhmdW5jKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgZnVuYyhfdGhpczNbZmllbGRdLCBmaWVsZCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE5vZGU7XG59KE9iaik7IC8vIEFic3RyYWN0IG5vZGVzXG5cblxudmFyIFZhbHVlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTm9kZSkge1xuICBfaW5oZXJpdHNMb29zZShWYWx1ZSwgX05vZGUpO1xuXG4gIGZ1bmN0aW9uIFZhbHVlKCkge1xuICAgIHJldHVybiBfTm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVmFsdWUsIFt7XG4gICAga2V5OiBcInR5cGVuYW1lXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gJ1ZhbHVlJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmllbGRzXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gWyd2YWx1ZSddO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBWYWx1ZTtcbn0oTm9kZSk7IC8vIENvbmNyZXRlIG5vZGVzXG5cblxudmFyIE5vZGVMaXN0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTm9kZTIpIHtcbiAgX2luaGVyaXRzTG9vc2UoTm9kZUxpc3QsIF9Ob2RlMik7XG5cbiAgZnVuY3Rpb24gTm9kZUxpc3QoKSB7XG4gICAgcmV0dXJuIF9Ob2RlMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IE5vZGVMaXN0LnByb3RvdHlwZTtcblxuICBfcHJvdG8yLmluaXQgPSBmdW5jdGlvbiBpbml0KGxpbmVubywgY29sbm8sIG5vZGVzKSB7XG4gICAgX05vZGUyLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcywgbGluZW5vLCBjb2xubywgbm9kZXMgfHwgW10pO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkQ2hpbGQgPSBmdW5jdGlvbiBhZGRDaGlsZChub2RlKSB7XG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5vZGUpO1xuICB9O1xuXG4gIF9jcmVhdGVDbGFzcyhOb2RlTGlzdCwgW3tcbiAgICBrZXk6IFwidHlwZW5hbWVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAnTm9kZUxpc3QnO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmaWVsZHNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBbJ2NoaWxkcmVuJ107XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE5vZGVMaXN0O1xufShOb2RlKTtcblxudmFyIFJvb3QgPSBOb2RlTGlzdC5leHRlbmQoJ1Jvb3QnKTtcbnZhciBMaXRlcmFsID0gVmFsdWUuZXh0ZW5kKCdMaXRlcmFsJyk7XG52YXIgU3ltYm9sID0gVmFsdWUuZXh0ZW5kKCdTeW1ib2wnKTtcbnZhciBHcm91cCA9IE5vZGVMaXN0LmV4dGVuZCgnR3JvdXAnKTtcbnZhciBBcnJheU5vZGUgPSBOb2RlTGlzdC5leHRlbmQoJ0FycmF5Jyk7XG52YXIgUGFpciA9IE5vZGUuZXh0ZW5kKCdQYWlyJywge1xuICBmaWVsZHM6IFsna2V5JywgJ3ZhbHVlJ11cbn0pO1xudmFyIERpY3QgPSBOb2RlTGlzdC5leHRlbmQoJ0RpY3QnKTtcbnZhciBMb29rdXBWYWwgPSBOb2RlLmV4dGVuZCgnTG9va3VwVmFsJywge1xuICBmaWVsZHM6IFsndGFyZ2V0JywgJ3ZhbCddXG59KTtcbnZhciBJZiA9IE5vZGUuZXh0ZW5kKCdJZicsIHtcbiAgZmllbGRzOiBbJ2NvbmQnLCAnYm9keScsICdlbHNlXyddXG59KTtcbnZhciBJZkFzeW5jID0gSWYuZXh0ZW5kKCdJZkFzeW5jJyk7XG52YXIgSW5saW5lSWYgPSBOb2RlLmV4dGVuZCgnSW5saW5lSWYnLCB7XG4gIGZpZWxkczogWydjb25kJywgJ2JvZHknLCAnZWxzZV8nXVxufSk7XG52YXIgRm9yID0gTm9kZS5leHRlbmQoJ0ZvcicsIHtcbiAgZmllbGRzOiBbJ2FycicsICduYW1lJywgJ2JvZHknLCAnZWxzZV8nXVxufSk7XG52YXIgQXN5bmNFYWNoID0gRm9yLmV4dGVuZCgnQXN5bmNFYWNoJyk7XG52YXIgQXN5bmNBbGwgPSBGb3IuZXh0ZW5kKCdBc3luY0FsbCcpO1xudmFyIE1hY3JvID0gTm9kZS5leHRlbmQoJ01hY3JvJywge1xuICBmaWVsZHM6IFsnbmFtZScsICdhcmdzJywgJ2JvZHknXVxufSk7XG52YXIgQ2FsbGVyID0gTWFjcm8uZXh0ZW5kKCdDYWxsZXInKTtcbnZhciBJbXBvcnQgPSBOb2RlLmV4dGVuZCgnSW1wb3J0Jywge1xuICBmaWVsZHM6IFsndGVtcGxhdGUnLCAndGFyZ2V0JywgJ3dpdGhDb250ZXh0J11cbn0pO1xuXG52YXIgRnJvbUltcG9ydCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX05vZGUzKSB7XG4gIF9pbmhlcml0c0xvb3NlKEZyb21JbXBvcnQsIF9Ob2RlMyk7XG5cbiAgZnVuY3Rpb24gRnJvbUltcG9ydCgpIHtcbiAgICByZXR1cm4gX05vZGUzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8zID0gRnJvbUltcG9ydC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMy5pbml0ID0gZnVuY3Rpb24gaW5pdChsaW5lbm8sIGNvbG5vLCB0ZW1wbGF0ZSwgbmFtZXMsIHdpdGhDb250ZXh0KSB7XG4gICAgX05vZGUzLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcywgbGluZW5vLCBjb2xubywgdGVtcGxhdGUsIG5hbWVzIHx8IG5ldyBOb2RlTGlzdCgpLCB3aXRoQ29udGV4dCk7XG4gIH07XG5cbiAgX2NyZWF0ZUNsYXNzKEZyb21JbXBvcnQsIFt7XG4gICAga2V5OiBcInR5cGVuYW1lXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gJ0Zyb21JbXBvcnQnO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmaWVsZHNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBbJ3RlbXBsYXRlJywgJ25hbWVzJywgJ3dpdGhDb250ZXh0J107XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZyb21JbXBvcnQ7XG59KE5vZGUpO1xuXG52YXIgRnVuQ2FsbCA9IE5vZGUuZXh0ZW5kKCdGdW5DYWxsJywge1xuICBmaWVsZHM6IFsnbmFtZScsICdhcmdzJ11cbn0pO1xudmFyIEZpbHRlciA9IEZ1bkNhbGwuZXh0ZW5kKCdGaWx0ZXInKTtcbnZhciBGaWx0ZXJBc3luYyA9IEZpbHRlci5leHRlbmQoJ0ZpbHRlckFzeW5jJywge1xuICBmaWVsZHM6IFsnbmFtZScsICdhcmdzJywgJ3N5bWJvbCddXG59KTtcbnZhciBLZXl3b3JkQXJncyA9IERpY3QuZXh0ZW5kKCdLZXl3b3JkQXJncycpO1xudmFyIEJsb2NrID0gTm9kZS5leHRlbmQoJ0Jsb2NrJywge1xuICBmaWVsZHM6IFsnbmFtZScsICdib2R5J11cbn0pO1xudmFyIFN1cGVyID0gTm9kZS5leHRlbmQoJ1N1cGVyJywge1xuICBmaWVsZHM6IFsnYmxvY2tOYW1lJywgJ3N5bWJvbCddXG59KTtcbnZhciBUZW1wbGF0ZVJlZiA9IE5vZGUuZXh0ZW5kKCdUZW1wbGF0ZVJlZicsIHtcbiAgZmllbGRzOiBbJ3RlbXBsYXRlJ11cbn0pO1xudmFyIEV4dGVuZHMgPSBUZW1wbGF0ZVJlZi5leHRlbmQoJ0V4dGVuZHMnKTtcbnZhciBJbmNsdWRlID0gTm9kZS5leHRlbmQoJ0luY2x1ZGUnLCB7XG4gIGZpZWxkczogWyd0ZW1wbGF0ZScsICdpZ25vcmVNaXNzaW5nJ11cbn0pO1xudmFyIFNldCA9IE5vZGUuZXh0ZW5kKCdTZXQnLCB7XG4gIGZpZWxkczogWyd0YXJnZXRzJywgJ3ZhbHVlJ11cbn0pO1xudmFyIFN3aXRjaCA9IE5vZGUuZXh0ZW5kKCdTd2l0Y2gnLCB7XG4gIGZpZWxkczogWydleHByJywgJ2Nhc2VzJywgJ2RlZmF1bHQnXVxufSk7XG52YXIgQ2FzZSA9IE5vZGUuZXh0ZW5kKCdDYXNlJywge1xuICBmaWVsZHM6IFsnY29uZCcsICdib2R5J11cbn0pO1xudmFyIE91dHB1dCA9IE5vZGVMaXN0LmV4dGVuZCgnT3V0cHV0Jyk7XG52YXIgQ2FwdHVyZSA9IE5vZGUuZXh0ZW5kKCdDYXB0dXJlJywge1xuICBmaWVsZHM6IFsnYm9keSddXG59KTtcbnZhciBUZW1wbGF0ZURhdGEgPSBMaXRlcmFsLmV4dGVuZCgnVGVtcGxhdGVEYXRhJyk7XG52YXIgVW5hcnlPcCA9IE5vZGUuZXh0ZW5kKCdVbmFyeU9wJywge1xuICBmaWVsZHM6IFsndGFyZ2V0J11cbn0pO1xudmFyIEJpbk9wID0gTm9kZS5leHRlbmQoJ0Jpbk9wJywge1xuICBmaWVsZHM6IFsnbGVmdCcsICdyaWdodCddXG59KTtcbnZhciBJbiA9IEJpbk9wLmV4dGVuZCgnSW4nKTtcbnZhciBJcyA9IEJpbk9wLmV4dGVuZCgnSXMnKTtcbnZhciBPciA9IEJpbk9wLmV4dGVuZCgnT3InKTtcbnZhciBBbmQgPSBCaW5PcC5leHRlbmQoJ0FuZCcpO1xudmFyIE5vdCA9IFVuYXJ5T3AuZXh0ZW5kKCdOb3QnKTtcbnZhciBBZGQgPSBCaW5PcC5leHRlbmQoJ0FkZCcpO1xudmFyIENvbmNhdCA9IEJpbk9wLmV4dGVuZCgnQ29uY2F0Jyk7XG52YXIgU3ViID0gQmluT3AuZXh0ZW5kKCdTdWInKTtcbnZhciBNdWwgPSBCaW5PcC5leHRlbmQoJ011bCcpO1xudmFyIERpdiA9IEJpbk9wLmV4dGVuZCgnRGl2Jyk7XG52YXIgRmxvb3JEaXYgPSBCaW5PcC5leHRlbmQoJ0Zsb29yRGl2Jyk7XG52YXIgTW9kID0gQmluT3AuZXh0ZW5kKCdNb2QnKTtcbnZhciBQb3cgPSBCaW5PcC5leHRlbmQoJ1BvdycpO1xudmFyIE5lZyA9IFVuYXJ5T3AuZXh0ZW5kKCdOZWcnKTtcbnZhciBQb3MgPSBVbmFyeU9wLmV4dGVuZCgnUG9zJyk7XG52YXIgQ29tcGFyZSA9IE5vZGUuZXh0ZW5kKCdDb21wYXJlJywge1xuICBmaWVsZHM6IFsnZXhwcicsICdvcHMnXVxufSk7XG52YXIgQ29tcGFyZU9wZXJhbmQgPSBOb2RlLmV4dGVuZCgnQ29tcGFyZU9wZXJhbmQnLCB7XG4gIGZpZWxkczogWydleHByJywgJ3R5cGUnXVxufSk7XG52YXIgQ2FsbEV4dGVuc2lvbiA9IE5vZGUuZXh0ZW5kKCdDYWxsRXh0ZW5zaW9uJywge1xuICBpbml0OiBmdW5jdGlvbiBpbml0KGV4dCwgcHJvcCwgYXJncywgY29udGVudEFyZ3MpIHtcbiAgICB0aGlzLnBhcmVudCgpO1xuICAgIHRoaXMuZXh0TmFtZSA9IGV4dC5fX25hbWUgfHwgZXh0O1xuICAgIHRoaXMucHJvcCA9IHByb3A7XG4gICAgdGhpcy5hcmdzID0gYXJncyB8fCBuZXcgTm9kZUxpc3QoKTtcbiAgICB0aGlzLmNvbnRlbnRBcmdzID0gY29udGVudEFyZ3MgfHwgW107XG4gICAgdGhpcy5hdXRvZXNjYXBlID0gZXh0LmF1dG9lc2NhcGU7XG4gIH0sXG4gIGZpZWxkczogWydleHROYW1lJywgJ3Byb3AnLCAnYXJncycsICdjb250ZW50QXJncyddXG59KTtcbnZhciBDYWxsRXh0ZW5zaW9uQXN5bmMgPSBDYWxsRXh0ZW5zaW9uLmV4dGVuZCgnQ2FsbEV4dGVuc2lvbkFzeW5jJyk7IC8vIFRoaXMgaXMgaGFja3ksIGJ1dCB0aGlzIGlzIGp1c3QgYSBkZWJ1Z2dpbmcgZnVuY3Rpb24gYW55d2F5XG5cbmZ1bmN0aW9uIHByaW50KHN0ciwgaW5kZW50LCBpbmxpbmUpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbiAobGluZSwgaSkge1xuICAgIGlmIChsaW5lICYmIChpbmxpbmUgJiYgaSA+IDAgfHwgIWlubGluZSkpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCcgJy5yZXBlYXQoaW5kZW50KSk7XG4gICAgfVxuXG4gICAgdmFyIG5sID0gaSA9PT0gbGluZXMubGVuZ3RoIC0gMSA/ICcnIDogJ1xcbic7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcIiArIGxpbmUgKyBubCk7XG4gIH0pO1xufSAvLyBQcmludCB0aGUgQVNUIGluIGEgbmljZWx5IGZvcm1hdHRlZCB0cmVlIGZvcm1hdCBmb3IgZGVidWdnaW5cblxuXG5mdW5jdGlvbiBwcmludE5vZGVzKG5vZGUsIGluZGVudCkge1xuICBpbmRlbnQgPSBpbmRlbnQgfHwgMDtcbiAgcHJpbnQobm9kZS50eXBlbmFtZSArICc6ICcsIGluZGVudCk7XG5cbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgIHByaW50KCdcXG4nKTtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgIHByaW50Tm9kZXMobiwgaW5kZW50ICsgMik7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIENhbGxFeHRlbnNpb24pIHtcbiAgICBwcmludChub2RlLmV4dE5hbWUgKyBcIi5cIiArIG5vZGUucHJvcCArIFwiXFxuXCIpO1xuXG4gICAgaWYgKG5vZGUuYXJncykge1xuICAgICAgcHJpbnROb2Rlcyhub2RlLmFyZ3MsIGluZGVudCArIDIpO1xuICAgIH1cblxuICAgIGlmIChub2RlLmNvbnRlbnRBcmdzKSB7XG4gICAgICBub2RlLmNvbnRlbnRBcmdzLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcHJpbnROb2RlcyhuLCBpbmRlbnQgKyAyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgcHJvcHMgPSBudWxsO1xuICAgIG5vZGUuaXRlckZpZWxkcyhmdW5jdGlvbiAodmFsLCBmaWVsZE5hbWUpIHtcbiAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIG5vZGVzLnB1c2goW2ZpZWxkTmFtZSwgdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgICAgICBwcm9wc1tmaWVsZE5hbWVdID0gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBwcmludChKU09OLnN0cmluZ2lmeShwcm9wcywgbnVsbCwgMikgKyAnXFxuJywgbnVsbCwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByaW50KCdcXG4nKTtcbiAgICB9XG5cbiAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICB2YXIgZmllbGROYW1lID0gX3JlZlswXSxcbiAgICAgICAgICBuID0gX3JlZlsxXTtcbiAgICAgIHByaW50KFwiW1wiICsgZmllbGROYW1lICsgXCJdID0+XCIsIGluZGVudCArIDIpO1xuICAgICAgcHJpbnROb2RlcyhuLCBpbmRlbnQgKyA0KTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTm9kZTogTm9kZSxcbiAgUm9vdDogUm9vdCxcbiAgTm9kZUxpc3Q6IE5vZGVMaXN0LFxuICBWYWx1ZTogVmFsdWUsXG4gIExpdGVyYWw6IExpdGVyYWwsXG4gIFN5bWJvbDogU3ltYm9sLFxuICBHcm91cDogR3JvdXAsXG4gIEFycmF5OiBBcnJheU5vZGUsXG4gIFBhaXI6IFBhaXIsXG4gIERpY3Q6IERpY3QsXG4gIE91dHB1dDogT3V0cHV0LFxuICBDYXB0dXJlOiBDYXB0dXJlLFxuICBUZW1wbGF0ZURhdGE6IFRlbXBsYXRlRGF0YSxcbiAgSWY6IElmLFxuICBJZkFzeW5jOiBJZkFzeW5jLFxuICBJbmxpbmVJZjogSW5saW5lSWYsXG4gIEZvcjogRm9yLFxuICBBc3luY0VhY2g6IEFzeW5jRWFjaCxcbiAgQXN5bmNBbGw6IEFzeW5jQWxsLFxuICBNYWNybzogTWFjcm8sXG4gIENhbGxlcjogQ2FsbGVyLFxuICBJbXBvcnQ6IEltcG9ydCxcbiAgRnJvbUltcG9ydDogRnJvbUltcG9ydCxcbiAgRnVuQ2FsbDogRnVuQ2FsbCxcbiAgRmlsdGVyOiBGaWx0ZXIsXG4gIEZpbHRlckFzeW5jOiBGaWx0ZXJBc3luYyxcbiAgS2V5d29yZEFyZ3M6IEtleXdvcmRBcmdzLFxuICBCbG9jazogQmxvY2ssXG4gIFN1cGVyOiBTdXBlcixcbiAgRXh0ZW5kczogRXh0ZW5kcyxcbiAgSW5jbHVkZTogSW5jbHVkZSxcbiAgU2V0OiBTZXQsXG4gIFN3aXRjaDogU3dpdGNoLFxuICBDYXNlOiBDYXNlLFxuICBMb29rdXBWYWw6IExvb2t1cFZhbCxcbiAgQmluT3A6IEJpbk9wLFxuICBJbjogSW4sXG4gIElzOiBJcyxcbiAgT3I6IE9yLFxuICBBbmQ6IEFuZCxcbiAgTm90OiBOb3QsXG4gIEFkZDogQWRkLFxuICBDb25jYXQ6IENvbmNhdCxcbiAgU3ViOiBTdWIsXG4gIE11bDogTXVsLFxuICBEaXY6IERpdixcbiAgRmxvb3JEaXY6IEZsb29yRGl2LFxuICBNb2Q6IE1vZCxcbiAgUG93OiBQb3csXG4gIE5lZzogTmVnLFxuICBQb3M6IFBvcyxcbiAgQ29tcGFyZTogQ29tcGFyZSxcbiAgQ29tcGFyZU9wZXJhbmQ6IENvbXBhcmVPcGVyYW5kLFxuICBDYWxsRXh0ZW5zaW9uOiBDYWxsRXh0ZW5zaW9uLFxuICBDYWxsRXh0ZW5zaW9uQXN5bmM6IENhbGxFeHRlbnNpb25Bc3luYyxcbiAgcHJpbnROb2RlczogcHJpbnROb2Rlc1xufTtcblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblxuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBwYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG52YXIgdHJhbnNmb3JtZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcblxudmFyIG5vZGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKSxcbiAgICBUZW1wbGF0ZUVycm9yID0gX3JlcXVpcmUuVGVtcGxhdGVFcnJvcjtcblxudmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMiksXG4gICAgRnJhbWUgPSBfcmVxdWlyZTIuRnJhbWU7XG5cbnZhciBPYmogPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpOyAvLyBUaGVzZSBhcmUgYWxsIHRoZSBzYW1lIGZvciBub3csIGJ1dCBzaG91bGRuJ3QgYmUgcGFzc2VkIHN0cmFpZ2h0XG4vLyB0aHJvdWdoXG5cblxudmFyIGNvbXBhcmVPcHMgPSB7XG4gICc9PSc6ICc9PScsXG4gICc9PT0nOiAnPT09JyxcbiAgJyE9JzogJyE9JyxcbiAgJyE9PSc6ICchPT0nLFxuICAnPCc6ICc8JyxcbiAgJz4nOiAnPicsXG4gICc8PSc6ICc8PScsXG4gICc+PSc6ICc+PSdcbn07XG5cbnZhciBDb21waWxlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX09iaikge1xuICBfaW5oZXJpdHNMb29zZShDb21waWxlciwgX09iaik7XG5cbiAgZnVuY3Rpb24gQ29tcGlsZXIoKSB7XG4gICAgcmV0dXJuIF9PYmouYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvbXBpbGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQodGVtcGxhdGVOYW1lLCB0aHJvd09uVW5kZWZpbmVkKSB7XG4gICAgdGhpcy50ZW1wbGF0ZU5hbWUgPSB0ZW1wbGF0ZU5hbWU7XG4gICAgdGhpcy5jb2RlYnVmID0gW107XG4gICAgdGhpcy5sYXN0SWQgPSAwO1xuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLmJ1ZmZlclN0YWNrID0gW107XG4gICAgdGhpcy5fc2NvcGVDbG9zZXJzID0gJyc7XG4gICAgdGhpcy5pbkJsb2NrID0gZmFsc2U7XG4gICAgdGhpcy50aHJvd09uVW5kZWZpbmVkID0gdGhyb3dPblVuZGVmaW5lZDtcbiAgfTtcblxuICBfcHJvdG8uZmFpbCA9IGZ1bmN0aW9uIGZhaWwobXNnLCBsaW5lbm8sIGNvbG5vKSB7XG4gICAgaWYgKGxpbmVubyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaW5lbm8gKz0gMTtcbiAgICB9XG5cbiAgICBpZiAoY29sbm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29sbm8gKz0gMTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgVGVtcGxhdGVFcnJvcihtc2csIGxpbmVubywgY29sbm8pO1xuICB9O1xuXG4gIF9wcm90by5fcHVzaEJ1ZmZlciA9IGZ1bmN0aW9uIF9wdXNoQnVmZmVyKCkge1xuICAgIHZhciBpZCA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB0aGlzLmJ1ZmZlclN0YWNrLnB1c2godGhpcy5idWZmZXIpO1xuICAgIHRoaXMuYnVmZmVyID0gaWQ7XG5cbiAgICB0aGlzLl9lbWl0KFwidmFyIFwiICsgdGhpcy5idWZmZXIgKyBcIiA9IFxcXCJcXFwiO1wiKTtcblxuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICBfcHJvdG8uX3BvcEJ1ZmZlciA9IGZ1bmN0aW9uIF9wb3BCdWZmZXIoKSB7XG4gICAgdGhpcy5idWZmZXIgPSB0aGlzLmJ1ZmZlclN0YWNrLnBvcCgpO1xuICB9O1xuXG4gIF9wcm90by5fZW1pdCA9IGZ1bmN0aW9uIF9lbWl0KGNvZGUpIHtcbiAgICB0aGlzLmNvZGVidWYucHVzaChjb2RlKTtcbiAgfTtcblxuICBfcHJvdG8uX2VtaXRMaW5lID0gZnVuY3Rpb24gX2VtaXRMaW5lKGNvZGUpIHtcbiAgICB0aGlzLl9lbWl0KGNvZGUgKyAnXFxuJyk7XG4gIH07XG5cbiAgX3Byb3RvLl9lbWl0TGluZXMgPSBmdW5jdGlvbiBfZW1pdExpbmVzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbGluZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBsaW5lc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICByZXR1cm4gX3RoaXMuX2VtaXRMaW5lKGxpbmUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5fZW1pdEZ1bmNCZWdpbiA9IGZ1bmN0aW9uIF9lbWl0RnVuY0JlZ2luKG5hbWUpIHtcbiAgICB0aGlzLmJ1ZmZlciA9ICdvdXRwdXQnO1xuICAgIHRoaXMuX3Njb3BlQ2xvc2VycyA9ICcnO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2Z1bmN0aW9uICcgKyBuYW1lICsgJyhlbnYsIGNvbnRleHQsIGZyYW1lLCBydW50aW1lLCBjYikgeycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3ZhciBsaW5lbm8gPSBudWxsOycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3ZhciBjb2xubyA9IG51bGw7Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgndmFyICcgKyB0aGlzLmJ1ZmZlciArICcgPSBcIlwiOycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3RyeSB7Jyk7XG4gIH07XG5cbiAgX3Byb3RvLl9lbWl0RnVuY0VuZCA9IGZ1bmN0aW9uIF9lbWl0RnVuY0VuZChub1JldHVybikge1xuICAgIGlmICghbm9SZXR1cm4pIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKCdjYihudWxsLCAnICsgdGhpcy5idWZmZXIgKyAnKTsnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jbG9zZVNjb3BlTGV2ZWxzKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfSBjYXRjaCAoZSkgeycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJyAgY2IocnVudGltZS5oYW5kbGVFcnJvcihlLCBsaW5lbm8sIGNvbG5vKSk7Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcblxuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgfTtcblxuICBfcHJvdG8uX2FkZFNjb3BlTGV2ZWwgPSBmdW5jdGlvbiBfYWRkU2NvcGVMZXZlbCgpIHtcbiAgICB0aGlzLl9zY29wZUNsb3NlcnMgKz0gJ30pJztcbiAgfTtcblxuICBfcHJvdG8uX2Nsb3NlU2NvcGVMZXZlbHMgPSBmdW5jdGlvbiBfY2xvc2VTY29wZUxldmVscygpIHtcbiAgICB0aGlzLl9lbWl0TGluZSh0aGlzLl9zY29wZUNsb3NlcnMgKyAnOycpO1xuXG4gICAgdGhpcy5fc2NvcGVDbG9zZXJzID0gJyc7XG4gIH07XG5cbiAgX3Byb3RvLl93aXRoU2NvcGVkU3ludGF4ID0gZnVuY3Rpb24gX3dpdGhTY29wZWRTeW50YXgoZnVuYykge1xuICAgIHZhciBfc2NvcGVDbG9zZXJzID0gdGhpcy5fc2NvcGVDbG9zZXJzO1xuICAgIHRoaXMuX3Njb3BlQ2xvc2VycyA9ICcnO1xuICAgIGZ1bmMuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuX2Nsb3NlU2NvcGVMZXZlbHMoKTtcblxuICAgIHRoaXMuX3Njb3BlQ2xvc2VycyA9IF9zY29wZUNsb3NlcnM7XG4gIH07XG5cbiAgX3Byb3RvLl9tYWtlQ2FsbGJhY2sgPSBmdW5jdGlvbiBfbWFrZUNhbGxiYWNrKHJlcykge1xuICAgIHZhciBlcnIgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgcmV0dXJuICdmdW5jdGlvbignICsgZXJyICsgKHJlcyA/ICcsJyArIHJlcyA6ICcnKSArICcpIHtcXG4nICsgJ2lmKCcgKyBlcnIgKyAnKSB7IGNiKCcgKyBlcnIgKyAnKTsgcmV0dXJuOyB9JztcbiAgfTtcblxuICBfcHJvdG8uX3RtcGlkID0gZnVuY3Rpb24gX3RtcGlkKCkge1xuICAgIHRoaXMubGFzdElkKys7XG4gICAgcmV0dXJuICd0XycgKyB0aGlzLmxhc3RJZDtcbiAgfTtcblxuICBfcHJvdG8uX3RlbXBsYXRlTmFtZSA9IGZ1bmN0aW9uIF90ZW1wbGF0ZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGVOYW1lID09IG51bGwgPyAndW5kZWZpbmVkJyA6IEpTT04uc3RyaW5naWZ5KHRoaXMudGVtcGxhdGVOYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uX2NvbXBpbGVDaGlsZHJlbiA9IGZ1bmN0aW9uIF9jb21waWxlQ2hpbGRyZW4obm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIF90aGlzMi5jb21waWxlKGNoaWxkLCBmcmFtZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlQWdncmVnYXRlID0gZnVuY3Rpb24gX2NvbXBpbGVBZ2dyZWdhdGUobm9kZSwgZnJhbWUsIHN0YXJ0Q2hhciwgZW5kQ2hhcikge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgaWYgKHN0YXJ0Q2hhcikge1xuICAgICAgdGhpcy5fZW1pdChzdGFydENoYXIpO1xuICAgIH1cblxuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQsIGkpIHtcbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICBfdGhpczMuX2VtaXQoJywnKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMzLmNvbXBpbGUoY2hpbGQsIGZyYW1lKTtcbiAgICB9KTtcblxuICAgIGlmIChlbmRDaGFyKSB7XG4gICAgICB0aGlzLl9lbWl0KGVuZENoYXIpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uX2NvbXBpbGVFeHByZXNzaW9uID0gZnVuY3Rpb24gX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUsIGZyYW1lKSB7XG4gICAgLy8gVE9ETzogSSdtIG5vdCByZWFsbHkgc3VyZSBpZiB0aGlzIHR5cGUgY2hlY2sgaXMgd29ydGggaXQgb3JcbiAgICAvLyBub3QuXG4gICAgdGhpcy5hc3NlcnRUeXBlKG5vZGUsIG5vZGVzLkxpdGVyYWwsIG5vZGVzLlN5bWJvbCwgbm9kZXMuR3JvdXAsIG5vZGVzLkFycmF5LCBub2Rlcy5EaWN0LCBub2Rlcy5GdW5DYWxsLCBub2Rlcy5DYWxsZXIsIG5vZGVzLkZpbHRlciwgbm9kZXMuTG9va3VwVmFsLCBub2Rlcy5Db21wYXJlLCBub2Rlcy5JbmxpbmVJZiwgbm9kZXMuSW4sIG5vZGVzLkFuZCwgbm9kZXMuT3IsIG5vZGVzLk5vdCwgbm9kZXMuQWRkLCBub2Rlcy5Db25jYXQsIG5vZGVzLlN1Yiwgbm9kZXMuTXVsLCBub2Rlcy5EaXYsIG5vZGVzLkZsb29yRGl2LCBub2Rlcy5Nb2QsIG5vZGVzLlBvdywgbm9kZXMuTmVnLCBub2Rlcy5Qb3MsIG5vZGVzLkNvbXBhcmUsIG5vZGVzLk5vZGVMaXN0KTtcbiAgICB0aGlzLmNvbXBpbGUobm9kZSwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5hc3NlcnRUeXBlID0gZnVuY3Rpb24gYXNzZXJ0VHlwZShub2RlKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCB0eXBlcyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICB0eXBlc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICBpZiAoIXR5cGVzLnNvbWUoZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgdDtcbiAgICB9KSkge1xuICAgICAgdGhpcy5mYWlsKFwiYXNzZXJ0VHlwZTogaW52YWxpZCB0eXBlOiBcIiArIG5vZGUudHlwZW5hbWUsIG5vZGUubGluZW5vLCBub2RlLmNvbG5vKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVDYWxsRXh0ZW5zaW9uID0gZnVuY3Rpb24gY29tcGlsZUNhbGxFeHRlbnNpb24obm9kZSwgZnJhbWUsIGFzeW5jKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICB2YXIgYXJncyA9IG5vZGUuYXJncztcbiAgICB2YXIgY29udGVudEFyZ3MgPSBub2RlLmNvbnRlbnRBcmdzO1xuICAgIHZhciBhdXRvZXNjYXBlID0gdHlwZW9mIG5vZGUuYXV0b2VzY2FwZSA9PT0gJ2Jvb2xlYW4nID8gbm9kZS5hdXRvZXNjYXBlIDogdHJ1ZTtcblxuICAgIGlmICghYXN5bmMpIHtcbiAgICAgIHRoaXMuX2VtaXQodGhpcy5idWZmZXIgKyBcIiArPSBydW50aW1lLnN1cHByZXNzVmFsdWUoXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXQoXCJlbnYuZ2V0RXh0ZW5zaW9uKFxcXCJcIiArIG5vZGUuZXh0TmFtZSArIFwiXFxcIilbXFxcIlwiICsgbm9kZS5wcm9wICsgXCJcXFwiXShcIik7XG5cbiAgICB0aGlzLl9lbWl0KCdjb250ZXh0Jyk7XG5cbiAgICBpZiAoYXJncyB8fCBjb250ZW50QXJncykge1xuICAgICAgdGhpcy5fZW1pdCgnLCcpO1xuICAgIH1cblxuICAgIGlmIChhcmdzKSB7XG4gICAgICBpZiAoIShhcmdzIGluc3RhbmNlb2Ygbm9kZXMuTm9kZUxpc3QpKSB7XG4gICAgICAgIHRoaXMuZmFpbCgnY29tcGlsZUNhbGxFeHRlbnNpb246IGFyZ3VtZW50cyBtdXN0IGJlIGEgTm9kZUxpc3QsICcgKyAndXNlIGBwYXJzZXIucGFyc2VTaWduYXR1cmVgJyk7XG4gICAgICB9XG5cbiAgICAgIGFyZ3MuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYXJnLCBpKSB7XG4gICAgICAgIC8vIFRhZyBhcmd1bWVudHMgYXJlIHBhc3NlZCBub3JtYWxseSB0byB0aGUgY2FsbC4gTm90ZVxuICAgICAgICAvLyB0aGF0IGtleXdvcmQgYXJndW1lbnRzIGFyZSB0dXJuZWQgaW50byBhIHNpbmdsZSBqc1xuICAgICAgICAvLyBvYmplY3QgYXMgdGhlIGxhc3QgYXJndW1lbnQsIGlmIHRoZXkgZXhpc3QuXG4gICAgICAgIF90aGlzNC5fY29tcGlsZUV4cHJlc3Npb24oYXJnLCBmcmFtZSk7XG5cbiAgICAgICAgaWYgKGkgIT09IGFyZ3MuY2hpbGRyZW4ubGVuZ3RoIC0gMSB8fCBjb250ZW50QXJncy5sZW5ndGgpIHtcbiAgICAgICAgICBfdGhpczQuX2VtaXQoJywnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnRBcmdzLmxlbmd0aCkge1xuICAgICAgY29udGVudEFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoYXJnLCBpKSB7XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgIF90aGlzNC5fZW1pdCgnLCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZykge1xuICAgICAgICAgIF90aGlzNC5fZW1pdExpbmUoJ2Z1bmN0aW9uKGNiKSB7Jyk7XG5cbiAgICAgICAgICBfdGhpczQuX2VtaXRMaW5lKCdpZighY2IpIHsgY2IgPSBmdW5jdGlvbihlcnIpIHsgaWYoZXJyKSB7IHRocm93IGVycjsgfX19Jyk7XG5cbiAgICAgICAgICB2YXIgaWQgPSBfdGhpczQuX3B1c2hCdWZmZXIoKTtcblxuICAgICAgICAgIF90aGlzNC5fd2l0aFNjb3BlZFN5bnRheChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczQuY29tcGlsZShhcmcsIGZyYW1lKTtcblxuICAgICAgICAgICAgX3RoaXM0Ll9lbWl0TGluZShcImNiKG51bGwsIFwiICsgaWQgKyBcIik7XCIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgX3RoaXM0Ll9wb3BCdWZmZXIoKTtcblxuICAgICAgICAgIF90aGlzNC5fZW1pdExpbmUoXCJyZXR1cm4gXCIgKyBpZCArIFwiO1wiKTtcblxuICAgICAgICAgIF90aGlzNC5fZW1pdExpbmUoJ30nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpczQuX2VtaXQoJ251bGwnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fdG1waWQoKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJywgJyArIHRoaXMuX21ha2VDYWxsYmFjayhyZXMpKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUodGhpcy5idWZmZXIgKyBcIiArPSBydW50aW1lLnN1cHByZXNzVmFsdWUoXCIgKyByZXMgKyBcIiwgXCIgKyBhdXRvZXNjYXBlICsgXCIgJiYgZW52Lm9wdHMuYXV0b2VzY2FwZSk7XCIpO1xuXG4gICAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQoJyknKTtcblxuICAgICAgdGhpcy5fZW1pdChcIiwgXCIgKyBhdXRvZXNjYXBlICsgXCIgJiYgZW52Lm9wdHMuYXV0b2VzY2FwZSk7XFxuXCIpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUNhbGxFeHRlbnNpb25Bc3luYyA9IGZ1bmN0aW9uIGNvbXBpbGVDYWxsRXh0ZW5zaW9uQXN5bmMobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLmNvbXBpbGVDYWxsRXh0ZW5zaW9uKG5vZGUsIGZyYW1lLCB0cnVlKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZU5vZGVMaXN0ID0gZnVuY3Rpb24gY29tcGlsZU5vZGVMaXN0KG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fY29tcGlsZUNoaWxkcmVuKG5vZGUsIGZyYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUxpdGVyYWwgPSBmdW5jdGlvbiBjb21waWxlTGl0ZXJhbChub2RlKSB7XG4gICAgaWYgKHR5cGVvZiBub2RlLnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIHZhbCA9IG5vZGUudmFsdWUucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKTtcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJyk7XG4gICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxuL2csICdcXFxcbicpO1xuICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKTtcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0Jyk7XG5cbiAgICAgIHRoaXMuX2VtaXQoXCJcXFwiXCIgKyB2YWwgKyBcIlxcXCJcIik7XG4gICAgfSBlbHNlIGlmIChub2RlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9lbWl0KCdudWxsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQobm9kZS52YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVTeW1ib2wgPSBmdW5jdGlvbiBjb21waWxlU3ltYm9sKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIG5hbWUgPSBub2RlLnZhbHVlO1xuICAgIHZhciB2ID0gZnJhbWUubG9va3VwKG5hbWUpO1xuXG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX2VtaXQodik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQoJ3J1bnRpbWUuY29udGV4dE9yRnJhbWVMb29rdXAoJyArICdjb250ZXh0LCBmcmFtZSwgXCInICsgbmFtZSArICdcIiknKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVHcm91cCA9IGZ1bmN0aW9uIGNvbXBpbGVHcm91cChub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2NvbXBpbGVBZ2dyZWdhdGUobm9kZSwgZnJhbWUsICcoJywgJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUFycmF5ID0gZnVuY3Rpb24gY29tcGlsZUFycmF5KG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fY29tcGlsZUFnZ3JlZ2F0ZShub2RlLCBmcmFtZSwgJ1snLCAnXScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlRGljdCA9IGZ1bmN0aW9uIGNvbXBpbGVEaWN0KG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fY29tcGlsZUFnZ3JlZ2F0ZShub2RlLCBmcmFtZSwgJ3snLCAnfScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlUGFpciA9IGZ1bmN0aW9uIGNvbXBpbGVQYWlyKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIGtleSA9IG5vZGUua2V5O1xuICAgIHZhciB2YWwgPSBub2RlLnZhbHVlO1xuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIG5vZGVzLlN5bWJvbCkge1xuICAgICAga2V5ID0gbmV3IG5vZGVzLkxpdGVyYWwoa2V5LmxpbmVubywga2V5LmNvbG5vLCBrZXkudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoIShrZXkgaW5zdGFuY2VvZiBub2Rlcy5MaXRlcmFsICYmIHR5cGVvZiBrZXkudmFsdWUgPT09ICdzdHJpbmcnKSkge1xuICAgICAgdGhpcy5mYWlsKCdjb21waWxlUGFpcjogRGljdCBrZXlzIG11c3QgYmUgc3RyaW5ncyBvciBuYW1lcycsIGtleS5saW5lbm8sIGtleS5jb2xubyk7XG4gICAgfVxuXG4gICAgdGhpcy5jb21waWxlKGtleSwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnOiAnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKHZhbCwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlSW5saW5lSWYgPSBmdW5jdGlvbiBjb21waWxlSW5saW5lSWYobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCcoJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5jb25kLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCc/Jyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCc6Jyk7XG5cbiAgICBpZiAobm9kZS5lbHNlXyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21waWxlKG5vZGUuZWxzZV8sIGZyYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW1pdCgnXCJcIicpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUluID0gZnVuY3Rpb24gY29tcGlsZUluKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgncnVudGltZS5pbk9wZXJhdG9yKCcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUubGVmdCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnLCcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUucmlnaHQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUlzID0gZnVuY3Rpb24gY29tcGlsZUlzKG5vZGUsIGZyYW1lKSB7XG4gICAgLy8gZmlyc3QsIHdlIG5lZWQgdG8gdHJ5IHRvIGdldCB0aGUgbmFtZSBvZiB0aGUgdGVzdCBmdW5jdGlvbiwgaWYgaXQncyBhXG4gICAgLy8gY2FsbGFibGUgKGkuZS4sIGhhcyBhcmdzKSBhbmQgbm90IGEgc3ltYm9sLlxuICAgIHZhciByaWdodCA9IG5vZGUucmlnaHQubmFtZSA/IG5vZGUucmlnaHQubmFtZS52YWx1ZSAvLyBvdGhlcndpc2UgZ28gd2l0aCB0aGUgc3ltYm9sIHZhbHVlXG4gICAgOiBub2RlLnJpZ2h0LnZhbHVlO1xuXG4gICAgdGhpcy5fZW1pdCgnZW52LmdldFRlc3QoXCInICsgcmlnaHQgKyAnXCIpLmNhbGwoY29udGV4dCwgJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5sZWZ0LCBmcmFtZSk7IC8vIGNvbXBpbGUgdGhlIGFyZ3VtZW50cyBmb3IgdGhlIGNhbGxhYmxlIGlmIHRoZXkgZXhpc3RcblxuICAgIGlmIChub2RlLnJpZ2h0LmFyZ3MpIHtcbiAgICAgIHRoaXMuX2VtaXQoJywnKTtcblxuICAgICAgdGhpcy5jb21waWxlKG5vZGUucmlnaHQuYXJncywgZnJhbWUpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXQoJykgPT09IHRydWUnKTtcbiAgfTtcblxuICBfcHJvdG8uX2Jpbk9wRW1pdHRlciA9IGZ1bmN0aW9uIF9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsIHN0cikge1xuICAgIHRoaXMuY29tcGlsZShub2RlLmxlZnQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoc3RyKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnJpZ2h0LCBmcmFtZSk7XG4gIH07IC8vIGVuc3VyZSBjb25jYXRlbmF0aW9uIGluc3RlYWQgb2YgYWRkaXRpb25cbiAgLy8gYnkgYWRkaW5nIGVtcHR5IHN0cmluZyBpbiBiZXR3ZWVuXG5cblxuICBfcHJvdG8uY29tcGlsZU9yID0gZnVuY3Rpb24gY29tcGlsZU9yKG5vZGUsIGZyYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jpbk9wRW1pdHRlcihub2RlLCBmcmFtZSwgJyB8fCAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUFuZCA9IGZ1bmN0aW9uIGNvbXBpbGVBbmQobm9kZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCAnICYmICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQWRkID0gZnVuY3Rpb24gY29tcGlsZUFkZChub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgKyAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUNvbmNhdCA9IGZ1bmN0aW9uIGNvbXBpbGVDb25jYXQobm9kZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCAnICsgXCJcIiArICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlU3ViID0gZnVuY3Rpb24gY29tcGlsZVN1Yihub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgLSAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZU11bCA9IGZ1bmN0aW9uIGNvbXBpbGVNdWwobm9kZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCAnICogJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVEaXYgPSBmdW5jdGlvbiBjb21waWxlRGl2KG5vZGUsIGZyYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jpbk9wRW1pdHRlcihub2RlLCBmcmFtZSwgJyAvICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTW9kID0gZnVuY3Rpb24gY29tcGlsZU1vZChub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgJSAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZU5vdCA9IGZ1bmN0aW9uIGNvbXBpbGVOb3Qobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCchJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS50YXJnZXQsIGZyYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUZsb29yRGl2ID0gZnVuY3Rpb24gY29tcGlsZUZsb29yRGl2KG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgnTWF0aC5mbG9vcignKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLmxlZnQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyAvICcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUucmlnaHQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZVBvdyA9IGZ1bmN0aW9uIGNvbXBpbGVQb3cobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCdNYXRoLnBvdygnKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLmxlZnQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJywgJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5yaWdodCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnKScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTmVnID0gZnVuY3Rpb24gY29tcGlsZU5lZyhub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJy0nKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnRhcmdldCwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlUG9zID0gZnVuY3Rpb24gY29tcGlsZVBvcyhub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJysnKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnRhcmdldCwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQ29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBpbGVDb21wYXJlKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5leHByLCBmcmFtZSk7XG4gICAgbm9kZS5vcHMuZm9yRWFjaChmdW5jdGlvbiAob3ApIHtcbiAgICAgIF90aGlzNS5fZW1pdChcIiBcIiArIGNvbXBhcmVPcHNbb3AudHlwZV0gKyBcIiBcIik7XG5cbiAgICAgIF90aGlzNS5jb21waWxlKG9wLmV4cHIsIGZyYW1lKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUxvb2t1cFZhbCA9IGZ1bmN0aW9uIGNvbXBpbGVMb29rdXBWYWwobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCdydW50aW1lLm1lbWJlckxvb2t1cCgoJyk7XG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLnRhcmdldCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnKSwnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUudmFsLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCcpJyk7XG4gIH07XG5cbiAgX3Byb3RvLl9nZXROb2RlTmFtZSA9IGZ1bmN0aW9uIF9nZXROb2RlTmFtZShub2RlKSB7XG4gICAgc3dpdGNoIChub2RlLnR5cGVuYW1lKSB7XG4gICAgICBjYXNlICdTeW1ib2wnOlxuICAgICAgICByZXR1cm4gbm9kZS52YWx1ZTtcblxuICAgICAgY2FzZSAnRnVuQ2FsbCc6XG4gICAgICAgIHJldHVybiAndGhlIHJldHVybiB2YWx1ZSBvZiAoJyArIHRoaXMuX2dldE5vZGVOYW1lKG5vZGUubmFtZSkgKyAnKSc7XG5cbiAgICAgIGNhc2UgJ0xvb2t1cFZhbCc6XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXROb2RlTmFtZShub2RlLnRhcmdldCkgKyAnW1wiJyArIHRoaXMuX2dldE5vZGVOYW1lKG5vZGUudmFsKSArICdcIl0nO1xuXG4gICAgICBjYXNlICdMaXRlcmFsJzpcbiAgICAgICAgcmV0dXJuIG5vZGUudmFsdWUudG9TdHJpbmcoKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICctLWV4cHJlc3Npb24tLSc7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlRnVuQ2FsbCA9IGZ1bmN0aW9uIGNvbXBpbGVGdW5DYWxsKG5vZGUsIGZyYW1lKSB7XG4gICAgLy8gS2VlcCB0cmFjayBvZiBsaW5lL2NvbCBpbmZvIGF0IHJ1bnRpbWUgYnkgc2V0dGluZ3NcbiAgICAvLyB2YXJpYWJsZXMgd2l0aGluIGFuIGV4cHJlc3Npb24uIEFuIGV4cHJlc3Npb24gaW4gamF2YXNjcmlwdFxuICAgIC8vIGxpa2UgKHgsIHksIHopIHJldHVybnMgdGhlIGxhc3QgdmFsdWUsIGFuZCB4IGFuZCB5IGNhbiBiZVxuICAgIC8vIGFueXRoaW5nXG4gICAgdGhpcy5fZW1pdCgnKGxpbmVubyA9ICcgKyBub2RlLmxpbmVubyArICcsIGNvbG5vID0gJyArIG5vZGUuY29sbm8gKyAnLCAnKTtcblxuICAgIHRoaXMuX2VtaXQoJ3J1bnRpbWUuY2FsbFdyYXAoJyk7IC8vIENvbXBpbGUgaXQgYXMgbm9ybWFsLlxuXG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLm5hbWUsIGZyYW1lKTsgLy8gT3V0cHV0IHRoZSBuYW1lIG9mIHdoYXQgd2UncmUgY2FsbGluZyBzbyB3ZSBjYW4gZ2V0IGZyaWVuZGx5IGVycm9yc1xuICAgIC8vIGlmIHRoZSBsb29rdXAgZmFpbHMuXG5cblxuICAgIHRoaXMuX2VtaXQoJywgXCInICsgdGhpcy5fZ2V0Tm9kZU5hbWUobm9kZS5uYW1lKS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCIsIGNvbnRleHQsICcpO1xuXG4gICAgdGhpcy5fY29tcGlsZUFnZ3JlZ2F0ZShub2RlLmFyZ3MsIGZyYW1lLCAnWycsICddKScpO1xuXG4gICAgdGhpcy5fZW1pdCgnKScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlRmlsdGVyID0gZnVuY3Rpb24gY29tcGlsZUZpbHRlcihub2RlLCBmcmFtZSkge1xuICAgIHZhciBuYW1lID0gbm9kZS5uYW1lO1xuICAgIHRoaXMuYXNzZXJ0VHlwZShuYW1lLCBub2Rlcy5TeW1ib2wpO1xuXG4gICAgdGhpcy5fZW1pdCgnZW52LmdldEZpbHRlcihcIicgKyBuYW1lLnZhbHVlICsgJ1wiKS5jYWxsKGNvbnRleHQsICcpO1xuXG4gICAgdGhpcy5fY29tcGlsZUFnZ3JlZ2F0ZShub2RlLmFyZ3MsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUZpbHRlckFzeW5jID0gZnVuY3Rpb24gY29tcGlsZUZpbHRlckFzeW5jKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIG5hbWUgPSBub2RlLm5hbWU7XG4gICAgdmFyIHN5bWJvbCA9IG5vZGUuc3ltYm9sLnZhbHVlO1xuICAgIHRoaXMuYXNzZXJ0VHlwZShuYW1lLCBub2Rlcy5TeW1ib2wpO1xuICAgIGZyYW1lLnNldChzeW1ib2wsIHN5bWJvbCk7XG5cbiAgICB0aGlzLl9lbWl0KCdlbnYuZ2V0RmlsdGVyKFwiJyArIG5hbWUudmFsdWUgKyAnXCIpLmNhbGwoY29udGV4dCwgJyk7XG5cbiAgICB0aGlzLl9jb21waWxlQWdncmVnYXRlKG5vZGUuYXJncywgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJywgJyArIHRoaXMuX21ha2VDYWxsYmFjayhzeW1ib2wpKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUtleXdvcmRBcmdzID0gZnVuY3Rpb24gY29tcGlsZUtleXdvcmRBcmdzKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgncnVudGltZS5tYWtlS2V5d29yZEFyZ3MoJyk7XG5cbiAgICB0aGlzLmNvbXBpbGVEaWN0KG5vZGUsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZVNldCA9IGZ1bmN0aW9uIGNvbXBpbGVTZXQobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgIHZhciBpZHMgPSBbXTsgLy8gTG9va3VwIHRoZSB2YXJpYWJsZSBuYW1lcyBmb3IgZWFjaCBpZGVudGlmaWVyIGFuZCBjcmVhdGVcbiAgICAvLyBuZXcgb25lcyBpZiBuZWNlc3NhcnlcblxuICAgIG5vZGUudGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHZhciBuYW1lID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgdmFyIGlkID0gZnJhbWUubG9va3VwKG5hbWUpO1xuXG4gICAgICBpZiAoaWQgPT09IG51bGwgfHwgaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZCA9IF90aGlzNi5fdG1waWQoKTsgLy8gTm90ZTogVGhpcyByZWxpZXMgb24ganMgYWxsb3dpbmcgc2NvcGUgYWNyb3NzXG4gICAgICAgIC8vIGJsb2NrcywgaW4gY2FzZSB0aGlzIGlzIGNyZWF0ZWQgaW5zaWRlIGFuIGBpZmBcblxuICAgICAgICBfdGhpczYuX2VtaXRMaW5lKCd2YXIgJyArIGlkICsgJzsnKTtcbiAgICAgIH1cblxuICAgICAgaWRzLnB1c2goaWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKG5vZGUudmFsdWUpIHtcbiAgICAgIHRoaXMuX2VtaXQoaWRzLmpvaW4oJyA9ICcpICsgJyA9ICcpO1xuXG4gICAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLnZhbHVlLCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCc7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQoaWRzLmpvaW4oJyA9ICcpICsgJyA9ICcpO1xuXG4gICAgICB0aGlzLmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCc7Jyk7XG4gICAgfVxuXG4gICAgbm9kZS50YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCwgaSkge1xuICAgICAgdmFyIGlkID0gaWRzW2ldO1xuICAgICAgdmFyIG5hbWUgPSB0YXJnZXQudmFsdWU7IC8vIFdlIGFyZSBydW5uaW5nIHRoaXMgZm9yIGV2ZXJ5IHZhciwgYnV0IGl0J3MgdmVyeVxuICAgICAgLy8gdW5jb21tb24gdG8gYXNzaWduIHRvIG11bHRpcGxlIHZhcnMgYW55d2F5XG5cbiAgICAgIF90aGlzNi5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgbmFtZSArIFwiXFxcIiwgXCIgKyBpZCArIFwiLCB0cnVlKTtcIik7XG5cbiAgICAgIF90aGlzNi5fZW1pdExpbmUoJ2lmKGZyYW1lLnRvcExldmVsKSB7Jyk7XG5cbiAgICAgIF90aGlzNi5fZW1pdExpbmUoXCJjb250ZXh0LnNldFZhcmlhYmxlKFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiICsgaWQgKyBcIik7XCIpO1xuXG4gICAgICBfdGhpczYuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSAhPT0gJ18nKSB7XG4gICAgICAgIF90aGlzNi5fZW1pdExpbmUoJ2lmKGZyYW1lLnRvcExldmVsKSB7Jyk7XG5cbiAgICAgICAgX3RoaXM2Ll9lbWl0TGluZShcImNvbnRleHQuYWRkRXhwb3J0KFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiICsgaWQgKyBcIik7XCIpO1xuXG4gICAgICAgIF90aGlzNi5fZW1pdExpbmUoJ30nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZVN3aXRjaCA9IGZ1bmN0aW9uIGNvbXBpbGVTd2l0Y2gobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgIHRoaXMuX2VtaXQoJ3N3aXRjaCAoJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5leHByLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCcpIHsnKTtcblxuICAgIG5vZGUuY2FzZXMuZm9yRWFjaChmdW5jdGlvbiAoYywgaSkge1xuICAgICAgX3RoaXM3Ll9lbWl0KCdjYXNlICcpO1xuXG4gICAgICBfdGhpczcuY29tcGlsZShjLmNvbmQsIGZyYW1lKTtcblxuICAgICAgX3RoaXM3Ll9lbWl0KCc6ICcpO1xuXG4gICAgICBfdGhpczcuY29tcGlsZShjLmJvZHksIGZyYW1lKTsgLy8gcHJlc2VydmUgZmFsbC10aHJvdWdoc1xuXG5cbiAgICAgIGlmIChjLmJvZHkuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIF90aGlzNy5fZW1pdExpbmUoJ2JyZWFrOycpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5vZGUuZGVmYXVsdCkge1xuICAgICAgdGhpcy5fZW1pdCgnZGVmYXVsdDonKTtcblxuICAgICAgdGhpcy5jb21waWxlKG5vZGUuZGVmYXVsdCwgZnJhbWUpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXQoJ30nKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUlmID0gZnVuY3Rpb24gY29tcGlsZUlmKG5vZGUsIGZyYW1lLCBhc3luYykge1xuICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgdGhpcy5fZW1pdCgnaWYoJyk7XG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLmNvbmQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCcpIHsnKTtcblxuICAgIHRoaXMuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXM4LmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG5cbiAgICAgIGlmIChhc3luYykge1xuICAgICAgICBfdGhpczguX2VtaXQoJ2NiKCknKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub2RlLmVsc2VfKSB7XG4gICAgICB0aGlzLl9lbWl0TGluZSgnfVxcbmVsc2UgeycpO1xuXG4gICAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXM4LmNvbXBpbGUobm9kZS5lbHNlXywgZnJhbWUpO1xuXG4gICAgICAgIGlmIChhc3luYykge1xuICAgICAgICAgIF90aGlzOC5fZW1pdCgnY2IoKScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgICB0aGlzLl9lbWl0TGluZSgnfVxcbmVsc2UgeycpO1xuXG4gICAgICB0aGlzLl9lbWl0KCdjYigpJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUlmQXN5bmMgPSBmdW5jdGlvbiBjb21waWxlSWZBc3luYyhub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJyhmdW5jdGlvbihjYikgeycpO1xuXG4gICAgdGhpcy5jb21waWxlSWYobm9kZSwgZnJhbWUsIHRydWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnfSkoJyArIHRoaXMuX21ha2VDYWxsYmFjaygpKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcbiAgfTtcblxuICBfcHJvdG8uX2VtaXRMb29wQmluZGluZ3MgPSBmdW5jdGlvbiBfZW1pdExvb3BCaW5kaW5ncyhub2RlLCBhcnIsIGksIGxlbikge1xuICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgdmFyIGJpbmRpbmdzID0gW3tcbiAgICAgIG5hbWU6ICdpbmRleCcsXG4gICAgICB2YWw6IGkgKyBcIiArIDFcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICdpbmRleDAnLFxuICAgICAgdmFsOiBpXG4gICAgfSwge1xuICAgICAgbmFtZTogJ3JldmluZGV4JyxcbiAgICAgIHZhbDogbGVuICsgXCIgLSBcIiArIGlcbiAgICB9LCB7XG4gICAgICBuYW1lOiAncmV2aW5kZXgwJyxcbiAgICAgIHZhbDogbGVuICsgXCIgLSBcIiArIGkgKyBcIiAtIDFcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICdmaXJzdCcsXG4gICAgICB2YWw6IGkgKyBcIiA9PT0gMFwiXG4gICAgfSwge1xuICAgICAgbmFtZTogJ2xhc3QnLFxuICAgICAgdmFsOiBpICsgXCIgPT09IFwiICsgbGVuICsgXCIgLSAxXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiAnbGVuZ3RoJyxcbiAgICAgIHZhbDogbGVuXG4gICAgfV07XG4gICAgYmluZGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoYikge1xuICAgICAgX3RoaXM5Ll9lbWl0TGluZShcImZyYW1lLnNldChcXFwibG9vcC5cIiArIGIubmFtZSArIFwiXFxcIiwgXCIgKyBiLnZhbCArIFwiKTtcIik7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVGb3IgPSBmdW5jdGlvbiBjb21waWxlRm9yKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgLy8gU29tZSBvZiB0aGlzIGNvZGUgaXMgdWdseSwgYnV0IGl0IGtlZXBzIHRoZSBnZW5lcmF0ZWQgY29kZVxuICAgIC8vIGFzIGZhc3QgYXMgcG9zc2libGUuIEZvckFzeW5jIGFsc28gc2hhcmVzIHNvbWUgb2YgdGhpcywgYnV0XG4gICAgLy8gbm90IG11Y2guXG4gICAgdmFyIGkgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgdmFyIGxlbiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgYXJyID0gdGhpcy5fdG1waWQoKTtcblxuICAgIGZyYW1lID0gZnJhbWUucHVzaCgpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2ZyYW1lID0gZnJhbWUucHVzaCgpOycpO1xuXG4gICAgdGhpcy5fZW1pdChcInZhciBcIiArIGFyciArIFwiID0gXCIpO1xuXG4gICAgdGhpcy5fY29tcGlsZUV4cHJlc3Npb24obm9kZS5hcnIsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCc7Jyk7XG5cbiAgICB0aGlzLl9lbWl0KFwiaWYoXCIgKyBhcnIgKyBcIikge1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKGFyciArICcgPSBydW50aW1lLmZyb21JdGVyYXRvcignICsgYXJyICsgJyk7Jyk7IC8vIElmIG11bHRpcGxlIG5hbWVzIGFyZSBwYXNzZWQsIHdlIG5lZWQgdG8gYmluZCB0aGVtXG4gICAgLy8gYXBwcm9wcmlhdGVseVxuXG5cbiAgICBpZiAobm9kZS5uYW1lIGluc3RhbmNlb2Ygbm9kZXMuQXJyYXkpIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwidmFyIFwiICsgaSArIFwiO1wiKTsgLy8gVGhlIG9iamVjdCBjb3VsZCBiZSBhbiBhcnJveSBvciBvYmplY3QuIE5vdGUgdGhhdCB0aGVcbiAgICAgIC8vIGJvZHkgb2YgdGhlIGxvb3AgaXMgZHVwbGljYXRlZCBmb3IgZWFjaCBjb25kaXRpb24sIGJ1dFxuICAgICAgLy8gd2UgYXJlIG9wdGltaXppbmcgZm9yIHNwZWVkIG92ZXIgc2l6ZS5cblxuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImlmKHJ1bnRpbWUuaXNBcnJheShcIiArIGFyciArIFwiKSkge1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyBsZW4gKyBcIiA9IFwiICsgYXJyICsgXCIubGVuZ3RoO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmb3IoXCIgKyBpICsgXCI9MDsgXCIgKyBpICsgXCIgPCBcIiArIGFyciArIFwiLmxlbmd0aDsgXCIgKyBpICsgXCIrKykge1wiKTsgLy8gQmluZCBlYWNoIGRlY2xhcmVkIHZhclxuXG5cbiAgICAgIG5vZGUubmFtZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCwgdSkge1xuICAgICAgICB2YXIgdGlkID0gX3RoaXMxMC5fdG1waWQoKTtcblxuICAgICAgICBfdGhpczEwLl9lbWl0TGluZShcInZhciBcIiArIHRpZCArIFwiID0gXCIgKyBhcnIgKyBcIltcIiArIGkgKyBcIl1bXCIgKyB1ICsgXCJdO1wiKTtcblxuICAgICAgICBfdGhpczEwLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBjaGlsZCArIFwiXFxcIiwgXCIgKyBhcnIgKyBcIltcIiArIGkgKyBcIl1bXCIgKyB1ICsgXCJdKTtcIik7XG5cbiAgICAgICAgZnJhbWUuc2V0KG5vZGUubmFtZS5jaGlsZHJlblt1XS52YWx1ZSwgdGlkKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbWl0TG9vcEJpbmRpbmdzKG5vZGUsIGFyciwgaSwgbGVuKTtcblxuICAgICAgdGhpcy5fd2l0aFNjb3BlZFN5bnRheChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMTAuY29tcGlsZShub2RlLmJvZHksIGZyYW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZSgnfSBlbHNlIHsnKTsgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXkvdmFsdWVzIG9mIGFuIG9iamVjdFxuXG5cbiAgICAgIHZhciBfbm9kZSRuYW1lJGNoaWxkcmVuID0gbm9kZS5uYW1lLmNoaWxkcmVuLFxuICAgICAgICAgIGtleSA9IF9ub2RlJG5hbWUkY2hpbGRyZW5bMF0sXG4gICAgICAgICAgdmFsID0gX25vZGUkbmFtZSRjaGlsZHJlblsxXTtcblxuICAgICAgdmFyIGsgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgICB2YXIgdiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICAgIGZyYW1lLnNldChrZXkudmFsdWUsIGspO1xuICAgICAgZnJhbWUuc2V0KHZhbC52YWx1ZSwgdik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKGkgKyBcIiA9IC0xO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyBsZW4gKyBcIiA9IHJ1bnRpbWUua2V5cyhcIiArIGFyciArIFwiKS5sZW5ndGg7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImZvcih2YXIgXCIgKyBrICsgXCIgaW4gXCIgKyBhcnIgKyBcIikge1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoaSArIFwiKys7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcInZhciBcIiArIHYgKyBcIiA9IFwiICsgYXJyICsgXCJbXCIgKyBrICsgXCJdO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsga2V5LnZhbHVlICsgXCJcXFwiLCBcIiArIGsgKyBcIik7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyB2YWwudmFsdWUgKyBcIlxcXCIsIFwiICsgdiArIFwiKTtcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMb29wQmluZGluZ3Mobm9kZSwgYXJyLCBpLCBsZW4pO1xuXG4gICAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMxMC5jb21waWxlKG5vZGUuYm9keSwgZnJhbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEdlbmVyYXRlIGEgdHlwaWNhbCBhcnJheSBpdGVyYXRpb25cbiAgICAgIHZhciBfdiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICAgIGZyYW1lLnNldChub2RlLm5hbWUudmFsdWUsIF92KTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyBsZW4gKyBcIiA9IFwiICsgYXJyICsgXCIubGVuZ3RoO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmb3IodmFyIFwiICsgaSArIFwiPTA7IFwiICsgaSArIFwiIDwgXCIgKyBhcnIgKyBcIi5sZW5ndGg7IFwiICsgaSArIFwiKyspIHtcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwidmFyIFwiICsgX3YgKyBcIiA9IFwiICsgYXJyICsgXCJbXCIgKyBpICsgXCJdO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgbm9kZS5uYW1lLnZhbHVlICsgXCJcXFwiLCBcIiArIF92ICsgXCIpO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExvb3BCaW5kaW5ncyhub2RlLCBhcnIsIGksIGxlbik7XG5cbiAgICAgIHRoaXMuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczEwLmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuXG4gICAgaWYgKG5vZGUuZWxzZV8pIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKCdpZiAoIScgKyBsZW4gKyAnKSB7Jyk7XG5cbiAgICAgIHRoaXMuY29tcGlsZShub2RlLmVsc2VfLCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2ZyYW1lID0gZnJhbWUucG9wKCk7Jyk7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlQXN5bmNMb29wID0gZnVuY3Rpb24gX2NvbXBpbGVBc3luY0xvb3Aobm9kZSwgZnJhbWUsIHBhcmFsbGVsKSB7XG4gICAgdmFyIF90aGlzMTEgPSB0aGlzO1xuXG4gICAgLy8gVGhpcyBzaGFyZXMgc29tZSBjb2RlIHdpdGggdGhlIEZvciB0YWcsIGJ1dCBub3QgZW5vdWdoIHRvXG4gICAgLy8gd29ycnkgYWJvdXQuIFRoaXMgaXRlcmF0ZXMgYWNyb3NzIGFuIG9iamVjdCBhc3luY2hyb25vdXNseSxcbiAgICAvLyBidXQgbm90IGluIHBhcmFsbGVsLlxuICAgIHZhciBpID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHZhciBsZW4gPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgdmFyIGFyciA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgYXN5bmNNZXRob2QgPSBwYXJhbGxlbCA/ICdhc3luY0FsbCcgOiAnYXN5bmNFYWNoJztcbiAgICBmcmFtZSA9IGZyYW1lLnB1c2goKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdmcmFtZSA9IGZyYW1lLnB1c2goKTsnKTtcblxuICAgIHRoaXMuX2VtaXQoJ3ZhciAnICsgYXJyICsgJyA9IHJ1bnRpbWUuZnJvbUl0ZXJhdG9yKCcpO1xuXG4gICAgdGhpcy5fY29tcGlsZUV4cHJlc3Npb24obm9kZS5hcnIsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCcpOycpO1xuXG4gICAgaWYgKG5vZGUubmFtZSBpbnN0YW5jZW9mIG5vZGVzLkFycmF5KSB7XG4gICAgICB2YXIgYXJyYXlMZW4gPSBub2RlLm5hbWUuY2hpbGRyZW4ubGVuZ3RoO1xuXG4gICAgICB0aGlzLl9lbWl0KFwicnVudGltZS5cIiArIGFzeW5jTWV0aG9kICsgXCIoXCIgKyBhcnIgKyBcIiwgXCIgKyBhcnJheUxlbiArIFwiLCBmdW5jdGlvbihcIik7XG5cbiAgICAgIG5vZGUubmFtZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIF90aGlzMTEuX2VtaXQobmFtZS52YWx1ZSArIFwiLFwiKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbWl0KGkgKyAnLCcgKyBsZW4gKyAnLG5leHQpIHsnKTtcblxuICAgICAgbm9kZS5uYW1lLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIGlkID0gbmFtZS52YWx1ZTtcbiAgICAgICAgZnJhbWUuc2V0KGlkLCBpZCk7XG5cbiAgICAgICAgX3RoaXMxMS5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgaWQgKyBcIlxcXCIsIFwiICsgaWQgKyBcIik7XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpZCA9IG5vZGUubmFtZS52YWx1ZTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJydW50aW1lLlwiICsgYXN5bmNNZXRob2QgKyBcIihcIiArIGFyciArIFwiLCAxLCBmdW5jdGlvbihcIiArIGlkICsgXCIsIFwiICsgaSArIFwiLCBcIiArIGxlbiArIFwiLG5leHQpIHtcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCdmcmFtZS5zZXQoXCInICsgaWQgKyAnXCIsICcgKyBpZCArICcpOycpO1xuXG4gICAgICBmcmFtZS5zZXQoaWQsIGlkKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TG9vcEJpbmRpbmdzKG5vZGUsIGFyciwgaSwgbGVuKTtcblxuICAgIHRoaXMuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGJ1ZjtcblxuICAgICAgaWYgKHBhcmFsbGVsKSB7XG4gICAgICAgIGJ1ZiA9IF90aGlzMTEuX3B1c2hCdWZmZXIoKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMxMS5jb21waWxlKG5vZGUuYm9keSwgZnJhbWUpO1xuXG4gICAgICBfdGhpczExLl9lbWl0TGluZSgnbmV4dCgnICsgaSArIChidWYgPyAnLCcgKyBidWYgOiAnJykgKyAnKTsnKTtcblxuICAgICAgaWYgKHBhcmFsbGVsKSB7XG4gICAgICAgIF90aGlzMTEuX3BvcEJ1ZmZlcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIG91dHB1dCA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfSwgJyArIHRoaXMuX21ha2VDYWxsYmFjayhvdXRwdXQpKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcblxuICAgIGlmIChwYXJhbGxlbCkge1xuICAgICAgdGhpcy5fZW1pdExpbmUodGhpcy5idWZmZXIgKyAnICs9ICcgKyBvdXRwdXQgKyAnOycpO1xuICAgIH1cblxuICAgIGlmIChub2RlLmVsc2VfKSB7XG4gICAgICB0aGlzLl9lbWl0TGluZSgnaWYgKCEnICsgYXJyICsgJy5sZW5ndGgpIHsnKTtcblxuICAgICAgdGhpcy5jb21waWxlKG5vZGUuZWxzZV8sIGZyYW1lKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnZnJhbWUgPSBmcmFtZS5wb3AoKTsnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUFzeW5jRWFjaCA9IGZ1bmN0aW9uIGNvbXBpbGVBc3luY0VhY2gobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9jb21waWxlQXN5bmNMb29wKG5vZGUsIGZyYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUFzeW5jQWxsID0gZnVuY3Rpb24gY29tcGlsZUFzeW5jQWxsKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fY29tcGlsZUFzeW5jTG9vcChub2RlLCBmcmFtZSwgdHJ1ZSk7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlTWFjcm8gPSBmdW5jdGlvbiBfY29tcGlsZU1hY3JvKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTIgPSB0aGlzO1xuXG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIga3dhcmdzID0gbnVsbDtcblxuICAgIHZhciBmdW5jSWQgPSAnbWFjcm9fJyArIHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIga2VlcEZyYW1lID0gZnJhbWUgIT09IHVuZGVmaW5lZDsgLy8gVHlwZSBjaGVjayB0aGUgZGVmaW5pdGlvbiBvZiB0aGUgYXJnc1xuXG4gICAgbm9kZS5hcmdzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGFyZywgaSkge1xuICAgICAgaWYgKGkgPT09IG5vZGUuYXJncy5jaGlsZHJlbi5sZW5ndGggLSAxICYmIGFyZyBpbnN0YW5jZW9mIG5vZGVzLkRpY3QpIHtcbiAgICAgICAga3dhcmdzID0gYXJnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMxMi5hc3NlcnRUeXBlKGFyZywgbm9kZXMuU3ltYm9sKTtcblxuICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgcmVhbE5hbWVzID0gYXJncy5tYXAoZnVuY3Rpb24gKG4pIHtcbiAgICAgIHJldHVybiBcImxfXCIgKyBuLnZhbHVlO1xuICAgIH0pLmNvbmNhdChbJ2t3YXJncyddKTsgLy8gUXVvdGVkIGFyZ3VtZW50IG5hbWVzXG5cbiAgICB2YXIgYXJnTmFtZXMgPSBhcmdzLm1hcChmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuIFwiXFxcIlwiICsgbi52YWx1ZSArIFwiXFxcIlwiO1xuICAgIH0pO1xuICAgIHZhciBrd2FyZ05hbWVzID0gKGt3YXJncyAmJiBrd2FyZ3MuY2hpbGRyZW4gfHwgW10pLm1hcChmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuIFwiXFxcIlwiICsgbi5rZXkudmFsdWUgKyBcIlxcXCJcIjtcbiAgICB9KTsgLy8gV2UgcGFzcyBhIGZ1bmN0aW9uIHRvIG1ha2VNYWNybyB3aGljaCBkZXN0cnVjdHVyZXMgdGhlXG4gICAgLy8gYXJndW1lbnRzIHNvIHN1cHBvcnQgc2V0dGluZyBwb3NpdGlvbmFsIGFyZ3Mgd2l0aCBrZXl3b3Jkc1xuICAgIC8vIGFyZ3MgYW5kIHBhc3Npbmcga2V5d29yZCBhcmdzIGFzIHBvc2l0aW9uYWwgYXJnc1xuICAgIC8vIChlc3NlbnRpYWxseSBkZWZhdWx0IHZhbHVlcykuIFNlZSBydW50aW1lLmpzLlxuXG4gICAgdmFyIGN1cnJGcmFtZTtcblxuICAgIGlmIChrZWVwRnJhbWUpIHtcbiAgICAgIGN1cnJGcmFtZSA9IGZyYW1lLnB1c2godHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJGcmFtZSA9IG5ldyBGcmFtZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXRMaW5lcyhcInZhciBcIiArIGZ1bmNJZCArIFwiID0gcnVudGltZS5tYWtlTWFjcm8oXCIsIFwiW1wiICsgYXJnTmFtZXMuam9pbignLCAnKSArIFwiXSwgXCIsIFwiW1wiICsga3dhcmdOYW1lcy5qb2luKCcsICcpICsgXCJdLCBcIiwgXCJmdW5jdGlvbiAoXCIgKyByZWFsTmFtZXMuam9pbignLCAnKSArIFwiKSB7XCIsICd2YXIgY2FsbGVyRnJhbWUgPSBmcmFtZTsnLCAnZnJhbWUgPSAnICsgKGtlZXBGcmFtZSA/ICdmcmFtZS5wdXNoKHRydWUpOycgOiAnbmV3IHJ1bnRpbWUuRnJhbWUoKTsnKSwgJ2t3YXJncyA9IGt3YXJncyB8fCB7fTsnLCAnaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChrd2FyZ3MsIFwiY2FsbGVyXCIpKSB7JywgJ2ZyYW1lLnNldChcImNhbGxlclwiLCBrd2FyZ3MuY2FsbGVyKTsgfScpOyAvLyBFeHBvc2UgdGhlIGFyZ3VtZW50cyB0byB0aGUgdGVtcGxhdGUuIERvbid0IG5lZWQgdG8gdXNlXG4gICAgLy8gcmFuZG9tIG5hbWVzIGJlY2F1c2UgdGhlIGZ1bmN0aW9uXG4gICAgLy8gd2lsbCBjcmVhdGUgYSBuZXcgcnVuLXRpbWUgc2NvcGUgZm9yIHVzXG5cblxuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG4gICAgICBfdGhpczEyLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBhcmcudmFsdWUgKyBcIlxcXCIsIGxfXCIgKyBhcmcudmFsdWUgKyBcIik7XCIpO1xuXG4gICAgICBjdXJyRnJhbWUuc2V0KGFyZy52YWx1ZSwgXCJsX1wiICsgYXJnLnZhbHVlKTtcbiAgICB9KTsgLy8gRXhwb3NlIHRoZSBrZXl3b3JkIGFyZ3VtZW50c1xuXG4gICAgaWYgKGt3YXJncykge1xuICAgICAga3dhcmdzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKHBhaXIpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBwYWlyLmtleS52YWx1ZTtcblxuICAgICAgICBfdGhpczEyLl9lbWl0KFwiZnJhbWUuc2V0KFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiKTtcblxuICAgICAgICBfdGhpczEyLl9lbWl0KFwiT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGt3YXJncywgXFxcIlwiICsgbmFtZSArIFwiXFxcIilcIik7XG5cbiAgICAgICAgX3RoaXMxMi5fZW1pdChcIiA/IGt3YXJnc1tcXFwiXCIgKyBuYW1lICsgXCJcXFwiXSA6IFwiKTtcblxuICAgICAgICBfdGhpczEyLl9jb21waWxlRXhwcmVzc2lvbihwYWlyLnZhbHVlLCBjdXJyRnJhbWUpO1xuXG4gICAgICAgIF90aGlzMTIuX2VtaXQoJyk7Jyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgYnVmZmVySWQgPSB0aGlzLl9wdXNoQnVmZmVyKCk7XG5cbiAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzMTIuY29tcGlsZShub2RlLmJvZHksIGN1cnJGcmFtZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnZnJhbWUgPSAnICsgKGtlZXBGcmFtZSA/ICdmcmFtZS5wb3AoKTsnIDogJ2NhbGxlckZyYW1lOycpKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwicmV0dXJuIG5ldyBydW50aW1lLlNhZmVTdHJpbmcoXCIgKyBidWZmZXJJZCArIFwiKTtcIik7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfSk7Jyk7XG5cbiAgICB0aGlzLl9wb3BCdWZmZXIoKTtcblxuICAgIHJldHVybiBmdW5jSWQ7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVNYWNybyA9IGZ1bmN0aW9uIGNvbXBpbGVNYWNybyhub2RlLCBmcmFtZSkge1xuICAgIHZhciBmdW5jSWQgPSB0aGlzLl9jb21waWxlTWFjcm8obm9kZSk7IC8vIEV4cG9zZSB0aGUgbWFjcm8gdG8gdGhlIHRlbXBsYXRlc1xuXG5cbiAgICB2YXIgbmFtZSA9IG5vZGUubmFtZS52YWx1ZTtcbiAgICBmcmFtZS5zZXQobmFtZSwgZnVuY0lkKTtcblxuICAgIGlmIChmcmFtZS5wYXJlbnQpIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwiZnJhbWUuc2V0KFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiICsgZnVuY0lkICsgXCIpO1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5vZGUubmFtZS52YWx1ZS5jaGFyQXQoMCkgIT09ICdfJykge1xuICAgICAgICB0aGlzLl9lbWl0TGluZShcImNvbnRleHQuYWRkRXhwb3J0KFxcXCJcIiArIG5hbWUgKyBcIlxcXCIpO1wiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJjb250ZXh0LnNldFZhcmlhYmxlKFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiICsgZnVuY0lkICsgXCIpO1wiKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVDYWxsZXIgPSBmdW5jdGlvbiBjb21waWxlQ2FsbGVyKG5vZGUsIGZyYW1lKSB7XG4gICAgLy8gYmFzaWNhbGx5IGFuIGFub255bW91cyBcIm1hY3JvIGV4cHJlc3Npb25cIlxuICAgIHRoaXMuX2VtaXQoJyhmdW5jdGlvbiAoKXsnKTtcblxuICAgIHZhciBmdW5jSWQgPSB0aGlzLl9jb21waWxlTWFjcm8obm9kZSwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdChcInJldHVybiBcIiArIGZ1bmNJZCArIFwiO30pKClcIik7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlR2V0VGVtcGxhdGUgPSBmdW5jdGlvbiBfY29tcGlsZUdldFRlbXBsYXRlKG5vZGUsIGZyYW1lLCBlYWdlckNvbXBpbGUsIGlnbm9yZU1pc3NpbmcpIHtcbiAgICB2YXIgcGFyZW50VGVtcGxhdGVJZCA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgcGFyZW50TmFtZSA9IHRoaXMuX3RlbXBsYXRlTmFtZSgpO1xuXG4gICAgdmFyIGNiID0gdGhpcy5fbWFrZUNhbGxiYWNrKHBhcmVudFRlbXBsYXRlSWQpO1xuXG4gICAgdmFyIGVhZ2VyQ29tcGlsZUFyZyA9IGVhZ2VyQ29tcGlsZSA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgdmFyIGlnbm9yZU1pc3NpbmdBcmcgPSBpZ25vcmVNaXNzaW5nID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIHRoaXMuX2VtaXQoJ2Vudi5nZXRUZW1wbGF0ZSgnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUudGVtcGxhdGUsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwiLCBcIiArIGVhZ2VyQ29tcGlsZUFyZyArIFwiLCBcIiArIHBhcmVudE5hbWUgKyBcIiwgXCIgKyBpZ25vcmVNaXNzaW5nQXJnICsgXCIsIFwiICsgY2IpO1xuXG4gICAgcmV0dXJuIHBhcmVudFRlbXBsYXRlSWQ7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVJbXBvcnQgPSBmdW5jdGlvbiBjb21waWxlSW1wb3J0KG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIHRhcmdldCA9IG5vZGUudGFyZ2V0LnZhbHVlO1xuXG4gICAgdmFyIGlkID0gdGhpcy5fY29tcGlsZUdldFRlbXBsYXRlKG5vZGUsIGZyYW1lLCBmYWxzZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoaWQgKyAnLmdldEV4cG9ydGVkKCcgKyAobm9kZS53aXRoQ29udGV4dCA/ICdjb250ZXh0LmdldFZhcmlhYmxlcygpLCBmcmFtZSwgJyA6ICcnKSArIHRoaXMuX21ha2VDYWxsYmFjayhpZCkpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgZnJhbWUuc2V0KHRhcmdldCwgaWQpO1xuXG4gICAgaWYgKGZyYW1lLnBhcmVudCkge1xuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgdGFyZ2V0ICsgXCJcXFwiLCBcIiArIGlkICsgXCIpO1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW1pdExpbmUoXCJjb250ZXh0LnNldFZhcmlhYmxlKFxcXCJcIiArIHRhcmdldCArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlRnJvbUltcG9ydCA9IGZ1bmN0aW9uIGNvbXBpbGVGcm9tSW1wb3J0KG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTMgPSB0aGlzO1xuXG4gICAgdmFyIGltcG9ydGVkSWQgPSB0aGlzLl9jb21waWxlR2V0VGVtcGxhdGUobm9kZSwgZnJhbWUsIGZhbHNlLCBmYWxzZSk7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZShpbXBvcnRlZElkICsgJy5nZXRFeHBvcnRlZCgnICsgKG5vZGUud2l0aENvbnRleHQgPyAnY29udGV4dC5nZXRWYXJpYWJsZXMoKSwgZnJhbWUsICcgOiAnJykgKyB0aGlzLl9tYWtlQ2FsbGJhY2soaW1wb3J0ZWRJZCkpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgbm9kZS5uYW1lcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lTm9kZSkge1xuICAgICAgdmFyIG5hbWU7XG4gICAgICB2YXIgYWxpYXM7XG5cbiAgICAgIHZhciBpZCA9IF90aGlzMTMuX3RtcGlkKCk7XG5cbiAgICAgIGlmIChuYW1lTm9kZSBpbnN0YW5jZW9mIG5vZGVzLlBhaXIpIHtcbiAgICAgICAgbmFtZSA9IG5hbWVOb2RlLmtleS52YWx1ZTtcbiAgICAgICAgYWxpYXMgPSBuYW1lTm9kZS52YWx1ZS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5hbWUgPSBuYW1lTm9kZS52YWx1ZTtcbiAgICAgICAgYWxpYXMgPSBuYW1lO1xuICAgICAgfVxuXG4gICAgICBfdGhpczEzLl9lbWl0TGluZShcImlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcIiArIGltcG9ydGVkSWQgKyBcIiwgXFxcIlwiICsgbmFtZSArIFwiXFxcIikpIHtcIik7XG5cbiAgICAgIF90aGlzMTMuX2VtaXRMaW5lKFwidmFyIFwiICsgaWQgKyBcIiA9IFwiICsgaW1wb3J0ZWRJZCArIFwiLlwiICsgbmFtZSArIFwiO1wiKTtcblxuICAgICAgX3RoaXMxMy5fZW1pdExpbmUoJ30gZWxzZSB7Jyk7XG5cbiAgICAgIF90aGlzMTMuX2VtaXRMaW5lKFwiY2IobmV3IEVycm9yKFxcXCJjYW5ub3QgaW1wb3J0ICdcIiArIG5hbWUgKyBcIidcXFwiKSk7IHJldHVybjtcIik7XG5cbiAgICAgIF90aGlzMTMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICAgIGZyYW1lLnNldChhbGlhcywgaWQpO1xuXG4gICAgICBpZiAoZnJhbWUucGFyZW50KSB7XG4gICAgICAgIF90aGlzMTMuX2VtaXRMaW5lKFwiZnJhbWUuc2V0KFxcXCJcIiArIGFsaWFzICsgXCJcXFwiLCBcIiArIGlkICsgXCIpO1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzMTMuX2VtaXRMaW5lKFwiY29udGV4dC5zZXRWYXJpYWJsZShcXFwiXCIgKyBhbGlhcyArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVCbG9jayA9IGZ1bmN0aW9uIGNvbXBpbGVCbG9jayhub2RlKSB7XG4gICAgdmFyIGlkID0gdGhpcy5fdG1waWQoKTsgLy8gSWYgd2UgYXJlIGV4ZWN1dGluZyBvdXRzaWRlIGEgYmxvY2sgKGNyZWF0aW5nIGEgdG9wLWxldmVsXG4gICAgLy8gYmxvY2spLCB3ZSByZWFsbHkgZG9uJ3Qgd2FudCB0byBleGVjdXRlIGl0cyBjb2RlIGJlY2F1c2UgaXRcbiAgICAvLyB3aWxsIGV4ZWN1dGUgdHdpY2U6IG9uY2Ugd2hlbiB0aGUgY2hpbGQgdGVtcGxhdGUgcnVucyBhbmRcbiAgICAvLyBhZ2FpbiB3aGVuIHRoZSBwYXJlbnQgdGVtcGxhdGUgcnVucy4gTm90ZSB0aGF0IGJsb2Nrc1xuICAgIC8vIHdpdGhpbiBibG9ja3Mgd2lsbCAqYWx3YXlzKiBleGVjdXRlIGltbWVkaWF0ZWx5ICphbmQqXG4gICAgLy8gd2hlcmV2ZXIgZWxzZSB0aGV5IGFyZSBpbnZva2VkIChsaWtlIHVzZWQgaW4gYSBwYXJlbnRcbiAgICAvLyB0ZW1wbGF0ZSkuIFRoaXMgbWF5IGhhdmUgYmVoYXZpb3JhbCBkaWZmZXJlbmNlcyBmcm9tIGppbmphXG4gICAgLy8gYmVjYXVzZSBibG9ja3MgY2FuIGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgaXQgc2VlbXMgbGlrZSBhXG4gICAgLy8gd2FzdGUgb2YgcGVyZm9ybWFuY2UgdG8gYWx3YXlzIGV4ZWN1dGUgaHVnZSB0b3AtbGV2ZWxcbiAgICAvLyBibG9ja3MgdHdpY2VcblxuXG4gICAgaWYgKCF0aGlzLmluQmxvY2spIHtcbiAgICAgIHRoaXMuX2VtaXQoJyhwYXJlbnRUZW1wbGF0ZSA/IGZ1bmN0aW9uKGUsIGMsIGYsIHIsIGNiKSB7IGNiKFwiXCIpOyB9IDogJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdChcImNvbnRleHQuZ2V0QmxvY2soXFxcIlwiICsgbm9kZS5uYW1lLnZhbHVlICsgXCJcXFwiKVwiKTtcblxuICAgIGlmICghdGhpcy5pbkJsb2NrKSB7XG4gICAgICB0aGlzLl9lbWl0KCcpJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdExpbmUoJyhlbnYsIGNvbnRleHQsIGZyYW1lLCBydW50aW1lLCAnICsgdGhpcy5fbWFrZUNhbGxiYWNrKGlkKSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSh0aGlzLmJ1ZmZlciArIFwiICs9IFwiICsgaWQgKyBcIjtcIik7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVTdXBlciA9IGZ1bmN0aW9uIGNvbXBpbGVTdXBlcihub2RlLCBmcmFtZSkge1xuICAgIHZhciBuYW1lID0gbm9kZS5ibG9ja05hbWUudmFsdWU7XG4gICAgdmFyIGlkID0gbm9kZS5zeW1ib2wudmFsdWU7XG5cbiAgICB2YXIgY2IgPSB0aGlzLl9tYWtlQ2FsbGJhY2soaWQpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJjb250ZXh0LmdldFN1cGVyKGVudiwgXFxcIlwiICsgbmFtZSArIFwiXFxcIiwgYl9cIiArIG5hbWUgKyBcIiwgZnJhbWUsIHJ1bnRpbWUsIFwiICsgY2IpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoaWQgKyBcIiA9IHJ1bnRpbWUubWFya1NhZmUoXCIgKyBpZCArIFwiKTtcIik7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG5cbiAgICBmcmFtZS5zZXQoaWQsIGlkKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUV4dGVuZHMgPSBmdW5jdGlvbiBjb21waWxlRXh0ZW5kcyhub2RlLCBmcmFtZSkge1xuICAgIHZhciBrID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHZhciBwYXJlbnRUZW1wbGF0ZUlkID0gdGhpcy5fY29tcGlsZUdldFRlbXBsYXRlKG5vZGUsIGZyYW1lLCB0cnVlLCBmYWxzZSk7IC8vIGV4dGVuZHMgaXMgYSBkeW5hbWljIHRhZyBhbmQgY2FuIG9jY3VyIHdpdGhpbiBhIGJsb2NrIGxpa2VcbiAgICAvLyBgaWZgLCBzbyBpZiB0aGlzIGhhcHBlbnMgd2UgbmVlZCB0byBjYXB0dXJlIHRoZSBwYXJlbnRcbiAgICAvLyB0ZW1wbGF0ZSBpbiB0aGUgdG9wLWxldmVsIHNjb3BlXG5cblxuICAgIHRoaXMuX2VtaXRMaW5lKFwicGFyZW50VGVtcGxhdGUgPSBcIiArIHBhcmVudFRlbXBsYXRlSWQpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJmb3IodmFyIFwiICsgayArIFwiIGluIHBhcmVudFRlbXBsYXRlLmJsb2Nrcykge1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwiY29udGV4dC5hZGRCbG9jayhcIiArIGsgKyBcIiwgcGFyZW50VGVtcGxhdGUuYmxvY2tzW1wiICsgayArIFwiXSk7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUluY2x1ZGUgPSBmdW5jdGlvbiBjb21waWxlSW5jbHVkZShub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXRMaW5lKCd2YXIgdGFza3MgPSBbXTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd0YXNrcy5wdXNoKCcpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2Z1bmN0aW9uKGNhbGxiYWNrKSB7Jyk7XG5cbiAgICB2YXIgaWQgPSB0aGlzLl9jb21waWxlR2V0VGVtcGxhdGUobm9kZSwgZnJhbWUsIGZhbHNlLCBub2RlLmlnbm9yZU1pc3NpbmcpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJjYWxsYmFjayhudWxsLFwiICsgaWQgKyBcIik7fSk7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30pOycpO1xuXG4gICAgdmFyIGlkMiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgndGFza3MucHVzaCgnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdmdW5jdGlvbih0ZW1wbGF0ZSwgY2FsbGJhY2speycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3RlbXBsYXRlLnJlbmRlcihjb250ZXh0LmdldFZhcmlhYmxlcygpLCBmcmFtZSwgJyArIHRoaXMuX21ha2VDYWxsYmFjayhpZDIpKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdjYWxsYmFjayhudWxsLCcgKyBpZDIgKyAnKTt9KTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9KTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd0YXNrcy5wdXNoKCcpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2Z1bmN0aW9uKHJlc3VsdCwgY2FsbGJhY2speycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUodGhpcy5idWZmZXIgKyBcIiArPSByZXN1bHQ7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2NhbGxiYWNrKG51bGwpOycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30pOycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2Vudi53YXRlcmZhbGwodGFza3MsIGZ1bmN0aW9uKCl7Jyk7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVUZW1wbGF0ZURhdGEgPSBmdW5jdGlvbiBjb21waWxlVGVtcGxhdGVEYXRhKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5jb21waWxlTGl0ZXJhbChub2RlLCBmcmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVDYXB0dXJlID0gZnVuY3Rpb24gY29tcGlsZUNhcHR1cmUobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXMxNCA9IHRoaXM7XG5cbiAgICAvLyB3ZSBuZWVkIHRvIHRlbXBvcmFyaWx5IG92ZXJyaWRlIHRoZSBjdXJyZW50IGJ1ZmZlciBpZCBhcyAnb3V0cHV0J1xuICAgIC8vIHNvIHRoZSBzZXQgYmxvY2sgd3JpdGVzIHRvIHRoZSBjYXB0dXJlIG91dHB1dCBpbnN0ZWFkIG9mIHRoZSBidWZmZXJcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdGhpcy5idWZmZXIgPSAnb3V0cHV0JztcblxuICAgIHRoaXMuX2VtaXRMaW5lKCcoZnVuY3Rpb24oKSB7Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgndmFyIG91dHB1dCA9IFwiXCI7Jyk7XG5cbiAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzMTQuY29tcGlsZShub2RlLmJvZHksIGZyYW1lKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdyZXR1cm4gb3V0cHV0OycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30pKCknKTsgLy8gYW5kIG9mIGNvdXJzZSwgcmV2ZXJ0IGJhY2sgdG8gdGhlIG9sZCBidWZmZXIgaWRcblxuXG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVPdXRwdXQgPSBmdW5jdGlvbiBjb21waWxlT3V0cHV0KG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTUgPSB0aGlzO1xuXG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgLy8gVGVtcGxhdGVEYXRhIGlzIGEgc3BlY2lhbCBjYXNlIGJlY2F1c2UgaXQgaXMgbmV2ZXJcbiAgICAgIC8vIGF1dG9lc2NhcGVkLCBzbyBzaW1wbHkgb3V0cHV0IGl0IGZvciBvcHRpbWl6YXRpb25cbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIG5vZGVzLlRlbXBsYXRlRGF0YSkge1xuICAgICAgICBpZiAoY2hpbGQudmFsdWUpIHtcbiAgICAgICAgICBfdGhpczE1Ll9lbWl0KF90aGlzMTUuYnVmZmVyICsgXCIgKz0gXCIpO1xuXG4gICAgICAgICAgX3RoaXMxNS5jb21waWxlTGl0ZXJhbChjaGlsZCwgZnJhbWUpO1xuXG4gICAgICAgICAgX3RoaXMxNS5fZW1pdExpbmUoJzsnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMxNS5fZW1pdChfdGhpczE1LmJ1ZmZlciArIFwiICs9IHJ1bnRpbWUuc3VwcHJlc3NWYWx1ZShcIik7XG5cbiAgICAgICAgaWYgKF90aGlzMTUudGhyb3dPblVuZGVmaW5lZCkge1xuICAgICAgICAgIF90aGlzMTUuX2VtaXQoJ3J1bnRpbWUuZW5zdXJlRGVmaW5lZCgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMTUuY29tcGlsZShjaGlsZCwgZnJhbWUpO1xuXG4gICAgICAgIGlmIChfdGhpczE1LnRocm93T25VbmRlZmluZWQpIHtcbiAgICAgICAgICBfdGhpczE1Ll9lbWl0KFwiLFwiICsgbm9kZS5saW5lbm8gKyBcIixcIiArIG5vZGUuY29sbm8gKyBcIilcIik7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczE1Ll9lbWl0KCcsIGVudi5vcHRzLmF1dG9lc2NhcGUpO1xcbicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlUm9vdCA9IGZ1bmN0aW9uIGNvbXBpbGVSb290KG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTYgPSB0aGlzO1xuXG4gICAgaWYgKGZyYW1lKSB7XG4gICAgICB0aGlzLmZhaWwoJ2NvbXBpbGVSb290OiByb290IG5vZGUgY2FuXFwndCBoYXZlIGZyYW1lJyk7XG4gICAgfVxuXG4gICAgZnJhbWUgPSBuZXcgRnJhbWUoKTtcblxuICAgIHRoaXMuX2VtaXRGdW5jQmVnaW4oJ3Jvb3QnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd2YXIgcGFyZW50VGVtcGxhdGUgPSBudWxsOycpO1xuXG4gICAgdGhpcy5fY29tcGlsZUNoaWxkcmVuKG5vZGUsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdpZihwYXJlbnRUZW1wbGF0ZSkgeycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3BhcmVudFRlbXBsYXRlLnJvb3RSZW5kZXJGdW5jKGVudiwgY29udGV4dCwgZnJhbWUsIHJ1bnRpbWUsIGNiKTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9IGVsc2UgeycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJjYihudWxsLCBcIiArIHRoaXMuYnVmZmVyICsgXCIpO1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICB0aGlzLl9lbWl0RnVuY0VuZCh0cnVlKTtcblxuICAgIHRoaXMuaW5CbG9jayA9IHRydWU7XG4gICAgdmFyIGJsb2NrTmFtZXMgPSBbXTtcbiAgICB2YXIgYmxvY2tzID0gbm9kZS5maW5kQWxsKG5vZGVzLkJsb2NrKTtcbiAgICBibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAoYmxvY2ssIGkpIHtcbiAgICAgIHZhciBuYW1lID0gYmxvY2submFtZS52YWx1ZTtcblxuICAgICAgaWYgKGJsb2NrTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmxvY2sgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBkZWZpbmVkIG1vcmUgdGhhbiBvbmNlLlwiKTtcbiAgICAgIH1cblxuICAgICAgYmxvY2tOYW1lcy5wdXNoKG5hbWUpO1xuXG4gICAgICBfdGhpczE2Ll9lbWl0RnVuY0JlZ2luKFwiYl9cIiArIG5hbWUpO1xuXG4gICAgICB2YXIgdG1wRnJhbWUgPSBuZXcgRnJhbWUoKTtcblxuICAgICAgX3RoaXMxNi5fZW1pdExpbmUoJ3ZhciBmcmFtZSA9IGZyYW1lLnB1c2godHJ1ZSk7Jyk7XG5cbiAgICAgIF90aGlzMTYuY29tcGlsZShibG9jay5ib2R5LCB0bXBGcmFtZSk7XG5cbiAgICAgIF90aGlzMTYuX2VtaXRGdW5jRW5kKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgncmV0dXJuIHsnKTtcblxuICAgIGJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaywgaSkge1xuICAgICAgdmFyIGJsb2NrTmFtZSA9IFwiYl9cIiArIGJsb2NrLm5hbWUudmFsdWU7XG5cbiAgICAgIF90aGlzMTYuX2VtaXRMaW5lKGJsb2NrTmFtZSArIFwiOiBcIiArIGJsb2NrTmFtZSArIFwiLFwiKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdyb290OiByb290XFxufTsnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZSA9IGZ1bmN0aW9uIGNvbXBpbGUobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX2NvbXBpbGUgPSB0aGlzWydjb21waWxlJyArIG5vZGUudHlwZW5hbWVdO1xuXG4gICAgaWYgKF9jb21waWxlKSB7XG4gICAgICBfY29tcGlsZS5jYWxsKHRoaXMsIG5vZGUsIGZyYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mYWlsKFwiY29tcGlsZTogQ2Fubm90IGNvbXBpbGUgbm9kZTogXCIgKyBub2RlLnR5cGVuYW1lLCBub2RlLmxpbmVubywgbm9kZS5jb2xubyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5nZXRDb2RlID0gZnVuY3Rpb24gZ2V0Q29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2RlYnVmLmpvaW4oJycpO1xuICB9O1xuXG4gIHJldHVybiBDb21waWxlcjtcbn0oT2JqKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoc3JjLCBhc3luY0ZpbHRlcnMsIGV4dGVuc2lvbnMsIG5hbWUsIG9wdHMpIHtcbiAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRzID0ge307XG4gICAgfVxuXG4gICAgdmFyIGMgPSBuZXcgQ29tcGlsZXIobmFtZSwgb3B0cy50aHJvd09uVW5kZWZpbmVkKTsgLy8gUnVuIHRoZSBleHRlbnNpb24gcHJlcHJvY2Vzc29ycyBhZ2FpbnN0IHRoZSBzb3VyY2UuXG5cbiAgICB2YXIgcHJlcHJvY2Vzc29ycyA9IChleHRlbnNpb25zIHx8IFtdKS5tYXAoZnVuY3Rpb24gKGV4dCkge1xuICAgICAgcmV0dXJuIGV4dC5wcmVwcm9jZXNzO1xuICAgIH0pLmZpbHRlcihmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuICEhZjtcbiAgICB9KTtcbiAgICB2YXIgcHJvY2Vzc2VkU3JjID0gcHJlcHJvY2Vzc29ycy5yZWR1Y2UoZnVuY3Rpb24gKHMsIHByb2Nlc3Nvcikge1xuICAgICAgcmV0dXJuIHByb2Nlc3NvcihzKTtcbiAgICB9LCBzcmMpO1xuICAgIGMuY29tcGlsZSh0cmFuc2Zvcm1lci50cmFuc2Zvcm0ocGFyc2VyLnBhcnNlKHByb2Nlc3NlZFNyYywgZXh0ZW5zaW9ucywgb3B0cyksIGFzeW5jRmlsdGVycywgbmFtZSkpO1xuICAgIHJldHVybiBjLmdldENvZGUoKTtcbiAgfSxcbiAgQ29tcGlsZXI6IENvbXBpbGVyXG59O1xuXG4vKioqLyB9KSxcbi8qIDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBwYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIE9iaiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbm1vZHVsZS5leHBvcnRzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfT2JqKSB7XG4gIF9pbmhlcml0c0xvb3NlKExvYWRlciwgX09iaik7XG5cbiAgZnVuY3Rpb24gTG9hZGVyKCkge1xuICAgIHJldHVybiBfT2JqLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMb2FkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5vbiA9IGZ1bmN0aW9uIG9uKG5hbWUsIGZ1bmMpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzIHx8IHt9O1xuICAgIHRoaXMubGlzdGVuZXJzW25hbWVdID0gdGhpcy5saXN0ZW5lcnNbbmFtZV0gfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0ucHVzaChmdW5jKTtcbiAgfTtcblxuICBfcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQobmFtZSkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxpc3RlbmVycyAmJiB0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgbGlzdGVuZXIuYXBwbHkodm9pZCAwLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUoZnJvbSwgdG8pIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShmcm9tKSwgdG8pO1xuICB9O1xuXG4gIF9wcm90by5pc1JlbGF0aXZlID0gZnVuY3Rpb24gaXNSZWxhdGl2ZShmaWxlbmFtZSkge1xuICAgIHJldHVybiBmaWxlbmFtZS5pbmRleE9mKCcuLycpID09PSAwIHx8IGZpbGVuYW1lLmluZGV4T2YoJy4uLycpID09PSAwO1xuICB9O1xuXG4gIHJldHVybiBMb2FkZXI7XG59KE9iaik7XG5cbi8qKiovIH0pLFxuLyogNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIGFzYXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblxudmFyIF93YXRlcmZhbGwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBjb21waWxlciA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBmaWx0ZXJzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTApLFxuICAgIEZpbGVTeXN0ZW1Mb2FkZXIgPSBfcmVxdWlyZS5GaWxlU3lzdGVtTG9hZGVyLFxuICAgIFdlYkxvYWRlciA9IF9yZXF1aXJlLldlYkxvYWRlcixcbiAgICBQcmVjb21waWxlZExvYWRlciA9IF9yZXF1aXJlLlByZWNvbXBpbGVkTG9hZGVyO1xuXG52YXIgdGVzdHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIGdsb2JhbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblxudmFyIE9iaiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBnbG9iYWxSdW50aW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIGhhbmRsZUVycm9yID0gZ2xvYmFsUnVudGltZS5oYW5kbGVFcnJvcixcbiAgICBGcmFtZSA9IGdsb2JhbFJ1bnRpbWUuRnJhbWU7XG5cbnZhciBleHByZXNzQXBwID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7IC8vIElmIHRoZSB1c2VyIGlzIHVzaW5nIHRoZSBhc3luYyBBUEksICphbHdheXMqIGNhbGwgaXRcbi8vIGFzeW5jaHJvbm91c2x5IGV2ZW4gaWYgdGhlIHRlbXBsYXRlIHdhcyBzeW5jaHJvbm91cy5cblxuXG5mdW5jdGlvbiBjYWxsYmFja0FzYXAoY2IsIGVyciwgcmVzKSB7XG4gIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgIGNiKGVyciwgcmVzKTtcbiAgfSk7XG59XG4vKipcbiAqIEEgbm8tb3AgdGVtcGxhdGUsIGZvciB1c2Ugd2l0aCB7JSBpbmNsdWRlIGlnbm9yZSBtaXNzaW5nICV9XG4gKi9cblxuXG52YXIgbm9vcFRtcGxTcmMgPSB7XG4gIHR5cGU6ICdjb2RlJyxcbiAgb2JqOiB7XG4gICAgcm9vdDogZnVuY3Rpb24gcm9vdChlbnYsIGNvbnRleHQsIGZyYW1lLCBydW50aW1lLCBjYikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2IobnVsbCwgJycpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYihoYW5kbGVFcnJvcihlLCBudWxsLCBudWxsKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgRW52aXJvbm1lbnQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9PYmopIHtcbiAgX2luaGVyaXRzTG9vc2UoRW52aXJvbm1lbnQsIF9PYmopO1xuXG4gIGZ1bmN0aW9uIEVudmlyb25tZW50KCkge1xuICAgIHJldHVybiBfT2JqLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBFbnZpcm9ubWVudC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KGxvYWRlcnMsIG9wdHMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gVGhlIGRldiBmbGFnIGRldGVybWluZXMgdGhlIHRyYWNlIHRoYXQnbGwgYmUgc2hvd24gb24gZXJyb3JzLlxuICAgIC8vIElmIHNldCB0byB0cnVlLCByZXR1cm5zIHRoZSBmdWxsIHRyYWNlIGZyb20gdGhlIGVycm9yIHBvaW50LFxuICAgIC8vIG90aGVyd2lzZSB3aWxsIHJldHVybiB0cmFjZSBzdGFydGluZyBmcm9tIFRlbXBsYXRlLnJlbmRlclxuICAgIC8vICh0aGUgZnVsbCB0cmFjZSBmcm9tIHdpdGhpbiBudW5qdWNrcyBtYXkgY29uZnVzZSBkZXZlbG9wZXJzIHVzaW5nXG4gICAgLy8gIHRoZSBsaWJyYXJ5KVxuICAgIC8vIGRlZmF1bHRzIHRvIGZhbHNlXG4gICAgb3B0cyA9IHRoaXMub3B0cyA9IG9wdHMgfHwge307XG4gICAgdGhpcy5vcHRzLmRldiA9ICEhb3B0cy5kZXY7IC8vIFRoZSBhdXRvZXNjYXBlIGZsYWcgc2V0cyBnbG9iYWwgYXV0b2VzY2FwaW5nLiBJZiB0cnVlLFxuICAgIC8vIGV2ZXJ5IHN0cmluZyB2YXJpYWJsZSB3aWxsIGJlIGVzY2FwZWQgYnkgZGVmYXVsdC5cbiAgICAvLyBJZiBmYWxzZSwgc3RyaW5ncyBjYW4gYmUgbWFudWFsbHkgZXNjYXBlZCB1c2luZyB0aGUgYGVzY2FwZWAgZmlsdGVyLlxuICAgIC8vIGRlZmF1bHRzIHRvIHRydWVcblxuICAgIHRoaXMub3B0cy5hdXRvZXNjYXBlID0gb3B0cy5hdXRvZXNjYXBlICE9IG51bGwgPyBvcHRzLmF1dG9lc2NhcGUgOiB0cnVlOyAvLyBJZiB0cnVlLCB0aGlzIHdpbGwgbWFrZSB0aGUgc3lzdGVtIHRocm93IGVycm9ycyBpZiB0cnlpbmdcbiAgICAvLyB0byBvdXRwdXQgYSBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZVxuXG4gICAgdGhpcy5vcHRzLnRocm93T25VbmRlZmluZWQgPSAhIW9wdHMudGhyb3dPblVuZGVmaW5lZDtcbiAgICB0aGlzLm9wdHMudHJpbUJsb2NrcyA9ICEhb3B0cy50cmltQmxvY2tzO1xuICAgIHRoaXMub3B0cy5sc3RyaXBCbG9ja3MgPSAhIW9wdHMubHN0cmlwQmxvY2tzO1xuICAgIHRoaXMubG9hZGVycyA9IFtdO1xuXG4gICAgaWYgKCFsb2FkZXJzKSB7XG4gICAgICAvLyBUaGUgZmlsZXN5c3RlbSBsb2FkZXIgaXMgb25seSBhdmFpbGFibGUgc2VydmVyLXNpZGVcbiAgICAgIGlmIChGaWxlU3lzdGVtTG9hZGVyKSB7XG4gICAgICAgIHRoaXMubG9hZGVycyA9IFtuZXcgRmlsZVN5c3RlbUxvYWRlcigndmlld3MnKV07XG4gICAgICB9IGVsc2UgaWYgKFdlYkxvYWRlcikge1xuICAgICAgICB0aGlzLmxvYWRlcnMgPSBbbmV3IFdlYkxvYWRlcignL3ZpZXdzJyldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvYWRlcnMgPSBsaWIuaXNBcnJheShsb2FkZXJzKSA/IGxvYWRlcnMgOiBbbG9hZGVyc107XG4gICAgfSAvLyBJdCdzIGVhc3kgdG8gdXNlIHByZWNvbXBpbGVkIHRlbXBsYXRlczoganVzdCBpbmNsdWRlIHRoZW1cbiAgICAvLyBiZWZvcmUgeW91IGNvbmZpZ3VyZSBudW5qdWNrcyBhbmQgdGhpcyB3aWxsIGF1dG9tYXRpY2FsbHlcbiAgICAvLyBwaWNrIGl0IHVwIGFuZCB1c2UgaXRcblxuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5udW5qdWNrc1ByZWNvbXBpbGVkKSB7XG4gICAgICB0aGlzLmxvYWRlcnMudW5zaGlmdChuZXcgUHJlY29tcGlsZWRMb2FkZXIod2luZG93Lm51bmp1Y2tzUHJlY29tcGlsZWQpKTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRDYWNoZSgpO1xuICAgIHRoaXMuZ2xvYmFscyA9IGdsb2JhbHMoKTtcbiAgICB0aGlzLmZpbHRlcnMgPSB7fTtcbiAgICB0aGlzLnRlc3RzID0ge307XG4gICAgdGhpcy5hc3luY0ZpbHRlcnMgPSBbXTtcbiAgICB0aGlzLmV4dGVuc2lvbnMgPSB7fTtcbiAgICB0aGlzLmV4dGVuc2lvbnNMaXN0ID0gW107XG5cbiAgICBsaWIuX2VudHJpZXMoZmlsdGVycykuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIG5hbWUgPSBfcmVmWzBdLFxuICAgICAgICAgIGZpbHRlciA9IF9yZWZbMV07XG4gICAgICByZXR1cm4gX3RoaXMuYWRkRmlsdGVyKG5hbWUsIGZpbHRlcik7XG4gICAgfSk7XG5cbiAgICBsaWIuX2VudHJpZXModGVzdHMpLmZvckVhY2goZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgbmFtZSA9IF9yZWYyWzBdLFxuICAgICAgICAgIHRlc3QgPSBfcmVmMlsxXTtcbiAgICAgIHJldHVybiBfdGhpcy5hZGRUZXN0KG5hbWUsIHRlc3QpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5pbml0Q2FjaGUgPSBmdW5jdGlvbiBpbml0Q2FjaGUoKSB7XG4gICAgLy8gQ2FjaGluZyBhbmQgY2FjaGUgYnVzdGluZ1xuICAgIHRoaXMubG9hZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChsb2FkZXIpIHtcbiAgICAgIGxvYWRlci5jYWNoZSA9IHt9O1xuXG4gICAgICBpZiAodHlwZW9mIGxvYWRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsb2FkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgIGxvYWRlci5jYWNoZVt0ZW1wbGF0ZV0gPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uYWRkRXh0ZW5zaW9uID0gZnVuY3Rpb24gYWRkRXh0ZW5zaW9uKG5hbWUsIGV4dGVuc2lvbikge1xuICAgIGV4dGVuc2lvbi5fX25hbWUgPSBuYW1lO1xuICAgIHRoaXMuZXh0ZW5zaW9uc1tuYW1lXSA9IGV4dGVuc2lvbjtcbiAgICB0aGlzLmV4dGVuc2lvbnNMaXN0LnB1c2goZXh0ZW5zaW9uKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8ucmVtb3ZlRXh0ZW5zaW9uID0gZnVuY3Rpb24gcmVtb3ZlRXh0ZW5zaW9uKG5hbWUpIHtcbiAgICB2YXIgZXh0ZW5zaW9uID0gdGhpcy5nZXRFeHRlbnNpb24obmFtZSk7XG5cbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZXh0ZW5zaW9uc0xpc3QgPSBsaWIud2l0aG91dCh0aGlzLmV4dGVuc2lvbnNMaXN0LCBleHRlbnNpb24pO1xuICAgIGRlbGV0ZSB0aGlzLmV4dGVuc2lvbnNbbmFtZV07XG4gIH07XG5cbiAgX3Byb3RvLmdldEV4dGVuc2lvbiA9IGZ1bmN0aW9uIGdldEV4dGVuc2lvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uc1tuYW1lXTtcbiAgfTtcblxuICBfcHJvdG8uaGFzRXh0ZW5zaW9uID0gZnVuY3Rpb24gaGFzRXh0ZW5zaW9uKG5hbWUpIHtcbiAgICByZXR1cm4gISF0aGlzLmV4dGVuc2lvbnNbbmFtZV07XG4gIH07XG5cbiAgX3Byb3RvLmFkZEdsb2JhbCA9IGZ1bmN0aW9uIGFkZEdsb2JhbChuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMuZ2xvYmFsc1tuYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5nZXRHbG9iYWwgPSBmdW5jdGlvbiBnZXRHbG9iYWwobmFtZSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5nbG9iYWxzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdnbG9iYWwgbm90IGZvdW5kOiAnICsgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2xvYmFsc1tuYW1lXTtcbiAgfTtcblxuICBfcHJvdG8uYWRkRmlsdGVyID0gZnVuY3Rpb24gYWRkRmlsdGVyKG5hbWUsIGZ1bmMsIGFzeW5jKSB7XG4gICAgdmFyIHdyYXBwZWQgPSBmdW5jO1xuXG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICB0aGlzLmFzeW5jRmlsdGVycy5wdXNoKG5hbWUpO1xuICAgIH1cblxuICAgIHRoaXMuZmlsdGVyc1tuYW1lXSA9IHdyYXBwZWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmdldEZpbHRlciA9IGZ1bmN0aW9uIGdldEZpbHRlcihuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmZpbHRlcnNbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZmlsdGVyIG5vdCBmb3VuZDogJyArIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZpbHRlcnNbbmFtZV07XG4gIH07XG5cbiAgX3Byb3RvLmFkZFRlc3QgPSBmdW5jdGlvbiBhZGRUZXN0KG5hbWUsIGZ1bmMpIHtcbiAgICB0aGlzLnRlc3RzW25hbWVdID0gZnVuYztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZ2V0VGVzdCA9IGZ1bmN0aW9uIGdldFRlc3QobmFtZSkge1xuICAgIGlmICghdGhpcy50ZXN0c1tuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0ZXN0IG5vdCBmb3VuZDogJyArIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnRlc3RzW25hbWVdO1xuICB9O1xuXG4gIF9wcm90by5yZXNvbHZlVGVtcGxhdGUgPSBmdW5jdGlvbiByZXNvbHZlVGVtcGxhdGUobG9hZGVyLCBwYXJlbnROYW1lLCBmaWxlbmFtZSkge1xuICAgIHZhciBpc1JlbGF0aXZlID0gbG9hZGVyLmlzUmVsYXRpdmUgJiYgcGFyZW50TmFtZSA/IGxvYWRlci5pc1JlbGF0aXZlKGZpbGVuYW1lKSA6IGZhbHNlO1xuICAgIHJldHVybiBpc1JlbGF0aXZlICYmIGxvYWRlci5yZXNvbHZlID8gbG9hZGVyLnJlc29sdmUocGFyZW50TmFtZSwgZmlsZW5hbWUpIDogZmlsZW5hbWU7XG4gIH07XG5cbiAgX3Byb3RvLmdldFRlbXBsYXRlID0gZnVuY3Rpb24gZ2V0VGVtcGxhdGUobmFtZSwgZWFnZXJDb21waWxlLCBwYXJlbnROYW1lLCBpZ25vcmVNaXNzaW5nLCBjYikge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciB0bXBsID0gbnVsbDtcblxuICAgIGlmIChuYW1lICYmIG5hbWUucmF3KSB7XG4gICAgICAvLyB0aGlzIGZpeGVzIGF1dG9lc2NhcGUgZm9yIHRlbXBsYXRlcyByZWZlcmVuY2VkIGluIHN5bWJvbHNcbiAgICAgIG5hbWUgPSBuYW1lLnJhdztcbiAgICB9XG5cbiAgICBpZiAobGliLmlzRnVuY3Rpb24ocGFyZW50TmFtZSkpIHtcbiAgICAgIGNiID0gcGFyZW50TmFtZTtcbiAgICAgIHBhcmVudE5hbWUgPSBudWxsO1xuICAgICAgZWFnZXJDb21waWxlID0gZWFnZXJDb21waWxlIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChsaWIuaXNGdW5jdGlvbihlYWdlckNvbXBpbGUpKSB7XG4gICAgICBjYiA9IGVhZ2VyQ29tcGlsZTtcbiAgICAgIGVhZ2VyQ29tcGlsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChuYW1lIGluc3RhbmNlb2YgVGVtcGxhdGUpIHtcbiAgICAgIHRtcGwgPSBuYW1lO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RlbXBsYXRlIG5hbWVzIG11c3QgYmUgYSBzdHJpbmc6ICcgKyBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxvYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGxvYWRlciA9IHRoaXMubG9hZGVyc1tpXTtcbiAgICAgICAgdG1wbCA9IGxvYWRlci5jYWNoZVt0aGlzLnJlc29sdmVUZW1wbGF0ZShsb2FkZXIsIHBhcmVudE5hbWUsIG5hbWUpXTtcblxuICAgICAgICBpZiAodG1wbCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRtcGwpIHtcbiAgICAgIGlmIChlYWdlckNvbXBpbGUpIHtcbiAgICAgICAgdG1wbC5jb21waWxlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYikge1xuICAgICAgICBjYihudWxsLCB0bXBsKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0bXBsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzeW5jUmVzdWx0O1xuXG4gICAgdmFyIGNyZWF0ZVRlbXBsYXRlID0gZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGUoZXJyLCBpbmZvKSB7XG4gICAgICBpZiAoIWluZm8gJiYgIWVyciAmJiAhaWdub3JlTWlzc2luZykge1xuICAgICAgICBlcnIgPSBuZXcgRXJyb3IoJ3RlbXBsYXRlIG5vdCBmb3VuZDogJyArIG5hbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgbmV3VG1wbDtcblxuICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgIG5ld1RtcGwgPSBuZXcgVGVtcGxhdGUobm9vcFRtcGxTcmMsIF90aGlzMiwgJycsIGVhZ2VyQ29tcGlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdUbXBsID0gbmV3IFRlbXBsYXRlKGluZm8uc3JjLCBfdGhpczIsIGluZm8ucGF0aCwgZWFnZXJDb21waWxlKTtcblxuICAgICAgICBpZiAoIWluZm8ubm9DYWNoZSkge1xuICAgICAgICAgIGluZm8ubG9hZGVyLmNhY2hlW25hbWVdID0gbmV3VG1wbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgY2IobnVsbCwgbmV3VG1wbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzeW5jUmVzdWx0ID0gbmV3VG1wbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliLmFzeW5jSXRlcih0aGlzLmxvYWRlcnMsIGZ1bmN0aW9uIChsb2FkZXIsIGksIG5leHQsIGRvbmUpIHtcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShlcnIsIHNyYykge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICB9IGVsc2UgaWYgKHNyYykge1xuICAgICAgICAgIHNyYy5sb2FkZXIgPSBsb2FkZXI7XG4gICAgICAgICAgZG9uZShudWxsLCBzcmMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfSAvLyBSZXNvbHZlIG5hbWUgcmVsYXRpdmUgdG8gcGFyZW50TmFtZVxuXG5cbiAgICAgIG5hbWUgPSB0aGF0LnJlc29sdmVUZW1wbGF0ZShsb2FkZXIsIHBhcmVudE5hbWUsIG5hbWUpO1xuXG4gICAgICBpZiAobG9hZGVyLmFzeW5jKSB7XG4gICAgICAgIGxvYWRlci5nZXRTb3VyY2UobmFtZSwgaGFuZGxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZShudWxsLCBsb2FkZXIuZ2V0U291cmNlKG5hbWUpKTtcbiAgICAgIH1cbiAgICB9LCBjcmVhdGVUZW1wbGF0ZSk7XG4gICAgcmV0dXJuIHN5bmNSZXN1bHQ7XG4gIH07XG5cbiAgX3Byb3RvLmV4cHJlc3MgPSBmdW5jdGlvbiBleHByZXNzKGFwcCkge1xuICAgIHJldHVybiBleHByZXNzQXBwKHRoaXMsIGFwcCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcihuYW1lLCBjdHgsIGNiKSB7XG4gICAgaWYgKGxpYi5pc0Z1bmN0aW9uKGN0eCkpIHtcbiAgICAgIGNiID0gY3R4O1xuICAgICAgY3R4ID0gbnVsbDtcbiAgICB9IC8vIFdlIHN1cHBvcnQgYSBzeW5jaHJvbm91cyBBUEkgdG8gbWFrZSBpdCBlYXNpZXIgdG8gbWlncmF0ZVxuICAgIC8vIGV4aXN0aW5nIGNvZGUgdG8gYXN5bmMuIFRoaXMgd29ya3MgYmVjYXVzZSBpZiB5b3UgZG9uJ3QgZG9cbiAgICAvLyBhbnl0aGluZyBhc3luYyB3b3JrLCB0aGUgd2hvbGUgdGhpbmcgaXMgYWN0dWFsbHkgcnVuXG4gICAgLy8gc3luY2hyb25vdXNseS5cblxuXG4gICAgdmFyIHN5bmNSZXN1bHQgPSBudWxsO1xuICAgIHRoaXMuZ2V0VGVtcGxhdGUobmFtZSwgZnVuY3Rpb24gKGVyciwgdG1wbCkge1xuICAgICAgaWYgKGVyciAmJiBjYikge1xuICAgICAgICBjYWxsYmFja0FzYXAoY2IsIGVycik7XG4gICAgICB9IGVsc2UgaWYgKGVycikge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzeW5jUmVzdWx0ID0gdG1wbC5yZW5kZXIoY3R4LCBjYik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN5bmNSZXN1bHQ7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlclN0cmluZyA9IGZ1bmN0aW9uIHJlbmRlclN0cmluZyhzcmMsIGN0eCwgb3B0cywgY2IpIHtcbiAgICBpZiAobGliLmlzRnVuY3Rpb24ob3B0cykpIHtcbiAgICAgIGNiID0gb3B0cztcbiAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG5cbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgdG1wbCA9IG5ldyBUZW1wbGF0ZShzcmMsIHRoaXMsIG9wdHMucGF0aCk7XG4gICAgcmV0dXJuIHRtcGwucmVuZGVyKGN0eCwgY2IpO1xuICB9O1xuXG4gIF9wcm90by53YXRlcmZhbGwgPSBmdW5jdGlvbiB3YXRlcmZhbGwodGFza3MsIGNhbGxiYWNrLCBmb3JjZUFzeW5jKSB7XG4gICAgcmV0dXJuIF93YXRlcmZhbGwodGFza3MsIGNhbGxiYWNrLCBmb3JjZUFzeW5jKTtcbiAgfTtcblxuICByZXR1cm4gRW52aXJvbm1lbnQ7XG59KE9iaik7XG5cbnZhciBDb250ZXh0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfT2JqMikge1xuICBfaW5oZXJpdHNMb29zZShDb250ZXh0LCBfT2JqMik7XG5cbiAgZnVuY3Rpb24gQ29udGV4dCgpIHtcbiAgICByZXR1cm4gX09iajIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBDb250ZXh0LnByb3RvdHlwZTtcblxuICBfcHJvdG8yLmluaXQgPSBmdW5jdGlvbiBpbml0KGN0eCwgYmxvY2tzLCBlbnYpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIC8vIEhhcyB0byBiZSB0aWVkIHRvIGFuIGVudmlyb25tZW50IHNvIHdlIGNhbiB0YXAgaW50byBpdHMgZ2xvYmFscy5cbiAgICB0aGlzLmVudiA9IGVudiB8fCBuZXcgRW52aXJvbm1lbnQoKTsgLy8gTWFrZSBhIGR1cGxpY2F0ZSBvZiBjdHhcblxuICAgIHRoaXMuY3R4ID0gbGliLmV4dGVuZCh7fSwgY3R4KTtcbiAgICB0aGlzLmJsb2NrcyA9IHt9O1xuICAgIHRoaXMuZXhwb3J0ZWQgPSBbXTtcbiAgICBsaWIua2V5cyhibG9ja3MpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIF90aGlzMy5hZGRCbG9jayhuYW1lLCBibG9ja3NbbmFtZV0pO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzIubG9va3VwID0gZnVuY3Rpb24gbG9va3VwKG5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIG9uZSBvZiB0aGUgbW9zdCBjYWxsZWQgZnVuY3Rpb25zLCBzbyBvcHRpbWl6ZSBmb3JcbiAgICAvLyB0aGUgdHlwaWNhbCBjYXNlIHdoZXJlIHRoZSBuYW1lIGlzbid0IGluIHRoZSBnbG9iYWxzXG4gICAgaWYgKG5hbWUgaW4gdGhpcy5lbnYuZ2xvYmFscyAmJiAhKG5hbWUgaW4gdGhpcy5jdHgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnYuZ2xvYmFsc1tuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY3R4W25hbWVdO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8yLnNldFZhcmlhYmxlID0gZnVuY3Rpb24gc2V0VmFyaWFibGUobmFtZSwgdmFsKSB7XG4gICAgdGhpcy5jdHhbbmFtZV0gPSB2YWw7XG4gIH07XG5cbiAgX3Byb3RvMi5nZXRWYXJpYWJsZXMgPSBmdW5jdGlvbiBnZXRWYXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3R4O1xuICB9O1xuXG4gIF9wcm90bzIuYWRkQmxvY2sgPSBmdW5jdGlvbiBhZGRCbG9jayhuYW1lLCBibG9jaykge1xuICAgIHRoaXMuYmxvY2tzW25hbWVdID0gdGhpcy5ibG9ja3NbbmFtZV0gfHwgW107XG4gICAgdGhpcy5ibG9ja3NbbmFtZV0ucHVzaChibG9jayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5nZXRCbG9jayA9IGZ1bmN0aW9uIGdldEJsb2NrKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuYmxvY2tzW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gYmxvY2sgXCInICsgbmFtZSArICdcIicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJsb2Nrc1tuYW1lXVswXTtcbiAgfTtcblxuICBfcHJvdG8yLmdldFN1cGVyID0gZnVuY3Rpb24gZ2V0U3VwZXIoZW52LCBuYW1lLCBibG9jaywgZnJhbWUsIHJ1bnRpbWUsIGNiKSB7XG4gICAgdmFyIGlkeCA9IGxpYi5pbmRleE9mKHRoaXMuYmxvY2tzW25hbWVdIHx8IFtdLCBibG9jayk7XG4gICAgdmFyIGJsayA9IHRoaXMuYmxvY2tzW25hbWVdW2lkeCArIDFdO1xuICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgIGlmIChpZHggPT09IC0xIHx8ICFibGspIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gc3VwZXIgYmxvY2sgYXZhaWxhYmxlIGZvciBcIicgKyBuYW1lICsgJ1wiJyk7XG4gICAgfVxuXG4gICAgYmxrKGVudiwgY29udGV4dCwgZnJhbWUsIHJ1bnRpbWUsIGNiKTtcbiAgfTtcblxuICBfcHJvdG8yLmFkZEV4cG9ydCA9IGZ1bmN0aW9uIGFkZEV4cG9ydChuYW1lKSB7XG4gICAgdGhpcy5leHBvcnRlZC5wdXNoKG5hbWUpO1xuICB9O1xuXG4gIF9wcm90bzIuZ2V0RXhwb3J0ZWQgPSBmdW5jdGlvbiBnZXRFeHBvcnRlZCgpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciBleHBvcnRlZCA9IHt9O1xuICAgIHRoaXMuZXhwb3J0ZWQuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgZXhwb3J0ZWRbbmFtZV0gPSBfdGhpczQuY3R4W25hbWVdO1xuICAgIH0pO1xuICAgIHJldHVybiBleHBvcnRlZDtcbiAgfTtcblxuICByZXR1cm4gQ29udGV4dDtcbn0oT2JqKTtcblxudmFyIFRlbXBsYXRlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfT2JqMykge1xuICBfaW5oZXJpdHNMb29zZShUZW1wbGF0ZSwgX09iajMpO1xuXG4gIGZ1bmN0aW9uIFRlbXBsYXRlKCkge1xuICAgIHJldHVybiBfT2JqMy5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvMyA9IFRlbXBsYXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8zLmluaXQgPSBmdW5jdGlvbiBpbml0KHNyYywgZW52LCBwYXRoLCBlYWdlckNvbXBpbGUpIHtcbiAgICB0aGlzLmVudiA9IGVudiB8fCBuZXcgRW52aXJvbm1lbnQoKTtcblxuICAgIGlmIChsaWIuaXNPYmplY3Qoc3JjKSkge1xuICAgICAgc3dpdGNoIChzcmMudHlwZSkge1xuICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICB0aGlzLnRtcGxQcm9wcyA9IHNyYy5vYmo7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICB0aGlzLnRtcGxTdHIgPSBzcmMub2JqO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCB0ZW1wbGF0ZSBvYmplY3QgdHlwZSBcIiArIHNyYy50eXBlICsgXCI7IGV4cGVjdGVkICdjb2RlJywgb3IgJ3N0cmluZydcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsaWIuaXNTdHJpbmcoc3JjKSkge1xuICAgICAgdGhpcy50bXBsU3RyID0gc3JjO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NyYyBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSBzb3VyY2UnKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuXG4gICAgaWYgKGVhZ2VyQ29tcGlsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fY29tcGlsZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRocm93IGxpYi5fcHJldHRpZnlFcnJvcih0aGlzLnBhdGgsIHRoaXMuZW52Lm9wdHMuZGV2LCBlcnIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbXBpbGVkID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKGN0eCwgcGFyZW50RnJhbWUsIGNiKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIGN0eCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBjdHg7XG4gICAgICBjdHggPSB7fTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJlbnRGcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBwYXJlbnRGcmFtZTtcbiAgICAgIHBhcmVudEZyYW1lID0gbnVsbDtcbiAgICB9IC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGZyYW1lLCB3ZSBhcmUgYmVpbmcgY2FsbGVkIGZyb20gaW50ZXJuYWxcbiAgICAvLyBjb2RlIG9mIGFub3RoZXIgdGVtcGxhdGUsIGFuZCB0aGUgaW50ZXJuYWwgc3lzdGVtXG4gICAgLy8gZGVwZW5kcyBvbiB0aGUgc3luYy9hc3luYyBuYXR1cmUgb2YgdGhlIHBhcmVudCB0ZW1wbGF0ZVxuICAgIC8vIHRvIGJlIGluaGVyaXRlZCwgc28gZm9yY2UgYW4gYXN5bmMgY2FsbGJhY2tcblxuXG4gICAgdmFyIGZvcmNlQXN5bmMgPSAhcGFyZW50RnJhbWU7IC8vIENhdGNoIGNvbXBpbGUgZXJyb3JzIGZvciBhc3luYyByZW5kZXJpbmdcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmNvbXBpbGUoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2YXIgZXJyID0gbGliLl9wcmV0dGlmeUVycm9yKHRoaXMucGF0aCwgdGhpcy5lbnYub3B0cy5kZXYsIGUpO1xuXG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrQXNhcChjYiwgZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KGN0eCB8fCB7fSwgdGhpcy5ibG9ja3MsIHRoaXMuZW52KTtcbiAgICB2YXIgZnJhbWUgPSBwYXJlbnRGcmFtZSA/IHBhcmVudEZyYW1lLnB1c2godHJ1ZSkgOiBuZXcgRnJhbWUoKTtcbiAgICBmcmFtZS50b3BMZXZlbCA9IHRydWU7XG4gICAgdmFyIHN5bmNSZXN1bHQgPSBudWxsO1xuICAgIHZhciBkaWRFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMucm9vdFJlbmRlckZ1bmModGhpcy5lbnYsIGNvbnRleHQsIGZyYW1lLCBnbG9iYWxSdW50aW1lLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgIGlmIChkaWRFcnJvcikge1xuICAgICAgICAvLyBwcmV2ZW50IG11bHRpcGxlIGNhbGxzIHRvIGNiXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycikge1xuICAgICAgICBlcnIgPSBsaWIuX3ByZXR0aWZ5RXJyb3IoX3RoaXM1LnBhdGgsIF90aGlzNS5lbnYub3B0cy5kZXYsIGVycik7XG4gICAgICAgIGRpZEVycm9yID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIGlmIChmb3JjZUFzeW5jKSB7XG4gICAgICAgICAgY2FsbGJhY2tBc2FwKGNiLCBlcnIsIHJlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2IoZXJyLCByZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgc3luY1Jlc3VsdCA9IHJlcztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3luY1Jlc3VsdDtcbiAgfTtcblxuICBfcHJvdG8zLmdldEV4cG9ydGVkID0gZnVuY3Rpb24gZ2V0RXhwb3J0ZWQoY3R4LCBwYXJlbnRGcmFtZSwgY2IpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBjdHggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gY3R4O1xuICAgICAgY3R4ID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwYXJlbnRGcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBwYXJlbnRGcmFtZTtcbiAgICAgIHBhcmVudEZyYW1lID0gbnVsbDtcbiAgICB9IC8vIENhdGNoIGNvbXBpbGUgZXJyb3JzIGZvciBhc3luYyByZW5kZXJpbmdcblxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29tcGlsZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChjYikge1xuICAgICAgICByZXR1cm4gY2IoZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBmcmFtZSA9IHBhcmVudEZyYW1lID8gcGFyZW50RnJhbWUucHVzaCgpIDogbmV3IEZyYW1lKCk7XG4gICAgZnJhbWUudG9wTGV2ZWwgPSB0cnVlOyAvLyBSdW4gdGhlIHJvb3RSZW5kZXJGdW5jIHRvIHBvcHVsYXRlIHRoZSBjb250ZXh0IHdpdGggZXhwb3J0ZWQgdmFyc1xuXG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dChjdHggfHwge30sIHRoaXMuYmxvY2tzLCB0aGlzLmVudik7XG4gICAgdGhpcy5yb290UmVuZGVyRnVuYyh0aGlzLmVudiwgY29udGV4dCwgZnJhbWUsIGdsb2JhbFJ1bnRpbWUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY2IoZXJyLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNiKG51bGwsIGNvbnRleHQuZ2V0RXhwb3J0ZWQoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5jb21waWxlID0gZnVuY3Rpb24gY29tcGlsZSgpIHtcbiAgICBpZiAoIXRoaXMuY29tcGlsZWQpIHtcbiAgICAgIHRoaXMuX2NvbXBpbGUoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5fY29tcGlsZSA9IGZ1bmN0aW9uIF9jb21waWxlKCkge1xuICAgIHZhciBwcm9wcztcblxuICAgIGlmICh0aGlzLnRtcGxQcm9wcykge1xuICAgICAgcHJvcHMgPSB0aGlzLnRtcGxQcm9wcztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvdXJjZSA9IGNvbXBpbGVyLmNvbXBpbGUodGhpcy50bXBsU3RyLCB0aGlzLmVudi5hc3luY0ZpbHRlcnMsIHRoaXMuZW52LmV4dGVuc2lvbnNMaXN0LCB0aGlzLnBhdGgsIHRoaXMuZW52Lm9wdHMpO1xuICAgICAgdmFyIGZ1bmMgPSBuZXcgRnVuY3Rpb24oc291cmNlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuXG4gICAgICBwcm9wcyA9IGZ1bmMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJsb2NrcyA9IHRoaXMuX2dldEJsb2Nrcyhwcm9wcyk7XG4gICAgdGhpcy5yb290UmVuZGVyRnVuYyA9IHByb3BzLnJvb3Q7XG4gICAgdGhpcy5jb21waWxlZCA9IHRydWU7XG4gIH07XG5cbiAgX3Byb3RvMy5fZ2V0QmxvY2tzID0gZnVuY3Rpb24gX2dldEJsb2Nrcyhwcm9wcykge1xuICAgIHZhciBibG9ja3MgPSB7fTtcbiAgICBsaWIua2V5cyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKGsuc2xpY2UoMCwgMikgPT09ICdiXycpIHtcbiAgICAgICAgYmxvY2tzW2suc2xpY2UoMildID0gcHJvcHNba107XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGJsb2NrcztcbiAgfTtcblxuICByZXR1cm4gVGVtcGxhdGU7XG59KE9iaik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFbnZpcm9ubWVudDogRW52aXJvbm1lbnQsXG4gIFRlbXBsYXRlOiBUZW1wbGF0ZVxufTtcblxuLyoqKi8gfSksXG4vKiA4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgbGV4ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXG52YXIgbm9kZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgT2JqID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBQYXJzZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9PYmopIHtcbiAgX2luaGVyaXRzTG9vc2UoUGFyc2VyLCBfT2JqKTtcblxuICBmdW5jdGlvbiBQYXJzZXIoKSB7XG4gICAgcmV0dXJuIF9PYmouYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFBhcnNlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KHRva2Vucykge1xuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zO1xuICAgIHRoaXMucGVla2VkID0gbnVsbDtcbiAgICB0aGlzLmJyZWFrT25CbG9ja3MgPSBudWxsO1xuICAgIHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlID0gZmFsc2U7XG4gICAgdGhpcy5leHRlbnNpb25zID0gW107XG4gIH07XG5cbiAgX3Byb3RvLm5leHRUb2tlbiA9IGZ1bmN0aW9uIG5leHRUb2tlbih3aXRoV2hpdGVzcGFjZSkge1xuICAgIHZhciB0b2s7XG5cbiAgICBpZiAodGhpcy5wZWVrZWQpIHtcbiAgICAgIGlmICghd2l0aFdoaXRlc3BhY2UgJiYgdGhpcy5wZWVrZWQudHlwZSA9PT0gbGV4ZXIuVE9LRU5fV0hJVEVTUEFDRSkge1xuICAgICAgICB0aGlzLnBlZWtlZCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2sgPSB0aGlzLnBlZWtlZDtcbiAgICAgICAgdGhpcy5wZWVrZWQgPSBudWxsO1xuICAgICAgICByZXR1cm4gdG9rO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRvayA9IHRoaXMudG9rZW5zLm5leHRUb2tlbigpO1xuXG4gICAgaWYgKCF3aXRoV2hpdGVzcGFjZSkge1xuICAgICAgd2hpbGUgKHRvayAmJiB0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fV0hJVEVTUEFDRSkge1xuICAgICAgICB0b2sgPSB0aGlzLnRva2Vucy5uZXh0VG9rZW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9rO1xuICB9O1xuXG4gIF9wcm90by5wZWVrVG9rZW4gPSBmdW5jdGlvbiBwZWVrVG9rZW4oKSB7XG4gICAgdGhpcy5wZWVrZWQgPSB0aGlzLnBlZWtlZCB8fCB0aGlzLm5leHRUb2tlbigpO1xuICAgIHJldHVybiB0aGlzLnBlZWtlZDtcbiAgfTtcblxuICBfcHJvdG8ucHVzaFRva2VuID0gZnVuY3Rpb24gcHVzaFRva2VuKHRvaykge1xuICAgIGlmICh0aGlzLnBlZWtlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwdXNoVG9rZW46IGNhbiBvbmx5IHB1c2ggb25lIHRva2VuIG9uIGJldHdlZW4gcmVhZHMnKTtcbiAgICB9XG5cbiAgICB0aGlzLnBlZWtlZCA9IHRvaztcbiAgfTtcblxuICBfcHJvdG8uZXJyb3IgPSBmdW5jdGlvbiBlcnJvcihtc2csIGxpbmVubywgY29sbm8pIHtcbiAgICBpZiAobGluZW5vID09PSB1bmRlZmluZWQgfHwgY29sbm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCkgfHwge307XG4gICAgICBsaW5lbm8gPSB0b2subGluZW5vO1xuICAgICAgY29sbm8gPSB0b2suY29sbm87XG4gICAgfVxuXG4gICAgaWYgKGxpbmVubyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaW5lbm8gKz0gMTtcbiAgICB9XG5cbiAgICBpZiAoY29sbm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29sbm8gKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGxpYi5UZW1wbGF0ZUVycm9yKG1zZywgbGluZW5vLCBjb2xubyk7XG4gIH07XG5cbiAgX3Byb3RvLmZhaWwgPSBmdW5jdGlvbiBmYWlsKG1zZywgbGluZW5vLCBjb2xubykge1xuICAgIHRocm93IHRoaXMuZXJyb3IobXNnLCBsaW5lbm8sIGNvbG5vKTtcbiAgfTtcblxuICBfcHJvdG8uc2tpcCA9IGZ1bmN0aW9uIHNraXAodHlwZSkge1xuICAgIHZhciB0b2sgPSB0aGlzLm5leHRUb2tlbigpO1xuXG4gICAgaWYgKCF0b2sgfHwgdG9rLnR5cGUgIT09IHR5cGUpIHtcbiAgICAgIHRoaXMucHVzaFRva2VuKHRvayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgX3Byb3RvLmV4cGVjdCA9IGZ1bmN0aW9uIGV4cGVjdCh0eXBlKSB7XG4gICAgdmFyIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG5cbiAgICBpZiAodG9rLnR5cGUgIT09IHR5cGUpIHtcbiAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgJyArIHR5cGUgKyAnLCBnb3QgJyArIHRvay50eXBlLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgIH1cblxuICAgIHJldHVybiB0b2s7XG4gIH07XG5cbiAgX3Byb3RvLnNraXBWYWx1ZSA9IGZ1bmN0aW9uIHNraXBWYWx1ZSh0eXBlLCB2YWwpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgIGlmICghdG9rIHx8IHRvay50eXBlICE9PSB0eXBlIHx8IHRvay52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICB0aGlzLnB1c2hUb2tlbih0b2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIF9wcm90by5za2lwU3ltYm9sID0gZnVuY3Rpb24gc2tpcFN5bWJvbCh2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fU1lNQk9MLCB2YWwpO1xuICB9O1xuXG4gIF9wcm90by5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCA9IGZ1bmN0aW9uIGFkdmFuY2VBZnRlckJsb2NrRW5kKG5hbWUpIHtcbiAgICB2YXIgdG9rO1xuXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgICBpZiAoIXRvaykge1xuICAgICAgICB0aGlzLmZhaWwoJ3VuZXhwZWN0ZWQgZW5kIG9mIGZpbGUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRvay50eXBlICE9PSBsZXhlci5UT0tFTl9TWU1CT0wpIHtcbiAgICAgICAgdGhpcy5mYWlsKCdhZHZhbmNlQWZ0ZXJCbG9ja0VuZDogZXhwZWN0ZWQgc3ltYm9sIHRva2VuIG9yICcgKyAnZXhwbGljaXQgbmFtZSB0byBiZSBwYXNzZWQnKTtcbiAgICAgIH1cblxuICAgICAgbmFtZSA9IHRoaXMubmV4dFRva2VuKCkudmFsdWU7XG4gICAgfVxuXG4gICAgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgIGlmICh0b2sgJiYgdG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0JMT0NLX0VORCkge1xuICAgICAgaWYgKHRvay52YWx1ZS5jaGFyQXQoMCkgPT09ICctJykge1xuICAgICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgYmxvY2sgZW5kIGluICcgKyBuYW1lICsgJyBzdGF0ZW1lbnQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9rO1xuICB9O1xuXG4gIF9wcm90by5hZHZhbmNlQWZ0ZXJWYXJpYWJsZUVuZCA9IGZ1bmN0aW9uIGFkdmFuY2VBZnRlclZhcmlhYmxlRW5kKCkge1xuICAgIHZhciB0b2sgPSB0aGlzLm5leHRUb2tlbigpO1xuXG4gICAgaWYgKHRvayAmJiB0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fVkFSSUFCTEVfRU5EKSB7XG4gICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IHRvay52YWx1ZS5jaGFyQXQodG9rLnZhbHVlLmxlbmd0aCAtIHRoaXMudG9rZW5zLnRhZ3MuVkFSSUFCTEVfRU5ELmxlbmd0aCAtIDEpID09PSAnLSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVzaFRva2VuKHRvayk7XG4gICAgICB0aGlzLmZhaWwoJ2V4cGVjdGVkIHZhcmlhYmxlIGVuZCcpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucGFyc2VGb3IgPSBmdW5jdGlvbiBwYXJzZUZvcigpIHtcbiAgICB2YXIgZm9yVG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcbiAgICB2YXIgbm9kZTtcbiAgICB2YXIgZW5kQmxvY2s7XG5cbiAgICBpZiAodGhpcy5za2lwU3ltYm9sKCdmb3InKSkge1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Gb3IoZm9yVG9rLmxpbmVubywgZm9yVG9rLmNvbG5vKTtcbiAgICAgIGVuZEJsb2NrID0gJ2VuZGZvcic7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNraXBTeW1ib2woJ2FzeW5jRWFjaCcpKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkFzeW5jRWFjaChmb3JUb2subGluZW5vLCBmb3JUb2suY29sbm8pO1xuICAgICAgZW5kQmxvY2sgPSAnZW5kZWFjaCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNraXBTeW1ib2woJ2FzeW5jQWxsJykpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuQXN5bmNBbGwoZm9yVG9rLmxpbmVubywgZm9yVG9rLmNvbG5vKTtcbiAgICAgIGVuZEJsb2NrID0gJ2VuZGFsbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VGb3I6IGV4cGVjdGVkIGZvcntBc3luY30nLCBmb3JUb2subGluZW5vLCBmb3JUb2suY29sbm8pO1xuICAgIH1cblxuICAgIG5vZGUubmFtZSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG5cbiAgICBpZiAoIShub2RlLm5hbWUgaW5zdGFuY2VvZiBub2Rlcy5TeW1ib2wpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlRm9yOiB2YXJpYWJsZSBuYW1lIGV4cGVjdGVkIGZvciBsb29wJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSB0aGlzLnBlZWtUb2tlbigpLnR5cGU7XG5cbiAgICBpZiAodHlwZSA9PT0gbGV4ZXIuVE9LRU5fQ09NTUEpIHtcbiAgICAgIC8vIGtleS92YWx1ZSBpdGVyYXRpb25cbiAgICAgIHZhciBrZXkgPSBub2RlLm5hbWU7XG4gICAgICBub2RlLm5hbWUgPSBuZXcgbm9kZXMuQXJyYXkoa2V5LmxpbmVubywga2V5LmNvbG5vKTtcbiAgICAgIG5vZGUubmFtZS5hZGRDaGlsZChrZXkpO1xuXG4gICAgICB3aGlsZSAodGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTU1BKSkge1xuICAgICAgICB2YXIgcHJpbSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG4gICAgICAgIG5vZGUubmFtZS5hZGRDaGlsZChwcmltKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnaW4nKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUZvcjogZXhwZWN0ZWQgXCJpblwiIGtleXdvcmQgZm9yIGxvb3AnLCBmb3JUb2subGluZW5vLCBmb3JUb2suY29sbm8pO1xuICAgIH1cblxuICAgIG5vZGUuYXJyID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKGZvclRvay52YWx1ZSk7XG4gICAgbm9kZS5ib2R5ID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKGVuZEJsb2NrLCAnZWxzZScpO1xuXG4gICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnZWxzZScpKSB7XG4gICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCdlbHNlJyk7XG4gICAgICBub2RlLmVsc2VfID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKGVuZEJsb2NrKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlTWFjcm8gPSBmdW5jdGlvbiBwYXJzZU1hY3JvKCkge1xuICAgIHZhciBtYWNyb1RvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnbWFjcm8nKSkge1xuICAgICAgdGhpcy5mYWlsKCdleHBlY3RlZCBtYWNybycpO1xuICAgIH1cblxuICAgIHZhciBuYW1lID0gdGhpcy5wYXJzZVByaW1hcnkodHJ1ZSk7XG4gICAgdmFyIGFyZ3MgPSB0aGlzLnBhcnNlU2lnbmF0dXJlKCk7XG4gICAgdmFyIG5vZGUgPSBuZXcgbm9kZXMuTWFjcm8obWFjcm9Ub2subGluZW5vLCBtYWNyb1Rvay5jb2xubywgbmFtZSwgYXJncyk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChtYWNyb1Rvay52YWx1ZSk7XG4gICAgbm9kZS5ib2R5ID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRtYWNybycpO1xuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VDYWxsID0gZnVuY3Rpb24gcGFyc2VDYWxsKCkge1xuICAgIC8vIGEgY2FsbCBibG9jayBpcyBwYXJzZWQgYXMgYSBub3JtYWwgRnVuQ2FsbCwgYnV0IHdpdGggYW4gYWRkZWRcbiAgICAvLyAnY2FsbGVyJyBrd2FyZyB3aGljaCBpcyBhIENhbGxlciBub2RlLlxuICAgIHZhciBjYWxsVG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKCdjYWxsJykpIHtcbiAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgY2FsbCcpO1xuICAgIH1cblxuICAgIHZhciBjYWxsZXJBcmdzID0gdGhpcy5wYXJzZVNpZ25hdHVyZSh0cnVlKSB8fCBuZXcgbm9kZXMuTm9kZUxpc3QoKTtcbiAgICB2YXIgbWFjcm9DYWxsID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKGNhbGxUb2sudmFsdWUpO1xuICAgIHZhciBib2R5ID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRjYWxsJyk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgIHZhciBjYWxsZXJOYW1lID0gbmV3IG5vZGVzLlN5bWJvbChjYWxsVG9rLmxpbmVubywgY2FsbFRvay5jb2xubywgJ2NhbGxlcicpO1xuICAgIHZhciBjYWxsZXJOb2RlID0gbmV3IG5vZGVzLkNhbGxlcihjYWxsVG9rLmxpbmVubywgY2FsbFRvay5jb2xubywgY2FsbGVyTmFtZSwgY2FsbGVyQXJncywgYm9keSk7IC8vIGFkZCB0aGUgYWRkaXRpb25hbCBjYWxsZXIga3dhcmcsIGFkZGluZyBrd2FyZ3MgaWYgbmVjZXNzYXJ5XG5cbiAgICB2YXIgYXJncyA9IG1hY3JvQ2FsbC5hcmdzLmNoaWxkcmVuO1xuXG4gICAgaWYgKCEoYXJnc1thcmdzLmxlbmd0aCAtIDFdIGluc3RhbmNlb2Ygbm9kZXMuS2V5d29yZEFyZ3MpKSB7XG4gICAgICBhcmdzLnB1c2gobmV3IG5vZGVzLktleXdvcmRBcmdzKCkpO1xuICAgIH1cblxuICAgIHZhciBrd2FyZ3MgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAga3dhcmdzLmFkZENoaWxkKG5ldyBub2Rlcy5QYWlyKGNhbGxUb2subGluZW5vLCBjYWxsVG9rLmNvbG5vLCBjYWxsZXJOYW1lLCBjYWxsZXJOb2RlKSk7XG4gICAgcmV0dXJuIG5ldyBub2Rlcy5PdXRwdXQoY2FsbFRvay5saW5lbm8sIGNhbGxUb2suY29sbm8sIFttYWNyb0NhbGxdKTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VXaXRoQ29udGV4dCA9IGZ1bmN0aW9uIHBhcnNlV2l0aENvbnRleHQoKSB7XG4gICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG4gICAgdmFyIHdpdGhDb250ZXh0ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ3dpdGgnKSkge1xuICAgICAgd2l0aENvbnRleHQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5za2lwU3ltYm9sKCd3aXRob3V0JykpIHtcbiAgICAgIHdpdGhDb250ZXh0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHdpdGhDb250ZXh0ICE9PSBudWxsKSB7XG4gICAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnY29udGV4dCcpKSB7XG4gICAgICAgIHRoaXMuZmFpbCgncGFyc2VGcm9tOiBleHBlY3RlZCBjb250ZXh0IGFmdGVyIHdpdGgvd2l0aG91dCcsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpdGhDb250ZXh0O1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUltcG9ydCA9IGZ1bmN0aW9uIHBhcnNlSW1wb3J0KCkge1xuICAgIHZhciBpbXBvcnRUb2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ2ltcG9ydCcpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlSW1wb3J0OiBleHBlY3RlZCBpbXBvcnQnLCBpbXBvcnRUb2subGluZW5vLCBpbXBvcnRUb2suY29sbm8pO1xuICAgIH1cblxuICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnYXMnKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUltcG9ydDogZXhwZWN0ZWQgXCJhc1wiIGtleXdvcmQnLCBpbXBvcnRUb2subGluZW5vLCBpbXBvcnRUb2suY29sbm8pO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgIHZhciB3aXRoQ29udGV4dCA9IHRoaXMucGFyc2VXaXRoQ29udGV4dCgpO1xuICAgIHZhciBub2RlID0gbmV3IG5vZGVzLkltcG9ydChpbXBvcnRUb2subGluZW5vLCBpbXBvcnRUb2suY29sbm8sIHRlbXBsYXRlLCB0YXJnZXQsIHdpdGhDb250ZXh0KTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKGltcG9ydFRvay52YWx1ZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRnJvbSA9IGZ1bmN0aW9uIHBhcnNlRnJvbSgpIHtcbiAgICB2YXIgZnJvbVRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnZnJvbScpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlRnJvbTogZXhwZWN0ZWQgZnJvbScpO1xuICAgIH1cblxuICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnaW1wb3J0JykpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VGcm9tOiBleHBlY3RlZCBpbXBvcnQnLCBmcm9tVG9rLmxpbmVubywgZnJvbVRvay5jb2xubyk7XG4gICAgfVxuXG4gICAgdmFyIG5hbWVzID0gbmV3IG5vZGVzLk5vZGVMaXN0KCk7XG4gICAgdmFyIHdpdGhDb250ZXh0O1xuXG4gICAgd2hpbGUgKDEpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB2YXIgbmV4dFRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICAgIGlmIChuZXh0VG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0JMT0NLX0VORCkge1xuICAgICAgICBpZiAoIW5hbWVzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuZmFpbCgncGFyc2VGcm9tOiBFeHBlY3RlZCBhdCBsZWFzdCBvbmUgaW1wb3J0IG5hbWUnLCBmcm9tVG9rLmxpbmVubywgZnJvbVRvay5jb2xubyk7XG4gICAgICAgIH0gLy8gU2luY2Ugd2UgYXJlIG1hbnVhbGx5IGFkdmFuY2luZyBwYXN0IHRoZSBibG9jayBlbmQsXG4gICAgICAgIC8vIG5lZWQgdG8ga2VlcCB0cmFjayBvZiB3aGl0ZXNwYWNlIGNvbnRyb2wgKG5vcm1hbGx5XG4gICAgICAgIC8vIHRoaXMgaXMgZG9uZSBpbiBgYWR2YW5jZUFmdGVyQmxvY2tFbmRgXG5cblxuICAgICAgICBpZiAobmV4dFRvay52YWx1ZS5jaGFyQXQoMCkgPT09ICctJykge1xuICAgICAgICAgIHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAobmFtZXMuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhdGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTU1BKSkge1xuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlRnJvbTogZXhwZWN0ZWQgY29tbWEnLCBmcm9tVG9rLmxpbmVubywgZnJvbVRvay5jb2xubyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcblxuICAgICAgaWYgKG5hbWUudmFsdWUuY2hhckF0KDApID09PSAnXycpIHtcbiAgICAgICAgdGhpcy5mYWlsKCdwYXJzZUZyb206IG5hbWVzIHN0YXJ0aW5nIHdpdGggYW4gdW5kZXJzY29yZSBjYW5ub3QgYmUgaW1wb3J0ZWQnLCBuYW1lLmxpbmVubywgbmFtZS5jb2xubyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2FzJykpIHtcbiAgICAgICAgdmFyIGFsaWFzID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcbiAgICAgICAgbmFtZXMuYWRkQ2hpbGQobmV3IG5vZGVzLlBhaXIobmFtZS5saW5lbm8sIG5hbWUuY29sbm8sIG5hbWUsIGFsaWFzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYW1lcy5hZGRDaGlsZChuYW1lKTtcbiAgICAgIH1cblxuICAgICAgd2l0aENvbnRleHQgPSB0aGlzLnBhcnNlV2l0aENvbnRleHQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IG5vZGVzLkZyb21JbXBvcnQoZnJvbVRvay5saW5lbm8sIGZyb21Ub2suY29sbm8sIHRlbXBsYXRlLCBuYW1lcywgd2l0aENvbnRleHQpO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUJsb2NrID0gZnVuY3Rpb24gcGFyc2VCbG9jaygpIHtcbiAgICB2YXIgdGFnID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKCdibG9jaycpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlQmxvY2s6IGV4cGVjdGVkIGJsb2NrJywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBub2Rlcy5CbG9jayh0YWcubGluZW5vLCB0YWcuY29sbm8pO1xuICAgIG5vZGUubmFtZSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG5cbiAgICBpZiAoIShub2RlLm5hbWUgaW5zdGFuY2VvZiBub2Rlcy5TeW1ib2wpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlQmxvY2s6IHZhcmlhYmxlIG5hbWUgZXhwZWN0ZWQnLCB0YWcubGluZW5vLCB0YWcuY29sbm8pO1xuICAgIH1cblxuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodGFnLnZhbHVlKTtcbiAgICBub2RlLmJvZHkgPSB0aGlzLnBhcnNlVW50aWxCbG9ja3MoJ2VuZGJsb2NrJyk7XG4gICAgdGhpcy5za2lwU3ltYm9sKCdlbmRibG9jaycpO1xuICAgIHRoaXMuc2tpcFN5bWJvbChub2RlLm5hbWUudmFsdWUpO1xuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0b2spIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VCbG9jazogZXhwZWN0ZWQgZW5kYmxvY2ssIGdvdCBlbmQgb2YgZmlsZScpO1xuICAgIH1cblxuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodG9rLnZhbHVlKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VFeHRlbmRzID0gZnVuY3Rpb24gcGFyc2VFeHRlbmRzKCkge1xuICAgIHZhciB0YWdOYW1lID0gJ2V4dGVuZHMnO1xuICAgIHZhciB0YWcgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2wodGFnTmFtZSkpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VUZW1wbGF0ZVJlZjogZXhwZWN0ZWQgJyArIHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHZhciBub2RlID0gbmV3IG5vZGVzLkV4dGVuZHModGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICBub2RlLnRlbXBsYXRlID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKHRhZy52YWx1ZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlSW5jbHVkZSA9IGZ1bmN0aW9uIHBhcnNlSW5jbHVkZSgpIHtcbiAgICB2YXIgdGFnTmFtZSA9ICdpbmNsdWRlJztcbiAgICB2YXIgdGFnID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKHRhZ05hbWUpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlSW5jbHVkZTogZXhwZWN0ZWQgJyArIHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHZhciBub2RlID0gbmV3IG5vZGVzLkluY2x1ZGUodGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICBub2RlLnRlbXBsYXRlID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblxuICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2lnbm9yZScpICYmIHRoaXMuc2tpcFN5bWJvbCgnbWlzc2luZycpKSB7XG4gICAgICBub2RlLmlnbm9yZU1pc3NpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodGFnLnZhbHVlKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VJZiA9IGZ1bmN0aW9uIHBhcnNlSWYoKSB7XG4gICAgdmFyIHRhZyA9IHRoaXMucGVla1Rva2VuKCk7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBpZiAodGhpcy5za2lwU3ltYm9sKCdpZicpIHx8IHRoaXMuc2tpcFN5bWJvbCgnZWxpZicpIHx8IHRoaXMuc2tpcFN5bWJvbCgnZWxzZWlmJykpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuSWYodGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2tpcFN5bWJvbCgnaWZBc3luYycpKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLklmQXN5bmModGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUlmOiBleHBlY3RlZCBpZiwgZWxpZiwgb3IgZWxzZWlmJywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9XG5cbiAgICBub2RlLmNvbmQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodGFnLnZhbHVlKTtcbiAgICBub2RlLmJvZHkgPSB0aGlzLnBhcnNlVW50aWxCbG9ja3MoJ2VsaWYnLCAnZWxzZWlmJywgJ2Vsc2UnLCAnZW5kaWYnKTtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIHN3aXRjaCAodG9rICYmIHRvay52YWx1ZSkge1xuICAgICAgY2FzZSAnZWxzZWlmJzpcbiAgICAgIGNhc2UgJ2VsaWYnOlxuICAgICAgICBub2RlLmVsc2VfID0gdGhpcy5wYXJzZUlmKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdlbHNlJzpcbiAgICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgICAgICBub2RlLmVsc2VfID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRpZicpO1xuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdlbmRpZic6XG4gICAgICAgIG5vZGUuZWxzZV8gPSBudWxsO1xuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlSWY6IGV4cGVjdGVkIGVsaWYsIGVsc2UsIG9yIGVuZGlmLCBnb3QgZW5kIG9mIGZpbGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VTZXQgPSBmdW5jdGlvbiBwYXJzZVNldCgpIHtcbiAgICB2YXIgdGFnID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKCdzZXQnKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZVNldDogZXhwZWN0ZWQgc2V0JywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBub2Rlcy5TZXQodGFnLmxpbmVubywgdGFnLmNvbG5vLCBbXSk7XG4gICAgdmFyIHRhcmdldDtcblxuICAgIHdoaWxlICh0YXJnZXQgPSB0aGlzLnBhcnNlUHJpbWFyeSgpKSB7XG4gICAgICBub2RlLnRhcmdldHMucHVzaCh0YXJnZXQpO1xuXG4gICAgICBpZiAoIXRoaXMuc2tpcChsZXhlci5UT0tFTl9DT01NQSkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJz0nKSkge1xuICAgICAgaWYgKCF0aGlzLnNraXAobGV4ZXIuVE9LRU5fQkxPQ0tfRU5EKSkge1xuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlU2V0OiBleHBlY3RlZCA9IG9yIGJsb2NrIGVuZCBpbiBzZXQgdGFnJywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuYm9keSA9IG5ldyBub2Rlcy5DYXB0dXJlKHRhZy5saW5lbm8sIHRhZy5jb2xubywgdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRzZXQnKSk7XG4gICAgICAgIG5vZGUudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUudmFsdWUgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCh0YWcudmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVN3aXRjaCA9IGZ1bmN0aW9uIHBhcnNlU3dpdGNoKCkge1xuICAgIC8qXG4gICAgICogU3RvcmUgdGhlIHRhZyBuYW1lcyBpbiB2YXJpYWJsZXMgaW4gY2FzZSBzb21lb25lIGV2ZXIgd2FudHMgdG9cbiAgICAgKiBjdXN0b21pemUgdGhpcy5cbiAgICAgKi9cbiAgICB2YXIgc3dpdGNoU3RhcnQgPSAnc3dpdGNoJztcbiAgICB2YXIgc3dpdGNoRW5kID0gJ2VuZHN3aXRjaCc7XG4gICAgdmFyIGNhc2VTdGFydCA9ICdjYXNlJztcbiAgICB2YXIgY2FzZURlZmF1bHQgPSAnZGVmYXVsdCc7IC8vIEdldCB0aGUgc3dpdGNoIHRhZy5cblxuICAgIHZhciB0YWcgPSB0aGlzLnBlZWtUb2tlbigpOyAvLyBmYWlsIGVhcmx5IGlmIHdlIGdldCBzb21lIHVuZXhwZWN0ZWQgdGFnLlxuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woc3dpdGNoU3RhcnQpICYmICF0aGlzLnNraXBTeW1ib2woY2FzZVN0YXJ0KSAmJiAhdGhpcy5za2lwU3ltYm9sKGNhc2VEZWZhdWx0KSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZVN3aXRjaDogZXhwZWN0ZWQgXCJzd2l0Y2gsXCIgXCJjYXNlXCIgb3IgXCJkZWZhdWx0XCInLCB0YWcubGluZW5vLCB0YWcuY29sbm8pO1xuICAgIH0gLy8gcGFyc2UgdGhlIHN3aXRjaCBleHByZXNzaW9uXG5cblxuICAgIHZhciBleHByID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTsgLy8gYWR2YW5jZSB1bnRpbCBhIHN0YXJ0IG9mIGEgY2FzZSwgYSBkZWZhdWx0IGNhc2Ugb3IgYW4gZW5kc3dpdGNoLlxuXG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChzd2l0Y2hTdGFydCk7XG4gICAgdGhpcy5wYXJzZVVudGlsQmxvY2tzKGNhc2VTdGFydCwgY2FzZURlZmF1bHQsIHN3aXRjaEVuZCk7IC8vIHRoaXMgaXMgdGhlIGZpcnN0IGNhc2UuIGl0IGNvdWxkIGFsc28gYmUgYW4gZW5kc3dpdGNoLCB3ZSdsbCBjaGVjay5cblxuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpOyAvLyBjcmVhdGUgbmV3IHZhcmlhYmxlcyBmb3Igb3VyIGNhc2VzIGFuZCBkZWZhdWx0IGNhc2UuXG5cbiAgICB2YXIgY2FzZXMgPSBbXTtcbiAgICB2YXIgZGVmYXVsdENhc2U7IC8vIHdoaWxlIHdlJ3JlIGRlYWxpbmcgd2l0aCBuZXcgY2FzZXMgbm9kZXMuLi5cblxuICAgIGRvIHtcbiAgICAgIC8vIHNraXAgdGhlIHN0YXJ0IHN5bWJvbCBhbmQgZ2V0IHRoZSBjYXNlIGV4cHJlc3Npb25cbiAgICAgIHRoaXMuc2tpcFN5bWJvbChjYXNlU3RhcnQpO1xuICAgICAgdmFyIGNvbmQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChzd2l0Y2hTdGFydCk7IC8vIGdldCB0aGUgYm9keSBvZiB0aGUgY2FzZSBub2RlIGFuZCBhZGQgaXQgdG8gdGhlIGFycmF5IG9mIGNhc2VzLlxuXG4gICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VVbnRpbEJsb2NrcyhjYXNlU3RhcnQsIGNhc2VEZWZhdWx0LCBzd2l0Y2hFbmQpO1xuICAgICAgY2FzZXMucHVzaChuZXcgbm9kZXMuQ2FzZSh0b2subGluZSwgdG9rLmNvbCwgY29uZCwgYm9keSkpOyAvLyBnZXQgb3VyIG5leHQgY2FzZVxuXG4gICAgICB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuICAgIH0gd2hpbGUgKHRvayAmJiB0b2sudmFsdWUgPT09IGNhc2VTdGFydCk7IC8vIHdlIGVpdGhlciBoYXZlIGEgZGVmYXVsdCBjYXNlIG9yIGEgc3dpdGNoIGVuZC5cblxuXG4gICAgc3dpdGNoICh0b2sudmFsdWUpIHtcbiAgICAgIGNhc2UgY2FzZURlZmF1bHQ6XG4gICAgICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICAgICAgZGVmYXVsdENhc2UgPSB0aGlzLnBhcnNlVW50aWxCbG9ja3Moc3dpdGNoRW5kKTtcbiAgICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBzd2l0Y2hFbmQ6XG4gICAgICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIG90aGVyd2lzZSBiYWlsIGJlY2F1c2UgRU9GXG4gICAgICAgIHRoaXMuZmFpbCgncGFyc2VTd2l0Y2g6IGV4cGVjdGVkIFwiY2FzZSxcIiBcImRlZmF1bHRcIiBvciBcImVuZHN3aXRjaCxcIiBnb3QgRU9GLicpO1xuICAgIH0gLy8gYW5kIHJldHVybiB0aGUgc3dpdGNoIG5vZGUuXG5cblxuICAgIHJldHVybiBuZXcgbm9kZXMuU3dpdGNoKHRhZy5saW5lbm8sIHRhZy5jb2xubywgZXhwciwgY2FzZXMsIGRlZmF1bHRDYXNlKTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VTdGF0ZW1lbnQgPSBmdW5jdGlvbiBwYXJzZVN0YXRlbWVudCgpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcbiAgICB2YXIgbm9kZTtcblxuICAgIGlmICh0b2sudHlwZSAhPT0gbGV4ZXIuVE9LRU5fU1lNQk9MKSB7XG4gICAgICB0aGlzLmZhaWwoJ3RhZyBuYW1lIGV4cGVjdGVkJywgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5icmVha09uQmxvY2tzICYmIGxpYi5pbmRleE9mKHRoaXMuYnJlYWtPbkJsb2NrcywgdG9rLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHN3aXRjaCAodG9rLnZhbHVlKSB7XG4gICAgICBjYXNlICdyYXcnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVJhdygpO1xuXG4gICAgICBjYXNlICd2ZXJiYXRpbSc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlUmF3KCd2ZXJiYXRpbScpO1xuXG4gICAgICBjYXNlICdpZic6XG4gICAgICBjYXNlICdpZkFzeW5jJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VJZigpO1xuXG4gICAgICBjYXNlICdmb3InOlxuICAgICAgY2FzZSAnYXN5bmNFYWNoJzpcbiAgICAgIGNhc2UgJ2FzeW5jQWxsJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VGb3IoKTtcblxuICAgICAgY2FzZSAnYmxvY2snOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUJsb2NrKCk7XG5cbiAgICAgIGNhc2UgJ2V4dGVuZHMnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUV4dGVuZHMoKTtcblxuICAgICAgY2FzZSAnaW5jbHVkZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlSW5jbHVkZSgpO1xuXG4gICAgICBjYXNlICdzZXQnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVNldCgpO1xuXG4gICAgICBjYXNlICdtYWNybyc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlTWFjcm8oKTtcblxuICAgICAgY2FzZSAnY2FsbCc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlQ2FsbCgpO1xuXG4gICAgICBjYXNlICdpbXBvcnQnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUltcG9ydCgpO1xuXG4gICAgICBjYXNlICdmcm9tJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VGcm9tKCk7XG5cbiAgICAgIGNhc2UgJ2ZpbHRlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlRmlsdGVyU3RhdGVtZW50KCk7XG5cbiAgICAgIGNhc2UgJ3N3aXRjaCc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlU3dpdGNoKCk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICh0aGlzLmV4dGVuc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV4dGVuc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBleHQgPSB0aGlzLmV4dGVuc2lvbnNbaV07XG5cbiAgICAgICAgICAgIGlmIChsaWIuaW5kZXhPZihleHQudGFncyB8fCBbXSwgdG9rLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV4dC5wYXJzZSh0aGlzLCBub2RlcywgbGV4ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmFpbCgndW5rbm93biBibG9jayB0YWc6ICcgKyB0b2sudmFsdWUsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlUmF3ID0gZnVuY3Rpb24gcGFyc2VSYXcodGFnTmFtZSkge1xuICAgIHRhZ05hbWUgPSB0YWdOYW1lIHx8ICdyYXcnO1xuICAgIHZhciBlbmRUYWdOYW1lID0gJ2VuZCcgKyB0YWdOYW1lOyAvLyBMb29rIGZvciB1cGNvbWluZyByYXcgYmxvY2tzIChpZ25vcmUgYWxsIG90aGVyIGtpbmRzIG9mIGJsb2NrcylcblxuICAgIHZhciByYXdCbG9ja1JlZ2V4ID0gbmV3IFJlZ0V4cCgnKFtcXFxcc1xcXFxTXSo/KXslXFxcXHMqKCcgKyB0YWdOYW1lICsgJ3wnICsgZW5kVGFnTmFtZSArICcpXFxcXHMqKD89JX0pJX0nKTtcbiAgICB2YXIgcmF3TGV2ZWwgPSAxO1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgbWF0Y2hlcyA9IG51bGw7IC8vIFNraXAgb3BlbmluZyByYXcgdG9rZW5cbiAgICAvLyBLZWVwIHRoaXMgdG9rZW4gdG8gdHJhY2sgbGluZSBhbmQgY29sdW1uIG51bWJlcnNcblxuICAgIHZhciBiZWd1biA9IHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTsgLy8gRXhpdCB3aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBtYXRjaFxuICAgIC8vIG9yIHdoZW4gd2UndmUgZm91bmQgdGhlIG1hdGNoaW5nIFwiZW5kcmF3XCIgYmxvY2tcblxuICAgIHdoaWxlICgobWF0Y2hlcyA9IHRoaXMudG9rZW5zLl9leHRyYWN0UmVnZXgocmF3QmxvY2tSZWdleCkpICYmIHJhd0xldmVsID4gMCkge1xuICAgICAgdmFyIGFsbCA9IG1hdGNoZXNbMF07XG4gICAgICB2YXIgcHJlID0gbWF0Y2hlc1sxXTtcbiAgICAgIHZhciBibG9ja05hbWUgPSBtYXRjaGVzWzJdOyAvLyBBZGp1c3QgcmF3bGV2ZWxcblxuICAgICAgaWYgKGJsb2NrTmFtZSA9PT0gdGFnTmFtZSkge1xuICAgICAgICByYXdMZXZlbCArPSAxO1xuICAgICAgfSBlbHNlIGlmIChibG9ja05hbWUgPT09IGVuZFRhZ05hbWUpIHtcbiAgICAgICAgcmF3TGV2ZWwgLT0gMTtcbiAgICAgIH0gLy8gQWRkIHRvIHN0clxuXG5cbiAgICAgIGlmIChyYXdMZXZlbCA9PT0gMCkge1xuICAgICAgICAvLyBXZSB3YW50IHRvIGV4Y2x1ZGUgdGhlIGxhc3QgXCJlbmRyYXdcIlxuICAgICAgICBzdHIgKz0gcHJlOyAvLyBNb3ZlIHRva2VuaXplciB0byBiZWdpbm5pbmcgb2YgZW5kcmF3IGJsb2NrXG5cbiAgICAgICAgdGhpcy50b2tlbnMuYmFja04oYWxsLmxlbmd0aCAtIHByZS5sZW5ndGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyICs9IGFsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IG5vZGVzLk91dHB1dChiZWd1bi5saW5lbm8sIGJlZ3VuLmNvbG5vLCBbbmV3IG5vZGVzLlRlbXBsYXRlRGF0YShiZWd1bi5saW5lbm8sIGJlZ3VuLmNvbG5vLCBzdHIpXSk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlUG9zdGZpeCA9IGZ1bmN0aW9uIHBhcnNlUG9zdGZpeChub2RlKSB7XG4gICAgdmFyIGxvb2t1cDtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIHdoaWxlICh0b2spIHtcbiAgICAgIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fTEVGVF9QQVJFTikge1xuICAgICAgICAvLyBGdW5jdGlvbiBjYWxsXG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuRnVuQ2FsbCh0b2subGluZW5vLCB0b2suY29sbm8sIG5vZGUsIHRoaXMucGFyc2VTaWduYXR1cmUoKSk7XG4gICAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9MRUZUX0JSQUNLRVQpIHtcbiAgICAgICAgLy8gUmVmZXJlbmNlXG4gICAgICAgIGxvb2t1cCA9IHRoaXMucGFyc2VBZ2dyZWdhdGUoKTtcblxuICAgICAgICBpZiAobG9va3VwLmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aGlzLmZhaWwoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuTG9va3VwVmFsKHRvay5saW5lbm8sIHRvay5jb2xubywgbm9kZSwgbG9va3VwLmNoaWxkcmVuWzBdKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX09QRVJBVE9SICYmIHRvay52YWx1ZSA9PT0gJy4nKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZVxuICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuICAgICAgICB2YXIgdmFsID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgICAgICBpZiAodmFsLnR5cGUgIT09IGxleGVyLlRPS0VOX1NZTUJPTCkge1xuICAgICAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgbmFtZSBhcyBsb29rdXAgdmFsdWUsIGdvdCAnICsgdmFsLnZhbHVlLCB2YWwubGluZW5vLCB2YWwuY29sbm8pO1xuICAgICAgICB9IC8vIE1ha2UgYSBsaXRlcmFsIHN0cmluZyBiZWNhdXNlIGl0J3Mgbm90IGEgdmFyaWFibGVcbiAgICAgICAgLy8gcmVmZXJlbmNlXG5cblxuICAgICAgICBsb29rdXAgPSBuZXcgbm9kZXMuTGl0ZXJhbCh2YWwubGluZW5vLCB2YWwuY29sbm8sIHZhbC52YWx1ZSk7XG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuTG9va3VwVmFsKHRvay5saW5lbm8sIHRvay5jb2xubywgbm9kZSwgbG9va3VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUV4cHJlc3Npb24gPSBmdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlSW5saW5lSWYoKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VJbmxpbmVJZiA9IGZ1bmN0aW9uIHBhcnNlSW5saW5lSWYoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlT3IoKTtcblxuICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2lmJykpIHtcbiAgICAgIHZhciBjb25kTm9kZSA9IHRoaXMucGFyc2VPcigpO1xuICAgICAgdmFyIGJvZHlOb2RlID0gbm9kZTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuSW5saW5lSWYobm9kZS5saW5lbm8sIG5vZGUuY29sbm8pO1xuICAgICAgbm9kZS5ib2R5ID0gYm9keU5vZGU7XG4gICAgICBub2RlLmNvbmQgPSBjb25kTm9kZTtcblxuICAgICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnZWxzZScpKSB7XG4gICAgICAgIG5vZGUuZWxzZV8gPSB0aGlzLnBhcnNlT3IoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuZWxzZV8gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZU9yID0gZnVuY3Rpb24gcGFyc2VPcigpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VBbmQoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBTeW1ib2woJ29yJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VBbmQoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuT3Iobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VBbmQgPSBmdW5jdGlvbiBwYXJzZUFuZCgpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VOb3QoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBTeW1ib2woJ2FuZCcpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlTm90KCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkFuZChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZU5vdCA9IGZ1bmN0aW9uIHBhcnNlTm90KCkge1xuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnbm90JykpIHtcbiAgICAgIHJldHVybiBuZXcgbm9kZXMuTm90KHRvay5saW5lbm8sIHRvay5jb2xubywgdGhpcy5wYXJzZU5vdCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYXJzZUluKCk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlSW4gPSBmdW5jdGlvbiBwYXJzZUluKCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZUlzKCk7XG5cbiAgICB3aGlsZSAoMSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBuZXh0IHRva2VuIGlzICdub3QnXG4gICAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgICAgaWYgKCF0b2spIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbnZlcnQgPSB0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fU1lNQk9MICYmIHRvay52YWx1ZSA9PT0gJ25vdCc7IC8vIGlmIGl0IHdhc24ndCAnbm90JywgcHV0IGl0IGJhY2tcblxuICAgICAgaWYgKCFpbnZlcnQpIHtcbiAgICAgICAgdGhpcy5wdXNoVG9rZW4odG9rKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnaW4nKSkge1xuICAgICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlSXMoKTtcbiAgICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Jbihub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuXG4gICAgICAgIGlmIChpbnZlcnQpIHtcbiAgICAgICAgICBub2RlID0gbmV3IG5vZGVzLk5vdChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHdlJ2QgZm91bmQgYSAnbm90JyBidXQgdGhpcyB3YXNuJ3QgYW4gJ2luJywgcHV0IGJhY2sgdGhlICdub3QnXG4gICAgICAgIGlmIChpbnZlcnQpIHtcbiAgICAgICAgICB0aGlzLnB1c2hUb2tlbih0b2spO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07IC8vIEkgcHV0IHRoaXMgcmlnaHQgYWZ0ZXIgXCJpblwiIGluIHRoZSBvcGVyYXRvciBwcmVjZWRlbmNlIHN0YWNrLiBUaGF0IGNhblxuICAvLyBvYnZpb3VzbHkgYmUgY2hhbmdlZCB0byBiZSBjbG9zZXIgdG8gSmluamEuXG5cblxuICBfcHJvdG8ucGFyc2VJcyA9IGZ1bmN0aW9uIHBhcnNlSXMoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlQ29tcGFyZSgpOyAvLyBsb29rIGZvciBhbiBpc1xuXG4gICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnaXMnKSkge1xuICAgICAgLy8gbG9vayBmb3IgYSBub3RcbiAgICAgIHZhciBub3QgPSB0aGlzLnNraXBTeW1ib2woJ25vdCcpOyAvLyBnZXQgdGhlIG5leHQgbm9kZVxuXG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlQ29tcGFyZSgpOyAvLyBjcmVhdGUgYW4gSXMgbm9kZSB1c2luZyB0aGUgbmV4dCBub2RlIGFuZCB0aGUgaW5mbyBmcm9tIG91ciBJcyBub2RlLlxuXG4gICAgICBub2RlID0gbmV3IG5vZGVzLklzKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7IC8vIGlmIHdlIGhhdmUgYSBOb3QsIGNyZWF0ZSBhIE5vdCBub2RlIGZyb20gb3VyIElzIG5vZGUuXG5cbiAgICAgIGlmIChub3QpIHtcbiAgICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Ob3Qobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUpO1xuICAgICAgfVxuICAgIH0gLy8gcmV0dXJuIHRoZSBub2RlLlxuXG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VDb21wYXJlID0gZnVuY3Rpb24gcGFyc2VDb21wYXJlKCkge1xuICAgIHZhciBjb21wYXJlT3BzID0gWyc9PScsICc9PT0nLCAnIT0nLCAnIT09JywgJzwnLCAnPicsICc8PScsICc+PSddO1xuICAgIHZhciBleHByID0gdGhpcy5wYXJzZUNvbmNhdCgpO1xuICAgIHZhciBvcHMgPSBbXTtcblxuICAgIHdoaWxlICgxKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgdmFyIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG5cbiAgICAgIGlmICghdG9rKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChjb21wYXJlT3BzLmluZGV4T2YodG9rLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgb3BzLnB1c2gobmV3IG5vZGVzLkNvbXBhcmVPcGVyYW5kKHRvay5saW5lbm8sIHRvay5jb2xubywgdGhpcy5wYXJzZUNvbmNhdCgpLCB0b2sudmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVzaFRva2VuKHRvayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbmV3IG5vZGVzLkNvbXBhcmUob3BzWzBdLmxpbmVubywgb3BzWzBdLmNvbG5vLCBleHByLCBvcHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG4gIH07IC8vIGZpbmRzIHRoZSAnficgZm9yIHN0cmluZyBjb25jYXRlbmF0aW9uXG5cblxuICBfcHJvdG8ucGFyc2VDb25jYXQgPSBmdW5jdGlvbiBwYXJzZUNvbmNhdCgpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VBZGQoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9USUxERSwgJ34nKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZUFkZCgpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Db25jYXQobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VBZGQgPSBmdW5jdGlvbiBwYXJzZUFkZCgpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VTdWIoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJysnKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZVN1YigpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5BZGQobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VTdWIgPSBmdW5jdGlvbiBwYXJzZVN1YigpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VNdWwoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJy0nKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZU11bCgpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5TdWIobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VNdWwgPSBmdW5jdGlvbiBwYXJzZU11bCgpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VEaXYoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJyonKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZURpdigpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5NdWwobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VEaXYgPSBmdW5jdGlvbiBwYXJzZURpdigpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VGbG9vckRpdigpO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnLycpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlRmxvb3JEaXYoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuRGl2KG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRmxvb3JEaXYgPSBmdW5jdGlvbiBwYXJzZUZsb29yRGl2KCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZU1vZCgpO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnLy8nKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZU1vZCgpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5GbG9vckRpdihub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZU1vZCA9IGZ1bmN0aW9uIHBhcnNlTW9kKCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZVBvdygpO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnJScpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlUG93KCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLk1vZChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVBvdyA9IGZ1bmN0aW9uIHBhcnNlUG93KCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZVVuYXJ5KCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICcqKicpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlVW5hcnkoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuUG93KG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlVW5hcnkgPSBmdW5jdGlvbiBwYXJzZVVuYXJ5KG5vRmlsdGVycykge1xuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuICAgIHZhciBub2RlO1xuXG4gICAgaWYgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnLScpKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLk5lZyh0b2subGluZW5vLCB0b2suY29sbm8sIHRoaXMucGFyc2VVbmFyeSh0cnVlKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJysnKSkge1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Qb3ModG9rLmxpbmVubywgdG9rLmNvbG5vLCB0aGlzLnBhcnNlVW5hcnkodHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcbiAgICB9XG5cbiAgICBpZiAoIW5vRmlsdGVycykge1xuICAgICAgbm9kZSA9IHRoaXMucGFyc2VGaWx0ZXIobm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlUHJpbWFyeSA9IGZ1bmN0aW9uIHBhcnNlUHJpbWFyeShub1Bvc3RmaXgpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcbiAgICB2YXIgdmFsO1xuICAgIHZhciBub2RlID0gbnVsbDtcblxuICAgIGlmICghdG9rKSB7XG4gICAgICB0aGlzLmZhaWwoJ2V4cGVjdGVkIGV4cHJlc3Npb24sIGdvdCBlbmQgb2YgZmlsZScpO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX1NUUklORykge1xuICAgICAgdmFsID0gdG9rLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0lOVCkge1xuICAgICAgdmFsID0gcGFyc2VJbnQodG9rLnZhbHVlLCAxMCk7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fRkxPQVQpIHtcbiAgICAgIHZhbCA9IHBhcnNlRmxvYXQodG9rLnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9CT09MRUFOKSB7XG4gICAgICBpZiAodG9rLnZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgdmFsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodG9rLnZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgIHZhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mYWlsKCdpbnZhbGlkIGJvb2xlYW46ICcgKyB0b2sudmFsdWUsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fTk9ORSkge1xuICAgICAgdmFsID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9SRUdFWCkge1xuICAgICAgdmFsID0gbmV3IFJlZ0V4cCh0b2sudmFsdWUuYm9keSwgdG9rLnZhbHVlLmZsYWdzKTtcbiAgICB9XG5cbiAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuTGl0ZXJhbCh0b2subGluZW5vLCB0b2suY29sbm8sIHZhbCk7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fU1lNQk9MKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLlN5bWJvbCh0b2subGluZW5vLCB0b2suY29sbm8sIHRvay52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNlZSBpZiBpdCdzIGFuIGFnZ3JlZ2F0ZSB0eXBlLCB3ZSBuZWVkIHRvIHB1c2ggdGhlXG4gICAgICAvLyBjdXJyZW50IGRlbGltaXRlciB0b2tlbiBiYWNrIG9uXG4gICAgICB0aGlzLnB1c2hUb2tlbih0b2spO1xuICAgICAgbm9kZSA9IHRoaXMucGFyc2VBZ2dyZWdhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoIW5vUG9zdGZpeCkge1xuICAgICAgbm9kZSA9IHRoaXMucGFyc2VQb3N0Zml4KG5vZGUpO1xuICAgIH1cblxuICAgIGlmIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgdGhpcy5lcnJvcihcInVuZXhwZWN0ZWQgdG9rZW46IFwiICsgdG9rLnZhbHVlLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucGFyc2VGaWx0ZXJOYW1lID0gZnVuY3Rpb24gcGFyc2VGaWx0ZXJOYW1lKCkge1xuICAgIHZhciB0b2sgPSB0aGlzLmV4cGVjdChsZXhlci5UT0tFTl9TWU1CT0wpO1xuICAgIHZhciBuYW1lID0gdG9rLnZhbHVlO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnLicpKSB7XG4gICAgICBuYW1lICs9ICcuJyArIHRoaXMuZXhwZWN0KGxleGVyLlRPS0VOX1NZTUJPTCkudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBub2Rlcy5TeW1ib2wodG9rLmxpbmVubywgdG9rLmNvbG5vLCBuYW1lKTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VGaWx0ZXJBcmdzID0gZnVuY3Rpb24gcGFyc2VGaWx0ZXJBcmdzKG5vZGUpIHtcbiAgICBpZiAodGhpcy5wZWVrVG9rZW4oKS50eXBlID09PSBsZXhlci5UT0tFTl9MRUZUX1BBUkVOKSB7XG4gICAgICAvLyBHZXQgYSBGdW5DYWxsIG5vZGUgYW5kIGFkZCB0aGUgcGFyYW1ldGVycyB0byB0aGVcbiAgICAgIC8vIGZpbHRlclxuICAgICAgdmFyIGNhbGwgPSB0aGlzLnBhcnNlUG9zdGZpeChub2RlKTtcbiAgICAgIHJldHVybiBjYWxsLmFyZ3MuY2hpbGRyZW47XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUZpbHRlciA9IGZ1bmN0aW9uIHBhcnNlRmlsdGVyKG5vZGUpIHtcbiAgICB3aGlsZSAodGhpcy5za2lwKGxleGVyLlRPS0VOX1BJUEUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHRoaXMucGFyc2VGaWx0ZXJOYW1lKCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkZpbHRlcihuYW1lLmxpbmVubywgbmFtZS5jb2xubywgbmFtZSwgbmV3IG5vZGVzLk5vZGVMaXN0KG5hbWUubGluZW5vLCBuYW1lLmNvbG5vLCBbbm9kZV0uY29uY2F0KHRoaXMucGFyc2VGaWx0ZXJBcmdzKG5vZGUpKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUZpbHRlclN0YXRlbWVudCA9IGZ1bmN0aW9uIHBhcnNlRmlsdGVyU3RhdGVtZW50KCkge1xuICAgIHZhciBmaWx0ZXJUb2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ2ZpbHRlcicpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlRmlsdGVyU3RhdGVtZW50OiBleHBlY3RlZCBmaWx0ZXInKTtcbiAgICB9XG5cbiAgICB2YXIgbmFtZSA9IHRoaXMucGFyc2VGaWx0ZXJOYW1lKCk7XG4gICAgdmFyIGFyZ3MgPSB0aGlzLnBhcnNlRmlsdGVyQXJncyhuYW1lKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKGZpbHRlclRvay52YWx1ZSk7XG4gICAgdmFyIGJvZHkgPSBuZXcgbm9kZXMuQ2FwdHVyZShuYW1lLmxpbmVubywgbmFtZS5jb2xubywgdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRmaWx0ZXInKSk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgIHZhciBub2RlID0gbmV3IG5vZGVzLkZpbHRlcihuYW1lLmxpbmVubywgbmFtZS5jb2xubywgbmFtZSwgbmV3IG5vZGVzLk5vZGVMaXN0KG5hbWUubGluZW5vLCBuYW1lLmNvbG5vLCBbYm9keV0uY29uY2F0KGFyZ3MpKSk7XG4gICAgcmV0dXJuIG5ldyBub2Rlcy5PdXRwdXQobmFtZS5saW5lbm8sIG5hbWUuY29sbm8sIFtub2RlXSk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlQWdncmVnYXRlID0gZnVuY3Rpb24gcGFyc2VBZ2dyZWdhdGUoKSB7XG4gICAgdmFyIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICBjYXNlIGxleGVyLlRPS0VOX0xFRlRfUEFSRU46XG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuR3JvdXAodG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbGV4ZXIuVE9LRU5fTEVGVF9CUkFDS0VUOlxuICAgICAgICBub2RlID0gbmV3IG5vZGVzLkFycmF5KHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIGxleGVyLlRPS0VOX0xFRlRfQ1VSTFk6XG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuRGljdCh0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgd2hpbGUgKDEpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB2YXIgdHlwZSA9IHRoaXMucGVla1Rva2VuKCkudHlwZTtcblxuICAgICAgaWYgKHR5cGUgPT09IGxleGVyLlRPS0VOX1JJR0hUX1BBUkVOIHx8IHR5cGUgPT09IGxleGVyLlRPS0VOX1JJR0hUX0JSQUNLRVQgfHwgdHlwZSA9PT0gbGV4ZXIuVE9LRU5fUklHSFRfQ1VSTFkpIHtcbiAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLnNraXAobGV4ZXIuVE9LRU5fQ09NTUEpKSB7XG4gICAgICAgICAgdGhpcy5mYWlsKCdwYXJzZUFnZ3JlZ2F0ZTogZXhwZWN0ZWQgY29tbWEgYWZ0ZXIgZXhwcmVzc2lvbicsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5EaWN0KSB7XG4gICAgICAgIC8vIFRPRE86IGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgdmFyIGtleSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7IC8vIFdlIGV4cGVjdCBhIGtleS92YWx1ZSBwYWlyIGZvciBkaWN0cywgc2VwYXJhdGVkIGJ5IGFcbiAgICAgICAgLy8gY29sb25cblxuICAgICAgICBpZiAoIXRoaXMuc2tpcChsZXhlci5UT0tFTl9DT0xPTikpIHtcbiAgICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlQWdncmVnYXRlOiBleHBlY3RlZCBjb2xvbiBhZnRlciBkaWN0IGtleScsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICAgIH0gLy8gVE9ETzogY2hlY2sgZm9yIGVycm9yc1xuXG5cbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICAgICAgbm9kZS5hZGRDaGlsZChuZXcgbm9kZXMuUGFpcihrZXkubGluZW5vLCBrZXkuY29sbm8sIGtleSwgdmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE86IGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgdmFyIGV4cHIgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgICBub2RlLmFkZENoaWxkKGV4cHIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVNpZ25hdHVyZSA9IGZ1bmN0aW9uIHBhcnNlU2lnbmF0dXJlKHRvbGVyYW50LCBub1BhcmVucykge1xuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCFub1BhcmVucyAmJiB0b2sudHlwZSAhPT0gbGV4ZXIuVE9LRU5fTEVGVF9QQVJFTikge1xuICAgICAgaWYgKHRvbGVyYW50KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mYWlsKCdleHBlY3RlZCBhcmd1bWVudHMnLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fTEVGVF9QQVJFTikge1xuICAgICAgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcbiAgICB9XG5cbiAgICB2YXIgYXJncyA9IG5ldyBub2Rlcy5Ob2RlTGlzdCh0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgIHZhciBrd2FyZ3MgPSBuZXcgbm9kZXMuS2V5d29yZEFyZ3ModG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICB2YXIgY2hlY2tDb21tYSA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKDEpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgICBpZiAoIW5vUGFyZW5zICYmIHRvay50eXBlID09PSBsZXhlci5UT0tFTl9SSUdIVF9QQVJFTikge1xuICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAobm9QYXJlbnMgJiYgdG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0JMT0NLX0VORCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGNoZWNrQ29tbWEgJiYgIXRoaXMuc2tpcChsZXhlci5UT0tFTl9DT01NQSkpIHtcbiAgICAgICAgdGhpcy5mYWlsKCdwYXJzZVNpZ25hdHVyZTogZXhwZWN0ZWQgY29tbWEgYWZ0ZXIgZXhwcmVzc2lvbicsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYXJnID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblxuICAgICAgICBpZiAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICc9JykpIHtcbiAgICAgICAgICBrd2FyZ3MuYWRkQ2hpbGQobmV3IG5vZGVzLlBhaXIoYXJnLmxpbmVubywgYXJnLmNvbG5vLCBhcmcsIHRoaXMucGFyc2VFeHByZXNzaW9uKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcmdzLmFkZENoaWxkKGFyZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hlY2tDb21tYSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGt3YXJncy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIGFyZ3MuYWRkQ2hpbGQoa3dhcmdzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJncztcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VVbnRpbEJsb2NrcyA9IGZ1bmN0aW9uIHBhcnNlVW50aWxCbG9ja3MoKSB7XG4gICAgdmFyIHByZXYgPSB0aGlzLmJyZWFrT25CbG9ja3M7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYmxvY2tOYW1lcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGJsb2NrTmFtZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdGhpcy5icmVha09uQmxvY2tzID0gYmxvY2tOYW1lcztcbiAgICB2YXIgcmV0ID0gdGhpcy5wYXJzZSgpO1xuICAgIHRoaXMuYnJlYWtPbkJsb2NrcyA9IHByZXY7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VOb2RlcyA9IGZ1bmN0aW9uIHBhcnNlTm9kZXMoKSB7XG4gICAgdmFyIHRvaztcbiAgICB2YXIgYnVmID0gW107XG5cbiAgICB3aGlsZSAodG9rID0gdGhpcy5uZXh0VG9rZW4oKSkge1xuICAgICAgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9EQVRBKSB7XG4gICAgICAgIHZhciBkYXRhID0gdG9rLnZhbHVlO1xuICAgICAgICB2YXIgbmV4dFRva2VuID0gdGhpcy5wZWVrVG9rZW4oKTtcbiAgICAgICAgdmFyIG5leHRWYWwgPSBuZXh0VG9rZW4gJiYgbmV4dFRva2VuLnZhbHVlOyAvLyBJZiB0aGUgbGFzdCB0b2tlbiBoYXMgXCItXCIgd2UgbmVlZCB0byB0cmltIHRoZVxuICAgICAgICAvLyBsZWFkaW5nIHdoaXRlc3BhY2Ugb2YgdGhlIGRhdGEuIFRoaXMgaXMgbWFya2VkIHdpdGhcbiAgICAgICAgLy8gdGhlIGBkcm9wTGVhZGluZ1doaXRlc3BhY2VgIHZhcmlhYmxlLlxuXG4gICAgICAgIGlmICh0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSkge1xuICAgICAgICAgIC8vIFRPRE86IHRoaXMgY291bGQgYmUgb3B0aW1pemVkIChkb24ndCB1c2UgcmVnZXgpXG4gICAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXlxccyovLCAnJyk7XG4gICAgICAgICAgdGhpcy5kcm9wTGVhZGluZ1doaXRlc3BhY2UgPSBmYWxzZTtcbiAgICAgICAgfSAvLyBTYW1lIGZvciB0aGUgc3VjY2VlZGluZyBibG9jayBzdGFydCB0b2tlblxuXG5cbiAgICAgICAgaWYgKG5leHRUb2tlbiAmJiAobmV4dFRva2VuLnR5cGUgPT09IGxleGVyLlRPS0VOX0JMT0NLX1NUQVJUICYmIG5leHRWYWwuY2hhckF0KG5leHRWYWwubGVuZ3RoIC0gMSkgPT09ICctJyB8fCBuZXh0VG9rZW4udHlwZSA9PT0gbGV4ZXIuVE9LRU5fVkFSSUFCTEVfU1RBUlQgJiYgbmV4dFZhbC5jaGFyQXQodGhpcy50b2tlbnMudGFncy5WQVJJQUJMRV9TVEFSVC5sZW5ndGgpID09PSAnLScgfHwgbmV4dFRva2VuLnR5cGUgPT09IGxleGVyLlRPS0VOX0NPTU1FTlQgJiYgbmV4dFZhbC5jaGFyQXQodGhpcy50b2tlbnMudGFncy5DT01NRU5UX1NUQVJULmxlbmd0aCkgPT09ICctJykpIHtcbiAgICAgICAgICAvLyBUT0RPOiB0aGlzIGNvdWxkIGJlIG9wdGltaXplZCAoZG9uJ3QgdXNlIHJlZ2V4KVxuICAgICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL1xccyokLywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnVmLnB1c2gobmV3IG5vZGVzLk91dHB1dCh0b2subGluZW5vLCB0b2suY29sbm8sIFtuZXcgbm9kZXMuVGVtcGxhdGVEYXRhKHRvay5saW5lbm8sIHRvay5jb2xubywgZGF0YSldKSk7XG4gICAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9CTE9DS19TVEFSVCkge1xuICAgICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IGZhbHNlO1xuICAgICAgICB2YXIgbiA9IHRoaXMucGFyc2VTdGF0ZW1lbnQoKTtcblxuICAgICAgICBpZiAoIW4pIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1Zi5wdXNoKG4pO1xuICAgICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fVkFSSUFCTEVfU1RBUlQpIHtcbiAgICAgICAgdmFyIGUgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlclZhcmlhYmxlRW5kKCk7XG4gICAgICAgIGJ1Zi5wdXNoKG5ldyBub2Rlcy5PdXRwdXQodG9rLmxpbmVubywgdG9rLmNvbG5vLCBbZV0pKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0NPTU1FTlQpIHtcbiAgICAgICAgdGhpcy5kcm9wTGVhZGluZ1doaXRlc3BhY2UgPSB0b2sudmFsdWUuY2hhckF0KHRvay52YWx1ZS5sZW5ndGggLSB0aGlzLnRva2Vucy50YWdzLkNPTU1FTlRfRU5ELmxlbmd0aCAtIDEpID09PSAnLSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZ25vcmUgY29tbWVudHMsIG90aGVyd2lzZSB0aGlzIHNob3VsZCBiZSBhbiBlcnJvclxuICAgICAgICB0aGlzLmZhaWwoJ1VuZXhwZWN0ZWQgdG9rZW4gYXQgdG9wLWxldmVsOiAnICsgdG9rLnR5cGUsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSgpIHtcbiAgICByZXR1cm4gbmV3IG5vZGVzLk5vZGVMaXN0KDAsIDAsIHRoaXMucGFyc2VOb2RlcygpKTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VBc1Jvb3QgPSBmdW5jdGlvbiBwYXJzZUFzUm9vdCgpIHtcbiAgICByZXR1cm4gbmV3IG5vZGVzLlJvb3QoMCwgMCwgdGhpcy5wYXJzZU5vZGVzKCkpO1xuICB9O1xuXG4gIHJldHVybiBQYXJzZXI7XG59KE9iaik7IC8vIHZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuLy8gdmFyIGwgPSBsZXhlci5sZXgoJ3slLSBpZiB4IC0lfVxcbiBoZWxsbyB7JSBlbmRpZiAlfScpO1xuLy8gdmFyIHQ7XG4vLyB3aGlsZSgodCA9IGwubmV4dFRva2VuKCkpKSB7XG4vLyAgICAgY29uc29sZS5sb2codXRpbC5pbnNwZWN0KHQpKTtcbi8vIH1cbi8vIHZhciBwID0gbmV3IFBhcnNlcihsZXhlci5sZXgoJ2hlbGxvIHslIGZpbHRlciB0aXRsZSAlfScgK1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnSGVsbG8gbWFkYW0gaG93IGFyZSB5b3UnICtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3slIGVuZGZpbHRlciAlfScpKTtcbi8vIHZhciBuID0gcC5wYXJzZUFzUm9vdCgpO1xuLy8gbm9kZXMucHJpbnROb2RlcyhuKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKHNyYywgZXh0ZW5zaW9ucywgb3B0cykge1xuICAgIHZhciBwID0gbmV3IFBhcnNlcihsZXhlci5sZXgoc3JjLCBvcHRzKSk7XG5cbiAgICBpZiAoZXh0ZW5zaW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgIH1cblxuICAgIHJldHVybiBwLnBhcnNlQXNSb290KCk7XG4gIH0sXG4gIFBhcnNlcjogUGFyc2VyXG59O1xuXG4vKioqLyB9KSxcbi8qIDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciB3aGl0ZXNwYWNlQ2hhcnMgPSBcIiBcXG5cXHRcXHJcXHhBMFwiO1xudmFyIGRlbGltQ2hhcnMgPSAnKClbXXt9JSotK34vIyw6fC48Pj0hJztcbnZhciBpbnRDaGFycyA9ICcwMTIzNDU2Nzg5JztcbnZhciBCTE9DS19TVEFSVCA9ICd7JSc7XG52YXIgQkxPQ0tfRU5EID0gJyV9JztcbnZhciBWQVJJQUJMRV9TVEFSVCA9ICd7eyc7XG52YXIgVkFSSUFCTEVfRU5EID0gJ319JztcbnZhciBDT01NRU5UX1NUQVJUID0gJ3sjJztcbnZhciBDT01NRU5UX0VORCA9ICcjfSc7XG52YXIgVE9LRU5fU1RSSU5HID0gJ3N0cmluZyc7XG52YXIgVE9LRU5fV0hJVEVTUEFDRSA9ICd3aGl0ZXNwYWNlJztcbnZhciBUT0tFTl9EQVRBID0gJ2RhdGEnO1xudmFyIFRPS0VOX0JMT0NLX1NUQVJUID0gJ2Jsb2NrLXN0YXJ0JztcbnZhciBUT0tFTl9CTE9DS19FTkQgPSAnYmxvY2stZW5kJztcbnZhciBUT0tFTl9WQVJJQUJMRV9TVEFSVCA9ICd2YXJpYWJsZS1zdGFydCc7XG52YXIgVE9LRU5fVkFSSUFCTEVfRU5EID0gJ3ZhcmlhYmxlLWVuZCc7XG52YXIgVE9LRU5fQ09NTUVOVCA9ICdjb21tZW50JztcbnZhciBUT0tFTl9MRUZUX1BBUkVOID0gJ2xlZnQtcGFyZW4nO1xudmFyIFRPS0VOX1JJR0hUX1BBUkVOID0gJ3JpZ2h0LXBhcmVuJztcbnZhciBUT0tFTl9MRUZUX0JSQUNLRVQgPSAnbGVmdC1icmFja2V0JztcbnZhciBUT0tFTl9SSUdIVF9CUkFDS0VUID0gJ3JpZ2h0LWJyYWNrZXQnO1xudmFyIFRPS0VOX0xFRlRfQ1VSTFkgPSAnbGVmdC1jdXJseSc7XG52YXIgVE9LRU5fUklHSFRfQ1VSTFkgPSAncmlnaHQtY3VybHknO1xudmFyIFRPS0VOX09QRVJBVE9SID0gJ29wZXJhdG9yJztcbnZhciBUT0tFTl9DT01NQSA9ICdjb21tYSc7XG52YXIgVE9LRU5fQ09MT04gPSAnY29sb24nO1xudmFyIFRPS0VOX1RJTERFID0gJ3RpbGRlJztcbnZhciBUT0tFTl9QSVBFID0gJ3BpcGUnO1xudmFyIFRPS0VOX0lOVCA9ICdpbnQnO1xudmFyIFRPS0VOX0ZMT0FUID0gJ2Zsb2F0JztcbnZhciBUT0tFTl9CT09MRUFOID0gJ2Jvb2xlYW4nO1xudmFyIFRPS0VOX05PTkUgPSAnbm9uZSc7XG52YXIgVE9LRU5fU1lNQk9MID0gJ3N5bWJvbCc7XG52YXIgVE9LRU5fU1BFQ0lBTCA9ICdzcGVjaWFsJztcbnZhciBUT0tFTl9SRUdFWCA9ICdyZWdleCc7XG5cbmZ1bmN0aW9uIHRva2VuKHR5cGUsIHZhbHVlLCBsaW5lbm8sIGNvbG5vKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgbGluZW5vOiBsaW5lbm8sXG4gICAgY29sbm86IGNvbG5vXG4gIH07XG59XG5cbnZhciBUb2tlbml6ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUb2tlbml6ZXIoc3RyLCBvcHRzKSB7XG4gICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5sZW4gPSBzdHIubGVuZ3RoO1xuICAgIHRoaXMubGluZW5vID0gMDtcbiAgICB0aGlzLmNvbG5vID0gMDtcbiAgICB0aGlzLmluX2NvZGUgPSBmYWxzZTtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgdGFncyA9IG9wdHMudGFncyB8fCB7fTtcbiAgICB0aGlzLnRhZ3MgPSB7XG4gICAgICBCTE9DS19TVEFSVDogdGFncy5ibG9ja1N0YXJ0IHx8IEJMT0NLX1NUQVJULFxuICAgICAgQkxPQ0tfRU5EOiB0YWdzLmJsb2NrRW5kIHx8IEJMT0NLX0VORCxcbiAgICAgIFZBUklBQkxFX1NUQVJUOiB0YWdzLnZhcmlhYmxlU3RhcnQgfHwgVkFSSUFCTEVfU1RBUlQsXG4gICAgICBWQVJJQUJMRV9FTkQ6IHRhZ3MudmFyaWFibGVFbmQgfHwgVkFSSUFCTEVfRU5ELFxuICAgICAgQ09NTUVOVF9TVEFSVDogdGFncy5jb21tZW50U3RhcnQgfHwgQ09NTUVOVF9TVEFSVCxcbiAgICAgIENPTU1FTlRfRU5EOiB0YWdzLmNvbW1lbnRFbmQgfHwgQ09NTUVOVF9FTkRcbiAgICB9O1xuICAgIHRoaXMudHJpbUJsb2NrcyA9ICEhb3B0cy50cmltQmxvY2tzO1xuICAgIHRoaXMubHN0cmlwQmxvY2tzID0gISFvcHRzLmxzdHJpcEJsb2NrcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBUb2tlbml6ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5uZXh0VG9rZW4gPSBmdW5jdGlvbiBuZXh0VG9rZW4oKSB7XG4gICAgdmFyIGxpbmVubyA9IHRoaXMubGluZW5vO1xuICAgIHZhciBjb2xubyA9IHRoaXMuY29sbm87XG4gICAgdmFyIHRvaztcblxuICAgIGlmICh0aGlzLmluX2NvZGUpIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgaWYgd2UgYXJlIGluIGEgYmxvY2sgcGFyc2UgaXQgYXMgY29kZVxuICAgICAgdmFyIGN1ciA9IHRoaXMuY3VycmVudCgpO1xuXG4gICAgICBpZiAodGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSBub3RoaW5nIGVsc2UgdG8gcGFyc2VcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2UgaWYgKGN1ciA9PT0gJ1wiJyB8fCBjdXIgPT09ICdcXCcnKSB7XG4gICAgICAgIC8vIFdlJ3ZlIGhpdCBhIHN0cmluZ1xuICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fU1RSSU5HLCB0aGlzLl9wYXJzZVN0cmluZyhjdXIpLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rID0gdGhpcy5fZXh0cmFjdCh3aGl0ZXNwYWNlQ2hhcnMpKSB7XG4gICAgICAgIC8vIFdlIGhpdCBzb21lIHdoaXRlc3BhY2VcbiAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX1dISVRFU1BBQ0UsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICB9IGVsc2UgaWYgKCh0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKHRoaXMudGFncy5CTE9DS19FTkQpKSB8fCAodG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZygnLScgKyB0aGlzLnRhZ3MuQkxPQ0tfRU5EKSkpIHtcbiAgICAgICAgLy8gU3BlY2lhbCBjaGVjayBmb3IgdGhlIGJsb2NrIGVuZCB0YWdcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSXQgaXMgYSByZXF1aXJlbWVudCB0aGF0IHN0YXJ0IGFuZCBlbmQgdGFncyBhcmUgY29tcG9zZWQgb2ZcbiAgICAgICAgLy8gZGVsaW1pdGVyIGNoYXJhY3RlcnMgKCV7fVtdIGV0YyksIGFuZCBvdXIgY29kZSBhbHdheXNcbiAgICAgICAgLy8gYnJlYWtzIG9uIGRlbGltaXRlcnMgc28gd2UgY2FuIGFzc3VtZSB0aGUgdG9rZW4gcGFyc2luZ1xuICAgICAgICAvLyBkb2Vzbid0IGNvbnN1bWUgdGhlc2UgZWxzZXdoZXJlXG4gICAgICAgIHRoaXMuaW5fY29kZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnRyaW1CbG9ja3MpIHtcbiAgICAgICAgICBjdXIgPSB0aGlzLmN1cnJlbnQoKTtcblxuICAgICAgICAgIGlmIChjdXIgPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAvLyBTa2lwIG5ld2xpbmVcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VyID09PSAnXFxyJykge1xuICAgICAgICAgICAgLy8gU2tpcCBDUkxGIG5ld2xpbmVcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgICAgY3VyID0gdGhpcy5jdXJyZW50KCk7XG5cbiAgICAgICAgICAgIGlmIChjdXIgPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gV2FzIG5vdCBhIENSTEYsIHNvIGdvIGJhY2tcbiAgICAgICAgICAgICAgdGhpcy5iYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX0JMT0NLX0VORCwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH0gZWxzZSBpZiAoKHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcodGhpcy50YWdzLlZBUklBQkxFX0VORCkpIHx8ICh0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKCctJyArIHRoaXMudGFncy5WQVJJQUJMRV9FTkQpKSkge1xuICAgICAgICAvLyBTcGVjaWFsIGNoZWNrIGZvciB2YXJpYWJsZSBlbmQgdGFnIChzZWUgYWJvdmUpXG4gICAgICAgIHRoaXMuaW5fY29kZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fVkFSSUFCTEVfRU5ELCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgfSBlbHNlIGlmIChjdXIgPT09ICdyJyAmJiB0aGlzLnN0ci5jaGFyQXQodGhpcy5pbmRleCArIDEpID09PSAnLycpIHtcbiAgICAgICAgLy8gU2tpcCBwYXN0ICdyLycuXG4gICAgICAgIHRoaXMuZm9yd2FyZE4oMik7IC8vIEV4dHJhY3QgdW50aWwgdGhlIGVuZCBvZiB0aGUgcmVnZXggLS0gLyBlbmRzIGl0LCBcXC8gZG9lcyBub3QuXG5cbiAgICAgICAgdmFyIHJlZ2V4Qm9keSA9ICcnO1xuXG4gICAgICAgIHdoaWxlICghdGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50KCkgPT09ICcvJyAmJiB0aGlzLnByZXZpb3VzKCkgIT09ICdcXFxcJykge1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVnZXhCb2R5ICs9IHRoaXMuY3VycmVudCgpO1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIENoZWNrIGZvciBmbGFncy5cbiAgICAgICAgLy8gVGhlIHBvc3NpYmxlIGZsYWdzIGFyZSBhY2NvcmRpbmcgdG8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvUmVnRXhwKVxuXG5cbiAgICAgICAgdmFyIFBPU1NJQkxFX0ZMQUdTID0gWydnJywgJ2knLCAnbScsICd5J107XG4gICAgICAgIHZhciByZWdleEZsYWdzID0gJyc7XG5cbiAgICAgICAgd2hpbGUgKCF0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgIHZhciBpc0N1cnJlbnRBRmxhZyA9IFBPU1NJQkxFX0ZMQUdTLmluZGV4T2YodGhpcy5jdXJyZW50KCkpICE9PSAtMTtcblxuICAgICAgICAgIGlmIChpc0N1cnJlbnRBRmxhZykge1xuICAgICAgICAgICAgcmVnZXhGbGFncyArPSB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fUkVHRVgsIHtcbiAgICAgICAgICBib2R5OiByZWdleEJvZHksXG4gICAgICAgICAgZmxhZ3M6IHJlZ2V4RmxhZ3NcbiAgICAgICAgfSwgbGluZW5vLCBjb2xubyk7XG4gICAgICB9IGVsc2UgaWYgKGRlbGltQ2hhcnMuaW5kZXhPZihjdXIpICE9PSAtMSkge1xuICAgICAgICAvLyBXZSd2ZSBoaXQgYSBkZWxpbWl0ZXIgKGEgc3BlY2lhbCBjaGFyIGxpa2UgYSBicmFja2V0KVxuICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgdmFyIGNvbXBsZXhPcHMgPSBbJz09JywgJz09PScsICchPScsICchPT0nLCAnPD0nLCAnPj0nLCAnLy8nLCAnKionXTtcbiAgICAgICAgdmFyIGN1ckNvbXBsZXggPSBjdXIgKyB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgdmFyIHR5cGU7XG5cbiAgICAgICAgaWYgKGxpYi5pbmRleE9mKGNvbXBsZXhPcHMsIGN1ckNvbXBsZXgpICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgIGN1ciA9IGN1ckNvbXBsZXg7IC8vIFNlZSBpZiB0aGlzIGlzIGEgc3RyaWN0IGVxdWFsaXR5L2luZXF1YWxpdHkgY29tcGFyYXRvclxuXG4gICAgICAgICAgaWYgKGxpYi5pbmRleE9mKGNvbXBsZXhPcHMsIGN1ckNvbXBsZXggKyB0aGlzLmN1cnJlbnQoKSkgIT09IC0xKSB7XG4gICAgICAgICAgICBjdXIgPSBjdXJDb21wbGV4ICsgdGhpcy5jdXJyZW50KCk7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGN1cikge1xuICAgICAgICAgIGNhc2UgJygnOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0xFRlRfUEFSRU47XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJyknOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX1JJR0hUX1BBUkVOO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdbJzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9MRUZUX0JSQUNLRVQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ10nOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX1JJR0hUX0JSQUNLRVQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3snOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0xFRlRfQ1VSTFk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ30nOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX1JJR0hUX0NVUkxZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICcsJzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9DT01NQTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnOic6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fQ09MT047XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ34nOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX1RJTERFO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICd8JzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9QSVBFO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX09QRVJBVE9SO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRva2VuKHR5cGUsIGN1ciwgbGluZW5vLCBjb2xubyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBhcmUgbm90IGF0IHdoaXRlc3BhY2Ugb3IgYSBkZWxpbWl0ZXIsIHNvIGV4dHJhY3QgdGhlXG4gICAgICAgIC8vIHRleHQgYW5kIHBhcnNlIGl0XG4gICAgICAgIHRvayA9IHRoaXMuX2V4dHJhY3RVbnRpbCh3aGl0ZXNwYWNlQ2hhcnMgKyBkZWxpbUNoYXJzKTtcblxuICAgICAgICBpZiAodG9rLm1hdGNoKC9eWy0rXT9bMC05XSskLykpIHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50KCkgPT09ICcuJykge1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG5cbiAgICAgICAgICAgIHZhciBkZWMgPSB0aGlzLl9leHRyYWN0KGludENoYXJzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX0ZMT0FULCB0b2sgKyAnLicgKyBkZWMsIGxpbmVubywgY29sbm8pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fSU5ULCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0b2subWF0Y2goL14odHJ1ZXxmYWxzZSkkLykpIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fQk9PTEVBTiwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgICAgfSBlbHNlIGlmICh0b2sgPT09ICdub25lJykge1xuICAgICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9OT05FLCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICogQWRkZWQgdG8gbWFrZSB0aGUgdGVzdCBgbnVsbCBpcyBudWxsYCBldmFsdWF0ZSB0cnV0aGlseS5cbiAgICAgICAgICAgKiBPdGhlcndpc2UsIE51bmp1Y2tzIHdpbGwgbG9vayB1cCBudWxsIGluIHRoZSBjb250ZXh0IGFuZFxuICAgICAgICAgICAqIHJldHVybiBgdW5kZWZpbmVkYCwgd2hpY2ggaXMgbm90IHdoYXQgd2Ugd2FudC4gVGhpcyAqbWF5KiBoYXZlXG4gICAgICAgICAgICogY29uc2VxdWVuY2VzIGlzIHNvbWVvbmUgaXMgdXNpbmcgbnVsbCBpbiB0aGVpciB0ZW1wbGF0ZXMgYXMgYVxuICAgICAgICAgICAqIHZhcmlhYmxlLlxuICAgICAgICAgICAqL1xuICAgICAgICB9IGVsc2UgaWYgKHRvayA9PT0gJ251bGwnKSB7XG4gICAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX05PTkUsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICAgIH0gZWxzZSBpZiAodG9rKSB7XG4gICAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX1NZTUJPTCwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgdmFsdWUgd2hpbGUgcGFyc2luZzogJyArIHRvayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUGFyc2Ugb3V0IHRoZSB0ZW1wbGF0ZSB0ZXh0LCBicmVha2luZyBvbiB0YWdcbiAgICAgIC8vIGRlbGltaXRlcnMgYmVjYXVzZSB3ZSBuZWVkIHRvIGxvb2sgZm9yIGJsb2NrL3ZhcmlhYmxlIHN0YXJ0XG4gICAgICAvLyB0YWdzIChkb24ndCB1c2UgdGhlIGZ1bGwgZGVsaW1DaGFycyBmb3Igb3B0aW1pemF0aW9uKVxuICAgICAgdmFyIGJlZ2luQ2hhcnMgPSB0aGlzLnRhZ3MuQkxPQ0tfU1RBUlQuY2hhckF0KDApICsgdGhpcy50YWdzLlZBUklBQkxFX1NUQVJULmNoYXJBdCgwKSArIHRoaXMudGFncy5DT01NRU5UX1NUQVJULmNoYXJBdCgwKSArIHRoaXMudGFncy5DT01NRU5UX0VORC5jaGFyQXQoMCk7XG5cbiAgICAgIGlmICh0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoKHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcodGhpcy50YWdzLkJMT0NLX1NUQVJUICsgJy0nKSkgfHwgKHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcodGhpcy50YWdzLkJMT0NLX1NUQVJUKSkpIHtcbiAgICAgICAgdGhpcy5pbl9jb2RlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX0JMT0NLX1NUQVJULCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgfSBlbHNlIGlmICgodG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZyh0aGlzLnRhZ3MuVkFSSUFCTEVfU1RBUlQgKyAnLScpKSB8fCAodG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZyh0aGlzLnRhZ3MuVkFSSUFCTEVfU1RBUlQpKSkge1xuICAgICAgICB0aGlzLmluX2NvZGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fVkFSSUFCTEVfU1RBUlQsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2sgPSAnJztcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHZhciBpbkNvbW1lbnQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5fbWF0Y2hlcyh0aGlzLnRhZ3MuQ09NTUVOVF9TVEFSVCkpIHtcbiAgICAgICAgICBpbkNvbW1lbnQgPSB0cnVlO1xuICAgICAgICAgIHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcodGhpcy50YWdzLkNPTU1FTlRfU1RBUlQpO1xuICAgICAgICB9IC8vIENvbnRpbnVhbGx5IGNvbnN1bWUgdGV4dCwgYnJlYWtpbmcgb24gdGhlIHRhZyBkZWxpbWl0ZXJcbiAgICAgICAgLy8gY2hhcmFjdGVycyBhbmQgY2hlY2tpbmcgdG8gc2VlIGlmIGl0J3MgYSBzdGFydCB0YWcuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFdlIGNvdWxkIGhpdCB0aGUgZW5kIG9mIHRoZSB0ZW1wbGF0ZSBpbiB0aGUgbWlkZGxlIG9mXG4gICAgICAgIC8vIG91ciBsb29waW5nLCBzbyBjaGVjayBmb3IgdGhlIG51bGwgcmV0dXJuIHZhbHVlIGZyb21cbiAgICAgICAgLy8gX2V4dHJhY3RVbnRpbFxuXG5cbiAgICAgICAgd2hpbGUgKChkYXRhID0gdGhpcy5fZXh0cmFjdFVudGlsKGJlZ2luQ2hhcnMpKSAhPT0gbnVsbCkge1xuICAgICAgICAgIHRvayArPSBkYXRhO1xuXG4gICAgICAgICAgaWYgKCh0aGlzLl9tYXRjaGVzKHRoaXMudGFncy5CTE9DS19TVEFSVCkgfHwgdGhpcy5fbWF0Y2hlcyh0aGlzLnRhZ3MuVkFSSUFCTEVfU1RBUlQpIHx8IHRoaXMuX21hdGNoZXModGhpcy50YWdzLkNPTU1FTlRfU1RBUlQpKSAmJiAhaW5Db21tZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sc3RyaXBCbG9ja3MgJiYgdGhpcy5fbWF0Y2hlcyh0aGlzLnRhZ3MuQkxPQ0tfU1RBUlQpICYmIHRoaXMuY29sbm8gPiAwICYmIHRoaXMuY29sbm8gPD0gdG9rLmxlbmd0aCkge1xuICAgICAgICAgICAgICB2YXIgbGFzdExpbmUgPSB0b2suc2xpY2UoLXRoaXMuY29sbm8pO1xuXG4gICAgICAgICAgICAgIGlmICgvXlxccyskLy50ZXN0KGxhc3RMaW5lKSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBibG9jayBsZWFkaW5nIHdoaXRlc3BhY2UgZnJvbSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZ1xuICAgICAgICAgICAgICAgIHRvayA9IHRvay5zbGljZSgwLCAtdGhpcy5jb2xubyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRvay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEFsbCBkYXRhIHJlbW92ZWQsIGNvbGxhcHNlIHRvIGF2b2lkIHVubmVjZXNzYXJ5IG5vZGVzXG4gICAgICAgICAgICAgICAgICAvLyBieSByZXR1cm5pbmcgbmV4dCB0b2tlbiAoYmxvY2sgc3RhcnQpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0VG9rZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8gSWYgaXQgaXMgYSBzdGFydCB0YWcsIHN0b3AgbG9vcGluZ1xuXG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF0Y2hlcyh0aGlzLnRhZ3MuQ09NTUVOVF9FTkQpKSB7XG4gICAgICAgICAgICBpZiAoIWluQ29tbWVudCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgZW5kIG9mIGNvbW1lbnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9rICs9IHRoaXMuX2V4dHJhY3RTdHJpbmcodGhpcy50YWdzLkNPTU1FTlRfRU5EKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdCBkb2VzIG5vdCBtYXRjaCBhbnkgdGFnLCBzbyBhZGQgdGhlIGNoYXJhY3RlciBhbmRcbiAgICAgICAgICAgIC8vIGNhcnJ5IG9uXG4gICAgICAgICAgICB0b2sgKz0gdGhpcy5jdXJyZW50KCk7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbCAmJiBpbkNvbW1lbnQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIGVuZCBvZiBjb21tZW50LCBnb3QgZW5kIG9mIGZpbGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b2tlbihpbkNvbW1lbnQgPyBUT0tFTl9DT01NRU5UIDogVE9LRU5fREFUQSwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLl9wYXJzZVN0cmluZyA9IGZ1bmN0aW9uIF9wYXJzZVN0cmluZyhkZWxpbWl0ZXIpIHtcbiAgICB0aGlzLmZvcndhcmQoKTtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB3aGlsZSAoIXRoaXMuaXNGaW5pc2hlZCgpICYmIHRoaXMuY3VycmVudCgpICE9PSBkZWxpbWl0ZXIpIHtcbiAgICAgIHZhciBjdXIgPSB0aGlzLmN1cnJlbnQoKTtcblxuICAgICAgaWYgKGN1ciA9PT0gJ1xcXFwnKSB7XG4gICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJyZW50KCkpIHtcbiAgICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgIHN0ciArPSAnXFxuJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICBzdHIgKz0gJ1xcdCc7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3InOlxuICAgICAgICAgICAgc3RyICs9ICdcXHInO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc3RyICs9IHRoaXMuY3VycmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgKz0gY3VyO1xuICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZvcndhcmQoKTtcbiAgICByZXR1cm4gc3RyO1xuICB9O1xuXG4gIF9wcm90by5fbWF0Y2hlcyA9IGZ1bmN0aW9uIF9tYXRjaGVzKHN0cikge1xuICAgIGlmICh0aGlzLmluZGV4ICsgc3RyLmxlbmd0aCA+IHRoaXMubGVuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbSA9IHRoaXMuc3RyLnNsaWNlKHRoaXMuaW5kZXgsIHRoaXMuaW5kZXggKyBzdHIubGVuZ3RoKTtcbiAgICByZXR1cm4gbSA9PT0gc3RyO1xuICB9O1xuXG4gIF9wcm90by5fZXh0cmFjdFN0cmluZyA9IGZ1bmN0aW9uIF9leHRyYWN0U3RyaW5nKHN0cikge1xuICAgIGlmICh0aGlzLl9tYXRjaGVzKHN0cikpIHtcbiAgICAgIHRoaXMuaW5kZXggKz0gc3RyLmxlbmd0aDtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgX3Byb3RvLl9leHRyYWN0VW50aWwgPSBmdW5jdGlvbiBfZXh0cmFjdFVudGlsKGNoYXJTdHJpbmcpIHtcbiAgICAvLyBFeHRyYWN0IGFsbCBub24tbWF0Y2hpbmcgY2hhcnMsIHdpdGggdGhlIGRlZmF1bHQgbWF0Y2hpbmcgc2V0XG4gICAgLy8gdG8gZXZlcnl0aGluZ1xuICAgIHJldHVybiB0aGlzLl9leHRyYWN0TWF0Y2hpbmcodHJ1ZSwgY2hhclN0cmluZyB8fCAnJyk7XG4gIH07XG5cbiAgX3Byb3RvLl9leHRyYWN0ID0gZnVuY3Rpb24gX2V4dHJhY3QoY2hhclN0cmluZykge1xuICAgIC8vIEV4dHJhY3QgYWxsIG1hdGNoaW5nIGNoYXJzIChubyBkZWZhdWx0LCBzbyBjaGFyU3RyaW5nIG11c3QgYmVcbiAgICAvLyBleHBsaWNpdClcbiAgICByZXR1cm4gdGhpcy5fZXh0cmFjdE1hdGNoaW5nKGZhbHNlLCBjaGFyU3RyaW5nKTtcbiAgfTtcblxuICBfcHJvdG8uX2V4dHJhY3RNYXRjaGluZyA9IGZ1bmN0aW9uIF9leHRyYWN0TWF0Y2hpbmcoYnJlYWtPbk1hdGNoLCBjaGFyU3RyaW5nKSB7XG4gICAgLy8gUHVsbCBvdXQgY2hhcmFjdGVycyB1bnRpbCBhIGJyZWFraW5nIGNoYXIgaXMgaGl0LlxuICAgIC8vIElmIGJyZWFrT25NYXRjaCBpcyBmYWxzZSwgYSBub24tbWF0Y2hpbmcgY2hhciBzdG9wcyBpdC5cbiAgICAvLyBJZiBicmVha09uTWF0Y2ggaXMgdHJ1ZSwgYSBtYXRjaGluZyBjaGFyIHN0b3BzIGl0LlxuICAgIGlmICh0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0ID0gY2hhclN0cmluZy5pbmRleE9mKHRoaXMuY3VycmVudCgpKTsgLy8gT25seSBwcm9jZWVkIGlmIHRoZSBmaXJzdCBjaGFyYWN0ZXIgZG9lc24ndCBtZWV0IG91ciBjb25kaXRpb25cblxuICAgIGlmIChicmVha09uTWF0Y2ggJiYgZmlyc3QgPT09IC0xIHx8ICFicmVha09uTWF0Y2ggJiYgZmlyc3QgIT09IC0xKSB7XG4gICAgICB2YXIgdCA9IHRoaXMuY3VycmVudCgpO1xuICAgICAgdGhpcy5mb3J3YXJkKCk7IC8vIEFuZCBwdWxsIG91dCBhbGwgdGhlIGNoYXJzIG9uZSBhdCBhIHRpbWUgdW50aWwgd2UgaGl0IGFcbiAgICAgIC8vIGJyZWFraW5nIGNoYXJcblxuICAgICAgdmFyIGlkeCA9IGNoYXJTdHJpbmcuaW5kZXhPZih0aGlzLmN1cnJlbnQoKSk7XG5cbiAgICAgIHdoaWxlICgoYnJlYWtPbk1hdGNoICYmIGlkeCA9PT0gLTEgfHwgIWJyZWFrT25NYXRjaCAmJiBpZHggIT09IC0xKSAmJiAhdGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgdCArPSB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgIGlkeCA9IGNoYXJTdHJpbmcuaW5kZXhPZih0aGlzLmN1cnJlbnQoKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0O1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfTtcblxuICBfcHJvdG8uX2V4dHJhY3RSZWdleCA9IGZ1bmN0aW9uIF9leHRyYWN0UmVnZXgocmVnZXgpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHRoaXMuY3VycmVudFN0cigpLm1hdGNoKHJlZ2V4KTtcblxuICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSAvLyBNb3ZlIGZvcndhcmQgd2hhdGV2ZXIgd2FzIG1hdGNoZWRcblxuXG4gICAgdGhpcy5mb3J3YXJkTihtYXRjaGVzWzBdLmxlbmd0aCk7XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH07XG5cbiAgX3Byb3RvLmlzRmluaXNoZWQgPSBmdW5jdGlvbiBpc0ZpbmlzaGVkKCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4ID49IHRoaXMubGVuO1xuICB9O1xuXG4gIF9wcm90by5mb3J3YXJkTiA9IGZ1bmN0aW9uIGZvcndhcmROKG4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5mb3J3YXJkID0gZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgICB0aGlzLmluZGV4Kys7XG5cbiAgICBpZiAodGhpcy5wcmV2aW91cygpID09PSAnXFxuJykge1xuICAgICAgdGhpcy5saW5lbm8rKztcbiAgICAgIHRoaXMuY29sbm8gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbG5vKys7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5iYWNrTiA9IGZ1bmN0aW9uIGJhY2tOKG4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgdGhpcy5iYWNrKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5iYWNrID0gZnVuY3Rpb24gYmFjaygpIHtcbiAgICB0aGlzLmluZGV4LS07XG5cbiAgICBpZiAodGhpcy5jdXJyZW50KCkgPT09ICdcXG4nKSB7XG4gICAgICB0aGlzLmxpbmVuby0tO1xuICAgICAgdmFyIGlkeCA9IHRoaXMuc3JjLmxhc3RJbmRleE9mKCdcXG4nLCB0aGlzLmluZGV4IC0gMSk7XG5cbiAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgIHRoaXMuY29sbm8gPSB0aGlzLmluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2xubyA9IHRoaXMuaW5kZXggLSBpZHg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sbm8tLTtcbiAgICB9XG4gIH07IC8vIGN1cnJlbnQgcmV0dXJucyBjdXJyZW50IGNoYXJhY3RlclxuXG5cbiAgX3Byb3RvLmN1cnJlbnQgPSBmdW5jdGlvbiBjdXJyZW50KCkge1xuICAgIGlmICghdGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0ci5jaGFyQXQodGhpcy5pbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9OyAvLyBjdXJyZW50U3RyIHJldHVybnMgd2hhdCdzIGxlZnQgb2YgdGhlIHVucGFyc2VkIHN0cmluZ1xuXG5cbiAgX3Byb3RvLmN1cnJlbnRTdHIgPSBmdW5jdGlvbiBjdXJyZW50U3RyKCkge1xuICAgIGlmICghdGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0ci5zdWJzdHIodGhpcy5pbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9O1xuXG4gIF9wcm90by5wcmV2aW91cyA9IGZ1bmN0aW9uIHByZXZpb3VzKCkge1xuICAgIHJldHVybiB0aGlzLnN0ci5jaGFyQXQodGhpcy5pbmRleCAtIDEpO1xuICB9O1xuXG4gIHJldHVybiBUb2tlbml6ZXI7XG59KCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsZXg6IGZ1bmN0aW9uIGxleChzcmMsIG9wdHMpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcihzcmMsIG9wdHMpO1xuICB9LFxuICBUT0tFTl9TVFJJTkc6IFRPS0VOX1NUUklORyxcbiAgVE9LRU5fV0hJVEVTUEFDRTogVE9LRU5fV0hJVEVTUEFDRSxcbiAgVE9LRU5fREFUQTogVE9LRU5fREFUQSxcbiAgVE9LRU5fQkxPQ0tfU1RBUlQ6IFRPS0VOX0JMT0NLX1NUQVJULFxuICBUT0tFTl9CTE9DS19FTkQ6IFRPS0VOX0JMT0NLX0VORCxcbiAgVE9LRU5fVkFSSUFCTEVfU1RBUlQ6IFRPS0VOX1ZBUklBQkxFX1NUQVJULFxuICBUT0tFTl9WQVJJQUJMRV9FTkQ6IFRPS0VOX1ZBUklBQkxFX0VORCxcbiAgVE9LRU5fQ09NTUVOVDogVE9LRU5fQ09NTUVOVCxcbiAgVE9LRU5fTEVGVF9QQVJFTjogVE9LRU5fTEVGVF9QQVJFTixcbiAgVE9LRU5fUklHSFRfUEFSRU46IFRPS0VOX1JJR0hUX1BBUkVOLFxuICBUT0tFTl9MRUZUX0JSQUNLRVQ6IFRPS0VOX0xFRlRfQlJBQ0tFVCxcbiAgVE9LRU5fUklHSFRfQlJBQ0tFVDogVE9LRU5fUklHSFRfQlJBQ0tFVCxcbiAgVE9LRU5fTEVGVF9DVVJMWTogVE9LRU5fTEVGVF9DVVJMWSxcbiAgVE9LRU5fUklHSFRfQ1VSTFk6IFRPS0VOX1JJR0hUX0NVUkxZLFxuICBUT0tFTl9PUEVSQVRPUjogVE9LRU5fT1BFUkFUT1IsXG4gIFRPS0VOX0NPTU1BOiBUT0tFTl9DT01NQSxcbiAgVE9LRU5fQ09MT046IFRPS0VOX0NPTE9OLFxuICBUT0tFTl9USUxERTogVE9LRU5fVElMREUsXG4gIFRPS0VOX1BJUEU6IFRPS0VOX1BJUEUsXG4gIFRPS0VOX0lOVDogVE9LRU5fSU5ULFxuICBUT0tFTl9GTE9BVDogVE9LRU5fRkxPQVQsXG4gIFRPS0VOX0JPT0xFQU46IFRPS0VOX0JPT0xFQU4sXG4gIFRPS0VOX05PTkU6IFRPS0VOX05PTkUsXG4gIFRPS0VOX1NZTUJPTDogVE9LRU5fU1lNQk9MLFxuICBUT0tFTl9TUEVDSUFMOiBUT0tFTl9TUEVDSUFMLFxuICBUT0tFTl9SRUdFWDogVE9LRU5fUkVHRVhcbn07XG5cbi8qKiovIH0pLFxuLyogMTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBMb2FkZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KSxcbiAgICBQcmVjb21waWxlZExvYWRlciA9IF9yZXF1aXJlLlByZWNvbXBpbGVkTG9hZGVyO1xuXG52YXIgV2ViTG9hZGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTG9hZGVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKFdlYkxvYWRlciwgX0xvYWRlcik7XG5cbiAgZnVuY3Rpb24gV2ViTG9hZGVyKGJhc2VVUkwsIG9wdHMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9Mb2FkZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLmJhc2VVUkwgPSBiYXNlVVJMIHx8ICcuJztcbiAgICBvcHRzID0gb3B0cyB8fCB7fTsgLy8gQnkgZGVmYXVsdCwgdGhlIGNhY2hlIGlzIHR1cm5lZCBvZmYgYmVjYXVzZSB0aGVyZSdzIG5vIHdheVxuICAgIC8vIHRvIFwid2F0Y2hcIiB0ZW1wbGF0ZXMgb3ZlciBIVFRQLCBzbyB0aGV5IGFyZSByZS1kb3dubG9hZGVkXG4gICAgLy8gYW5kIGNvbXBpbGVkIGVhY2ggdGltZS4gKFJlbWVtYmVyLCBQUkVDT01QSUxFIFlPVVJcbiAgICAvLyBURU1QTEFURVMgaW4gcHJvZHVjdGlvbiEpXG5cbiAgICBfdGhpcy51c2VDYWNoZSA9ICEhb3B0cy51c2VDYWNoZTsgLy8gV2UgZGVmYXVsdCBgYXN5bmNgIHRvIGZhbHNlIHNvIHRoYXQgdGhlIHNpbXBsZSBzeW5jaHJvbm91c1xuICAgIC8vIEFQSSBjYW4gYmUgdXNlZCB3aGVuIHlvdSBhcmVuJ3QgZG9pbmcgYW55dGhpbmcgYXN5bmMgaW5cbiAgICAvLyB5b3VyIHRlbXBsYXRlcyAod2hpY2ggaXMgbW9zdCBvZiB0aGUgdGltZSkuIFRoaXMgcGVyZm9ybXMgYVxuICAgIC8vIHN5bmMgYWpheCByZXF1ZXN0LCBidXQgdGhhdCdzIG9rIGJlY2F1c2UgaXQgc2hvdWxkICpvbmx5KlxuICAgIC8vIGhhcHBlbiBpbiBkZXZlbG9wbWVudC4gUFJFQ09NUElMRSBZT1VSIFRFTVBMQVRFUy5cblxuICAgIF90aGlzLmFzeW5jID0gISFvcHRzLmFzeW5jO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBXZWJMb2FkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZShmcm9tLCB0bykge1xuICAgIHRocm93IG5ldyBFcnJvcigncmVsYXRpdmUgdGVtcGxhdGVzIG5vdCBzdXBwb3J0IGluIHRoZSBicm93c2VyIHlldCcpO1xuICB9O1xuXG4gIF9wcm90by5nZXRTb3VyY2UgPSBmdW5jdGlvbiBnZXRTb3VyY2UobmFtZSwgY2IpIHtcbiAgICB2YXIgdXNlQ2FjaGUgPSB0aGlzLnVzZUNhY2hlO1xuICAgIHZhciByZXN1bHQ7XG4gICAgdGhpcy5mZXRjaCh0aGlzLmJhc2VVUkwgKyAnLycgKyBuYW1lLCBmdW5jdGlvbiAoZXJyLCBzcmMpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgY2IoZXJyLmNvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGVyci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgIHJlc3VsdCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyLmNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICBwYXRoOiBuYW1lLFxuICAgICAgICAgIG5vQ2FjaGU6ICF1c2VDYWNoZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiKG51bGwsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTsgLy8gaWYgdGhpcyBXZWJMb2FkZXIgaXNuJ3QgcnVubmluZyBhc3luY2hyb25vdXNseSwgdGhlXG4gICAgLy8gZmV0Y2ggYWJvdmUgd291bGQgYWN0dWFsbHkgcnVuIHN5bmMgYW5kIHdlJ2xsIGhhdmUgYVxuICAgIC8vIHJlc3VsdCBoZXJlXG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIF9wcm90by5mZXRjaCA9IGZ1bmN0aW9uIGZldGNoKHVybCwgY2IpIHtcbiAgICAvLyBPbmx5IGluIHRoZSBicm93c2VyIHBsZWFzZVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJMb2FkZXIgY2FuIG9ubHkgYnkgdXNlZCBpbiBhIGJyb3dzZXInKTtcbiAgICB9XG5cbiAgICB2YXIgYWpheCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkaW5nID0gdHJ1ZTtcblxuICAgIGFqYXgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGFqYXgucmVhZHlTdGF0ZSA9PT0gNCAmJiBsb2FkaW5nKSB7XG4gICAgICAgIGxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoYWpheC5zdGF0dXMgPT09IDAgfHwgYWpheC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIGNiKG51bGwsIGFqYXgucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYih7XG4gICAgICAgICAgICBzdGF0dXM6IGFqYXguc3RhdHVzLFxuICAgICAgICAgICAgY29udGVudDogYWpheC5yZXNwb25zZVRleHRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArICdzPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBhamF4Lm9wZW4oJ0dFVCcsIHVybCwgdGhpcy5hc3luYyk7XG4gICAgYWpheC5zZW5kKCk7XG4gIH07XG5cbiAgcmV0dXJuIFdlYkxvYWRlcjtcbn0oTG9hZGVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFdlYkxvYWRlcjogV2ViTG9hZGVyLFxuICBQcmVjb21waWxlZExvYWRlcjogUHJlY29tcGlsZWRMb2FkZXJcbn07XG5cbi8qKiovIH0pLFxuLyogMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNyksXG4gICAgRW52aXJvbm1lbnQgPSBfcmVxdWlyZS5FbnZpcm9ubWVudCxcbiAgICBUZW1wbGF0ZSA9IF9yZXF1aXJlLlRlbXBsYXRlO1xuXG52YXIgTG9hZGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxudmFyIGxvYWRlcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxudmFyIHByZWNvbXBpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTtcblxudmFyIGNvbXBpbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIHBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cbnZhciBsZXhlciA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cbnZhciBydW50aW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIG5vZGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIGluc3RhbGxKaW5qYUNvbXBhdCA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpOyAvLyBBIHNpbmdsZSBpbnN0YW5jZSBvZiBhbiBlbnZpcm9ubWVudCwgc2luY2UgdGhpcyBpcyBzbyBjb21tb25seSB1c2VkXG5cblxudmFyIGU7XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZSh0ZW1wbGF0ZXNQYXRoLCBvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIGlmIChsaWIuaXNPYmplY3QodGVtcGxhdGVzUGF0aCkpIHtcbiAgICBvcHRzID0gdGVtcGxhdGVzUGF0aDtcbiAgICB0ZW1wbGF0ZXNQYXRoID0gbnVsbDtcbiAgfVxuXG4gIHZhciBUZW1wbGF0ZUxvYWRlcjtcblxuICBpZiAobG9hZGVycy5GaWxlU3lzdGVtTG9hZGVyKSB7XG4gICAgVGVtcGxhdGVMb2FkZXIgPSBuZXcgbG9hZGVycy5GaWxlU3lzdGVtTG9hZGVyKHRlbXBsYXRlc1BhdGgsIHtcbiAgICAgIHdhdGNoOiBvcHRzLndhdGNoLFxuICAgICAgbm9DYWNoZTogb3B0cy5ub0NhY2hlXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAobG9hZGVycy5XZWJMb2FkZXIpIHtcbiAgICBUZW1wbGF0ZUxvYWRlciA9IG5ldyBsb2FkZXJzLldlYkxvYWRlcih0ZW1wbGF0ZXNQYXRoLCB7XG4gICAgICB1c2VDYWNoZTogb3B0cy53ZWIgJiYgb3B0cy53ZWIudXNlQ2FjaGUsXG4gICAgICBhc3luYzogb3B0cy53ZWIgJiYgb3B0cy53ZWIuYXN5bmNcbiAgICB9KTtcbiAgfVxuXG4gIGUgPSBuZXcgRW52aXJvbm1lbnQoVGVtcGxhdGVMb2FkZXIsIG9wdHMpO1xuXG4gIGlmIChvcHRzICYmIG9wdHMuZXhwcmVzcykge1xuICAgIGUuZXhwcmVzcyhvcHRzLmV4cHJlc3MpO1xuICB9XG5cbiAgcmV0dXJuIGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFbnZpcm9ubWVudDogRW52aXJvbm1lbnQsXG4gIFRlbXBsYXRlOiBUZW1wbGF0ZSxcbiAgTG9hZGVyOiBMb2FkZXIsXG4gIEZpbGVTeXN0ZW1Mb2FkZXI6IGxvYWRlcnMuRmlsZVN5c3RlbUxvYWRlcixcbiAgUHJlY29tcGlsZWRMb2FkZXI6IGxvYWRlcnMuUHJlY29tcGlsZWRMb2FkZXIsXG4gIFdlYkxvYWRlcjogbG9hZGVycy5XZWJMb2FkZXIsXG4gIGNvbXBpbGVyOiBjb21waWxlcixcbiAgcGFyc2VyOiBwYXJzZXIsXG4gIGxleGVyOiBsZXhlcixcbiAgcnVudGltZTogcnVudGltZSxcbiAgbGliOiBsaWIsXG4gIG5vZGVzOiBub2RlcyxcbiAgaW5zdGFsbEppbmphQ29tcGF0OiBpbnN0YWxsSmluamFDb21wYXQsXG4gIGNvbmZpZ3VyZTogY29uZmlndXJlLFxuICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgZSA9IHVuZGVmaW5lZDtcbiAgfSxcbiAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZShzcmMsIGVudiwgcGF0aCwgZWFnZXJDb21waWxlKSB7XG4gICAgaWYgKCFlKSB7XG4gICAgICBjb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRlbXBsYXRlKHNyYywgZW52LCBwYXRoLCBlYWdlckNvbXBpbGUpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihuYW1lLCBjdHgsIGNiKSB7XG4gICAgaWYgKCFlKSB7XG4gICAgICBjb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZS5yZW5kZXIobmFtZSwgY3R4LCBjYik7XG4gIH0sXG4gIHJlbmRlclN0cmluZzogZnVuY3Rpb24gcmVuZGVyU3RyaW5nKHNyYywgY3R4LCBjYikge1xuICAgIGlmICghZSkge1xuICAgICAgY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGUucmVuZGVyU3RyaW5nKHNyYywgY3R4LCBjYik7XG4gIH0sXG4gIHByZWNvbXBpbGU6IHByZWNvbXBpbGUgPyBwcmVjb21waWxlLnByZWNvbXBpbGUgOiB1bmRlZmluZWQsXG4gIHByZWNvbXBpbGVTdHJpbmc6IHByZWNvbXBpbGUgPyBwcmVjb21waWxlLnByZWNvbXBpbGVTdHJpbmcgOiB1bmRlZmluZWRcbn07XG5cbi8qKiovIH0pLFxuLyogMTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLy8gcmF3QXNhcCBwcm92aWRlcyBldmVyeXRoaW5nIHdlIG5lZWQgZXhjZXB0IGV4Y2VwdGlvbiBtYW5hZ2VtZW50LlxudmFyIHJhd0FzYXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcbi8vIFJhd1Rhc2tzIGFyZSByZWN5Y2xlZCB0byByZWR1Y2UgR0MgY2h1cm4uXG52YXIgZnJlZVRhc2tzID0gW107XG4vLyBXZSBxdWV1ZSBlcnJvcnMgdG8gZW5zdXJlIHRoZXkgYXJlIHRocm93biBpbiByaWdodCBvcmRlciAoRklGTykuXG4vLyBBcnJheS1hcy1xdWV1ZSBpcyBnb29kIGVub3VnaCBoZXJlLCBzaW5jZSB3ZSBhcmUganVzdCBkZWFsaW5nIHdpdGggZXhjZXB0aW9ucy5cbnZhciBwZW5kaW5nRXJyb3JzID0gW107XG52YXIgcmVxdWVzdEVycm9yVGhyb3cgPSByYXdBc2FwLm1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcih0aHJvd0ZpcnN0RXJyb3IpO1xuXG5mdW5jdGlvbiB0aHJvd0ZpcnN0RXJyb3IoKSB7XG4gICAgaWYgKHBlbmRpbmdFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IHBlbmRpbmdFcnJvcnMuc2hpZnQoKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2FsbHMgYSB0YXNrIGFzIHNvb24gYXMgcG9zc2libGUgYWZ0ZXIgcmV0dXJuaW5nLCBpbiBpdHMgb3duIGV2ZW50LCB3aXRoIHByaW9yaXR5XG4gKiBvdmVyIG90aGVyIGV2ZW50cyBsaWtlIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVwYWludC4gQW4gZXJyb3IgdGhyb3duIGZyb20gYW5cbiAqIGV2ZW50IHdpbGwgbm90IGludGVycnVwdCwgbm9yIGV2ZW4gc3Vic3RhbnRpYWxseSBzbG93IGRvd24gdGhlIHByb2Nlc3Npbmcgb2ZcbiAqIG90aGVyIGV2ZW50cywgYnV0IHdpbGwgYmUgcmF0aGVyIHBvc3Rwb25lZCB0byBhIGxvd2VyIHByaW9yaXR5IGV2ZW50LlxuICogQHBhcmFtIHt7Y2FsbH19IHRhc2sgQSBjYWxsYWJsZSBvYmplY3QsIHR5cGljYWxseSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbm9cbiAqIGFyZ3VtZW50cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhc2FwO1xuZnVuY3Rpb24gYXNhcCh0YXNrKSB7XG4gICAgdmFyIHJhd1Rhc2s7XG4gICAgaWYgKGZyZWVUYXNrcy5sZW5ndGgpIHtcbiAgICAgICAgcmF3VGFzayA9IGZyZWVUYXNrcy5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByYXdUYXNrID0gbmV3IFJhd1Rhc2soKTtcbiAgICB9XG4gICAgcmF3VGFzay50YXNrID0gdGFzaztcbiAgICByYXdBc2FwKHJhd1Rhc2spO1xufVxuXG4vLyBXZSB3cmFwIHRhc2tzIHdpdGggcmVjeWNsYWJsZSB0YXNrIG9iamVjdHMuICBBIHRhc2sgb2JqZWN0IGltcGxlbWVudHNcbi8vIGBjYWxsYCwganVzdCBsaWtlIGEgZnVuY3Rpb24uXG5mdW5jdGlvbiBSYXdUYXNrKCkge1xuICAgIHRoaXMudGFzayA9IG51bGw7XG59XG5cbi8vIFRoZSBzb2xlIHB1cnBvc2Ugb2Ygd3JhcHBpbmcgdGhlIHRhc2sgaXMgdG8gY2F0Y2ggdGhlIGV4Y2VwdGlvbiBhbmQgcmVjeWNsZVxuLy8gdGhlIHRhc2sgb2JqZWN0IGFmdGVyIGl0cyBzaW5nbGUgdXNlLlxuUmF3VGFzay5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICB0aGlzLnRhc2suY2FsbCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChhc2FwLm9uZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaG9vayBleGlzdHMgcHVyZWx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxuICAgICAgICAgICAgLy8gSXRzIG5hbWUgd2lsbCBiZSBwZXJpb2RpY2FsbHkgcmFuZG9taXplZCB0byBicmVhayBhbnkgY29kZSB0aGF0XG4gICAgICAgICAgICAvLyBkZXBlbmRzIG9uIGl0cyBleGlzdGVuY2UuXG4gICAgICAgICAgICBhc2FwLm9uZXJyb3IoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSW4gYSB3ZWIgYnJvd3NlciwgZXhjZXB0aW9ucyBhcmUgbm90IGZhdGFsLiBIb3dldmVyLCB0byBhdm9pZFxuICAgICAgICAgICAgLy8gc2xvd2luZyBkb3duIHRoZSBxdWV1ZSBvZiBwZW5kaW5nIHRhc2tzLCB3ZSByZXRocm93IHRoZSBlcnJvciBpbiBhXG4gICAgICAgICAgICAvLyBsb3dlciBwcmlvcml0eSB0dXJuLlxuICAgICAgICAgICAgcGVuZGluZ0Vycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvclRocm93KCk7XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLnRhc2sgPSBudWxsO1xuICAgICAgICBmcmVlVGFza3NbZnJlZVRhc2tzLmxlbmd0aF0gPSB0aGlzO1xuICAgIH1cbn07XG5cblxuLyoqKi8gfSksXG4vKiAxMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcbi8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihnbG9iYWwpIHtcblxuLy8gVXNlIHRoZSBmYXN0ZXN0IG1lYW5zIHBvc3NpYmxlIHRvIGV4ZWN1dGUgYSB0YXNrIGluIGl0cyBvd24gdHVybiwgd2l0aFxuLy8gcHJpb3JpdHkgb3ZlciBvdGhlciBldmVudHMgaW5jbHVkaW5nIElPLCBhbmltYXRpb24sIHJlZmxvdywgYW5kIHJlZHJhd1xuLy8gZXZlbnRzIGluIGJyb3dzZXJzLlxuLy9cbi8vIEFuIGV4Y2VwdGlvbiB0aHJvd24gYnkgYSB0YXNrIHdpbGwgcGVybWFuZW50bHkgaW50ZXJydXB0IHRoZSBwcm9jZXNzaW5nIG9mXG4vLyBzdWJzZXF1ZW50IHRhc2tzLiBUaGUgaGlnaGVyIGxldmVsIGBhc2FwYCBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24gYnkgYSB0YXNrLCB0aGF0IHRoZSB0YXNrIHF1ZXVlIHdpbGwgY29udGludWUgZmx1c2hpbmcgYXNcbi8vIHNvb24gYXMgcG9zc2libGUsIGJ1dCBpZiB5b3UgdXNlIGByYXdBc2FwYCBkaXJlY3RseSwgeW91IGFyZSByZXNwb25zaWJsZSB0b1xuLy8gZWl0aGVyIGVuc3VyZSB0aGF0IG5vIGV4Y2VwdGlvbnMgYXJlIHRocm93biBmcm9tIHlvdXIgdGFzaywgb3IgdG8gbWFudWFsbHlcbi8vIGNhbGwgYHJhd0FzYXAucmVxdWVzdEZsdXNoYCBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxubW9kdWxlLmV4cG9ydHMgPSByYXdBc2FwO1xuZnVuY3Rpb24gcmF3QXNhcCh0YXNrKSB7XG4gICAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcmVxdWVzdEZsdXNoKCk7XG4gICAgICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gRXF1aXZhbGVudCB0byBwdXNoLCBidXQgYXZvaWRzIGEgZnVuY3Rpb24gY2FsbC5cbiAgICBxdWV1ZVtxdWV1ZS5sZW5ndGhdID0gdGFzaztcbn1cblxudmFyIHF1ZXVlID0gW107XG4vLyBPbmNlIGEgZmx1c2ggaGFzIGJlZW4gcmVxdWVzdGVkLCBubyBmdXJ0aGVyIGNhbGxzIHRvIGByZXF1ZXN0Rmx1c2hgIGFyZVxuLy8gbmVjZXNzYXJ5IHVudGlsIHRoZSBuZXh0IGBmbHVzaGAgY29tcGxldGVzLlxudmFyIGZsdXNoaW5nID0gZmFsc2U7XG4vLyBgcmVxdWVzdEZsdXNoYCBpcyBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBtZXRob2QgdGhhdCBhdHRlbXB0cyB0byBraWNrXG4vLyBvZmYgYSBgZmx1c2hgIGV2ZW50IGFzIHF1aWNrbHkgYXMgcG9zc2libGUuIGBmbHVzaGAgd2lsbCBhdHRlbXB0IHRvIGV4aGF1c3Rcbi8vIHRoZSBldmVudCBxdWV1ZSBiZWZvcmUgeWllbGRpbmcgdG8gdGhlIGJyb3dzZXIncyBvd24gZXZlbnQgbG9vcC5cbnZhciByZXF1ZXN0Rmx1c2g7XG4vLyBUaGUgcG9zaXRpb24gb2YgdGhlIG5leHQgdGFzayB0byBleGVjdXRlIGluIHRoZSB0YXNrIHF1ZXVlLiBUaGlzIGlzXG4vLyBwcmVzZXJ2ZWQgYmV0d2VlbiBjYWxscyB0byBgZmx1c2hgIHNvIHRoYXQgaXQgY2FuIGJlIHJlc3VtZWQgaWZcbi8vIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLlxudmFyIGluZGV4ID0gMDtcbi8vIElmIGEgdGFzayBzY2hlZHVsZXMgYWRkaXRpb25hbCB0YXNrcyByZWN1cnNpdmVseSwgdGhlIHRhc2sgcXVldWUgY2FuIGdyb3dcbi8vIHVuYm91bmRlZC4gVG8gcHJldmVudCBtZW1vcnkgZXhoYXVzdGlvbiwgdGhlIHRhc2sgcXVldWUgd2lsbCBwZXJpb2RpY2FsbHlcbi8vIHRydW5jYXRlIGFscmVhZHktY29tcGxldGVkIHRhc2tzLlxudmFyIGNhcGFjaXR5ID0gMTAyNDtcblxuLy8gVGhlIGZsdXNoIGZ1bmN0aW9uIHByb2Nlc3NlcyBhbGwgdGFza3MgdGhhdCBoYXZlIGJlZW4gc2NoZWR1bGVkIHdpdGhcbi8vIGByYXdBc2FwYCB1bmxlc3MgYW5kIHVudGlsIG9uZSBvZiB0aG9zZSB0YXNrcyB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuLy8gSWYgYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24sIGBmbHVzaGAgZW5zdXJlcyB0aGF0IGl0cyBzdGF0ZSB3aWxsIHJlbWFpblxuLy8gY29uc2lzdGVudCBhbmQgd2lsbCByZXN1bWUgd2hlcmUgaXQgbGVmdCBvZmYgd2hlbiBjYWxsZWQgYWdhaW4uXG4vLyBIb3dldmVyLCBgZmx1c2hgIGRvZXMgbm90IG1ha2UgYW55IGFycmFuZ2VtZW50cyB0byBiZSBjYWxsZWQgYWdhaW4gaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAoaW5kZXggPCBxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBpbmRleCBiZWZvcmUgY2FsbGluZyB0aGUgdGFzay4gVGhpcyBlbnN1cmVzIHRoYXQgd2Ugd2lsbFxuICAgICAgICAvLyBiZWdpbiBmbHVzaGluZyBvbiB0aGUgbmV4dCB0YXNrIHRoZSB0YXNrIHRocm93cyBhbiBlcnJvci5cbiAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHF1ZXVlW2N1cnJlbnRJbmRleF0uY2FsbCgpO1xuICAgICAgICAvLyBQcmV2ZW50IGxlYWtpbmcgbWVtb3J5IGZvciBsb25nIGNoYWlucyBvZiByZWN1cnNpdmUgY2FsbHMgdG8gYGFzYXBgLlxuICAgICAgICAvLyBJZiB3ZSBjYWxsIGBhc2FwYCB3aXRoaW4gdGFza3Mgc2NoZWR1bGVkIGJ5IGBhc2FwYCwgdGhlIHF1ZXVlIHdpbGxcbiAgICAgICAgLy8gZ3JvdywgYnV0IHRvIGF2b2lkIGFuIE8obikgd2FsayBmb3IgZXZlcnkgdGFzayB3ZSBleGVjdXRlLCB3ZSBkb24ndFxuICAgICAgICAvLyBzaGlmdCB0YXNrcyBvZmYgdGhlIHF1ZXVlIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGV4ZWN1dGVkLlxuICAgICAgICAvLyBJbnN0ZWFkLCB3ZSBwZXJpb2RpY2FsbHkgc2hpZnQgMTAyNCB0YXNrcyBvZmYgdGhlIHF1ZXVlLlxuICAgICAgICBpZiAoaW5kZXggPiBjYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gTWFudWFsbHkgc2hpZnQgYWxsIHZhbHVlcyBzdGFydGluZyBhdCB0aGUgaW5kZXggYmFjayB0byB0aGVcbiAgICAgICAgICAgIC8vIGJlZ2lubmluZyBvZiB0aGUgcXVldWUuXG4gICAgICAgICAgICBmb3IgKHZhciBzY2FuID0gMCwgbmV3TGVuZ3RoID0gcXVldWUubGVuZ3RoIC0gaW5kZXg7IHNjYW4gPCBuZXdMZW5ndGg7IHNjYW4rKykge1xuICAgICAgICAgICAgICAgIHF1ZXVlW3NjYW5dID0gcXVldWVbc2NhbiArIGluZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCAtPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgIGluZGV4ID0gMDtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCBpcyBpbXBsZW1lbnRlZCB1c2luZyBhIHN0cmF0ZWd5IGJhc2VkIG9uIGRhdGEgY29sbGVjdGVkIGZyb21cbi8vIGV2ZXJ5IGF2YWlsYWJsZSBTYXVjZUxhYnMgU2VsZW5pdW0gd2ViIGRyaXZlciB3b3JrZXIgYXQgdGltZSBvZiB3cml0aW5nLlxuLy8gaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMW1HLTVVWUd1cDVxeEdkRU1Xa2hQNkJXQ3owNTNOVWIyRTFRb1VUVTE2dUEvZWRpdCNnaWQ9NzgzNzI0NTkzXG5cbi8vIFNhZmFyaSA2IGFuZCA2LjEgZm9yIGRlc2t0b3AsIGlQYWQsIGFuZCBpUGhvbmUgYXJlIHRoZSBvbmx5IGJyb3dzZXJzIHRoYXRcbi8vIGhhdmUgV2ViS2l0TXV0YXRpb25PYnNlcnZlciBidXQgbm90IHVuLXByZWZpeGVkIE11dGF0aW9uT2JzZXJ2ZXIuXG4vLyBNdXN0IHVzZSBgZ2xvYmFsYCBvciBgc2VsZmAgaW5zdGVhZCBvZiBgd2luZG93YCB0byB3b3JrIGluIGJvdGggZnJhbWVzIGFuZCB3ZWJcbi8vIHdvcmtlcnMuIGBnbG9iYWxgIGlzIGEgcHJvdmlzaW9uIG9mIEJyb3dzZXJpZnksIE1yLCBNcnMsIG9yIE1vcC5cblxuLyogZ2xvYmFscyBzZWxmICovXG52YXIgc2NvcGUgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogc2VsZjtcbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IHNjb3BlLk11dGF0aW9uT2JzZXJ2ZXIgfHwgc2NvcGUuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblxuLy8gTXV0YXRpb25PYnNlcnZlcnMgYXJlIGRlc2lyYWJsZSBiZWNhdXNlIHRoZXkgaGF2ZSBoaWdoIHByaW9yaXR5IGFuZCB3b3JrXG4vLyByZWxpYWJseSBldmVyeXdoZXJlIHRoZXkgYXJlIGltcGxlbWVudGVkLlxuLy8gVGhleSBhcmUgaW1wbGVtZW50ZWQgaW4gYWxsIG1vZGVybiBicm93c2Vycy5cbi8vXG4vLyAtIEFuZHJvaWQgNC00LjNcbi8vIC0gQ2hyb21lIDI2LTM0XG4vLyAtIEZpcmVmb3ggMTQtMjlcbi8vIC0gSW50ZXJuZXQgRXhwbG9yZXIgMTFcbi8vIC0gaVBhZCBTYWZhcmkgNi03LjFcbi8vIC0gaVBob25lIFNhZmFyaSA3LTcuMVxuLy8gLSBTYWZhcmkgNi03XG5pZiAodHlwZW9mIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG5cbi8vIE1lc3NhZ2VDaGFubmVscyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBnaXZlIGRpcmVjdCBhY2Nlc3MgdG8gdGhlIEhUTUxcbi8vIHRhc2sgcXVldWUsIGFyZSBpbXBsZW1lbnRlZCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMCwgU2FmYXJpIDUuMC0xLCBhbmQgT3BlcmFcbi8vIDExLTEyLCBhbmQgaW4gd2ViIHdvcmtlcnMgaW4gbWFueSBlbmdpbmVzLlxuLy8gQWx0aG91Z2ggbWVzc2FnZSBjaGFubmVscyB5aWVsZCB0byBhbnkgcXVldWVkIHJlbmRlcmluZyBhbmQgSU8gdGFza3MsIHRoZXlcbi8vIHdvdWxkIGJlIGJldHRlciB0aGFuIGltcG9zaW5nIHRoZSA0bXMgZGVsYXkgb2YgdGltZXJzLlxuLy8gSG93ZXZlciwgdGhleSBkbyBub3Qgd29yayByZWxpYWJseSBpbiBJbnRlcm5ldCBFeHBsb3JlciBvciBTYWZhcmkuXG5cbi8vIEludGVybmV0IEV4cGxvcmVyIDEwIGlzIHRoZSBvbmx5IGJyb3dzZXIgdGhhdCBoYXMgc2V0SW1tZWRpYXRlIGJ1dCBkb2VzXG4vLyBub3QgaGF2ZSBNdXRhdGlvbk9ic2VydmVycy5cbi8vIEFsdGhvdWdoIHNldEltbWVkaWF0ZSB5aWVsZHMgdG8gdGhlIGJyb3dzZXIncyByZW5kZXJlciwgaXQgd291bGQgYmVcbi8vIHByZWZlcnJhYmxlIHRvIGZhbGxpbmcgYmFjayB0byBzZXRUaW1lb3V0IHNpbmNlIGl0IGRvZXMgbm90IGhhdmVcbi8vIHRoZSBtaW5pbXVtIDRtcyBwZW5hbHR5LlxuLy8gVW5mb3J0dW5hdGVseSB0aGVyZSBhcHBlYXJzIHRvIGJlIGEgYnVnIGluIEludGVybmV0IEV4cGxvcmVyIDEwIE1vYmlsZSAoYW5kXG4vLyBEZXNrdG9wIHRvIGEgbGVzc2VyIGV4dGVudCkgdGhhdCByZW5kZXJzIGJvdGggc2V0SW1tZWRpYXRlIGFuZFxuLy8gTWVzc2FnZUNoYW5uZWwgdXNlbGVzcyBmb3IgdGhlIHB1cnBvc2VzIG9mIEFTQVAuXG4vLyBodHRwczovL2dpdGh1Yi5jb20va3Jpc2tvd2FsL3EvaXNzdWVzLzM5NlxuXG4vLyBUaW1lcnMgYXJlIGltcGxlbWVudGVkIHVuaXZlcnNhbGx5LlxuLy8gV2UgZmFsbCBiYWNrIHRvIHRpbWVycyBpbiB3b3JrZXJzIGluIG1vc3QgZW5naW5lcywgYW5kIGluIGZvcmVncm91bmRcbi8vIGNvbnRleHRzIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnMuXG4vLyBIb3dldmVyLCBub3RlIHRoYXQgZXZlbiB0aGlzIHNpbXBsZSBjYXNlIHJlcXVpcmVzIG51YW5jZXMgdG8gb3BlcmF0ZSBpbiBhXG4vLyBicm9hZCBzcGVjdHJ1bSBvZiBicm93c2Vycy5cbi8vXG4vLyAtIEZpcmVmb3ggMy0xM1xuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciA2LTlcbi8vIC0gaVBhZCBTYWZhcmkgNC4zXG4vLyAtIEx5bnggMi44Ljdcbn0gZWxzZSB7XG4gICAgcmVxdWVzdEZsdXNoID0gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGZsdXNoKTtcbn1cblxuLy8gYHJlcXVlc3RGbHVzaGAgcmVxdWVzdHMgdGhhdCB0aGUgaGlnaCBwcmlvcml0eSBldmVudCBxdWV1ZSBiZSBmbHVzaGVkIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLlxuLy8gVGhpcyBpcyB1c2VmdWwgdG8gcHJldmVudCBhbiBlcnJvciB0aHJvd24gaW4gYSB0YXNrIGZyb20gc3RhbGxpbmcgdGhlIGV2ZW50XG4vLyBxdWV1ZSBpZiB0aGUgZXhjZXB0aW9uIGhhbmRsZWQgYnkgTm9kZS5qc+KAmXNcbi8vIGBwcm9jZXNzLm9uKFwidW5jYXVnaHRFeGNlcHRpb25cIilgIG9yIGJ5IGEgZG9tYWluLlxucmF3QXNhcC5yZXF1ZXN0Rmx1c2ggPSByZXF1ZXN0Rmx1c2g7XG5cbi8vIFRvIHJlcXVlc3QgYSBoaWdoIHByaW9yaXR5IGV2ZW50LCB3ZSBpbmR1Y2UgYSBtdXRhdGlvbiBvYnNlcnZlciBieSB0b2dnbGluZ1xuLy8gdGhlIHRleHQgb2YgYSB0ZXh0IG5vZGUgYmV0d2VlbiBcIjFcIiBhbmQgXCItMVwiLlxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spIHtcbiAgICB2YXIgdG9nZ2xlID0gMTtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pO1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbiAgICAgICAgdG9nZ2xlID0gLXRvZ2dsZTtcbiAgICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlO1xuICAgIH07XG59XG5cbi8vIFRoZSBtZXNzYWdlIGNoYW5uZWwgdGVjaG5pcXVlIHdhcyBkaXNjb3ZlcmVkIGJ5IE1hbHRlIFVibCBhbmQgd2FzIHRoZVxuLy8gb3JpZ2luYWwgZm91bmRhdGlvbiBmb3IgdGhpcyBsaWJyYXJ5LlxuLy8gaHR0cDovL3d3dy5ub25ibG9ja2luZy5pby8yMDExLzA2L3dpbmRvd25leHR0aWNrLmh0bWxcblxuLy8gU2FmYXJpIDYuMC41IChhdCBsZWFzdCkgaW50ZXJtaXR0ZW50bHkgZmFpbHMgdG8gY3JlYXRlIG1lc3NhZ2UgcG9ydHMgb24gYVxuLy8gcGFnZSdzIGZpcnN0IGxvYWQuIFRoYW5rZnVsbHksIHRoaXMgdmVyc2lvbiBvZiBTYWZhcmkgc3VwcG9ydHNcbi8vIE11dGF0aW9uT2JzZXJ2ZXJzLCBzbyB3ZSBkb24ndCBuZWVkIHRvIGZhbGwgYmFjayBpbiB0aGF0IGNhc2UuXG5cbi8vIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21NZXNzYWdlQ2hhbm5lbChjYWxsYmFjaykge1xuLy8gICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4vLyAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBjYWxsYmFjaztcbi8vICAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4vLyAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4vLyAgICAgfTtcbi8vIH1cblxuLy8gRm9yIHJlYXNvbnMgZXhwbGFpbmVkIGFib3ZlLCB3ZSBhcmUgYWxzbyB1bmFibGUgdG8gdXNlIGBzZXRJbW1lZGlhdGVgXG4vLyB1bmRlciBhbnkgY2lyY3Vtc3RhbmNlcy5cbi8vIEV2ZW4gaWYgd2Ugd2VyZSwgdGhlcmUgaXMgYW5vdGhlciBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAuXG4vLyBJdCBpcyBub3Qgc3VmZmljaWVudCB0byBhc3NpZ24gYHNldEltbWVkaWF0ZWAgdG8gYHJlcXVlc3RGbHVzaGAgYmVjYXVzZVxuLy8gYHNldEltbWVkaWF0ZWAgbXVzdCBiZSBjYWxsZWQgKmJ5IG5hbWUqIGFuZCB0aGVyZWZvcmUgbXVzdCBiZSB3cmFwcGVkIGluIGFcbi8vIGNsb3N1cmUuXG4vLyBOZXZlciBmb3JnZXQuXG5cbi8vIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21TZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbi8vICAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4vLyAgICAgICAgIHNldEltbWVkaWF0ZShjYWxsYmFjayk7XG4vLyAgICAgfTtcbi8vIH1cblxuLy8gU2FmYXJpIDYuMCBoYXMgYSBwcm9ibGVtIHdoZXJlIHRpbWVycyB3aWxsIGdldCBsb3N0IHdoaWxlIHRoZSB1c2VyIGlzXG4vLyBzY3JvbGxpbmcuIFRoaXMgcHJvYmxlbSBkb2VzIG5vdCBpbXBhY3QgQVNBUCBiZWNhdXNlIFNhZmFyaSA2LjAgc3VwcG9ydHNcbi8vIG11dGF0aW9uIG9ic2VydmVycywgc28gdGhhdCBpbXBsZW1lbnRhdGlvbiBpcyB1c2VkIGluc3RlYWQuXG4vLyBIb3dldmVyLCBpZiB3ZSBldmVyIGVsZWN0IHRvIHVzZSB0aW1lcnMgaW4gU2FmYXJpLCB0aGUgcHJldmFsZW50IHdvcmstYXJvdW5kXG4vLyBpcyB0byBhZGQgYSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIgdGhhdCBjYWxscyBmb3IgYSBmbHVzaC5cblxuLy8gYHNldFRpbWVvdXRgIGRvZXMgbm90IGNhbGwgdGhlIHBhc3NlZCBjYWxsYmFjayBpZiB0aGUgZGVsYXkgaXMgbGVzcyB0aGFuXG4vLyBhcHByb3hpbWF0ZWx5IDcgaW4gd2ViIHdvcmtlcnMgaW4gRmlyZWZveCA4IHRocm91Z2ggMTgsIGFuZCBzb21ldGltZXMgbm90XG4vLyBldmVuIHRoZW4uXG5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcihjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbiAgICAgICAgLy8gV2UgZGlzcGF0Y2ggYSB0aW1lb3V0IHdpdGggYSBzcGVjaWZpZWQgZGVsYXkgb2YgMCBmb3IgZW5naW5lcyB0aGF0XG4gICAgICAgIC8vIGNhbiByZWxpYWJseSBhY2NvbW1vZGF0ZSB0aGF0IHJlcXVlc3QuIFRoaXMgd2lsbCB1c3VhbGx5IGJlIHNuYXBwZWRcbiAgICAgICAgLy8gdG8gYSA0IG1pbGlzZWNvbmQgZGVsYXksIGJ1dCBvbmNlIHdlJ3JlIGZsdXNoaW5nLCB0aGVyZSdzIG5vIGRlbGF5XG4gICAgICAgIC8vIGJldHdlZW4gZXZlbnRzLlxuICAgICAgICB2YXIgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoaGFuZGxlVGltZXIsIDApO1xuICAgICAgICAvLyBIb3dldmVyLCBzaW5jZSB0aGlzIHRpbWVyIGdldHMgZnJlcXVlbnRseSBkcm9wcGVkIGluIEZpcmVmb3hcbiAgICAgICAgLy8gd29ya2Vycywgd2UgZW5saXN0IGFuIGludGVydmFsIGhhbmRsZSB0aGF0IHdpbGwgdHJ5IHRvIGZpcmVcbiAgICAgICAgLy8gYW4gZXZlbnQgMjAgdGltZXMgcGVyIHNlY29uZCB1bnRpbCBpdCBzdWNjZWVkcy5cbiAgICAgICAgdmFyIGludGVydmFsSGFuZGxlID0gc2V0SW50ZXJ2YWwoaGFuZGxlVGltZXIsIDUwKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVUaW1lcigpIHtcbiAgICAgICAgICAgIC8vIFdoaWNoZXZlciB0aW1lciBzdWNjZWVkcyB3aWxsIGNhbmNlbCBib3RoIHRpbWVycyBhbmRcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgdGhlIGNhbGxiYWNrLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZSk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVGhpcyBpcyBmb3IgYGFzYXAuanNgIG9ubHkuXG4vLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXQgZGVwZW5kcyBvblxuLy8gaXRzIGV4aXN0ZW5jZS5cbnJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyID0gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyO1xuXG4vLyBBU0FQIHdhcyBvcmlnaW5hbGx5IGEgbmV4dFRpY2sgc2hpbSBpbmNsdWRlZCBpbiBRLiBUaGlzIHdhcyBmYWN0b3JlZCBvdXRcbi8vIGludG8gdGhpcyBBU0FQIHBhY2thZ2UuIEl0IHdhcyBsYXRlciBhZGFwdGVkIHRvIFJTVlAgd2hpY2ggbWFkZSBmdXJ0aGVyXG4vLyBhbWVuZG1lbnRzLiBUaGVzZSBkZWNpc2lvbnMsIHBhcnRpY3VsYXJseSB0byBtYXJnaW5hbGl6ZSBNZXNzYWdlQ2hhbm5lbCBhbmRcbi8vIHRvIGNhcHR1cmUgdGhlIE11dGF0aW9uT2JzZXJ2ZXIgaW1wbGVtZW50YXRpb24gaW4gYSBjbG9zdXJlLCB3ZXJlIGludGVncmF0ZWRcbi8vIGJhY2sgaW50byBBU0FQIHByb3Blci5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90aWxkZWlvL3JzdnAuanMvYmxvYi9jZGRmNzIzMjU0NmE5Y2Y4NTg1MjRiNzVjZGU2ZjllZGY3MjYyMGE3L2xpYi9yc3ZwL2FzYXAuanNcblxuLyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMTQpKSlcblxuLyoqKi8gfSksXG4vKiAxNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuLyoqKi8gfSksXG4vKiAxNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX187Ly8gTUlUIGxpY2Vuc2UgKGJ5IEVsYW4gU2hhbmtlcikuXG4oZnVuY3Rpb24oZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGV4ZWN1dGVTeW5jID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nKXtcbiAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgYXJncy5zcGxpY2UoMSkpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZXhlY3V0ZUFzeW5jID0gZnVuY3Rpb24oZm4pe1xuICAgIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzZXRJbW1lZGlhdGUoZm4pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MubmV4dFRpY2spIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZm4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIG1ha2VJdGVyYXRvciA9IGZ1bmN0aW9uICh0YXNrcykge1xuICAgIHZhciBtYWtlQ2FsbGJhY2sgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHZhciBmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgIHRhc2tzW2luZGV4XS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmbi5uZXh0KCk7XG4gICAgICB9O1xuICAgICAgZm4ubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChpbmRleCA8IHRhc2tzLmxlbmd0aCAtIDEpID8gbWFrZUNhbGxiYWNrKGluZGV4ICsgMSk6IG51bGw7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGZuO1xuICAgIH07XG4gICAgcmV0dXJuIG1ha2VDYWxsYmFjaygwKTtcbiAgfTtcbiAgXG4gIHZhciBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24obWF5YmVBcnJheSl7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtYXliZUFycmF5KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICB2YXIgd2F0ZXJmYWxsID0gZnVuY3Rpb24gKHRhc2tzLCBjYWxsYmFjaywgZm9yY2VBc3luYykge1xuICAgIHZhciBuZXh0VGljayA9IGZvcmNlQXN5bmMgPyBleGVjdXRlQXN5bmMgOiBleGVjdXRlU3luYztcbiAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuICAgIGlmICghX2lzQXJyYXkodGFza3MpKSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byB3YXRlcmZhbGwgbXVzdCBiZSBhbiBhcnJheSBvZiBmdW5jdGlvbnMnKTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgIH1cbiAgICBpZiAoIXRhc2tzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHZhciB3cmFwSXRlcmF0b3IgPSBmdW5jdGlvbiAoaXRlcmF0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgIHZhciBuZXh0ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICBhcmdzLnB1c2god3JhcEl0ZXJhdG9yKG5leHQpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0b3IuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB3cmFwSXRlcmF0b3IobWFrZUl0ZXJhdG9yKHRhc2tzKSkoKTtcbiAgfTtcblxuICBpZiAodHJ1ZSkge1xuICAgICEoX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyA9IFtdLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gd2F0ZXJmYWxsO1xuICAgIH0pLmFwcGx5KGV4cG9ydHMsIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18pLFxuXHRcdFx0XHRfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyAhPT0gdW5kZWZpbmVkICYmIChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKSk7IC8vIFJlcXVpcmVKU1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3YXRlcmZhbGw7IC8vIENvbW1vbkpTXG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFscy53YXRlcmZhbGwgPSB3YXRlcmZhbGw7IC8vIDxzY3JpcHQ+XG4gIH1cbn0pKHRoaXMpO1xuXG5cbi8qKiovIH0pLFxuLyogMTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIG5vZGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBzeW0gPSAwO1xuXG5mdW5jdGlvbiBnZW5zeW0oKSB7XG4gIHJldHVybiAnaG9sZV8nICsgc3ltKys7XG59IC8vIGNvcHktb24td3JpdGUgdmVyc2lvbiBvZiBtYXBcblxuXG5mdW5jdGlvbiBtYXBDT1coYXJyLCBmdW5jKSB7XG4gIHZhciByZXMgPSBudWxsO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBmdW5jKGFycltpXSk7XG5cbiAgICBpZiAoaXRlbSAhPT0gYXJyW2ldKSB7XG4gICAgICBpZiAoIXJlcykge1xuICAgICAgICByZXMgPSBhcnIuc2xpY2UoKTtcbiAgICAgIH1cblxuICAgICAgcmVzW2ldID0gaXRlbTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzIHx8IGFycjtcbn1cblxuZnVuY3Rpb24gd2Fsayhhc3QsIGZ1bmMsIGRlcHRoRmlyc3QpIHtcbiAgaWYgKCEoYXN0IGluc3RhbmNlb2Ygbm9kZXMuTm9kZSkpIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgaWYgKCFkZXB0aEZpcnN0KSB7XG4gICAgdmFyIGFzdFQgPSBmdW5jKGFzdCk7XG5cbiAgICBpZiAoYXN0VCAmJiBhc3RUICE9PSBhc3QpIHtcbiAgICAgIHJldHVybiBhc3RUO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhc3QgaW5zdGFuY2VvZiBub2Rlcy5Ob2RlTGlzdCkge1xuICAgIHZhciBjaGlsZHJlbiA9IG1hcENPVyhhc3QuY2hpbGRyZW4sIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gd2Fsayhub2RlLCBmdW5jLCBkZXB0aEZpcnN0KTtcbiAgICB9KTtcblxuICAgIGlmIChjaGlsZHJlbiAhPT0gYXN0LmNoaWxkcmVuKSB7XG4gICAgICBhc3QgPSBuZXcgbm9kZXNbYXN0LnR5cGVuYW1lXShhc3QubGluZW5vLCBhc3QuY29sbm8sIGNoaWxkcmVuKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXN0IGluc3RhbmNlb2Ygbm9kZXMuQ2FsbEV4dGVuc2lvbikge1xuICAgIHZhciBhcmdzID0gd2Fsayhhc3QuYXJncywgZnVuYywgZGVwdGhGaXJzdCk7XG4gICAgdmFyIGNvbnRlbnRBcmdzID0gbWFwQ09XKGFzdC5jb250ZW50QXJncywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiB3YWxrKG5vZGUsIGZ1bmMsIGRlcHRoRmlyc3QpO1xuICAgIH0pO1xuXG4gICAgaWYgKGFyZ3MgIT09IGFzdC5hcmdzIHx8IGNvbnRlbnRBcmdzICE9PSBhc3QuY29udGVudEFyZ3MpIHtcbiAgICAgIGFzdCA9IG5ldyBub2Rlc1thc3QudHlwZW5hbWVdKGFzdC5leHROYW1lLCBhc3QucHJvcCwgYXJncywgY29udGVudEFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgcHJvcHMgPSBhc3QuZmllbGRzLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgIHJldHVybiBhc3RbZmllbGRdO1xuICAgIH0pO1xuICAgIHZhciBwcm9wc1QgPSBtYXBDT1cocHJvcHMsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICByZXR1cm4gd2Fsayhwcm9wLCBmdW5jLCBkZXB0aEZpcnN0KTtcbiAgICB9KTtcblxuICAgIGlmIChwcm9wc1QgIT09IHByb3BzKSB7XG4gICAgICBhc3QgPSBuZXcgbm9kZXNbYXN0LnR5cGVuYW1lXShhc3QubGluZW5vLCBhc3QuY29sbm8pO1xuICAgICAgcHJvcHNULmZvckVhY2goZnVuY3Rpb24gKHByb3AsIGkpIHtcbiAgICAgICAgYXN0W2FzdC5maWVsZHNbaV1dID0gcHJvcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkZXB0aEZpcnN0ID8gZnVuYyhhc3QpIHx8IGFzdCA6IGFzdDtcbn1cblxuZnVuY3Rpb24gZGVwdGhXYWxrKGFzdCwgZnVuYykge1xuICByZXR1cm4gd2Fsayhhc3QsIGZ1bmMsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBfbGlmdEZpbHRlcnMobm9kZSwgYXN5bmNGaWx0ZXJzLCBwcm9wKSB7XG4gIHZhciBjaGlsZHJlbiA9IFtdO1xuICB2YXIgd2Fsa2VkID0gZGVwdGhXYWxrKHByb3AgPyBub2RlW3Byb3BdIDogbm9kZSwgZnVuY3Rpb24gKGRlc2NOb2RlKSB7XG4gICAgdmFyIHN5bWJvbDtcblxuICAgIGlmIChkZXNjTm9kZSBpbnN0YW5jZW9mIG5vZGVzLkJsb2NrKSB7XG4gICAgICByZXR1cm4gZGVzY05vZGU7XG4gICAgfSBlbHNlIGlmIChkZXNjTm9kZSBpbnN0YW5jZW9mIG5vZGVzLkZpbHRlciAmJiBsaWIuaW5kZXhPZihhc3luY0ZpbHRlcnMsIGRlc2NOb2RlLm5hbWUudmFsdWUpICE9PSAtMSB8fCBkZXNjTm9kZSBpbnN0YW5jZW9mIG5vZGVzLkNhbGxFeHRlbnNpb25Bc3luYykge1xuICAgICAgc3ltYm9sID0gbmV3IG5vZGVzLlN5bWJvbChkZXNjTm9kZS5saW5lbm8sIGRlc2NOb2RlLmNvbG5vLCBnZW5zeW0oKSk7XG4gICAgICBjaGlsZHJlbi5wdXNoKG5ldyBub2Rlcy5GaWx0ZXJBc3luYyhkZXNjTm9kZS5saW5lbm8sIGRlc2NOb2RlLmNvbG5vLCBkZXNjTm9kZS5uYW1lLCBkZXNjTm9kZS5hcmdzLCBzeW1ib2wpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ltYm9sO1xuICB9KTtcblxuICBpZiAocHJvcCkge1xuICAgIG5vZGVbcHJvcF0gPSB3YWxrZWQ7XG4gIH0gZWxzZSB7XG4gICAgbm9kZSA9IHdhbGtlZDtcbiAgfVxuXG4gIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICBjaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgIHJldHVybiBuZXcgbm9kZXMuTm9kZUxpc3Qobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIGNoaWxkcmVuKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsaWZ0RmlsdGVycyhhc3QsIGFzeW5jRmlsdGVycykge1xuICByZXR1cm4gZGVwdGhXYWxrKGFzdCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLk91dHB1dCkge1xuICAgICAgcmV0dXJuIF9saWZ0RmlsdGVycyhub2RlLCBhc3luY0ZpbHRlcnMpO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLlNldCkge1xuICAgICAgcmV0dXJuIF9saWZ0RmlsdGVycyhub2RlLCBhc3luY0ZpbHRlcnMsICd2YWx1ZScpO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLkZvcikge1xuICAgICAgcmV0dXJuIF9saWZ0RmlsdGVycyhub2RlLCBhc3luY0ZpbHRlcnMsICdhcnInKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5JZikge1xuICAgICAgcmV0dXJuIF9saWZ0RmlsdGVycyhub2RlLCBhc3luY0ZpbHRlcnMsICdjb25kJyk7XG4gICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuQ2FsbEV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIF9saWZ0RmlsdGVycyhub2RlLCBhc3luY0ZpbHRlcnMsICdhcmdzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gbGlmdFN1cGVyKGFzdCkge1xuICByZXR1cm4gd2Fsayhhc3QsIGZ1bmN0aW9uIChibG9ja05vZGUpIHtcbiAgICBpZiAoIShibG9ja05vZGUgaW5zdGFuY2VvZiBub2Rlcy5CbG9jaykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaGFzU3VwZXIgPSBmYWxzZTtcbiAgICB2YXIgc3ltYm9sID0gZ2Vuc3ltKCk7XG4gICAgYmxvY2tOb2RlLmJvZHkgPSB3YWxrKGJsb2NrTm9kZS5ib2R5LCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5GdW5DYWxsICYmIG5vZGUubmFtZS52YWx1ZSA9PT0gJ3N1cGVyJykge1xuICAgICAgICBoYXNTdXBlciA9IHRydWU7XG4gICAgICAgIHJldHVybiBuZXcgbm9kZXMuU3ltYm9sKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBzeW1ib2wpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGhhc1N1cGVyKSB7XG4gICAgICBibG9ja05vZGUuYm9keS5jaGlsZHJlbi51bnNoaWZ0KG5ldyBub2Rlcy5TdXBlcigwLCAwLCBibG9ja05vZGUubmFtZSwgbmV3IG5vZGVzLlN5bWJvbCgwLCAwLCBzeW1ib2wpKSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY29udmVydFN0YXRlbWVudHMoYXN0KSB7XG4gIHJldHVybiBkZXB0aFdhbGsoYXN0LCBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5JZikgJiYgIShub2RlIGluc3RhbmNlb2Ygbm9kZXMuRm9yKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgYXN5bmMgPSBmYWxzZTtcbiAgICB3YWxrKG5vZGUsIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2Ygbm9kZXMuRmlsdGVyQXN5bmMgfHwgY2hpbGQgaW5zdGFuY2VvZiBub2Rlcy5JZkFzeW5jIHx8IGNoaWxkIGluc3RhbmNlb2Ygbm9kZXMuQXN5bmNFYWNoIHx8IGNoaWxkIGluc3RhbmNlb2Ygbm9kZXMuQXN5bmNBbGwgfHwgY2hpbGQgaW5zdGFuY2VvZiBub2Rlcy5DYWxsRXh0ZW5zaW9uQXN5bmMpIHtcbiAgICAgICAgYXN5bmMgPSB0cnVlOyAvLyBTdG9wIGl0ZXJhdGluZyBieSByZXR1cm5pbmcgdGhlIG5vZGVcblxuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuSWYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBub2Rlcy5JZkFzeW5jKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLmNvbmQsIG5vZGUuYm9keSwgbm9kZS5lbHNlXyk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5Gb3IgJiYgIShub2RlIGluc3RhbmNlb2Ygbm9kZXMuQXN5bmNBbGwpKSB7XG4gICAgICAgIHJldHVybiBuZXcgbm9kZXMuQXN5bmNFYWNoKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLmFyciwgbm9kZS5uYW1lLCBub2RlLmJvZHksIG5vZGUuZWxzZV8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcHMoYXN0LCBhc3luY0ZpbHRlcnMpIHtcbiAgcmV0dXJuIGNvbnZlcnRTdGF0ZW1lbnRzKGxpZnRTdXBlcihsaWZ0RmlsdGVycyhhc3QsIGFzeW5jRmlsdGVycykpKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtKGFzdCwgYXN5bmNGaWx0ZXJzKSB7XG4gIHJldHVybiBjcHMoYXN0LCBhc3luY0ZpbHRlcnMgfHwgW10pO1xufSAvLyB2YXIgcGFyc2VyID0gcmVxdWlyZSgnLi9wYXJzZXInKTtcbi8vIHZhciBzcmMgPSAnaGVsbG8geyUgZm9vICV9eyUgZW5kZm9vICV9IGVuZCc7XG4vLyB2YXIgYXN0ID0gdHJhbnNmb3JtKHBhcnNlci5wYXJzZShzcmMsIFtuZXcgRm9vRXh0ZW5zaW9uKCldKSwgWydiYXInXSk7XG4vLyBub2Rlcy5wcmludE5vZGVzKGFzdCk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRyYW5zZm9ybTogdHJhbnNmb3JtXG59O1xuXG4vKioqLyB9KSxcbi8qIDE3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBsaWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgciA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuZnVuY3Rpb24gbm9ybWFsaXplKHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0cy5hYnMgPSBNYXRoLmFicztcblxuZnVuY3Rpb24gaXNOYU4obnVtKSB7XG4gIHJldHVybiBudW0gIT09IG51bTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuZnVuY3Rpb24gYmF0Y2goYXJyLCBsaW5lY291bnQsIGZpbGxXaXRoKSB7XG4gIHZhciBpO1xuICB2YXIgcmVzID0gW107XG4gIHZhciB0bXAgPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgJSBsaW5lY291bnQgPT09IDAgJiYgdG1wLmxlbmd0aCkge1xuICAgICAgcmVzLnB1c2godG1wKTtcbiAgICAgIHRtcCA9IFtdO1xuICAgIH1cblxuICAgIHRtcC5wdXNoKGFycltpXSk7XG4gIH1cblxuICBpZiAodG1wLmxlbmd0aCkge1xuICAgIGlmIChmaWxsV2l0aCkge1xuICAgICAgZm9yIChpID0gdG1wLmxlbmd0aDsgaSA8IGxpbmVjb3VudDsgaSsrKSB7XG4gICAgICAgIHRtcC5wdXNoKGZpbGxXaXRoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXMucHVzaCh0bXApO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0cy5iYXRjaCA9IGJhdGNoO1xuXG5mdW5jdGlvbiBjYXBpdGFsaXplKHN0cikge1xuICBzdHIgPSBub3JtYWxpemUoc3RyLCAnJyk7XG4gIHZhciByZXQgPSBzdHIudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKHN0ciwgcmV0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmV0LnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0cy5jYXBpdGFsaXplID0gY2FwaXRhbGl6ZTtcblxuZnVuY3Rpb24gY2VudGVyKHN0ciwgd2lkdGgpIHtcbiAgc3RyID0gbm9ybWFsaXplKHN0ciwgJycpO1xuICB3aWR0aCA9IHdpZHRoIHx8IDgwO1xuXG4gIGlmIChzdHIubGVuZ3RoID49IHdpZHRoKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHZhciBzcGFjZXMgPSB3aWR0aCAtIHN0ci5sZW5ndGg7XG4gIHZhciBwcmUgPSBsaWIucmVwZWF0KCcgJywgc3BhY2VzIC8gMiAtIHNwYWNlcyAlIDIpO1xuICB2YXIgcG9zdCA9IGxpYi5yZXBlYXQoJyAnLCBzcGFjZXMgLyAyKTtcbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKHN0ciwgcHJlICsgc3RyICsgcG9zdCk7XG59XG5cbmV4cG9ydHMuY2VudGVyID0gY2VudGVyO1xuXG5mdW5jdGlvbiBkZWZhdWx0Xyh2YWwsIGRlZiwgYm9vbCkge1xuICBpZiAoYm9vbCkge1xuICAgIHJldHVybiB2YWwgfHwgZGVmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/IHZhbCA6IGRlZjtcbiAgfVxufSAvLyBUT0RPOiBpdCBpcyBjb25mdXNpbmcgdG8gZXhwb3J0IHNvbWV0aGluZyBjYWxsZWQgJ2RlZmF1bHQnXG5cblxuZXhwb3J0c1snZGVmYXVsdCddID0gZGVmYXVsdF87IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG5cbmZ1bmN0aW9uIGRpY3Rzb3J0KHZhbCwgY2FzZVNlbnNpdGl2ZSwgYnkpIHtcbiAgaWYgKCFsaWIuaXNPYmplY3QodmFsKSkge1xuICAgIHRocm93IG5ldyBsaWIuVGVtcGxhdGVFcnJvcignZGljdHNvcnQgZmlsdGVyOiB2YWwgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIHZhciBhcnJheSA9IFtdOyAvLyBkZWxpYmVyYXRlbHkgaW5jbHVkZSBwcm9wZXJ0aWVzIGZyb20gdGhlIG9iamVjdCdzIHByb3RvdHlwZVxuXG4gIGZvciAodmFyIGsgaW4gdmFsKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBndWFyZC1mb3ItaW4sIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgYXJyYXkucHVzaChbaywgdmFsW2tdXSk7XG4gIH1cblxuICB2YXIgc2k7XG5cbiAgaWYgKGJ5ID09PSB1bmRlZmluZWQgfHwgYnkgPT09ICdrZXknKSB7XG4gICAgc2kgPSAwO1xuICB9IGVsc2UgaWYgKGJ5ID09PSAndmFsdWUnKSB7XG4gICAgc2kgPSAxO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBsaWIuVGVtcGxhdGVFcnJvcignZGljdHNvcnQgZmlsdGVyOiBZb3UgY2FuIG9ubHkgc29ydCBieSBlaXRoZXIga2V5IG9yIHZhbHVlJyk7XG4gIH1cblxuICBhcnJheS5zb3J0KGZ1bmN0aW9uICh0MSwgdDIpIHtcbiAgICB2YXIgYSA9IHQxW3NpXTtcbiAgICB2YXIgYiA9IHQyW3NpXTtcblxuICAgIGlmICghY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgaWYgKGxpYi5pc1N0cmluZyhhKSkge1xuICAgICAgICBhID0gYS50b1VwcGVyQ2FzZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAobGliLmlzU3RyaW5nKGIpKSB7XG4gICAgICAgIGIgPSBiLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGEgPiBiID8gMSA6IGEgPT09IGIgPyAwIDogLTE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgfSk7XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0cy5kaWN0c29ydCA9IGRpY3Rzb3J0O1xuXG5mdW5jdGlvbiBkdW1wKG9iaiwgc3BhY2VzKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIHNwYWNlcyk7XG59XG5cbmV4cG9ydHMuZHVtcCA9IGR1bXA7XG5cbmZ1bmN0aW9uIGVzY2FwZShzdHIpIHtcbiAgaWYgKHN0ciBpbnN0YW5jZW9mIHIuU2FmZVN0cmluZykge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBzdHIgPSBzdHIgPT09IG51bGwgfHwgc3RyID09PSB1bmRlZmluZWQgPyAnJyA6IHN0cjtcbiAgcmV0dXJuIHIubWFya1NhZmUobGliLmVzY2FwZShzdHIudG9TdHJpbmcoKSkpO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGVzY2FwZTtcblxuZnVuY3Rpb24gc2FmZShzdHIpIHtcbiAgaWYgKHN0ciBpbnN0YW5jZW9mIHIuU2FmZVN0cmluZykge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBzdHIgPSBzdHIgPT09IG51bGwgfHwgc3RyID09PSB1bmRlZmluZWQgPyAnJyA6IHN0cjtcbiAgcmV0dXJuIHIubWFya1NhZmUoc3RyLnRvU3RyaW5nKCkpO1xufVxuXG5leHBvcnRzLnNhZmUgPSBzYWZlO1xuXG5mdW5jdGlvbiBmaXJzdChhcnIpIHtcbiAgcmV0dXJuIGFyclswXTtcbn1cblxuZXhwb3J0cy5maXJzdCA9IGZpcnN0O1xuXG5mdW5jdGlvbiBncm91cGJ5KGFyciwgYXR0cikge1xuICByZXR1cm4gbGliLmdyb3VwQnkoYXJyLCBhdHRyKTtcbn1cblxuZXhwb3J0cy5ncm91cGJ5ID0gZ3JvdXBieTtcblxuZnVuY3Rpb24gaW5kZW50KHN0ciwgd2lkdGgsIGluZGVudGZpcnN0KSB7XG4gIHN0ciA9IG5vcm1hbGl6ZShzdHIsICcnKTtcblxuICBpZiAoc3RyID09PSAnJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHdpZHRoID0gd2lkdGggfHwgNDsgLy8gbGV0IHJlcyA9ICcnO1xuXG4gIHZhciBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJyk7XG4gIHZhciBzcCA9IGxpYi5yZXBlYXQoJyAnLCB3aWR0aCk7XG4gIHZhciByZXMgPSBsaW5lcy5tYXAoZnVuY3Rpb24gKGwsIGkpIHtcbiAgICByZXR1cm4gaSA9PT0gMCAmJiAhaW5kZW50Zmlyc3QgPyBsICsgXCJcXG5cIiA6IFwiXCIgKyBzcCArIGwgKyBcIlxcblwiO1xuICB9KS5qb2luKCcnKTtcbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKHN0ciwgcmVzKTtcbn1cblxuZXhwb3J0cy5pbmRlbnQgPSBpbmRlbnQ7XG5cbmZ1bmN0aW9uIGpvaW4oYXJyLCBkZWwsIGF0dHIpIHtcbiAgZGVsID0gZGVsIHx8ICcnO1xuXG4gIGlmIChhdHRyKSB7XG4gICAgYXJyID0gbGliLm1hcChhcnIsIGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gdlthdHRyXTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBhcnIuam9pbihkZWwpO1xufVxuXG5leHBvcnRzLmpvaW4gPSBqb2luO1xuXG5mdW5jdGlvbiBsYXN0KGFycikge1xuICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXTtcbn1cblxuZXhwb3J0cy5sYXN0ID0gbGFzdDtcblxuZnVuY3Rpb24gbGVuZ3RoRmlsdGVyKHZhbCkge1xuICB2YXIgdmFsdWUgPSBub3JtYWxpemUodmFsLCAnJyk7XG5cbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB0eXBlb2YgU2V0ID09PSAnZnVuY3Rpb24nICYmIHZhbHVlIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAvLyBFQ01BU2NyaXB0IDIwMTUgTWFwcyBhbmQgU2V0c1xuICAgICAgcmV0dXJuIHZhbHVlLnNpemU7XG4gICAgfVxuXG4gICAgaWYgKGxpYi5pc09iamVjdCh2YWx1ZSkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIHIuU2FmZVN0cmluZykpIHtcbiAgICAgIC8vIE9iamVjdHMgKGJlc2lkZXMgU2FmZVN0cmluZ3MpLCBub24tcHJpbWF0aXZlIEFycmF5c1xuICAgICAgcmV0dXJuIGxpYi5rZXlzKHZhbHVlKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5leHBvcnRzLmxlbmd0aCA9IGxlbmd0aEZpbHRlcjtcblxuZnVuY3Rpb24gbGlzdCh2YWwpIHtcbiAgaWYgKGxpYi5pc1N0cmluZyh2YWwpKSB7XG4gICAgcmV0dXJuIHZhbC5zcGxpdCgnJyk7XG4gIH0gZWxzZSBpZiAobGliLmlzT2JqZWN0KHZhbCkpIHtcbiAgICByZXR1cm4gbGliLl9lbnRyaWVzKHZhbCB8fCB7fSkubWFwKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICB2YXIga2V5ID0gX3JlZlswXSxcbiAgICAgICAgICB2YWx1ZSA9IF9yZWZbMV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9O1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKGxpYi5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBsaWIuVGVtcGxhdGVFcnJvcignbGlzdCBmaWx0ZXI6IHR5cGUgbm90IGl0ZXJhYmxlJyk7XG4gIH1cbn1cblxuZXhwb3J0cy5saXN0ID0gbGlzdDtcblxuZnVuY3Rpb24gbG93ZXIoc3RyKSB7XG4gIHN0ciA9IG5vcm1hbGl6ZShzdHIsICcnKTtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpO1xufVxuXG5leHBvcnRzLmxvd2VyID0gbG93ZXI7XG5cbmZ1bmN0aW9uIG5sMmJyKHN0cikge1xuICBpZiAoc3RyID09PSBudWxsIHx8IHN0ciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKHN0ciwgc3RyLnJlcGxhY2UoL1xcclxcbnxcXG4vZywgJzxiciAvPlxcbicpKTtcbn1cblxuZXhwb3J0cy5ubDJiciA9IG5sMmJyO1xuXG5mdW5jdGlvbiByYW5kb20oYXJyKSB7XG4gIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xufVxuXG5leHBvcnRzLnJhbmRvbSA9IHJhbmRvbTtcblxuZnVuY3Rpb24gcmVqZWN0YXR0cihhcnIsIGF0dHIpIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gIWl0ZW1bYXR0cl07XG4gIH0pO1xufVxuXG5leHBvcnRzLnJlamVjdGF0dHIgPSByZWplY3RhdHRyO1xuXG5mdW5jdGlvbiBzZWxlY3RhdHRyKGFyciwgYXR0cikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiAhIWl0ZW1bYXR0cl07XG4gIH0pO1xufVxuXG5leHBvcnRzLnNlbGVjdGF0dHIgPSBzZWxlY3RhdHRyO1xuXG5mdW5jdGlvbiByZXBsYWNlKHN0ciwgb2xkLCBuZXdfLCBtYXhDb3VudCkge1xuICB2YXIgb3JpZ2luYWxTdHIgPSBzdHI7XG5cbiAgaWYgKG9sZCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShvbGQsIG5ld18pO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBtYXhDb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtYXhDb3VudCA9IC0xO1xuICB9XG5cbiAgdmFyIHJlcyA9ICcnOyAvLyBPdXRwdXRcbiAgLy8gQ2FzdCBOdW1iZXJzIGluIHRoZSBzZWFyY2ggdGVybSB0byBzdHJpbmdcblxuICBpZiAodHlwZW9mIG9sZCA9PT0gJ251bWJlcicpIHtcbiAgICBvbGQgPSAnJyArIG9sZDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb2xkICE9PSAnc3RyaW5nJykge1xuICAgIC8vIElmIGl0IGlzIHNvbWV0aGluZyBvdGhlciB0aGFuIG51bWJlciBvciBzdHJpbmcsXG4gICAgLy8gcmV0dXJuIHRoZSBvcmlnaW5hbCBzdHJpbmdcbiAgICByZXR1cm4gc3RyO1xuICB9IC8vIENhc3QgbnVtYmVycyBpbiB0aGUgcmVwbGFjZW1lbnQgdG8gc3RyaW5nXG5cblxuICBpZiAodHlwZW9mIHN0ciA9PT0gJ251bWJlcicpIHtcbiAgICBzdHIgPSAnJyArIHN0cjtcbiAgfSAvLyBJZiBieSBub3csIHdlIGRvbid0IGhhdmUgYSBzdHJpbmcsIHRocm93IGl0IGJhY2tcblxuXG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyAmJiAhKHN0ciBpbnN0YW5jZW9mIHIuU2FmZVN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9IC8vIFNob3J0Q2lyY3VpdHNcblxuXG4gIGlmIChvbGQgPT09ICcnKSB7XG4gICAgLy8gTWltaWMgdGhlIHB5dGhvbiBiZWhhdmlvdXI6IGVtcHR5IHN0cmluZyBpcyByZXBsYWNlZFxuICAgIC8vIGJ5IHJlcGxhY2VtZW50IGUuZy4gXCJhYmNcInxyZXBsYWNlKFwiXCIsIFwiLlwiKSAtPiAuYS5iLmMuXG4gICAgcmVzID0gbmV3XyArIHN0ci5zcGxpdCgnJykuam9pbihuZXdfKSArIG5ld187XG4gICAgcmV0dXJuIHIuY29weVNhZmVuZXNzKHN0ciwgcmVzKTtcbiAgfVxuXG4gIHZhciBuZXh0SW5kZXggPSBzdHIuaW5kZXhPZihvbGQpOyAvLyBpZiAjIG9mIHJlcGxhY2VtZW50cyB0byBwZXJmb3JtIGlzIDAsIG9yIHRoZSBzdHJpbmcgdG8gZG9lc1xuICAvLyBub3QgY29udGFpbiB0aGUgb2xkIHZhbHVlLCByZXR1cm4gdGhlIHN0cmluZ1xuXG4gIGlmIChtYXhDb3VudCA9PT0gMCB8fCBuZXh0SW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHZhciBwb3MgPSAwO1xuICB2YXIgY291bnQgPSAwOyAvLyAjIG9mIHJlcGxhY2VtZW50cyBtYWRlXG5cbiAgd2hpbGUgKG5leHRJbmRleCA+IC0xICYmIChtYXhDb3VudCA9PT0gLTEgfHwgY291bnQgPCBtYXhDb3VudCkpIHtcbiAgICAvLyBHcmFiIHRoZSBuZXh0IGNodW5rIG9mIHNyYyBzdHJpbmcgYW5kIGFkZCBpdCB3aXRoIHRoZVxuICAgIC8vIHJlcGxhY2VtZW50LCB0byB0aGUgcmVzdWx0XG4gICAgcmVzICs9IHN0ci5zdWJzdHJpbmcocG9zLCBuZXh0SW5kZXgpICsgbmV3XzsgLy8gSW5jcmVtZW50IG91ciBwb2ludGVyIGluIHRoZSBzcmMgc3RyaW5nXG5cbiAgICBwb3MgPSBuZXh0SW5kZXggKyBvbGQubGVuZ3RoO1xuICAgIGNvdW50Kys7IC8vIFNlZSBpZiB0aGVyZSBhcmUgYW55IG1vcmUgcmVwbGFjZW1lbnRzIHRvIGJlIG1hZGVcblxuICAgIG5leHRJbmRleCA9IHN0ci5pbmRleE9mKG9sZCwgcG9zKTtcbiAgfSAvLyBXZSd2ZSBlaXRoZXIgcmVhY2hlZCB0aGUgZW5kLCBvciBkb25lIHRoZSBtYXggIyBvZlxuICAvLyByZXBsYWNlbWVudHMsIHRhY2sgb24gYW55IHJlbWFpbmluZyBzdHJpbmdcblxuXG4gIGlmIChwb3MgPCBzdHIubGVuZ3RoKSB7XG4gICAgcmVzICs9IHN0ci5zdWJzdHJpbmcocG9zKTtcbiAgfVxuXG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhvcmlnaW5hbFN0ciwgcmVzKTtcbn1cblxuZXhwb3J0cy5yZXBsYWNlID0gcmVwbGFjZTtcblxuZnVuY3Rpb24gcmV2ZXJzZSh2YWwpIHtcbiAgdmFyIGFycjtcblxuICBpZiAobGliLmlzU3RyaW5nKHZhbCkpIHtcbiAgICBhcnIgPSBsaXN0KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQ29weSBpdFxuICAgIGFyciA9IGxpYi5tYXAodmFsLCBmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfSk7XG4gIH1cblxuICBhcnIucmV2ZXJzZSgpO1xuXG4gIGlmIChsaWIuaXNTdHJpbmcodmFsKSkge1xuICAgIHJldHVybiByLmNvcHlTYWZlbmVzcyh2YWwsIGFyci5qb2luKCcnKSk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnRzLnJldmVyc2UgPSByZXZlcnNlO1xuXG5mdW5jdGlvbiByb3VuZCh2YWwsIHByZWNpc2lvbiwgbWV0aG9kKSB7XG4gIHByZWNpc2lvbiA9IHByZWNpc2lvbiB8fCAwO1xuICB2YXIgZmFjdG9yID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG4gIHZhciByb3VuZGVyO1xuXG4gIGlmIChtZXRob2QgPT09ICdjZWlsJykge1xuICAgIHJvdW5kZXIgPSBNYXRoLmNlaWw7XG4gIH0gZWxzZSBpZiAobWV0aG9kID09PSAnZmxvb3InKSB7XG4gICAgcm91bmRlciA9IE1hdGguZmxvb3I7XG4gIH0gZWxzZSB7XG4gICAgcm91bmRlciA9IE1hdGgucm91bmQ7XG4gIH1cblxuICByZXR1cm4gcm91bmRlcih2YWwgKiBmYWN0b3IpIC8gZmFjdG9yO1xufVxuXG5leHBvcnRzLnJvdW5kID0gcm91bmQ7XG5cbmZ1bmN0aW9uIHNsaWNlKGFyciwgc2xpY2VzLCBmaWxsV2l0aCkge1xuICB2YXIgc2xpY2VMZW5ndGggPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyBzbGljZXMpO1xuICB2YXIgZXh0cmEgPSBhcnIubGVuZ3RoICUgc2xpY2VzO1xuICB2YXIgcmVzID0gW107XG4gIHZhciBvZmZzZXQgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VzOyBpKyspIHtcbiAgICB2YXIgc3RhcnQgPSBvZmZzZXQgKyBpICogc2xpY2VMZW5ndGg7XG5cbiAgICBpZiAoaSA8IGV4dHJhKSB7XG4gICAgICBvZmZzZXQrKztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gb2Zmc2V0ICsgKGkgKyAxKSAqIHNsaWNlTGVuZ3RoO1xuICAgIHZhciBjdXJyU2xpY2UgPSBhcnIuc2xpY2Uoc3RhcnQsIGVuZCk7XG5cbiAgICBpZiAoZmlsbFdpdGggJiYgaSA+PSBleHRyYSkge1xuICAgICAgY3VyclNsaWNlLnB1c2goZmlsbFdpdGgpO1xuICAgIH1cblxuICAgIHJlcy5wdXNoKGN1cnJTbGljZSk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnRzLnNsaWNlID0gc2xpY2U7XG5cbmZ1bmN0aW9uIHN1bShhcnIsIGF0dHIsIHN0YXJ0KSB7XG4gIGlmIChzdGFydCA9PT0gdm9pZCAwKSB7XG4gICAgc3RhcnQgPSAwO1xuICB9XG5cbiAgaWYgKGF0dHIpIHtcbiAgICBhcnIgPSBsaWIubWFwKGFyciwgZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2W2F0dHJdO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHN0YXJ0ICsgYXJyLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhICsgYjtcbiAgfSwgMCk7XG59XG5cbmV4cG9ydHMuc3VtID0gc3VtO1xuZXhwb3J0cy5zb3J0ID0gci5tYWtlTWFjcm8oWyd2YWx1ZScsICdyZXZlcnNlJywgJ2Nhc2Vfc2Vuc2l0aXZlJywgJ2F0dHJpYnV0ZSddLCBbXSwgZnVuY3Rpb24gKGFyciwgcmV2ZXJzZWQsIGNhc2VTZW5zLCBhdHRyKSB7XG4gIC8vIENvcHkgaXRcbiAgdmFyIGFycmF5ID0gbGliLm1hcChhcnIsIGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHY7XG4gIH0pO1xuICBhcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIHggPSBhdHRyID8gYVthdHRyXSA6IGE7XG4gICAgdmFyIHkgPSBhdHRyID8gYlthdHRyXSA6IGI7XG5cbiAgICBpZiAoIWNhc2VTZW5zICYmIGxpYi5pc1N0cmluZyh4KSAmJiBsaWIuaXNTdHJpbmcoeSkpIHtcbiAgICAgIHggPSB4LnRvTG93ZXJDYXNlKCk7XG4gICAgICB5ID0geS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICh4IDwgeSkge1xuICAgICAgcmV0dXJuIHJldmVyc2VkID8gMSA6IC0xO1xuICAgIH0gZWxzZSBpZiAoeCA+IHkpIHtcbiAgICAgIHJldHVybiByZXZlcnNlZCA/IC0xIDogMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGFycmF5O1xufSk7XG5cbmZ1bmN0aW9uIHN0cmluZyhvYmopIHtcbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKG9iaiwgb2JqKTtcbn1cblxuZXhwb3J0cy5zdHJpbmcgPSBzdHJpbmc7XG5cbmZ1bmN0aW9uIHN0cmlwdGFncyhpbnB1dCwgcHJlc2VydmVMaW5lYnJlYWtzKSB7XG4gIGlucHV0ID0gbm9ybWFsaXplKGlucHV0LCAnJyk7XG4gIHZhciB0YWdzID0gLzxcXC8/KFthLXpdW2EtejAtOV0qKVxcYltePl0qPnw8IS0tW1xcc1xcU10qPy0tPi9naTtcbiAgdmFyIHRyaW1tZWRJbnB1dCA9IHRyaW0oaW5wdXQucmVwbGFjZSh0YWdzLCAnJykpO1xuICB2YXIgcmVzID0gJyc7XG5cbiAgaWYgKHByZXNlcnZlTGluZWJyZWFrcykge1xuICAgIHJlcyA9IHRyaW1tZWRJbnB1dC5yZXBsYWNlKC9eICt8ICskL2dtLCAnJykgLy8gcmVtb3ZlIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlc1xuICAgIC5yZXBsYWNlKC8gKy9nLCAnICcpIC8vIHNxdWFzaCBhZGphY2VudCBzcGFjZXNcbiAgICAucmVwbGFjZSgvKFxcclxcbikvZywgJ1xcbicpIC8vIG5vcm1hbGl6ZSBsaW5lYnJlYWtzIChDUkxGIC0+IExGKVxuICAgIC5yZXBsYWNlKC9cXG5cXG5cXG4rL2csICdcXG5cXG4nKTsgLy8gc3F1YXNoIGFibm9ybWFsIGFkamFjZW50IGxpbmVicmVha3NcbiAgfSBlbHNlIHtcbiAgICByZXMgPSB0cmltbWVkSW5wdXQucmVwbGFjZSgvXFxzKy9naSwgJyAnKTtcbiAgfVxuXG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhpbnB1dCwgcmVzKTtcbn1cblxuZXhwb3J0cy5zdHJpcHRhZ3MgPSBzdHJpcHRhZ3M7XG5cbmZ1bmN0aW9uIHRpdGxlKHN0cikge1xuICBzdHIgPSBub3JtYWxpemUoc3RyLCAnJyk7XG4gIHZhciB3b3JkcyA9IHN0ci5zcGxpdCgnICcpLm1hcChmdW5jdGlvbiAod29yZCkge1xuICAgIHJldHVybiBjYXBpdGFsaXplKHdvcmQpO1xuICB9KTtcbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKHN0ciwgd29yZHMuam9pbignICcpKTtcbn1cblxuZXhwb3J0cy50aXRsZSA9IHRpdGxlO1xuXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gci5jb3B5U2FmZW5lc3Moc3RyLCBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpKTtcbn1cblxuZXhwb3J0cy50cmltID0gdHJpbTtcblxuZnVuY3Rpb24gdHJ1bmNhdGUoaW5wdXQsIGxlbmd0aCwga2lsbHdvcmRzLCBlbmQpIHtcbiAgdmFyIG9yaWcgPSBpbnB1dDtcbiAgaW5wdXQgPSBub3JtYWxpemUoaW5wdXQsICcnKTtcbiAgbGVuZ3RoID0gbGVuZ3RoIHx8IDI1NTtcblxuICBpZiAoaW5wdXQubGVuZ3RoIDw9IGxlbmd0aCkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIGlmIChraWxsd29yZHMpIHtcbiAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZygwLCBsZW5ndGgpO1xuICB9IGVsc2Uge1xuICAgIHZhciBpZHggPSBpbnB1dC5sYXN0SW5kZXhPZignICcsIGxlbmd0aCk7XG5cbiAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgaWR4ID0gbGVuZ3RoO1xuICAgIH1cblxuICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyaW5nKDAsIGlkeCk7XG4gIH1cblxuICBpbnB1dCArPSBlbmQgIT09IHVuZGVmaW5lZCAmJiBlbmQgIT09IG51bGwgPyBlbmQgOiAnLi4uJztcbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKG9yaWcsIGlucHV0KTtcbn1cblxuZXhwb3J0cy50cnVuY2F0ZSA9IHRydW5jYXRlO1xuXG5mdW5jdGlvbiB1cHBlcihzdHIpIHtcbiAgc3RyID0gbm9ybWFsaXplKHN0ciwgJycpO1xuICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKCk7XG59XG5cbmV4cG9ydHMudXBwZXIgPSB1cHBlcjtcblxuZnVuY3Rpb24gdXJsZW5jb2RlKG9iaikge1xuICB2YXIgZW5jID0gZW5jb2RlVVJJQ29tcG9uZW50O1xuXG4gIGlmIChsaWIuaXNTdHJpbmcob2JqKSkge1xuICAgIHJldHVybiBlbmMob2JqKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5dmFscyA9IGxpYi5pc0FycmF5KG9iaikgPyBvYmogOiBsaWIuX2VudHJpZXMob2JqKTtcbiAgICByZXR1cm4ga2V5dmFscy5tYXAoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgayA9IF9yZWYyWzBdLFxuICAgICAgICAgIHYgPSBfcmVmMlsxXTtcbiAgICAgIHJldHVybiBlbmMoaykgKyBcIj1cIiArIGVuYyh2KTtcbiAgICB9KS5qb2luKCcmJyk7XG4gIH1cbn1cblxuZXhwb3J0cy51cmxlbmNvZGUgPSB1cmxlbmNvZGU7IC8vIEZvciB0aGUgamluamEgcmVnZXhwLCBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9taXRzdWhpa28vamluamEyL2Jsb2IvZjE1YjgxNGRjYmE2YWExMmJjNzRkMWY3ZDBjODgxZDU1ZjcxMjZiZS9qaW5qYTIvdXRpbHMucHkjTDIwLUwyM1xuXG52YXIgcHVuY1JlID0gL14oPzpcXCh8PHwmbHQ7KT8oLio/KSg/OlxcLnwsfFxcKXxcXG58Jmd0Oyk/JC87IC8vIGZyb20gaHR0cDovL2Jsb2cuZ2Vydi5uZXQvMjAxMS8wNS9odG1sNV9lbWFpbF9hZGRyZXNzX3JlZ2V4cC9cblxudmFyIGVtYWlsUmUgPSAvXltcXHcuISMkJSYnKitcXC1cXC89P1xcXmB7fH1+XStAW2EtelxcZFxcLV0rKFxcLlthLXpcXGRcXC1dKykrJC9pO1xudmFyIGh0dHBIdHRwc1JlID0gL15odHRwcz86XFwvXFwvLiokLztcbnZhciB3d3dSZSA9IC9ed3d3XFwuLztcbnZhciB0bGRSZSA9IC9cXC4oPzpvcmd8bmV0fGNvbSkoPzpcXDp8XFwvfCQpLztcblxuZnVuY3Rpb24gdXJsaXplKHN0ciwgbGVuZ3RoLCBub2ZvbGxvdykge1xuICBpZiAoaXNOYU4obGVuZ3RoKSkge1xuICAgIGxlbmd0aCA9IEluZmluaXR5O1xuICB9XG5cbiAgdmFyIG5vRm9sbG93QXR0ciA9IG5vZm9sbG93ID09PSB0cnVlID8gJyByZWw9XCJub2ZvbGxvd1wiJyA6ICcnO1xuICB2YXIgd29yZHMgPSBzdHIuc3BsaXQoLyhcXHMrKS8pLmZpbHRlcihmdW5jdGlvbiAod29yZCkge1xuICAgIC8vIElmIHRoZSB3b3JkIGhhcyBubyBsZW5ndGgsIGJhaWwuIFRoaXMgY2FuIGhhcHBlbiBmb3Igc3RyIHdpdGhcbiAgICAvLyB0cmFpbGluZyB3aGl0ZXNwYWNlLlxuICAgIHJldHVybiB3b3JkICYmIHdvcmQubGVuZ3RoO1xuICB9KS5tYXAoZnVuY3Rpb24gKHdvcmQpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHdvcmQubWF0Y2gocHVuY1JlKTtcbiAgICB2YXIgcG9zc2libGVVcmwgPSBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6IHdvcmQ7XG4gICAgdmFyIHNob3J0VXJsID0gcG9zc2libGVVcmwuc3Vic3RyKDAsIGxlbmd0aCk7IC8vIHVybCB0aGF0IHN0YXJ0cyB3aXRoIGh0dHAgb3IgaHR0cHNcblxuICAgIGlmIChodHRwSHR0cHNSZS50ZXN0KHBvc3NpYmxlVXJsKSkge1xuICAgICAgcmV0dXJuIFwiPGEgaHJlZj1cXFwiXCIgKyBwb3NzaWJsZVVybCArIFwiXFxcIlwiICsgbm9Gb2xsb3dBdHRyICsgXCI+XCIgKyBzaG9ydFVybCArIFwiPC9hPlwiO1xuICAgIH0gLy8gdXJsIHRoYXQgc3RhcnRzIHdpdGggd3d3LlxuXG5cbiAgICBpZiAod3d3UmUudGVzdChwb3NzaWJsZVVybCkpIHtcbiAgICAgIHJldHVybiBcIjxhIGhyZWY9XFxcImh0dHA6Ly9cIiArIHBvc3NpYmxlVXJsICsgXCJcXFwiXCIgKyBub0ZvbGxvd0F0dHIgKyBcIj5cIiArIHNob3J0VXJsICsgXCI8L2E+XCI7XG4gICAgfSAvLyBhbiBlbWFpbCBhZGRyZXNzIG9mIHRoZSBmb3JtIHVzZXJuYW1lQGRvbWFpbi50bGRcblxuXG4gICAgaWYgKGVtYWlsUmUudGVzdChwb3NzaWJsZVVybCkpIHtcbiAgICAgIHJldHVybiBcIjxhIGhyZWY9XFxcIm1haWx0bzpcIiArIHBvc3NpYmxlVXJsICsgXCJcXFwiPlwiICsgcG9zc2libGVVcmwgKyBcIjwvYT5cIjtcbiAgICB9IC8vIHVybCB0aGF0IGVuZHMgaW4gLmNvbSwgLm9yZyBvciAubmV0IHRoYXQgaXMgbm90IGFuIGVtYWlsIGFkZHJlc3NcblxuXG4gICAgaWYgKHRsZFJlLnRlc3QocG9zc2libGVVcmwpKSB7XG4gICAgICByZXR1cm4gXCI8YSBocmVmPVxcXCJodHRwOi8vXCIgKyBwb3NzaWJsZVVybCArIFwiXFxcIlwiICsgbm9Gb2xsb3dBdHRyICsgXCI+XCIgKyBzaG9ydFVybCArIFwiPC9hPlwiO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JkO1xuICB9KTtcbiAgcmV0dXJuIHdvcmRzLmpvaW4oJycpO1xufVxuXG5leHBvcnRzLnVybGl6ZSA9IHVybGl6ZTtcblxuZnVuY3Rpb24gd29yZGNvdW50KHN0cikge1xuICBzdHIgPSBub3JtYWxpemUoc3RyLCAnJyk7XG4gIHZhciB3b3JkcyA9IHN0ciA/IHN0ci5tYXRjaCgvXFx3Ky9nKSA6IG51bGw7XG4gIHJldHVybiB3b3JkcyA/IHdvcmRzLmxlbmd0aCA6IG51bGw7XG59XG5cbmV4cG9ydHMud29yZGNvdW50ID0gd29yZGNvdW50O1xuXG5mdW5jdGlvbiBmbG9hdCh2YWwsIGRlZikge1xuICB2YXIgcmVzID0gcGFyc2VGbG9hdCh2YWwpO1xuICByZXR1cm4gaXNOYU4ocmVzKSA/IGRlZiA6IHJlcztcbn1cblxuZXhwb3J0cy5mbG9hdCA9IGZsb2F0O1xuXG5mdW5jdGlvbiBpbnQodmFsLCBkZWYpIHtcbiAgdmFyIHJlcyA9IHBhcnNlSW50KHZhbCwgMTApO1xuICByZXR1cm4gaXNOYU4ocmVzKSA/IGRlZiA6IHJlcztcbn1cblxuZXhwb3J0cy5pbnQgPSBpbnQ7IC8vIEFsaWFzZXNcblxuZXhwb3J0cy5kID0gZXhwb3J0cy5kZWZhdWx0O1xuZXhwb3J0cy5lID0gZXhwb3J0cy5lc2NhcGU7XG5cbi8qKiovIH0pLFxuLyogMTggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBMb2FkZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG52YXIgUHJlY29tcGlsZWRMb2FkZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9Mb2FkZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoUHJlY29tcGlsZWRMb2FkZXIsIF9Mb2FkZXIpO1xuXG4gIGZ1bmN0aW9uIFByZWNvbXBpbGVkTG9hZGVyKGNvbXBpbGVkVGVtcGxhdGVzKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfTG9hZGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICBfdGhpcy5wcmVjb21waWxlZCA9IGNvbXBpbGVkVGVtcGxhdGVzIHx8IHt9O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBQcmVjb21waWxlZExvYWRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmdldFNvdXJjZSA9IGZ1bmN0aW9uIGdldFNvdXJjZShuYW1lKSB7XG4gICAgaWYgKHRoaXMucHJlY29tcGlsZWRbbmFtZV0pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNyYzoge1xuICAgICAgICAgIHR5cGU6ICdjb2RlJyxcbiAgICAgICAgICBvYmo6IHRoaXMucHJlY29tcGlsZWRbbmFtZV1cbiAgICAgICAgfSxcbiAgICAgICAgcGF0aDogbmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gUHJlY29tcGlsZWRMb2FkZXI7XG59KExvYWRlcik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBQcmVjb21waWxlZExvYWRlcjogUHJlY29tcGlsZWRMb2FkZXJcbn07XG5cbi8qKiovIH0pLFxuLyogMTkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIFNhZmVTdHJpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLlNhZmVTdHJpbmc7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3QgaXMgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5cbmZ1bmN0aW9uIGNhbGxhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydHMuY2FsbGFibGUgPSBjYWxsYWJsZTtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdCBpcyBzdHJpY3RseSBub3QgYHVuZGVmaW5lZGAuXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBkZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnRzLmRlZmluZWQgPSBkZWZpbmVkO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb3BlcmFuZCAob25lKSBpcyBkaXZpc2JsZSBieSB0aGUgdGVzdCdzIGFyZ3VtZW50XG4gKiAodHdvKS5cbiAqIEBwYXJhbSB7IG51bWJlciB9IG9uZVxuICogQHBhcmFtIHsgbnVtYmVyIH0gdHdvXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGRpdmlzaWJsZWJ5KG9uZSwgdHdvKSB7XG4gIHJldHVybiBvbmUgJSB0d28gPT09IDA7XG59XG5cbmV4cG9ydHMuZGl2aXNpYmxlYnkgPSBkaXZpc2libGVieTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzdHJpbmcgaGFzIGJlZW4gZXNjYXBlZCAoaS5lLiwgaXMgYSBTYWZlU3RyaW5nKS5cbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGVzY2FwZWQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgU2FmZVN0cmluZztcbn1cblxuZXhwb3J0cy5lc2NhcGVkID0gZXNjYXBlZDtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgc3RyaWN0bHkgZXF1YWwuXG4gKiBAcGFyYW0geyBhbnkgfSBvbmVcbiAqIEBwYXJhbSB7IGFueSB9IHR3b1xuICovXG5cbmZ1bmN0aW9uIGVxdWFsdG8ob25lLCB0d28pIHtcbiAgcmV0dXJuIG9uZSA9PT0gdHdvO1xufVxuXG5leHBvcnRzLmVxdWFsdG8gPSBlcXVhbHRvOyAvLyBBbGlhc2VzXG5cbmV4cG9ydHMuZXEgPSBleHBvcnRzLmVxdWFsdG87XG5leHBvcnRzLnNhbWVhcyA9IGV4cG9ydHMuZXF1YWx0bztcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGV2ZW5seSBkaXZpc2libGUgYnkgMi5cbiAqIEBwYXJhbSB7IG51bWJlciB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGV2ZW4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICUgMiA9PT0gMDtcbn1cblxuZXhwb3J0cy5ldmVuID0gZXZlbjtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGZhbHN5IC0gaWYgSSByZWNhbGwgY29ycmVjdGx5LCAnJywgMCwgZmFsc2UsXG4gKiB1bmRlZmluZWQsIE5hTiBvciBudWxsLiBJIGRvbid0IGtub3cgaWYgd2Ugc2hvdWxkIHN0aWNrIHRvIHRoZSBkZWZhdWx0IEpTXG4gKiBiZWhhdmlvciBvciBhdHRlbXB0IHRvIHJlcGxpY2F0ZSB3aGF0IFB5dGhvbiBiZWxpZXZlcyBzaG91bGQgYmUgZmFsc3kgKGkuZS4sXG4gKiBlbXB0eSBhcnJheXMsIGVtcHR5IGRpY3RzLCBub3QgMC4uLikuXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBmYWxzeSh2YWx1ZSkge1xuICByZXR1cm4gIXZhbHVlO1xufVxuXG5leHBvcnRzLmZhbHN5ID0gZmFsc3k7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBvcGVyYW5kIChvbmUpIGlzIGdyZWF0ZXIgb3IgZXF1YWwgdG8gdGhlIHRlc3Qnc1xuICogYXJndW1lbnQgKHR3bykuXG4gKiBAcGFyYW0geyBudW1iZXIgfSBvbmVcbiAqIEBwYXJhbSB7IG51bWJlciB9IHR3b1xuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBnZShvbmUsIHR3bykge1xuICByZXR1cm4gb25lID49IHR3bztcbn1cblxuZXhwb3J0cy5nZSA9IGdlO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb3BlcmFuZCAob25lKSBpcyBncmVhdGVyIHRoYW4gdGhlIHRlc3QncyBhcmd1bWVudFxuICogKHR3bykuXG4gKiBAcGFyYW0geyBudW1iZXIgfSBvbmVcbiAqIEBwYXJhbSB7IG51bWJlciB9IHR3b1xuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBncmVhdGVydGhhbihvbmUsIHR3bykge1xuICByZXR1cm4gb25lID4gdHdvO1xufVxuXG5leHBvcnRzLmdyZWF0ZXJ0aGFuID0gZ3JlYXRlcnRoYW47IC8vIGFsaWFzXG5cbmV4cG9ydHMuZ3QgPSBleHBvcnRzLmdyZWF0ZXJ0aGFuO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb3BlcmFuZCAob25lKSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHRlc3Qnc1xuICogYXJndW1lbnQgKHR3bykuXG4gKiBAcGFyYW0geyBudW1iZXIgfSBvbmVcbiAqIEBwYXJhbSB7IG51bWJlciB9IHR3b1xuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBsZShvbmUsIHR3bykge1xuICByZXR1cm4gb25lIDw9IHR3bztcbn1cblxuZXhwb3J0cy5sZSA9IGxlO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb3BlcmFuZCAob25lKSBpcyBsZXNzIHRoYW4gdGhlIHRlc3QncyBwYXNzZWQgYXJndW1lbnRcbiAqICh0d28pLlxuICogQHBhcmFtIHsgbnVtYmVyIH0gb25lXG4gKiBAcGFyYW0geyBudW1iZXIgfSB0d29cbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gbGVzc3RoYW4ob25lLCB0d28pIHtcbiAgcmV0dXJuIG9uZSA8IHR3bztcbn1cblxuZXhwb3J0cy5sZXNzdGhhbiA9IGxlc3N0aGFuOyAvLyBhbGlhc1xuXG5leHBvcnRzLmx0ID0gZXhwb3J0cy5sZXNzdGhhbjtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHN0cmluZyBpcyBsb3dlcmNhc2VkLlxuICogQHBhcmFtIHsgc3RyaW5nIH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gbG93ZXIodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlO1xufVxuXG5leHBvcnRzLmxvd2VyID0gbG93ZXI7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBvcGVyYW5kIChvbmUpIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgdGVzdCdzXG4gKiBhcmd1bWVudCAodHdvKS5cbiAqIEBwYXJhbSB7IG51bWJlciB9IG9uZVxuICogQHBhcmFtIHsgbnVtYmVyIH0gdHdvXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIG5lKG9uZSwgdHdvKSB7XG4gIHJldHVybiBvbmUgIT09IHR3bztcbn1cblxuZXhwb3J0cy5uZSA9IG5lO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGlzIHN0cmljdGx5IGVxdWFsIHRvIGBudWxsYC5cbiAqIEBwYXJhbSB7IGFueSB9XG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIG51bGxUZXN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuZXhwb3J0cy5udWxsID0gbnVsbFRlc3Q7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB7IGFueSB9XG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIG51bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbn1cblxuZXhwb3J0cy5udW1iZXIgPSBudW1iZXI7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyAqbm90KiBldmVubHkgZGl2aXNpYmxlIGJ5IDIuXG4gKiBAcGFyYW0geyBudW1iZXIgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBvZGQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICUgMiA9PT0gMTtcbn1cblxuZXhwb3J0cy5vZGQgPSBvZGQ7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZywgYGZhbHNlYCBpZiBub3QuXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBzdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydHMuc3RyaW5nID0gc3RyaW5nO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgbm90IGluIHRoZSBsaXN0IG9mIHRoaW5ncyBjb25zaWRlcmVkIGZhbHN5OlxuICogJycsIG51bGwsIHVuZGVmaW5lZCwgMCwgTmFOIGFuZCBmYWxzZS5cbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIHRydXRoeSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZTtcbn1cblxuZXhwb3J0cy50cnV0aHkgPSB0cnV0aHk7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiB1bmRlZmluZWRUZXN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnRzLnVuZGVmaW5lZCA9IHVuZGVmaW5lZFRlc3Q7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzdHJpbmcgaXMgdXBwZXJjYXNlZC5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIHVwcGVyKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS50b1VwcGVyQ2FzZSgpID09PSB2YWx1ZTtcbn1cblxuZXhwb3J0cy51cHBlciA9IHVwcGVyO1xuLyoqXG4gKiBJZiBFUzYgZmVhdHVyZXMgYXJlIGF2YWlsYWJsZSwgcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGltcGxlbWVudHMgdGhlXG4gKiBgU3ltYm9sLml0ZXJhdG9yYCBtZXRob2QuIElmIG5vdCwgaXQncyBhIHN0cmluZyBvciBBcnJheS5cbiAqXG4gKiBDb3VsZCBwb3RlbnRpYWxseSBjYXVzZSBpc3N1ZXMgaWYgYSBicm93c2VyIGV4aXN0cyB0aGF0IGhhcyBTZXQgYW5kIE1hcCBidXRcbiAqIG5vdCBTeW1ib2wuXG4gKlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gaXRlcmFibGUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuICEhdmFsdWVbU3ltYm9sLml0ZXJhdG9yXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgfVxufVxuXG5leHBvcnRzLml0ZXJhYmxlID0gaXRlcmFibGU7XG4vKipcbiAqIElmIEVTNiBmZWF0dXJlcyBhcmUgYXZhaWxhYmxlLCByZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0IGhhc2hcbiAqIG9yIGFuIEVTNiBNYXAuIE90aGVyd2lzZSBqdXN0IHJldHVybiBpZiBpdCdzIGFuIG9iamVjdCBoYXNoLlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gbWFwcGluZyh2YWx1ZSkge1xuICAvLyBvbmx5IG1hcHMgYW5kIG9iamVjdCBoYXNoZXNcbiAgdmFyIGJvb2wgPSB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xuXG4gIGlmIChTZXQpIHtcbiAgICByZXR1cm4gYm9vbCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgU2V0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYm9vbDtcbiAgfVxufVxuXG5leHBvcnRzLm1hcHBpbmcgPSBtYXBwaW5nO1xuXG4vKioqLyB9KSxcbi8qIDIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9jeWNsZXIoaXRlbXMpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG4gIHJldHVybiB7XG4gICAgY3VycmVudDogbnVsbCxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICBpbmRleCA9IC0xO1xuICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcbiAgICB9LFxuICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBpbmRleCsrO1xuXG4gICAgICBpZiAoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50ID0gaXRlbXNbaW5kZXhdO1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIF9qb2luZXIoc2VwKSB7XG4gIHNlcCA9IHNlcCB8fCAnLCc7XG4gIHZhciBmaXJzdCA9IHRydWU7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbCA9IGZpcnN0ID8gJycgOiBzZXA7XG4gICAgZmlyc3QgPSBmYWxzZTtcbiAgICByZXR1cm4gdmFsO1xuICB9O1xufSAvLyBNYWtpbmcgdGhpcyBhIGZ1bmN0aW9uIGluc3RlYWQgc28gaXQgcmV0dXJucyBhIG5ldyBvYmplY3Rcbi8vIGVhY2ggdGltZSBpdCdzIGNhbGxlZC4gVGhhdCB3YXksIGlmIHNvbWV0aGluZyBsaWtlIGFuIGVudmlyb25tZW50XG4vLyB1c2VzIGl0LCB0aGV5IHdpbGwgZWFjaCBoYXZlIHRoZWlyIG93biBjb3B5LlxuXG5cbmZ1bmN0aW9uIGdsb2JhbHMoKSB7XG4gIHJldHVybiB7XG4gICAgcmFuZ2U6IGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgICBpZiAodHlwZW9mIHN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHN0b3AgPSBzdGFydDtcbiAgICAgICAgc3RhcnQgPSAwO1xuICAgICAgICBzdGVwID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoIXN0ZXApIHtcbiAgICAgICAgc3RlcCA9IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciBhcnIgPSBbXTtcblxuICAgICAgaWYgKHN0ZXAgPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IHN0b3A7IGkgKz0gc3RlcCkge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBfaSA9IHN0YXJ0OyBfaSA+IHN0b3A7IF9pICs9IHN0ZXApIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZvci1kaXJlY3Rpb25cbiAgICAgICAgICBhcnIucHVzaChfaSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9LFxuICAgIGN5Y2xlcjogZnVuY3Rpb24gY3ljbGVyKCkge1xuICAgICAgcmV0dXJuIF9jeWNsZXIoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfSxcbiAgICBqb2luZXI6IGZ1bmN0aW9uIGpvaW5lcihzZXApIHtcbiAgICAgIHJldHVybiBfam9pbmVyKHNlcCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbHM7XG5cbi8qKiovIH0pLFxuLyogMjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4cHJlc3MoZW52LCBhcHApIHtcbiAgZnVuY3Rpb24gTnVuanVja3NWaWV3KG5hbWUsIG9wdHMpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGF0aCA9IG5hbWU7XG4gICAgdGhpcy5kZWZhdWx0RW5naW5lID0gb3B0cy5kZWZhdWx0RW5naW5lO1xuICAgIHRoaXMuZXh0ID0gcGF0aC5leHRuYW1lKG5hbWUpO1xuXG4gICAgaWYgKCF0aGlzLmV4dCAmJiAhdGhpcy5kZWZhdWx0RW5naW5lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGRlZmF1bHQgZW5naW5lIHdhcyBzcGVjaWZpZWQgYW5kIG5vIGV4dGVuc2lvbiB3YXMgcHJvdmlkZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmV4dCkge1xuICAgICAgdGhpcy5uYW1lICs9IHRoaXMuZXh0ID0gKHRoaXMuZGVmYXVsdEVuZ2luZVswXSAhPT0gJy4nID8gJy4nIDogJycpICsgdGhpcy5kZWZhdWx0RW5naW5lO1xuICAgIH1cbiAgfVxuXG4gIE51bmp1Y2tzVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKG9wdHMsIGNiKSB7XG4gICAgZW52LnJlbmRlcih0aGlzLm5hbWUsIG9wdHMsIGNiKTtcbiAgfTtcblxuICBhcHAuc2V0KCd2aWV3JywgTnVuanVja3NWaWV3KTtcbiAgYXBwLnNldCgnbnVuanVja3NFbnYnLCBlbnYpO1xuICByZXR1cm4gZW52O1xufTtcblxuLyoqKi8gfSksXG4vKiAyMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgZnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgcGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMCksXG4gICAgX3ByZXR0aWZ5RXJyb3IgPSBfcmVxdWlyZS5fcHJldHRpZnlFcnJvcjtcblxudmFyIGNvbXBpbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oNyksXG4gICAgRW52aXJvbm1lbnQgPSBfcmVxdWlyZTIuRW52aXJvbm1lbnQ7XG5cbnZhciBwcmVjb21waWxlR2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cbmZ1bmN0aW9uIG1hdGNoKGZpbGVuYW1lLCBwYXR0ZXJucykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkocGF0dGVybnMpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHBhdHRlcm5zLnNvbWUoZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmlsZW5hbWUubWF0Y2gocGF0dGVybik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwcmVjb21waWxlU3RyaW5nKHN0ciwgb3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgb3B0cy5pc1N0cmluZyA9IHRydWU7XG4gIHZhciBlbnYgPSBvcHRzLmVudiB8fCBuZXcgRW52aXJvbm1lbnQoW10pO1xuICB2YXIgd3JhcHBlciA9IG9wdHMud3JhcHBlciB8fCBwcmVjb21waWxlR2xvYmFsO1xuXG4gIGlmICghb3B0cy5uYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgXCJuYW1lXCIgb3B0aW9uIGlzIHJlcXVpcmVkIHdoZW4gY29tcGlsaW5nIGEgc3RyaW5nJyk7XG4gIH1cblxuICByZXR1cm4gd3JhcHBlcihbX3ByZWNvbXBpbGUoc3RyLCBvcHRzLm5hbWUsIGVudildLCBvcHRzKTtcbn1cblxuZnVuY3Rpb24gcHJlY29tcGlsZShpbnB1dCwgb3B0cykge1xuICAvLyBUaGUgZm9sbG93aW5nIG9wdGlvbnMgYXJlIGF2YWlsYWJsZTpcbiAgLy9cbiAgLy8gKiBuYW1lOiBuYW1lIG9mIHRoZSB0ZW1wbGF0ZSAoYXV0by1nZW5lcmF0ZWQgd2hlbiBjb21waWxpbmcgYSBkaXJlY3RvcnkpXG4gIC8vICogaXNTdHJpbmc6IGlucHV0IGlzIGEgc3RyaW5nLCBub3QgYSBmaWxlIHBhdGhcbiAgLy8gKiBhc0Z1bmN0aW9uOiBnZW5lcmF0ZSBhIGNhbGxhYmxlIGZ1bmN0aW9uXG4gIC8vICogZm9yY2U6IGtlZXAgY29tcGlsaW5nIG9uIGVycm9yXG4gIC8vICogZW52OiB0aGUgRW52aXJvbm1lbnQgdG8gdXNlIChnZXRzIGV4dGVuc2lvbnMgYW5kIGFzeW5jIGZpbHRlcnMgZnJvbSBpdClcbiAgLy8gKiBpbmNsdWRlOiB3aGljaCBmaWxlL2ZvbGRlcnMgdG8gaW5jbHVkZSAoZm9sZGVycyBhcmUgYXV0by1pbmNsdWRlZCwgZmlsZXMgYXJlIGF1dG8tZXhjbHVkZWQpXG4gIC8vICogZXhjbHVkZTogd2hpY2ggZmlsZS9mb2xkZXJzIHRvIGV4Y2x1ZGUgKGZvbGRlcnMgYXJlIGF1dG8taW5jbHVkZWQsIGZpbGVzIGFyZSBhdXRvLWV4Y2x1ZGVkKVxuICAvLyAqIHdyYXBwZXI6IGZ1bmN0aW9uKHRlbXBsYXRlcywgb3B0cykgey4uLn1cbiAgLy8gICAgICAgQ3VzdG9taXplIHRoZSBvdXRwdXQgZm9ybWF0IHRvIHN0b3JlIHRoZSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAgLy8gICAgICAgQnkgZGVmYXVsdCwgdGVtcGxhdGVzIGFyZSBzdG9yZWQgaW4gYSBnbG9iYWwgdmFyaWFibGUgdXNlZCBieSB0aGUgcnVudGltZS5cbiAgLy8gICAgICAgQSBjdXN0b20gbG9hZGVyIHdpbGwgYmUgbmVjZXNzYXJ5IHRvIGxvYWQgeW91ciBjdXN0b20gd3JhcHBlci5cbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHZhciBlbnYgPSBvcHRzLmVudiB8fCBuZXcgRW52aXJvbm1lbnQoW10pO1xuICB2YXIgd3JhcHBlciA9IG9wdHMud3JhcHBlciB8fCBwcmVjb21waWxlR2xvYmFsO1xuXG4gIGlmIChvcHRzLmlzU3RyaW5nKSB7XG4gICAgcmV0dXJuIHByZWNvbXBpbGVTdHJpbmcoaW5wdXQsIG9wdHMpO1xuICB9XG5cbiAgdmFyIHBhdGhTdGF0cyA9IGZzLmV4aXN0c1N5bmMoaW5wdXQpICYmIGZzLnN0YXRTeW5jKGlucHV0KTtcbiAgdmFyIHByZWNvbXBpbGVkID0gW107XG4gIHZhciB0ZW1wbGF0ZXMgPSBbXTtcblxuICBmdW5jdGlvbiBhZGRUZW1wbGF0ZXMoZGlyKSB7XG4gICAgZnMucmVhZGRpclN5bmMoZGlyKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICB2YXIgZmlsZXBhdGggPSBwYXRoLmpvaW4oZGlyLCBmaWxlKTtcbiAgICAgIHZhciBzdWJwYXRoID0gZmlsZXBhdGguc3Vic3RyKHBhdGguam9pbihpbnB1dCwgJy8nKS5sZW5ndGgpO1xuICAgICAgdmFyIHN0YXQgPSBmcy5zdGF0U3luYyhmaWxlcGF0aCk7XG5cbiAgICAgIGlmIChzdGF0ICYmIHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBzdWJwYXRoICs9ICcvJztcblxuICAgICAgICBpZiAoIW1hdGNoKHN1YnBhdGgsIG9wdHMuZXhjbHVkZSkpIHtcbiAgICAgICAgICBhZGRUZW1wbGF0ZXMoZmlsZXBhdGgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG1hdGNoKHN1YnBhdGgsIG9wdHMuaW5jbHVkZSkpIHtcbiAgICAgICAgdGVtcGxhdGVzLnB1c2goZmlsZXBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHBhdGhTdGF0cy5pc0ZpbGUoKSkge1xuICAgIHByZWNvbXBpbGVkLnB1c2goX3ByZWNvbXBpbGUoZnMucmVhZEZpbGVTeW5jKGlucHV0LCAndXRmLTgnKSwgb3B0cy5uYW1lIHx8IGlucHV0LCBlbnYpKTtcbiAgfSBlbHNlIGlmIChwYXRoU3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgIGFkZFRlbXBsYXRlcyhpbnB1dCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWUgPSB0ZW1wbGF0ZXNbaV0ucmVwbGFjZShwYXRoLmpvaW4oaW5wdXQsICcvJyksICcnKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcHJlY29tcGlsZWQucHVzaChfcHJlY29tcGlsZShmcy5yZWFkRmlsZVN5bmModGVtcGxhdGVzW2ldLCAndXRmLTgnKSwgbmFtZSwgZW52KSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChvcHRzLmZvcmNlKSB7XG4gICAgICAgICAgLy8gRG9uJ3Qgc3RvcCBnZW5lcmF0aW5nIHRoZSBvdXRwdXQgaWYgd2UncmVcbiAgICAgICAgICAvLyBmb3JjaW5nIGNvbXBpbGF0aW9uLlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gd3JhcHBlcihwcmVjb21waWxlZCwgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIF9wcmVjb21waWxlKHN0ciwgbmFtZSwgZW52KSB7XG4gIGVudiA9IGVudiB8fCBuZXcgRW52aXJvbm1lbnQoW10pO1xuICB2YXIgYXN5bmNGaWx0ZXJzID0gZW52LmFzeW5jRmlsdGVycztcbiAgdmFyIGV4dGVuc2lvbnMgPSBlbnYuZXh0ZW5zaW9uc0xpc3Q7XG4gIHZhciB0ZW1wbGF0ZTtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuXG4gIHRyeSB7XG4gICAgdGVtcGxhdGUgPSBjb21waWxlci5jb21waWxlKHN0ciwgYXN5bmNGaWx0ZXJzLCBleHRlbnNpb25zLCBuYW1lLCBlbnYub3B0cyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IF9wcmV0dGlmeUVycm9yKG5hbWUsIGZhbHNlLCBlcnIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJlY29tcGlsZTogcHJlY29tcGlsZSxcbiAgcHJlY29tcGlsZVN0cmluZzogcHJlY29tcGlsZVN0cmluZ1xufTtcblxuLyoqKi8gfSksXG4vKiAyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBwcmVjb21waWxlR2xvYmFsKHRlbXBsYXRlcywgb3B0cykge1xuICB2YXIgb3V0ID0gJyc7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5hbWUgPSBKU09OLnN0cmluZ2lmeSh0ZW1wbGF0ZXNbaV0ubmFtZSk7XG4gICAgdmFyIHRlbXBsYXRlID0gdGVtcGxhdGVzW2ldLnRlbXBsYXRlO1xuICAgIG91dCArPSAnKGZ1bmN0aW9uKCkgeycgKyAnKHdpbmRvdy5udW5qdWNrc1ByZWNvbXBpbGVkID0gd2luZG93Lm51bmp1Y2tzUHJlY29tcGlsZWQgfHwge30pJyArICdbJyArIG5hbWUgKyAnXSA9IChmdW5jdGlvbigpIHtcXG4nICsgdGVtcGxhdGUgKyAnXFxufSkoKTtcXG4nO1xuXG4gICAgaWYgKG9wdHMuYXNGdW5jdGlvbikge1xuICAgICAgb3V0ICs9ICdyZXR1cm4gZnVuY3Rpb24oY3R4LCBjYikgeyByZXR1cm4gbnVuanVja3MucmVuZGVyKCcgKyBuYW1lICsgJywgY3R4LCBjYik7IH1cXG4nO1xuICAgIH1cblxuICAgIG91dCArPSAnfSkoKTtcXG4nO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcmVjb21waWxlR2xvYmFsO1xuXG4vKioqLyB9KSxcbi8qIDI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbmZ1bmN0aW9uIGluc3RhbGxDb21wYXQoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gIC8vIFRoaXMgbXVzdCBiZSBjYWxsZWQgbGlrZSBgbnVuanVja3MuaW5zdGFsbENvbXBhdGAgc28gdGhhdCBgdGhpc2BcbiAgLy8gcmVmZXJlbmNlcyB0aGUgbnVuanVja3MgaW5zdGFuY2VcblxuICB2YXIgcnVudGltZSA9IHRoaXMucnVudGltZTtcbiAgdmFyIGxpYiA9IHRoaXMubGliOyAvLyBIYW5kbGUgc2xpbSBjYXNlIHdoZXJlIHRoZXNlICdtb2R1bGVzJyBhcmUgZXhjbHVkZWQgZnJvbSB0aGUgYnVpbHQgc291cmNlXG5cbiAgdmFyIENvbXBpbGVyID0gdGhpcy5jb21waWxlci5Db21waWxlcjtcbiAgdmFyIFBhcnNlciA9IHRoaXMucGFyc2VyLlBhcnNlcjtcbiAgdmFyIG5vZGVzID0gdGhpcy5ub2RlcztcbiAgdmFyIGxleGVyID0gdGhpcy5sZXhlcjtcbiAgdmFyIG9yaWdfY29udGV4dE9yRnJhbWVMb29rdXAgPSBydW50aW1lLmNvbnRleHRPckZyYW1lTG9va3VwO1xuICB2YXIgb3JpZ19tZW1iZXJMb29rdXAgPSBydW50aW1lLm1lbWJlckxvb2t1cDtcbiAgdmFyIG9yaWdfQ29tcGlsZXJfYXNzZXJ0VHlwZTtcbiAgdmFyIG9yaWdfUGFyc2VyX3BhcnNlQWdncmVnYXRlO1xuXG4gIGlmIChDb21waWxlcikge1xuICAgIG9yaWdfQ29tcGlsZXJfYXNzZXJ0VHlwZSA9IENvbXBpbGVyLnByb3RvdHlwZS5hc3NlcnRUeXBlO1xuICB9XG5cbiAgaWYgKFBhcnNlcikge1xuICAgIG9yaWdfUGFyc2VyX3BhcnNlQWdncmVnYXRlID0gUGFyc2VyLnByb3RvdHlwZS5wYXJzZUFnZ3JlZ2F0ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuaW5zdGFsbCgpIHtcbiAgICBydW50aW1lLmNvbnRleHRPckZyYW1lTG9va3VwID0gb3JpZ19jb250ZXh0T3JGcmFtZUxvb2t1cDtcbiAgICBydW50aW1lLm1lbWJlckxvb2t1cCA9IG9yaWdfbWVtYmVyTG9va3VwO1xuXG4gICAgaWYgKENvbXBpbGVyKSB7XG4gICAgICBDb21waWxlci5wcm90b3R5cGUuYXNzZXJ0VHlwZSA9IG9yaWdfQ29tcGlsZXJfYXNzZXJ0VHlwZTtcbiAgICB9XG5cbiAgICBpZiAoUGFyc2VyKSB7XG4gICAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQWdncmVnYXRlID0gb3JpZ19QYXJzZXJfcGFyc2VBZ2dyZWdhdGU7XG4gICAgfVxuICB9XG5cbiAgcnVudGltZS5jb250ZXh0T3JGcmFtZUxvb2t1cCA9IGZ1bmN0aW9uIGNvbnRleHRPckZyYW1lTG9va3VwKGNvbnRleHQsIGZyYW1lLCBrZXkpIHtcbiAgICB2YXIgdmFsID0gb3JpZ19jb250ZXh0T3JGcmFtZUxvb2t1cC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICdUcnVlJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGNhc2UgJ0ZhbHNlJzpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBjYXNlICdOb25lJzpcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGdldFRva2Vuc1N0YXRlKHRva2Vucykge1xuICAgIHJldHVybiB7XG4gICAgICBpbmRleDogdG9rZW5zLmluZGV4LFxuICAgICAgbGluZW5vOiB0b2tlbnMubGluZW5vLFxuICAgICAgY29sbm86IHRva2Vucy5jb2xub1xuICAgIH07XG4gIH1cblxuICBpZiAoXCJTVERcIiAhPT0gJ1NMSU0nICYmIG5vZGVzICYmIENvbXBpbGVyICYmIFBhcnNlcikge1xuICAgIC8vIGkuZS4sIG5vdCBzbGltIG1vZGVcbiAgICB2YXIgU2xpY2UgPSBub2Rlcy5Ob2RlLmV4dGVuZCgnU2xpY2UnLCB7XG4gICAgICBmaWVsZHM6IFsnc3RhcnQnLCAnc3RvcCcsICdzdGVwJ10sXG4gICAgICBpbml0OiBmdW5jdGlvbiBpbml0KGxpbmVubywgY29sbm8sIHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgICAgIHN0YXJ0ID0gc3RhcnQgfHwgbmV3IG5vZGVzLkxpdGVyYWwobGluZW5vLCBjb2xubywgbnVsbCk7XG4gICAgICAgIHN0b3AgPSBzdG9wIHx8IG5ldyBub2Rlcy5MaXRlcmFsKGxpbmVubywgY29sbm8sIG51bGwpO1xuICAgICAgICBzdGVwID0gc3RlcCB8fCBuZXcgbm9kZXMuTGl0ZXJhbChsaW5lbm8sIGNvbG5vLCAxKTtcbiAgICAgICAgdGhpcy5wYXJlbnQobGluZW5vLCBjb2xubywgc3RhcnQsIHN0b3AsIHN0ZXApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgQ29tcGlsZXIucHJvdG90eXBlLmFzc2VydFR5cGUgPSBmdW5jdGlvbiBhc3NlcnRUeXBlKG5vZGUpIHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgU2xpY2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcmlnX0NvbXBpbGVyX2Fzc2VydFR5cGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgQ29tcGlsZXIucHJvdG90eXBlLmNvbXBpbGVTbGljZSA9IGZ1bmN0aW9uIGNvbXBpbGVTbGljZShub2RlLCBmcmFtZSkge1xuICAgICAgdGhpcy5fZW1pdCgnKCcpO1xuXG4gICAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLnN0YXJ0LCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXQoJyksKCcpO1xuXG4gICAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLnN0b3AsIGZyYW1lKTtcblxuICAgICAgdGhpcy5fZW1pdCgnKSwoJyk7XG5cbiAgICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUuc3RlcCwgZnJhbWUpO1xuXG4gICAgICB0aGlzLl9lbWl0KCcpJyk7XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VBZ2dyZWdhdGUgPSBmdW5jdGlvbiBwYXJzZUFnZ3JlZ2F0ZSgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBvcmlnU3RhdGUgPSBnZXRUb2tlbnNTdGF0ZSh0aGlzLnRva2Vucyk7IC8vIFNldCBiYWNrIG9uZSBhY2NvdW50aW5nIGZvciBvcGVuaW5nIGJyYWNrZXQvcGFyZW5zXG5cbiAgICAgIG9yaWdTdGF0ZS5jb2xuby0tO1xuICAgICAgb3JpZ1N0YXRlLmluZGV4LS07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBvcmlnX1BhcnNlcl9wYXJzZUFnZ3JlZ2F0ZS5hcHBseSh0aGlzKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdmFyIGVyclN0YXRlID0gZ2V0VG9rZW5zU3RhdGUodGhpcy50b2tlbnMpO1xuXG4gICAgICAgIHZhciByZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdygpIHtcbiAgICAgICAgICBsaWIuX2Fzc2lnbihfdGhpcy50b2tlbnMsIGVyclN0YXRlKTtcblxuICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9OyAvLyBSZXNldCB0byBzdGF0ZSBiZWZvcmUgb3JpZ2luYWwgcGFyc2VBZ2dyZWdhdGUgY2FsbGVkXG5cblxuICAgICAgICBsaWIuX2Fzc2lnbih0aGlzLnRva2Vucywgb3JpZ1N0YXRlKTtcblxuICAgICAgICB0aGlzLnBlZWtlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgICAgICBpZiAodG9rLnR5cGUgIT09IGxleGVyLlRPS0VOX0xFRlRfQlJBQ0tFVCkge1xuICAgICAgICAgIHRocm93IHJldGhyb3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgU2xpY2UodG9rLmxpbmVubywgdG9rLmNvbG5vKTsgLy8gSWYgd2UgZG9uJ3QgZW5jb3VudGVyIGEgY29sb24gd2hpbGUgcGFyc2luZywgdGhpcyBpcyBub3QgYSBzbGljZSxcbiAgICAgICAgLy8gc28gcmUtcmFpc2UgdGhlIG9yaWdpbmFsIGV4Y2VwdGlvbi5cblxuICAgICAgICB2YXIgaXNTbGljZSA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IG5vZGUuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc2tpcChsZXhlci5UT0tFTl9SSUdIVF9CUkFDS0VUKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGkgPT09IG5vZGUuZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGlzU2xpY2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5mYWlsKCdwYXJzZVNsaWNlOiB0b28gbWFueSBzbGljZSBjb21wb25lbnRzJywgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnNraXAobGV4ZXIuVE9LRU5fQ09MT04pKSB7XG4gICAgICAgICAgICBpc1NsaWNlID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGZpZWxkID0gbm9kZS5maWVsZHNbaV07XG4gICAgICAgICAgICBub2RlW2ZpZWxkXSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpc1NsaWNlID0gdGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTE9OKSB8fCBpc1NsaWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNTbGljZSkge1xuICAgICAgICAgIHRocm93IHJldGhyb3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgbm9kZXMuQXJyYXkodG9rLmxpbmVubywgdG9rLmNvbG5vLCBbbm9kZV0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzbGljZUxvb2t1cChvYmosIHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgb2JqID0gb2JqIHx8IFtdO1xuXG4gICAgaWYgKHN0YXJ0ID09PSBudWxsKSB7XG4gICAgICBzdGFydCA9IHN0ZXAgPCAwID8gb2JqLmxlbmd0aCAtIDEgOiAwO1xuICAgIH1cblxuICAgIGlmIChzdG9wID09PSBudWxsKSB7XG4gICAgICBzdG9wID0gc3RlcCA8IDAgPyAtMSA6IG9iai5sZW5ndGg7XG4gICAgfSBlbHNlIGlmIChzdG9wIDwgMCkge1xuICAgICAgc3RvcCArPSBvYmoubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA8IDApIHtcbiAgICAgIHN0YXJ0ICs9IG9iai5sZW5ndGg7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSBzdGFydDs7IGkgKz0gc3RlcCkge1xuICAgICAgaWYgKGkgPCAwIHx8IGkgPiBvYmoubGVuZ3RoKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA+IDAgJiYgaSA+PSBzdG9wKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA8IDAgJiYgaSA8PSBzdG9wKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzLnB1c2gocnVudGltZS5tZW1iZXJMb29rdXAob2JqLCBpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNPd25Qcm9wKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gIH1cblxuICB2YXIgQVJSQVlfTUVNQkVSUyA9IHtcbiAgICBwb3A6IGZ1bmN0aW9uIHBvcChpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmRleCA+PSB0aGlzLmxlbmd0aCB8fCBpbmRleCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXlFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH0sXG4gICAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucHVzaChlbGVtZW50KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpc1tpXSA9PT0gZWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlRXJyb3InKTtcbiAgICB9LFxuICAgIGNvdW50OiBmdW5jdGlvbiBjb3VudChlbGVtZW50KSB7XG4gICAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXNbaV0gPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb3VudDtcbiAgICB9LFxuICAgIGluZGV4OiBmdW5jdGlvbiBpbmRleChlbGVtZW50KSB7XG4gICAgICB2YXIgaTtcblxuICAgICAgaWYgKChpID0gdGhpcy5pbmRleE9mKGVsZW1lbnQpKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZUVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpO1xuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24gZmluZChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5pbmRleE9mKGVsZW1lbnQpO1xuICAgIH0sXG4gICAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQoaW5kZXgsIGVsZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMCwgZWxlbSk7XG4gICAgfVxuICB9O1xuICB2YXIgT0JKRUNUX01FTUJFUlMgPSB7XG4gICAgaXRlbXM6IGZ1bmN0aW9uIGl0ZW1zKCkge1xuICAgICAgcmV0dXJuIGxpYi5fZW50cmllcyh0aGlzKTtcbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgICAgcmV0dXJuIGxpYi5fdmFsdWVzKHRoaXMpO1xuICAgIH0sXG4gICAga2V5czogZnVuY3Rpb24ga2V5cygpIHtcbiAgICAgIHJldHVybiBsaWIua2V5cyh0aGlzKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KGtleSwgZGVmKSB7XG4gICAgICB2YXIgb3V0cHV0ID0gdGhpc1trZXldO1xuXG4gICAgICBpZiAob3V0cHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3V0cHV0ID0gZGVmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH0sXG4gICAgaGFzX2tleTogZnVuY3Rpb24gaGFzX2tleShrZXkpIHtcbiAgICAgIHJldHVybiBoYXNPd25Qcm9wKHRoaXMsIGtleSk7XG4gICAgfSxcbiAgICBwb3A6IGZ1bmN0aW9uIHBvcChrZXksIGRlZikge1xuICAgICAgdmFyIG91dHB1dCA9IHRoaXNba2V5XTtcblxuICAgICAgaWYgKG91dHB1dCA9PT0gdW5kZWZpbmVkICYmIGRlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG91dHB1dCA9IGRlZjtcbiAgICAgIH0gZWxzZSBpZiAob3V0cHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXlFcnJvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9LFxuICAgIHBvcGl0ZW06IGZ1bmN0aW9uIHBvcGl0ZW0oKSB7XG4gICAgICB2YXIga2V5cyA9IGxpYi5rZXlzKHRoaXMpO1xuXG4gICAgICBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignS2V5RXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGsgPSBrZXlzWzBdO1xuICAgICAgdmFyIHZhbCA9IHRoaXNba107XG4gICAgICBkZWxldGUgdGhpc1trXTtcbiAgICAgIHJldHVybiBbaywgdmFsXTtcbiAgICB9LFxuICAgIHNldGRlZmF1bHQ6IGZ1bmN0aW9uIHNldGRlZmF1bHQoa2V5LCBkZWYpIHtcbiAgICAgIGlmIChkZWYgPT09IHZvaWQgMCkge1xuICAgICAgICBkZWYgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShrZXkgaW4gdGhpcykpIHtcbiAgICAgICAgdGhpc1trZXldID0gZGVmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoa3dhcmdzKSB7XG4gICAgICBsaWIuX2Fzc2lnbih0aGlzLCBrd2FyZ3MpO1xuXG4gICAgICByZXR1cm4gbnVsbDsgLy8gQWx3YXlzIHJldHVybnMgTm9uZVxuICAgIH1cbiAgfTtcbiAgT0JKRUNUX01FTUJFUlMuaXRlcml0ZW1zID0gT0JKRUNUX01FTUJFUlMuaXRlbXM7XG4gIE9CSkVDVF9NRU1CRVJTLml0ZXJ2YWx1ZXMgPSBPQkpFQ1RfTUVNQkVSUy52YWx1ZXM7XG4gIE9CSkVDVF9NRU1CRVJTLml0ZXJrZXlzID0gT0JKRUNUX01FTUJFUlMua2V5cztcblxuICBydW50aW1lLm1lbWJlckxvb2t1cCA9IGZ1bmN0aW9uIG1lbWJlckxvb2t1cChvYmosIHZhbCwgYXV0b2VzY2FwZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgICByZXR1cm4gc2xpY2VMb29rdXAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBvYmogPSBvYmogfHwge307IC8vIElmIHRoZSBvYmplY3QgaXMgYW4gb2JqZWN0LCByZXR1cm4gYW55IG9mIHRoZSBtZXRob2RzIHRoYXQgUHl0aG9uIHdvdWxkXG4gICAgLy8gb3RoZXJ3aXNlIHByb3ZpZGUuXG5cbiAgICBpZiAobGliLmlzQXJyYXkob2JqKSAmJiBoYXNPd25Qcm9wKEFSUkFZX01FTUJFUlMsIHZhbCkpIHtcbiAgICAgIHJldHVybiBBUlJBWV9NRU1CRVJTW3ZhbF0uYmluZChvYmopO1xuICAgIH1cblxuICAgIGlmIChsaWIuaXNPYmplY3Qob2JqKSAmJiBoYXNPd25Qcm9wKE9CSkVDVF9NRU1CRVJTLCB2YWwpKSB7XG4gICAgICByZXR1cm4gT0JKRUNUX01FTUJFUlNbdmFsXS5iaW5kKG9iaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9yaWdfbWVtYmVyTG9va3VwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmV0dXJuIHVuaW5zdGFsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnN0YWxsQ29tcGF0O1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW51bmp1Y2tzLmpzLm1hcCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL2xpYi9jb250cm9sbGVyJztcbmltcG9ydCBudW5qdWNrcyBmcm9tICdudW5qdWNrcyc7XG5cbmNvbnNvbGUuaW5mbyhcIkBoZWxsby1jb250cm9sbGVyLmpzXCIpO1xuXG5udW5qdWNrcy5jb25maWd1cmUoJy4vZGlzdCcpO1xuXG5mdW5jdGlvbiBnZXROYW1lKHJlcXVlc3Qpe1xuICBsZXQgbmFtZSA9IHtcbiAgICBmbmFtZTogXCJSaWNrXCIsXG4gICAgbG5hbWU6IFwiU2FuY2hlelwiXG4gIH07XG5cbiAgbGV0IG5hbWVQYXJ0cyA9IHJlcXVlc3QucGFyYW1zLm5hbWUgPyByZXF1ZXN0LnBhcmFtcy5uYW1lLnNwbGl0KCcvJykgOiBbXTtcblxuICBuYW1lLmZuYW1lID0gKG5hbWVQYXJ0c1swXSB8fCByZXF1ZXN0LnF1ZXJ5LmZuYW1lKSB8fCBuYW1lLmZuYW1lO1xuICBuYW1lLmxuYW1lID0gKG5hbWVQYXJ0c1sxXSB8fCByZXF1ZXN0LnF1ZXJ5LmxuYW1lKSB8fCBuYW1lLmxuYW1lO1xuXG4gIGNvbnNvbGUuaW5mbyhcIkBoZWxsby1jb250cm9sbGVyLmpzIGluIGdldE5hbWUoKVwiKTtcblxuICByZXR1cm4gbmFtZTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVsbG9Db250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIHRvU3RyaW5nKGNhbGxiYWNrKXtcbiAgICBjb25zb2xlLmluZm8oXCJAaGVsbG8tY29udHJvbGxlci5qcyBpbiBIZWxsb0NvbnRyb2xsZXIgQ2xhc3NcIik7XG4gICAgcmV0dXJuIG51bmp1Y2tzLnJlbmRlcihcbiAgICAgICdoZWxsby5odG1sJyxcbiAgICAgIGdldE5hbWUodGhpcy5jb250ZXh0KSxcbiAgICAgIChlcnIsIGh0bWwpID0+IHtcbiAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhudWxsLCBodG1sKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9saWInO1xuaW1wb3J0IEhlbGxvQ29udHJvbGxlciBmcm9tICcuL2hlbGxvLWNvbnRyb2xsZXInO1xuXG5jb25zdCBhcHBsaWNhdGlvbiA9IG5ldyBBcHBsaWNhdGlvbihcbiAge1xuICAnL2hlbGxvL3tuYW1lKn0nOiBIZWxsb0NvbnRyb2xsZXJcbiAgfSxcbiAge1xuICAgIHRhcmdldDogJ2JvZHknXG4gIH1cbik7XG5cbmFwcGxpY2F0aW9uLnN0YXJ0KCk7XG5cbmNvbnNvbGUuaW5mbygnaGVsbG8gaGVsbG8gY2xpZW50Jyk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoY29udGV4dCl7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICBjb25zb2xlLmluZm8oXCJAbGliL2luZGV4LmpzIENvbnRyb2xsZXIgQ2xhc3MgY29uc3RydWN0b3JcIik7XG4gIH1cblxuICBpbmRleChhcHBsaWNhdGlvbiwgcmVxdWVzdCwgcmVwbHksIGNhbGxiYWNrKXtcbiAgICBjYWxsYmFjayhudWxsKTtcbiAgICBjb25zb2xlLmluZm8oXCJAbGliL2luZGV4LmpzIENvbnRyb2xsZXIgQ2xhc3MgaW5kZXhcIik7XG4gIH1cblxuICB0b1N0cmluZyhjYWxsYmFjayl7XG4gICAgY2FsbGJhY2sobnVsbCwgJ+aIkOWKnycpO1xuICAgIGNvbnNvbGUuaW5mbyhcIkBsaWIvaW5kZXguanMgQ29udHJvbGxlciBDbGFzcyB0b1N0cmluZ1wiKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIHtcbiAgbmF2aWdhdGUodXJsLCBwdXNoPXRydWUpe1xuXG4gICAgaWYoIWhpc3RvcnkucHVzaFN0YXRlKXtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyh1cmwpO1xuXG4gICAgaWYocHVzaCl7XG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgbnVsbCwgdXJsKTtcbiAgICB9XG5cbiAgfVxuXG4gIHN0YXJ0KCl7XG4gICAgdGhpcy5wb1N0YXRlTGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoZSkgPT4ge1xuICAgICAgbGV0IHtwYXRobmFtZSwgc2VhcmNofSA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICAgIGxldCB1cmwgPSAnJHtwYXRobmFtZX0ke3NlYXJjaH0nO1xuICAgICAgdGhpcy5uYXZpZ2F0ZSh1cmwsIGZhbHNlKTtcbiAgICB9KTtcbiAgICB0aGlzLmNsaWNrTGlzdGVuZXIgPSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBsZXQge3RhcmdldH0gPSBlO1xuICAgICAgbGV0IGlkZW50aWZpZXIgPSB0YXJnZXQuZGF0YXNldC5uYXZpZ2F0ZTtcbiAgICAgIGxldCBocmVmID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICBpZihpZGVudGlmaWVyICE9PSB1bmRlZmluZWQpe1xuICAgICAgICBpZihocmVmKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5hdmlnYXRlKCBpZGVudGlmaWVyIHx8IGhyZWYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxufSJdfQ==
