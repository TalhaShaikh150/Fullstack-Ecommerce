const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const { connectDb } = require("./config/database");

//Bcrypt 
const bcrypt = require('bcrypt')

//Schemas
const { User } = require("./model/userSchema");

//Helping Functions
const { validateSignUp, validateLogin } = require("./lib/utils.js");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api Is Working!");
});

app.post("/signup", async (req, res) => {
  try {
    //First I have Created Another Helping Function To Validate This On API Level

    validateSignUp(req);

    //Now Check Is This Email Already Exist In Database

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User Already Exists With This Email!");
    }

    //Now Hashing Password Is Required

    const hashedPassword = await bcrypt.hash(password,10)
    

    const newUser = await User({
      name,
      email,
      password:hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ message: "SignUp Successfully", newUser});
  } catch (error) {
    res.status(400).send({ message: "Bad Request", error: error.message });
  }
});

app.post('/login',async(req,res)=>{
  try {
    validateLogin(req)
    
    const {email,password} = req.body

    //Checking By Email
    const user = await User.findOne({email})

    if(!user){
      throw new Error("Invalid Credentials")
    }
    
    //if Email Matches Only Then We Will Check Password 
    
    const isPasswordMatch = await bcrypt.compare(password,user.password)
    
    if(!isPasswordMatch){
      throw new Error("Invalid Credentials")
    }
    

    res.status(200).send({message:"Login Successfully!" ,user})
  } catch (error) {
    res.status(400).send({message:"Bad Request!",error:error.message})
  }
})

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
