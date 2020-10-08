/* global $, window, cart*/

(() => {
    const emptyMessage = "<p>Aucun produits dans le panier</p>";
    const shoppingCartHead = `
    <tr>
      <th></th>
      <th>Produit</th>
      <th>Prix unitaire</th>
      <th>Quantité</th>
      <th>Prix</th>
    </tr>`;
    const getProductRow = (id, name, price, qty) => `<tr data-product="${id}">
  <td><button title="Supprimer" data-id="${id}"><i class="fa fa-times"></i></button></td>
  <td><a href="./product.html">${name}</a></td>
  <td>${price}&thinsp;$</td>
  <td>
    <div class="row">
      <div class="col">
        <button title="Retirer" disabled=""><i class="fa fa-minus"></i></button>
      </div>
      <div class="col">${qty}</div>
      <div class="col">
        <button title="Ajouter"><i class="fa fa-plus"></i></button>
      </div>
    </div>
  </td>
  <td>199,99&thinsp;$</td>
</tr>`;
    const getBuyRow = (
        total
    ) => `<p class="shopping-cart-total">Total: <strong>${total}&thinsp;$</strong></p>
        <a class="btn pull-right" href="./order.html">Commander <i class="fa fa-angle-double-right"></i></a>
        <button class="btn" id="emptyCart"><i class="fa fa-trash-o"></i>&nbsp; Vider le panier</button>`;
    const removeProduct = (id) => {
        cart.removeItem(id);
        $(".shopping-cart-table tr")
            .filter(function () {
                return $(this).data("product") === id;
            })
            .remove();
    };

    $(() => {
        if (window.location.pathname !== "/shopping-cart.html") return; // Not on products page
        if (cart.isEmpty()) {
            $(".shopping-cart-table").html(emptyMessage);
            return;
        }
        $("thead").html(shoppingCartHead);
        $("tbody").html(getProductRow("1", "test", "199.99", "4"));
        $(".shopping-cart-table").after(getBuyRow("199.99"));
        $(".shopping-cart-table button[title|='Supprimer']").on(
            "click",
            function () {
                const id = $(this).data("id");
                removeProduct(id);
            }
        );
        $("#emptyCart").on("click", function () {
            cart.clearCart();
            $(".shopping-cart-table tr").remove();
        });
    });
})();
