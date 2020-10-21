/* global window */

const Utils = (() => {
    const isOnPage = (pageName) => {
        return window.location.pathname === `/${pageName}.html`;
    };

    const redirect = (pageName) => {
        return window.location.replace(`/${pageName}.html`);
    };

    const compare = (a, b) =>
        typeof a === "string" ? a.localeCompare(b) : a - b;

    const plural = (data) => (data.length > 1 ? "s" : "");

    const formatPrice = (price) =>
        `${parseFloat(price).toFixed(2).replace(".", ",")}&thinsp;$`;

    return { isOnPage, redirect, compare, plural, formatPrice };
})();
