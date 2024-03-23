const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number // should be in % 
    },
    description: {
        type: String
    },
    tags: [{
        type: String
    }],
    category: {
        type: String
    },
    img_videos: [{
        url: {
            type: String
        },
        url_type: {
            type: String
        }
    }],
    ordered_by: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' // Referencing User schema
    }],
    reviews: [{
        reviewer_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Referencing User schema
        reviewer_name: {
            type: String
        },
        text_review: {
            type: String
        }
    }],
    added_On: {
        type: Date
    }

},
    { timestamps: true }

);

module.exports = mongoose.model("Product", ProductSchema);