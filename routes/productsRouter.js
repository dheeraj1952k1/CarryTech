const express = require('express');
const router = express.Router();  // Create a router instance

router.get('/', (req, res) => {
    res.send('producta Page');
});


module.exports = router;  // Export the router
