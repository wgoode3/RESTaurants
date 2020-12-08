const mongoose = require("mongoose");


const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be 3 characters or longer"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be between 1 and 5 stars"],
        max: [5, "Rating must be between 1 and 5 stars"]
    },
    content: {
        type: String,
        required: [true, "Review text is required"],
        minLength: [10, "Review text must be 10 characters or longer"]
    },
}, {timestamps: true});

module.exports = mongoose.model("Review", ReviewSchema);