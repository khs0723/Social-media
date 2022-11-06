const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validations");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(parent, { userName, password }) {
      const { errors, valid } = validateLoginInput(userName, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      console.log(userName);
      const user = await User.findOne({ userName: userName });
      console.log(user);
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong password";
        throw new UserInputError("Wrong password", { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      parent,
      { registerInput: { userName, email, password, confirmPassword } }
    ) {
      // TODO : validate user data
      // TODO : Make sure user doesnt already exist
      // TODO : hash password and create auth token

      const { valid, errors } = validateRegisterInput(
        userName,
        email,
        password,
        confirmPassword
      );
      console.log("valid ", valid, errors);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({
        userName,
      });

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            userName: "This username is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        userName,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
