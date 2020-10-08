/* global $, window */

(() => {
    const getTemplate = ({ name }) => `<article>
        <h1>${name}</h1>
        <div class="row">
        <div class="col">
            <img id="product-image" alt="${name}" src="img/xbox-controller.png">
        </div>
        <div class="col">
            <section>
            <h2>Description</h2>
            <p>Manette pouvant être branchée à une console Xbox 360 et un PC. Cette manette vous permettra de jouer à
                vos jeux vidéo préférés.
                De plus, cette manette est sans fil et comporte un port pour casque d'écoute.</p>
            </section>
            <section>
            <h2>Caractéristiques</h2>
            <ul>
                <li>Manette sans fil 2.4GHz avec adapteur USB</li>
                <li>Compacte et ergonomique</li>
                <li>Port pour casque d'écoute pour Xbox Live</li>
            </ul>
            </section>
            <hr>
            <form class="pull-right">
            <label for="product-quantity">Quantité:</label>
            <input class="form-control" id="product-quantity" type="number" value="1" min="1">
            <button class="btn" title="Ajouter au panier" type="submit">
                <i class="fa fa-cart-plus"></i>&nbsp; Ajouter
            </button>
            </form>
            <p>Prix: <strong>29,99&thinsp;$</strong></p>
        </div>
        </div>
    </article>`;

    const notFoundTemplate = () => "<h1>Page non trouvée!</h1>";

    const getURLParam = (name) => {
        const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(
            window.location.href
        );
        return results ? results[1] : undefined;
    };

    $(() => {
        if (window.location.pathname !== "/product.html") return; // Not on products page

        let globalProduct = undefined;
        const id = getURLParam("id");

        const updateProduct = () => {
            $("main").html(
                globalProduct && globalProduct.id
                    ? getTemplate(globalProduct)
                    : notFoundTemplate
            );
        };

        if (id) {
            $.getJSON("data/products.json", (res) => {
                const product = res.find((p) => p.id === parseInt(id));
                globalProduct = product;
                updateProduct();
            });
        } else {
            updateProduct();
        }
    });
})();
