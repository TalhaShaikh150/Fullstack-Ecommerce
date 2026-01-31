const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

//Cookie Parser
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

const { connectDb } = require("./config/database");

//Bcrypt
const bcrypt = require("bcrypt");

//Schemas
const { User } = require("./model/userSchema");

//Helping Functions
const { validateSignUp, validateLogin } = require("./lib/utils.js");
const { AuthMiddleWare } = require("./middleware/auth.js");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api Is Working!");
});

//Profile Route
app.get("/profile", AuthMiddleWare, async (req, res) => {
  try {
    const {user} = req
    console.log(user)
    res.status(200).send({message:"User Profiled Fetch Successfully",user})
  } catch (error) {
    res.status(401).send({ message: "Unauthorized", error: error.message });
  }
});

//SignUp Route
app.post("/signup", async (req, res) => {
  try {
    //First I have Created Another Helping Function To Validate Signup On API Level

    validateSignUp(req);

    //Now Check Is This Email Already Exist In Database

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User Already Exists With This Email!");
    }

    //Now Hashing Password Is Required

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ message: "SignUp Successfully", newUser });
  } catch (error) {
    res.status(400).send({ message: "Bad Request", error: error.message });
  }
});
//Login Route
app.post("/login", async (req, res) => {
  try {
    validateLogin(req);
    
    const { email, password } = req.body;
    
    //Checking By Email
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    
    //if Email Matches Only Then We Will Check Password
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      throw new Error("Invalid Credentials");
    }
    
    //Now We Will Generate JWT Token

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    //Now Store Logged In Jwt Token On Cookies

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000), // 24 hours
    });
    
    res.status(200).send({ message: "Login Successfully!", user });
  } catch (error) {
    res.status(400).send({ message: "Bad Request!", error: error.message });
  }
});

//Logout Route
app.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now() * 0),
    });
    res.status(200).send({ message: "Logout Successfully!" });
  } catch (error) {
    res.status(400).send({ message: "Bad Request!", error: error.message });
  }
});

connectDb()
  .then(() => {
    console.log("Database Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server Is Running On Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database Connection Failed!${error}`);
  });
