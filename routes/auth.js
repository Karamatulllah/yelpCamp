var express = require("express");
var router  = express.Router();
var passport = require("passport");
var user     = require("../models/user")



router.get("/",function(req, res){
  res.redirect("/campgrounds");
});
// show register form
router.get("/register", function(req, res){
  res.render("register");
});

// Register Logic
router.post("/register", function(req, res){
  user.register(new user({username: req.body.username}),req.body.password, function(err, user){
    if (err) {
      return res.render("register");
    }
    else {
      passport.authenticate("local")(req, res ,function(){
        res.redirect("/campgrounds");
      });

      }

  });
});

// Login route

router.get("/login", function(req, res){
res.render("login");
});
// login logic route
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}) ,function(req, res){});


// Logout

router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/campgrounds");
});


module.exports  = router ;
