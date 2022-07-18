const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);


router.post("/payment", (req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,       //when making a payment stripe would return a token key
        amount:req.body.amount,
        currency:"usd"
    }),(stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    }
})

module.exports = router;