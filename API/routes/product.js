const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
});

// //UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProuct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body    //set info to the user, take everything inside req the body and set again
        }, { new: true }) // to send updated user
        res.status(200).json(updatedProuct);
    } catch (err) {
        res.json(500).json(err);
    }
})

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({ product });

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
    const qNew = req.query.new;         //query product that are new that are limited to certain amount of number
    const qCategory = req.query.category;  //query prdoucts through their categories
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1)
        } else if (qCategory) {
            products = await Product.find({   //sets condition if category query is inside this query fetch or return products
                categories: {
                    $in: [qCategory],
                },
            });
        } else {    //if theres no query all products would be the products inside the db
            products = await Product.find();
        }

        res.status(200).json(products);

    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router  //to export this router