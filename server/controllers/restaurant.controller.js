const Restaurant = require("../models/restaurant.model");

class RESTaurantController {

    getAll(req, res) {
        // how we structure our res.json will be how it looks in the front-end
        Restaurant.find({})
            .then(restaurants => res.json(restaurants))
            .catch(err => res.json(err));
    }

    getOne(req, res) {
        // getting back one restaurant at a time
        Restaurant.findOne({_id: req.params._id})
            .then(restaurant => res.json(restaurant))
            .catch(err => res.json(err));
    }

    create(req, res) {
        // when creating the err object can contain validation errors!
        Restaurant.create(req.body)
            .then(restaurant => res.json(restaurant))
            .catch(err => res.json(err));
    }

    update(req, res) {
        Restaurant.findByIdAndUpdate({_id: req.params._id}, req.body, {runValidators: true})
            .then(() => res.json({msg: "ok"}))
            .catch(err => res.json(err));
    }

    remove(req, res) {
        Restaurant.deleteOne({_id: req.params._id})
            .then(() => res.json({msg: "ok"}))
            .catch(err => res.json(err));
    }

}

module.exports = new RESTaurantController();