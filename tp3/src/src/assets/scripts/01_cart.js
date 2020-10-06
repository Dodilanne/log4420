/* global $, localStorage */
"use strict";

var cart = {
    content: JSON.parse(localStorage.getItem("cart")),
    

    updateCart: () => {
        
        const nbOfItems = Object.keys(cart.content).length;
        console.log(`Items in cart: ${nbOfItems}`);
        $(".shopping-cart > .count").css("visibility", nbOfItems < 1 ? "hidden" : "visible");
        $("header .count").html(nbOfItems.toString());
    },

    addItem: (item) => {
        cart.content = {
            ...cart.content,
            [item.id]: item,
        };
        localStorage.setItem("cart", JSON.stringify(cart.content));
        cart.updateCart();
    },

    clearCart: () => {
        localStorage.setItem("cart", JSON.stringify({}));
        cart.updateCart()
    }
};
