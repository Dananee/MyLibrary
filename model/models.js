const mongoose = require('mongoose')

const authorShema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('AuthorShema',authorShema)