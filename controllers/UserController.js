const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      adminCode
    } = req.body;


    // Validate required fields

    if (!name || !email || !password) {

      return res.status(400).json({
        message: "Name, email and password are required"
      });

    }


    // Check if user already exists

    const userExists = await User.findOne({
      email
    });

    if (userExists) {

      return res.status(409).json({
        message: "User already exists"
      });

    }


    // Decide the role

    let role = "SalesAssistant";


    // If admin code is provided, it MUST be correct

    if (adminCode) {

      if (
        adminCode !==
        process.env.ADMIN_REGISTRATION_CODE
      ) {

        return res.status(403).json({
          message: "Invalid admin registration code"
        });

      }

      role = "StoreAdmin";
    }


    // Hash password

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // Create user

    const user = new User({

      name: name.trim(),

      email: email.trim(),

      password: hashedPassword,

      role

    });


    await user.save();
    const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);


    res.status(201).json({
  message: "User Registered Successfully",
  token,
  name: user.name,
  email: user.email,
  role: user.role
});

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    const user = await User.findOne({
      email
    });


    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }


    const isMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid Password"
      });

    }


    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d"
      }

    );


    res.status(200).json({

      message: "Login Successful",

      token,

      role: user.role

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


module.exports = {
  registerUser,
  loginUser
};