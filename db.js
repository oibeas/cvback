const mongoose = require('mongoose');

const mongoDB = process.env.mongoDB
const urlMongo = mongoDB;

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(urlMongo, config);