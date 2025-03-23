const Listings = require("./models/listing");

module.exports.isLoggedIn = (req,res,next) => {

if(!req.isAuthenticated()){
  
    req.flash("error","You must be login to create listing");
    return res.redirect("/login")
}
next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listings.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}