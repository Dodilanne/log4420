/* global $, localStorage */
"use strict";

const cart = {
    content: JSON.parse(localStorage.getItem("cart")),

    updateCart: () => {
        cart.content = JSON.parse(localStorage.getItem("cart"));
        const nbOfItems = Object.keys(cart.content).length;
        $(".shopping-cart > .count").css(
            "visibility",
            nbOfItems < 1 ? "hidden" : "visible"
        );
        $(".shopping-cart > .count").html(nbOfItems.toString());
    },

    addItem: (item, qty = 1) => {
        const { id } = item;
        cart.content = {
            ...cart.content,
            [id]: {
                id,
                qty: cart.content[id] ? cart.content[id].qty + qty : qty,
            },
        };
        localStorage.setItem("cart", JSON.stringify(cart.content));
        cart.updateCart();
    },
    removeItem: (id) => {
        delete cart.content[id];
        localStorage.setItem("cart", JSON.stringify(cart.content));
        cart.updateCart();
    },
    clearCart: () => {
        localStorage.setItem("cart", JSON.stringify({}));
        cart.updateCart();
    },
    isEmpty: () => {
        return Object.keys(cart.content).length === 0;
    },
};
