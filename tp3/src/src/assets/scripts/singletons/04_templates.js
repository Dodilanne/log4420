/* global Utils */

const Templates = (() => {
    const mainNav = [
        { title: "Accueil", pathname: "index" },
        { title: "Produits", pathname: "products" },
        { title: "Contact", pathname: "contact" },
    ];

    const common = {
        header: () => `<div class="header-container">
          <div class="logo">
            <a href="./index.html">
              <img alt="logo" src="img/logo.svg" title="Accueil">
            </a>
          </div>
          <nav>
            <ul>
              ${mainNav
                  .map(({ title, pathname }) => {
                      const isActive =
                          Utils.isOnPage(pathname) ||
                          (pathname === "products" &&
                              Utils.isOnPage("product"));
                      return `<li ${
                          isActive ? 'class="active"' : ""
                      }><a href="./${pathname}.html">${title}</a></li>`;
                  })
                  .join("")}
              <li>
                <a class="shopping-cart" href="./shopping-cart.html" title="Panier">
                  <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x fa-inverse"></i>
                    <i class="fa fa-shopping-cart fa-stack-1x"></i>
                  </span>
                  <span class="count">3</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>`,
        footer: () => "<p>Par Pablo Chaussé-Cossio et Vincent Audet</p>",
    };

    const products = {
        product: ({ id, name, image, price }) => `<div class="product">
          <a href="./product.html?id=${id}" title="En savoir plus...">
            <h2>${name}</h2>
            <img alt="${name}" src="img/${image}">
            <p class="price"><small>Prix</small> ${Utils.formatPrice(price)}</p>
          </a>
        </div>`,
    };

    const product = {
        product: ({ name, image, description, features, price }) => `<article>
            <h1 id="product-name">${name}</h1>
            <div class="row">
            <div class="col">
                <img id="product-image" alt="${name}" src="img/${image}">
            </div>
            <div class="col">
                <section>
                <h2>Description</h2>
                <p id="product-desc">${description}</p>
                </section>
                <section>
                <h2>Caractéristiques</h2>
                <ul id="product-features">${features
                    .map((feature) => `<li>${feature}</li>`)
                    .join("")}</ul>
                </section>
                <hr>
                <form id="add-to-cart-form" class="pull-right">
                <label for="product-quantity">Quantité:</label>
                <input class="form-control" id="product-quantity" type="number" value="1" min="1">
                <button class="btn" title="Ajouter au panier" type="submit">
                    <i class="fa fa-cart-plus"></i>&nbsp; Ajouter
                </button>
                </form>
                <p id="product-price">Prix: <strong>${Utils.formatPrice(
                    price
                )}</strong></p>
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
        empty: () => "<p>Aucun produit dans le panier.</p>",
        productRow: ({ id, name, price, qty }) => `<tr data-product="${id}">
          <td><button title="Supprimer" class="remove-item-button" data-id="${id}"><i class="fa fa-times"></i></button></td>
          <td><a href="./product.html?id=${id}">${name}</a></td>
          <td class="unit-price">${Utils.formatPrice(price)}</td>
          <td>
            <div data-id="${id}" class="row incrementor">
              <div class="col">
                <button title="Retirer" action="removeItem" ${
                    qty < 2 ? "disabled" : ""
                } class="remove-quantity-button"><i class="fa fa-minus"></i></button>
              </div>
              <div class="col qty quantity">${qty}</div>
              <div class="col">
                <button title="Ajouter" action="addItem" class="add-quantity-button"><i class="fa fa-plus"></i></button>
              </div>
            </div>
          </td>
          <td class="price">${Utils.formatPrice(qty * price)}</td>
        </tr>`,
        buyRow: (total) => `<p id="total-amount" class="shopping-cart-total">
            Total: <strong>${Utils.formatPrice(total)}</strong>
        </p>
        <a class="btn pull-right" href="./order.html">Commander <i class="fa fa-angle-double-right"></i></a>
        <button class="btn remove-all-items-button" id="emptyCart"><i class="fa fa-trash-o"></i>&nbsp; Vider le panier</button>`,
    };

    const confirmation = {
        message: ({ firstName, lastName, orderID }) => `<article>
            <h1>Votre commande est confirmée ${firstName} ${lastName}!</h1>
            <p>
                Votre numéro de confirmation est le <strong>${orderID}</strong>.
            </p>
        </article>`,
    };

    return {
        common,
        products,
        product,
        shoppingCart,
        confirmation,
    };
})();
