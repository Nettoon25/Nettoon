/* =========================================================
   NETTOON PROFILE CONTENT TABS
========================================================= */

const profileTabs =
    document.querySelectorAll(".profile-tab");

const profilePanels =
    document.querySelectorAll(".profile-content-panel");


profileTabs.forEach(tab => {

    tab.addEventListener("click", function () {

        const selectedContent =
            this.dataset.content;


        /* Remove active state from all tabs */

        profileTabs.forEach(item => {

            item.classList.remove("active");

            item.setAttribute(
                "aria-selected",
                "false"
            );

        });


        /* Hide all content panels */

        profilePanels.forEach(panel => {

            panel.classList.remove("active");

        });


        /* Activate clicked tab */

        this.classList.add("active");

        this.setAttribute(
            "aria-selected",
            "true"
        );


        /* Show corresponding content */

        const selectedPanel =
            document.getElementById(
                selectedContent
            );


        if (selectedPanel) {

            selectedPanel.classList.add("active");

        }

    });

});