/* global $, Cart, Products, Templates, Utils */

const View = (() => {
    let dialogTimeout;

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
            Products.getFiltered(
                category,
                sortingKey,
                sortingOrder,
                (products) => {
                    $("#products-list").html(
                        products.map(Templates.products.product).join("\n")
                    );
                    $("#products-count").html(
                        `${products.length} produit${Utils.plural(products)}`
                    );
                }
            );
        },
    };

    const product = {
        showDialog: () => {
            $("#dialog").css("visibility", "visible");
            clearTimeout(dialogTimeout);
            dialogTimeout = setTimeout(() => {
                $("#dialog").css("visibility", "hidden");
            }, 5000);
        },
    };

    const shoppingCart = {
        updateList: () => {
            Products.get((products) => {
                const data = [];
                const { head, productRow, buyRow } = Templates.shoppingCart;
                $.each(Cart.get(), function (_index, element) {
                    const cartItem = products.find(
                        (product) => product.id == element.id
                    );
                    cartItem.qty = element.qty;
                    data.push(cartItem);
                });
                $("thead").html(head);
                $("tbody").html(data.map(productRow).join("\n"));
                $(".shopping-cart-table").after(buyRow(Cart.total()));
            });
        },
        updateItem: (id) => {
            const item = Cart.get()[id];
            Products.getOne(id, ({ price }) => {
                const selector = `.shopping-cart-table tr[data-product="${id}"]`;
                $(`${selector} .incrementor [action="removeItem"]`).prop(
                    "disabled",
                    item.qty < 2
                );
                $(`${selector} .incrementor .qty`).html(item.qty);
                $(`${selector} .total-amount`).html(
                    `${Utils.formatPrice(item.qty * price)}`
                );
            });
        },
        updateTotal: () => {
            $(".shopping-cart-total strong").html(
                `${Utils.formatPrice(Cart.total())}`
            );
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

    return { products, product, header, shoppingCart };
})();
