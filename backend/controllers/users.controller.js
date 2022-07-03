const User = require("../models/User.model");

const validateRequest = (body, type) => {
  // validate request body fields to be not empty
  if (!body.id) {
    return {
      isValid: false,
      message: "ID can't be empty",
    };
  } else if (!body.firstName) {
    return {
      isValid: false,
      message: "First name can't be empty",
    };
  } else if (!body.lastName) {
    return {
      isValid: false,
      message: "Last name can't be empty",
    };
  } else if (!body.phone) {
    return {
      isValid: false,
      message: "Phone number can't be empty",
    };
  } else if (!body.email) {
    return {
      isValid: false,
      message: "Email can't be empty",
    };
  } else if (!body.address) {
    return {
      isValid: false,
      message: "Address can't be null",
    };
  } else if (!body.role && type === "create") {
    return {
      isValid: false,
      message: "Role can't be empty",
    };
  } else {
    return { isValid: true };
  }
};

exports.create = (req, res) => {
  const validateCheck = validateRequest(req.body, "create");
  if (!validateCheck.isValid) {
    return res.status(400).send(validateCheck.message);
  }
  if (validateCheck.isValid) {
    // Create a User
    const user = new User({
      userId: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phone,
      email: req.body.email,
      orders: [],
      role: req.body.role,
      address: {
        city: req.body.address.city,
        street: req.body.address.street,
        houseNumber: req.body.address.house,
        zipCode: req.body.address.zipCode,
      },
    });

    // Save User in the database
    user
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      });
  }
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  const validateCheck = validateRequest(req.body, "update");
  if (!validateCheck.isValid) {
    return res.status(400).send(validateCheck.message);
  }
  if (validateCheck.isValid) {
    // Find user and update it with the request body
    User.findByIdAndUpdate(
      req.params.userId,
      {
        userId: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phone,
        email: req.body.email,
        address: {
          city: req.body.address.city,
          street: req.body.address.street,
          houseNumber: req.body.address.house,
          zipCode: req.body.address.zipCode,
        },
      },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId,
          });
        }
        res.send(user);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId,
          });
        }
        return res.status(500).send({
          message: "Error updating user with id " + req.params.userId,
        });
      });
  }
};
