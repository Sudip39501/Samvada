const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const dbConnect = require('./config/dbConnect');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route');
const app = express();


//middleware 
//parse incoming request bodies
app.use(express.json()); 
//parse cookies
app.use(cookieParser()); 
//parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/test', (req, res) => {
    res.send('backend is working');
});


//routes
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${PORT}`);
});