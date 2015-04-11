var express = require('express')
var moviesCtrl = require("./controllers/movies")
var favoritesCtrl = require("./controllers/favorites")
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs")
app.use("/movies", moviesCtrl);
app.use("/favorites", favoritesCtrl);

app.get("/", function(req, res) {
  res.render("index");
})


app.get('/favorites', function(req, res) {
    db.favorites.findAll().then(function(favorite) {
    var locals = {pageList: favorite}
      res.render('favorites/favorites', locals);
    })
  })

app.get('/search', function(req, res) {
      res.render('search');
    })



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000 ...")
})







// MVC
// M - model (DB)
// V - views (HTML)
// C - controller (routes logic)


