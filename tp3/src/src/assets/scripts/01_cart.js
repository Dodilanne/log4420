/* global $, localStorage */
"use strict";

var cart = {
    content: JSON.parse(localStorage.getItem("cart")),
    

    updateCart: () => {
        cart.content =  JSON.parse(localStorage.getItem("cart"));
        const nbOfItems = Object.keys(cart.content).length;
        console.log(`Items in cart: ${nbOfItems}`);
        $(".shopping-cart > .count").css("visibility", nbOfItems < 1 ? "hidden" : "visible");
        $(".shopping-cart > .count").html(nbOfItems.toString());
    },

    addItem: (item) => {
        cart.content = {
            ...cart.content,
            [item.id]: item,
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
    isEmpty: () => { return Object.keys(cart.content).length === 0 }
    
};
