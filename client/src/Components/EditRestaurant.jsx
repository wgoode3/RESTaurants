import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';


const EditRestaurant = props => {

  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [yearEstablished, setYear] = useState(2000);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect( () => {
    console.log(props._id);
    axios.get(`http://localhost:8000/api/restaurants/${props._id}`)
      .then(res => {
        console.log(res);
        setName(res.data.name);
        setCuisine(res.data.cuisine);
        setYear(res.data.yearEstablished);
        setDescription(res.data.description);
      }).catch(err => console.error(err));
  }, [props._id]);

  const update = e => {
    e.preventDefault();
    const rest = {name, cuisine, yearEstablished, description};
    axios.put(`http://localhost:8000/api/restaurants/${props._id}`, rest)
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      }).catch(err => {
        console.error(err);
      });
  }

  return (
    <div className="row my-5">
      <div className="col-sm-8 offset-sm-2">
        <div className="card">
          <div className="card-header bg-dark text-light">Update Restaurant</div>
          <div className="card-body">
            <form onSubmit={update}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} />
                <p className="text-danger">{errors.name ? errors.name.message: ''}</p>
              </div>
              <div className="form-group">
                <label>Cuisine:</label>
                <input type="text" className="form-control" name="cuisine" value={cuisine} onChange={e => setCuisine(e.target.value)} />
                <p className="text-danger">{errors.cuisine ? errors.cuisine.message: ''}</p>
              </div>
              <div className="form-group">
                <label>Year Established:</label>
                <input type="number" className="form-control" name="yearEstablished" value={yearEstablished} onChange={e => setYear(e.target.value)}  />
                <p className="text-danger">{errors.yearEstablished ? errors.yearEstablished.message: ''}</p>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" className="form-control" value={description} onChange={e => setDescription(e.target.value)} ></textarea>
                <p className="text-danger">{errors.description ? errors.description.message: ''}</p>
              </div>
              <input type="submit" value="Update Restaurant" className="btn btn-info btn-block" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditRestaurant;
