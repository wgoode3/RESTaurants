import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from '@reach/router';


function bubble(restaurants) {
  const arr = [...restaurants];
  for(let i=0; i<arr.length; i++) {
    for(let j=0; j<arr.length-i-1; j++) {
      if(arr[j].avgRating < arr[j+1].avgRating) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}

function addAvgRatingsToRestaurants(restaurants) {
  const arr = [];
  for(let restaurant of restaurants) {
    if(restaurant.reviews.length < 1) {
      arr.push({...restaurant, avgRating: 0});
      continue;
    }
    let total = 0;
    for(let rev of restaurant.reviews) {
      total += rev.rating;
    }
    arr.push({...restaurant, avgRating: total / restaurant.reviews.length});
  }
  return arr;
} 

const AllRestautants = props => {

  const [all, setAll] = useState([]);
  const [q, setQ] = useState("");
  
  useEffect( () => {
    getAll();
  }, []);

  function getAll() {
    axios.get("http://localhost:8000/api/restaurants")
      .then(res => {
        console.log(res);
        setAll(
          bubble(
            addAvgRatingsToRestaurants(res.data)
          )
        );
      }).catch(err => console.error(err));
  }

  const remove = _id => {
    axios.delete(`http://localhost:8000/api/restaurants/${_id}`)
      .then(res => {
        console.log(res);
        getAll();
      }).catch(err => console.error(err));
  }

  return (
    <div className="row my-3">
      <div className="col-sm-6 offset-sm-3">
        <input type="search" placeholder="search" name="q" className="form-control my-3" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {all.filter(r => r.name.toLowerCase().includes(q.toLowerCase())).length < 1 ? <p className="col-sm-12">No results</p> : ""}
      {all.filter(r => r.name.toLowerCase().includes(q.toLowerCase())).map( rest => 
        <div className="col-sm-12" key={rest._id}>
          <div className="card mt-3">
            <div className="card-header bg-dark text-light">{rest.name}</div>
            <div className="card-body">
              <p>Cuisine: {rest.cuisine}</p>
              <p>Year Established: {rest.yearEstablished}</p>
              <p>Description: {rest.description}</p>
              <p>Average Rating: {rest.avgRating ? rest.avgRating.toFixed(1) : "no reviews yet :("}</p>
              <div className="d-flex justify-content-between">
                <Link to={`/view/${rest._id}`} className="btn btn-outline-success">View</Link>
                <Link to={`/edit/${rest._id}`} className="btn btn-outline-info">Edit</Link>
                <button className="btn btn-outline-danger" onClick={e => remove(rest._id)}>Remove</button>
              </div>
            </div>
          </div>
        </div>  
      )}
    </div>
  )
}

export default AllRestautants
