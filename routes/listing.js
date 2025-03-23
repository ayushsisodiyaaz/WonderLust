const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressErr = require("../utils/expresserr.js");
const {isLoggedIn,isOwner} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudstorage.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js")
const validateListing = (req,res,next) => {
    const {err} = listingSchema.validate(req.body);
    if(err){
        const errMsg = err.details.map((el) => el.message).join(",");
        throw new ExpressErr(400,errMsg);
    }
    next();
};

router
.route("/")
// Index route
.get(wrapAsync (listingController.index))
//CREATE route
.post(validateListing,isLoggedIn,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing));



//new route
router.get("/new",isLoggedIn,wrapAsync(listingController.newForm));

router.route("/:id")
//Show route
.get(wrapAsync(listingController.showListing))
//UPDATE route S
.put(isLoggedIn,
validateListing,
wrapAsync(listingController.updateListing))
//DELETE ROUTE
.delete(isLoggedIn,
wrapAsync(listingController.deleteListing));

   
//EDIT Route
router.get("/:id/edit",isLoggedIn,
wrapAsync(listingController.editListing));
   

module.exports= router;