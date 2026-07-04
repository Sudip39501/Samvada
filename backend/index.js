const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const dbConnect = require('./config/dbConnect');

const app = express();
//middleware 
//parse incoming request bodies
app.use(express.json()); 
//parse cookies
app.use(cookieParser()); 

app.get('/test', (req, res) => {
    res.send('backend is working');
});






app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${PORT}`);
});