// require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.log('Database connection failed', err);
        process.exit(1);
    });
};

module.exports = dbConnect;