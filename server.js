require('dotenv').config();
console.log(process.env.API_KEY)
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const axios = require("axios");
const app = express();

const PORT = 4200;

const API_KEY = process.env.API_KEY;

app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use(require("morgan")("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/results", (req, res) => {
  let qs = {
    params: {
      s: req.query.titleSearch,
      apikey: API_KEY,
    },
  };
  axios
    .get("http://www.omdbapi.com", qs)
    .then((response) => {
      console.log(response.data);
      let searchResults = response.data.Search;
      res.render("results", { searchResults });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/movies/:id", (req, res) => {
  let qs = {
    params: {
      i: req.params.id,
      apikey: API_KEY,
    },
  };
  axios
    .get("http://www.omdbapi.com", qs)
    .then((response) => {
      let movieDetails = response.data;
      res.render("detail", { movieDetails });
    })
    .catch((err) => {
      console.log(err);
    });
});


app.listen(PORT, () => {
  console.log(`lisenting to port #${PORT}`);
})

module.exports = app;