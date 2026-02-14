const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService  = require("../services/email.service")
/**
 *
 * userRegisterController - This controller will handle the user registration process. It will receive the user data from the request body, validate it, and create a new user in the database. If the registration is successful, it will return a success message along with the created user data (excluding the password). If there is an error during registration, it will return an appropriate error message.
 * post api/auth/register
 */
async function userRegisterController(req, res) {
  const { email, name, password } = req.body;

  const isExists = await userModel.findOne({
    email: email,
  });

  if (isExists) {
    return res.status(422).json({
      message: " User already exists, please use a different email",
      status: "failed",
    });
  }

  const user = await userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);
  res.status(201).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token: token,
  });

  await emailService.sendRegisterEmail(user.email, user.name)

}

/**
 * userLoginController - This controller will handle the user login process. It will receive the user credentials (email and password) from the request body, validate them against the stored user data in the database, and if the credentials are valid, it will generate a JWT token for the authenticated user. The token will be sent back in the response along with a success message. If the credentials are invalid, it will return an appropriate error message.
 * post api/auth/login
 */


async function userLoginController(req, res){
    const {
        email, password
    } = req.body

    const user = await userModel.findOne({
        email
    }).select('+password')
    if(!user){
        return res.status(401).json({
            message: "Invalid credentials, please try again",
            status: "failed"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
         return res.status(401).json({
            message: "Invalid credentials, please try again",
            status: "failed"
        })
    }

    const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);
  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token: token,
  });
     
}

module.exports = {
  userRegisterController,
  userLoginController,
};
