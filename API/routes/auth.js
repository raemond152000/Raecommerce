const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.
            env.PASS_SEC).toString(),     //see documentation cryptoJS  
    });
    try{       //to catch err if there's problem in server or db
        
        const savedUser = await newUser.save();  //await function makes sure that savedUSer is consoled when newUser is saved first
        //console.log(savedUser);
        //use response instead to send in client side
        res.status(201).json(savedUser)     //201 successfully edit 200 successful
    }catch(err){
        //console.log(err);
        res.status(500).json(err);
    }
})

//LOGIN 

router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json("No Username found!")

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
            );
            const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            //if wrong password
            Originalpassword !==req.body.password && 
            res.status(401).json("Wrong password");

            const accessToken = jwt.sign({
                id:user._id,         //pass property to check if it equals to object or user id
                isAdmin: user.isAdmin,
            },process.env.JWT_SEC,
            {expiresIn:"3d"}
            );

            //hide password data using spread operator, send the user every information but password
            const {password, ...others} = user._doc; //monggodb stores inside ._doc folder
            //else successful
            res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;