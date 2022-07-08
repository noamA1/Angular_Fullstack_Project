const Cart = require("../models/Cart.model");
const Product = require("../models/product.model");

// Create and Save a new Cart
exports.create = (req, res) => {
  // validate request body fields to be not empty
  if (!req.body.clientId) {
    return res.status(400).send({
      message: "Client id can't be empty",
    });
  }

  // Create a Cart
  const cart = new Cart({
    clientId: req.body.clientId,
    openAt: new Date(),
    products: [],
  });

  // Save Cart in the database
  cart
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the cart.",
      });
    });
};

// Find all cart products by a CartId
exports.findOne = async (req, res) => {
  try {
    let products = await Cart.find({
      _id: req.params.cartId,
    }).populate("products");

    res.json(products[0]);
  } catch (err) {
    if (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Products not found with given cart id " + req.params.CartId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving Products with given cart id " + req.params.CartId,
      });
    }
  }
};
