/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lodash.debounce/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.debounce/index.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
  nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs,
      thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      result = wait - timeSinceLastCall;
    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(),
      isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && _typeof(value) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = debounce;

/***/ }),

/***/ "./src/AICC.js":
/*!*********************!*\
  !*** ./src/AICC.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AICC; }
/* harmony export */ });
/* harmony import */ var _Scorm12API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scorm12API */ "./src/Scorm12API.js");
/* harmony import */ var _cmi_aicc_cmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cmi/aicc_cmi */ "./src/cmi/aicc_cmi.js");
/* harmony import */ var _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cmi/scorm12_cmi */ "./src/cmi/scorm12_cmi.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




/**
 * The AICC API class
 */
var AICC = /*#__PURE__*/function (_Scorm12API) {
  /**
   * Constructor to create AICC API object
   * @param {object} settings
   */
  function AICC(settings) {
    var _this;
    _classCallCheck(this, AICC);
    var finalSettings = _objectSpread(_objectSpread({}, {
      mastery_override: false
    }), settings);
    _this = _callSuper(this, AICC, [finalSettings]);
    _this.cmi = new _cmi_aicc_cmi__WEBPACK_IMPORTED_MODULE_1__.CMI();
    _this.nav = new _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_2__.NAV();
    return _this;
  }

  /**
   * Gets or builds a new child element to add to the array.
   *
   * @param {string} CMIElement
   * @param {any} value
   * @param {boolean} foundFirstIndex
   * @return {object}
   */
  _inherits(AICC, _Scorm12API);
  return _createClass(AICC, [{
    key: "getChildElement",
    value: function getChildElement(CMIElement, value, foundFirstIndex) {
      var newChild = _get(_getPrototypeOf(AICC.prototype), "getChildElement", this).call(this, CMIElement, value, foundFirstIndex);
      if (!newChild) {
        if (this.stringMatches(CMIElement, 'cmi\\.evaluation\\.comments\\.\\d+')) {
          newChild = new _cmi_aicc_cmi__WEBPACK_IMPORTED_MODULE_1__.CMIEvaluationCommentsObject();
        } else if (this.stringMatches(CMIElement, 'cmi\\.student_data\\.tries\\.\\d+')) {
          newChild = new _cmi_aicc_cmi__WEBPACK_IMPORTED_MODULE_1__.CMITriesObject();
        } else if (this.stringMatches(CMIElement, 'cmi\\.student_data\\.attempt_records\\.\\d+')) {
          newChild = new _cmi_aicc_cmi__WEBPACK_IMPORTED_MODULE_1__.CMIAttemptRecordsObject();
        }
      }
      return newChild;
    }

    /**
     * Replace the whole API with another
     *
     * @param {AICC} newAPI
     */
  }, {
    key: "replaceWithAnotherScormAPI",
    value: function replaceWithAnotherScormAPI(newAPI) {
      // Data Model
      this.cmi = newAPI.cmi;
      this.nav = newAPI.nav;
    }
  }]);
}(_Scorm12API__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/BaseAPI.js":
/*!************************!*\
  !*** ./src/BaseAPI.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BaseAPI; }
/* harmony export */ });
/* harmony import */ var _cmi_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cmi/common */ "./src/cmi/common.js");
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exceptions */ "./src/exceptions.js");
/* harmony import */ var _constants_error_codes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/error_codes */ "./src/constants/error_codes.js");
/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants/api_constants */ "./src/constants/api_constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }






var global_constants = _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__["default"].global;
var scorm12_error_codes = _constants_error_codes__WEBPACK_IMPORTED_MODULE_2__["default"].scorm12;

/**
 * Base API class for AICC, SCORM 1.2, and SCORM 2004. Should be considered
 * abstract, and never initialized on it's own.
 */
