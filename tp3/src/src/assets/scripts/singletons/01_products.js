/* global $, Utils */

const Products = (() => {
    let products = [];

    const fetch = () => {
        $.getJSON("data/products.json", (res) => {
            products = res;
        });
    };

    const get = () => products || [];

    const getOne = (productID) => get().find(({ id }) => id == productID);

    const getFiltered = (category, sortingKey, sortingOrder) => {
        const filteredProducts =
            category === "all"
                ? products
                : products.filter((product) => product.category === category);

        return filteredProducts.sort((p1, p2) => {
            const isASC = sortingOrder === "asc";
            const sortingArray = isASC
                ? [p1[sortingKey], p2[sortingKey]]
                : [p2[sortingKey], p1[sortingKey]];

            return Utils.compare(...sortingArray);
        });
    };

    fetch();

    return {
        get,
        getOne,
        getFiltered,
    };
})();
