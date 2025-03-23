if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressErr = require("./utils/expresserr.js");
const session = require("express-session");
const cookie = require("express-session/session/cookie.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User =require("./models/user.js");


const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js")
const userRoute = require("./routes/user.js");

const Mongoose_URL = "mongodb://127.0.0.1:27017/wonderlust";


main()
.then(()=> {
    console.log("connected to db");  
})
.catch((err)=>{
    console.log(err);;
    
});
async function main() {
    await mongoose.connect(Mongoose_URL)
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static (path.join(__dirname,"/public")));

app.get("/",(req,res)=> {
res.send("working")
});

const sessionOption ={
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000*60*60*24*3,
        maxAge: 1000*60*60*24*3,
        httpOnly: true
    },
};
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings",listingRoute )
app.use("/listings/:id/reviews",reviewRoute)
app.use("/",userRoute);

app.all("*",(req,res,next)=>{
next(new ExpressErr(404, "page not found!"));
});

app.use((err, req, res, next) =>{
    let {status=500 , message="Smething went from"} = err;
    res.status(status).render("error.ejs",{message});
    
});

app.listen(8080,()=> {
    console.log("listening to the port");
    
});


