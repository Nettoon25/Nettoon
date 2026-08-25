const form = document.getElementById("youthSignupForm");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const continueStep1 =
    document.getElementById("continueStep1");

const continueStep2 =
    document.getElementById("continueStep2");

const backStep2 =
    document.getElementById("backStep2");

const backStep3 =
    document.getElementById("backStep3");

const dob =
    document.getElementById("dob");

const ageResult =
    document.getElementById("ageResult");

const password =
    document.getElementById("password");

const strengthBar =
    document.getElementById("strengthBar");

const successMessage =
    document.getElementById("successMessage");

const country =
    document.getElementById("country");


/*
----------------------------------------
AGE CALCULATION
----------------------------------------
*/

function calculateAge(dateString) {

    if (!dateString) {
        return null;
    }

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


/*
----------------------------------------
AGE BAND
----------------------------------------
*/

function getAgeBand(age) {

    if (age < 13) {
        return "0-12";
    }

    if (age < 16) {
        return "13-15";
    }

    if (age < 18) {
        return "16-17";
    }

    return "18+";
}


/*
----------------------------------------
DATE CHANGE
----------------------------------------
*/

dob.addEventListener(
    "change",
    function () {

        const age =
            calculateAge(this.value);

        if (age === null) {
            ageResult.hidden = true;
            return;
        }

        if (age < 0 || age > 120) {

            ageResult.hidden = false;

            ageResult.textContent =
                "Please enter a valid date of birth.";

            return;
        }

        const ageBand =
            getAgeBand(age);

        ageResult.hidden = false;

        if (age < 18) {

            ageResult.innerHTML =
                `
                <strong>Youth account</strong><br>
                You will need parent or guardian
                approval before the account can be activated.
                `;

        } else {

            ageResult.innerHTML =
                `
                <strong>Adult account</strong><br>
                This form is intended for youth accounts.
                Please use the standard Nettoon signup.
                `;

        }

    }
);


/*
----------------------------------------
PASSWORD STRENGTH
----------------------------------------
*/

password.addEventListener(
    "input",
    function () {

        const value =
            this.value;

        let score = 0;

        if (value.length >= 10) {
            score++;
        }

        if (/[A-Z]/.test(value)) {
            score++;
        }

        if (/[a-z]/.test(value)) {
            score++;
        }

        if (/[0-9]/.test(value)) {
            score++;
        }

        if (/[^A-Za-z0-9]/.test(value)) {
            score++;
        }

        const percentage =
            (score / 5) * 100;

        strengthBar.style.width =
            percentage + "%";

    }
);


/*
----------------------------------------
VALIDATE STEP 1
----------------------------------------
*/

function validateStep1() {

    const username =
        document.getElementById("username");

    const selectedCountry =
        country.value;

    const age =
        calculateAge(dob.value);


    if (!username.value.trim()) {

        alert("Please choose a username.");

        username.focus();

        return false;
    }


    if (username.value.length < 3) {

        alert(
            "Your username must contain at least 3 characters."
        );

        username.focus();

        return false;
    }


    if (password.value.length < 10) {

        alert(
            "Your password must contain at least 10 characters."
        );

        password.focus();

        return false;
    }


    if (!dob.value || age === null) {

        alert(
            "Please enter your date of birth."
        );

        dob.focus();

        return false;
    }


    if (age < 0 || age > 120) {

        alert(
            "Please enter a valid date of birth."
        );

        return false;
    }


    if (age >= 18) {

        alert(
            "This signup is for youth accounts. Please use the adult signup."
        );

        return false;
    }


    if (!selectedCountry) {

        alert(
            "Please select your country or region."
        );

        country.focus();

        return false;
    }


    return true;
}


/*
----------------------------------------
STEP NAVIGATION
----------------------------------------
*/

continueStep1.addEventListener(
    "click",
    function () {

        if (!validateStep1()) {
            return;
        }

        step1.classList.remove("active");

        step2.classList.add("active");

        updateSteps(2);

    }
);


continueStep2.addEventListener(
    "click",
    function () {

        step2.classList.remove("active");

        step3.classList.add("active");

        updateSteps(3);

    }
);


backStep2.addEventListener(
    "click",
    function () {

        step2.classList.remove("active");

        step1.classList.add("active");

        updateSteps(1);

    }
);


backStep3.addEventListener(
    "click",
    function () {

        step3.classList.remove("active");

        step2.classList.add("active");

        updateSteps(2);

    }
);


/*
----------------------------------------
STEP INDICATOR
----------------------------------------
*/

function updateSteps(currentStep) {

    document
        .querySelectorAll(".step")
        .forEach(
            function (step) {

                const stepNumber =
                    Number(
                        step.dataset.step
                    );

                if (
                    stepNumber <= currentStep
                ) {

                    step.classList.add(
                        "active"
                    );

                } else {

                    step.classList.remove(
                        "active"
                    );

                }

            }
        );
}


/*
----------------------------------------
FORM SUBMISSION
----------------------------------------
*/

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const guardianName =
            document.getElementById(
                "guardianName"
            );

        const guardianEmail =
            document.getElementById(
                "guardianEmail"
            );

        const relationship =
            document.getElementById(
                "relationship"
            );

        const guardianDeclaration =
            document.getElementById(
                "guardianDeclaration"
            );


        if (!guardianName.value.trim()) {

            alert(
                "Please enter the parent or guardian's name."
            );

            guardianName.focus();

            return;
        }


        if (!guardianEmail.validity.valid) {

            alert(
                "Please enter a valid parent or guardian email address."
            );

            guardianEmail.focus();

            return;
        }


        if (!relationship.value) {

            alert(
                "Please select the relationship."
            );

            relationship.focus();

            return;
        }


        if (!guardianDeclaration.checked) {

            alert(
                "The parent/guardian declaration must be confirmed."
            );

            return;
        }


        /*
        ----------------------------------------
        IMPORTANT:
        THIS IS WHERE THE FRONTEND WOULD CALL
        YOUR BACKEND.
        ----------------------------------------

        DO NOT ACTIVATE THE ACCOUNT HERE.

        The backend must:
        1. Create a pending registration.
        2. Generate a secure consent token.
        3. Send the parent consent email.
        4. Record the consent request.
        5. Wait for verification.
        6. Verify the parent/guardian.
        7. Activate the youth account.
        */


        const payload = {

            username:
                document.getElementById(
                    "username"
                ).value,

            dateOfBirth:
                dob.value,

            country:
                country.value,

            ageBand:
                getAgeBand(
                    calculateAge(
                        dob.value
                    )
                ),

            interests:
                Array.from(
                    document.querySelectorAll(
                        'input[name="interests"]:checked'
                    )
                ).map(
                    checkbox =>
                        checkbox.value
                ),

            guardianName:
                guardianName.value,

            guardianEmail:
                guardianEmail.value,

            relationship:
                relationship.value

        };


        console.log(
            "Registration payload:",
            payload
        );


        /*
        Example backend request:

        const response = await fetch(
            "/api/youth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body:
                    JSON.stringify(payload)
            }
        );

        */


        form.hidden = true;

        successMessage.hidden = false;

    }
);