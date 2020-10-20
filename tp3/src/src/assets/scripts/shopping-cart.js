/* global $, Utils, Cart, View, Products, confirm */

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
                const shouldProceed = confirm(
                    "Voulez-vous supprimer le produit du panier?"
                );
                if (!shouldProceed) return;
                const id = $(this).data("id");
                Cart.removeItem(id);
                view.removeItem(id);
                view.updateTotal();
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
                const product = Cart.get()[productID];
                const removingLastItem =
                    action === "removeItem" && product && product.qty < 2;
                if (removingLastItem) return;

                Cart[action](productID, 1);
                view.updateItem(productID);
                view.updateTotal();
                View.header.updateCount();
            });
        });

        $("main").on("click", "#emptyCart", function () {
            const shouldProceed = confirm(
                "Voulez-vous supprimer tous les produits du panier ?"
            );
            if (!shouldProceed) return;
            Cart.clear();
            view.clear();
            View.header.updateCount();
        });

        view.updateList();
    });
})();
