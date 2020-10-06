/* global $, localStorage */

(() => {
    const getCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            localStorage.setItem("cart", JSON.stringify({}));
        }

        return cart || {};
    };

    const onCartUpdate = () => {
        const cart = getCart();
        const nbOfItems = Object.keys(cart).length;
        console.log(`Items in cart: ${nbOfItems}`);

        $(".shopping-cart > .count").css("visibility", nbOfItems < 1 ? "hidden" : "visible");
        $("header .count").html(nbOfItems.toString());
    };

    const addItem = (item) => {
        const cart = {
            ...getCart(),
            [item.id]: item,
        };
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const clearCart = () => {
        localStorage.setItem("cart", JSON.stringify({}));
    };

    $(() => {
        console.log("Hello from the cart.js script! ");

        clearCart();

        onCartUpdate();

        // Test loop (TODO: Remove it)
        let id = 1;
        setTimeout(() => {
            const interval = setInterval(() => {
                if (id === 10) clearInterval(interval);

                addItem({ id, name: `Product ${id}` });
                id += 1;
                onCartUpdate();
            }, 1000);
        }, 2000);
    });
})();
