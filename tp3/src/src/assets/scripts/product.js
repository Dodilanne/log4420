/* global $, window, Cart, View, Products, Templates, Utils */

(() => {
    const getURLParam = (name) => {
        const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(
            window.location.href
        );
        return results ? results[1] : undefined;
    };

    $(() => {
        if (!Utils.isOnPage("product")) return;

        const id = getURLParam("id");

        if (id) {
            Products.getOne(id, (product) => {
                if (product && product.id) {
                    $("main").html(Templates.product.product(product));
                    $("main").on("submit", "#add-to-cart-form", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const qty = Number($("#product-quantity").val()) || 1;
                        Cart.addItem(product.id, product.price, qty);
                        View.header.updateCount();
                        View.product.showDialog();
                    });
                } else {
                    $("main").html(Templates.product.notFound());
                }
            });
        } else {
            Utils.redirect("products");
        }
    });
})();
