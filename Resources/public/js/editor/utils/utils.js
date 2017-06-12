/**
 * Remove all lines breaks and "extra" spaces, when there are more than 1 spaces in a row
 *
 * @returns {string}
 */
String.prototype.removeLineBreaksAnsExtraSpaces = function () {
  return this
    .replace(/\r?\n|\r/g, ' ') // replace line breaks by spaces
    .replace(/ {2,}/g, ' ');   // replace 2 or more spaces by only one
};

/**
 * Create and return an object which contains all elements for which the callback returns true
 *
 * @param object
 * @param callback
 *
 * @return object
 */
function filterObject(object, callback) {
  var filteredObject = {};

  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      if (callback(object[property])) {
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
 * @param object
 * @param {[]} [firstKeys] : if the firstKeys param is set, set them at the beginning of the object
 * @param {boolean} [sortAll] : if false, only sort by first keys
 *
 * @returns {{}}
 */
function sortObject(object, firstKeys, sortAll) {
  const ordered = {};

  if (typeof sortAll === 'undefined') {
    sortAll = true;
  }

  if (typeof firstKeys === 'undefined') {
    firstKeys = [];
  }

  for (var i = 0, len = firstKeys.length;  i < len; i++) {
    var key = firstKeys[i];
    ordered[key] = object[key];
  }

  if (sortAll) {
    Object.keys(object).sort().forEach(function(key) {
      if (firstKeys.indexOf(key) === -1) {
        ordered[key] = object[key];
      }
    });
  } else {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        if (firstKeys.indexOf(key) === -1) {
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
 * @returns string
 */
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Get the last key of an object
 *
 * @param object
 * @returns string
 */
function getLastKey(object) {
  var keys = Object.keys(object);
  var lastElementPosition = keys.length - 1;

  return keys[lastElementPosition];
}

/**
 * Hash a string to a 32 bit integer
 *
 * @param {string} string
 * @returns {string}
 */
function hashCode(string) {
  var hash = 0;
  var chr;

  if (string.length === 0) {
    return hash.toString();
  }

  for (var i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash.toString();
}

/**
 * Create a javascript object to get the map all the attribute of the given element, as well as the value
 *
 * @param element
 *
 * @return object
 */
function createAttributeMapObject(element) {
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
  var config = { childList: true, characterData: true, subtree: true};

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var $inputs = [];

      if ($(mutation.target).hasClass(parentClass)) {
        $inputs = $(mutation.target).find('input[required="required"]');
      } else {
        $inputs = $(mutation.target).find(inputSelector);
      }

      $inputs.each(function() {
        color($(this));
      });
    });
  });

  observer.observe(target, config);
}
