const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ProdModel = mongoose.model("Product", prodSchema);

module.exports = { ProdModel };
