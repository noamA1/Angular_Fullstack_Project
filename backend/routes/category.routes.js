const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const category = require("../controllers/category.controller");

  // Create a new category
  app.post(`${urlConfig}/category`, category.create);

  // Retrieve all categorys
  // app.get("/category", category.findAll);

  // Retrieve all poducts by category id
  app.get(`${urlConfig}/category/products/:categoryName`, category.findOne);

  // Update a category with categoryId
  app.put(`${urlConfig}/category/:categoryId`, category.update);

  // Delete a category with categoryId
  app.delete(`${urlConfig}/category/:categoryId`, category.delete);
};
