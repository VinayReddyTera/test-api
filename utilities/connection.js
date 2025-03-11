const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;
Mongoose.set('strictQuery', true);
const url = process.env.MONGO_URL;

const salesForceData = Schema({
},{strict: false});

let collection = {}

collection.getData = () => {
    return Mongoose.connect(url).then((database)=>{
        return database.model('salesForceData',salesForceData)
    }).catch((error)=>{
        let err = new Error("Could not connect to database " + error);
        err.status = 500;
        throw err;
    })
}

module.exports = collection