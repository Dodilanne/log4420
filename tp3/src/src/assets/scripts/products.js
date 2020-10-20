/* global $, Utils, Products, View */

(() => {
    $(() => {
        if (!Utils.isOnPage("products")) return;

        ["#product-criteria button", "#product-categories button"].forEach(
            (filterGroup) => {
                $(filterGroup).on("click", ({ target }) => {
                    if ($(target).hasClass("selected")) return; // Filter is already selected
                    $(filterGroup).removeClass("selected");
                    $(target).addClass("selected");
                    View.products.updateList();
                });
            }
        );

        View.products.updateList();
    });
})();
