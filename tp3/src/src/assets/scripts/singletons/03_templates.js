const Templates = (() => {
    const products = {
        product: ({ id, name, image, price }) => `<div class="product">
          <a href="./product.html?id=${id}" title="En savoir plus...">
            <h2>${name}</h2>
            <img alt="${name}" src="img/${image}">
            <p class="price"><small>Prix</small> ${price}&thinsp;$</p>
          </a>
        </div>`,
    };

    const product = {
        product: ({ name, image, description, features, price }) => `<article>
            <h1>${name}</h1>
            <div class="row">
            <div class="col">
                <img id="product-image" alt="${name}" src="img/${image}">
            </div>
            <div class="col">
                <section>
                <h2>Description</h2>
                <p>${description}</p>
                </section>
                <section>
                <h2>Caractéristiques</h2>
                <ul>${features.map((feature) => `<li>${feature}</li>`)}</ul>
                </section>
                <hr>
                <form id="add-to-cart-form" class="pull-right">
                <label for="product-quantity">Quantité:</label>
                <input class="form-control" id="product-quantity" type="number" value="1" min="1">
                <button class="btn" title="Ajouter au panier" type="submit">
                    <i class="fa fa-cart-plus"></i>&nbsp; Ajouter
                </button>
                </form>
                <p>Prix: <strong>${price}&thinsp;$</strong></p>
            </div>
            </div>
        </article>`,
        notFound: () => "<h1>Page non trouvée!</h1>",
    };

    const shoppingCart = {
        head: () => `<tr>
          <th></th>
          <th>Produit</th>
          <th>Prix unitaire</th>
          <th>Quantité</th>
          <th>Prix</th>
        </tr>`,
        empty: () => "<p>Aucun produits dans le panier</p>",
        productRow: ({ id, name, price, qty }) => `<tr data-product="${id}">
          <td><button title="Supprimer" data-id="${id}"><i class="fa fa-times"></i></button></td>
          <td><a href="./product.html">${name}</a></td>
          <td>${price}&thinsp;$</td>
          <td>
            <div data-id="${id}" class="row incrementor">
              <div class="col">
                <button title="Retirer" action="removeItem"><i class="fa fa-minus"></i></button>
              </div>
              <div class="col qty">${qty}</div>
              <div class="col">
                <button title="Ajouter" action="addItem"><i class="fa fa-plus"></i></button>
              </div>
            </div>
          </td>
          <td>${(qty * price).toFixed(2)}&thinsp;$</td>
        </tr>`,
        buyRow: (total) => `<p class="shopping-cart-total">
            Total: <strong>${total}&thinsp;$</strong>
        </p>
        <a class="btn pull-right" href="./order.html">Commander <i class="fa fa-angle-double-right"></i></a>
        <button class="btn" id="emptyCart"><i class="fa fa-trash-o"></i>&nbsp; Vider le panier</button>`,
    };

    return {
        products,
        product,
        shoppingCart,
    };
})();
