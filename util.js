// Utility namespace.
/**
 * To strore all utility methods under one variable.
 */
window.util = {};

/**
 * Preferences related utility class.
 * It uses localStorage to store the data.
 * @constructor.
 */
util.Prefs = function() {
  this.data = localStorage;
};

/**
 * To test whether passed key is set or not.
 * @param {string} key Key to be tested.
 * @return {boolean} Returns true if the value is set for the key,
 *     false otherwise.
 */
util.Prefs.prototype.isset = function(key) {
  return this.data[key] !== undefined;
};

/**
 * To  get the value of preference data as integer.
 * @param {string} key The key variable.
 * @return {number} The integer value.
 */
util.Prefs.prototype.getInt = function(key) {
  var value = this.isset(key) ? parseInt(this.data[key], 10) : 0;
  return isNaN(value) ? 0 : value;
};

/**
 * To  get the value of preference data as decimal value.
 * @param {string} key The key variable.
 * @return {number} The float value.
 */
util.Prefs.prototype.getFloat = function(key) {
  var value = this.isset(key) ? parseFloat(this.data[key]) : 0;
  return isNaN(value) ? 0 : value;
};

/**
 * To get the value of preference data as array.
 * @param {string} key The key variable.
 * @param {string} opt_separator Optional separator to split the data.
 * @return {Array} The array of strings.
 */
util.Prefs.prototype.getArray = function(key, opt_separator) {
  opt_separator = opt_separator || '\n';
  var value = this.data[key];
  if (!value) {
    return [];
  }
  return value.split(opt_separator);
};

/**
 * To set the value of preference data as array.
 * @param {string} key The key variable.
 * @param {Array} value The array of strings.
 * @param {string} opt_separator Optional separator to join the data.
 */
util.Prefs.prototype.setArray = function(key, value, opt_separator) {
  opt_separator = opt_separator || '\n';
  if (typeof value == 'object' && value.constructor == Array) {
    this.data[key] = value.join(opt_separator);
  } else {
    throw 'Invalid value passed: ' + value;
  }
};

/**
 * To set the value of preference data.
 * @param {string} key The key variable.
 * @param {string} value The value to set.
 */
util.Prefs.prototype.set = function(key, value) {
  this.data[key] = '' + value;
};

/**
 * To set the value of preference data.
 * @param {Object} defaultObject The default value to initialize.
 */
util.Prefs.prototype.setDefault = function(defaultObject) {
  for (var key in defaultObject) {
    if (!this.isset(key)) {
      var value = defaultObject[key];
      this.data[key] = typeof value != 'Array' ? value : value.join('\n');
    }
  }
};

/**
 * To  get the value of preference data as string.
 * @param {string} key The key variable.
 * @param {string} defaultValue The default value.
 * @return {string} The float value.
 */
util.Prefs.prototype.getString = function(key, defaultValue) {
  return this.isset(key) ? '' + this.data[key] : defaultValue || '';
};

/**
 * To  get the value of preference data.
 * @param {string} key The key.
 * @param {string} defaultValue The default value.
 * @return {string} The value for the passed key.
 */
util.Prefs.prototype.get = function(key, defaultValue) {
  return this.isset(key) ? this.data[key] : defaultValue || '';
};

/**
 * Wrapper function to get locale message for the given message name.
 * @param {string} message The message id.
 * @return {string} The localized message.
 */
util.Prefs.prototype.getMsg = function(message) {
  return chrome.i18n.getMessage(message);
};