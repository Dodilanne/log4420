/* global $, Utils, Cart, View, Products */

(() => {
    $(() => {
        if (!Utils.isOnPage("shopping-cart")) return;

        const view = View.shoppingCart;

        if (Cart.isEmpty()) {
            view.showEmpty();
            return;
        }

        $("main").on(
            "click",
            ".shopping-cart-table button[title|='Supprimer']",
            function () {
                const id = $(this).data("id");
                Cart.removeItem(id);
                view.removeItem(id);
                View.header.updateCount();
            }
        );

        ["removeItem", "addItem"].forEach((action) => {
            $("main").on("click", `.incrementor [action="${action}"]`, (e) => {
                e.preventDefault();
                e.stopPropagation();
                const productID = $(e.currentTarget)
                    .parents(".incrementor")
                    .first()
                    .data("id");
                if (productID) {
                    const shouldRemove = Cart[action](productID, 1);
                    if (shouldRemove) {
                        view.removeItem(productID);
                    } else {
                        view.updateQty(productID);
                    }
                    View.header.updateCount();
                }
            });
        });

        $("main").on("click", "#emptyCart", function () {
            Cart.clear();
            view.clear();
            View.header.updateCount();
        });

        view.updateList();
    });
})();
