const mongoose = require('mongoose');
const { Schema } = mongoose;

// We can add or remove properties in the Schema as we need.
const userSchema = new Schema({
    googleId: String
});

// Below statement creates a collection name "Users" in MongoDb
mongoose.model('users', userSchema);