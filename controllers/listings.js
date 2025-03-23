const Listings = require("../models/listing.js");

module.exports.index = (async(req,res)=>{
    const allListings = await Listings.find({});
    res.render("listings/index.ejs",{allListings});
});

module.exports.newForm = (async (req,res) => {
    res.render("listings/new.ejs");
});

module.exports.showListing = ( async (req,res) => {
    const{id} = req.params;
    // const id = id.trim();
    const listing = await Listings.findById(id).populate("reviews").populate("owner");
    if(!listing){
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
});

module.exports.createListing = (async(req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listings(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    await newListing.save();
    req.flash("success","New listing created!")
    res.redirect("/listings");
   });

 module.exports.editListing = ( async(req, res) => {
       const{id} = req.params; 
      const ids = id.trim(); 
      const listing = await Listings.findById(ids);
      if(!listing){
       req.flash("error","Listing does not exist");
       res.redirect("/listings");
   }
       res.render("listings/edit.ejs",{listing});
      });

module.exports.updateListing =  (async (req,res) => {
       const{id} = req.params;
       const ids = id.trim();
       await Listings.findByIdAndUpdate(ids,{...req.body.listing});
       req.flash("success","Listing updated!")
       res.redirect("/listings");
      });

module.exports.deleteListing = (async (req,res)=>{
       const{id} = req.params;
       const ids = id.trim();
       let deleteList = await Listings.findByIdAndDelete(ids);
       console.log(deleteList);
       req.flash("success","listing deleted!")
       res.redirect("/listings")
      });      
