/* global $ */

(() => {
    const getTemplate = ({ id, name, image, price }) => `<div class="product">
      <a href="./product.html?id=${id}" title="En savoir plus...">
        <h2>${name}</h2>
        <img alt="${name}" src="img/${image}">
        <p class="price"><small>Prix</small> ${price}&thinsp;$</p>
      </a>
    </div>`;

    const compareProducts = (a, b) =>
        typeof a === "string" ? a.localeCompare(b) : a - b;

    $(() => {
        if (!$("#products-list").length) return; // Not on products page

        let products = [];

        const getSortedProducts = () =>
            products.sort((p1, p2) => {
                const selectedFilter = $("#product-criteria button.selected");
                const sortingKey = selectedFilter.data("sorting-key");
                const sortingOrder = selectedFilter.data("sorting-order");
                const isASC = sortingOrder === "asc";
                const sortingArray = isASC
                    ? [p1[sortingKey], p2[sortingKey]]
                    : [p2[sortingKey], p1[sortingKey]];

                return compareProducts(...sortingArray);
            });

        const updateProducts = () => {
            $("#products-list").html(
                getSortedProducts().map(getTemplate).join("\n")
            );
        };

        $("#product-criteria button").on("click", ({ target }) => {
            if ($(target).hasClass("selected")) return; // Filter is already selected

            $("#product-criteria button").removeClass("selected");
            $(target).addClass("selected");
            updateProducts();
        });

        $.getJSON("data/products.json", (res) => {
            products = res;
            updateProducts();
        });
    });
})();
