/* global $ */

(() => {
    const removeProduct = (id) => {
        cart.removeItem(id);
        $(".shopping-cart-table tr")
            .filter(function () {
                return $(this).data("product") === id;
            })
            .remove();
    };

    $(() => {
        if(cart.isEmpty) return;
        $(".shopping-cart-table button[title|='Supprimer']").on(
            "click",
            function () {
                var id = $(this).data("id");
                removeProduct(id);
            }
        );
        $("#emptyCart").on("click", function () {
            cart.clearCart();
            $(".shopping-cart-table tr").remove();
        });
    });
})();
