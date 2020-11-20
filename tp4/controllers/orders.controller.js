const mongoose = require("mongoose");

const get = async () => {
    return await mongoose.model("Order").find();
};

const getByID = async ({ orderID }) => {
    return await mongoose.model("Order").findOne({ id: orderID });
};

const create = async ({ order }) => {
    //TODO validate order fields
    const existingRecord = await await mongoose
        .model("Order")
        .findOne({ id: order.id });
    if (existingRecord) return 400;
    return 201;
};

const deleteByID = async ({ orderID }) => {
    return await mongoose.model("Order").deleteOne({id: orderID});
};

const deleteAll = async () => mongoose.model("Order").deleteMany({});
module.exports = {
    get,
    getByID,
    create,
    deleteByID,
    deleteAll,
};
