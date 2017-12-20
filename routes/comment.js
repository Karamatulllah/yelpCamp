var express   =  require("express");
var router    =  express.Router({mergeParams: true});
var campgrounds       = require("../models/campgrounds");
var comments     = require("../models/comment");



router.get("/new", function(req, res){
  campgrounds.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    }else {
  res.render("newcomment",{campground: campground});
    }
  });

});

router.post("/",function(req, res){
campgrounds.findById(req.params.id, function(err, campground){
  if (err) {
    console.log(err);
    res.redirect("/campgrounds");
  }else {
    var newComment = req.body.comment;
    comments.create(newComment, function(err, comment){
      if (err) {
        console.log(err);
      }else {
        // console.log(comment);
        campground.comments = campground.comments.concat(comment);
        campground.save(function(err, campground){
          if (err) {
          console.log(err);
          }else {
            console.log(campground);
            res.redirect("/campgrounds/"+ campground._id);

          }
        });


      }
    });
  }
});
});


module.exports  = router;
