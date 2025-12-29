require('dotenv').config()
const mongoose = require('mongoose')

const dbConfig = async()=>{
     try {
         await mongoose.connect(process.env.DB_STRING)
         console.log("database successfully connected")
     } catch (error) {
        console.log("there is an error while connecting to database")
        console.log(error)
     }
}

module.exports = dbConfig;