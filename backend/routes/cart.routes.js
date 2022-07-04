const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const cart = require("../controllers/cart.controller");
  const cartProduct = require("../controllers/cartProduct.controller");

  // Create a new cart
  app.post(`${urlConfig}/carts`, cart.create);

  // Retrieve all poducts by cart id
  app.get(`${urlConfig}/carts/products/:cartId`, cart.findOne);

  // Add new product to cart
  app.post(`${urlConfig}/carts/products/add-product`, cartProduct.create);

  //   // Retrieve all poducts by cart id
  //   app.get(`${urlConfig}/cart/products/:cartId`, cart.find);

  // Update a category with categoryId
  app.put(`${urlConfig}/carts/products/:cartProductId`, cartProduct.update);

  // Delete a category with categoryId
  app.delete(`${urlConfig}/carts/products/:cartProductId`, cartProduct.delete);
};
