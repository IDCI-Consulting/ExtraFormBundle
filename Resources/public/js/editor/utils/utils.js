/* exported
    filterObject,
    sortObject,
    generateUniqueId,
    hashCode,
    createBootstrapModal,
    colorEmptyRequiredInputs,
    createAttributeMapObject
*/

/* global $ */

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
  function color ($input) {
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
  $(document).on('change', inputSelector, function () {
    color($(this));
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

      if ($(mutation.target).hasClass(parentClass)) {
        $inputs = $(mutation.target).find('input[required="required"]');
      } else {
        $inputs = $(mutation.target).find(inputSelector);
      }

      $inputs.each(function () {
        color($(this));
      });
    });
  });

  observer.observe(target, config);
}
