// const Product = require("../models/Product.model.js");
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CatgorySchema = mongoose.Schema(
  {
    name: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Catgory", CatgorySchema);
