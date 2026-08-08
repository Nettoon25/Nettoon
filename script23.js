document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       PAYMENT METHOD ELEMENTS
    ========================================================= */

    const paymentOptions =
        document.querySelectorAll(".payment-option");

    const mpesaForm =
        document.getElementById("mpesaPaymentForm");

    const cardForm =
        document.getElementById("cardPaymentForm");

    const paystackForm =
        document.getElementById("paystackPaymentForm");


    /* =========================================================
       STATUS MESSAGE
    ========================================================= */

    const paymentStatus =
        document.getElementById("paymentStatus");


    function showStatus(message, type = "success") {

        if (!paymentStatus) return;

        paymentStatus.textContent = message;

        paymentStatus.classList.remove(
            "hidden",
            "success",
            "error"
        );

        paymentStatus.classList.add(type);

    }


    /* =========================================================
       SHOW PAYMENT FORM
    ========================================================= */

    function showPaymentForm(method) {

        /* Hide every form */

        if (mpesaForm) {
            mpesaForm.classList.add("hidden");
        }

        if (cardForm) {
            cardForm.classList.add("hidden");
        }

        if (paystackForm) {
            paystackForm.classList.add("hidden");
        }


        /* Remove active state */

        paymentOptions.forEach(option => {
            option.classList.remove("active");
        });


        /* Show selected form */

        if (method === "mpesa") {

            if (mpesaForm) {
                mpesaForm.classList.remove("hidden");
            }

        }

        else if (method === "card") {

            if (cardForm) {
                cardForm.classList.remove("hidden");
            }

        }

        else if (method === "paystack") {

            if (paystackForm) {
                paystackForm.classList.remove("hidden");
            }

        }


        /* Activate selected payment card */

        const selectedOption =
            document.querySelector(
                `.payment-option[data-method="${method}"]`
            );

        if (selectedOption) {
            selectedOption.classList.add("active");
        }

    }


    /* =========================================================
       PAYMENT METHOD SWITCHING
    ========================================================= */

    paymentOptions.forEach(option => {

        const radio =
            option.querySelector(
                'input[type="radio"]'
            );


        if (!radio) return;


        radio.addEventListener("change", function () {

            const selectedMethod =
                this.value;

            showPaymentForm(selectedMethod);

        });


        /*
         * This also allows the entire payment card
         * to be clicked, not just the radio button.
         */

        option.addEventListener("click", function (event) {

            /*
             * If the user clicked the radio itself,
             * the radio's change event will handle it.
             */

            if (event.target.tagName === "INPUT") {
                return;
            }


            radio.checked = true;

            radio.dispatchEvent(
                new Event("change", {
                    bubbles: true
                })
            );

        });

    });


    /* =========================================================
       INITIAL PAYMENT METHOD
    ========================================================= */

    const checkedRadio =
        document.querySelector(
            '.payment-option input[type="radio"]:checked'
        );


    if (checkedRadio) {

        showPaymentForm(
            checkedRadio.value
        );

    }

    else {

        /*
         * Fallback to M-Pesa
         */

        const mpesaRadio =
            document.querySelector(
                '.payment-option[data-method="mpesa"] input[type="radio"]'
            );


        if (mpesaRadio) {

            mpesaRadio.checked = true;

            showPaymentForm("mpesa");

        }

    }


    /* =========================================================
       M-PESA
    ========================================================= */

    const mpesaPhone =
        document.getElementById("mpesaPhone");

    const mpesaError =
        document.getElementById("mpesaError");

    const mpesaButton =
        document.getElementById("mpesaPayButton");


    if (mpesaButton) {

        mpesaButton.addEventListener(
            "click",
            function () {

                if (!mpesaPhone || !mpesaError) {
                    return;
                }


                mpesaError.textContent = "";


                let phone =
                    mpesaPhone.value.trim();


                /* Remove spaces */

                phone =
                    phone.replace(/\s/g, "");


                /*
                 * Accept:
                 *
                 * 0712345678
                 * 0112345678
                 */

                if (/^07\d{8}$/.test(phone)) {

                    phone =
                        "+254" +
                        phone.substring(1);

                }

                else if (/^01\d{8}$/.test(phone)) {

                    phone =
                        "+254" +
                        phone.substring(1);

                }

                /*
                 * Accept:
                 *
                 * +254712345678
                 */

                else if (
                    !/^\+254\d{9}$/.test(phone)
                ) {

                    mpesaError.textContent =
                        "Enter a valid Kenyan M-Pesa number.";

                    return;

                }


                /* Processing */

                mpesaButton.disabled = true;

                mpesaButton.textContent =
                    "PROCESSING...";


                /*
                 * BACKEND INTEGRATION WILL GO HERE.
                 *
                 * Example:
                 *
                 * fetch("/api/payments/mpesa", {
                 *
                 *     method: "POST",
                 *
                 *     headers: {
                 *         "Content-Type":
                 *             "application/json"
                 *     },
                 *
                 *     body: JSON.stringify({
                 *         phone: phone
                 *     })
                 *
                 * })
                 */


                setTimeout(function () {

                    mpesaButton.disabled = false;

                    mpesaButton.textContent =
                        "PAY WITH M-PESA";


                    showStatus(
                        "M-Pesa payment request is ready to be initiated.",
                        "success"
                    );

                }, 1500);

            }
        );

    }


    /* =========================================================
       CARD INPUT
    ========================================================= */

    const cardNumber =
        document.getElementById("cardNumber");

    const cardType =
        document.getElementById("cardType");


    if (cardNumber) {

        cardNumber.addEventListener(
            "input",
            function () {

                let digits =
                    this.value.replace(/\D/g, "");


                /*
                 * Maximum 16 digits
                 */

                digits =
                    digits.substring(0, 16);


                /*
                 * Add spaces every 4 digits
                 */

                this.value =
                    digits
                        .replace(/(.{4})/g, "$1 ")
                        .trim();


                /*
                 * Detect card type
                 */

                if (!cardType) return;


                if (/^4/.test(digits)) {

                    cardType.textContent =
                        "VISA";

                }

                else if (/^5[1-5]/.test(digits)) {

                    cardType.textContent =
                        "MASTERCARD";

                }

                else if (/^3[47]/.test(digits)) {

                    cardType.textContent =
                        "AMEX";

                }

                else {

                    cardType.textContent = "";

                }

            }
        );

    }


    /* =========================================================
       CARD EXPIRY
    ========================================================= */

    const cardExpiry =
        document.getElementById("cardExpiry");


    if (cardExpiry) {

        cardExpiry.addEventListener(
            "input",
            function () {

                let value =
                    this.value.replace(/\D/g, "");


                value =
                    value.substring(0, 4);


                if (value.length >= 3) {

                    value =
                        value.substring(0, 2)
                        + "/"
                        + value.substring(2);

                }


                this.value = value;

            }
        );

    }


    /* =========================================================
       CARD CVV
    ========================================================= */

    const cardCvv =
        document.getElementById("cardCvv");


    if (cardCvv) {

        cardCvv.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .substring(0, 4);

            }
        );

    }


    /* =========================================================
       CARD PAYMENT
    ========================================================= */

    const cardName =
        document.getElementById("cardName");

    const cardPayButton =
        document.getElementById("cardPayButton");


    if (cardPayButton) {

        cardPayButton.addEventListener(
            "click",
            function () {

                let valid = true;


                /* Clear errors */

                const cardNameError =
                    document.getElementById(
                        "cardNameError"
                    );

                const cardNumberError =
                    document.getElementById(
                        "cardNumberError"
                    );

                const cardExpiryError =
                    document.getElementById(
                        "cardExpiryError"
                    );

                const cardCvvError =
                    document.getElementById(
                        "cardCvvError"
                    );


                if (cardNameError)
                    cardNameError.textContent = "";

                if (cardNumberError)
                    cardNumberError.textContent = "";

                if (cardExpiryError)
                    cardExpiryError.textContent = "";

                if (cardCvvError)
                    cardCvvError.textContent = "";


                /* CARDHOLDER NAME */

                if (
                    !cardName ||
                    cardName.value.trim().length < 2
                ) {

                    if (cardNameError) {

                        cardNameError.textContent =
                            "Enter the name on your card.";

                    }

                    valid = false;

                }


                /* CARD NUMBER */

                const number =
                    cardNumber
                        ? cardNumber.value.replace(/\s/g, "")
                        : "";


                if (number.length < 16) {

                    if (cardNumberError) {

                        cardNumberError.textContent =
                            "Enter a valid card number.";

                    }

                    valid = false;

                }


                /* EXPIRY */

                if (
                    !cardExpiry ||
                    !/^\d{2}\/\d{2}$/.test(
                        cardExpiry.value
                    )
                ) {

                    if (cardExpiryError) {

                        cardExpiryError.textContent =
                            "Enter expiry as MM/YY.";

                    }

                    valid = false;

                }


                /* CVV */

                if (
                    !cardCvv ||
                    cardCvv.value.length < 3 ||
                    cardCvv.value.length > 4
                ) {

                    if (cardCvvError) {

                        cardCvvError.textContent =
                            "Enter a valid CVV.";

                    }

                    valid = false;

                }


                if (!valid) {
                    return;
                }


                /*
                 * IMPORTANT:
                 *
                 * Do NOT send raw card information
                 * to the Nettoon backend.
                 *
                 * Production payment processing
                 * should use Paystack's secure
                 * checkout/tokenization flow.
                 */


                cardPayButton.disabled = true;

                cardPayButton.textContent =
                    "CONNECTING TO SECURE CHECKOUT...";


                setTimeout(function () {

                    cardPayButton.disabled = false;

                    cardPayButton.textContent =
                        "PAY WITH CARD";


                    showStatus(
                        "Card checkout is ready for Paystack integration.",
                        "success"
                    );

                }, 1500);

            }
        );

    }


    /* =========================================================
       PAYSTACK
    ========================================================= */

    const paystackEmail =
        document.getElementById("paystackEmail");

    const paystackEmailError =
        document.getElementById("paystackEmailError");

    const paystackButton =
        document.getElementById("paystackButton");


    if (paystackButton) {

        paystackButton.addEventListener(
            "click",
            function () {

                if (!paystackEmail) {
                    return;
                }


                if (paystackEmailError) {
                    paystackEmailError.textContent = "";
                }


                const email =
                    paystackEmail.value.trim();


                /* Required */

                if (!email) {

                    if (paystackEmailError) {

                        paystackEmailError.textContent =
                            "Enter your email address.";

                    }

                    return;

                }


                /* Email validation */

                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email)
                ) {

                    if (paystackEmailError) {

                        paystackEmailError.textContent =
                            "Enter a valid email address.";

                    }

                    return;

                }


                paystackButton.disabled = true;

                paystackButton.textContent =
                    "CONNECTING TO PAYSTACK...";


                /*
                 * PRODUCTION PAYSTACK FLOW
                 *
                 * Your backend should initialize
                 * the transaction and return the
                 * Paystack authorization URL.
                 *
                 * Example:
                 *
                 * fetch(
                 *     "/api/payments/paystack/initialize",
                 *     {
                 *         method: "POST",
                 *         headers: {
                 *             "Content-Type":
                 *                 "application/json"
                 *         },
                 *         body: JSON.stringify({
                 *             email: email
                 *         })
                 *     }
                 * )
                 */


                setTimeout(function () {

                    paystackButton.disabled = false;

                    paystackButton.textContent =
                        "CONTINUE WITH PAYSTACK";


                    showStatus(
                        "Paystack checkout is ready for backend integration.",
                        "success"
                    );

                }, 1500);

            }
        );

    }


});




