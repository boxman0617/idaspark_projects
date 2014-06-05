/**
 * HomeController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  'index': function(req, res) {
  	res.view();
  },

  'fill': function(req, res) {
  	var links = {
	  	'Home': [
	      'Kitchen',
	      'Bathroom',
	      'Bedroom'
	    ],
	    'Tech': [
	      'Computers',
	      'Developing',
	      'Tools',
	      'Gadgets',
	    ],
	    'Food': [],
	    'Business': [],
	    'Office': [],
	    'Games': [],
	    'More': []
  	};

  	for(var parent in links) {
  		console.log()
  		Categories.create({
  			'name': parent,
  			'parent_id': 0
  		}).done(function(err, category) {
  			for(var i in links[category.name]) {
  				console.log(i);
  				Categories.create({
  					'name': links[category.name][i],
  					'parent_id': category.id
  				}).done(function(err, child) {
  					if(err) {
  						res.json({'msg': 'ERROR', 'error': err}, 500);
  					}
  				});
  			}
  		});
  	}
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to HomeController)
   */
  _config: {}

  
};
