const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const products = require("../controllers/product.controller");

  // Create a new products
  app.post(`${urlConfig}/products`, products.create);

  // Update a product with productId
  app.put(`${urlConfig}/products/:productId`, products.update);

  // Delete a product with productId
  app.delete(`${urlConfig}/products/:productId`, products.delete);

  // Retrieve all productss
  // app.get(`${urlConfig}/products/:categoryId`, products.findByCategoryId);
};