var _timeout = /*#__PURE__*/new WeakMap();
var _error_codes = /*#__PURE__*/new WeakMap();
var _settings = /*#__PURE__*/new WeakMap();
var BaseAPI = /*#__PURE__*/function () {
  /**
   * Constructor for Base API class. Sets some shared API fields, as well as
   * sets up options for the API.
   * @param {object} error_codes
   * @param {object} settings
   */
  function BaseAPI(error_codes, settings) {
    _classCallCheck(this, BaseAPI);
    _classPrivateFieldInitSpec(this, _timeout, void 0);
    _classPrivateFieldInitSpec(this, _error_codes, void 0);
    _classPrivateFieldInitSpec(this, _settings, {
      autocommit: false,
      autocommitSeconds: 10,
      asyncCommit: false,
      sendBeaconCommit: false,
      lmsCommitUrl: false,
      dataCommitFormat: 'json',
      // valid formats are 'json' or 'flattened', 'params'
      commitRequestDataType: 'application/json;charset=UTF-8',
      autoProgress: false,
      logLevel: global_constants.LOG_LEVEL_ERROR,
      selfReportSessionTime: false,
      alwaysSendTotalTime: false,
      strict_errors: true,
      xhrHeaders: {},
      xhrWithCredentials: false,
      responseHandler: function responseHandler(xhr) {
        var result;
        if (typeof xhr !== 'undefined') {
          result = JSON.parse(xhr.responseText);
          if (result === null || !{}.hasOwnProperty.call(result, 'result')) {
            result = {};
            if (xhr.status === 200) {
              result.result = global_constants.SCORM_TRUE;
              result.errorCode = 0;
            } else {
              result.result = global_constants.SCORM_FALSE;
              result.errorCode = 101;
            }
          }
        }
        return result;
      },
      requestHandler: function requestHandler(commitObject) {
        return commitObject;
      },
      onLogMessage: function onLogMessage(messageLevel, logMessage) {
        switch (messageLevel) {
          case global_constants.LOG_LEVEL_ERROR:
            console.error(logMessage);
            break;
          case global_constants.LOG_LEVEL_WARNING:
            console.warn(logMessage);
            break;
          case global_constants.LOG_LEVEL_INFO:
            console.info(logMessage);
            break;
          case global_constants.LOG_LEVEL_DEBUG:
            if (console.debug) {
              console.debug(logMessage);
            } else {
              console.log(logMessage);
            }
            break;
        }
      }
    });
    if ((this instanceof BaseAPI ? this.constructor : void 0) === BaseAPI) {
      throw new TypeError('Cannot construct BaseAPI instances directly');
    }
    this.currentState = global_constants.STATE_NOT_INITIALIZED;
    this.lastErrorCode = 0;
    this.listenerArray = [];
    _classPrivateFieldSet(_timeout, this, null);
    _classPrivateFieldSet(_error_codes, this, error_codes);
    this.settings = settings;
    this.apiLogLevel = this.settings.logLevel;
    this.selfReportSessionTime = this.settings.selfReportSessionTime;
  }

  /**
   * Initialize the API
   * @param {string} callbackName
   * @param {string} initializeMessage
   * @param {string} terminationMessage
   * @return {string}
   */
  return _createClass(BaseAPI, [{
    key: "initialize",
    value: function initialize(callbackName, initializeMessage, terminationMessage) {
      var returnValue = global_constants.SCORM_FALSE;
      if (this.isInitialized()) {
        this.throwSCORMError(_classPrivateFieldGet(_error_codes, this).INITIALIZED, initializeMessage);
      } else if (this.isTerminated()) {
        this.throwSCORMError(_classPrivateFieldGet(_error_codes, this).TERMINATED, terminationMessage);
      } else {
        if (this.selfReportSessionTime) {
          this.cmi.setStartTime();
        }
        this.currentState = global_constants.STATE_INITIALIZED;
        this.lastErrorCode = 0;
        returnValue = global_constants.SCORM_TRUE;
        this.processListeners(callbackName);
      }
      this.apiLog(callbackName, null, 'returned: ' + returnValue, global_constants.LOG_LEVEL_INFO);
      this.clearSCORMError(returnValue);
      return returnValue;
    }

    /**
     * Getter for #error_codes
     * @return {object}
     */
  }, {
    key: "error_codes",
    get: function get() {
      return _classPrivateFieldGet(_error_codes, this);
    }

    /**
     * Getter for #settings
     * @return {object}
     */
  }, {
    key: "settings",
    get: function get() {
      return _classPrivateFieldGet(_settings, this);
    }

    /**
     * Setter for #settings
     * @param {object} settings
     */,
    set: function set(settings) {
      _classPrivateFieldSet(_settings, this, _objectSpread(_objectSpread({}, _classPrivateFieldGet(_settings, this)), settings));
    }

    /**
     * Terminates the current run of the API
     * @param {string} callbackName
     * @param {boolean} checkTerminated
     * @return {string}
     */
  }, {
    key: "terminate",
    value: function terminate(callbackName, checkTerminated) {
      var returnValue = global_constants.SCORM_FALSE;
      if (this.checkState(checkTerminated, _classPrivateFieldGet(_error_codes, this).TERMINATION_BEFORE_INIT, _classPrivateFieldGet(_error_codes, this).MULTIPLE_TERMINATION)) {
        this.currentState = global_constants.STATE_TERMINATED;
        var result = this.storeData(true);
        if (!this.settings.sendBeaconCommit && !this.settings.asyncCommit && typeof result.errorCode !== 'undefined' && result.errorCode > 0) {
          this.throwSCORMError(result.errorCode);
        }
        returnValue = typeof result !== 'undefined' && result.result ? result.result : global_constants.SCORM_FALSE;
        if (checkTerminated) this.lastErrorCode = 0;
        returnValue = global_constants.SCORM_TRUE;
        this.processListeners(callbackName);
      }
      this.apiLog(callbackName, null, 'returned: ' + returnValue, global_constants.LOG_LEVEL_INFO);
      this.clearSCORMError(returnValue);
      return returnValue;
    }

    /**
     * Get the value of the CMIElement.
     *
     * @param {string} callbackName
     * @param {boolean} checkTerminated
     * @param {string} CMIElement
     * @return {string}
     */
  }, {
    key: "getValue",
    value: function getValue(callbackName, checkTerminated, CMIElement) {
      var returnValue;
      if (this.checkState(checkTerminated, _classPrivateFieldGet(_error_codes, this).RETRIEVE_BEFORE_INIT, _classPrivateFieldGet(_error_codes, this).RETRIEVE_AFTER_TERM)) {
        if (checkTerminated) this.lastErrorCode = 0;
        try {
          returnValue = this.getCMIValue(CMIElement);
        } catch (e) {
          if (e instanceof _exceptions__WEBPACK_IMPORTED_MODULE_1__.ValidationError) {
            this.lastErrorCode = e.errorCode;
            returnValue = global_constants.SCORM_FALSE;
          } else {
            if (e.message) {
              console.error(e.message);
            } else {
              console.error(e);
            }
            this.throwSCORMError(_classPrivateFieldGet(_error_codes, this).GENERAL);
          }
        }
        this.processListeners(callbackName, CMIElement);
      }
      this.apiLog(callbackName, CMIElement, ': returned: ' + returnValue, global_constants.LOG_LEVEL_INFO);
      this.clearSCORMError(returnValue);
      return returnValue;
    }

    /**
     * Sets the value of the CMIElement.
     *
     * @param {string} callbackName
     * @param {string} commitCallback
     * @param {boolean} checkTerminated
     * @param {string} CMIElement
     * @param {*} value
     * @return {string}
     */
  }, {
    key: "setValue",
    value: function setValue(callbackName, commitCallback, checkTerminated, CMIElement, value) {
      if (value !== undefined) {
        value = String(value);
      }
      var returnValue = global_constants.SCORM_FALSE;
      if (this.checkState(checkTerminated, _classPrivateFieldGet(_error_codes, this).STORE_BEFORE_INIT, _classPrivateFieldGet(_error_codes, this).STORE_AFTER_TERM)) {
        if (checkTerminated) this.lastErrorCode = 0;
        try {
          returnValue = this.setCMIValue(CMIElement, value);
        } catch (e) {
          if (e instanceof _exceptions__WEBPACK_IMPORTED_MODULE_1__.ValidationError) {
            this.lastErrorCode = e.errorCode;
            returnValue = global_constants.SCORM_FALSE;
          } else {
            if (e.message) {
              console.error(e.message);
            } else {
              console.error(e);
            }
            this.throwSCORMError(_classPrivateFieldGet(_error_codes, this).GENERAL);
          }
        }
        this.processListeners(callbackName, CMIElement, value);
      }
      if (returnValue === undefined) {
        returnValue = global_constants.SCORM_FALSE;
      }

      // If we didn't have any errors while setting the data, go ahead and
      // schedule a commit, if autocommit is turned on
      if (String(this.lastErrorCode) === '0') {
        if (this.settings.autocommit && !_classPrivateFieldGet(_timeout, this)) {
          this.scheduleCommit(this.settings.autocommitSeconds * 1000, commitCallback);
        }
      }
      this.apiLog(callbackName, CMIElement, ': ' + value + ': result: ' + returnValue, global_constants.LOG_LEVEL_INFO);
      this.clearSCORMError(returnValue);
      return returnValue;
    }

    /**
     * Orders LMS to store all content parameters
     * @param {string} callbackName
     * @param {boolean} checkTerminated
     * @return {string}
     */
  }, {
    key: "commit",
    value: function commit(callbackName, checkTerminated) {
      this.clearScheduledCommit();
      var returnValue = global_constants.SCORM_FALSE;
      if (this.checkState(checkTerminated, _classPrivateFieldGet(_error_codes, this).COMMIT_BEFORE_INIT, _classPrivateFieldGet(_error_codes, this).COMMIT_AFTER_TERM)) {
        var result = this.storeData(false);
        if (!this.settings.sendBeaconCommit && !this.settings.asyncCommit && result.errorCode && result.errorCode > 0) {
          this.throwSCORMError(result.errorCode);
        }
        returnValue = typeof result !== 'undefined' && result.result ? result.result : global_constants.SCORM_FALSE;
        this.apiLog(callbackName, 'HttpRequest', ' Result: ' + returnValue, global_constants.LOG_LEVEL_DEBUG);
        if (checkTerminated) this.lastErrorCode = 0;
        this.processListeners(callbackName);
      }
      this.apiLog(callbackName, null, 'returned: ' + returnValue, global_constants.LOG_LEVEL_INFO);
      this.clearSCORMError(returnValue);
      return returnValue;
    }

    /**
     * Returns last error code
     * @param {string} callbackName
     * @return {string}
     */
  }, {
    key: "getLastError",
    value: function getLastError(callbackName) {
      var returnValue = String(this.lastErrorCode);
      this.processListeners(callbackName);
      this.apiLog(callbackName, null, 'returned: ' + returnValue, global_constants.LOG_LEVEL_INFO);
      return returnValue;
    }

    /**
     * Returns the errorNumber error description
     *
     * @param {string} callbackName
     * @param {(string|number)} CMIErrorCode
     * @return {string}
     */
  }, {
    key: "getErrorString",
    value: function getErrorString(callbackName, CMIErrorCode) {
      var returnValue = '';
      if (CMIErrorCode !== null && CMIErrorCode !== '') {
        returnValue = this.getLmsErrorMessageDetails(CMIErrorCode);
        this.processListeners(callbackName);
      }
      this.apiLog(callbackName, null, 'returned: ' + returnValue, global_constants.LOG_LEVEL_INFO);
      return returnValue;
    }

    /**
     * Returns a comprehensive description of the errorNumber error.
     *
     * @param {string} callbackName
     * @param {(string|number)} CMIErrorCode
     * @return {string}
     */
  }, {
    key: "getDiagnostic",
    value: function getDiagnostic(callbackName, CMIErrorCode) {
      var returnValue = '';
      if (CMIErrorCode !== null && CMIErrorCode !== '') {
        returnValue = this.getLmsErrorMessageDetails(CMIErrorCode, true);
        this.processListeners(callbackName);
      }
      this.apiLog(callbackName, null, 'returned: ' + returnValue, global_constants.LOG_LEVEL_INFO);
      return returnValue;
    }

    /**
     * Checks the LMS state and ensures it has been initialized.
     *
     * @param {boolean} checkTerminated
     * @param {number} beforeInitError
     * @param {number} afterTermError
     * @return {boolean}
     */
  }, {
    key: "checkState",
    value: function checkState(checkTerminated, beforeInitError, afterTermError) {
      if (this.isNotInitialized()) {
        this.throwSCORMError(beforeInitError);
        return false;
      } else if (checkTerminated && this.isTerminated()) {
        this.throwSCORMError(afterTermError);
        return false;
      }
      return true;
    }

    /**
     * Logging for all SCORM actions
     *
     * @param {string} functionName
     * @param {string} CMIElement
     * @param {string} logMessage
     * @param {number}messageLevel
     */
  }, {
    key: "apiLog",
    value: function apiLog(functionName, CMIElement, logMessage, messageLevel) {
      logMessage = this.formatMessage(functionName, CMIElement, logMessage);
      if (messageLevel >= this.apiLogLevel) {
        this.settings.onLogMessage(messageLevel, logMessage);
      }
    }

    /**
     * Formats the SCORM messages for easy reading
     *
     * @param {string} functionName
     * @param {string} CMIElement
     * @param {string} message
     * @return {string}
     */
  }, {
    key: "formatMessage",
    value: function formatMessage(functionName, CMIElement, message) {
      var baseLength = 20;
      var messageString = '';
      messageString += functionName;
      var fillChars = baseLength - messageString.length;
      for (var i = 0; i < fillChars; i++) {
        messageString += ' ';
      }
      messageString += ': ';
      if (CMIElement) {
        var CMIElementBaseLength = 70;
        messageString += CMIElement;
        fillChars = CMIElementBaseLength - messageString.length;
        for (var j = 0; j < fillChars; j++) {
          messageString += ' ';
        }
      }
      if (message) {
        messageString += message;
      }
      return messageString;
    }

    /**
     * Checks to see if {str} contains {tester}
     *
     * @param {string} str String to check against
     * @param {string} tester String to check for
     * @return {boolean}
     */
  }, {
    key: "stringMatches",
    value: function stringMatches(str, tester) {
      return str && tester && str.match(tester);
    }

    /**
     * Check to see if the specific object has the given property
     * @param {*} refObject
     * @param {string} attribute
     * @return {boolean}
     * @private
     */
  }, {
    key: "_checkObjectHasProperty",
    value: function _checkObjectHasProperty(refObject, attribute) {
      return Object.hasOwnProperty.call(refObject, attribute) || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(refObject), attribute) || attribute in refObject;
    }

    /**
     * Returns the message that corresponds to errorNumber
     * APIs that inherit BaseAPI should override this function
     *
     * @param {(string|number)} _errorNumber
     * @param {boolean} _detail
     * @return {string}
     * @abstract
     */
  }, {
    key: "getLmsErrorMessageDetails",
    value: function getLmsErrorMessageDetails(_errorNumber, _detail) {
      throw new Error('The getLmsErrorMessageDetails method has not been implemented');
    }

    /**
     * Gets the value for the specific element.
     * APIs that inherit BaseAPI should override this function
     *
     * @param {string} _CMIElement
     * @return {string}
     * @abstract
     */
  }, {
    key: "getCMIValue",
    value: function getCMIValue(_CMIElement) {
      throw new Error('The getCMIValue method has not been implemented');
    }

    /**
     * Sets the value for the specific element.
     * APIs that inherit BaseAPI should override this function
     *
     * @param {string} _CMIElement
     * @param {any} _value
     * @return {string}
     * @abstract
     */
  }, {
    key: "setCMIValue",
    value: function setCMIValue(_CMIElement, _value) {
      throw new Error('The setCMIValue method has not been implemented');
    }

    /**
     * Shared API method to set a valid for a given element.
     *
     * @param {string} methodName
     * @param {boolean} scorm2004
     * @param {string} CMIElement
     * @param {*} value
     * @return {string}
     */
  }, {
    key: "_commonSetCMIValue",
    value: function _commonSetCMIValue(methodName, scorm2004, CMIElement, value) {
      if (!CMIElement || CMIElement === '') {
        return global_constants.SCORM_FALSE;
      }
      var structure = CMIElement.split('.');
      var refObject = this;
      var returnValue = global_constants.SCORM_FALSE;
      var foundFirstIndex = false;
      var invalidErrorMessage = "The data model element passed to ".concat(methodName, " (").concat(CMIElement, ") is not a valid SCORM data model element.");
      var invalidErrorCode = scorm2004 ? _classPrivateFieldGet(_error_codes, this).UNDEFINED_DATA_MODEL : _classPrivateFieldGet(_error_codes, this).GENERAL;
      for (var i = 0; i < structure.length; i++) {
        var attribute = structure[i];
        if (i === structure.length - 1) {
          if (scorm2004 && attribute.substr(0, 8) === '{target=' && typeof refObject._isTargetValid == 'function') {
            this.throwSCORMError(_classPrivateFieldGet(_error_codes, this).READ_ONLY_ELEMENT);
          } else if (!this._checkObjectHasProperty(refObject, attribute)) {
            this.throwSCORMError(invalidErrorCode, invalidErrorMessage);
          } else {
            if (this.isInitialized() && this.stringMatches(CMIElement, '\\.correct_responses\\.\\d+')) {
              this.validateCorrectResponse(CMIElement, value);
            }
            if (!scorm2004 || this.lastErrorCode === 0) {
              refObject[attribute] = value;
              returnValue = global_constants.SCORM_TRUE;
            }
          }
        } else {
          refObject = refObject[attribute];
          if (!refObject) {
            this.throwSCORMError(invalidErrorCode, invalidErrorMessage);
            break;
          }
          if (refObject instanceof _cmi_common__WEBPACK_IMPORTED_MODULE_0__.CMIArray) {
            var index = parseInt(structure[i + 1], 10);

            // SCO is trying to set an item on an array
            if (!isNaN(index)) {
              var item = refObject.childArray[index];
              if (item) {
                refObject = item;
                foundFirstIndex = true;
              } else {
                var newChild = this.getChildElement(CMIElement, value, foundFirstIndex);
                foundFirstIndex = true;
                if (!newChild) {
                  this.throwSCORMError(invalidErrorCode, invalidErrorMessage);
                } else {
                  if (refObject.initialized) newChild.initialize();
                  refObject.childArray.push(newChild);
                  refObject = newChild;
                }
              }

              // Have to update i value to skip the array position
              i++;
            }
          }
        }
      }
      if (returnValue === global_constants.SCORM_FALSE) {
        this.apiLog(methodName, null, "There was an error setting the value for: ".concat(CMIElement, ", value of: ").concat(value), global_constants.LOG_LEVEL_WARNING);
      }
      return returnValue;
    }

    /**
     * Abstract method for validating that a response is correct.
     *
     * @param {string} _CMIElement
     * @param {*} _value
     */
  }, {
    key: "validateCorrectResponse",
    value: function validateCorrectResponse(_CMIElement, _value) {
      // just a stub method
    }

    /**
     * Gets or builds a new child element to add to the array.
     * APIs that inherit BaseAPI should override this method.
     *
     * @param {string} _CMIElement - unused
     * @param {*} _value - unused
     * @param {boolean} _foundFirstIndex - unused
     * @return {*}
     * @abstract
     */
  }, {
    key: "getChildElement",
    value: function getChildElement(_CMIElement, _value, _foundFirstIndex) {
      throw new Error('The getChildElement method has not been implemented');
    }

    /**
     * Gets a value from the CMI Object
     *
     * @param {string} methodName
     * @param {boolean} scorm2004
     * @param {string} CMIElement
     * @return {*}
     */
  }, {
    key: "_commonGetCMIValue",
    value: function _commonGetCMIValue(methodName, scorm2004, CMIElement) {
      if (!CMIElement || CMIElement === '') {
        return '';
      }
      var structure = CMIElement.split('.');
      var refObject = this;
      var attribute = null;
      var uninitializedErrorMessage = "The data model element passed to ".concat(methodName, " (").concat(CMIElement, ") has not been initialized.");
      var invalidErrorMessage = "The data model element passed to ".concat(methodName, " (").concat(CMIElement, ") is not a valid SCORM data model element.");
      var invalidErrorCode = scorm2004 ? _classPrivateFieldGet(_error_codes, this).UNDEFINED_DATA_MODEL : _classPrivateFieldGet(_error_codes, this).GENERAL;
      for (var i = 0; i < structure.length; i++) {
        attribute = structure[i];
        if (!scorm2004) {
          if (i === structure.length - 1) {
            if (!this._checkObjectHasProperty(refObject, attribute)) {
              this.throwSCORMError(invalidErrorCode, invalidErrorMessage);
              return;
            }
          }
        } else {
          if (String(attribute).substr(0, 8) === '{target=' && typeof refObject._isTargetValid == 'function') {
            var target = String(attribute).substr(8, String(attribute).length - 9);
            return refObject._isTargetValid(target);
          } else if (!this._checkObjectHasProperty(refObject, attribute)) {
            this.throwSCORMError(invalidErrorCode, invalidErrorMessage);
            return;
          }
        }
        refObject = refObject[attribute];
        if (refObject === undefined) {
          this.throwSCORMError(invalidErrorCode, invalidErrorMessage);
          break;
        }
        if (refObject instanceof _cmi_common__WEBPACK_IMPORTED_MODULE_0__.CMIArray) {
          var index = parseInt(structure[i + 1], 10);

          // SCO is trying to set an item on an array
          if (!isNaN(index)) {
            var item = refObject.childArray[index];
            if (item) {
              refObject = item;
            } else {
              this.throwSCORMError(_classPrivateFieldGet(_error_codes, this).VALUE_NOT_INITIALIZED, uninitializedErrorMessage);
              break;
            }

            // Have to update i value to skip the array position
            i++;
          }
        }
      }
      if (refObject === null || refObject === undefined) {
        if (!scorm2004) {
          if (attribute === '_children') {
            this.throwSCORMError(scorm12_error_codes.CHILDREN_ERROR);
          } else if (attribute === '_count') {
            this.throwSCORMError(scorm12_error_codes.COUNT_ERROR);
          }
        }
      } else {
        return refObject;
      }
    }

    /**
     * Returns true if the API's current state is STATE_INITIALIZED
     *
     * @return {boolean}
     */
  }, {
    key: "isInitialized",
    value: function isInitialized() {
      return this.currentState === global_constants.STATE_INITIALIZED;
    }

    /**
     * Returns true if the API's current state is STATE_NOT_INITIALIZED
     *
     * @return {boolean}
     */
  }, {
    key: "isNotInitialized",
    value: function isNotInitialized() {
      return this.currentState === global_constants.STATE_NOT_INITIALIZED;
    }

    /**
     * Returns true if the API's current state is STATE_TERMINATED
     *
     * @return {boolean}
     */
  }, {
    key: "isTerminated",
    value: function isTerminated() {
      return this.currentState === global_constants.STATE_TERMINATED;
    }

    /**
     * Provides a mechanism for attaching to a specific SCORM event
     *
     * @param {string} listenerName
     * @param {function} callback
     */
  }, {
    key: "on",
    value: function on(listenerName, callback) {
      if (!callback) return;
      var listenerFunctions = listenerName.split(' ');
      for (var i = 0; i < listenerFunctions.length; i++) {
        var listenerSplit = listenerFunctions[i].split('.');
        if (listenerSplit.length === 0) return;
        var functionName = listenerSplit[0];
        var CMIElement = null;
        if (listenerSplit.length > 1) {
          CMIElement = listenerName.replace(functionName + '.', '');
        }
        this.listenerArray.push({
          functionName: functionName,
          CMIElement: CMIElement,
          callback: callback
        });
        this.apiLog('on', functionName, "Added event listener: ".concat(this.listenerArray.length), global_constants.LOG_LEVEL_INFO);
      }
    }

    /**
     * Provides a mechanism for detaching a specific SCORM event listener
     *
     * @param {string} listenerName
     * @param {function} callback
     */
  }, {
    key: "off",
    value: function off(listenerName, callback) {
      var _this = this;
      if (!callback) return;
      var listenerFunctions = listenerName.split(' ');
      var _loop = function _loop() {
          var listenerSplit = listenerFunctions[i].split('.');
          if (listenerSplit.length === 0) return {
            v: void 0
          };
          var functionName = listenerSplit[0];
          var CMIElement = null;
          if (listenerSplit.length > 1) {
            CMIElement = listenerName.replace(functionName + '.', '');
          }
          var removeIndex = _this.listenerArray.findIndex(function (obj) {
            return obj.functionName === functionName && obj.CMIElement === CMIElement && obj.callback === callback;
          });
          if (removeIndex !== -1) {
            _this.listenerArray.splice(removeIndex, 1);
            _this.apiLog('off', functionName, "Removed event listener: ".concat(_this.listenerArray.length), global_constants.LOG_LEVEL_INFO);
          }
        },
        _ret;
      for (var i = 0; i < listenerFunctions.length; i++) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    }

    /**
     * Provides a mechanism for clearing all listeners from a specific SCORM event
     *
     * @param {string} listenerName
     */
  }, {
    key: "clear",
    value: function clear(listenerName) {
      var _this2 = this;
      var listenerFunctions = listenerName.split(' ');
      var _loop2 = function _loop2() {
          var listenerSplit = listenerFunctions[i].split('.');
          if (listenerSplit.length === 0) return {
            v: void 0
          };
          var functionName = listenerSplit[0];
          var CMIElement = null;
          if (listenerSplit.length > 1) {
            CMIElement = listenerName.replace(functionName + '.', '');
          }
          _this2.listenerArray = _this2.listenerArray.filter(function (obj) {
            return obj.functionName !== functionName && obj.CMIElement !== CMIElement;
          });
        },
        _ret2;
      for (var i = 0; i < listenerFunctions.length; i++) {
        _ret2 = _loop2();
        if (_ret2) return _ret2.v;
      }
    }

    /**
     * Processes any 'on' listeners that have been created
     *
     * @param {string} functionName
     * @param {string} CMIElement
     * @param {*} value
     */
  }, {
    key: "processListeners",
    value: function processListeners(functionName, CMIElement, value) {
      this.apiLog(functionName, CMIElement, value);
      for (var i = 0; i < this.listenerArray.length; i++) {
        var listener = this.listenerArray[i];
        var functionsMatch = listener.functionName === functionName;
        var listenerHasCMIElement = !!listener.CMIElement;
        var CMIElementsMatch = false;
        if (CMIElement && listener.CMIElement && listener.CMIElement.substring(listener.CMIElement.length - 1) === '*') {
          CMIElementsMatch = CMIElement.indexOf(listener.CMIElement.substring(0, listener.CMIElement.length - 1)) === 0;
        } else {
          CMIElementsMatch = listener.CMIElement === CMIElement;
        }
        if (functionsMatch && (!listenerHasCMIElement || CMIElementsMatch)) {
          listener.callback(CMIElement, value);
        }
      }
    }

    /**
     * Throws a SCORM error
     *
     * @param {number} errorNumber
     * @param {string} message
     */
  }, {
    key: "throwSCORMError",
    value: function throwSCORMError(errorNumber, message) {
      if (!message) {
        message = this.getLmsErrorMessageDetails(errorNumber);
      }
      this.apiLog('throwSCORMError', null, errorNumber + ': ' + message, global_constants.LOG_LEVEL_ERROR);
      this.lastErrorCode = String(errorNumber);
    }

    /**
     * Clears the last SCORM error code on success.
     *
     * @param {string} success
     */
  }, {
    key: "clearSCORMError",
    value: function clearSCORMError(success) {
      if (success !== undefined && success !== global_constants.SCORM_FALSE) {
        this.lastErrorCode = 0;
      }
    }

    /**
     * Attempts to store the data to the LMS, logs data if no LMS configured
     * APIs that inherit BaseAPI should override this function
     *
     * @param {boolean} _calculateTotalTime
     * @return {string}
     * @abstract
     */
  }, {
    key: "storeData",
    value: function storeData(_calculateTotalTime) {
      throw new Error('The storeData method has not been implemented');
    }

    /**
     * Load the CMI from a flattened JSON object
     * @param {object} json
     * @param {string} CMIElement
     */
  }, {
    key: "loadFromFlattenedJSON",
    value: function loadFromFlattenedJSON(json, CMIElement) {
      var _this3 = this;
      if (!this.isNotInitialized()) {
        console.error('loadFromFlattenedJSON can only be called before the call to lmsInitialize.');
        return;
      }

      /**
       * Test match pattern.
       *
       * @param {string} a
       * @param {string} c
       * @param {RegExp} a_pattern
       * @return {number}
       */
      function testPattern(a, c, a_pattern) {
        var a_match = a.match(a_pattern);
        var c_match;
        if (a_match !== null && (c_match = c.match(a_pattern)) !== null) {
          var a_num = Number(a_match[2]);
          var c_num = Number(c_match[2]);
          if (a_num === c_num) {
            if (a_match[3] === 'id') {
              return -1;
            } else if (a_match[3] === 'type') {
              if (c_match[3] === 'id') {
                return 1;
              } else {
                return -1;
              }
            } else {
              return 1;
            }
          }
          return a_num - c_num;
        }
        return null;
      }
      var int_pattern = /^(cmi\.interactions\.)(\d+)\.(.*)$/;
      var obj_pattern = /^(cmi\.objectives\.)(\d+)\.(.*)$/;
      var result = Object.keys(json).map(function (key) {
        return [String(key), json[key]];
      });

      // CMI interactions need to have id and type loaded before any other fields
      result.sort(function (_ref, _ref2) {
        var _ref3 = _slicedToArray(_ref, 2),
          a = _ref3[0],
          b = _ref3[1];
        var _ref4 = _slicedToArray(_ref2, 2),
          c = _ref4[0],
          d = _ref4[1];
        var test;
        if ((test = testPattern(a, c, int_pattern)) !== null) {
          return test;
        }
        if ((test = testPattern(a, c, obj_pattern)) !== null) {
          return test;
        }
        if (a < c) {
          return -1;
        }
        if (a > c) {
          return 1;
        }
        return 0;
      });
      var obj;
      result.forEach(function (element) {
        obj = {};
        obj[element[0]] = element[1];
        _this3.loadFromJSON((0,_utilities__WEBPACK_IMPORTED_MODULE_4__.unflatten)(obj), CMIElement);
      });
    }

    /**
     * Loads CMI data from a JSON object.
     *
     * @param {object} json
     * @param {string} CMIElement
     */
  }, {
    key: "loadFromJSON",
    value: function loadFromJSON(json, CMIElement) {
      if (!this.isNotInitialized()) {
        console.error('loadFromJSON can only be called before the call to lmsInitialize.');
        return;
      }
      CMIElement = CMIElement !== undefined ? CMIElement : 'cmi';
      this.startingData = json;

      // could this be refactored down to flatten(json) then setCMIValue on each?
      for (var key in json) {
        if ({}.hasOwnProperty.call(json, key) && json[key]) {
          var currentCMIElement = (CMIElement ? CMIElement + '.' : '') + key;
          var value = json[key];
          if (value['childArray']) {
            for (var i = 0; i < value['childArray'].length; i++) {
              this.loadFromJSON(value['childArray'][i], currentCMIElement + '.' + i);
            }
          } else if (value.constructor === Object) {
            this.loadFromJSON(value, currentCMIElement);
          } else {
            this.setCMIValue(currentCMIElement, value);
          }
        }
      }
    }

    /**
     * Render the CMI object to JSON for sending to an LMS.
     *
     * @return {string}
     */
  }, {
    key: "renderCMIToJSONString",
    value: function renderCMIToJSONString() {
      var cmi = this.cmi;
      // Do we want/need to return fields that have no set value?
      // return JSON.stringify({ cmi }, (k, v) => v === undefined ? null : v, 2);
      return JSON.stringify({
        cmi: cmi
      });
    }

    /**
     * Returns a JS object representing the current cmi
     * @return {object}
     */
  }, {
    key: "renderCMIToJSONObject",
    value: function renderCMIToJSONObject() {
      // Do we want/need to return fields that have no set value?
      // return JSON.stringify({ cmi }, (k, v) => v === undefined ? null : v, 2);
      return JSON.parse(this.renderCMIToJSONString());
    }

    /**
     * Render the cmi object to the proper format for LMS commit
     * APIs that inherit BaseAPI should override this function
     *
     * @param {boolean} _terminateCommit
     * @return {*}
     * @abstract
     */
  }, {
    key: "renderCommitCMI",
    value: function renderCommitCMI(_terminateCommit) {
      throw new Error('The storeData method has not been implemented');
    }

    /**
     * Send the request to the LMS
     * @param {string} url
     * @param {object|Array} params
     * @param {boolean} immediate
     * @return {object}
     */
  }, {
    key: "processHttpRequest",
    value: function processHttpRequest(url, params) {
      var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var api = this;
      var process = function process(url, params, settings, error_codes) {
        var genericError = {
          'result': global_constants.SCORM_FALSE,
          'errorCode': error_codes.GENERAL
        };
        var result;
        if (!settings.sendBeaconCommit) {
          var httpReq = new XMLHttpRequest();
          httpReq.open('POST', url, settings.asyncCommit);
          if (Object.keys(settings.xhrHeaders).length) {
            Object.keys(settings.xhrHeaders).forEach(function (header) {
              httpReq.setRequestHeader(header, settings.xhrHeaders[header]);
            });
          }
          httpReq.withCredentials = settings.xhrWithCredentials;
          if (settings.asyncCommit) {
            httpReq.onload = function (e) {
              if (typeof settings.responseHandler === 'function') {
                result = settings.responseHandler(httpReq);
              } else {
                result = JSON.parse(httpReq.responseText);
              }
            };
          }
          try {
            params = settings.requestHandler(params);
            if (params instanceof Array) {
              httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              httpReq.send(params.join('&'));
            } else {
              httpReq.setRequestHeader('Content-Type', settings.commitRequestDataType);
              httpReq.send(JSON.stringify(params));
            }
            if (!settings.asyncCommit) {
              if (typeof settings.responseHandler === 'function') {
                result = settings.responseHandler(httpReq);
              } else {
                result = JSON.parse(httpReq.responseText);
              }
            } else {
              result = {};
              result.result = global_constants.SCORM_TRUE;
              result.errorCode = 0;
              api.processListeners('CommitSuccess');
              return result;
            }
          } catch (e) {
            console.error(e);
            api.processListeners('CommitError');
            return genericError;
          }
        } else {
          try {
            params = settings.requestHandler(params);
            fetch(url, {
              method: 'POST',
              body: params instanceof Array ? params.join('&') : JSON.stringify(params),
              headers: _objectSpread(_objectSpread({}, settings.xhrHeaders), {}, {
                'Content-Type': settings.commitRequestDataType
              }),
              credentials: settings.xhrWithCredentials ? 'include' : undefined,
              keepalive: true
            });
            result = {};
            result.result = global_constants.SCORM_TRUE;
            result.errorCode = 0;
          } catch (e) {
            console.error(e);
            api.processListeners('CommitError');
            return genericError;
          }
        }
        if (typeof result === 'undefined') {
          api.processListeners('CommitError');
          return genericError;
        }
        if (result.result === true || result.result === global_constants.SCORM_TRUE) {
          api.processListeners('CommitSuccess');
        } else {
          api.processListeners('CommitError');
        }
        return result;
      };
      if (typeof (lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default()) !== 'undefined') {
        var debounced = lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default()(process, 500);
        debounced(url, params, this.settings, this.error_codes);

        // if we're terminating, go ahead and commit immediately
        if (immediate) {
          debounced.flush();
        }
        return {
          result: global_constants.SCORM_TRUE,
          errorCode: 0
        };
      } else {
        return process(url, params, this.settings, this.error_codes);
      }
    }

    /**
     * Throws a SCORM error
     *
     * @param {number} when - the number of milliseconds to wait before committing
     * @param {string} callback - the name of the commit event callback
     */
  }, {
    key: "scheduleCommit",
    value: function scheduleCommit(when, callback) {
      _classPrivateFieldSet(_timeout, this, new ScheduledCommit(this, when, callback));
      this.apiLog('scheduleCommit', '', 'scheduled', global_constants.LOG_LEVEL_DEBUG);
    }

    /**
     * Clears and cancels any currently scheduled commits
     */
  }, {
    key: "clearScheduledCommit",
    value: function clearScheduledCommit() {
      if (_classPrivateFieldGet(_timeout, this)) {
        _classPrivateFieldGet(_timeout, this).cancel();
        _classPrivateFieldSet(_timeout, this, null);
        this.apiLog('clearScheduledCommit', '', 'cleared', global_constants.LOG_LEVEL_DEBUG);
      }
    }
  }]);
}();
/**
 * Private class that wraps a timeout call to the commit() function
 */

