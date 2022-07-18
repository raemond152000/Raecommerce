const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title:{type: String, required:true, unique:true}, // unique means no username should be the same in the db
        desc:{type:String, required:true},
        img:{type:String, required: true},
        categories:{type:Array}, //more than one category
        size:{type:Array},
        color:{type:Array},
        price:{type:Number, required: true}, 
        inStock:{type:Boolean, default: true},
                
    },
    {timestamps:true} //logged time schema created
)

module.exports = mongoose.model("Product", ProductSchema)