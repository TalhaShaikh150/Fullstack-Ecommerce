const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const {connectDb}=  require("./config/database")
const {User} = require("./model/userSchema")


const app = express()

const PORT = process.env.PORT

app.get('/add',(req,res) =>{
res.send("Api Is Working!")
})


connectDb().then(()=>{
  console.log("Database Connected Successfully!")
  app.listen(PORT,()=>{
    console.log(`Server Is Running On Port ${PORT}`)
  })
})
.catch((error)=>{
  console.log(`Database Connection Failed!${error}`)
})