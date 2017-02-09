/**
 * Create and return an object which contains all elements for which the callback returns true
 */
function filterObject (object, callback) {
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
 * Get the font awesome class for a given keyword
 *
 * @param keyword
 */
function getFontAwsomeIconClass(keyword) {
  var iconKeywordMap = {
    birthday: 'birthday-cake',
    captcha: 'unlock-alt',
    checkbox: 'check-square',
    choice: 'circle-o',
    country: 'globe',
    date: 'calendar-o',
    datetime: 'calendar',
    email: 'envelope',
    extra_form_builder: 'cogs',
    extra_form_collection: 'list',
    extra_form_json_textarea: 'jsfiddle',
    extra_form_range: 'arrows-v',
    form: 'file',
    extra_form_html: 'code',
    extra_form_iban: 'credit-card',
    integer: 'sort-numeric-asc',
    money: 'money',
    number: 'sort-numeric-asc',
    password: 'key',
    percent: 'percent',
    repeated: 'repeat',
    text: 'text-height',
    textarea: 'comments-o',
    time: 'clock-o',
    url: 'location-arrow'
  };

  return 'fa-icon fa fa-' + iconKeywordMap[keyword];
}

/**
 * Create a javascript object to get the map all the attribute of the given element
 *
 */
function createAttributeMapObject(element) {
  var attributes = element.attributes, object = {};
  for (var attribute, i = 0, length = attributes.length; i < length; i++) {
    attribute = attributes[i];
    object[attribute.nodeName] = attribute.nodeValue;
  }

  return object;
}