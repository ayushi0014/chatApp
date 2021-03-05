const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

const connectDb = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    .then(() => console.log('MongoDb connected'))
    .catch(error => console.error(`Failed to connect to MongoDb: ${error}`));

    mongoose.Promise = global.Promise;
}

module.exports = connectDb;