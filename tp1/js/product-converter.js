const jsonProducts = require("../data/products.json");

const jsonToThumbnail = ({ id, name, price, image }) => {
  return `<article id="product-${id}" class="product">
  <a href="./product.html">
    <div class="content-wrapper">
      <h2>${name}</h2>
      <img alt="${name}" src="./assets/img/${image}" />
      <h3>${price}$</h3>
    </div>
  </a>
</article>`;
};

jsonProducts.forEach((product) => console.log(jsonToThumbnail(product)));
