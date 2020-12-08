import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ShowStars from './ShowStars';
import moment from 'moment';


// const reverseCopy = arr => {
//   const copy = [...arr];
//   copy.reverse();
//   return copy;
// }

Array.prototype.reverseCopy = function() {
  const copy = [...this];
  copy.reverse();
  return copy;
}

function getAverageRating(reviews) {
  if(reviews.length < 1) {
    return "no reviews yet :(";
  }
  let total = 0;
  for(let review of reviews) {
    total += review.rating;
  }
  return (total / reviews.length).toFixed(1);
}

const OneRestaurant = props => {

  // needs a starting array value so the component doesn't crash before the axios.get
  // we're going to be mapping through the reviews array
  const [restaurant, setRestaurant] = useState({reviews: []});
  const [name, setName] = useState("");
  const [rating, setRating] = useState("3");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(props._id);
    getRestaurant();
  }, [props._id]);

  function getRestaurant() {
    axios.get(`http://localhost:8000/api/restaurants/${props._id}`)
    .then(res => {
      console.log(res);
      setRestaurant(res.data);
    }).catch(err => console.error(err));
  }

  const leaveReview = e => {
    e.preventDefault();
    const newReview = {name, rating, content};
    axios.post(`http://localhost:8000/api/restaurants/${props._id}/review`, newReview)
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          getRestaurant();
          setErrors({});
          setName("");
          setContent("");
          setRating("3");
        }
      }).catch(err => console.error(err));
  }

  return (
    <div className="row my-5">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-header bg-dark text-light">{restaurant.name}</div>
          <div className="card-body">
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Year Established: {restaurant.yearEstablished}</p>
            <p>Description: {restaurant.description}</p>
            {/* <p>Average rating: {
              (restaurant.reviews.reduce( (total, rev) => total + rev.rating, 0) / restaurant.reviews.length).toFixed(1)
            }</p> */}
            <p>Average rating: { getAverageRating(restaurant.reviews) }</p>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-header bg-dark text-light">Reviews</div>
          <div className="card-body">
            <form onSubmit={leaveReview}>
              <div className="form-group">
                <label>Reviewer Name</label>
                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                <p className="text-danger">{errors.name ? errors.name.message : ""}</p>
              </div>
              <div className="form-group">
                <label>Rating</label>
                <select className="form-control" value={rating} onChange={e => setRating(e.target.value)}>
                  <option value="1">★☆☆☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="4">★★★★☆</option>
                  <option value="5">★★★★★</option>
                </select>
                <p className="text-danger">{errors.rating ? errors.rating.message : ""}</p>
              </div>
              <div className="form-group">
                <label>Reviewer Text</label>
                <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)}></textarea>
                <p className="text-danger">{errors.content ? errors.content.message : ""}</p>
              </div>
              <input type="submit" value="Leave Review" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <ul className="list-group">
          <li className="list-group-item bg-dark text-light">Reviews</li>
          {restaurant.reviews.reverseCopy().map( rev => 
            <li className="list-group-item" key={rev._id}>
              <ShowStars rating={rev.rating} /><br/>
              <strong>{rev.name} says: </strong> {rev.content} 
              <p>{moment(rev.createdAt).fromNow()}</p>
            </li>  
          )}
        </ul>
      </div>
    </div>
  )
}

export default OneRestaurant;
