var mongoose = require("mongoose")

var ItemSchema = new mongoose.Schema({
  title: String,
  photo_url: String,
  maker: String,
  description: String,
  price: Number,
  upvotes: {type: Number, default: 0},
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]

})

mongoose.model("Item", ItemSchema)
