var mongoose = require("mongoose")

var ReviewSchema = new mongoose.Schema({
  author: String,
  content: String,
  upvotes: {type: Number, default: 0},
  item: {type: mongoose.Schema.Types.ObjectId, ref: "Item"}

})

mongoose.model("Review", ReviewSchema)
