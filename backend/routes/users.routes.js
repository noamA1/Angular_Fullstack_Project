const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const user = require("../controllers/users.controller");

  // Create a new user
  app.post(`${urlConfig}/users`, user.create);

  //   // Retrieve all poducts by cart id
  //   app.get(`${urlConfig}/cart/products/:cartId`, cart.find);

  // Update a user info with userId
  app.put(`${urlConfig}/users/:userId`, user.update);

  //   // Delete a category with categoryId
  //   app.delete(`${urlConfig}/category/:categoryId`, category.delete);
};
