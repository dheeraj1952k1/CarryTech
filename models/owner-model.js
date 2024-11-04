const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:12707/carryTech');

const ownerSchema = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    email: String,
    password: String,
    products:{
        type:Array,
        default:[]
    },
    picture: String,
    gstin:String,
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model('owner', ownerSchema);
