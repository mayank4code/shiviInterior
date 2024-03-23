const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' // Referencing User schema,
    }, 
    product_ids:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product' // Referencing Product schema
    },
    productName:{
        type : String ,
    },
    productPrice:{
        type : Number ,
    },
    customerName: {
        type: String,
    },
    customerMobile: {
        type: String,
        maxlength: 10,
        unique: true,
        required: true
    },
    customerAddress: {
        type: String
    },
    customerCity: {
        type: String
    },
    OrderDate: {
        type: Date
    },
    status:{
        type : String, 
        // Placed: The order has been placed but hasn't been processed yet.
        // Processing: The order is being processed.
        // Shipped: The order has been shipped.
        // Delivered: The order has been successfully delivered to the customer.
        // Cancelled: The order has been cancelled by either the customer or the system.
        // Returned: The order has been returned by the customer.
        // Refunded: The order has been refunded to the customer.
        // On Hold: The order is on hold for some reason (e.g., awaiting payment confirmation).
    }

},
{ timestamps: true }

);

module.exports = mongoose.model("Order", OrderSchema);