const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    full_name : "String",
    email : "String",
    pw : "String",

})
module.exports = 
    mongoose.model('User',userSchema)