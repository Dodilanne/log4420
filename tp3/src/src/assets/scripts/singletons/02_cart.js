/* global localStorage, Products */

const Cart = (() => {
    let cart;

    const backupToStorage = () => {
        if (!cart) return;
        const stringifiedCart = JSON.stringify(cart);
        localStorage.setItem("cart", stringifiedCart);
    };

    const reset = () => {
        cart = {};
        backupToStorage();
        return cart;
    };

    const getFromStorage = () => {
        const stringifiedInstance = localStorage.getItem("cart");
        return JSON.parse(stringifiedInstance);
    };

    const get = () => {
        if (!cart) {
            cart = getFromStorage();
            if (!cart) {
                reset();
            }
        }

        return cart;
    };

    const count = () =>
        Object.values(get()).reduce((prevCount, { qty }) => prevCount + qty, 0);

    const total = () =>
        Object.values(get())
            .reduce((prevTotal, { qty, price }) => qty * price + prevTotal, 0)
            .toFixed(2);

    const addItem = (id, price, qty = 1) => {
        get();
        cart = {
            ...cart,
            [id]: {
                id,
                price,
                qty: cart[id] ? cart[id].qty + qty : qty,
            },
        };
        backupToStorage();
    };

    const removeItem = (id, _price, qty = undefined) => {
        get();
        if (!cart[id]) return;
        const currQty = cart[id].qty;
        if (!qty || qty >= currQty) {
            delete cart[id];
        } else {
            cart[id].qty -= qty;
        }
        backupToStorage();
    };

    const clear = () => {
        reset();
        backupToStorage();
    };

    const isEmpty = () => Object.keys(cart).length === 0;

    return {
        get,
        count,
        total,
        addItem,
        removeItem,
        clear,
        isEmpty,
    };
})();
