const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json())
require("dotenv").config();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const { MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.status(200).json({ "msg": "welcome to API" });
});

const authRoute = require('./routes/auth')
app.use('/api/user', authRoute)

const booksRoute = require('./routes/books')
app.use('/api/books', booksRoute)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
