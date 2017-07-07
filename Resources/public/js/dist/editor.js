/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + ({"0":"bootstrap-vue-editor"}[chunkId]||chunkId) + ".async.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
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
/******/ 	__webpack_require__.p = "/bundles/idciextraform/js/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export filterObject */
/* unused harmony export sortObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return generateUniqueId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return hashCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createBootstrapModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return colorEmptyRequiredInputs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createAttributeMapObject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);



/**
 * Remove all lines breaks and "extra" spaces, when there are more than 1 spaces in a row
 *
 * @returns {string}
 */
String.prototype.removeLineBreaksAnsExtraSpaces = function () {
  return this
    // Replace line breaks by spaces
    .replace(/\r?\n|\r/g, ' ')
    // Replace 2 or more spaces by only one
    .replace(/ {2,}/g, ' ');
};

/**
 * Create and return an object which contains all elements for which the callback returns true
 *
 * @param {object} object
 * @param {function} callable
 *
 * @return {object}
 */
function filterObject (object, callable) {
  var filteredObject = {};

  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      if (callable(object[property])) {
        filteredObject[property] = object[property];
      }
    }
  }

  return filteredObject;
}

/**
 * Sort an object by keys
 *
 *
 * @param {object} object
 * @param {[]} [firstKeys] : if the firstKeys param is set, set them at the beginning of the object
 * @param {boolean} [sortAll] : if false, only sort by first keys
 *
 * @returns {{}}
 */
function sortObject (object, firstKeys, sortAll) {
  var ordered = {};

  if ('undefined' === typeof sortAll) {
    sortAll = true;
  }

  if ('undefined' === typeof firstKeys) {
    firstKeys = [];
  }

  for (var i = 0, len = firstKeys.length; i < len; i++) {
    var k = firstKeys[i];

    ordered[k] = object[k];
  }

  if (sortAll) {
    Object
      .keys(object)
      .sort()
      .forEach(function (key) {
        if (-1 === firstKeys.indexOf(key)) {
          ordered[key] = object[key];
        }
      });
  } else {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        if (-1 === firstKeys.indexOf(key)) {
          ordered[key] = object[key];
        }
      }
    }
  }

  return ordered;
}

/**
 * Generate a unique id for the fields default names
 *
 * @returns {string}
 */
function generateUniqueId () {
  return Math
    .random()
    .toString(36)
    .substr(2, 9)
    ;
}

/**
 * Hash a string to a 32 bit integer
 *
 * @param {string} string
 * @returns {string}
 */
function hashCode (string) {
  var hash = 0;

  if (0 === string.length) {
    return hash.toString();
  }

  for (var i = 0; i < string.length; i++) {
    var chr = string.charCodeAt(i);

    hash = (hash << 5) - hash + chr;
    // Convert to 32bit integer
    hash |= 0;
  }

  return hash.toString();
}

/**
 * Create a javascript object to get the map all the attribute of the given element, as well as the value
 *
 * @param element
 *
 * @return {object}
 */
function createAttributeMapObject (element) {
  var attributes = element.attributes;
  var object = {};

  for (var attribute, i = 0, length = attributes.length; i < length; i++) {
    attribute = attributes[i];
    object[attribute.nodeName] = attribute.nodeValue;
  }

  object.value = element.value;

  return object;
}

/**
 * Create the html for a bootstrap modal
 *
 * @param id
 * @param name
 * @param extraClasses
 * @param title
 * @param body
 * @param [modalFooter]
 *
 * @returns {string}
 */
function createBootstrapModal (id, name, extraClasses, title, body, modalFooter) {
  var footer = modalFooter ? modalFooter : '';

  return '' +
    '<div id="' + name + '-' + id + '" class="editor-modal modal fade ' + extraClasses + ' ' + name + '">' +
      '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
          '<div class="modal-header">' +
            '<button type="button" class="close" aria-label="Close">' +
              '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '<h4 class="modal-title">' + title + '</h4>' +
          '</div>' +
          '<div class="modal-body">' +
            body +
          '</div>' +
          '<div class="modal-footer">' +
            footer +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
    ;
}

/**
 * Add some colors on empty required inputs
 *
 * @param elementId - the if of the element wrapping the inputs
 * @param parentClass - the class of the parent of the required input, in case we don't want to select every inputs
 */
function colorEmptyRequiredInputs (elementId, parentClass) {
  var inputSelector = '.' + parentClass + ' input[required="required"]';

  /**
   * Color in red when empty, in white when filled
   *
   * @param $input
   */
  function color($input) {
    if ($input.val()) {
      $input.css({
        'border-color': '#cccccc',
        'background-color': '#ffffff'
      });
    } else {
      $input.css({
        'border-color': '#c9302c',
        'background-color': '#f3d9d9'
      });
    }
  }

  // Color on change when the input is empty
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a(document).on('change', inputSelector, function () {
    color(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a(this));
  });

  // Color when new children are added to the dom
  // Sometimes they are added but already filled by vuejs, sometimes they are empty
  var target = document.getElementById(elementId);
  var config = {
    childList: true,
    characterData: true,
    subtree: true
  };

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var $inputs = [];

      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default.a(mutation.target).hasClass(parentClass)) {
        $inputs = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a(mutation.target).find('input[required="required"]');
      } else {
        $inputs = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a(mutation.target).find(inputSelector);
      }

      $inputs.each(function () {
        color(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a(this));
      });
    });
  });

  observer.observe(target, config);
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__load_editor_js__ = __webpack_require__(3);


