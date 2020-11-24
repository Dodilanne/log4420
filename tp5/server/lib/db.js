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

// TODO: Modifier le connect string par le votre!
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.ntgsa.mongodb.net/online_shop?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
