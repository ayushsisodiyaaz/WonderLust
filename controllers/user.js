const User = require("../models/user.js");

module.exports.renderSignForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = (async(req,res)=>{
try{
    let{username,email,password} =req.body;
    const newUser = new User({email,username});
    const registerUser =await User.register(newUser,password);
    console.log(registerUser);
    // login direct
   req.login(registerUser, (err)=>{
    if(err){
        next(err);
    }
   })
    req.flash("success","welcome to Wonderlust");
    res.redirect("/listings");
}catch(e){
    req.flash("error",e.message)
    res.redirect("/signup");
}   
});

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","welcome back to Wonderlust");
     res.redirect("/listings");
};

module.exports.loggedout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })

}