const mpesaCountry =
    document.getElementById("mpesaCountry");

const countryCode =
    document.getElementById("countryCode");

const mpesaPhone =
    document.getElementById("mpesaPhone");


// Change country code when country changes
mpesaCountry.addEventListener("change", function () {

    const selectedOption =
        this.options[this.selectedIndex];

    const code =
        selectedOption.value;

    countryCode.textContent = code;

    // Clear previous number
    mpesaPhone.value = "";

    // Reset placeholder
    switch (code) {

        case "+254":
            mpesaPhone.placeholder =
                "712 345 678";
            break;

        case "+255":
            mpesaPhone.placeholder =
                "712 345 678";
            break;

        case "+258":
            mpesaPhone.placeholder =
                "82 123 4567";
            break;

        case "+256":
            mpesaPhone.placeholder =
                "712 345 678";
            break;

        default:
            mpesaPhone.placeholder =
                "Phone number";
    }

});




mpesaButton.addEventListener("click", function () {

    mpesaError.textContent = "";

    let phone =
        mpesaPhone.value.trim();

    // Remove spaces, dashes and brackets
    phone =
        phone.replace(/[\s\-()]/g, "");

    const code =
        mpesaCountry.value;


    // Remove leading zero from local number
    if (phone.startsWith("0")) {
        phone = phone.substring(1);
    }


    // Make sure only digits remain
    if (!/^\d+$/.test(phone)) {

        mpesaError.textContent =
            "Enter a valid phone number.";

        return;
    }


    // Build international number
    const internationalPhone =
        code + phone;


    console.log(
        "M-Pesa number:",
        internationalPhone
    );


    /*
       Example:

       Kenya:
       0712345678
       becomes
       +254712345678

       Tanzania:
       0712345678
       becomes
       +255712345678
    */


    mpesaButton.disabled = true;

    mpesaButton.textContent =
        "PROCESSING...";


    // Temporary frontend simulation
    setTimeout(() => {

        mpesaButton.disabled = false;

        mpesaButton.textContent =
            "PAY WITH M-PESA";

        showStatus(
            "M-Pesa payment request is ready to be initiated.",
            "success"
        );

    }, 1500);

});