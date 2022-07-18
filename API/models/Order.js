const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId:{type: String, required:true}, 
        products:[
            {
                productId:{
                    type: String
                },
                quantity:{
                    type:Number,
                    default:1,
                }
            }
        ],
        amount: {type: Number, required: true},       
        address:{type:Object, required: true}, //cause its gonna get diff information like in line 1,2 : streets, country , take all those address info
        status:{type: String, default: "pending"},
    },
    {timestamps:true} //logged time schema created
)

module.exports = mongoose.model("Order", OrderSchema)