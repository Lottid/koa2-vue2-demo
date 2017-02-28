
/**
 * Module dependencies.
 */

var views = require('co-views');
var path = require('path');
var config = require("../base.js");
// setup views mapping .html
// to the swig template engine

module.exports = views(path.join(config.rootPath, '/views'), {
  map: { html: 'swig' }
});
