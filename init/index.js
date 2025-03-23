const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner:"67da5dd9c5bb76b5ec4cb5de",
    }));
    await Listing.insertMany(initData.data);
    console.log("data is init");
    
}
initDB();