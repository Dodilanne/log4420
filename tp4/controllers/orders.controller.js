const mongoose = require("mongoose");



const get = async ({ orderID }) => {
    return await mongoose
    .model("Order")
    .findById({ orderID });
};

module.exports = {
    get,
};
