/* global window */

const Utils = (() => {
    const isOnPage = (pageName) => {
        return window.location.pathname === `/${pageName}.html`;
    };

    const compare = (a, b) =>
        typeof a === "string" ? a.localeCompare(b) : a - b;

    const plural = (data) => data.length > 1 ? "s" : "";

    return { isOnPage, compare, plural };
})();
