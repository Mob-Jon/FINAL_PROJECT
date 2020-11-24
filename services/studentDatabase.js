const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose
        .connect("mongodb://localhost:27017/school_database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log("Connected to database");
        })
        .catch((error) => console.log(error));
};

module.exports = {
    connect: connectDatabase,
}