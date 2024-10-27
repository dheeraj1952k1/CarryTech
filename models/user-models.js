const mongoose  = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:12707/carryTech');

const userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
    isAdmin:Boolean,
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String
})


module.exports = mongodb.model('user',userSchema);
