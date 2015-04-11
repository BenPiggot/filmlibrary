var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models')


router.post('/', function(req, res) {
  db.favorite.findOrCreate({where: {imdbID: req.body.imdbID, Year: req.body.Year, Title: req.body.Title,
    Director: req.body.Director, imdbRating: req.body.imdbRating, Metascore: req.body.Metascore,
    tomatoMeter: req.body.tomatoMeter}}).spread(function(link, created) {
    link.save().then(function() {
    db.favorite.findAll().then(function(favorite) {
      res.send(favorite)
      })
    })
  })
})


router.get('/', function(req, res) {
    db.favorite.findAll().then(function(favorite) {
    var locals = {pageList: favorite}
    console.log(locals)
      res.render('favorites/favorites', locals);
    })
  })


router.delete('/:imdbID',function(req,res){
    db.favorite.destroy({where: {imdbID: req.params.imdbID}}).then(function(){
        res.send({result: true})
    });
})


router.get('/:id/comments', function(req, res) {
  var id = req.params.id;
   db.favorite.find({ where: {id: id} }).then(function(favorite) {
    favorite.getComments().then(function(comments){
    var Title = favorite.Title
    var createdAt = favorite.createdAt
    var locals = {favorite: favorite, comments: comments, id: id, Title: Title,
                  createdAt: createdAt}
    // console.log(locals)
    console.log(favorite)
    res.render('favorites/output', locals)
    })

  })
})


router.post('/:id/comments', function(req, res) {
  var id = req.params.id;
  var Title = req.body.Title
  console.log(Title)
    console.log(id)
    db.favorite.find({ where: {id: id} }).
      then(function(movie) {
        movie.createComment({comment: req.body.comment}).
            then(function() {
                res.redirect('/favorites/' + id + '/comments');
            });
        });

    });





module.exports = router;



