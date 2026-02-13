const mongoose = require('mongoose')


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB')
    })
    .catch((err)=>{
        console.log("error connection to db", err)
        process.exit(1)
    })
}

module.exports = connectDB