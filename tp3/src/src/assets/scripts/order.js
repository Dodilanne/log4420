/* global $ Order Utils*/
(() => {
    $(() => {
        jQuery.validator.addMethod(
            "creditcardexpiry",
            function (value, element) {
                return (
                    this.optional(element) ||
                    /^(0[1-9]|1[0-2])\/([0-9]{2})$/g.test(value)
                );
            },
            "La date d'expiration de votre carte de crédit est invalide."
        );
        $("#orderForm").validate({
            rules: {
                phone: {
                    required: true,
                    phoneUS: true,
                },
                "credit-card": {
                    required: true,
                    creditcard: true,
                },
                "credit-card-expiry": {
                    required: true,
                    creditcardexpiry: true,
                },
            },
        });
        $("#orderForm").on("submit", (e) => {
            e.preventDefault();
            const firstName = $("#first-name").val();
            const lastName = $("#last-name").val();
            Order.set({ firstName, lastName });
            Utils.redirect("confirmation", false);
        });
    });
})();
