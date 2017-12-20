var   bodyParser        = require("body-parser"),
      methodOverride    = require("method-override"),
      mongoose          = require("mongoose"),
      passport          = require("passport"),
      passportLocal     = require("passport-local"),
      express           = require("express"),
      app               = express(),
      campgrounds       = require("./models/campgrounds"),
      user              = require("./models/user"),
      comments     = require("./models/comment");

var campgroundRoutes    = require("./routes/campground"),
    authRoutes          = require("./routes/auth"),
    commentRoutes       = require("./routes/comment");

    mongoose.connect("mongodb://localhost/yelp_camp_web");
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride("_method"));

    // Passport Configuration

    app.use(require("express-session")({
      secret: "campground web project excercise",
      resave: false ,
      saveuninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    // for login authenticaton
    passport.use(new passportLocal(user.authenticate()));


    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());
    app.use(function(req, res, next){
      res.locals.currentuser = req.user;
      next();
    });



function isLoggedIn(req, res, next){
  if (user.authenticate()) {
    return next();
    }
    res.redirect("/login");
}

app.use("/campgrounds",campgroundRoutes);
app.use(authRoutes);
app.use("/campgrounds/:id/comment",commentRoutes);



app.listen(3000 , function(){
      console.log("yelp camp started");
    });
