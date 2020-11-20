const mongoose = require("mongoose");

const get = async () => {
    return await mongoose
    .model("Order").find();
};

const getByID = async ({ orderID }) => {
    return await mongoose
    .model("Order")
    .findOne({id: orderID});
};

module.exports = {
    get,
    getByID,
};
