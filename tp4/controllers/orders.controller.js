const mongoose = require("mongoose");
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const get = async () => {
    return mongoose.model("Order").find();
};

const getByID = async ({ orderID }) => {
    return mongoose.model("Order").findOne({ id: orderID });
};

const create = async ({ order }) => {
    //TODO validate order fields
    if( !order.firstName || 
        !order.lastName || 
        !validateEmail(order.email) || 
        !validatePhone(order.phone) ||
        !validateProducts(order.products)
        ){
            return 400;
    }
    const existingRecord =  await getByID(order.id);
    if (existingRecord) return 400;
    return 201;
};

const deleteByID = async ({ orderID }) => {
    return mongoose.model("Order").deleteOne({id: orderID});
};

const deleteAll = async () => mongoose.model("Order").deleteMany({});
module.exports = {
    get,
    getByID,
    create,
    deleteByID,
    deleteAll,
};
