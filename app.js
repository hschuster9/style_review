angular
.module("styleReview", [])
.controller("IndexCtrl", [
  "$scope",
  function($scope){
    $scope.items = [
      {
        title: 'Scallop Shirt',
        photo_url: "http://g.nordstromimage.com/ImageGallery/store/product/Zoom/3/_9956483.jpg",
        maker: "J.Crew",
        description: "This top is comfortable and simple",
        price: 40,
        upvotes: 4
      },
      {
      title: 'Horse Watch',
      photo_url: "https://cdn.shopify.com/s/files/1/0233/5133/products/Polished-Rose-Gold_Blush-Leather_1_335x335.jpg?v=1441941608",
      maker: "The Horse",
      description: "Love the rose gold and leather band",
      price: 140,
      upvotes: 2
    },
    {
      title: 'Jumpsuit',
      photo_url: "http://nord.imgix.net/Zoom/3/_11604543.jpg?fit=fill&fm=jpg&dpr=2&h=368&w=240&q=30",
      maker: "Nordstrom",
      description: "Perfect for a night out",
      price: 180,
      upvotes: 5

    }

    ]
  }])
