require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
const session = require('express-session');
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const localStrategy = require("passport-local");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAP_BOX_TOKEN; 
const dbUrl = process.env.MONGODB_URL; 
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const multer = require("multer");
const { storage } = require("./cloudinary/cloudinary");
const upload = multer({ storage });
const bodyParser = require("body-parser");
const crypto = require("crypto");



const expressError = require("./utils/expressError");
const service = require("./models/services");
//const serviceWorker = require('./models/people');
const User = require('./models/user');
//const People = require("./models/people");
const AddService = require("./models/addService");

const app = express();

// app.use(connectLiveReload());
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method")); 

const sessionConfig = {
  name: "tappu",
  secret: "thisShouldBeSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //  secure: true,
     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
     maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionConfig));
app.use(methodOverride("_method"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const db = mongoose.connection;

mongoose.connect(dbUrl);

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Database connected");
});



app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.originalUrl = req.originalUrl;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You need to login first");
    res.redirect("/login");
  }
  next();
};

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/services", async (req, res) => {
  const indServices = await AddService.find({});
  const services = await service.find({});
  res.render("pages/services", {
    services: services,
    indServices: indServices,
  });
});

app.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const serviceWorkers = await AddService.find({ service: id }).populate('author');
  console.log(serviceWorkers);
  res.render("pages/serviceIndividual", { serviceWorkers: serviceWorkers , id : id});
});

app.get("/services_register", isLoggedIn ,async (req, res) => {
  res.render("pages/new");
});

app.post("/services_register", isLoggedIn, upload.array('image'), async (req, res) => {
   
   
  const { service , text ,  charges} = req.body;
  const {path} = req.files[0];
  const image = path;
  const author = req.user._id;
  const location = req.user.location;
  const geoData = await geocoder
    .forwardGeocode({
      query: req.user.location,
      limit: 1,
    })
    .send();
  const new_service = await new AddService({service , text , image , charges , author , location});
  new_service.geometry = geoData.body.features[0].geometry;
  await new_service.save();
  console.log(new_service);
  req.flash("success", " Successfully registered a service");
  res.redirect('/services');
});

app.get("/register", async(req, res) =>{
  res.render('users/register')
})

app.post("/register", async(req, res) =>{
 try {
  
   const geoData = await geocoder
     .forwardGeocode({
       query: req.body.location,
       limit: 1,
     })
     .send(); 

  const {name , mobile , username , service , password , location} = req.body;
  const user = await new User ({
    name , username , mobile , location
  })
   user.geometry = geoData.body.features[0].geometry
  const registeredUser = await User.register(user,password);
  req.login(registeredUser, (err) => {
    if (err) return next(err);
    req.flash("success", "Welcome to Helping Hands!");
    res.redirect("/services");
  });
 } catch(e) {
    req.flash('error', e.message)
    res.redirect('/register')
 }
})

app.get('/login', (req,res) => {
    res.render('users/login')
})

app.post(
  "/login",  passport.authenticate("local", {failureFlash: true, failureRedirect: "/login",}),
  (req, res) => {
    req.flash("success", "Logged in successfully!!");
    res.redirect('/services');
  }
);

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.send(err);
    }
    req.flash("success", "Successfully, Logged Out!");
    res.redirect("/services");
  });
});

  app.get("/key",async(req,res)=>{
    

    // Generate a random 16-byte IV key
    const ivKey = crypto.randomBytes(16).toString("base64");

    console.log(`IV_KEY=${ivKey}`);
  })

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const serviceWorker = await AddService.findById(id).populate('author');
  res.render('pages/profile',{ service : serviceWorker });

}); 

app.put("/profile/:id", isLoggedIn ,async (req, res) => {
  const { service , text , charges  } = req.body;
  console.log(req.body)
  console.log('cvbnm')
  const services = await AddService.findByIdAndUpdate(req.params.id, {
    service: service,
    text: text,
    charges: charges,
  });
  console.log(services);
  await services.save();
  res.redirect('/services');
});

app.delete('/profile/:id', isLoggedIn , async(req,res) => {
  const service = await AddService.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted a campground!");
  console.log(service);
  res.redirect('/services')
})

app.get("/profile/:id/edit", isLoggedIn, async (req, res) => {
  const service = await AddService.findById(req.params.id);
  res.render("pages/edit", { service: service });
});

app.all("*", (req, res, next) => {
  next(new expressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { error: err });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});