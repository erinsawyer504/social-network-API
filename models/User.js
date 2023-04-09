// Import the Mongoose module
const { Schema, model } = require('mongoose');

// Define the User schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        // Validate that email matches a valid email address
        match: [/.+\@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            // Reference the Thought model
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            // Reference the User model for self-referencing
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

// Create a virtual property 'friendCount' that retrieves the length of the user's 'friends' array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Initialize the User model using the UserSchema
const User = model('User', UserSchema);

// Export the User model for use in other parts of the application
module.exports = User;
