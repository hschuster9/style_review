var mongoose = require("mongoose")

var ReviewSchema = new mongoose.Schema({
  author: String,
  content: String,
  upvotes: {type: Number, default: 0},
  item: {type: mongoose.Schema.Types.ObjectId, ref: "Item"}

})

ReviewSchema.methods.upvote = function(c) {
  this.upvotes += 1;
  this.save(c)
}


mongoose.model("Review", ReviewSchema)
