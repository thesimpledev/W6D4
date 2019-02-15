/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function DOMNodeCollection(htmlElements) {\n  this.he = htmlElements;\n}\n\nDOMNodeCollection.prototype.html = function(string) {\n  if (string !== undefined) {\n    for (let i = 0; i < this.he.length; i++) {\n      this.he[i].innerHTML = string;\n    }\n  } else {\n    return this.he[0].innerHTML;\n  }\n}\n\nDOMNodeCollection.prototype.empty = function() {\n  this.html(\"\");\n}\n\nDOMNodeCollection.prototype.append = function(elements) {\n  for (let i = 0; i < this.he.length; i++) {\n    if (elements instanceof HTMLElement === true) {\n      this.he[i].innerHTML += elements.outerHTML;\n    } else if (elements instanceof DOMNodeCollection){\n      for(let j=0; j<elements.he.length; j++) {\n        this.he[i].innerHTML += elements.he[j].outerHTML;\n      }\n    } else {\n      this.he[i].innerHTML += elements;\n    }\n  }  \n}\n\nDOMNodeCollection.prototype.addClass = function(className){\n  for(let i = 0; i < this.he.length; i++) {\n    this.he[i].classList.add(className);\n  }\n}\n\nDOMNodeCollection.prototype.removeClass = function (className) {\n  for (let i = 0; i < this.he.length; i++) {\n    this.he[i].classList.remove(className);\n  }\n}\n\nDOMNodeCollection.prototype.attr = function(attr, value) {\n  if(value === undefined){\n    return this.he[0].attributes[attr];\n  } else {\n    for(let i = 0; i < this.he.length; i++) {\n      this.he[i].setAttribute(attr, value);\n    }\n  }\n}\n\nDOMNodeCollection.prototype.children = function() {\n  let childrenNodes = [];\n  for (let i = 0; i < this.he.length; i++) {\n    childrenNodes.push(this.he[i].children);\n  }\n  return new DOMNodeCollection(childrenNodes);\n}\n\nDOMNodeCollection.prototype.parent = function() {\n  let parentNodes = [];\n  for (let i = 0; i < this.he.length; i++) {\n    let currentParent = this.he[i].parentNode;\n    if(parentNodes.includes(currentParent) === false){\n      parentNodes.push(currentParent);\n    }\n  }\n  return new DOMNodeCollection(parentNodes);\n}\n\n\nDOMNodeCollection.prototype.find = function(string) {\n  let foundNodes = [];\n  for (let i = 0; i < this.he.length; i++) {\n    let nodes = this.he[i].querySelectorAll(string);\n    for (let j = 0; j < nodes.length; j++) {\n      if (foundNodes.includes(nodes[j]) === false) {\n        foundNodes.push(nodes[j]);\n      }\n    }\n  }\n  return new DOMNodeCollection(foundNodes);\n}\n\nDOMNodeCollection.prototype.remove = function() {\n  for( let i = 0; i < this.he.length ; i++){\n    this.he[i].outerHTML = \"\";\n  }\n}\n\nDOMNodeCollection.prototype.on = function(event, callback) {\n  for (let i = 0; i < this.he.length; i++) {\n    this.he[i].callback = callback;\n    this.he[i].addEventListener(event, callback);\n  }\n}\n\nDOMNodeCollection.prototype.off = function (event) {\n  for (let i = 0; i < this.he.length; i++) {\n    this.he[i].removeEventListener(event, this.he[i].callback);\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nfunction $l(arg) {\n  if (arg instanceof HTMLElement === true) {\n    return new DOMNodeCollection([arg]);\n  } else if (arg instanceof Function === true) {\n    document.addEventListener(\"DOMContentLoaded\", arg);\n  } else {\n    return new DOMNodeCollection(document.querySelectorAll(arg));\n  }\n}\n\nwindow.$l = $l ;\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });