const mongoose = require('mongoose')

const url = `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@cluster.ydjksgw.mongodb.net/${process.env.DATABASE_NAME}`

const connectDb = async()=>{
  await mongoose.connect(url)
}

module.exports = {
  connectDb
}