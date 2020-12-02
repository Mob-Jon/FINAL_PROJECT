const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose
    // mongodb://localhost:27017/school_database
    // mongodb://dbSchool:<password>@schooladmin-shard-00-00.iy4fa.mongodb.net:27017,schooladmin-shard-00-01.iy4fa.mongodb.net:27017,schooladmin-shard-00-02.iy4fa.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-zwcg7t-shard-0&authSource=admin&retryWrites=true&w=majority
        .connect("mongodb://dbSchool:1012@schooladmin-shard-00-00.iy4fa.mongodb.net:27017,schooladmin-shard-00-01.iy4fa.mongodb.net:27017,schooladmin-shard-00-02.iy4fa.mongodb.net:27017/studentDB?ssl=true&replicaSet=atlas-zwcg7t-shard-0&authSource=admin&retryWrites=true&w=majority", {
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