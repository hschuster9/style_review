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

ItemSchema.methods.upvote = function(c) {
  this.upvotes += 1;
  this.save(c)
}

mongoose.model("Item", ItemSchema)
