const router = require('express').Router();
const User = require("../mongodb/Models/User");
const Product = require("../mongodb/Models/Product");
const Order = require("../mongodb/Models/Order");

const fetchPerson = require("../middlewares");


router.get('/get-users', fetchPerson, async(req,res)=>{
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }

    try {
        const allUsers = await User.find();
        res.status(200).json({success: true, message: "Users fetched successfully", allUsers});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", err: error.message});
    }
})

// Get single user by ID
router.get("/get-user/:id", fetchPerson , async (req, res) => {
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/get-products', fetchPerson, async(req,res)=>{
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }

    try {
        const allProduct = await Product.find();
        res.status(200).json({success: true, message: "Product fetched successfully", allProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", err: error.message});
    }
})

// Get single product by ID
router.get("/get-product/:id",fetchPerson, async (req, res) => {
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }

    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/add-product", fetchPerson, async(req, res)=>{
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }

    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();

        res.status(200).json({success: true, message: "Product added successfully", product});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", error: error.message});
    }
})

router.put("/update-product/:id", fetchPerson, async(req,res)=>{
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }
    const productID = req.params.id;

    try {
        const newProduct = await Product.findByIdAndUpdate(productID, req.body, {new: true});
        res.status(200).json({success: true, message: "Product updated successfully", newProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", err: error.message});
    }
})

router.delete("/delete-product/:id", fetchPerson, async (req,res)=>{
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }
    const productID = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productID);
        res.status(200).json({success: true, message: "Product deleted successfully", deletedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", err: error.message});
    }

})


router.get('/get-orders', fetchPerson, async(req,res)=>{
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }

    try {
        const allOrder = await Order.find();
        res.status(200).json({success: true, message: "Product fetched successfully", allOrder});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", err: error.message});
    }
})

// Get single order by ID
router.get("/get-order/:id",fetchPerson , async (req, res) => {
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }

    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.put("/update-order/:id", fetchPerson, async(req,res)=>{
    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }

    if(req.isAdmin===false){
        return res.status(403).json({success: false, message: "Unauthorized access"});
    }
    const order_id = req.params.id;

    try {
        const newOrder = await Order.findByIdAndUpdate(order_id, req.body, {new: true});
        res.status(200).json({success: true, message: "Product updated successfully", newOrder});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", err: error.message});
    }
});



module.exports = router;