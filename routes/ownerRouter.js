const express = require('express');
const router = express.Router();  // Create a router instance
const ownerModel = require('../models/owner-model');

if (process.env.NODE_ENV === "development") { //done to run route in development phase only 
    // and saving env variable in memory only
    console.log(process.env.NODE_ENV);
    router.post("/create", async function (req, res) {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res
                    .status(500)
                    .send("You don't have permission to create a new owner");
            }
            let { fullname, email, password } = req.body;
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });
            res.status(201).send(createdOwner);
        } catch (error) {
            console.error("Error creating owner:", error);
            res.status(500).send("An error occurred while creating the owner");
        }
    });

};



router.get('/', (req, res) => {
    res.send('Owners Page');
});




module.exports = router;  // Export the router
