const mongoose = require("mongoose");


const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be 3 characters or longer"]
    },
    cuisine: {
        type: String,
        required: [true, "Cuisine is required"],
        minLength: [3, "Cuisine must be 3 characters or longer"] 
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Description must be 10 characters or longer"] 
    },
    yearEstablished: {
        type: Number,
        required: [true, "Year Established is required"],
        min: [1725, "Your restaurant is too old!"],
        max: [new Date().getFullYear() + 1, "Your restaurant doesn't exist yet!"]
    }, 
    reviews: []
}, {timestamps: true});

module.exports = mongoose.model("Restaurant", RestaurantSchema);