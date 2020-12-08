const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/rest_restaraunts_db", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then( () => console.log("Succesfully connected to rest_restaraunts_db"))
  .catch(err => console.err(err));