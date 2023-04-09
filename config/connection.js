const { connect, connection } = require('mongoose');


const connectionString =
    process.env.MONGODB_URI || 'mongodb://localhost/social-network-api';

connect(connectionString, {
    useFindAndModify: false,
    useNewUrlParser: true,  
    useUnifiedTopology: true,
});

mongoose.set('debug', true);

module.exports = connection;
