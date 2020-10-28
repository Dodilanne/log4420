/* global localStorage, Products */

/*
interface Order {
    orderID: number;
    firstName: string;
    lastName: string;
}
*/

const Order = (() => {
    const defaultState = { orderID: 0 };

    let order = defaultState;

    const backupToStorage = () => {
        if (!order) return;
        const stringifiedCart = JSON.stringify(order);
        localStorage.setItem("order", stringifiedCart);
    };

    const reset = () => {
        order = defaultState;
        backupToStorage();
        return order;
    };

    const getFromStorage = () => {
        const stringifiedInstance = localStorage.getItem("order");
        return JSON.parse(stringifiedInstance);
    };

    const get = () => {
        if (order.orderID < 1) {
            order = getFromStorage() || defaultState;
        }

        return order;
    };

    const set = ({ firstName, lastName }) => {
        get();
        order = {
            orderID: order.orderID + 1,
            firstName,
            lastName,
        };
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
