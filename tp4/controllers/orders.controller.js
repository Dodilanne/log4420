const mongoose = require("mongoose");
const validator = require("validator");

const get = async () => {
    return mongoose.model("Order").find();
};

const getByID = async ({ orderID }) => {
    return mongoose.model("Order").findOne({ id: orderID });
};

const create = async ({ order }) => {
    //TODO validate order products await validateProducts({ products: order.products })
    if (
        validator.isEmpty(order.firstName + "") ||
        !validator.isAlphanumeric(order.firstName + "") ||
        validator.isEmpty(order.lastName + "") ||
        !validator.isAlphanumeric(order.lastName + "") ||
        !validator.isEmail(order.email + "") ||
        !validator.isMobilePhone(order.phone + "")
    ) {
        return 400;
    }
    const existingRecord = await getByID({ orderID: order.id });
    if (!!existingRecord) return 400;
    mongoose.model("Order").create(order);
    return 201;
};

const deleteByID = async ({ orderID }) => {
    return mongoose.model("Order").deleteOne({ id: orderID });
};

const deleteAll = async () => mongoose.model("Order").deleteMany({});
module.exports = {
    get,
    getByID,
    create,
    deleteByID,
    deleteAll,
};
