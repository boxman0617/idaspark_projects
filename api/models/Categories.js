/**
 * Categories
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	'name': 'string',
    'parent_id': 'integer',

    'getChildren': function(callback) {
      if(this.parent_id === 0) {
        Categories.findByParent_id(this.id).done(function(err, children) {
          callback(children);
        });
      }
    }

  }

};
