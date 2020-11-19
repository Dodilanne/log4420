module.exports = {
    index: {
        title: "Accueil",
        paths: ["/accueil", "/"],
    },
    products: {
        title: "Produits",
        paths: ["/produits"],
        additionalScripts: ["/assets/scripts/products.controller.js"],
    },
    product: {
        title: "Produit",
        paths: ["/produits/:productID"],
    },
    contact: {
        title: "Contact",
        paths: ["/contact"],
    },
    "shopping-cart": {
        title: "Panier",
        paths: ["/panier"],
        additionalScripts: [
            "/assets/js/jquery.validate.min.js",
            "/assets/js/additional-methods.min.js",
            "/assets/js/messages_fr.js",
            "/assets/scripts/orders.service.js",
            "/assets/scripts/order.controller.js",
        ],
    },
    order: {
        title: "Commande",
        paths: ["/commande"],
    },
    confirmation: {
        title: "Confirmation",
        paths: ["/confirmation"],
    },
};
