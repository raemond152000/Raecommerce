const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
});

// //UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body    //set info to the cart, take everything inside req the body and set again
        }, { new: true }) // to send updated cart
        res.status(200).json(updatedCart);
    } catch (err) {
        res.json(500).json(err);
    }
})

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USERT CART

router.get("/find/:userID", async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId})  //we use findOne because every user only use one cart
        res.status(200).json({ cart });

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL 

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router  //to export this router