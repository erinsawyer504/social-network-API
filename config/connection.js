const mongoose = require('mongoose');
const { connect, connection } = mongoose;

const connectionString =
    process.env.MONGODB_URI || 'mongodb://localhost/social-network-api';

connect(connectionString, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
});

mongoose.set('debug', true);

module.exports = connection;