var _API = /*#__PURE__*/new WeakMap();
var _cancelled = /*#__PURE__*/new WeakMap();
var _timeout2 = /*#__PURE__*/new WeakMap();
var _callback = /*#__PURE__*/new WeakMap();
var ScheduledCommit = /*#__PURE__*/function () {
  /**
   * Constructor for ScheduledCommit
   * @param {BaseAPI} API
   * @param {number} when
   * @param {string} callback
   */
  function ScheduledCommit(API, when, callback) {
    _classCallCheck(this, ScheduledCommit);
    _classPrivateFieldInitSpec(this, _API, void 0);
    _classPrivateFieldInitSpec(this, _cancelled, false);
    _classPrivateFieldInitSpec(this, _timeout2, void 0);
    _classPrivateFieldInitSpec(this, _callback, void 0);
    _classPrivateFieldSet(_API, this, API);
    _classPrivateFieldSet(_timeout2, this, setTimeout(this.wrapper.bind(this), when));
    _classPrivateFieldSet(_callback, this, callback);
  }

  /**
   * Cancel any currently scheduled commit
   */
  return _createClass(ScheduledCommit, [{
    key: "cancel",
    value: function cancel() {
      _classPrivateFieldSet(_cancelled, this, true);
      if (_classPrivateFieldGet(_timeout2, this)) {
        clearTimeout(_classPrivateFieldGet(_timeout2, this));
      }
    }

    /**
     * Wrap the API commit call to check if the call has already been cancelled
     */
  }, {
    key: "wrapper",
    value: function wrapper() {
      if (!_classPrivateFieldGet(_cancelled, this)) {
        _classPrivateFieldGet(_API, this).commit(_classPrivateFieldGet(_callback, this));
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/Scorm12API.js":
/*!***************************!*\
  !*** ./src/Scorm12API.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Scorm12API; }
/* harmony export */ });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/BaseAPI.js");
/* harmony import */ var _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cmi/scorm12_cmi */ "./src/cmi/scorm12_cmi.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");
/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants/api_constants */ "./src/constants/api_constants.js");
/* harmony import */ var _constants_error_codes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants/error_codes */ "./src/constants/error_codes.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var scorm12_constants = _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__["default"].scorm12;
var global_constants = _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__["default"].global;
var scorm12_error_codes = _constants_error_codes__WEBPACK_IMPORTED_MODULE_4__["default"].scorm12;

/**
 * API class for SCORM 1.2
 */
var Scorm12API = /*#__PURE__*/function (_BaseAPI) {
  /**
   * Constructor for SCORM 1.2 API
   * @param {object} settings
   */
  function Scorm12API(settings) {
    var _this;
    _classCallCheck(this, Scorm12API);
    var finalSettings = _objectSpread(_objectSpread({}, {
      mastery_override: false
    }), settings);
    _this = _callSuper(this, Scorm12API, [scorm12_error_codes, finalSettings]);
    _this.cmi = new _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_1__.CMI();
    _this.nav = new _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_1__.NAV();

    // Rename functions to match 1.2 Spec and expose to modules
    _this.LMSInitialize = _this.lmsInitialize;
    _this.LMSFinish = _this.lmsFinish;
    _this.LMSGetValue = _this.lmsGetValue;
    _this.LMSSetValue = _this.lmsSetValue;
    _this.LMSCommit = _this.lmsCommit;
    _this.LMSGetLastError = _this.lmsGetLastError;
    _this.LMSGetErrorString = _this.lmsGetErrorString;
    _this.LMSGetDiagnostic = _this.lmsGetDiagnostic;
    return _this;
  }

  /**
   * lmsInitialize function from SCORM 1.2 Spec
   *
   * @return {string} bool
   */
  _inherits(Scorm12API, _BaseAPI);
  return _createClass(Scorm12API, [{
    key: "lmsInitialize",
    value: function lmsInitialize() {
      this.cmi.initialize();
      return this.initialize('LMSInitialize', 'LMS was already initialized!', 'LMS is already finished!');
    }

    /**
     * LMSFinish function from SCORM 1.2 Spec
     *
     * @return {string} bool
     */
  }, {
    key: "lmsFinish",
    value: function lmsFinish() {
      var result = this.terminate('LMSFinish', true);
      if (result === global_constants.SCORM_TRUE) {
        if (this.nav.event !== '') {
          if (this.nav.event === 'continue') {
            this.processListeners('SequenceNext');
          } else {
            this.processListeners('SequencePrevious');
          }
        } else if (this.settings.autoProgress) {
          this.processListeners('SequenceNext');
        }
      }
      return result;
    }

    /**
     * LMSGetValue function from SCORM 1.2 Spec
     *
     * @param {string} CMIElement
     * @return {string}
     */
  }, {
    key: "lmsGetValue",
    value: function lmsGetValue(CMIElement) {
      return this.getValue('LMSGetValue', false, CMIElement);
    }

    /**
     * LMSSetValue function from SCORM 1.2 Spec
     *
     * @param {string} CMIElement
     * @param {*} value
     * @return {string}
     */
  }, {
    key: "lmsSetValue",
    value: function lmsSetValue(CMIElement, value) {
      return this.setValue('LMSSetValue', 'LMSCommit', false, CMIElement, value);
    }

    /**
     * LMSCommit function from SCORM 1.2 Spec
     *
     * @return {string} bool
     */
  }, {
    key: "lmsCommit",
    value: function lmsCommit() {
      return this.commit('LMSCommit', false);
    }

    /**
     * LMSGetLastError function from SCORM 1.2 Spec
     *
     * @return {string}
     */
  }, {
    key: "lmsGetLastError",
    value: function lmsGetLastError() {
      return this.getLastError('LMSGetLastError');
    }

    /**
     * LMSGetErrorString function from SCORM 1.2 Spec
     *
     * @param {string} CMIErrorCode
     * @return {string}
     */
  }, {
    key: "lmsGetErrorString",
    value: function lmsGetErrorString(CMIErrorCode) {
      return this.getErrorString('LMSGetErrorString', CMIErrorCode);
    }

    /**
     * LMSGetDiagnostic function from SCORM 1.2 Spec
     *
     * @param {string} CMIErrorCode
     * @return {string}
     */
  }, {
    key: "lmsGetDiagnostic",
    value: function lmsGetDiagnostic(CMIErrorCode) {
      return this.getDiagnostic('LMSGetDiagnostic', CMIErrorCode);
    }

    /**
     * Sets a value on the CMI Object
     *
     * @param {string} CMIElement
     * @param {*} value
     * @return {string}
     */
  }, {
    key: "setCMIValue",
    value: function setCMIValue(CMIElement, value) {
      return this._commonSetCMIValue('LMSSetValue', false, CMIElement, value);
    }

    /**
     * Gets a value from the CMI Object
     *
     * @param {string} CMIElement
     * @return {*}
     */
  }, {
    key: "getCMIValue",
    value: function getCMIValue(CMIElement) {
      return this._commonGetCMIValue('getCMIValue', false, CMIElement);
    }

    /**
     * Gets or builds a new child element to add to the array.
     *
     * @param {string} CMIElement
     * @param {*} value
     * @param {boolean} foundFirstIndex
     * @return {object}
     */
  }, {
    key: "getChildElement",
    value: function getChildElement(CMIElement, value, foundFirstIndex) {
      var newChild;
      if (this.stringMatches(CMIElement, 'cmi\\.objectives\\.\\d+')) {
        newChild = new _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_1__.CMIObjectivesObject();
      } else if (foundFirstIndex && this.stringMatches(CMIElement, 'cmi\\.interactions\\.\\d+\\.correct_responses\\.\\d+')) {
        newChild = new _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_1__.CMIInteractionsCorrectResponsesObject();
      } else if (foundFirstIndex && this.stringMatches(CMIElement, 'cmi\\.interactions\\.\\d+\\.objectives\\.\\d+')) {
        newChild = new _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_1__.CMIInteractionsObjectivesObject();
      } else if (!foundFirstIndex && this.stringMatches(CMIElement, 'cmi\\.interactions\\.\\d+')) {
        newChild = new _cmi_scorm12_cmi__WEBPACK_IMPORTED_MODULE_1__.CMIInteractionsObject();
      }
      return newChild;
    }

    /**
     * Validates Correct Response values
     *
     * @param {string} CMIElement
     * @param {*} value
     * @return {boolean}
     */
  }, {
    key: "validateCorrectResponse",
    value: function validateCorrectResponse(CMIElement, value) {
      return true;
    }

    /**
     * Returns the message that corresponds to errorNumber.
     *
     * @param {*} errorNumber
     * @param {boolean} detail
     * @return {string}
     */
  }, {
    key: "getLmsErrorMessageDetails",
    value: function getLmsErrorMessageDetails(errorNumber, detail) {
      var basicMessage = 'No Error';
      var detailMessage = 'No Error';

      // Set error number to string since inconsistent from modules if string or number
      errorNumber = String(errorNumber);
      if (scorm12_constants.error_descriptions[errorNumber]) {
        basicMessage = scorm12_constants.error_descriptions[errorNumber].basicMessage;
        detailMessage = scorm12_constants.error_descriptions[errorNumber].detailMessage;
      }
      return detail ? detailMessage : basicMessage;
    }

    /**
     * Replace the whole API with another
     *
     * @param {Scorm12API} newAPI
     */
  }, {
    key: "replaceWithAnotherScormAPI",
    value: function replaceWithAnotherScormAPI(newAPI) {
      // Data Model
      this.cmi = newAPI.cmi;
    }

    /**
     * Render the cmi object to the proper format for LMS commit
     *
     * @param {boolean} terminateCommit
     * @return {object|Array}
     */
  }, {
    key: "renderCommitCMI",
    value: function renderCommitCMI(terminateCommit) {
      var cmiExport = this.renderCMIToJSONObject();
      if (terminateCommit) {
        cmiExport.cmi.core.total_time = this.cmi.getCurrentTotalTime();
      }
      var result = [];
      var flattened = _utilities__WEBPACK_IMPORTED_MODULE_2__.flatten(cmiExport);
      switch (this.settings.dataCommitFormat) {
        case 'flattened':
          return _utilities__WEBPACK_IMPORTED_MODULE_2__.flatten(cmiExport);
        case 'params':
          for (var item in flattened) {
            if ({}.hasOwnProperty.call(flattened, item)) {
              result.push("".concat(item, "=").concat(flattened[item]));
            }
          }
          return result;
        case 'json':
        default:
          return cmiExport;
      }
    }

    /**
     * Attempts to store the data to the LMS
     *
     * @param {boolean} terminateCommit
     * @return {string}
     */
  }, {
    key: "storeData",
    value: function storeData(terminateCommit) {
      if (terminateCommit) {
        var originalStatus = this.cmi.core.lesson_status;
        if (originalStatus === 'not attempted') {
          this.cmi.core.lesson_status = 'completed';
        }
        if (this.cmi.core.lesson_mode === 'normal') {
          if (this.cmi.core.credit === 'credit') {
            if (this.settings.mastery_override && this.cmi.student_data.mastery_score !== '' && this.cmi.core.score.raw !== '') {
              if (parseFloat(this.cmi.core.score.raw) >= parseFloat(this.cmi.student_data.mastery_score)) {
                this.cmi.core.lesson_status = 'passed';
              } else {
                this.cmi.core.lesson_status = 'failed';
              }
            }
          }
        } else if (this.cmi.core.lesson_mode === 'browse') {
          var _this$startingData, _this$startingData$cm, _this$startingData$cm2;
          if ((((_this$startingData = this.startingData) === null || _this$startingData === void 0 ? void 0 : (_this$startingData$cm = _this$startingData.cmi) === null || _this$startingData$cm === void 0 ? void 0 : (_this$startingData$cm2 = _this$startingData$cm.core) === null || _this$startingData$cm2 === void 0 ? void 0 : _this$startingData$cm2.lesson_status) || '') === '' && originalStatus === 'not attempted') {
            this.cmi.core.lesson_status = 'browsed';
          }
        }
      }
      var commitObject = this.renderCommitCMI(terminateCommit || this.settings.alwaysSendTotalTime);
      if (this.apiLogLevel === global_constants.LOG_LEVEL_DEBUG) {
        console.debug('Commit (terminated: ' + (terminateCommit ? 'yes' : 'no') + '): ');
        console.debug(commitObject);
      }
      if (this.settings.lmsCommitUrl) {
        return this.processHttpRequest(this.settings.lmsCommitUrl, commitObject, terminateCommit);
      } else {
        return global_constants.SCORM_TRUE;
      }
    }
  }]);
}(_BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/cmi/aicc_cmi.js":
/*!*****************************!*\
  !*** ./src/cmi/aicc_cmi.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CMI: function() { return /* binding */ CMI; },
/* harmony export */   CMIAttemptRecords: function() { return /* binding */ CMIAttemptRecords; },
/* harmony export */   CMIAttemptRecordsObject: function() { return /* binding */ CMIAttemptRecordsObject; },
/* harmony export */   CMIEvaluationCommentsObject: function() { return /* binding */ CMIEvaluationCommentsObject; },
/* harmony export */   CMIPaths: function() { return /* binding */ CMIPaths; },
/* harmony export */   CMIPathsObject: function() { return /* binding */ CMIPathsObject; },
/* harmony export */   CMIStudentDemographics: function() { return /* binding */ CMIStudentDemographics; },
/* harmony export */   CMITries: function() { return /* binding */ CMITries; },
/* harmony export */   CMITriesObject: function() { return /* binding */ CMITriesObject; }
/* harmony export */ });
/* harmony import */ var _scorm12_cmi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scorm12_cmi */ "./src/cmi/scorm12_cmi.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/cmi/common.js");
/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/api_constants */ "./src/constants/api_constants.js");
/* harmony import */ var _constants_regex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/regex */ "./src/constants/regex.js");
/* harmony import */ var _constants_error_codes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/error_codes */ "./src/constants/error_codes.js");
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../exceptions */ "./src/exceptions.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var aicc_constants = _constants_api_constants__WEBPACK_IMPORTED_MODULE_2__["default"].aicc;
var aicc_regex = _constants_regex__WEBPACK_IMPORTED_MODULE_3__["default"].aicc;
var aicc_error_codes = _constants_error_codes__WEBPACK_IMPORTED_MODULE_4__["default"].scorm12;

/**
 * Helper method for throwing Read Only error
 */
function throwReadOnlyError() {
  throw new _exceptions__WEBPACK_IMPORTED_MODULE_5__.AICCValidationError(aicc_error_codes.READ_ONLY_ELEMENT);
}

/**
 * Helper method, no reason to have to pass the same error codes every time
 * @param {*} value
 * @param {string} regexPattern
 * @param {boolean} allowEmptyString
 * @return {boolean}
 */
function checkAICCValidFormat(value, regexPattern, allowEmptyString) {
  return (0,_common__WEBPACK_IMPORTED_MODULE_1__.checkValidFormat)(value, regexPattern, aicc_error_codes.TYPE_MISMATCH, _exceptions__WEBPACK_IMPORTED_MODULE_5__.AICCValidationError, allowEmptyString);
}

/**
 * CMI Class for AICC
 */
