const express = require('express');
const router = express.Router();  // Create a router instance

router.get('/', (req, res) => {
    res.send('user routes');
});


module.exports = router;  // Export the router
