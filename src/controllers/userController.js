const { User } = require("../../db/models");
const { isEmpty } = require("lodash");
const validator = require("email-validator");
const { STATUS_CODE } = require("../common/helper/response-code.js");
const { Response, systemError } = require("../common/response-formatter");
const { SIGNUP, LOGIN } = require("../common/helper/constant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;

  let response = Response(STATUS_CODE.SUCCESS, SIGNUP.SUCCESS, "");

  try {
    let validEmail = validator.validate(email);

    if (validEmail) {
      const isExistedUser = await User.findOne({ email: email });

      if (isEmpty(isExistedUser)) {
        let newUserData = new User({
          email: email,
        });
        // Encrypting Password and adding it into newUserData
        newUserData.password = newUserData.encryptPassword(password);
        await User.create(newUserData);
      } else {
        response.statusCode = STATUS_CODE.EXISTED_VALUE;
        response.message = `${SIGNUP.EMAIL_EXIST}`;
      }
    }
  } catch (error) {
    response = systemError(SIGNUP.EXCEPTION);
  }

  res.send(response);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let response = Response(STATUS_CODE.SUCCESS, LOGIN.SUCCESS, "");

  try {
    const existedUser = await User.findOne({ email: email });

    if (isEmpty(existedUser)) {
      response.statusCode = STATUS_CODE.NOT_FOUND;
      response.message = LOGIN.INVALID_EMAIL;
    } else if (bcrypt.compareSync(password, existedUser.password) === false) {
      response.statusCode = STATUS_CODE.INVALID_VALUE;
      response.message = LOGIN.WRONG_PASS_EMAIL;
    } else {
      var token = jwt.sign(
        {
          id: email,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      response.data = {
        token: token,
        validity: "1 Hour",
      };
    }
  } catch (err) {
    response = systemError(LOGIN.EXCEPTION);
  }
  res.send(response);
};

module.exports = {
  register,
  login,
};