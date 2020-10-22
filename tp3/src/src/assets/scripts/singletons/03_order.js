/* global localStorage, Products */

const Order = (() => {
    let order;

    const backupToStorage = () => {
        if (!order) return;
        const stringifiedCart = JSON.stringify(order);
        localStorage.setItem("order", stringifiedCart);
    };

    const reset = () => {
        order = undefined;
        backupToStorage();
        return order;
    };

    const getFromStorage = () => {
        const stringifiedInstance = localStorage.getItem("cart");
        return JSON.parse(stringifiedInstance);
    };

    const get = () => {
        if (!order) {
            order = getFromStorage();
        }

        return order;
    };

    const set = (newOrder) => {
        order = newOrder;
        backupToStorage();
    };

    const clear = () => {
        reset();
        backupToStorage();
    };

    return {
        get,
        set,
        clear,
    };
})();
