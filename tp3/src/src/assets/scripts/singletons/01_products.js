/* global $, Utils */

const Products = (() => {
    let products = undefined;

    const fetch = (cb) => {
        console.log("fetch!");
        $.getJSON("data/products.json", (res) => {
            products = res;
            cb(products);
        });
    };

    const get = (cb) => {
        if (products) {
            cb(products);
        } else {
            fetch(cb);
        }
    };

    const getOne = (productID, cb) => {
        get((products) => {
            cb(products.find(({ id }) => id == productID));
        });
    };

    const getFiltered = (category, sortingKey, sortingOrder, cb) => {
        get((products) => {
            const filteredProducts =
                category === "all"
                    ? products
                    : products.filter(
                        (product) => product.category === category
                    );

            cb(
                filteredProducts.sort((p1, p2) => {
                    const isASC = sortingOrder === "asc";
                    const sortingArray = isASC
                        ? [p1[sortingKey], p2[sortingKey]]
                        : [p2[sortingKey], p1[sortingKey]];

                    return Utils.compare(...sortingArray);
                })
            );
        });
    };

    return {
        get,
        getOne,
        getFiltered,
    };
})();
