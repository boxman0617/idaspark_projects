exports.getParents = function(next) {

  Categories.findByParent_id(0, function(err, categories) {
    if(err) {
      return console.log(err);
    }

    next(categories);
  });
};
