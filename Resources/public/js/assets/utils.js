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
 * Create a javascript object to get the map all the attribute of the given element
 *
 * @param element
 *
 * @return object
 */
function createAttributeMapObject(element) {
  var attributes = element.attributes, object = {};
  for (var attribute, i = 0, length = attributes.length; i < length; i++) {
    attribute = attributes[i];
    object[attribute.nodeName] = attribute.nodeValue;
  }

  return object;
}

/**
 * Submit a form in ajax
 *
 * @param $form
 * @param callback
 */
function submitForm($form, callback) {
  var request = $.ajax({
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