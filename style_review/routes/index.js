var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose')
var Item = mongoose.model("Item")
var Review = mongoose.model("Review")


router.get('/items', function(req, res, next){
  Item.find(function(err, items){
    if(err){ next(err) }
    res.json(items)
  })
})

//create items
router.post('/items', function(req, res, next){
 var item = new Item(req.body)
 item.save(function(err, item){
   if(err) { return next(err) }
   res.json(item)
 })
})

//when item in params is detected- loads item from database
router.param('item', function(req, res, next, id){
  var query = Item.findById(id)
  query.exec(function(err, item){
    if(err) {return next(err)}
    if(!item){ return next(new Error("Item not found"))}
    req.item = item
    return next()
  })
})


router.param('review', function(req, res, next, id){
  var query = Review.findById(id)
  query.exec(function(err, review){
    if(err) {return next(err)}
    if(!review){ return next(new Error("Review not found"))}
    req.review = review
    return next()
  })
})

//get individual item
router.get('/items/:item', function(req, res){
  //populate loads reviews when individual item page rendered
  req.item.populate('reviews', function(err, item){
      res.json(item)
  })

})

//delete
router.delete('/items/:item', function(req, res){
  req.item.reviews.forEach(function(id){
      Review.remove({_id: id}, function(err){
        if(err) {return next(err)}
    })
    })
        Item.remove({_id: req.params.item}, function(err, item){
        if(err) {return next(err)}
        Item.find(function(err, items){
          if(err) {return next(err)}
          res.json(items)
      })
    })
})
//route to increase/update upvote, method in items.js
router.put('/items/:item/upvote', function(req, res, next){
  req.item.upvote(function(err, item){
    if(err) {return next(err)}
    res.json(item)
  })
})
//route to increase/update review upvote, method in items.js
router.put('/items/:item/reviews/:review/upvote', function(req, res, next){
  req.review.upvote(function(err, review){
    if(err) {return next(err)}
    res.json(review)
  })
})




router.post("/items/:item/reviews", function(req, res, next){
  var review = new Review(req.body)
  review.item = req.item

  review.save(function(err, review){
    if(err) {return next(err)}
    req.item.reviews.push(review)
    req.item.save(function(err, item){
      if(err) {return next(err)}
      res.json(review)
    })
  })
})

module.exports = router;
