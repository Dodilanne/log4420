/* global $, Cart, Products, Templates, Utils */

const View = (() => {
    const header = {
        updateCount: () => {
            const selector = ".shopping-cart > .count";
            const count = Cart.count();
            $(selector).css("visibility", count < 1 ? "hidden" : "visible");
            $(selector).html(count.toString());
        },
    };

    const products = {
        updateList: () => {
            const category = $("#product-categories button.selected").data(
                "category"
            );
            const sortingKey = $("#product-criteria button.selected").data(
                "sorting-key"
            );
            const sortingOrder = $("#product-criteria button.selected").data(
                "sorting-order"
            );
            const products = Products.getFiltered(
                category,
                sortingKey,
                sortingOrder
            );
            $("#products-list").html(
                products.map(Templates.products.product).join("\n")
            );
            $("#products-count").html(
                `${products.length} produit${Utils.plural(products)}`
            );
        },
    };

    const shoppingCart = {
        updateList: () => {
            const data = [];
            const { head, productRow, buyRow } = Templates.shoppingCart;
            $.each(Cart.get(), function (_index, element) {
                const cartItem = Products.get().find(
                    (product) => product.id == element.id
                );
                cartItem.qty = element.qty;
                data.push(cartItem);
            });
            $("thead").html(head);
            $("tbody").html(data.map(productRow).join("\n"));
            $(".shopping-cart-table").after(buyRow(Cart.total()));
        },
        updateQty: (id) => {
            $(
                `.shopping-cart-table tr[data-product="${id}"] .incrementor .qty`
            ).html(Cart.get()[id].qty);
        },
        removeItem: (id) => {
            $(`.shopping-cart-table tr[data-product="${id}"]`).remove();
            if (Cart.isEmpty()) shoppingCart.clear();
        },
        clear: () => {
            $(".shopping-cart-table").nextAll().remove();
            shoppingCart.showEmpty();
        },
        showEmpty: () => {
            $(".shopping-cart-table").html(Templates.shoppingCart.empty());
        },
    };

    return { products, header, shoppingCart };
})();
