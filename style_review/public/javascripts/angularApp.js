angular
.module("styleReview", [
  "ui.router"
])
.config([
  "$stateProvider",
  "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state("index", {
      url: '/items',
      templateUrl: "/index.html",
      controller: "IndexController",
      //makes all items loaded before page renders
      resolve: {
        itemPromise: ['items', function(items){
          return items.getAll()
        }]
      }
    })
    .state("items", {
      url: "/items/{id}",
      templateUrl: "/items.html",
      controller: "ItemsController",
      resolve: {
        item: ["$stateParams", "items", function($stateParams, items){
          return items.get($stateParams.id)
        }]
      }
    })
    //redirects to index if not found
    $urlRouterProvider.otherwise('items')

  }
])
.factory('items', [
  "$http",
  function($http){
    var items_array = {
      items: [
        // {   title: 'Scallop Shirt',
        //       photo_url: "http://g.nordstromimage.com/ImageGallery/store/product/Zoom/3/_9956483.jpg",
        //       maker: "J.Crew",
        //       description: "This top is comfortable and simple",
        //       price: 40,
        //       upvotes: 0,
        //       reviews: [
        //         {
        //           author: 'Mary',
        //           content: 'Love this!',
        //           upvotes: 0
        //         },
        //         { author: 'Kate',
        //           content: 'Just bought this too!',
        //           upvotes: 0
        //         },
        //         {
        //           author: 'Abby',
        //           content: 'Definitely recommend!',
        //           upvotes: 0
        //         }
        //       ]
        //       }
      ]
    }
      //returns all items and makes a copy
      items_array.getAll = function(){
        return $http.get("/items").success(function(data){
          //create new copy of data
          angular.copy(data, items_array.items)
        })
      }
      //return individual item
      items_array.get = function(id){
        return $http.get('/items/'+ id).then(function(res){
          return res.data;
        })
      }
      //for item to persist in database
      items_array.create = function(item){
        return $http.post('/items', item).success(function(data){
          items_array.items.push(data)
        })
      }

      items_array.delete = function(item){
        return $http.delete('/items/' + item._id).success(function(data){
          angular.copy(data, items_array.items)
        })
      }

      items_array.upvote = function(item){
        return $http.put('/items/'+ item._id+"/upvote").success(function(data){
          item.upvotes += 1
        })
      }
      items_array.addReview = function(id, review){
        return $http.post('/items/' + id + "/reviews", review)
      }


      items_array.upvoteReview = function(item, review){
        return $http.put('/items/' + item._id + '/reviews/' + review._id + "/upvote").success(function(data){
          review.upvotes += 1
        })
      }
      return items_array
}])
.controller("IndexController", [
  "$scope",
  'items',
  function($scope, items){
    $scope.items = items.items
  //   [
  //     {
  //       title: 'Scallop Shirt',
  //       photo_url: "http://g.nordstromimage.com/ImageGallery/store/product/Zoom/3/_9956483.jpg",
  //       maker: "J.Crew",
  //       description: "This top is comfortable and simple",
  //       price: 40,
  //       upvotes: 4
  //     },
  //     {
  //     title: 'Horse Watch',
  //     photo_url: "https://cdn.shopify.com/s/files/1/0233/5133/products/Polished-Rose-Gold_Blush-Leather_1_335x335.jpg?v=1441941608",
  //     maker: "The Horse",
  //     description: "Love the rose gold and leather band",
  //     price: 140,
  //     upvotes: 2
  //   },
  //   {
  //     title: 'Jumpsuit',
  //     photo_url: "http://nord.imgix.net/Zoom/3/_11604543.jpg?fit=fill&fm=jpg&dpr=2&h=368&w=240&q=30",
  //     maker: "Nordstrom",
  //     description: "Perfect for a night out",
  //     price: 180,
  //     upvotes: 5
  //   }
  // ]

    $scope.addItem = function(){

      items.create({
        title: $scope.title,
        photo_url: $scope.photo_url,
        maker: $scope.maker,
        description: $scope.description,
        price: $scope.price
      })
      $scope.title = '';
      $scope.photo_url = '';
      $scope.maker = '';
      $scope.description = '';
      $scope.price = '';
      $scope.upvotes = '';
    }



    $scope.increaseUpvotes = function(item){
      items.upvote(item)
    }


  }])
  .controller("ItemsController", [
    "$scope",
    "$stateParams",
    "items",
    "item",
    function($scope, $stateParams, items, item){
      //takes the specific item from the items_array
      $scope.item = item

      $scope.addReview = function(){
        items.addReview(item._id,{
          author: $scope.author,
          content: $scope.content
        }).success(function(review){
          $scope.item.reviews.push(review)
        })
        $scope.author = ''
        $scope.content = ''
      }
      $scope.deleteItem = function(item){
        items.delete(item)
      }

      $scope.increaseUpvotes = function(review){
        items.upvoteReview(item, review)
      }
      }])
