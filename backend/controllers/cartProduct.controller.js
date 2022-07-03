const Product = require("../models/product.model");
const CartProduct = require("../models/CartProduct.model");
const Cart = require("../models/Cart.model");

const getProductPrice = async (id) => {
  const product = await Product.findOne({ _id: id });
  return await product.price;
};

exports.create = async (req, res) => {
  if (!req.body.product) {
    return res.status(400).send({
      message: "Product id can't be empty",
    });
  } else if (!req.body.quantity) {
    return res.status(400).send({
      message: "Quantity can't be empty",
    });
  } else if (!req.body.cartId) {
    return res.status(400).send({
      message: "Cart id can't be empty",
    });
  }

  const productPrice = await getProductPrice(req.body.product._id);
  const cartProduct = new CartProduct({
    product: req.body.product,
    quantity: req.body.quantity,
    totalPrice: productPrice * req.body.quantity,
    cartId: req.body.cartId,
  });
  cartProduct
    .save()
    .then((data) => {
      Cart.findByIdAndUpdate(
        {
          _id: req.body.cartId,
        },
        { $push: { products: data } },
        { new: true }
      ).then(() => {
        res.send(data);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

exports.update = async (req, res) => {
  if (!req.body.quantity) {
    return res.status(400).send({
      message: "Quantity can't be empty",
    });
  } else if (!req.body.productId) {
    return res.status(400).send({
      message: "Product id can't be empty",
    });
  }
  const productPrice = await getProductPrice(req.body.productId);
  // Find a cart product and update it with the request body
  CartProduct.findByIdAndUpdate(
    req.params.cartProductId,
    {
      quantity: req.body.quantity,
      totalPrice: productPrice * req.body.quantity,
    },
    { new: true }
  )
    .then((cartProduct) => {
      if (!cartProduct) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.cartProductId,
        });
      }
      res.send(cartProduct);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.cartProductId,
        });
      }
      return res.status(500).send({
        message: "Error updating Product with id " + req.params.cartProductId,
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  let cartId;
  CartProduct.findByIdAndDelete({ _id: req.params.cartProductId })
    .then((cartProduct) => {
      cartId = cartProduct.cartId.toString();
      if (!cartProduct) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.cartProductId,
        });
      }

      Cart.findByIdAndUpdate({ _id: cartId }).then((doc) => {
        let cartProductIndex = doc.products.indexOf(req.params.cartProductId);

        doc.products.splice(cartProductIndex, 1);
        doc.save();
        res.send({ message: "Product deleted successfully!" });
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.cartProductId,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.cartProductId,
      });
    });
};