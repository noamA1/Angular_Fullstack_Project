const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    orderDate: Date,
    deliveryDate: Date,
    totalPrice: Number,
    creditCard: String,
    status: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      city: String,
      street: String,
      houseNumber: Number,
      zipCode: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
