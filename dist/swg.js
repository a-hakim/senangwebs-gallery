/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SWG"] = factory();
	else
		root["SWG"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/swg.js":
/*!***********************!*\
  !*** ./src/js/swg.js ***!
  \***********************/
/***/ ((module) => {

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// SenangWebs Gallery (SWG) - Lightweight Modal Image Gallery\n// Version 1.4.0\nvar SenangWebsGallery = /*#__PURE__*/function () {\n  function SenangWebsGallery(galleryElement) {\n    _classCallCheck(this, SenangWebsGallery);\n    this.gallery = galleryElement;\n    this.currentIndex = 0;\n    this.items = [];\n    this.modal = null;\n    this.modalImage = null;\n    this.caption = null;\n    this.counter = null;\n    this.isOpen = false;\n    this.isAnimating = false;\n    this.showCounter = this.gallery.hasAttribute('data-swg-page');\n    this.init();\n  }\n  return _createClass(SenangWebsGallery, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n      // Initialize only items from this specific gallery\n      var items = this.gallery.querySelectorAll('[data-swg-item]');\n      items.forEach(function (item, index) {\n        var _item$querySelector;\n        _this.items.push({\n          element: item,\n          src: ((_item$querySelector = item.querySelector('img')) === null || _item$querySelector === void 0 ? void 0 : _item$querySelector.src) || '',\n          caption: item.getAttribute('data-swg-caption') || ''\n        });\n        item.addEventListener('click', function (e) {\n          e.preventDefault();\n          _this.openModal(index);\n        });\n      });\n      this.createModal();\n      this.bindEvents();\n    }\n  }, {\n    key: \"createModal\",\n    value: function createModal() {\n      var modal = document.createElement('div');\n      modal.className = 'swg-modal';\n      modal.innerHTML = \"\\n            <div class=\\\"swg-modal-overlay\\\"></div>\\n            <div class=\\\"swg-modal-content\\\">\\n                \".concat(this.showCounter ? '<div class=\"swg-counter\"></div>' : '', \"\\n                <button class=\\\"swg-close\\\">\\n                    <svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 352 512\\\" fill=\\\"currentColor\\\" width=\\\"16\\\" height=\\\"16\\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\\"M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z\\\"/></svg>\\n                </button>\\n                <button class=\\\"swg-prev\\\">\\n                    <svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 448 512\\\" fill=\\\"currentColor\\\" width=\\\"16\\\" height=\\\"16\\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\\"M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8 .4 34.3z\\\"/></svg>\\n                </button>\\n                <button class=\\\"swg-next\\\">\\n                    <svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 448 512\\\" fill=\\\"currentColor\\\" width=\\\"16\\\" height=\\\"16\\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\\"M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z\\\"/></svg>\\n                </button>\\n                <div class=\\\"swg-image-container\\\">\\n                    <img class=\\\"swg-modal-image\\\" src=\\\"\\\" alt=\\\"\\\">\\n                </div>\\n                <div class=\\\"swg-caption\\\"></div>\\n            </div>\\n        \");\n      document.body.appendChild(modal);\n      this.modal = modal;\n      this.modalImage = modal.querySelector('.swg-modal-image');\n      this.caption = modal.querySelector('.swg-caption');\n      this.counter = modal.querySelector('.swg-counter');\n    }\n  }, {\n    key: \"bindEvents\",\n    value: function bindEvents() {\n      var _this2 = this;\n      this.modal.querySelector('.swg-close').addEventListener('click', function () {\n        return _this2.closeModal();\n      });\n      this.modal.querySelector('.swg-prev').addEventListener('click', function () {\n        return _this2.showPrevious();\n      });\n      this.modal.querySelector('.swg-next').addEventListener('click', function () {\n        return _this2.showNext();\n      });\n      this.modal.querySelector('.swg-modal-overlay').addEventListener('click', function (e) {\n        if (e.target === e.currentTarget) {\n          _this2.closeModal();\n        }\n      });\n      var handleKeydown = function handleKeydown(e) {\n        if (!_this2.isOpen) return;\n        switch (e.key) {\n          case 'Escape':\n            _this2.closeModal();\n            break;\n          case 'ArrowLeft':\n            _this2.showPrevious();\n            break;\n          case 'ArrowRight':\n            _this2.showNext();\n            break;\n        }\n      };\n      document.addEventListener('keydown', handleKeydown);\n\n      // Clean up event listener when modal is removed\n      this.modal.addEventListener('remove', function () {\n        document.removeEventListener('keydown', handleKeydown);\n      });\n    }\n  }, {\n    key: \"openModal\",\n    value: function openModal(index) {\n      var _this3 = this;\n      this.currentIndex = index;\n      this.isOpen = true;\n      this.modalImage.style.opacity = '0';\n      this.modal.classList.add('active');\n      requestAnimationFrame(function () {\n        _this3.modalImage.style.opacity = '1';\n        _this3.updateImage();\n      });\n      document.body.style.overflow = 'hidden';\n    }\n  }, {\n    key: \"closeModal\",\n    value: function closeModal() {\n      var _this4 = this;\n      this.modalImage.style.opacity = '0';\n      setTimeout(function () {\n        _this4.isOpen = false;\n        _this4.modal.classList.remove('active');\n        document.body.style.overflow = '';\n        _this4.modalImage.classList.remove('slide-left', 'slide-right');\n      }, 300);\n    }\n  }, {\n    key: \"showPrevious\",\n    value: function showPrevious() {\n      var _this5 = this;\n      if (this.isAnimating) return;\n      this.animateSlide('right', function () {\n        _this5.currentIndex = (_this5.currentIndex - 1 + _this5.items.length) % _this5.items.length;\n        _this5.updateImage();\n      });\n    }\n  }, {\n    key: \"showNext\",\n    value: function showNext() {\n      var _this6 = this;\n      if (this.isAnimating) return;\n      this.animateSlide('left', function () {\n        _this6.currentIndex = (_this6.currentIndex + 1) % _this6.items.length;\n        _this6.updateImage();\n      });\n    }\n  }, {\n    key: \"animateSlide\",\n    value: function animateSlide(direction, callback) {\n      var _this7 = this;\n      this.isAnimating = true;\n      this.modalImage.classList.add(\"slide-\".concat(direction));\n      this.modalImage.style.opacity = '0';\n      setTimeout(function () {\n        callback();\n        _this7.modalImage.classList.remove(\"slide-\".concat(direction));\n        requestAnimationFrame(function () {\n          _this7.modalImage.style.opacity = '1';\n          _this7.isAnimating = false;\n        });\n      }, 300);\n    }\n  }, {\n    key: \"updateImage\",\n    value: function updateImage() {\n      var item = this.items[this.currentIndex];\n      this.modalImage.src = item.src;\n      if (this.caption && item.caption !== '') {\n        this.caption.textContent = item.caption;\n        this.caption.style.display = 'block';\n      } else {\n        this.caption.style.display = 'none';\n      }\n      if (this.showCounter && this.counter) {\n        this.counter.textContent = \"\".concat(this.currentIndex + 1, \" / \").concat(this.items.length);\n      }\n    }\n  }]);\n}(); // Initialize each gallery separately\ndocument.addEventListener('DOMContentLoaded', function () {\n  document.querySelectorAll('[data-swg]').forEach(function (gallery) {\n    new SenangWebsGallery(gallery);\n  });\n});\n\n// Export for module usage\nif ( true && module.exports) {\n  module.exports = SenangWebsGallery;\n}\n\n//# sourceURL=webpack://SWG/./src/js/swg.js?");

/***/ }),

/***/ "./src/css/swg.css":
/*!*************************!*\
  !*** ./src/css/swg.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://SWG/./src/css/swg.css?");

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/js/swg.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/css/swg.css");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});