var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models')

router.get("/", function(req, res) {
  // res.send(req.query);
  var query = req.query.q
  var url = "http://www.omdbapi.com/?s=" + query
  request(url, function (error, response, data) {
  if (error || data.Error) {res.send('error');}
  else {
    var movies = JSON.parse(data)
    res.render("movies/index", movies)
  }
  })
})


router.get("/:id", function(req, res) {
  // res.send(req.query);
  var id = req.params.id
  var url = "http://www.omdbapi.com/?i=" + id +"&plot=full&tomatoes=true"
  request(url, function (error, response, data) {
  if (!error || response.statusCode === 200) {
    var movies2 = JSON.parse(data);
    db.favorite.find({where: {imdbID: movies2.imdbID}}).then(function(data2) {
    if (data2) {
      movies2.favorited = true;
      res.render("movies/show", movies2);
    } else {
      movies2.favorited = false;
      res.render("movies/show", movies2);
      }
    });
  }
});
});
// router.get("/", function(req, res) {
//   // res.send(req.query);
//   var query = req.query.q
//   var url = "http://www.omdbapi.com/?s=" + query
//   request(url, function (error, response, data) {
//   if (error || data.Error) {res.send('error');}
//   else {
//     var movies = JSON.parse(data)
//     var packages = {'movies': movies, }
//     res.render("movies/index", movies)
//   }
//   })
// })


module.exports = router;