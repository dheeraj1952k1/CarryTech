const express = require('express');
const userModels = require('../models/user-models');
const router = express.Router();  // Create a router instance

router.get('/', (req, res) => {
    res.send('user routes');
});

router.post('/register', async function(req,res){
    console.log('Register route hit');  // Debugging
try{
    let { email, password, fullname } = req.body;

    let user = await userModels.create({
        email,
        password,
        fullname,
    })
    console.log('User created:', user);  // Confirm success
    res.status(201).send(user);

}catch(err){
    console.error('Error:', err.message);  // Log any errors
    res.status(500).send('Internal Server Error');
}

})

module.exports = router;  // Export the router
