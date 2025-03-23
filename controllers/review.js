 const Review = require("../models/review.js");
 const Listings = require("../models/listing.js");

 module.exports.createReview = (async(req,res)=>{
     const{id} = req.params; 
     const listing = await Listings.findById(id);
     const newReview = new Review(req.body.review);
 
     listing.reviews.push(newReview);
 
     await newReview.save();
     await listing.save();
 
     req.flash("success","Review created!")
     res.redirect(`/listings/${id}`)
     
    });

module.exports.deleteReview = (async (req,res) => {
        const{id,reviewId} = req.params;
    await Listings.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!")
    res.redirect(`/listings/${id}`)
   })    