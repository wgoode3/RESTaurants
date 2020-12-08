const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors()); // middleware to prevent CORS errors
// CORS - cross origin resource sharing
app.use(express.json()); // we need this to properly collect form data from the req

require("./server/config/mongoose.config");
require("./server/routes/restaurant.routes")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));