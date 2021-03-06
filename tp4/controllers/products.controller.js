const mongoose = require("mongoose");

const defaultProducts = require("../utils/constants/default-products");

const findOneByName = (name) => mongoose.model("Product").findOne({ name });

const findOneByID = (id) => mongoose.model("Product").findOne({ id });

const find = async (
    { category, sortingMethod } = {
        category: undefined,
        sortingMethod: { price: 1 },
    }
) => {
    let products = await mongoose
        .model("Product")
        .find(category ? { category } : undefined)
        .collation({ locale: "fr", strength: 2 })
        .sort(sortingMethod);

    return products || [];
};

const create = async (product) => {
    const existingRecord = await findOneByName(product.name);
    if (!!existingRecord) return existingRecord;
    return mongoose.model("Product").create(product);
};

const fillWithDefaults = async () => {
    const products = await Promise.all(
        defaultProducts.map((product) => create(product))
    );
    return products;
};

const deleteOne = (id) => mongoose.model("Product").deleteOne({ id });

const deleteAll = () => mongoose.model("Product").deleteMany({});

module.exports = {
    findOneByName,
    findOneByID,
    find,
    create,
    deleteOne,
    deleteAll,
    fillWithDefaults,
};
