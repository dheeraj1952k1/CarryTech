// Import dependencies
const mongoose = require('mongoose');
const config = require('config');  // Ensure 'config' library is installed
const dbgr = require('debug')('development:mongoose'); // Debug namespace

// Fetch MONGODB_URI from the config file
const uri = config.get("MONGODB_URI",{
    ssl: false,
});

// Establish the mongoose connection with the dynamic URI
mongoose
    .connect(`${uri}/carryTech`)
    .then(() => dbgr('Connected to MongoDB!'))
    .catch((err) => dbgr(`MongoDB connection error: ${err.message}`));

// Export the mongoose connection
module.exports = mongoose.connection;
