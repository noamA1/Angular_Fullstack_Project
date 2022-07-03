const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    cartId: String,
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
