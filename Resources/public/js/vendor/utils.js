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