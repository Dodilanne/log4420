const mongoose = require("mongoose");
const validator = require("validator");

const get = async () => {
    return mongoose.model("Order").find();
};

const getByID = async (id) => {
    return mongoose.model("Order").findOne({ id });
};

const create = async (order) => {
    const existingRecord = await getByID(order.id);
    if (!!existingRecord) return existingRecord;
    return mongoose.model("Order").create(order);
};

const deleteByID = async (id) => {
    return mongoose.model("Order").deleteOne({ id });
};

const deleteAll = async () => mongoose.model("Order").deleteMany({});
module.exports = {
    get,
    getByID,
    create,
    deleteByID,
    deleteAll,
};
