/* =========================================
   NETTOON CHILD / TEEN SIGNUP
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const signupForm =
    document.getElementById("signupForm");

const dateOfBirth =
    document.getElementById("dateOfBirth");

const dobError =
    document.getElementById("dobError");

const ageResult =
    document.getElementById("ageResult");

const accountSection =
    document.getElementById("accountSection");

const parentSection =
    document.getElementById("parentSection");

const privacySection =
    document.getElementById("privacySection");

const signupButton =
    document.getElementById("signupButton");

const pendingMessage =
    document.getElementById("pendingMessage");

const pendingText =
    document.getElementById("pendingText");

const backButton =
    document.getElementById("backButton");

const username =
    document.getElementById("username");

const country =
    document.getElementById("country");

const parentName =
    document.getElementById("parentName");

const parentEmail =
    document.getElementById("parentEmail");

const guardianRelationship =
    document.getElementById("guardianRelationship");

const privacyAgreement =
    document.getElementById("privacyAgreement");

const marketingConsent =
    document.getElementById("marketingConsent");


/* =========================================
   ACCOUNT STATE
========================================= */

let calculatedAge = null;

let isMinor = false;


/* =========================================
   CALCULATE AGE
========================================= */

function calculateAge(dateString) {

    const birthDate =
        new Date(dateString);

    const today =
        new Date();


    let age =
        today.getFullYear() -
        birthDate.getFullYear();


    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();


    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {

        age--;

    }


    return age;

}


/* =========================================
   DATE OF BIRTH
========================================= */

dateOfBirth.addEventListener(
    "change",
    function () {

        dobError.textContent = "";

        ageResult.className =
            "age-result hidden";


        const value =
            this.value;


        if (!value) {

            resetSignup();

            return;

        }


        const age =
            calculateAge(value);


        calculatedAge =
            age;


        /* Invalid future date */

        if (age < 0) {

            dobError.textContent =
                "Please enter a valid date of birth.";

            resetSignup();

            return;

        }


        /*
         IMPORTANT:

         Nettoon is using a conservative
         under-18 protection model here.

         Production jurisdiction rules
         should ultimately be enforced
         by the backend.
        */


        if (age < 18) {

            isMinor = true;


            ageResult.className =
                "age-result child";


            ageResult.innerHTML = `
                <strong>Child / Teen account</strong><br>
                Because you are under 18, a parent or
                legal guardian must authorize this account
                before it becomes active.
            `;


            parentSection.classList.remove(
                "hidden"
            );

        }

        else {

            isMinor = false;


            ageResult.className =
                "age-result adult";


            ageResult.innerHTML = `
                <strong>Adult account</strong><br>
                You can continue with the standard
                Nettoon account setup.
            `;


            parentSection.classList.add(
                "hidden"
            );

        }


        accountSection.classList.remove(
            "hidden"
        );


        privacySection.classList.remove(
            "hidden"
        );


        validateForm();

    }
);


/* =========================================
   RESET
========================================= */

function resetSignup() {

    calculatedAge = null;

    isMinor = false;


    ageResult.className =
        "age-result hidden";


    accountSection.classList.add(
        "hidden"
    );


    parentSection.classList.add(
        "hidden"
    );


    privacySection.classList.add(
        "hidden"
    );


    signupButton.disabled = true;

}


/* =========================================
   USERNAME VALIDATION
========================================= */

username.addEventListener(
    "input",
    function () {

        const value =
            this.value.trim();


        const usernameError =
            document.getElementById(
                "usernameError"
            );


        usernameError.textContent = "";


        if (!value) {

            validateForm();

            return;

        }


        /*
         Allow:

         letters
         numbers
         underscore
         hyphen
        */

        if (
            !/^[a-zA-Z0-9_-]+$/.test(value)
        ) {

            usernameError.textContent =
                "Use only letters, numbers, underscores or hyphens.";

        }


        if (value.length < 3) {

            usernameError.textContent =
                "Username must contain at least 3 characters.";

        }


        validateForm();

    }
);


/* =========================================
   COUNTRY
========================================= */

country.addEventListener(
    "change",
    function () {

        const countryError =
            document.getElementById(
                "countryError"
            );


        countryError.textContent = "";


        validateForm();

    }
);


/* =========================================
   PARENT NAME
========================================= */

parentName.addEventListener(
    "input",
    function () {

        document.getElementById(
            "parentNameError"
        ).textContent = "";


        validateForm();

    }
);


/* =========================================
   PARENT EMAIL
========================================= */

parentEmail.addEventListener(
    "input",
    function () {

        document.getElementById(
            "parentEmailError"
        ).textContent = "";


        validateForm();

    }
);


/* =========================================
   CHECKBOXES
========================================= */

