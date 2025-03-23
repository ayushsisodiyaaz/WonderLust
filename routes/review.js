   const express = require("express");
   const router = express.Router({mergeParams:true});
   const wrapAsync = require("../utils/wrapAsync.js");
   const ExpressErr = require("../utils/expresserr.js");
   const {reviewSchema} = require("../schema.js");

   const reviewController = require("../controllers/review.js")


   const validateReview = (req,res,next) => {
    const {err} = reviewSchema.validate(req.body);
    if(err){
        const errMsg = err.details.map((el) => el.message).join(",");
        throw new ExpressErr(400,errMsg);
    }
    next();
};
   // reviews Post route

   router.post("/",validateReview,wrapAsync(reviewController.createReview));

   //Review delete route

   router.delete("/:reviewId",
    wrapAsync(reviewController.deleteReview));

   module.exports= router;