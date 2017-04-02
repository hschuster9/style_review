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
      controller: "IndexController"
    })
    .state("items", {
      url: "/items/{id}",
      templateUrl: "/items.html",
      controller: "ItemsController"
    })
    //redirects to index if not found
    $urlRouterProvider.otherwise('items')

  }
])
.factory('items', [
  function(){
    var items_array = {
      items: [
        {   title: 'Scallop Shirt',
              photo_url: "http://g.nordstromimage.com/ImageGallery/store/product/Zoom/3/_9956483.jpg",
              maker: "J.Crew",
              description: "This top is comfortable and simple",
              price: 40,
              upvotes: 0,
              reviews: [
                {
                  author: 'Mary',
                  content: 'Love this!',
                  upvotes: 0
                },
                { author: 'Kate',
                  content: 'Just bought this too!',
                  upvotes: 0
                },
                {
                  author: 'Abby',
                  content: 'Definitely recommend!',
                  upvotes: 0
                }
              ]
              }
      ]
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

      $scope.items.push({
        title: $scope.title,
        photo_url: $scope.photo_url,
        maker: $scope.maker,
        description: $scope.description,
        price: $scope.price,
        upvotes: 0,
        reviews: [
          {
            author: 'Mary',
            content: 'Love this!',
            upvotes: 0
          },
          { author: 'Amanda',
            content: 'Just bought this too!',
            upvotes: 0
          },
          {
            author: 'Leah',
            content: 'Definitely recommend!',
            upvotes: 0
          }
        ]
      })
      $scope.title = '';
      $scope.photo_url = '';
      $scope.maker = '';
      $scope.description = '';
      $scope.price = '';
      $scope.upvotes = '';
    }

    $scope.increaseUpvotes = function(item){
      item.upvotes +=1
    }
  }])
  .controller("ItemsController", [
    "$scope",
    "$stateParams",
    "items",
    function($scope, $stateParams, items){
      //takes the specific item from the items_array
      $scope.item = items.items[$stateParams.id]

      $scope.addReview = function(){
        
        $scope.item.reviews.push({
          author: $scope.author,
          content: $scope.content,
          upvotes: 0
        })
        $scope.author = ''
        $scope.content = ''
      }
      }])