guardianRelationship.addEventListener(
    "change",
    validateForm
);


privacyAgreement.addEventListener(
    "change",
    validateForm
);


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================
   FORM VALIDATION
========================================= */

function validateForm() {

    if (
        calculatedAge === null ||
        calculatedAge < 0
    ) {

        signupButton.disabled = true;

        return false;

    }


    if (
        !username.value.trim() ||
        username.value.trim().length < 3
    ) {

        signupButton.disabled = true;

        return false;

    }


    if (
        !/^[a-zA-Z0-9_-]+$/
            .test(username.value.trim())
    ) {

        signupButton.disabled = true;

        return false;

    }


    if (!country.value) {

        signupButton.disabled = true;

        return false;

    }


    /*
       MINOR ACCOUNT
    */

    if (isMinor) {

        if (
            !parentName.value.trim()
        ) {

            signupButton.disabled = true;

            return false;

        }


        if (
            !isValidEmail(
                parentEmail.value.trim()
            )
        ) {

            signupButton.disabled = true;

            return false;

        }


        if (
            !guardianRelationship.checked
        ) {

            signupButton.disabled = true;

            return false;

        }

    }


    if (!privacyAgreement.checked) {

        signupButton.disabled = true;

        return false;

    }


    signupButton.disabled = false;

    return true;

}


/* =========================================
   SUBMIT
========================================= */

signupForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        clearErrors();


        if (!validateForm()) {

            validateAndShowErrors();

            return;

        }


        signupButton.disabled = true;

        signupButton.textContent =
            "PROCESSING...";


        /*
        =====================================
        DEVELOPMENT MODE
        =====================================

        This currently simulates the request.

        DO NOT use this as the real
        parental-consent mechanism.

        Production should send the
        information to the Nettoon backend.
        */


        const signupData = {

            username:
                username.value.trim(),

            country:
                country.value,

            age:
                calculatedAge,

            accountType:
                isMinor
                    ? "child_teen"
                    : "adult",

            parentName:
                isMinor
                    ? parentName.value.trim()
                    : null,

            parentEmail:
                isMinor
                    ? parentEmail.value.trim()
                    : null,

            privacyAccepted:
                privacyAgreement.checked,

            marketingConsent:
                marketingConsent.checked

        };


        console.log(
            "NETTOON SIGNUP REQUEST:",
            signupData
        );


        /*
        =====================================
        PRODUCTION BACKEND EXAMPLE
        =====================================

        const response = await fetch(
            "/api/auth/signup",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(signupData)
            }
        );

        const result =
            await response.json();

        */


        setTimeout(
            function () {

                signupForm.classList.add(
                    "hidden"
                );


                pendingMessage.classList.remove(
                    "hidden"
                );


                if (isMinor) {

                    pendingText.textContent =
                        "A parental authorization request should now be sent to " +
                        parentEmail.value.trim() +
                        ". The account should remain inactive until the required verification has been completed.";

                }

                else {

                    pendingText.textContent =
                        "Your account request has been received. You can continue to the next step of account setup.";

                }


            },
            1000
        );

    }
);


/* =========================================
   ERROR DISPLAY
========================================= */

function validateAndShowErrors() {

    if (!dateOfBirth.value) {

        dobError.textContent =
            "Enter your date of birth.";

    }


    if (!username.value.trim()) {

        document.getElementById(
            "usernameError"
        ).textContent =
            "Choose a username.";

    }


    if (!country.value) {

        document.getElementById(
            "countryError"
        ).textContent =
            "Select your country.";

    }


    if (isMinor) {

        if (!parentName.value.trim()) {

            document.getElementById(
                "parentNameError"
            ).textContent =
                "Enter the parent or guardian's name.";

        }


        if (
            !isValidEmail(
                parentEmail.value.trim()
            )
        ) {

            document.getElementById(
                "parentEmailError"
            ).textContent =
                "Enter a valid parent or guardian email.";

        }


        if (
            !guardianRelationship.checked
        ) {

            document.getElementById(
                "guardianError"
            ).textContent =
                "The parent or guardian must confirm their relationship.";

        }

    }


    if (!privacyAgreement.checked) {

        document.getElementById(
            "privacyError"
        ).textContent =
            "Please acknowledge the Privacy Notice.";

    }

}


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    document.querySelectorAll(
        ".error"
    ).forEach(
        error => {
            error.textContent = "";
        }
    );

}


/* =========================================
   BACK BUTTON
========================================= */

backButton.addEventListener(
    "click",
    function () {

        pendingMessage.classList.add(
            "hidden"
        );


        signupForm.classList.remove(
            "hidden"
        );


        signupButton.disabled = false;


        signupButton.textContent =
            "CREATE NETTOON ACCOUNT";

    }
);