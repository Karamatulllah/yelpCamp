var express = require("express");
var router  = express.Router();
var campgrounds = require("../models/campgrounds");


// index Routes

router.get("/", function(req, res){
  campgrounds.find({}, function(err, allcampgrounds){
    if (err) {
      console.log(err);
    }
    else {
      res.render("home", {campground: allcampgrounds});
    }
  });

});
// campground form route
router.get("/new", function(req, res){
  res.render("newcampground");
});

//add campground functionality route
router.post("/" , function(req, res){
campgrounds.create(req.body.campground);
res.redirect("/campgrounds");
});

// show individual campgrounds Routes
router.get("/:id", function(req, res){

campgrounds.findById(req.params.id).populate("comments").exec( function(err, foundcampground){
if (err) {
  res.redirect("/campgrounds");
}
else {
  console.log(foundcampground);
res.render("show",{campground: foundcampground});
}
});
});

// update campground route

// edit form route
router.get("/:id/edit" , function(req, res){
campgrounds.findById(req.params.id,function(err, updatecampground){
if (err) {
  res.redirect("/campgrounds");
}
else {
  res.render("updatecampground",{campgrounds: updatecampground});

}
});
});

// Update route

router.put("/:id",function(req, res){
campgrounds.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updatedcampground){
if (err) {
res.redirect("/campgrounds");
}
else {
res.redirect("/campgrounds/"+req.params.id);
}

});

});

// Delete route
router.delete("/:id",function(req, res){
campgrounds.findByIdAndRemove(req.params.id, function(err){
if (err) {
res.redirect("/campgrounds");
}
else {
  res.redirect("/campgrounds");
}
});

});


module.exports  = router;
