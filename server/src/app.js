const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth"); 
const productRouter = require("./routes/products")
dotenv.config();

//Cookie Parser
const cookieParser = require("cookie-parser");

const { connectDb } = require("./config/database");

const app = express();

app.use(express.json());
app.use(cookieParser());




const PORT = process.env.PORT;

app.use("/api/auth", authRouter);

app.use("/api/products",productRouter)


app.get("/", (req, res) => {
  res.send("Api Is Working!");
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
