/* global $, Order, Utils, View */

(() => {
    $(() => {
        if (!Utils.isOnPage("confirmation")) return;

        const order = Order.get();
        if (order.orderID < 1) {
            console.log("No order found");
            Utils.redirect("shopping-cart");
        } else {
            View.confirmation.updateMessage(order);
        }
    });
})();