var CMI = /*#__PURE__*/function (_Scorm12CMI$CMI) {
  /**
   * Constructor for AICC CMI object
   * @param {boolean} initialized
   */
  function CMI(initialized) {
    var _this;
    _classCallCheck(this, CMI);
    _this = _callSuper(this, CMI, [aicc_constants.cmi_children]);
    if (initialized) _this.initialize();
    _this.student_preference = new AICCStudentPreferences();
    _this.student_data = new AICCCMIStudentData();
    _this.student_demographics = new CMIStudentDemographics();
    _this.evaluation = new CMIEvaluation();
    _this.paths = new CMIPaths();
    return _this;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(CMI, _Scorm12CMI$CMI);
  return _createClass(CMI, [{
    key: "initialize",
    value: function initialize() {
      var _this$student_prefere, _this$student_data, _this$student_demogra, _this$evaluation, _this$paths;
      _get(_getPrototypeOf(CMI.prototype), "initialize", this).call(this);
      (_this$student_prefere = this.student_preference) === null || _this$student_prefere === void 0 ? void 0 : _this$student_prefere.initialize();
      (_this$student_data = this.student_data) === null || _this$student_data === void 0 ? void 0 : _this$student_data.initialize();
      (_this$student_demogra = this.student_demographics) === null || _this$student_demogra === void 0 ? void 0 : _this$student_demogra.initialize();
      (_this$evaluation = this.evaluation) === null || _this$evaluation === void 0 ? void 0 : _this$evaluation.initialize();
      (_this$paths = this.paths) === null || _this$paths === void 0 ? void 0 : _this$paths.initialize();
    }

    /**
     * toJSON for cmi
     *
     * @return {
     *    {
     *      suspend_data: string,
     *      launch_data: string,
     *      comments: string,
     *      comments_from_lms: string,
     *      core: CMICore,
     *      objectives: CMIObjectives,
     *      student_data: CMIStudentData,
     *      student_preference: CMIStudentPreference,
     *      interactions: CMIInteractions,
     *      paths: CMIPaths
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'suspend_data': this.suspend_data,
        'launch_data': this.launch_data,
        'comments': this.comments,
        'comments_from_lms': this.comments_from_lms,
        'core': this.core,
        'objectives': this.objectives,
        'student_data': this.student_data,
        'student_preference': this.student_preference,
        'student_demographics': this.student_demographics,
        'interactions': this.interactions,
        'evaluation': this.evaluation,
        'paths': this.paths
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_scorm12_cmi__WEBPACK_IMPORTED_MODULE_0__.CMI);

/**
 * AICC Evaluation object
 */
var CMIEvaluation = /*#__PURE__*/function (_BaseCMI) {
  /**
   * Constructor for AICC Evaluation object
   */
  function CMIEvaluation() {
    var _this2;
    _classCallCheck(this, CMIEvaluation);
    _this2 = _callSuper(this, CMIEvaluation);
    _this2.comments = new CMIEvaluationComments();
    return _this2;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(CMIEvaluation, _BaseCMI);
  return _createClass(CMIEvaluation, [{
    key: "initialize",
    value: function initialize() {
      var _this$comments;
      _get(_getPrototypeOf(CMIEvaluation.prototype), "initialize", this).call(this);
      (_this$comments = this.comments) === null || _this$comments === void 0 ? void 0 : _this$comments.initialize();
    }

    /**
     * toJSON for cmi.evaluation object
     * @return {{comments: CMIEvaluationComments}}
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'comments': this.comments
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_1__.BaseCMI);
/**
 * Class representing AICC's cmi.evaluation.comments object
 */
var CMIEvaluationComments = /*#__PURE__*/function (_CMIArray) {
  /**
   * Constructor for AICC Evaluation Comments object
   */
  function CMIEvaluationComments() {
    _classCallCheck(this, CMIEvaluationComments);
    return _callSuper(this, CMIEvaluationComments, [{
      children: aicc_constants.comments_children,
      errorCode: aicc_error_codes.INVALID_SET_VALUE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_5__.AICCValidationError
    }]);
  }
  _inherits(CMIEvaluationComments, _CMIArray);
  return _createClass(CMIEvaluationComments);
}(_common__WEBPACK_IMPORTED_MODULE_1__.CMIArray);
/**
 * StudentPreferences class for AICC
 */
var _lesson_type = /*#__PURE__*/new WeakMap();
var _text_color = /*#__PURE__*/new WeakMap();
var _text_location = /*#__PURE__*/new WeakMap();
var _text_size = /*#__PURE__*/new WeakMap();
var _video = /*#__PURE__*/new WeakMap();
var AICCStudentPreferences = /*#__PURE__*/function (_Scorm12CMI$CMIStuden) {
  /**
   * Constructor for AICC Student Preferences object
   */
  function AICCStudentPreferences() {
    var _this3;
    _classCallCheck(this, AICCStudentPreferences);
    _this3 = _callSuper(this, AICCStudentPreferences, [aicc_constants.student_preference_children]);
    _classPrivateFieldInitSpec(_this3, _lesson_type, '');
    _classPrivateFieldInitSpec(_this3, _text_color, '');
    _classPrivateFieldInitSpec(_this3, _text_location, '');
    _classPrivateFieldInitSpec(_this3, _text_size, '');
    _classPrivateFieldInitSpec(_this3, _video, '');
    _this3.windows = new _common__WEBPACK_IMPORTED_MODULE_1__.CMIArray({
      errorCode: aicc_error_codes.INVALID_SET_VALUE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_5__.AICCValidationError,
      children: ''
    });
    return _this3;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(AICCStudentPreferences, _Scorm12CMI$CMIStuden);
  return _createClass(AICCStudentPreferences, [{
    key: "initialize",
    value: function initialize() {
      var _this$windows;
      _get(_getPrototypeOf(AICCStudentPreferences.prototype), "initialize", this).call(this);
      (_this$windows = this.windows) === null || _this$windows === void 0 ? void 0 : _this$windows.initialize();
    }
  }, {
    key: "lesson_type",
    get:
    /**
     * Getter for #lesson_type
     * @return {string}
     */
    function get() {
      return _classPrivateFieldGet(_lesson_type, this);
    }

    /**
     * Setter for #lesson_type
     * @param {string} lesson_type
     */,
    set: function set(lesson_type) {
      if (checkAICCValidFormat(lesson_type, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_lesson_type, this, lesson_type);
      }
    }

    /**
     * Getter for #text_color
     * @return {string}
     */
  }, {
    key: "text_color",
    get: function get() {
      return _classPrivateFieldGet(_text_color, this);
    }

    /**
     * Setter for #text_color
     * @param {string} text_color
     */,
    set: function set(text_color) {
      if (checkAICCValidFormat(text_color, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_text_color, this, text_color);
      }
    }

    /**
     * Getter for #text_location
     * @return {string}
     */
  }, {
    key: "text_location",
    get: function get() {
      return _classPrivateFieldGet(_text_location, this);
    }

    /**
     * Setter for #text_location
     * @param {string} text_location
     */,
    set: function set(text_location) {
      if (checkAICCValidFormat(text_location, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_text_location, this, text_location);
      }
    }

    /**
     * Getter for #text_size
     * @return {string}
     */
  }, {
    key: "text_size",
    get: function get() {
      return _classPrivateFieldGet(_text_size, this);
    }

    /**
     * Setter for #text_size
     * @param {string} text_size
     */,
    set: function set(text_size) {
      if (checkAICCValidFormat(text_size, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_text_size, this, text_size);
      }
    }

    /**
     * Getter for #video
     * @return {string}
     */
  }, {
    key: "video",
    get: function get() {
      return _classPrivateFieldGet(_video, this);
    }

    /**
     * Setter for #video
     * @param {string} video
     */,
    set: function set(video) {
      if (checkAICCValidFormat(video, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_video, this, video);
      }
    }

    /**
     * toJSON for cmi.student_preference
     *
     * @return {
     *    {
     *      audio: string,
     *      language: string,
     *      speed: string,
     *      text: string
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'audio': this.audio,
        'language': this.language,
        'lesson_type': this.lesson_type,
        'speed': this.speed,
        'text': this.text,
        'text_color': this.text_color,
        'text_location': this.text_location,
        'text_size': this.text_size,
        'video': this.video,
        'windows': this.windows
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_scorm12_cmi__WEBPACK_IMPORTED_MODULE_0__.CMIStudentPreference);
/**
 * StudentData class for AICC
 */
var _tries_during_lesson = /*#__PURE__*/new WeakMap();
var AICCCMIStudentData = /*#__PURE__*/function (_Scorm12CMI$CMIStuden2) {
  /**
   * Constructor for AICC StudentData object
   */
  function AICCCMIStudentData() {
    var _this4;
    _classCallCheck(this, AICCCMIStudentData);
    _this4 = _callSuper(this, AICCCMIStudentData, [aicc_constants.student_data_children]);
    _classPrivateFieldInitSpec(_this4, _tries_during_lesson, '');
    _this4.tries = new CMITries();
    return _this4;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(AICCCMIStudentData, _Scorm12CMI$CMIStuden2);
  return _createClass(AICCCMIStudentData, [{
    key: "initialize",
    value: function initialize() {
      var _this$tries;
      _get(_getPrototypeOf(AICCCMIStudentData.prototype), "initialize", this).call(this);
      (_this$tries = this.tries) === null || _this$tries === void 0 ? void 0 : _this$tries.initialize();
    }
  }, {
    key: "tries_during_lesson",
    get:
    /**
     * Getter for tries_during_lesson
     * @return {string}
     */
    function get() {
      return _classPrivateFieldGet(_tries_during_lesson, this);
    }

    /**
     * Setter for #tries_during_lesson. Sets an error if trying to set after
     *  initialization.
     * @param {string} tries_during_lesson
     */,
    set: function set(tries_during_lesson) {
      !this.initialized ? _classPrivateFieldSet(_tries_during_lesson, this, tries_during_lesson) : throwReadOnlyError();
    }

    /**
     * toJSON for cmi.student_data object
     * @return {
     *    {
     *      mastery_score: string,
     *      max_time_allowed: string,
     *      time_limit_action: string,
     *      tries: CMITries
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'mastery_score': this.mastery_score,
        'max_time_allowed': this.max_time_allowed,
        'time_limit_action': this.time_limit_action,
        'tries': this.tries
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_scorm12_cmi__WEBPACK_IMPORTED_MODULE_0__.CMIStudentData);
/**
 * Class representing the AICC cmi.student_demographics object
 */
var _children = /*#__PURE__*/new WeakMap();
var _city = /*#__PURE__*/new WeakMap();
var _class = /*#__PURE__*/new WeakMap();
var _company = /*#__PURE__*/new WeakMap();
var _country = /*#__PURE__*/new WeakMap();
var _experience = /*#__PURE__*/new WeakMap();
var _familiar_name = /*#__PURE__*/new WeakMap();
var _instructor_name = /*#__PURE__*/new WeakMap();
var _title = /*#__PURE__*/new WeakMap();
var _native_language = /*#__PURE__*/new WeakMap();
var _state = /*#__PURE__*/new WeakMap();
var _street_address = /*#__PURE__*/new WeakMap();
var _telephone = /*#__PURE__*/new WeakMap();
var _years_experience = /*#__PURE__*/new WeakMap();
var CMIStudentDemographics = /*#__PURE__*/function (_BaseCMI2) {
  /**
   * Constructor for AICC StudentDemographics object
   */
  function CMIStudentDemographics() {
    var _this5;
    _classCallCheck(this, CMIStudentDemographics);
    _this5 = _callSuper(this, CMIStudentDemographics);
    _classPrivateFieldInitSpec(_this5, _children, aicc_constants.student_demographics_children);
    _classPrivateFieldInitSpec(_this5, _city, '');
    _classPrivateFieldInitSpec(_this5, _class, '');
    _classPrivateFieldInitSpec(_this5, _company, '');
    _classPrivateFieldInitSpec(_this5, _country, '');
    _classPrivateFieldInitSpec(_this5, _experience, '');
    _classPrivateFieldInitSpec(_this5, _familiar_name, '');
    _classPrivateFieldInitSpec(_this5, _instructor_name, '');
    _classPrivateFieldInitSpec(_this5, _title, '');
    _classPrivateFieldInitSpec(_this5, _native_language, '');
    _classPrivateFieldInitSpec(_this5, _state, '');
    _classPrivateFieldInitSpec(_this5, _street_address, '');
    _classPrivateFieldInitSpec(_this5, _telephone, '');
    _classPrivateFieldInitSpec(_this5, _years_experience, '');
    return _this5;
  }
  _inherits(CMIStudentDemographics, _BaseCMI2);
  return _createClass(CMIStudentDemographics, [{
    key: "_children",
    get:
    /**
     * Getter for _children
     * @return {string}
     */
    function get() {
      return _classPrivateFieldGet(_children, this);
    }

    /**
     * Getter for city
     * @return {string}
     */
  }, {
    key: "city",
    get: function get() {
      return _classPrivateFieldGet(_city, this);
    }

    /**
     * Setter for #city. Sets an error if trying to set after
     *  initialization.
     * @param {string} city
     */,
    set: function set(city) {
      !this.initialized ? _classPrivateFieldSet(_city, this, city) : throwReadOnlyError();
    }

    /**
     * Getter for class
     * @return {string}
     */
  }, {
    key: "class",
    get: function get() {
      return _classPrivateFieldGet(_class, this);
    }

    /**
     * Setter for #class. Sets an error if trying to set after
     *  initialization.
     * @param {string} clazz
     */,
    set: function set(clazz) {
      !this.initialized ? _classPrivateFieldSet(_class, this, clazz) : throwReadOnlyError();
    }

    /**
     * Getter for company
     * @return {string}
     */
  }, {
    key: "company",
    get: function get() {
      return _classPrivateFieldGet(_company, this);
    }

    /**
     * Setter for #company. Sets an error if trying to set after
     *  initialization.
     * @param {string} company
     */,
    set: function set(company) {
      !this.initialized ? _classPrivateFieldSet(_company, this, company) : throwReadOnlyError();
    }

    /**
     * Getter for country
     * @return {string}
     */
  }, {
    key: "country",
    get: function get() {
      return _classPrivateFieldGet(_country, this);
    }

    /**
     * Setter for #country. Sets an error if trying to set after
     *  initialization.
     * @param {string} country
     */,
    set: function set(country) {
      !this.initialized ? _classPrivateFieldSet(_country, this, country) : throwReadOnlyError();
    }

    /**
     * Getter for experience
     * @return {string}
     */
  }, {
    key: "experience",
    get: function get() {
      return _classPrivateFieldGet(_experience, this);
    }

    /**
     * Setter for #experience. Sets an error if trying to set after
     *  initialization.
     * @param {string} experience
     */,
    set: function set(experience) {
      !this.initialized ? _classPrivateFieldSet(_experience, this, experience) : throwReadOnlyError();
    }

    /**
     * Getter for familiar_name
     * @return {string}
     */
  }, {
    key: "familiar_name",
    get: function get() {
      return _classPrivateFieldGet(_familiar_name, this);
    }

    /**
     * Setter for #familiar_name. Sets an error if trying to set after
     *  initialization.
     * @param {string} familiar_name
     */,
    set: function set(familiar_name) {
      !this.initialized ? _classPrivateFieldSet(_familiar_name, this, familiar_name) : throwReadOnlyError();
    }

    /**
     * Getter for instructor_name
     * @return {string}
     */
  }, {
    key: "instructor_name",
    get: function get() {
      return _classPrivateFieldGet(_instructor_name, this);
    }

    /**
     * Setter for #instructor_name. Sets an error if trying to set after
     *  initialization.
     * @param {string} instructor_name
     */,
    set: function set(instructor_name) {
      !this.initialized ? _classPrivateFieldSet(_instructor_name, this, instructor_name) : throwReadOnlyError();
    }

    /**
     * Getter for title
     * @return {string}
     */
  }, {
    key: "title",
    get: function get() {
      return _classPrivateFieldGet(_title, this);
    }

    /**
     * Setter for #title. Sets an error if trying to set after
     *  initialization.
     * @param {string} title
     */,
    set: function set(title) {
      !this.initialized ? _classPrivateFieldSet(_title, this, title) : throwReadOnlyError();
    }

    /**
     * Getter for native_language
     * @return {string}
     */
  }, {
    key: "native_language",
    get: function get() {
      return _classPrivateFieldGet(_native_language, this);
    }

    /**
     * Setter for #native_language. Sets an error if trying to set after
     *  initialization.
     * @param {string} native_language
     */,
    set: function set(native_language) {
      !this.initialized ? _classPrivateFieldSet(_native_language, this, native_language) : throwReadOnlyError();
    }

    /**
     * Getter for state
     * @return {string}
     */
  }, {
    key: "state",
    get: function get() {
      return _classPrivateFieldGet(_state, this);
    }

    /**
     * Setter for #state. Sets an error if trying to set after
     *  initialization.
     * @param {string} state
     */,
    set: function set(state) {
      !this.initialized ? _classPrivateFieldSet(_state, this, state) : throwReadOnlyError();
    }

    /**
     * Getter for street_address
     * @return {string}
     */
  }, {
    key: "street_address",
    get: function get() {
      return _classPrivateFieldGet(_street_address, this);
    }

    /**
     * Setter for #street_address. Sets an error if trying to set after
     *  initialization.
     * @param {string} street_address
     */,
    set: function set(street_address) {
      !this.initialized ? _classPrivateFieldSet(_street_address, this, street_address) : throwReadOnlyError();
    }

    /**
     * Getter for telephone
     * @return {string}
     */
  }, {
    key: "telephone",
    get: function get() {
      return _classPrivateFieldGet(_telephone, this);
    }

    /**
     * Setter for #telephone. Sets an error if trying to set after
     *  initialization.
     * @param {string} telephone
     */,
    set: function set(telephone) {
      !this.initialized ? _classPrivateFieldSet(_telephone, this, telephone) : throwReadOnlyError();
    }

    /**
     * Getter for years_experience
     * @return {string}
     */
  }, {
    key: "years_experience",
    get: function get() {
      return _classPrivateFieldGet(_years_experience, this);
    }

    /**
     * Setter for #years_experience. Sets an error if trying to set after
     *  initialization.
     * @param {string} years_experience
     */,
    set: function set(years_experience) {
      !this.initialized ? _classPrivateFieldSet(_years_experience, this, years_experience) : throwReadOnlyError();
    }

    /**
     * toJSON for cmi.student_demographics object
     * @return {
     *      {
     *        city: string,
     *        class: string,
     *        company: string,
     *        country: string,
     *        experience: string,
     *        familiar_name: string,
     *        instructor_name: string,
     *        title: string,
     *        native_language: string,
     *        state: string,
     *        street_address: string,
     *        telephone: string,
     *        years_experience: string
     *      }
     *    }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'city': this.city,
        'class': this.class,
        'company': this.company,
        'country': this.country,
        'experience': this.experience,
        'familiar_name': this.familiar_name,
        'instructor_name': this.instructor_name,
        'title': this.title,
        'native_language': this.native_language,
        'state': this.state,
        'street_address': this.street_address,
        'telephone': this.telephone,
        'years_experience': this.years_experience
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_1__.BaseCMI);

/**
 * Class representing the AICC cmi.paths object
 */
var CMIPaths = /*#__PURE__*/function (_CMIArray2) {
  /**
   * Constructor for inline Paths Array class
   */
  function CMIPaths() {
    _classCallCheck(this, CMIPaths);
    return _callSuper(this, CMIPaths, [{
      children: aicc_constants.paths_children
    }]);
  }
  _inherits(CMIPaths, _CMIArray2);
  return _createClass(CMIPaths);
}(_common__WEBPACK_IMPORTED_MODULE_1__.CMIArray);

/**
 * Class for AICC Paths
 */
var _location_id = /*#__PURE__*/new WeakMap();
var _date = /*#__PURE__*/new WeakMap();
var _time = /*#__PURE__*/new WeakMap();
var _status = /*#__PURE__*/new WeakMap();
var _why_left = /*#__PURE__*/new WeakMap();
var _time_in_element = /*#__PURE__*/new WeakMap();
var CMIPathsObject = /*#__PURE__*/function (_BaseCMI3) {
  /**
   * Constructor for AICC Paths objects
   */
  function CMIPathsObject() {
    var _this6;
    _classCallCheck(this, CMIPathsObject);
    _this6 = _callSuper(this, CMIPathsObject);
    _classPrivateFieldInitSpec(_this6, _location_id, '');
    _classPrivateFieldInitSpec(_this6, _date, '');
    _classPrivateFieldInitSpec(_this6, _time, '');
    _classPrivateFieldInitSpec(_this6, _status, '');
    _classPrivateFieldInitSpec(_this6, _why_left, '');
    _classPrivateFieldInitSpec(_this6, _time_in_element, '');
    return _this6;
  }
  _inherits(CMIPathsObject, _BaseCMI3);
  return _createClass(CMIPathsObject, [{
    key: "location_id",
    get:
    /**
     * Getter for #location_id
     * @return {string}
     */
    function get() {
      return _classPrivateFieldGet(_location_id, this);
    }

    /**
     * Setter for #location_id
     * @param {string} location_id
     */,
    set: function set(location_id) {
      if (checkAICCValidFormat(location_id, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_location_id, this, location_id);
      }
    }

    /**
     * Getter for #date
     * @return {string}
     */
  }, {
    key: "date",
    get: function get() {
      return _classPrivateFieldGet(_date, this);
    }

    /**
     * Setter for #date
     * @param {string} date
     */,
    set: function set(date) {
      if (checkAICCValidFormat(date, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_date, this, date);
      }
    }

    /**
     * Getter for #time
     * @return {string}
     */
  }, {
    key: "time",
    get: function get() {
      return _classPrivateFieldGet(_time, this);
    }

    /**
     * Setter for #time
     * @param {string} time
     */,
    set: function set(time) {
      if (checkAICCValidFormat(time, aicc_regex.CMITime)) {
        _classPrivateFieldSet(_time, this, time);
      }
    }

    /**
     * Getter for #status
     * @return {string}
     */
  }, {
    key: "status",
    get: function get() {
      return _classPrivateFieldGet(_status, this);
    }

    /**
     * Setter for #status
     * @param {string} status
     */,
    set: function set(status) {
      if (checkAICCValidFormat(status, aicc_regex.CMIStatus2)) {
        _classPrivateFieldSet(_status, this, status);
      }
    }

    /**
     * Getter for #why_left
     * @return {string}
     */
  }, {
    key: "why_left",
    get: function get() {
      return _classPrivateFieldGet(_why_left, this);
    }

    /**
     * Setter for #why_left
     * @param {string} why_left
     */,
    set: function set(why_left) {
      if (checkAICCValidFormat(why_left, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_why_left, this, why_left);
      }
    }

    /**
     * Getter for #time_in_element
     * @return {string}
     */
  }, {
    key: "time_in_element",
    get: function get() {
      return _classPrivateFieldGet(_time_in_element, this);
    }

    /**
     * Setter for #time_in_element
     * @param {string} time_in_element
     */,
    set: function set(time_in_element) {
      if (checkAICCValidFormat(time_in_element, aicc_regex.CMITime)) {
        _classPrivateFieldSet(_time_in_element, this, time_in_element);
      }
    }

    /**
     * toJSON for cmi.paths.n object
     * @return {
     *    {
     *      location_id: string,
     *      date: string,
     *      time: string,
     *      status: string,
     *      why_left: string,
     *      time_in_element: string
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'location_id': this.location_id,
        'date': this.date,
        'time': this.time,
        'status': this.status,
        'why_left': this.why_left,
        'time_in_element': this.time_in_element
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_1__.BaseCMI);

/**
 * Class representing the AICC cmi.student_data.tries object
 */
var CMITries = /*#__PURE__*/function (_CMIArray3) {
  /**
   * Constructor for inline Tries Array class
   */
  function CMITries() {
    _classCallCheck(this, CMITries);
    return _callSuper(this, CMITries, [{
      children: aicc_constants.tries_children
    }]);
  }
  _inherits(CMITries, _CMIArray3);
  return _createClass(CMITries);
}(_common__WEBPACK_IMPORTED_MODULE_1__.CMIArray);

/**
 * Class for AICC Tries
 */
var _status2 = /*#__PURE__*/new WeakMap();
var _time2 = /*#__PURE__*/new WeakMap();
var CMITriesObject = /*#__PURE__*/function (_BaseCMI4) {
  /**
   * Constructor for AICC Tries object
   */
  function CMITriesObject() {
    var _this7;
    _classCallCheck(this, CMITriesObject);
    _this7 = _callSuper(this, CMITriesObject);
    _classPrivateFieldInitSpec(_this7, _status2, '');
    _classPrivateFieldInitSpec(_this7, _time2, '');
    _this7.score = new _common__WEBPACK_IMPORTED_MODULE_1__.CMIScore({
      score_children: aicc_constants.score_children,
      score_range: aicc_regex.score_range,
      invalidErrorCode: aicc_error_codes.INVALID_SET_VALUE,
      invalidTypeCode: aicc_error_codes.TYPE_MISMATCH,
      invalidRangeCode: aicc_error_codes.VALUE_OUT_OF_RANGE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_5__.AICCValidationError
    });
    return _this7;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(CMITriesObject, _BaseCMI4);
  return _createClass(CMITriesObject, [{
    key: "initialize",
    value: function initialize() {
      var _this$score;
      _get(_getPrototypeOf(CMITriesObject.prototype), "initialize", this).call(this);
      (_this$score = this.score) === null || _this$score === void 0 ? void 0 : _this$score.initialize();
    }
  }, {
    key: "status",
    get:
    /**
     * Getter for #status
     * @return {string}
     */
    function get() {
      return _classPrivateFieldGet(_status2, this);
    }

    /**
     * Setter for #status
     * @param {string} status
     */,
    set: function set(status) {
      if (checkAICCValidFormat(status, aicc_regex.CMIStatus2)) {
        _classPrivateFieldSet(_status2, this, status);
      }
    }

    /**
     * Getter for #time
     * @return {string}
     */
  }, {
    key: "time",
    get: function get() {
      return _classPrivateFieldGet(_time2, this);
    }

    /**
     * Setter for #time
     * @param {string} time
     */,
    set: function set(time) {
      if (checkAICCValidFormat(time, aicc_regex.CMITime)) {
        _classPrivateFieldSet(_time2, this, time);
      }
    }

    /**
     * toJSON for cmi.student_data.tries.n object
     * @return {
     *    {
     *      status: string,
     *      time: string,
     *      score: CMIScore
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'status': this.status,
        'time': this.time,
        'score': this.score
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_1__.BaseCMI);

/**
 * Class for cmi.student_data.attempt_records array
 */
var CMIAttemptRecords = /*#__PURE__*/function (_CMIArray4) {
  /**
   * Constructor for inline Tries Array class
   */
  function CMIAttemptRecords() {
    _classCallCheck(this, CMIAttemptRecords);
    return _callSuper(this, CMIAttemptRecords, [{
      children: aicc_constants.attempt_records_children
    }]);
  }
  _inherits(CMIAttemptRecords, _CMIArray4);
  return _createClass(CMIAttemptRecords);
}(_common__WEBPACK_IMPORTED_MODULE_1__.CMIArray);

/**
 * Class for AICC Attempt Records
 */
var _lesson_status = /*#__PURE__*/new WeakMap();
var CMIAttemptRecordsObject = /*#__PURE__*/function (_BaseCMI5) {
  /**
   * Constructor for AICC Attempt Records object
   */
  function CMIAttemptRecordsObject() {
    var _this8;
    _classCallCheck(this, CMIAttemptRecordsObject);
    _this8 = _callSuper(this, CMIAttemptRecordsObject);
    _classPrivateFieldInitSpec(_this8, _lesson_status, '');
    _this8.score = new _common__WEBPACK_IMPORTED_MODULE_1__.CMIScore({
      score_children: aicc_constants.score_children,
      score_range: aicc_regex.score_range,
      invalidErrorCode: aicc_error_codes.INVALID_SET_VALUE,
      invalidTypeCode: aicc_error_codes.TYPE_MISMATCH,
      invalidRangeCode: aicc_error_codes.VALUE_OUT_OF_RANGE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_5__.AICCValidationError
    });
    return _this8;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(CMIAttemptRecordsObject, _BaseCMI5);
  return _createClass(CMIAttemptRecordsObject, [{
    key: "initialize",
    value: function initialize() {
      var _this$score2;
      _get(_getPrototypeOf(CMIAttemptRecordsObject.prototype), "initialize", this).call(this);
      (_this$score2 = this.score) === null || _this$score2 === void 0 ? void 0 : _this$score2.initialize();
    }
  }, {
    key: "lesson_status",
    get:
    /**
     * Getter for #lesson_status
     * @return {string}
     */
    function get() {
      return _classPrivateFieldGet(_lesson_status, this);
    }

    /**
     * Setter for #lesson_status
     * @param {string} lesson_status
     */,
    set: function set(lesson_status) {
      if (checkAICCValidFormat(lesson_status, aicc_regex.CMIStatus2)) {
        _classPrivateFieldSet(_lesson_status, this, lesson_status);
      }
    }

    /**
     * toJSON for cmi.student_data.attempt_records.n object
     * @return {
     *    {
     *      status: string,
     *      time: string,
     *      score: CMIScore
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'lesson_status': this.lesson_status,
        'score': this.score
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_1__.BaseCMI);

/**
 * Class for AICC Evaluation Comments
 */
var _content = /*#__PURE__*/new WeakMap();
var _location = /*#__PURE__*/new WeakMap();
var _time3 = /*#__PURE__*/new WeakMap();
var CMIEvaluationCommentsObject = /*#__PURE__*/function (_BaseCMI6) {
  /**
   * Constructor for Evaluation Comments
   */
  function CMIEvaluationCommentsObject() {
    var _this9;
    _classCallCheck(this, CMIEvaluationCommentsObject);
    _this9 = _callSuper(this, CMIEvaluationCommentsObject);
    _classPrivateFieldInitSpec(_this9, _content, '');
    _classPrivateFieldInitSpec(_this9, _location, '');
    _classPrivateFieldInitSpec(_this9, _time3, '');
    return _this9;
  }
  _inherits(CMIEvaluationCommentsObject, _BaseCMI6);
  return _createClass(CMIEvaluationCommentsObject, [{
    key: "content",
    get:
    /**
     * Getter for #content
     * @return {string}
     */
    function get() {
      return _classPrivateFieldGet(_content, this);
    }

    /**
     * Setter for #content
     * @param {string} content
     */,
    set: function set(content) {
      if (checkAICCValidFormat(content, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_content, this, content);
      }
    }

    /**
     * Getter for #location
     * @return {string}
     */
  }, {
    key: "location",
    get: function get() {
      return _classPrivateFieldGet(_location, this);
    }

    /**
     * Setter for #location
     * @param {string} location
     */,
    set: function set(location) {
      if (checkAICCValidFormat(location, aicc_regex.CMIString256)) {
        _classPrivateFieldSet(_location, this, location);
      }
    }

    /**
     * Getter for #time
     * @return {string}
     */
  }, {
    key: "time",
    get: function get() {
      return _classPrivateFieldGet(_time3, this);
    }

    /**
     * Setting for #time
     * @param {string} time
     */,
    set: function set(time) {
      if (checkAICCValidFormat(time, aicc_regex.CMITime)) {
        _classPrivateFieldSet(_time3, this, time);
      }
    }

    /**
     * toJSON for cmi.evaulation.comments.n object
     * @return {
     *    {
     *      content: string,
     *      location: string,
     *      time: string
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'content': this.content,
        'location': this.location,
        'time': this.time
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_1__.BaseCMI);

/***/ }),

/***/ "./src/cmi/common.js":
/*!***************************!*\
  !*** ./src/cmi/common.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseCMI: function() { return /* binding */ BaseCMI; },
/* harmony export */   CMIArray: function() { return /* binding */ CMIArray; },
/* harmony export */   CMIScore: function() { return /* binding */ CMIScore; },
/* harmony export */   checkValidFormat: function() { return /* binding */ checkValidFormat; },
/* harmony export */   checkValidRange: function() { return /* binding */ checkValidRange; }
/* harmony export */ });
/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/api_constants */ "./src/constants/api_constants.js");
/* harmony import */ var _constants_error_codes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/error_codes */ "./src/constants/error_codes.js");
/* harmony import */ var _constants_regex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/regex */ "./src/constants/regex.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



var scorm12_constants = _constants_api_constants__WEBPACK_IMPORTED_MODULE_0__["default"].scorm12;
var scorm12_regex = _constants_regex__WEBPACK_IMPORTED_MODULE_2__["default"].scorm12;
var scorm12_error_codes = _constants_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].scorm12;

/**
 * Check if the value matches the proper format. If not, throw proper error code.
 *
 * @param {string} value
 * @param {string} regexPattern
 * @param {number} errorCode
 * @param {class} errorClass
 * @param {boolean} allowEmptyString
 * @return {boolean}
 */
function checkValidFormat(value, regexPattern, errorCode, errorClass, allowEmptyString) {
  var formatRegex = new RegExp(regexPattern);
  var matches = value.match(formatRegex);
  if (allowEmptyString && value === '') {
    return true;
  }
  if (value === undefined || !matches || matches[0] === '') {
    throw new errorClass.prototype.constructor(errorCode);
  }
  return true;
}

/**
 * Check if the value matches the proper range. If not, throw proper error code.
 *
 * @param {*} value
 * @param {string} rangePattern
 * @param {number} errorCode
 * @param {class} errorClass
 * @return {boolean}
 */
function checkValidRange(value, rangePattern, errorCode, errorClass) {
  var ranges = rangePattern.split('#');
  value = value * 1.0;
  if (value >= ranges[0]) {
    if (ranges[1] === '*' || value <= ranges[1]) {
      return true;
    } else {
      throw new errorClass.prototype.constructor(errorCode);
    }
  } else {
    throw new errorClass.prototype.constructor(errorCode);
  }
}

/**
 * Base class for API cmi objects
 */
var _initialized = /*#__PURE__*/new WeakMap();
var _start_time = /*#__PURE__*/new WeakMap();
var BaseCMI = /*#__PURE__*/function () {
  /**
   * Constructor for BaseCMI, just marks the class as abstract
   */
  function BaseCMI() {
    _classCallCheck(this, BaseCMI);
    _defineProperty(this, "jsonString", false);
    _classPrivateFieldInitSpec(this, _initialized, false);
    _classPrivateFieldInitSpec(this, _start_time, void 0);
    if ((this instanceof BaseCMI ? this.constructor : void 0) === BaseCMI) {
      throw new TypeError('Cannot construct BaseCMI instances directly');
    }
  }

  /**
   * Getter for #initialized
   * @return {boolean}
   */
  return _createClass(BaseCMI, [{
    key: "initialized",
    get: function get() {
      return _classPrivateFieldGet(_initialized, this);
    }

    /**
     * Getter for #start_time
     * @return {Number}
     */
  }, {
    key: "start_time",
    get: function get() {
      return _classPrivateFieldGet(_start_time, this);
    }

    /**
     * Called when the API has been initialized after the CMI has been created
     */
  }, {
    key: "initialize",
    value: function initialize() {
      _classPrivateFieldSet(_initialized, this, true);
    }

    /**
     * Called when the player should override the 'session_time' provided by
     * the module
     */
  }, {
    key: "setStartTime",
    value: function setStartTime() {
      _classPrivateFieldSet(_start_time, this, new Date().getTime());
    }
  }]);
}();

/**
 * Base class for cmi *.score objects
 */
var _children2 = /*#__PURE__*/new WeakMap();
var _score_range = /*#__PURE__*/new WeakMap();
var _invalid_error_code = /*#__PURE__*/new WeakMap();
var _invalid_type_code = /*#__PURE__*/new WeakMap();
var _invalid_range_code = /*#__PURE__*/new WeakMap();
var _decimal_regex = /*#__PURE__*/new WeakMap();
var _error_class = /*#__PURE__*/new WeakMap();
var _raw = /*#__PURE__*/new WeakMap();
var _min = /*#__PURE__*/new WeakMap();
var _max = /*#__PURE__*/new WeakMap();
var CMIScore = /*#__PURE__*/function (_BaseCMI2) {
  /**
   * Constructor for *.score
   * @param {string} score_children
   * @param {string} score_range
   * @param {string} max
   * @param {number} invalidErrorCode
   * @param {number} invalidTypeCode
   * @param {number} invalidRangeCode
   * @param {string} decimalRegex
   * @param {class} errorClass
   */
  function CMIScore(_ref) {
    var _this;
    var score_children = _ref.score_children,
      score_range = _ref.score_range,
      max = _ref.max,
      invalidErrorCode = _ref.invalidErrorCode,
      invalidTypeCode = _ref.invalidTypeCode,
      invalidRangeCode = _ref.invalidRangeCode,
      decimalRegex = _ref.decimalRegex,
      errorClass = _ref.errorClass;
    _classCallCheck(this, CMIScore);
    _this = _callSuper(this, CMIScore);
    _classPrivateFieldInitSpec(_this, _children2, void 0);
    _classPrivateFieldInitSpec(_this, _score_range, void 0);
    _classPrivateFieldInitSpec(_this, _invalid_error_code, void 0);
    _classPrivateFieldInitSpec(_this, _invalid_type_code, void 0);
    _classPrivateFieldInitSpec(_this, _invalid_range_code, void 0);
    _classPrivateFieldInitSpec(_this, _decimal_regex, void 0);
    _classPrivateFieldInitSpec(_this, _error_class, void 0);
    _classPrivateFieldInitSpec(_this, _raw, '');
    _classPrivateFieldInitSpec(_this, _min, '');
    _classPrivateFieldInitSpec(_this, _max, void 0);
    _classPrivateFieldSet(_children2, _this, score_children || scorm12_constants.score_children);
    _classPrivateFieldSet(_score_range, _this, !score_range ? false : scorm12_regex.score_range);
    _classPrivateFieldSet(_max, _this, max || max === '' ? max : '100');
    _classPrivateFieldSet(_invalid_error_code, _this, invalidErrorCode || scorm12_error_codes.INVALID_SET_VALUE);
    _classPrivateFieldSet(_invalid_type_code, _this, invalidTypeCode || scorm12_error_codes.TYPE_MISMATCH);
    _classPrivateFieldSet(_invalid_range_code, _this, invalidRangeCode || scorm12_error_codes.VALUE_OUT_OF_RANGE);
    _classPrivateFieldSet(_decimal_regex, _this, decimalRegex || scorm12_regex.CMIDecimal);
    _classPrivateFieldSet(_error_class, _this, errorClass);
    return _this;
  }
  _inherits(CMIScore, _BaseCMI2);
  return _createClass(CMIScore, [{
    key: "_children",
    get:
    /**
     * Getter for _children
     * @return {string}
     * @private
     */
    function get() {
      return _classPrivateFieldGet(_children2, this);
    }

    /**
     * Setter for _children. Just throws an error.
     * @param {string} _children
     * @private
     */,
    set: function set(_children) {
      throw new (_classPrivateFieldGet(_error_class, this).prototype.constructor)(_classPrivateFieldGet(_invalid_error_code, this));
    }

    /**
     * Getter for #raw
     * @return {string}
     */
  }, {
    key: "raw",
    get: function get() {
      return _classPrivateFieldGet(_raw, this);
    }

    /**
     * Setter for #raw
     * @param {string} raw
     */,
    set: function set(raw) {
      if (checkValidFormat(raw, _classPrivateFieldGet(_decimal_regex, this), _classPrivateFieldGet(_invalid_type_code, this), _classPrivateFieldGet(_error_class, this)) && (!_classPrivateFieldGet(_score_range, this) || checkValidRange(raw, _classPrivateFieldGet(_score_range, this), _classPrivateFieldGet(_invalid_range_code, this), _classPrivateFieldGet(_error_class, this)))) {
        _classPrivateFieldSet(_raw, this, raw);
      }
    }

    /**
     * Getter for #min
     * @return {string}
     */
  }, {
    key: "min",
    get: function get() {
      return _classPrivateFieldGet(_min, this);
    }

    /**
     * Setter for #min
     * @param {string} min
     */,
    set: function set(min) {
      if (checkValidFormat(min, _classPrivateFieldGet(_decimal_regex, this), _classPrivateFieldGet(_invalid_type_code, this), _classPrivateFieldGet(_error_class, this)) && (!_classPrivateFieldGet(_score_range, this) || checkValidRange(min, _classPrivateFieldGet(_score_range, this), _classPrivateFieldGet(_invalid_range_code, this), _classPrivateFieldGet(_error_class, this)))) {
        _classPrivateFieldSet(_min, this, min);
      }
    }

    /**
     * Getter for #max
     * @return {string}
     */
  }, {
    key: "max",
    get: function get() {
      return _classPrivateFieldGet(_max, this);
    }

    /**
     * Setter for #max
     * @param {string} max
     */,
    set: function set(max) {
      if (checkValidFormat(max, _classPrivateFieldGet(_decimal_regex, this), _classPrivateFieldGet(_invalid_type_code, this), _classPrivateFieldGet(_error_class, this)) && (!_classPrivateFieldGet(_score_range, this) || checkValidRange(max, _classPrivateFieldGet(_score_range, this), _classPrivateFieldGet(_invalid_range_code, this), _classPrivateFieldGet(_error_class, this)))) {
        _classPrivateFieldSet(_max, this, max);
      }
    }

    /**
     * toJSON for *.score
     * @return {{min: string, max: string, raw: string}}
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'raw': this.raw,
        'min': this.min,
        'max': this.max
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(BaseCMI);

/**
 * Base class for cmi *.n objects
 */
var _errorCode = /*#__PURE__*/new WeakMap();
var _errorClass = /*#__PURE__*/new WeakMap();
var _children3 = /*#__PURE__*/new WeakMap();
var CMIArray = /*#__PURE__*/function (_BaseCMI3) {
  /**
   * Constructor cmi *.n arrays
   * @param {string} children
   * @param {number} errorCode
   * @param {class} errorClass
   */
  function CMIArray(_ref2) {
    var _this2;
    var children = _ref2.children,
      errorCode = _ref2.errorCode,
      errorClass = _ref2.errorClass;
    _classCallCheck(this, CMIArray);
    _this2 = _callSuper(this, CMIArray);
    _classPrivateFieldInitSpec(_this2, _errorCode, void 0);
    _classPrivateFieldInitSpec(_this2, _errorClass, void 0);
    _classPrivateFieldInitSpec(_this2, _children3, void 0);
    _classPrivateFieldSet(_children3, _this2, children);
    _classPrivateFieldSet(_errorCode, _this2, errorCode);
    _classPrivateFieldSet(_errorClass, _this2, errorClass);
    _this2.childArray = [];
    return _this2;
  }
  _inherits(CMIArray, _BaseCMI3);
  return _createClass(CMIArray, [{
    key: "_children",
    get:
    /**
     * Getter for _children
     * @return {*}
     */
    function get() {
      return _classPrivateFieldGet(_children3, this);
    }

    /**
     * Setter for _children. Just throws an error.
     * @param {string} _children
     */,
    set: function set(_children) {
      throw new (_classPrivateFieldGet(_errorClass, this).prototype.constructor)(_classPrivateFieldGet(_errorCode, this));
    }

    /**
     * Getter for _count
     * @return {number}
     */
  }, {
    key: "_count",
    get: function get() {
      return this.childArray.length;
    }

    /**
     * Setter for _count. Just throws an error.
     * @param {number} _count
     */,
    set: function set(_count) {
      throw new (_classPrivateFieldGet(_errorClass, this).prototype.constructor)(_classPrivateFieldGet(_errorCode, this));
    }

    /**
     * toJSON for *.n arrays
     * @return {object}
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {};
      for (var i = 0; i < this.childArray.length; i++) {
        result[i + ''] = this.childArray[i];
      }
      delete this.jsonString;
      return result;
    }
  }]);
}(BaseCMI);

/***/ }),

/***/ "./src/cmi/scorm12_cmi.js":
/*!********************************!*\
  !*** ./src/cmi/scorm12_cmi.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CMI: function() { return /* binding */ CMI; },
/* harmony export */   CMIInteractionsCorrectResponsesObject: function() { return /* binding */ CMIInteractionsCorrectResponsesObject; },
/* harmony export */   CMIInteractionsObject: function() { return /* binding */ CMIInteractionsObject; },
/* harmony export */   CMIInteractionsObjectivesObject: function() { return /* binding */ CMIInteractionsObjectivesObject; },
/* harmony export */   CMIObjectivesObject: function() { return /* binding */ CMIObjectivesObject; },
/* harmony export */   CMIStudentData: function() { return /* binding */ CMIStudentData; },
/* harmony export */   CMIStudentPreference: function() { return /* binding */ CMIStudentPreference; },
/* harmony export */   NAV: function() { return /* binding */ NAV; },
/* harmony export */   check12ValidFormat: function() { return /* binding */ check12ValidFormat; },
/* harmony export */   check12ValidRange: function() { return /* binding */ check12ValidRange; },
/* harmony export */   throwReadOnlyError: function() { return /* binding */ throwReadOnlyError; },
/* harmony export */   throwWriteOnlyError: function() { return /* binding */ throwWriteOnlyError; }
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/cmi/common.js");
/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/api_constants */ "./src/constants/api_constants.js");
/* harmony import */ var _constants_error_codes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_codes */ "./src/constants/error_codes.js");
/* harmony import */ var _constants_regex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/regex */ "./src/constants/regex.js");
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../exceptions */ "./src/exceptions.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities */ "./src/utilities.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }







var scorm12_constants = _constants_api_constants__WEBPACK_IMPORTED_MODULE_1__["default"].scorm12;
var scorm12_regex = _constants_regex__WEBPACK_IMPORTED_MODULE_3__["default"].scorm12;
var scorm12_error_codes = _constants_error_codes__WEBPACK_IMPORTED_MODULE_2__["default"].scorm12;

/**
 * Helper method for throwing Read Only error
 */
function throwReadOnlyError() {
  throw new _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError(scorm12_error_codes.READ_ONLY_ELEMENT);
}

/**
 * Helper method for throwing Write Only error
 */
function throwWriteOnlyError() {
  throw new _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError(scorm12_error_codes.WRITE_ONLY_ELEMENT);
}

/**
 * Helper method for throwing Invalid Set error
 */
function throwInvalidValueError() {
  throw new _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError(scorm12_error_codes.INVALID_SET_VALUE);
}

/**
 * Helper method, no reason to have to pass the same error codes every time
 * @param {*} value
 * @param {string} regexPattern
 * @param {boolean} allowEmptyString
 * @return {boolean}
 */
function check12ValidFormat(value, regexPattern, allowEmptyString) {
  return (0,_common__WEBPACK_IMPORTED_MODULE_0__.checkValidFormat)(value, regexPattern, scorm12_error_codes.TYPE_MISMATCH, _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError, allowEmptyString);
}

/**
 * Helper method, no reason to have to pass the same error codes every time
 * @param {*} value
 * @param {string} rangePattern
 * @param {boolean} allowEmptyString
 * @return {boolean}
 */
function check12ValidRange(value, rangePattern, allowEmptyString) {
  return (0,_common__WEBPACK_IMPORTED_MODULE_0__.checkValidRange)(value, rangePattern, scorm12_error_codes.VALUE_OUT_OF_RANGE, _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError, allowEmptyString);
}

/**
 * Class representing the cmi object for SCORM 1.2
 */
var _children2 = /*#__PURE__*/new WeakMap();
var _version2 = /*#__PURE__*/new WeakMap();
var _launch_data = /*#__PURE__*/new WeakMap();
var _comments = /*#__PURE__*/new WeakMap();
var _comments_from_lms = /*#__PURE__*/new WeakMap();
var CMI = /*#__PURE__*/function (_BaseCMI) {
  /**
   * Constructor for the SCORM 1.2 cmi object
   * @param {string} cmi_children
   * @param {(CMIStudentData|AICCCMIStudentData)} student_data
   * @param {boolean} initialized
   */
  function CMI(cmi_children, student_data, initialized) {
    var _this;
    _classCallCheck(this, CMI);
    _this = _callSuper(this, CMI);
    _classPrivateFieldInitSpec(_this, _children2, '');
    _classPrivateFieldInitSpec(_this, _version2, '3.4');
    _classPrivateFieldInitSpec(_this, _launch_data, '');
    _classPrivateFieldInitSpec(_this, _comments, '');
    _classPrivateFieldInitSpec(_this, _comments_from_lms, '');
    _defineProperty(_this, "student_data", null);
    if (initialized) _this.initialize();
    _classPrivateFieldSet(_children2, _this, cmi_children ? cmi_children : scorm12_constants.cmi_children);
    _this.core = new CMICore();
    _this.objectives = new CMIObjectives();
    _this.student_data = student_data ? student_data : new CMIStudentData();
    _this.student_preference = new CMIStudentPreference();
    _this.interactions = new CMIInteractions();
    return _this;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(CMI, _BaseCMI);
  return _createClass(CMI, [{
    key: "initialize",
    value: function initialize() {
      var _this$core, _this$objectives, _this$student_data, _this$student_prefere, _this$interactions;
      _get(_getPrototypeOf(CMI.prototype), "initialize", this).call(this);
      (_this$core = this.core) === null || _this$core === void 0 ? void 0 : _this$core.initialize();
      (_this$objectives = this.objectives) === null || _this$objectives === void 0 ? void 0 : _this$objectives.initialize();
      (_this$student_data = this.student_data) === null || _this$student_data === void 0 ? void 0 : _this$student_data.initialize();
      (_this$student_prefere = this.student_preference) === null || _this$student_prefere === void 0 ? void 0 : _this$student_prefere.initialize();
      (_this$interactions = this.interactions) === null || _this$interactions === void 0 ? void 0 : _this$interactions.initialize();
    }

    /**
     * toJSON for cmi
     *
     * @return {
     *    {
     *      suspend_data: string,
     *      launch_data: string,
     *      comments: string,
     *      comments_from_lms: string,
     *      core: CMICore,
     *      objectives: CMIObjectives,
     *      student_data: CMIStudentData,
     *      student_preference: CMIStudentPreference,
     *      interactions: CMIInteractions
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'suspend_data': this.suspend_data,
        'launch_data': this.launch_data,
        'comments': this.comments,
        'comments_from_lms': this.comments_from_lms,
        'core': this.core,
        'objectives': this.objectives,
        'student_data': this.student_data,
        'student_preference': this.student_preference,
        'interactions': this.interactions
      };
      delete this.jsonString;
      return result;
    }

    /**
     * Getter for #_version
     * @return {string}
     */
  }, {
    key: "_version",
    get: function get() {
      return _classPrivateFieldGet(_version2, this);
    }

    /**
     * Setter for #_version. Just throws an error.
     * @param {string} _version
     */,
    set: function set(_version) {
      throwInvalidValueError();
    }

    /**
     * Getter for #_children
     * @return {string}
     */
  }, {
    key: "_children",
    get: function get() {
      return _classPrivateFieldGet(_children2, this);
    }

    /**
     * Setter for #_version. Just throws an error.
     * @param {string} _children
     */,
    set: function set(_children) {
      throwInvalidValueError();
    }

    /**
     * Getter for #suspend_data
     * @return {string}
     */
  }, {
    key: "suspend_data",
    get: function get() {
      var _this$core2;
      return (_this$core2 = this.core) === null || _this$core2 === void 0 ? void 0 : _this$core2.suspend_data;
    }

    /**
     * Setter for #suspend_data
     * @param {string} suspend_data
     */,
    set: function set(suspend_data) {
      if (this.core) {
        this.core.suspend_data = suspend_data;
      }
    }

    /**
     * Getter for #launch_data
     * @return {string}
     */
  }, {
    key: "launch_data",
    get: function get() {
      return _classPrivateFieldGet(_launch_data, this);
    }

    /**
     * Setter for #launch_data. Can only be called before  initialization.
     * @param {string} launch_data
     */,
    set: function set(launch_data) {
      !this.initialized ? _classPrivateFieldSet(_launch_data, this, launch_data) : throwReadOnlyError();
    }

    /**
     * Getter for #comments
     * @return {string}
     */
  }, {
    key: "comments",
    get: function get() {
      return _classPrivateFieldGet(_comments, this);
    }

    /**
     * Setter for #comments
     * @param {string} comments
     */,
    set: function set(comments) {
      if (check12ValidFormat(comments, scorm12_regex.CMIString4096, true)) {
        _classPrivateFieldSet(_comments, this, comments);
      }
    }

    /**
     * Getter for #comments_from_lms
     * @return {string}
     */
  }, {
    key: "comments_from_lms",
    get: function get() {
      return _classPrivateFieldGet(_comments_from_lms, this);
    }

    /**
     * Setter for #comments_from_lms. Can only be called before  initialization.
     * @param {string} comments_from_lms
     */,
    set: function set(comments_from_lms) {
      !this.initialized ? _classPrivateFieldSet(_comments_from_lms, this, comments_from_lms) : throwReadOnlyError();
    }

    /**
     * Adds the current session time to the existing total time.
     *
     * @return {string}
     */
  }, {
    key: "getCurrentTotalTime",
    value: function getCurrentTotalTime() {
      return this.core.getCurrentTotalTime(this.start_time);
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);

/**
 * Class representing the cmi.core object
 * @extends BaseCMI
 */
var _children3 = /*#__PURE__*/new WeakMap();
var _student_id = /*#__PURE__*/new WeakMap();
var _student_name = /*#__PURE__*/new WeakMap();
var _lesson_location = /*#__PURE__*/new WeakMap();
var _credit = /*#__PURE__*/new WeakMap();
var _lesson_status = /*#__PURE__*/new WeakMap();
var _entry = /*#__PURE__*/new WeakMap();
var _total_time = /*#__PURE__*/new WeakMap();
var _lesson_mode = /*#__PURE__*/new WeakMap();
var _exit = /*#__PURE__*/new WeakMap();
var _session_time = /*#__PURE__*/new WeakMap();
var _suspend_data = /*#__PURE__*/new WeakMap();
var CMICore = /*#__PURE__*/function (_BaseCMI2) {
  /**
   * Constructor for cmi.core
   */
  function CMICore() {
    var _this2;
    _classCallCheck(this, CMICore);
    _this2 = _callSuper(this, CMICore);
    _classPrivateFieldInitSpec(_this2, _children3, scorm12_constants.core_children);
    _classPrivateFieldInitSpec(_this2, _student_id, '');
    _classPrivateFieldInitSpec(_this2, _student_name, '');
    _classPrivateFieldInitSpec(_this2, _lesson_location, '');
    _classPrivateFieldInitSpec(_this2, _credit, '');
    _classPrivateFieldInitSpec(_this2, _lesson_status, 'not attempted');
    _classPrivateFieldInitSpec(_this2, _entry, '');
    _classPrivateFieldInitSpec(_this2, _total_time, '');
    _classPrivateFieldInitSpec(_this2, _lesson_mode, 'normal');
    _classPrivateFieldInitSpec(_this2, _exit, '');
    _classPrivateFieldInitSpec(_this2, _session_time, '00:00:00');
    _classPrivateFieldInitSpec(_this2, _suspend_data, '');
    _this2.score = new _common__WEBPACK_IMPORTED_MODULE_0__.CMIScore({
      score_children: scorm12_constants.score_children,
      score_range: scorm12_regex.score_range,
      invalidErrorCode: scorm12_error_codes.INVALID_SET_VALUE,
      invalidTypeCode: scorm12_error_codes.TYPE_MISMATCH,
      invalidRangeCode: scorm12_error_codes.VALUE_OUT_OF_RANGE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError
    });
    return _this2;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(CMICore, _BaseCMI2);
  return _createClass(CMICore, [{
    key: "initialize",
    value: function initialize() {
      var _this$score;
      _get(_getPrototypeOf(CMICore.prototype), "initialize", this).call(this);
      (_this$score = this.score) === null || _this$score === void 0 ? void 0 : _this$score.initialize();
    }
  }, {
    key: "_children",
    get:
    /**
     * Getter for #_children
     * @return {string}
     * @private
     */
    function get() {
      return _classPrivateFieldGet(_children3, this);
    }

    /**
     * Setter for #_children. Just throws an error.
     * @param {string} _children
     * @private
     */,
    set: function set(_children) {
      throwInvalidValueError();
    }

    /**
     * Getter for #student_id
     * @return {string}
     */
  }, {
    key: "student_id",
    get: function get() {
      return _classPrivateFieldGet(_student_id, this);
    }

    /**
     * Setter for #student_id. Can only be called before  initialization.
     * @param {string} student_id
     */,
    set: function set(student_id) {
      !this.initialized ? _classPrivateFieldSet(_student_id, this, student_id) : throwReadOnlyError();
    }

    /**
     * Getter for #student_name
     * @return {string}
     */
  }, {
    key: "student_name",
    get: function get() {
      return _classPrivateFieldGet(_student_name, this);
    }

    /**
     * Setter for #student_name. Can only be called before  initialization.
     * @param {string} student_name
     */,
    set: function set(student_name) {
      !this.initialized ? _classPrivateFieldSet(_student_name, this, student_name) : throwReadOnlyError();
    }

    /**
     * Getter for #lesson_location
     * @return {string}
     */
  }, {
    key: "lesson_location",
    get: function get() {
      return _classPrivateFieldGet(_lesson_location, this);
    }

    /**
     * Setter for #lesson_location
     * @param {string} lesson_location
     */,
    set: function set(lesson_location) {
      if (check12ValidFormat(lesson_location, scorm12_regex.CMIString256, true)) {
        _classPrivateFieldSet(_lesson_location, this, lesson_location);
      }
    }

    /**
     * Getter for #credit
     * @return {string}
     */
  }, {
    key: "credit",
    get: function get() {
      return _classPrivateFieldGet(_credit, this);
    }

    /**
     * Setter for #credit. Can only be called before  initialization.
     * @param {string} credit
     */,
    set: function set(credit) {
      !this.initialized ? _classPrivateFieldSet(_credit, this, credit) : throwReadOnlyError();
    }

    /**
     * Getter for #lesson_status
     * @return {string}
     */
  }, {
    key: "lesson_status",
    get: function get() {
      return _classPrivateFieldGet(_lesson_status, this);
    }

    /**
     * Setter for #lesson_status
     * @param {string} lesson_status
     */,
    set: function set(lesson_status) {
      if (this.initialized) {
        if (check12ValidFormat(lesson_status, scorm12_regex.CMIStatus)) {
          _classPrivateFieldSet(_lesson_status, this, lesson_status);
        }
      } else {
        if (check12ValidFormat(lesson_status, scorm12_regex.CMIStatus2)) {
          _classPrivateFieldSet(_lesson_status, this, lesson_status);
        }
      }
    }

    /**
     * Getter for #entry
     * @return {string}
     */
  }, {
    key: "entry",
    get: function get() {
      return _classPrivateFieldGet(_entry, this);
    }

    /**
     * Setter for #entry. Can only be called before  initialization.
     * @param {string} entry
     */,
    set: function set(entry) {
      !this.initialized ? _classPrivateFieldSet(_entry, this, entry) : throwReadOnlyError();
    }

    /**
     * Getter for #total_time
     * @return {string}
     */
  }, {
    key: "total_time",
    get: function get() {
      return _classPrivateFieldGet(_total_time, this);
    }

    /**
     * Setter for #total_time. Can only be called before  initialization.
     * @param {string} total_time
     */,
    set: function set(total_time) {
      !this.initialized ? _classPrivateFieldSet(_total_time, this, total_time) : throwReadOnlyError();
    }

    /**
     * Getter for #lesson_mode
     * @return {string}
     */
  }, {
    key: "lesson_mode",
    get: function get() {
      return _classPrivateFieldGet(_lesson_mode, this);
    }

    /**
     * Setter for #lesson_mode. Can only be called before  initialization.
     * @param {string} lesson_mode
     */,
    set: function set(lesson_mode) {
      !this.initialized ? _classPrivateFieldSet(_lesson_mode, this, lesson_mode) : throwReadOnlyError();
    }

    /**
     * Getter for #exit. Should only be called during JSON export.
     * @return {*}
     */
  }, {
    key: "exit",
    get: function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_exit, this);
    }

    /**
     * Setter for #exit
     * @param {string} exit
     */,
    set: function set(exit) {
      if (check12ValidFormat(exit, scorm12_regex.CMIExit, true)) {
        _classPrivateFieldSet(_exit, this, exit);
      }
    }

    /**
     * Getter for #session_time. Should only be called during JSON export.
     * @return {*}
     */
  }, {
    key: "session_time",
    get: function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_session_time, this);
    }

    /**
     * Setter for #session_time
     * @param {string} session_time
     */,
    set: function set(session_time) {
      if (check12ValidFormat(session_time, scorm12_regex.CMITimespan)) {
        _classPrivateFieldSet(_session_time, this, session_time);
      }
    }

    /**
     * Getter for #suspend_data
     * @return {string}
     */
  }, {
    key: "suspend_data",
    get: function get() {
      return _classPrivateFieldGet(_suspend_data, this);
    }

    /**
     * Setter for #suspend_data
     * @param {string} suspend_data
     */,
    set: function set(suspend_data) {
      if (check12ValidFormat(suspend_data, scorm12_regex.CMIString4096, true)) {
        _classPrivateFieldSet(_suspend_data, this, suspend_data);
      }
    }

    /**
     * Adds the current session time to the existing total time.
     * @param {Number} start_time
     * @return {string}
     */
  }, {
    key: "getCurrentTotalTime",
    value: function getCurrentTotalTime(start_time) {
      var sessionTime = _classPrivateFieldGet(_session_time, this);
      var startTime = start_time;
      if (typeof startTime !== 'undefined' && startTime !== null) {
        var seconds = new Date().getTime() - startTime;
        sessionTime = _utilities__WEBPACK_IMPORTED_MODULE_5__.getSecondsAsHHMMSS(seconds / 1000);
      }
      return _utilities__WEBPACK_IMPORTED_MODULE_5__.addHHMMSSTimeStrings(_classPrivateFieldGet(_total_time, this), sessionTime, new RegExp(scorm12_regex.CMITimespan));
    }

    /**
     * toJSON for cmi.core
     *
     * @return {
     *    {
     *      student_name: string,
     *      entry: string,
     *      exit: string,
     *      score: CMIScore,
     *      student_id: string,
     *      lesson_mode: string,
     *      lesson_location: string,
     *      lesson_status: string,
     *      credit: string,
     *      session_time: *
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'student_id': this.student_id,
        'student_name': this.student_name,
        'lesson_location': this.lesson_location,
        'credit': this.credit,
        'lesson_status': this.lesson_status,
        'entry': this.entry,
        'lesson_mode': this.lesson_mode,
        'exit': this.exit,
        'session_time': this.session_time,
        'score': this.score
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);
/**
 * Class representing SCORM 1.2's cmi.objectives object
 * @extends CMIArray
 */
var CMIObjectives = /*#__PURE__*/function (_CMIArray) {
  /**
   * Constructor for cmi.objectives
   */
  function CMIObjectives() {
    _classCallCheck(this, CMIObjectives);
    return _callSuper(this, CMIObjectives, [{
      children: scorm12_constants.objectives_children,
      errorCode: scorm12_error_codes.INVALID_SET_VALUE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError
    }]);
  }
  _inherits(CMIObjectives, _CMIArray);
  return _createClass(CMIObjectives);
}(_common__WEBPACK_IMPORTED_MODULE_0__.CMIArray);
/**
 * Class representing SCORM 1.2's cmi.student_data object
 * @extends BaseCMI
 */
var _children4 = /*#__PURE__*/new WeakMap();
var _mastery_score = /*#__PURE__*/new WeakMap();
var _max_time_allowed = /*#__PURE__*/new WeakMap();
var _time_limit_action = /*#__PURE__*/new WeakMap();
var CMIStudentData = /*#__PURE__*/function (_BaseCMI3) {
  /**
   * Constructor for cmi.student_data
   * @param {string} student_data_children
   */
  function CMIStudentData(student_data_children) {
    var _this3;
    _classCallCheck(this, CMIStudentData);
    _this3 = _callSuper(this, CMIStudentData);
    _classPrivateFieldInitSpec(_this3, _children4, void 0);
    _classPrivateFieldInitSpec(_this3, _mastery_score, '');
    _classPrivateFieldInitSpec(_this3, _max_time_allowed, '');
    _classPrivateFieldInitSpec(_this3, _time_limit_action, '');
    _classPrivateFieldSet(_children4, _this3, student_data_children ? student_data_children : scorm12_constants.student_data_children);
    return _this3;
  }

  /**
   * Getter for #_children
   * @return {*}
   * @private
   */
  _inherits(CMIStudentData, _BaseCMI3);
  return _createClass(CMIStudentData, [{
    key: "_children",
    get: function get() {
      return _classPrivateFieldGet(_children4, this);
    }

    /**
     * Setter for #_children. Just throws an error.
     * @param {string} _children
     * @private
     */,
    set: function set(_children) {
      throwInvalidValueError();
    }

    /**
     * Getter for #master_score
     * @return {string}
     */
  }, {
    key: "mastery_score",
    get: function get() {
      return _classPrivateFieldGet(_mastery_score, this);
    }

    /**
     * Setter for #master_score. Can only be called before  initialization.
     * @param {string} mastery_score
     */,
    set: function set(mastery_score) {
      !this.initialized ? _classPrivateFieldSet(_mastery_score, this, mastery_score) : throwReadOnlyError();
    }

    /**
     * Getter for #max_time_allowed
     * @return {string}
     */
  }, {
    key: "max_time_allowed",
    get: function get() {
      return _classPrivateFieldGet(_max_time_allowed, this);
    }

    /**
     * Setter for #max_time_allowed. Can only be called before  initialization.
     * @param {string} max_time_allowed
     */,
    set: function set(max_time_allowed) {
      !this.initialized ? _classPrivateFieldSet(_max_time_allowed, this, max_time_allowed) : throwReadOnlyError();
    }

    /**
     * Getter for #time_limit_action
     * @return {string}
     */
  }, {
    key: "time_limit_action",
    get: function get() {
      return _classPrivateFieldGet(_time_limit_action, this);
    }

    /**
     * Setter for #time_limit_action. Can only be called before  initialization.
     * @param {string} time_limit_action
     */,
    set: function set(time_limit_action) {
      !this.initialized ? _classPrivateFieldSet(_time_limit_action, this, time_limit_action) : throwReadOnlyError();
    }

    /**
     * toJSON for cmi.student_data
     *
     * @return {
     *    {
     *      max_time_allowed: string,
     *      time_limit_action: string,
     *      mastery_score: string
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'mastery_score': this.mastery_score,
        'max_time_allowed': this.max_time_allowed,
        'time_limit_action': this.time_limit_action
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);

/**
 * Class representing SCORM 1.2's cmi.student_preference object
 * @extends BaseCMI
 */
var _children5 = /*#__PURE__*/new WeakMap();
var _audio = /*#__PURE__*/new WeakMap();
var _language = /*#__PURE__*/new WeakMap();
var _speed = /*#__PURE__*/new WeakMap();
var _text = /*#__PURE__*/new WeakMap();
var CMIStudentPreference = /*#__PURE__*/function (_BaseCMI4) {
  /**
   * Constructor for cmi.student_preference
   * @param {string} student_preference_children
   */
  function CMIStudentPreference(student_preference_children) {
    var _this4;
    _classCallCheck(this, CMIStudentPreference);
    _this4 = _callSuper(this, CMIStudentPreference);
    _classPrivateFieldInitSpec(_this4, _children5, void 0);
    _classPrivateFieldInitSpec(_this4, _audio, '');
    _classPrivateFieldInitSpec(_this4, _language, '');
    _classPrivateFieldInitSpec(_this4, _speed, '');
    _classPrivateFieldInitSpec(_this4, _text, '');
    _classPrivateFieldSet(_children5, _this4, student_preference_children ? student_preference_children : scorm12_constants.student_preference_children);
    return _this4;
  }
  _inherits(CMIStudentPreference, _BaseCMI4);
  return _createClass(CMIStudentPreference, [{
    key: "_children",
    get:
    /**
     * Getter for #_children
     * @return {string}
     * @private
     */
    function get() {
      return _classPrivateFieldGet(_children5, this);
    }

    /**
     * Setter for #_children. Just throws an error.
     * @param {string} _children
     * @private
     */,
    set: function set(_children) {
      throwInvalidValueError();
    }

    /**
     * Getter for #audio
     * @return {string}
     */
  }, {
    key: "audio",
    get: function get() {
      return _classPrivateFieldGet(_audio, this);
    }

    /**
     * Setter for #audio
     * @param {string} audio
     */,
    set: function set(audio) {
      if (check12ValidFormat(audio, scorm12_regex.CMISInteger) && check12ValidRange(audio, scorm12_regex.audio_range)) {
        _classPrivateFieldSet(_audio, this, audio);
      }
    }

    /**
     * Getter for #language
     * @return {string}
     */
  }, {
    key: "language",
    get: function get() {
      return _classPrivateFieldGet(_language, this);
    }

    /**
     * Setter for #language
     * @param {string} language
     */,
    set: function set(language) {
      if (check12ValidFormat(language, scorm12_regex.CMIString256)) {
        _classPrivateFieldSet(_language, this, language);
      }
    }

    /**
     * Getter for #speed
     * @return {string}
     */
  }, {
    key: "speed",
    get: function get() {
      return _classPrivateFieldGet(_speed, this);
    }

    /**
     * Setter for #speed
     * @param {string} speed
     */,
    set: function set(speed) {
      if (check12ValidFormat(speed, scorm12_regex.CMISInteger) && check12ValidRange(speed, scorm12_regex.speed_range)) {
        _classPrivateFieldSet(_speed, this, speed);
      }
    }

    /**
     * Getter for #text
     * @return {string}
     */
  }, {
    key: "text",
    get: function get() {
      return _classPrivateFieldGet(_text, this);
    }

    /**
     * Setter for #text
     * @param {string} text
     */,
    set: function set(text) {
      if (check12ValidFormat(text, scorm12_regex.CMISInteger) && check12ValidRange(text, scorm12_regex.text_range)) {
        _classPrivateFieldSet(_text, this, text);
      }
    }

    /**
     * toJSON for cmi.student_preference
     *
     * @return {
     *    {
     *      audio: string,
     *      language: string,
     *      speed: string,
     *      text: string
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'audio': this.audio,
        'language': this.language,
        'speed': this.speed,
        'text': this.text
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);

/**
 * Class representing SCORM 1.2's cmi.interactions object
 * @extends BaseCMI
 */
var CMIInteractions = /*#__PURE__*/function (_CMIArray2) {
  /**
   * Constructor for cmi.interactions
   */
  function CMIInteractions() {
    _classCallCheck(this, CMIInteractions);
    return _callSuper(this, CMIInteractions, [{
      children: scorm12_constants.interactions_children,
      errorCode: scorm12_error_codes.INVALID_SET_VALUE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError
    }]);
  }
  _inherits(CMIInteractions, _CMIArray2);
  return _createClass(CMIInteractions);
}(_common__WEBPACK_IMPORTED_MODULE_0__.CMIArray);
/**
 * Class representing SCORM 1.2's cmi.interactions.n object
 * @extends BaseCMI
 */
var _id = /*#__PURE__*/new WeakMap();
var _time = /*#__PURE__*/new WeakMap();
var _type = /*#__PURE__*/new WeakMap();
var _weighting = /*#__PURE__*/new WeakMap();
var _student_response = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _latency = /*#__PURE__*/new WeakMap();
var CMIInteractionsObject = /*#__PURE__*/function (_BaseCMI5) {
  /**
   * Constructor for cmi.interactions.n object
   */
  function CMIInteractionsObject() {
    var _this5;
    _classCallCheck(this, CMIInteractionsObject);
    _this5 = _callSuper(this, CMIInteractionsObject);
    _classPrivateFieldInitSpec(_this5, _id, '');
    _classPrivateFieldInitSpec(_this5, _time, '');
    _classPrivateFieldInitSpec(_this5, _type, '');
    _classPrivateFieldInitSpec(_this5, _weighting, '');
    _classPrivateFieldInitSpec(_this5, _student_response, '');
    _classPrivateFieldInitSpec(_this5, _result, '');
    _classPrivateFieldInitSpec(_this5, _latency, '');
    _this5.objectives = new _common__WEBPACK_IMPORTED_MODULE_0__.CMIArray({
      errorCode: scorm12_error_codes.INVALID_SET_VALUE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError,
      children: scorm12_constants.objectives_children
    });
    _this5.correct_responses = new _common__WEBPACK_IMPORTED_MODULE_0__.CMIArray({
      errorCode: scorm12_error_codes.INVALID_SET_VALUE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError,
      children: scorm12_constants.correct_responses_children
    });
    return _this5;
  }

  /**
   * Called when the API has been initialized after the CMI has been created
   */
  _inherits(CMIInteractionsObject, _BaseCMI5);
  return _createClass(CMIInteractionsObject, [{
    key: "initialize",
    value: function initialize() {
      var _this$objectives2, _this$correct_respons;
      _get(_getPrototypeOf(CMIInteractionsObject.prototype), "initialize", this).call(this);
      (_this$objectives2 = this.objectives) === null || _this$objectives2 === void 0 ? void 0 : _this$objectives2.initialize();
      (_this$correct_respons = this.correct_responses) === null || _this$correct_respons === void 0 ? void 0 : _this$correct_respons.initialize();
    }
  }, {
    key: "id",
    get:
    /**
     * Getter for #id. Should only be called during JSON export.
     * @return {*}
     */
    function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_id, this);
    }

    /**
     * Setter for #id
     * @param {string} id
     */,
    set: function set(id) {
      if (check12ValidFormat(id, scorm12_regex.CMIIdentifier)) {
        _classPrivateFieldSet(_id, this, id);
      }
    }

    /**
     * Getter for #time. Should only be called during JSON export.
     * @return {*}
     */
  }, {
    key: "time",
    get: function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_time, this);
    }

    /**
     * Setter for #time
     * @param {string} time
     */,
    set: function set(time) {
      if (check12ValidFormat(time, scorm12_regex.CMITime)) {
        _classPrivateFieldSet(_time, this, time);
      }
    }

    /**
     * Getter for #type. Should only be called during JSON export.
     * @return {*}
     */
  }, {
    key: "type",
    get: function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_type, this);
    }

    /**
     * Setter for #type
     * @param {string} type
     */,
    set: function set(type) {
      if (check12ValidFormat(type, scorm12_regex.CMIType)) {
        _classPrivateFieldSet(_type, this, type);
      }
    }

    /**
     * Getter for #weighting. Should only be called during JSON export.
     * @return {*}
     */
  }, {
    key: "weighting",
    get: function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_weighting, this);
    }

    /**
     * Setter for #weighting
     * @param {string} weighting
     */,
    set: function set(weighting) {
      if (check12ValidFormat(weighting, scorm12_regex.CMIDecimal) && check12ValidRange(weighting, scorm12_regex.weighting_range)) {
        _classPrivateFieldSet(_weighting, this, weighting);
      }
    }

    /**
     * Getter for #student_response. Should only be called during JSON export.
     * @return {*}
     */
  }, {
    key: "student_response",
    get: function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_student_response, this);
    }

    /**
     * Setter for #student_response
     * @param {string} student_response
     */,
    set: function set(student_response) {
      if (check12ValidFormat(student_response, scorm12_regex.CMIFeedback, true)) {
        _classPrivateFieldSet(_student_response, this, student_response);
      }
    }

    /**
     * Getter for #result. Should only be called during JSON export.
     * @return {*}
     */
  }, {
    key: "result",
    get: function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_result, this);
    }

    /**
     * Setter for #result
     * @param {string} result
     */,
    set: function set(result) {
      if (check12ValidFormat(result, scorm12_regex.CMIResult)) {
        _classPrivateFieldSet(_result, this, result);
      }
    }

    /**
     * Getter for #latency. Should only be called during JSON export.
     * @return {*}
     */
  }, {
    key: "latency",
    get: function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_latency, this);
    }

    /**
     * Setter for #latency
     * @param {string} latency
     */,
    set: function set(latency) {
      if (check12ValidFormat(latency, scorm12_regex.CMITimespan)) {
        _classPrivateFieldSet(_latency, this, latency);
      }
    }

    /**
     * toJSON for cmi.interactions.n
     *
     * @return {
     *    {
     *      id: string,
     *      time: string,
     *      type: string,
     *      weighting: string,
     *      student_response: string,
     *      result: string,
     *      latency: string,
     *      objectives: CMIArray,
     *      correct_responses: CMIArray
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'id': this.id,
        'time': this.time,
        'type': this.type,
        'weighting': this.weighting,
        'student_response': this.student_response,
        'result': this.result,
        'latency': this.latency,
        'objectives': this.objectives,
        'correct_responses': this.correct_responses
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);

/**
 * Class representing SCORM 1.2's cmi.objectives.n object
 * @extends BaseCMI
 */
var _id2 = /*#__PURE__*/new WeakMap();
var _status = /*#__PURE__*/new WeakMap();
var CMIObjectivesObject = /*#__PURE__*/function (_BaseCMI6) {
  /**
   * Constructor for cmi.objectives.n
   */
  function CMIObjectivesObject() {
    var _this6;
    _classCallCheck(this, CMIObjectivesObject);
    _this6 = _callSuper(this, CMIObjectivesObject);
    _classPrivateFieldInitSpec(_this6, _id2, '');
    _classPrivateFieldInitSpec(_this6, _status, '');
    _this6.score = new _common__WEBPACK_IMPORTED_MODULE_0__.CMIScore({
      score_children: scorm12_constants.score_children,
      score_range: scorm12_regex.score_range,
      invalidErrorCode: scorm12_error_codes.INVALID_SET_VALUE,
      invalidTypeCode: scorm12_error_codes.TYPE_MISMATCH,
      invalidRangeCode: scorm12_error_codes.VALUE_OUT_OF_RANGE,
      errorClass: _exceptions__WEBPACK_IMPORTED_MODULE_4__.Scorm12ValidationError
    });
    return _this6;
  }
  _inherits(CMIObjectivesObject, _BaseCMI6);
  return _createClass(CMIObjectivesObject, [{
    key: "id",
    get:
    /**
     * Getter for #id
     * @return {""}
     */
    function get() {
      return _classPrivateFieldGet(_id2, this);
    }

    /**
     * Setter for #id
     * @param {string} id
     */,
    set: function set(id) {
      if (check12ValidFormat(id, scorm12_regex.CMIIdentifier)) {
        _classPrivateFieldSet(_id2, this, id);
      }
    }

    /**
     * Getter for #status
     * @return {""}
     */
  }, {
    key: "status",
    get: function get() {
      return _classPrivateFieldGet(_status, this);
    }

    /**
     * Setter for #status
     * @param {string} status
     */,
    set: function set(status) {
      if (check12ValidFormat(status, scorm12_regex.CMIStatus2)) {
        _classPrivateFieldSet(_status, this, status);
      }
    }

    /**
     * toJSON for cmi.objectives.n
     * @return {
     *    {
     *      id: string,
     *      status: string,
     *      score: CMIScore
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'id': this.id,
        'status': this.status,
        'score': this.score
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);

/**
 * Class representing SCORM 1.2's cmi.interactions.n.objectives.n object
 * @extends BaseCMI
 */
var _id3 = /*#__PURE__*/new WeakMap();
var CMIInteractionsObjectivesObject = /*#__PURE__*/function (_BaseCMI7) {
  /**
   * Constructor for cmi.interactions.n.objectives.n
   */
  function CMIInteractionsObjectivesObject() {
    var _this7;
    _classCallCheck(this, CMIInteractionsObjectivesObject);
    _this7 = _callSuper(this, CMIInteractionsObjectivesObject);
    _classPrivateFieldInitSpec(_this7, _id3, '');
    return _this7;
  }
  _inherits(CMIInteractionsObjectivesObject, _BaseCMI7);
  return _createClass(CMIInteractionsObjectivesObject, [{
    key: "id",
    get:
    /**
     * Getter for #id
     * @return {""}
     */
    function get() {
      return _classPrivateFieldGet(_id3, this);
    }

    /**
     * Setter for #id
     * @param {string} id
     */,
    set: function set(id) {
      if (check12ValidFormat(id, scorm12_regex.CMIIdentifier)) {
        _classPrivateFieldSet(_id3, this, id);
      }
    }

    /**
     * toJSON for cmi.interactions.n.objectives.n
     * @return {
     *    {
     *      id: string
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'id': this.id
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);

/**
 * Class representing SCORM 1.2's cmi.interactions.correct_responses.n object
 * @extends BaseCMI
 */
var _pattern = /*#__PURE__*/new WeakMap();
var CMIInteractionsCorrectResponsesObject = /*#__PURE__*/function (_BaseCMI8) {
  /**
   * Constructor for cmi.interactions.correct_responses.n
   */
  function CMIInteractionsCorrectResponsesObject() {
    var _this8;
    _classCallCheck(this, CMIInteractionsCorrectResponsesObject);
    _this8 = _callSuper(this, CMIInteractionsCorrectResponsesObject);
    _classPrivateFieldInitSpec(_this8, _pattern, '');
    return _this8;
  }
  _inherits(CMIInteractionsCorrectResponsesObject, _BaseCMI8);
  return _createClass(CMIInteractionsCorrectResponsesObject, [{
    key: "pattern",
    get:
    /**
     * Getter for #pattern
     * @return {string}
     */
    function get() {
      return !this.jsonString ? throwWriteOnlyError() : _classPrivateFieldGet(_pattern, this);
    }

    /**
     * Setter for #pattern
     * @param {string} pattern
     */,
    set: function set(pattern) {
      if (check12ValidFormat(pattern, scorm12_regex.CMIFeedback, true)) {
        _classPrivateFieldSet(_pattern, this, pattern);
      }
    }

    /**
     * toJSON for cmi.interactions.correct_responses.n
     * @return {
     *    {
     *      pattern: string
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'pattern': this.pattern
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);

/**
 * Class for AICC Navigation object
 */
var _event = /*#__PURE__*/new WeakMap();
var NAV = /*#__PURE__*/function (_BaseCMI9) {
  /**
   * Constructor for NAV object
   */
  function NAV() {
    var _this9;
    _classCallCheck(this, NAV);
    _this9 = _callSuper(this, NAV);
    _classPrivateFieldInitSpec(_this9, _event, '');
    return _this9;
  }
  _inherits(NAV, _BaseCMI9);
  return _createClass(NAV, [{
    key: "event",
    get:
    /**
     * Getter for #event
     * @return {string}
     */
    function get() {
      return _classPrivateFieldGet(_event, this);
    }

    /**
     * Setter for #event
     * @param {string} event
     */,
    set: function set(event) {
      if (check12ValidFormat(event, scorm12_regex.NAVEvent)) {
        _classPrivateFieldSet(_event, this, event);
      }
    }

    /**
     * toJSON for nav object
     * @return {
     *    {
     *      event: string
     *    }
     *  }
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      this.jsonString = true;
      var result = {
        'event': this.event
      };
      delete this.jsonString;
      return result;
    }
  }]);
}(_common__WEBPACK_IMPORTED_MODULE_0__.BaseCMI);

/***/ }),

/***/ "./src/constants/api_constants.js":
/*!****************************************!*\
  !*** ./src/constants/api_constants.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var global = {
  SCORM_TRUE: 'true',
  SCORM_FALSE: 'false',
  STATE_NOT_INITIALIZED: 0,
  STATE_INITIALIZED: 1,
  STATE_TERMINATED: 2,
  LOG_LEVEL_DEBUG: 1,
  LOG_LEVEL_INFO: 2,
  LOG_LEVEL_WARNING: 3,
  LOG_LEVEL_ERROR: 4,
  LOG_LEVEL_NONE: 5
};
var scorm12 = {
  // Children lists
  cmi_children: 'core,suspend_data,launch_data,comments,objectives,student_data,student_preference,interactions',
  core_children: 'student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time',
  score_children: 'raw,min,max',
  comments_children: 'content,location,time',
  objectives_children: 'id,score,status',
  correct_responses_children: 'pattern',
  student_data_children: 'mastery_score,max_time_allowed,time_limit_action',
  student_preference_children: 'audio,language,speed,text',
  interactions_children: 'id,objectives,time,type,correct_responses,weighting,student_response,result,latency',
  error_descriptions: {
    '101': {
      basicMessage: 'General Exception',
      detailMessage: 'No specific error code exists to describe the error. Use LMSGetDiagnostic for more information'
    },
    '201': {
      basicMessage: 'Invalid argument error',
      detailMessage: 'Indicates that an argument represents an invalid data model element or is otherwise incorrect.'
    },
    '202': {
      basicMessage: 'Element cannot have children',
      detailMessage: 'Indicates that LMSGetValue was called with a data model element name that ends in "_children" for a data model element that does not support the "_children" suffix.'
    },
    '203': {
      basicMessage: 'Element not an array - cannot have count',
      detailMessage: 'Indicates that LMSGetValue was called with a data model element name that ends in "_count" for a data model element that does not support the "_count" suffix.'
    },
    '301': {
      basicMessage: 'Not initialized',
      detailMessage: 'Indicates that an API call was made before the call to lmsInitialize.'
    },
    '401': {
      basicMessage: 'Not implemented error',
      detailMessage: 'The data model element indicated in a call to LMSGetValue or LMSSetValue is valid, but was not implemented by this LMS. SCORM 1.2 defines a set of data model elements as being optional for an LMS to implement.'
    },
    '402': {
      basicMessage: 'Invalid set value, element is a keyword',
      detailMessage: 'Indicates that LMSSetValue was called on a data model element that represents a keyword (elements that end in "_children" and "_count").'
    },
    '403': {
      basicMessage: 'Element is read only',
      detailMessage: 'LMSSetValue was called with a data model element that can only be read.'
    },
    '404': {
      basicMessage: 'Element is write only',
      detailMessage: 'LMSGetValue was called on a data model element that can only be written to.'
    },
    '405': {
      basicMessage: 'Incorrect Data Type',
      detailMessage: 'LMSSetValue was called with a value that is not consistent with the data format of the supplied data model element.'
    },
    '407': {
      basicMessage: 'Element Value Out Of Range',
      detailMessage: 'The numeric value supplied to a LMSSetValue call is outside of the numeric range allowed for the supplied data model element.'
    },
    '408': {
      basicMessage: 'Data Model Dependency Not Established',
      detailMessage: 'Some data model elements cannot be set until another data model element was set. This error condition indicates that the prerequisite element was not set before the dependent element.'
    }
  }
};
var aicc = _objectSpread(_objectSpread({}, scorm12), {
  cmi_children: 'core,suspend_data,launch_data,comments,objectives,student_data,student_preference,interactions,evaluation',
  student_preference_children: 'audio,language,lesson_type,speed,text,text_color,text_location,text_size,video,windows',
  student_data_children: 'attempt_number,tries,mastery_score,max_time_allowed,time_limit_action',
  student_demographics_children: 'city,class,company,country,experience,familiar_name,instructor_name,title,native_language,state,street_address,telephone,years_experience',
  tries_children: 'time,status,score',
  attempt_records_children: 'score,lesson_status',
  paths_children: 'location_id,date,time,status,why_left,time_in_element'
});
var scorm2004 = {
  // Children lists
  cmi_children: '_version,comments_from_learner,comments_from_lms,completion_status,credit,entry,exit,interactions,launch_data,learner_id,learner_name,learner_preference,location,max_time_allowed,mode,objectives,progress_measure,scaled_passing_score,score,session_time,success_status,suspend_data,time_limit_action,total_time',
  comments_children: 'comment,timestamp,location',
  score_children: 'max,raw,scaled,min',
  objectives_children: 'progress_measure,completion_status,success_status,description,score,id',
  correct_responses_children: 'pattern',
  student_data_children: 'mastery_score,max_time_allowed,time_limit_action',
  student_preference_children: 'audio_level,audio_captioning,delivery_speed,language',
  interactions_children: 'id,type,objectives,timestamp,correct_responses,weighting,learner_response,result,latency,description',
  error_descriptions: {
    '0': {
      basicMessage: 'No Error',
      detailMessage: 'No error occurred, the previous API call was successful.'
    },
    '101': {
      basicMessage: 'General Exception',
      detailMessage: 'No specific error code exists to describe the error. Use GetDiagnostic for more information.'
    },
    '102': {
      basicMessage: 'General Initialization Failure',
      detailMessage: 'Call to Initialize failed for an unknown reason.'
    },
    '103': {
      basicMessage: 'Already Initialized',
      detailMessage: 'Call to Initialize failed because Initialize was already called.'
    },
    '104': {
      basicMessage: 'Content Instance Terminated',
      detailMessage: 'Call to Initialize failed because Terminate was already called.'
    },
    '111': {
      basicMessage: 'General Termination Failure',
      detailMessage: 'Call to Terminate failed for an unknown reason.'
    },
    '112': {
      basicMessage: 'Termination Before Initialization',
      detailMessage: 'Call to Terminate failed because it was made before the call to Initialize.'
    },
    '113': {
      basicMessage: 'Termination After Termination',
      detailMessage: 'Call to Terminate failed because Terminate was already called.'
    },
    '122': {
      basicMessage: 'Retrieve Data Before Initialization',
      detailMessage: 'Call to GetValue failed because it was made before the call to Initialize.'
    },
    '123': {
      basicMessage: 'Retrieve Data After Termination',
      detailMessage: 'Call to GetValue failed because it was made after the call to Terminate.'
    },
    '132': {
      basicMessage: 'Store Data Before Initialization',
      detailMessage: 'Call to SetValue failed because it was made before the call to Initialize.'
    },
    '133': {
      basicMessage: 'Store Data After Termination',
      detailMessage: 'Call to SetValue failed because it was made after the call to Terminate.'
    },
    '142': {
      basicMessage: 'Commit Before Initialization',
      detailMessage: 'Call to Commit failed because it was made before the call to Initialize.'
    },
    '143': {
      basicMessage: 'Commit After Termination',
      detailMessage: 'Call to Commit failed because it was made after the call to Terminate.'
    },
    '201': {
      basicMessage: 'General Argument Error',
      detailMessage: 'An invalid argument was passed to an API method (usually indicates that Initialize, Commit or Terminate did not receive the expected empty string argument.'
    },
    '301': {
      basicMessage: 'General Get Failure',
      detailMessage: 'Indicates a failed GetValue call where no other specific error code is applicable. Use GetDiagnostic for more information.'
    },
    '351': {
      basicMessage: 'General Set Failure',
      detailMessage: 'Indicates a failed SetValue call where no other specific error code is applicable. Use GetDiagnostic for more information.'
    },
    '391': {
      basicMessage: 'General Commit Failure',
      detailMessage: 'Indicates a failed Commit call where no other specific error code is applicable. Use GetDiagnostic for more information.'
    },
    '401': {
      basicMessage: 'Undefined Data Model Element',
      detailMessage: 'The data model element name passed to GetValue or SetValue is not a valid SCORM data model element.'
    },
    '402': {
      basicMessage: 'Unimplemented Data Model Element',
      detailMessage: 'The data model element indicated in a call to GetValue or SetValue is valid, but was not implemented by this LMS. In SCORM 2004, this error would indicate an LMS that is not fully SCORM conformant.'
    },
    '403': {
      basicMessage: 'Data Model Element Value Not Initialized',
      detailMessage: 'Attempt to read a data model element that has not been initialized by the LMS or through a SetValue call. This error condition is often reached during normal execution of a SCO.'
    },
    '404': {
      basicMessage: 'Data Model Element Is Read Only',
      detailMessage: 'SetValue was called with a data model element that can only be read.'
    },
    '405': {
      basicMessage: 'Data Model Element Is Write Only',
      detailMessage: 'GetValue was called on a data model element that can only be written to.'
    },
    '406': {
      basicMessage: 'Data Model Element Type Mismatch',
      detailMessage: 'SetValue was called with a value that is not consistent with the data format of the supplied data model element.'
    },
    '407': {
      basicMessage: 'Data Model Element Value Out Of Range',
      detailMessage: 'The numeric value supplied to a SetValue call is outside of the numeric range allowed for the supplied data model element.'
    },
    '408': {
      basicMessage: 'Data Model Dependency Not Established',
      detailMessage: 'Some data model elements cannot be set until another data model element was set. This error condition indicates that the prerequisite element was not set before the dependent element.'
    }
  }
};
var APIConstants = {
  global: global,
  scorm12: scorm12,
  aicc: aicc,
  scorm2004: scorm2004
};
/* harmony default export */ __webpack_exports__["default"] = (APIConstants);

/***/ }),

/***/ "./src/constants/error_codes.js":
/*!**************************************!*\
  !*** ./src/constants/error_codes.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var global = {
  GENERAL: 101,
  INITIALIZATION_FAILED: 101,
  INITIALIZED: 101,
  TERMINATED: 101,
  TERMINATION_FAILURE: 101,
  TERMINATION_BEFORE_INIT: 101,
  MULTIPLE_TERMINATION: 101,
  RETRIEVE_BEFORE_INIT: 101,
  RETRIEVE_AFTER_TERM: 101,
  STORE_BEFORE_INIT: 101,
  STORE_AFTER_TERM: 101,
  COMMIT_BEFORE_INIT: 101,
  COMMIT_AFTER_TERM: 101,
  ARGUMENT_ERROR: 101,
  CHILDREN_ERROR: 101,
  COUNT_ERROR: 101,
  GENERAL_GET_FAILURE: 101,
  GENERAL_SET_FAILURE: 101,
  GENERAL_COMMIT_FAILURE: 101,
  UNDEFINED_DATA_MODEL: 101,
  UNIMPLEMENTED_ELEMENT: 101,
  VALUE_NOT_INITIALIZED: 101,
  INVALID_SET_VALUE: 101,
  READ_ONLY_ELEMENT: 101,
  WRITE_ONLY_ELEMENT: 101,
  TYPE_MISMATCH: 101,
  VALUE_OUT_OF_RANGE: 101,
  DEPENDENCY_NOT_ESTABLISHED: 101
};
var scorm12 = _objectSpread(_objectSpread({}, global), {
  RETRIEVE_BEFORE_INIT: 301,
  STORE_BEFORE_INIT: 301,
  COMMIT_BEFORE_INIT: 301,
  ARGUMENT_ERROR: 201,
  CHILDREN_ERROR: 202,
  COUNT_ERROR: 203,
  UNDEFINED_DATA_MODEL: 401,
  UNIMPLEMENTED_ELEMENT: 401,
  VALUE_NOT_INITIALIZED: 301,
  INVALID_SET_VALUE: 402,
  READ_ONLY_ELEMENT: 403,
  WRITE_ONLY_ELEMENT: 404,
  TYPE_MISMATCH: 405,
  VALUE_OUT_OF_RANGE: 407,
  DEPENDENCY_NOT_ESTABLISHED: 408
});
var scorm2004 = _objectSpread(_objectSpread({}, global), {
  INITIALIZATION_FAILED: 102,
  INITIALIZED: 103,
  TERMINATED: 104,
  TERMINATION_FAILURE: 111,
  TERMINATION_BEFORE_INIT: 112,
  MULTIPLE_TERMINATIONS: 113,
  RETRIEVE_BEFORE_INIT: 122,
  RETRIEVE_AFTER_TERM: 123,
  STORE_BEFORE_INIT: 132,
  STORE_AFTER_TERM: 133,
  COMMIT_BEFORE_INIT: 142,
  COMMIT_AFTER_TERM: 143,
  ARGUMENT_ERROR: 201,
  GENERAL_GET_FAILURE: 301,
  GENERAL_SET_FAILURE: 351,
  GENERAL_COMMIT_FAILURE: 391,
  UNDEFINED_DATA_MODEL: 401,
  UNIMPLEMENTED_ELEMENT: 402,
  VALUE_NOT_INITIALIZED: 403,
  READ_ONLY_ELEMENT: 404,
  WRITE_ONLY_ELEMENT: 405,
  TYPE_MISMATCH: 406,
  VALUE_OUT_OF_RANGE: 407,
  DEPENDENCY_NOT_ESTABLISHED: 408
});
var ErrorCodes = {
  scorm12: scorm12,
  scorm2004: scorm2004
};
/* harmony default export */ __webpack_exports__["default"] = (ErrorCodes);

/***/ }),

/***/ "./src/constants/regex.js":
/*!********************************!*\
  !*** ./src/constants/regex.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var scorm12 = {
  CMIString256: '^.{0,255}$',
  CMIString4096: '^.{0,4096}$',
  CMITime: '^(?:[01]\\d|2[0123]):(?:[012345]\\d):(?:[012345]\\d)$',
  // eslint-disable-line
  CMITimespan: '^([0-9]{2,}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,2})?$',
  // eslint-disable-line
  CMIInteger: '^\\d+$',
  CMISInteger: '^-?([0-9]+)$',
  CMIDecimal: '^-?([0-9]{0,3})(\.[0-9]*)?$',
  // eslint-disable-line
  CMIIdentifier: "^[\\u0021-\\u007E\\s]{0,255}$",
  CMIFeedback: '^.{0,255}$',
  // This must be redefined
  CMIIndex: '[._](\\d+).',
  // Vocabulary Data Type Definition
  CMIStatus: '^(passed|completed|failed|incomplete|browsed)$',
  CMIStatus2: '^(passed|completed|failed|incomplete|browsed|not attempted)$',
  CMIExit: '^(time-out|suspend|logout|)$',
  CMIType: '^(true-false|choice|fill-in|matching|performance|sequencing|likert|numeric)$',
  CMIResult: '^(correct|wrong|unanticipated|neutral|([0-9]{0,3})?(\\.[0-9]*)?)$',
  // eslint-disable-line
  NAVEvent: '^(previous|continue)$',
  // Data ranges
  score_range: '0#100',
  audio_range: '-1#100',
  speed_range: '-100#100',
  weighting_range: '-100#100',
  text_range: '-1#1'
};
var aicc = _objectSpread(_objectSpread({}, scorm12), {
  CMIIdentifier: '^\\w{1,255}$'
});
var scorm2004 = {
  CMIString200: "^[\\u0000-\\uFFFF]{0,200}$",
  CMIString250: "^[\\u0000-\\uFFFF]{0,250}$",
  CMIString1000: "^[\\u0000-\\uFFFF]{0,1000}$",
  CMIString4000: "^[\\u0000-\\uFFFF]{0,4000}$",
  CMIString64000: "^[\\u0000-\\uFFFF]{0,64000}$",
  CMILang: '^([a-zA-Z]{2,3}|i|x)(\-[a-zA-Z0-9\-]{2,8})?$|^$',
  // eslint-disable-line
  CMILangString250: '^(\{lang=([a-zA-Z]{2,3}|i|x)(\-[a-zA-Z0-9\-]{2,8})?\})?((?!\{.*$).{0,250}$)?$',
  // eslint-disable-line
  CMILangcr: '^((\{lang=([a-zA-Z]{2,3}|i|x)?(\-[a-zA-Z0-9\-]{2,8})?\}))(.*?)$',
  // eslint-disable-line
  CMILangString250cr: '^((\{lang=([a-zA-Z]{2,3}|i|x)?(\-[a-zA-Z0-9\-]{2,8})?\})?(.{0,250})?)?$',
  // eslint-disable-line
  CMILangString4000: '^(\{lang=([a-zA-Z]{2,3}|i|x)(\-[a-zA-Z0-9\-]{2,8})?\})?((?!\{.*$).{0,4000}$)?$',
  // eslint-disable-line
  CMITime: '^(19[7-9]{1}[0-9]{1}|20[0-2]{1}[0-9]{1}|203[0-8]{1})((-(0[1-9]{1}|1[0-2]{1}))((-(0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}))(T([0-1]{1}[0-9]{1}|2[0-3]{1})((:[0-5]{1}[0-9]{1})((:[0-5]{1}[0-9]{1})((\\.[0-9]{1,2})((Z|([+|-]([0-1]{1}[0-9]{1}|2[0-3]{1})))(:[0-5]{1}[0-9]{1})?)?)?)?)?)?)?)?$',
  CMITimespan: '^P(?:([.,\\d]+)Y)?(?:([.,\\d]+)M)?(?:([.,\\d]+)W)?(?:([.,\\d]+)D)?(?:T?(?:([.,\\d]+)H)?(?:([.,\\d]+)M)?(?:([.,\\d]+)S)?)?$',
  CMIInteger: '^\\d+$',
  CMISInteger: '^-?([0-9]+)$',
  CMIDecimal: '^-?([0-9]{1,5})(\\.[0-9]{1,18})?$',
  CMIIdentifier: '^\\S{1,250}[a-zA-Z0-9]$',
  CMIShortIdentifier: '^[\\w\\.\\-\\_]{1,250}$',
  // eslint-disable-line
  CMILongIdentifier: '^(?:(?!urn:)\\S{1,4000}|urn:[A-Za-z0-9-]{1,31}:\\S{1,4000}|.{1,4000})$',
  // need to re-examine this
  CMIFeedback: '^.*$',
  // This must be redefined
  CMIIndex: '[._](\\d+).',
  CMIIndexStore: '.N(\\d+).',
  // Vocabulary Data Type Definition
  CMICStatus: '^(completed|incomplete|not attempted|unknown)$',
  CMISStatus: '^(passed|failed|unknown)$',
  CMIExit: '^(time-out|suspend|logout|normal)$',
  CMIType: '^(true-false|choice|fill-in|long-fill-in|matching|performance|sequencing|likert|numeric|other)$',
  CMIResult: '^(correct|incorrect|unanticipated|neutral|-?([0-9]{1,4})(\\.[0-9]{1,18})?)$',
  NAVEvent: '^(previous|continue|exit|exitAll|abandon|abandonAll|suspendAll|\{target=\\S{0,200}[a-zA-Z0-9]\}choice|jump)$',
  // eslint-disable-line
  NAVBoolean: '^(unknown|true|false$)',
  NAVTarget: '^(previous|continue|choice.{target=\\S{0,200}[a-zA-Z0-9]})$',
  // Data ranges
  scaled_range: '-1#1',
  audio_range: '0#*',
  speed_range: '0#*',
  text_range: '-1#1',
  progress_range: '0#1'
};
var Regex = {
  aicc: aicc,
  scorm12: scorm12,
  scorm2004: scorm2004
};
/* harmony default export */ __webpack_exports__["default"] = (Regex);

/***/ }),

/***/ "./src/exceptions.js":
/*!***************************!*\
  !*** ./src/exceptions.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AICCValidationError: function() { return /* binding */ AICCValidationError; },
/* harmony export */   Scorm12ValidationError: function() { return /* binding */ Scorm12ValidationError; },
/* harmony export */   Scorm2004ValidationError: function() { return /* binding */ Scorm2004ValidationError; },
/* harmony export */   ValidationError: function() { return /* binding */ ValidationError; }
/* harmony export */ });
/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/api_constants */ "./src/constants/api_constants.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var scorm12_errors = _constants_api_constants__WEBPACK_IMPORTED_MODULE_0__["default"].scorm12.error_descriptions;
var aicc_errors = _constants_api_constants__WEBPACK_IMPORTED_MODULE_0__["default"].aicc.error_descriptions;
var scorm2004_errors = _constants_api_constants__WEBPACK_IMPORTED_MODULE_0__["default"].scorm2004.error_descriptions;

/**
 * Base Validation Exception
 */
var _errorCode = /*#__PURE__*/new WeakMap();
var _errorMessage = /*#__PURE__*/new WeakMap();
var _detailedMessage = /*#__PURE__*/new WeakMap();
var ValidationError = /*#__PURE__*/function (_Error) {
  /**
   * Constructor to take in an error message and code
   * @param {number} errorCode
   * @param {string} errorMessage
   * @param {string} detailedMessage
   */
  function ValidationError(errorCode, errorMessage, detailedMessage) {
    var _this;
    _classCallCheck(this, ValidationError);
    _this = _callSuper(this, ValidationError, [errorMessage]);
    _classPrivateFieldInitSpec(_this, _errorCode, void 0);
    _classPrivateFieldInitSpec(_this, _errorMessage, void 0);
    _classPrivateFieldInitSpec(_this, _detailedMessage, void 0);
    _classPrivateFieldSet(_errorCode, _this, errorCode);
    _classPrivateFieldSet(_errorMessage, _this, errorMessage);
    _classPrivateFieldSet(_detailedMessage, _this, detailedMessage);
    return _this;
  }
  _inherits(ValidationError, _Error);
  return _createClass(ValidationError, [{
    key: "errorCode",
    get:
    /**
     * Getter for #errorCode
     * @return {number}
     */
    function get() {
      return _classPrivateFieldGet(_errorCode, this);
    }

    /**
     * Getter for #errorMessage
     * @return {string}
     */
  }, {
    key: "errorMessage",
    get: function get() {
      return _classPrivateFieldGet(_errorMessage, this);
    }

    /**
     * Getter for #detailedMessage
     * @return {string}
     */
  }, {
    key: "detailedMessage",
    get: function get() {
      return _classPrivateFieldGet(_detailedMessage, this);
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * SCORM 1.2 Validation Error
 */
var Scorm12ValidationError = /*#__PURE__*/function (_ValidationError2) {
  /**
   * Constructor to take in an error code
   * @param {number} errorCode
   */
  function Scorm12ValidationError(errorCode) {
    var _this2;
    _classCallCheck(this, Scorm12ValidationError);
    if ({}.hasOwnProperty.call(scorm12_errors, String(errorCode))) {
      _this2 = _callSuper(this, Scorm12ValidationError, [errorCode, scorm12_errors[String(errorCode)].basicMessage, scorm12_errors[String(errorCode)].detailMessage]);
    } else {
      _this2 = _callSuper(this, Scorm12ValidationError, [101, scorm12_errors['101'].basicMessage, scorm12_errors['101'].detailMessage]);
    }
    return _assertThisInitialized(_this2);
  }
  _inherits(Scorm12ValidationError, _ValidationError2);
  return _createClass(Scorm12ValidationError);
}(ValidationError);

/**
 * AICC Validation Error
 */
var AICCValidationError = /*#__PURE__*/function (_ValidationError3) {
  /**
   * Constructor to take in an error code
   * @param {number} errorCode
   */
  function AICCValidationError(errorCode) {
    var _this3;
    _classCallCheck(this, AICCValidationError);
    if ({}.hasOwnProperty.call(aicc_errors, String(errorCode))) {
      _this3 = _callSuper(this, AICCValidationError, [errorCode, aicc_errors[String(errorCode)].basicMessage, aicc_errors[String(errorCode)].detailMessage]);
    } else {
      _this3 = _callSuper(this, AICCValidationError, [101, aicc_errors['101'].basicMessage, aicc_errors['101'].detailMessage]);
    }
    return _assertThisInitialized(_this3);
  }
  _inherits(AICCValidationError, _ValidationError3);
  return _createClass(AICCValidationError);
}(ValidationError);

/**
 * SCORM 2004 Validation Error
 */
var Scorm2004ValidationError = /*#__PURE__*/function (_ValidationError4) {
  /**
   * Constructor to take in an error code
   * @param {number} errorCode
   */
  function Scorm2004ValidationError(errorCode) {
    var _this4;
    _classCallCheck(this, Scorm2004ValidationError);
    if ({}.hasOwnProperty.call(scorm2004_errors, String(errorCode))) {
      _this4 = _callSuper(this, Scorm2004ValidationError, [errorCode, scorm2004_errors[String(errorCode)].basicMessage, scorm2004_errors[String(errorCode)].detailMessage]);
    } else {
      _this4 = _callSuper(this, Scorm2004ValidationError, [101, scorm2004_errors['101'].basicMessage, scorm2004_errors['101'].detailMessage]);
    }
    return _assertThisInitialized(_this4);
  }
  _inherits(Scorm2004ValidationError, _ValidationError4);
  return _createClass(Scorm2004ValidationError);
}(ValidationError);

/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SECONDS_PER_DAY: function() { return /* binding */ SECONDS_PER_DAY; },
/* harmony export */   SECONDS_PER_HOUR: function() { return /* binding */ SECONDS_PER_HOUR; },
/* harmony export */   SECONDS_PER_MINUTE: function() { return /* binding */ SECONDS_PER_MINUTE; },
/* harmony export */   SECONDS_PER_SECOND: function() { return /* binding */ SECONDS_PER_SECOND; },
/* harmony export */   addHHMMSSTimeStrings: function() { return /* binding */ addHHMMSSTimeStrings; },
/* harmony export */   addTwoDurations: function() { return /* binding */ addTwoDurations; },
/* harmony export */   countDecimals: function() { return /* binding */ countDecimals; },
/* harmony export */   flatten: function() { return /* binding */ flatten; },
/* harmony export */   getDurationAsSeconds: function() { return /* binding */ getDurationAsSeconds; },
/* harmony export */   getSecondsAsHHMMSS: function() { return /* binding */ getSecondsAsHHMMSS; },
/* harmony export */   getSecondsAsISODuration: function() { return /* binding */ getSecondsAsISODuration; },
/* harmony export */   getTimeAsSeconds: function() { return /* binding */ getTimeAsSeconds; },
/* harmony export */   unflatten: function() { return /* binding */ unflatten; }
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var SECONDS_PER_SECOND = 1.0;
var SECONDS_PER_MINUTE = 60;
var SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
var SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;
var designations = [['D', SECONDS_PER_DAY], ['H', SECONDS_PER_HOUR], ['M', SECONDS_PER_MINUTE], ['S', SECONDS_PER_SECOND]];

/**
 * Converts a Number to a String of HH:MM:SS
 *
 * @param {Number} totalSeconds
 * @return {string}
 */
function getSecondsAsHHMMSS(totalSeconds) {
  // SCORM spec does not deal with negative durations, give zero back
  if (!totalSeconds || totalSeconds <= 0) {
    return '00:00:00';
  }
  var hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  var dateObj = new Date(totalSeconds * 1000);
  var minutes = dateObj.getUTCMinutes();
  // make sure we add any possible decimal value
  var seconds = dateObj.getSeconds();
  var ms = totalSeconds % 1.0;
  var msStr = '';
  if (countDecimals(ms) > 0) {
    if (countDecimals(ms) > 2) {
      msStr = ms.toFixed(2);
    } else {
      msStr = String(ms);
    }
    msStr = '.' + msStr.split('.')[1];
  }
  return (hours + ':' + minutes + ':' + seconds).replace(/\b\d\b/g, '0$&') + msStr;
}

/**
 * Calculate the number of seconds from ISO 8601 Duration
 *
 * @param {Number} seconds
 * @return {String}
 */
function getSecondsAsISODuration(seconds) {
  // SCORM spec does not deal with negative durations, give zero back
  if (!seconds || seconds <= 0) {
    return 'PT0S';
  }
  var duration = 'P';
  var remainder = seconds;
  designations.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      sign = _ref2[0],
      current_seconds = _ref2[1];
    var value = Math.floor(remainder / current_seconds);
    remainder = remainder % current_seconds;
    if (countDecimals(remainder) > 2) {
      remainder = Number(Number(remainder).toFixed(2));
    }
    // If we have anything left in the remainder, and we're currently adding
    // seconds to the duration, go ahead and add the decimal to the seconds
    if (sign === 'S' && remainder > 0) {
      value += remainder;
    }
    if (value) {
      if ((duration.indexOf('D') > 0 || sign === 'H' || sign === 'M' || sign === 'S') && duration.indexOf('T') === -1) {
        duration += 'T';
      }
      duration += "".concat(value).concat(sign);
    }
  });
  return duration;
}

/**
 * Calculate the number of seconds from HH:MM:SS.DDDDDD
 *
 * @param {string} timeString
 * @param {RegExp} timeRegex
 * @return {number}
 */
function getTimeAsSeconds(timeString, timeRegex) {
  if (!timeString || typeof timeString !== 'string' || !timeString.match(timeRegex)) {
    return 0;
  }
  var parts = timeString.split(':');
  var hours = Number(parts[0]);
  var minutes = Number(parts[1]);
  var seconds = Number(parts[2]);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Calculate the number of seconds from ISO 8601 Duration
 *
 * @param {string} duration
 * @param {RegExp} durationRegex
 * @return {number}
 */
function getDurationAsSeconds(duration, durationRegex) {
  if (!duration || !duration.match(durationRegex)) {
    return 0;
  }
  var _ref3 = new RegExp(durationRegex).exec(duration) || [],
    _ref4 = _slicedToArray(_ref3, 8),
    years = _ref4[1],
    months = _ref4[2],
    days = _ref4[4],
    hours = _ref4[5],
    minutes = _ref4[6],
    seconds = _ref4[7];
  var result = 0.0;
  result += Number(seconds) || 0.0;
  result += Number(minutes) * 60.0 || 0.0;
  result += Number(hours) * 3600.0 || 0.0;
  result += Number(days) * (60 * 60 * 24.0) || 0.0;
  result += Number(years) * (60 * 60 * 24 * 365.0) || 0.0;
  return result;
}

/**
 * Adds together two ISO8601 Duration strings
 *
 * @param {string} first
 * @param {string} second
 * @param {RegExp} durationRegex
 * @return {string}
 */
function addTwoDurations(first, second, durationRegex) {
  return getSecondsAsISODuration(getDurationAsSeconds(first, durationRegex) + getDurationAsSeconds(second, durationRegex));
}

/**
 * Add together two HH:MM:SS.DD strings
 *
 * @param {string} first
 * @param {string} second
 * @param {RegExp} timeRegex
 * @return {string}
 */
function addHHMMSSTimeStrings(first, second, timeRegex) {
  return getSecondsAsHHMMSS(getTimeAsSeconds(first, timeRegex) + getTimeAsSeconds(second, timeRegex));
}

/**
 * Flatten a JSON object down to string paths for each values
 * @param {object} data
 * @return {object}
 */
function flatten(data) {
  var result = {};

  /**
   * Recurse through the object
   * @param {*} cur
   * @param {*} prop
   */
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) {
        recurse(cur[i], prop + '[' + i + ']');
        if (l === 0) result[prop] = [];
      }
    } else {
      var isEmpty = true;
      for (var p in cur) {
        if ({}.hasOwnProperty.call(cur, p)) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + '.' + p : p);
        }
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(data, '');
  return result;
}

/**
 * Un-flatten a flat JSON object
 * @param {object} data
 * @return {object}
 */
function unflatten(data) {
  'use strict';

  if (Object(data) !== data || Array.isArray(data)) return data;
  var regex = /\.?([^.[\]]+)|\[(\d+)]/g;
  var result = {};
  for (var p in data) {
    if ({}.hasOwnProperty.call(data, p)) {
      var cur = result;
      var prop = '';
      var m = regex.exec(p);
      while (m) {
        cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
        prop = m[2] || m[1];
        m = regex.exec(p);
      }
      cur[prop] = data[p];
    }
  }
  return result[''] || result;
}

/**
 * Counts the number of decimal places
 * @param {number} num
 * @return {number}
 */
function countDecimals(num) {
  if (Math.floor(num) === num || String(num).indexOf('.') < 0) return 0;
  var parts = num.toString().split('.')[1];
  return parts.length || 0;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*****************************!*\
  !*** ./src/exports/aicc.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AICC__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AICC */ "./src/AICC.js");

window.AICC = _AICC__WEBPACK_IMPORTED_MODULE_0__["default"];
}();
/******/ })()
;
//# sourceMappingURL=aicc.js.map