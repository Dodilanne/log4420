const jsonProducts = require("../data/products.json");

const jsonToThumbnail = ({ id, name, price, image }) => {
  const validName = name.replace('"', ' pouces');
  return `<article id="product-${id}" class="product">
  <a href="./product.html">
    <div class="content-wrapper">
      <h2>${validName}</h2>
      <img alt="${validName}" src="./assets/img/${image}" />
      <h3>Prix courant: ${price}$</h3>
    </div>
  </a>
</article>`;
};

jsonProducts.forEach((product) => console.log(jsonToThumbnail(product)));
