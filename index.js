const express = require('express');
const app = express();

// Below line figures out PORT number from underlying environment
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('My App is Working. Hurray!!!');
});

app.listen(PORT, () => {
    console.log(`Server running on : ${PORT}`);
});