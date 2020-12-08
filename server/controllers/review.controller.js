const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model");


class ReviewController {

    create(req, res) {
        // first make sure the review and name aren't already in use
        Restaurant.findOne({_id: req.params})
            .then(restaurant => {
                // did the reviewer alredy leave a review?
                let exists = false;
                for(let review of restaurant.reviews) {
                    if(review.name === req.body.name) {
                        exists = true;
                        break;
                    }
                }
                if(exists) {
                    res.json({
                        errors: {
                            name: {
                                message:`The user ${req.body.name} has already reviewed this restaurant!`
                            }
                        }
                    });
                } else {
                    Review.create(req.body)
                        .then(newReview => {
                            Restaurant.findOneAndUpdate({_id: req.params}, {$push: {reviews: newReview}})
                                .then(res.json({msg: "ok"}))
                                .catch(err => res.json(err));
                        }).catch(err => res.json(err));
                }
            }).catch(err => res.json(err));
    }

}

module.exports = new ReviewController();