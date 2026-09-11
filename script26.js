<script>

const NETTOON_CONFIG = {

    currency: "KES",

    // IMPORTANT:
    // This is your Paystack PUBLIC key.
    // NEVER put your secret key here.

    paystackPublicKey:
        "pk_test_REPLACE_WITH_YOUR_PUBLIC_KEY",

    backend:

        "https://your-api.nettoon.co"

};


// ====================================
// PLAN
// ====================================

const selectedPlan = {

    id: "standard",

    name: "Nettoon Standard",

    amount: 300

};


// ====================================
// UPDATE UI
// ====================================

document.getElementById(
    "selectedPlanName"
).textContent = selectedPlan.name;


document.getElementById(
    "selectedPlanPrice"
).textContent =
    `KES ${selectedPlan.amount}`;


document.getElementById(
    "paymentTotal"
).textContent =
    `KES ${selectedPlan.amount}`;


// ====================================
// STATUS
// ====================================

function showPaymentStatus(
    message,
    type = "info"
) {

    const status =
        document.getElementById(
            "paymentStatus"
        );

    status.style.display = "block";

    status.textContent = message;

    if (type === "error") {

        status.style.background =
            "#fee2e2";

        status.style.color =
            "#991b1b";

    } else if (type === "success") {

        status.style.background =
            "#dcfce7";

        status.style.color =
            "#166534";

    } else {

        status.style.background =
            "#eff6ff";

        status.style.color =
            "#1e40af";
    }
}


// ====================================
// CUSTOMER VALIDATION
// ====================================

function getCustomerDetails() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();

    const email =
        document.getElementById(
            "customerEmail"
        ).value.trim();


    if (!name) {

        showPaymentStatus(
            "Please enter your full name.",
            "error"
        );

        return null;
    }


    if (!email) {

        showPaymentStatus(
            "Please enter your email address.",
            "error"
        );

        return null;
    }


    return {
        name,
        email
    };
}


// ====================================
// PAYSTACK
// ====================================

document.getElementById(
    "cardButton"
).addEventListener(
    "click",
    async function () {

        const customer =
            getCustomerDetails();

        if (!customer) return;


        try {

            showPaymentStatus(
                "Preparing secure checkout..."
            );


            /*
             * IMPORTANT:
             *
             * Your server should initialize
             * the Paystack transaction.
             *
             * Do NOT initialize it using
             * your secret key in the browser.
             */

            const response =
                await fetch(
                    `${NETTOON_CONFIG.backend}/payments/paystack/initialize`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            plan:
                                selectedPlan.id,

                            email:
                                customer.email,

                            name:
                                customer.name,

                            amount:
                                selectedPlan.amount

                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to initialize payment."
                );
            }


            /*
             * Backend should return:
             *
             * accessCode
             *
             * after creating the transaction.
             */

            const popup =
                new Paystack();


            popup.resumeTransaction(
                data.accessCode
            );


        } catch (error) {

            console.error(
                "Paystack error:",
                error
            );


            showPaymentStatus(
                error.message ||
                "Unable to start payment.",
                "error"
            );
        }

    }
);


// ====================================
// M-PESA
// ====================================

document.getElementById(
    "mpesaButton"
).addEventListener(
    "click",
    async function () {

        const customer =
            getCustomerDetails();

        if (!customer) return;


        const phone =
            prompt(
                "Enter your M-PESA phone number\nExample: 254712345678"
            );


        if (!phone) return;


        try {

            showPaymentStatus(
                "Sending M-PESA payment request..."
            );


            const response =
                await fetch(
                    `${NETTOON_CONFIG.backend}/payments/mpesa/stk-push`,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            plan:
                                selectedPlan.id,

                            amount:
                                selectedPlan.amount,

                            email:
                                customer.email,

                            name:
                                customer.name,

                            phone:
                                phone

                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to initiate M-PESA payment."
                );
            }


            showPaymentStatus(
                "M-PESA prompt sent. Check your phone and complete the payment.",
                "success"
            );


        } catch (error) {

            console.error(
                "M-PESA error:",
                error
            );


            showPaymentStatus(
                error.message ||
                "M-PESA payment could not be started.",
                "error"
            );
        }

    }
);

</script>