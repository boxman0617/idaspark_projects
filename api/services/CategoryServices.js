exports.getCategories = function() {
  var categories = {};
  var returnNow = function() {
    return
  };

  Categories.findByParentId(0, function(err, category) {
    category.getChildren(function(children) {
      for(var i in children) {
        if(categories.hasOwnProperty(category.name))
        categories[category.name].push(children[i].name);
      }


    });
  });
};

exports.getParents = function() {
  Categories.findByParentId(0, function(err, category) {

  });
};
