const Restaurants = require("../controllers/restaurant.controller");
const Reviews = require("../controllers/review.controller");


// TODO: api routes...

// this is the REST pattern
module.exports = app => {
    // restaurant REST routes
    app.get("/api/restaurants", Restaurants.getAll);
    app.get("/api/restaurants/:_id", Restaurants.getOne);
    app.post("/api/restaurants", Restaurants.create);
    app.put("/api/restaurants/:_id", Restaurants.update);
    app.delete("/api/restaurants/:_id", Restaurants.remove);

    // I'll put review routes here
    app.post("/api/restaurants/:_id/review", Reviews.create);
}