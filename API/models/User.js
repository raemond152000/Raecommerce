const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username:{type: String, required:true, unique:true}, // unique means no username should be the same in the db
        email:{type:String, required:true, unique:true},
        password:{type:String, required: true},
        isAdmin:{
            type:Boolean,
            default: false,            
        },
        
    },
    {timestamps:true} //logged time schema created
)

module.exports = mongoose.model("User", UserSchema)