window.addEventListener('load', function () {
  __WEBPACK_IMPORTED_MODULE_0__load_editor_js__["a" /* default */]();
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadExtraFormEditors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);




function loadExtraFormEditors () {

  /**
   * Create the editor for each textareas with the class extra form editor
   */
  __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('textarea.extra-form-editor').each(function (index) {

    var textarea = this;

    __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 4)).then(function (app) {
      var editorComponentId = 'editorComponent' + index;

      // Do not load the editor if it was already loaded
      if (document.getElementById(editorComponentId)) {
        return;
      }

      // Retrieve the textarea attributes and value
      var formProperties = __WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* createAttributeMapObject */](textarea);
      var availableModes = formProperties['data-available-modes'].split('__');
      var configuration = window[formProperties['data-configuration-variable']];
      var rawModal = createRawModal(index);
      var rawModalButton = '<button class="trigger-raw-mode-modal-' + index + '">Raw mode</button>';
      var simpleModal = '';
      var simpleModalButton = '';
      var advancedModal = '';
      var overviewModal = '';
      var advancedModalButton = '';

      configuration.componentId = editorComponentId;

      if (availableModes.indexOf('simple') > -1) {
        simpleModal = createSimpleModal(index);
        simpleModalButton =
          '<button class="trigger-simple-visual-mode-modal-' + index + '">' +
            'Simple visual mode' +
          '</button>'
        ;
      }

      if (availableModes.indexOf('advanced') > -1) {
        advancedModal = createAdvancedModal(index);
        overviewModal = createOverviewModal(index);
        advancedModalButton =
          '<button class="trigger-advanced-visual-mode-modal-' + index + '">' +
            'Advanced visual mode' +
          '</button>'
        ;
      }

      /**
       * Insert buttons in place of the textarea
       */
      __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(textarea).after(
        '<div class="modal-buttons">' +
          simpleModalButton + ' ' + advancedModalButton + ' ' + rawModalButton +
        '</div>'
      );

      // Insert the modals editor at the end of the body
      var $body = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('body');

      $body.append(
        '<div id="' + editorComponentId + '">' + rawModal + simpleModal + advancedModal + overviewModal + '</div>'
      );

      // Hide the initial textarea
      textarea.style.display = 'none';

      // Display / Hide the modals
      var modalTypes = [
        'simple-visual-mode-modal',
        'advanced-visual-mode-modal',
        'raw-mode-modal',
        'overview-modal'
      ];

      modalTypes.forEach(function (modalType) {
        showModalOnClick(modalType, index);
      });

      modalTypes.forEach(function (modalType) {
        hideModalOnClick(modalType);
      });

      getFormOverviewOnClick(configuration.extra_form_editor_overview_url, index);
      resetFormOverviewModalOnClose(index);
      submitFormOverviewOnClick(index);
      showOrHideSimpleEditorOptions();

      app.triggerVueEditor('#' + editorComponentId, configuration, formProperties);
      __WEBPACK_IMPORTED_MODULE_0__utils_utils__["a" /* colorEmptyRequiredInputs */](editorComponentId, 'extra-form-inputs-required');

      /**
       * Show or hide options on the simple editor
       */
      function showOrHideSimpleEditorOptions() {
        var $simpleEditor = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('.editor-simple');

        $simpleEditor.on('click', '.field-options > label', function (event) {
          // Prevent the click for being triggered multiple times
          event.stopImmediatePropagation();
          __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(this)
            .parent()
            .toggleClass('show')
          ;
        });

        $simpleEditor.on('click', '.field-constraint-options > label', function (event) {
          event.stopImmediatePropagation();
          __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(this)
            .parent()
            .toggleClass('show')
          ;
        });
      }

      /**
       * Show modal on click on trigger button
       *
       * @param modalType
       * @param modalIdentifier
       */
      function showModalOnClick(modalType, modalIdentifier) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(document).on('click', 'button.trigger-' + modalType + '-' + modalIdentifier, function (event) {
          event.preventDefault();
          var $modal = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('#' + modalType + '-' + modalIdentifier);
          if ('overview-modal' !== modalType) {
            $modal = $modal.first();
          }

          $modal.modal('show');
        });
      }

      /**
       * Hide modal on click on close button
       *
       * @param modalType
       */
      function hideModalOnClick(modalType) {
        var classes =
          // On the generate field button from the editor-raw
          '.' + modalType + ' .modal-body button.close-modal, ' +

            // On the close button on the left bottom of the modal
          '.' + modalType + ' .modal-footer > button.close-modal, ' +

            // On the upper right cross of the modal
          '.' + modalType + ' .modal-header > button.close';

        __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(document).on('click', classes, function (event) {
          event.preventDefault();
          __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(this)
            .closest('.modal')
            .modal('hide')
          ;
        });
      }

      /**
       * Get the form overview on click on the trigger button
       *
       * @param url
       */
      function getFormOverviewOnClick(url) {

        /**
         * Get the form overview
         *
         * @param callback
         */
        function getFormOverview(callback) {

          var raw =
            __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('#raw-mode-modal-' + index + ' textarea')
              .first()
              .val();

          var request = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.ajax({
            url: url,
            method: 'POST',
            data: {
              overview: {
                configuration: raw
              }
            }
          });

          request.done(function (response) {
            return callback({
              success: true,
              data: response
            });
          });

          request.fail(function (response) {
            return callback({
              success: false,
              data: response
            });
          });
        }

        __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(document).on('click', 'button.trigger-overview-modal-' + index, function () {
          setTimeout(function () {
            getFormOverview(function (content) {
              if (content.success) {
                __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('#overview-modal-' + index + ' .modal-body').replaceWith(
                  '<div class="modal-body">' + content.data + '</div>'
                );
              } else {
                __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('#overview-modal-' + index + ' .modal-body').replaceWith(
                  '<div class="modal-body">' +
                  '<div>' + content.data.responseText + '</div>' +
                  '</div>'
                );
              }
            });
          }, 800);
        });
      }

      /**
       * Submit the form overview on click
       */
      function submitFormOverviewOnClick() {

        __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(document).on('click', '#overview-modal-' + index + ' form button[type=\'submit\']', function (event) {
          event.preventDefault();
          resetFormOverviewModal(index);
          var $form = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(this).closest('form');

          setTimeout(function () {

            submitForm($form, function (content) {
              if (content.success) {
                if (content.data) {
                  __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('#overview-modal-' + index + ' .modal-body').replaceWith(
                    '<div class="modal-body">' + content.data + '</div>'
                  );
                }
              } else {
                __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('#overview-modal-' + index + ' .modal-body').replaceWith(
                  '<div class="modal-body">' +
                  '<div>' + content.data.responseText + '</div>' +
                  '</div>'
                );
              }
            });
          }, 800);
        });
      }

      /**
       * Reset the content of the overview modal when it's closed
       */
      function resetFormOverviewModalOnClose() {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default.a(document).on('hidden.bs.modal', '#overview-modal-' + index, function () {
          resetFormOverviewModal(index);
        });
      }

      /**
       * Reset the content of the overview modal
       */
      function resetFormOverviewModal() {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default.a('#overview-modal-' + index + ' .modal-body').replaceWith(
          '<div class="modal-body">' +
          '<div style="text-align: center;"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>' +
          '</div>'
        );
      }

      /**
       * Submit a form in ajax
       *
       * @param $form
       * @param callback
       */
      function submitForm($form, callback) {
        var request = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.ajax({
          url: $form.attr('action'),
          method: $form.attr('method'),
          data: $form.serialize()
        });

        request.done(function (response) {
          return callback({
            success: true,
            data: response
          });
        });

        request.fail(function (response) {
          return callback({
            success: false,
            data: response
          });
        });
      }

      /**
       * Create the raw modal
       *
       * @returns {string}
       */
      function createRawModal() {
        return __WEBPACK_IMPORTED_MODULE_0__utils_utils__["c" /* createBootstrapModal */](
          index,
          'raw-mode-modal',
          'modal-fullscreen',
          'Editor in raw mode',
          '<form-editor-raw :fields="fields" @generated="updateFields"></form-editor-raw><br>'
        );
      }

      /**
       * Create the simple modal
       *
       * @returns {string}
       */
      function createSimpleModal() {
        return __WEBPACK_IMPORTED_MODULE_0__utils_utils__["c" /* createBootstrapModal */](
          index,
          'simple-visual-mode-modal',
          'modal-fullscreen',
          'Simple visual mode',
          '<form-editor-simple :fields="fields"></form-editor-simple>',
          '<em>All your changes are automatically saved</em>'
        );
      }

      /**
       * Create the advanced modal
       *
       * @returns {string}
       */
      function createAdvancedModal() {
        return __WEBPACK_IMPORTED_MODULE_0__utils_utils__["c" /* createBootstrapModal */](
          index,
          'advanced-visual-mode-modal',
          'modal-fullscreen',
          'Advanced visual mode',
          '<form-editor-advanced :fields="fields"></form-editor-advanced>',
          '<button class="btn btn-primary trigger-overview-modal-' + index + '">' +
          'Display the overview <i class="fa fa-eye"></i>' +
          '</button>' +
          '<em>All your changes are automatically saved</em>'
        );
      }

      /**
       * Create the overview modal
       *
       * @returns {string}
       */
      function createOverviewModal() {
        return __WEBPACK_IMPORTED_MODULE_0__utils_utils__["c" /* createBootstrapModal */](
          index,
          'overview-modal',
          'extra-form-inputs-required',
          'Overview',
          '<div style="text-align: center;"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>'
        );
      }

    });

  });

};


/***/ })
/******/ ]);