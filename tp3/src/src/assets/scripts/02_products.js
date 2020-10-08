/* global $, window */

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
        if (window.location.pathname !== "/products.html") return; // Not on products page

        let globalProducts = [];

        const getSortedProducts = (products = globalProducts) => {
            const selectedFilter = $("#product-criteria button.selected");

            return products.sort((p1, p2) => {
                const sortingKey = selectedFilter.data("sorting-key");
                const sortingOrder = selectedFilter.data("sorting-order");
                const isASC = sortingOrder === "asc";
                const sortingArray = isASC
                    ? [p1[sortingKey], p2[sortingKey]]
                    : [p2[sortingKey], p1[sortingKey]];

                return compareProducts(...sortingArray);
            });
        };

        const getFilteredProducts = (products = globalProducts) => {
            const selectedFilter = $("#product-categories button.selected");
            const category = selectedFilter.data("category");

            if (category === "all") return products;

            return products.filter((product) => product.category === category);
        };

        const updateProducts = () => {
            const products = getSortedProducts(getFilteredProducts());
            $("#products-list").html(products.map(getTemplate).join("\n"));
            $("#products-count").html(
                `${products.length} produit${products.length > 1 ? "s" : ""}`
            );
        };

        ["#product-criteria button", "#product-categories button"].forEach(
            (filterGroup) => {
                $(filterGroup).on("click", ({ target }) => {
                    if ($(target).hasClass("selected")) return; // Filter is already selected

                    $(filterGroup).removeClass("selected");
                    $(target).addClass("selected");
                    updateProducts();
                });
            }
        );

        $.getJSON("data/products.json", (res) => {
            globalProducts = res;
            updateProducts();
        });
    });
})();
