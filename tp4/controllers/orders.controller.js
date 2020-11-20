const mongoose = require("mongoose");

const get = async () => {
    return await mongoose
    .model("Order");
};

const getByID = async ({ orderID }) => {
    return await mongoose
    .model("Order")
    .findById({ orderID });
};

module.exports = {
    get,
    getByID,
};
