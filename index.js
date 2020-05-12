const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
/* While using below require please be cautious about order
that you want to execute because some operations will be dependent on modules
coming after them */
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

// mongoose recommends adding useNewUrlParser and useUnifiedTopology
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 100,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Below line figures out PORT number from underlying environment
const PORT = process.env.PORT || 5000;

authRoutes(app);

app.listen(PORT, () => {
    console.log(`Server running on : localhost:${PORT}`);
});