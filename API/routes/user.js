const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();
//test scripts
/* router.get("/usertest", (req,res)=>{
    res.send("user test is successfull")
})

router.post("/userposttest", (req,res)=>{
    const username = req.body.username
    console.log(username);
    res.send("your username is : " + username);
}) */

//UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body    //set info to the user, take everything inside req the body and set again
        }, { new: true }) // to send updated user
        res.status(200).json(updatedUser);
    } catch (err) {
        res.json(500).json(err);
    }
})

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json({others, });

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL USER

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5) // -1 means descending
            : await User.find()  //condition: if theres a query if not return all users
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER STATS
//returns total number of users per month
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear - 1)); //only gets the date until last year

    try {
        //group items by using monggo db aggregate
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },   //match condition createdAt date property, less than today and greater than last year  
            {
                //to take month numbers
                $project: {
                    month: { $month: "$createdAt" },   //created variable month and we say take the month number inside the createdAt add date in monggoDB
                },
            },
            {   //returns month and total users
                $group: {
                    _id: "$month",              
                    total:{$sum: 1},        //sums up every registered user created the same on this month
                }
            }
        ])
        res.status(200).json(data)   //send the data 
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router  //to export this router