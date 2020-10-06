/* global $ */

(() => {
    const getTemplate = ({ id, name, image, price }) => `<a
      href="./product.html?id=${id}"
      title="En savoir plus..."
      class="col hoverable">
      <h3>${name}</h3>
      <img
      alt="${name}"
      src="img/${image}"
      />
      <p><small>Prix</small> ${price}&thinsp;$</p>
      </a>`;

    $(() => {
        if (!$("#products-list").length) return; // Not on products page

        let products = [];

        const renderProducts = (sortingKey, sortingOrder) => {
            const sortedProducts = products.sort((p1, p2) =>
                sortingOrder === "asc"
                    ? p1[sortingKey] - p2[sortingKey]
                    : p2[sortingKey] - p1[sortingKey]
            );

            $("#products-list").html(
                sortedProducts.map(getTemplate).join("\n")
            );
        };

        $.getJSON("data/products.json", (res) => {
            products = res;
            renderProducts("price", "desc");
        });
    });
})();
