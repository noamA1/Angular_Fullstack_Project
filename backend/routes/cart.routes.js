const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const cart = require("../controllers/cart.controller");
  const cartProduct = require("../controllers/cartProduct.controller");

  // Create a new cart
  app.post(`${urlConfig}/cart`, cart.create);

  // Retrieve all poducts by cart id
  app.get(`${urlConfig}/cart/products/:cartId`, cart.findOne);

  // Add new product to cart
  app.post(`${urlConfig}/cart/products/add-product`, cartProduct.create);

  //   // Retrieve all poducts by cart id
  //   app.get(`${urlConfig}/cart/products/:cartId`, cart.find);

  // Update a category with categoryId
  app.put(`${urlConfig}/cart/products/:cartProductId`, cartProduct.update);

  // Delete a category with categoryId
  app.delete(`${urlConfig}/cart/products/:cartProductId`, cartProduct.delete);
};
