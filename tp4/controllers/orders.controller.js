const mongoose = require("mongoose");



const get = async ({ orderID }) => {
    return await mongoose
    .model("Orders")
    .findById({ orderID });
};

module.exports = {
    get,
};
