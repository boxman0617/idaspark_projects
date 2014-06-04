/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  console.log('Policy');
  var async = require('async');

  var cats = {};
  CategoryServices.getParents(function(categories) {
    async.each(categories, function(item, callback) {
      cats[item.name] = [];
      item.getChildren(function(children) {
        cats[item.name] = children;
        callback();
      });
    }, function(err) {
      if(err) {
        return next();
      }

      res.locals.categories = cats;
      console.log(res.locals.categories);
      return next();
    });
  });
};
