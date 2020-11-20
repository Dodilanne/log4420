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

const create = async ({order}) =>{
    const existingRecord = await await mongoose
    .model("Order")
    .findOne({id: order.id});
    if (existingRecord) return existingRecord;
    return mongoose.model("Order").create(order);
}
module.exports = {
    get,
    getByID,
    create
};
