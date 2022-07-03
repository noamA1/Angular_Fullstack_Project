const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const cartProduct = require("../controllers/cartProduct.controller");

  // Add new product to cart
  app.post(`${urlConfig}/cart/products/add-product`, cartProduct.create);

  //   // Retrieve all poducts by cart id
  //   app.get(`${urlConfig}/cart/products/:cartId`, cart.find);

  //   // Update a category with categoryId
  //   app.put(`${urlConfig}/category/:categoryId`, category.update);

  //   // Delete a category with categoryId
  //   app.delete(`${urlConfig}/category/:categoryId`, category.delete);
};
