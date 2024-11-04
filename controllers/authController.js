const userModels = require('../models/user-models');//requiring database
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
//Requiring utils
const { generateToken } = require('../utils/generateToken');



// Define Joi schema for validation
const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.empty': 'Password is required',
    }),
    fullname: Joi.string().min(3).max(30).required().messages({
        'string.min': 'Full name must be at least 3 characters',
        'string.max': 'Full name must not exceed 30 characters',
        'string.empty': 'Full name is required',
    })
});

//register routes
module.exports.registerUser = async function (req, res) {
    // console.log('Register route hit');  // Debugging

    // Validate request body with Joi
    const { error } = userSchema.validate(req.body);

    if (error) {
        // Send validation error response if validation fails
        return res.status(400).send({ error: error.details[0].message });
    }

    try {
        let { email, password, fullname } = req.body;

       let user = await userModels.findOne({email:email})
       if(user)return res.status(401).send("You already have an accoun. please login!")

        //hashing password
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    // Create a new user in the database
                    let user = await userModels.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("user created successfully");
                }
            })
        })


    } catch (err) {
        console.error('Error:', err.message);  // Log any errors
        res.status(500).send('Internal Server Error');
    }
}


//Login User
// Login User
module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModels.findOne({ email: email }); // Fixed typo here as well

    // If user not found
    if (!user) {
        req.flash("error", "Email Password Incorrect.");
        return res.redirect("/");
    }

    // If user is available
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = generateToken(user); // Corrected the typo here
            res.cookie("token", token);
            res.redirect("/shop");
        } else {
            req.flash("error", "Email Password Incorrect.");
            return res.redirect("/");
        }
    });
};


module.exports.logout = function(req, res){
    res.cookie("token", "");
    res.redirect('/');
}

//User page
module.exports.user = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/");
        } else {
            let error = req.flash("error");
            res.render("user.ejs", { user, logedin: true, error });
        }
    } catch (error) {
        req.flash("error", "Somthing went Wrong.");
        return res.redirect("/");
    }
};


//Uploading Profile pic
module.exports.userupload = async function (req, res) {
    const buffer = req.file.buffer;
    await userModel.findOneAndUpdate(
        { email: req.user.email },
        { picture: buffer },
        { new: true }
    );

    res.redirect("/users/profile");
};

module.exports.user;