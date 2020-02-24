const mongoose = require("mongoose");
const uri =process.env.DB;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', (e) => {
    console.error('MongoDB connection error', e.message);
});
db.on('open', () => {
    console.log('DB Connection established successfully');
});

module.exports = db;