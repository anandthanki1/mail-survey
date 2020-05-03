const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

// mongoose recommends adding useNewUrlParser and useUnifiedTopology
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

// Below line figures out PORT number from underlying environment
const PORT = process.env.PORT || 5000;

authRoutes(app);

app.listen(PORT, () => {
    console.log(`Server running on : ${PORT}`);
});