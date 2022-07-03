const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CartSchema = mongoose.Schema(
  {
    clientId: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartProduct",
      },
    ],
    openAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
