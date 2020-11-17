"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        id: { type: Number, unique: true },
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        products: Array,
    },
    { versionKey: false }
);

const Product = new Schema(
    {
        id: { type: Number, unique: true },
        name: String,
        price: Number,
        image: String,
        category: String,
        description: String,
        features: Array,
    },
    { versionKey: false }
);

mongoose.model("Order", Order);
mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

const { DB_HOST, DB_NAME, DB_USER, DB_PWD } = process.env;
const dbURL = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
//mongoose.connect("mongodb://...", { useMongoClient: true });
