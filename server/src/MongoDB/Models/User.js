const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mobile: {
        type: String,
        maxlength: 10,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 4,
        required: true
    },
    name: {
        type: String,
        // required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: Number,
        enum: [1, 2, 3]  //1 is male, 2 is female and 3 is other
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: String
    },
    country: {
        type: String
    },
    role: {
        type: Number,
        default: 1, // 1 is user and 2 is admin
        enum: [1, 2]
    },
    orders: [{
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Referencing Order schema
        product_name: {
            type: String
        },
        product_price: {
            type: String
        }
    }],
    lastTestDate: {
        type: Date
    }

},
    { timestamps: true }

);

module.exports = mongoose.model("User", UserSchema);