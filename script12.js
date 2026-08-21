

// ======================= THEME TOGGLE =======================
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const lightImg = document.getElementById("theme-toggle-light");
  const darkImg = document.getElementById("theme-toggle-dark");

  function setTheme(mode) {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      themeToggle.checked = true;
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      themeToggle.checked = false;
    }
  }

  function toggleAndSave() {
    const newMode = themeToggle.checked ? "dark" : "light";
    setTheme(newMode);
    localStorage.setItem("theme", newMode);
  }

  // Initialize from storage or system
  const stored = localStorage.getItem("theme");
  if (stored) {
    setTheme(stored);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }

  themeToggle.addEventListener("change", toggleAndSave);

  // Fallback if icons fail
  function fallbackImage(imgEl, faClass) {
    if (!imgEl) return;
    imgEl.addEventListener("error", () => {
      const i = document.createElement("i");
      i.className = faClass;
      i.style.width = imgEl.style.width || "20px";
      i.style.height = imgEl.style.height || "20px";
      imgEl.replaceWith(i);
    });
    if (imgEl.complete && imgEl.naturalWidth === 0) {
      imgEl.dispatchEvent(new Event("error"));
    }
  }
  fallbackImage(lightImg, "fa-solid fa-sun");
  fallbackImage(darkImg, "fa-solid fa-moon");
});


document.querySelector(".account-dropdown").onclick = function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    var dropdown = document.getElementById("accountDropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.account-dropdown') && !event.target.closest('.account-dropdown')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.display = "none";
        }
    }
};



document.addEventListener("DOMContentLoaded", function () {
    const notificationIcon = document.getElementById("notification-icon");
    const notificationContainer = document.getElementById("notification-container");
  
    notificationIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevents click from propagating to document
      notificationContainer.classList.toggle("active");
    });
  
    // Close the notification when clicking outside
    document.addEventListener("click", function (event) {
      if (!notificationContainer.contains(event.target) && !notificationIcon.contains(event.target)) {
        notificationContainer.classList.remove("active");
      }
    });
  });
  

  
document.querySelectorAll('.optionnn').forEach(option => {
  const trigger = option.querySelector('.optionTrigger');
  const menu = option.querySelector('.popup-options');

  trigger.addEventListener('click', e => {
    e.stopPropagation();

    // 🔥 Close all other open popups first
    document.querySelectorAll('.popup-options.show').forEach(openMenu => {
      if (openMenu !== menu) {
        openMenu.classList.remove('show');
      }
    });

    // Toggle current menu
    menu.classList.toggle('show');
  });

  // Prevent clicks inside menu from closing it
  menu.addEventListener('click', e => {
    e.stopPropagation();
  });
});

// Close when clicking anywhere else
document.addEventListener('click', () => {
  document.querySelectorAll('.popup-options').forEach(menu => {
    menu.classList.remove('show');
  });
});





document.addEventListener("DOMContentLoaded", () => {
  const shorts = document.querySelectorAll(".shorts");

  shorts.forEach(short => {
    const video = short.querySelector("video");
    const playBtn = short.querySelector(".play-overlay");

    // Start paused
    video.pause();

    // ▶️ Play when clicking play button
    playBtn.addEventListener("click", (e) => {
      e.preventDefault();
      video.play();
      playBtn.style.opacity = "0"; // hide play button
    });

    // ⏸️ Pause when tapping video
    video.addEventListener("click", () => {
      if (!video.paused) {
        video.pause();
        playBtn.style.opacity = "1"; // show play button again
      }
    });

    // ▶️ Hide play button again when resuming (if user presses system play)
    video.addEventListener("play", () => {
      playBtn.style.opacity = "0";
    });
  });
});



  document.querySelectorAll('.kontainer').forEach(kontainer => {
    const video = kontainer.querySelector('video');
    let hoverTimeout;
    let lastTime = 0;

    kontainer.addEventListener('mouseenter', () => {
      hoverTimeout = setTimeout(() => {
        video.currentTime = lastTime;
        video.play();
      }, 300); // 300ms delay like YouTube
    });

    kontainer.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      lastTime = video.currentTime;
      video.pause();
      video.load(); // This resets the poster
    });
  });




document.addEventListener("click", function (e) {
  const trigger = e.target.closest(".popupTrigger");
  const allMenus = document.querySelectorAll(".popup-options");

  // Close all menus first
  allMenus.forEach(menu => menu.classList.remove("show"));

  // If clicked on a trigger, toggle its menu
  if (trigger) {
    const menu = trigger.parentElement.querySelector(".popup-options");
    menu.classList.toggle("show");
    e.stopPropagation();
  }
});

// Select all shorts
document.querySelectorAll('.shorts').forEach(short => {

  const optionsBtn = short.querySelector('.options-btn');
  const optionsMenu = short.querySelector('.options-menu');

  // Toggle menu when clicking the 3 dots
  optionsBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      // First close all other menus
      document.querySelectorAll('.options-menu').forEach(menu => {
          if (menu !== optionsMenu) menu.classList.add('hidden');
      });

      // Toggle this one
      optionsMenu.classList.toggle('hidden');
  });

  // Close menu if clicking inside short but NOT on the button
  short.addEventListener('click', () => {
      optionsMenu.classList.add('hidden');
  });

});

// Close menu when clicking ANYWHERE outside
document.addEventListener('click', () => {
  document.querySelectorAll('.options-menu').forEach(menu => {
      menu.classList.add('hidden');
  });
});

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.captionn-toggle').forEach(button => {
      button.addEventListener('click', () => {
        // Find this caption and its short-video wrapper
        const caption = button.closest('.captionn');
        const profile = button.closest('.short-video').querySelector('.profile');
  
        // Toggle the expanded state
        const isExpanded = captionn.classList.toggle('expanded');
  
        // Toggle profile shift
        profile.classList.toggle('shift-up', isExpanded);
  
        // Update button text
        button.textContent = isExpanded ? 'see less' : 'see more';
      });
    });
  });



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



/* =========================================================
   SEARCH FILTER SYSTEM
========================================================= */

const filterButton =
    document.getElementById("filterButton");

const filterPopup =
    document.getElementById("filterPopup");

const filterClose =
    document.getElementById("filterClose");

const applyFilters =
    document.getElementById("applyFilters");

const clearFilters =
    document.getElementById("clearFilters");


/* =========================================================
   OPEN FILTERS
========================================================= */

filterButton.addEventListener("click", function (event) {

    event.stopPropagation();

    const isHidden =
        filterPopup.classList.contains("hidden");


    if (isHidden) {

        filterPopup.classList.remove("hidden");

        filterPopup.setAttribute(
            "aria-hidden",
            "false"
        );

        filterButton.setAttribute(
            "aria-expanded",
            "true"
        );

    } else {

        closeFilters();

    }

});


/* =========================================================
   CLOSE FILTERS
========================================================= */

function closeFilters() {

    filterPopup.classList.add("hidden");

    filterPopup.setAttribute(
        "aria-hidden",
        "true"
    );

    filterButton.setAttribute(
        "aria-expanded",
        "false"
    );
}


filterClose.addEventListener(
    "click",
    closeFilters
);


/* =========================================================
   CLICK OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !filterPopup.contains(event.target) &&
            !filterButton.contains(event.target)
        ) {

            closeFilters();

        }

    }
);


/* =========================================================
   PREVENT POPUP CLICK FROM CLOSING IT
========================================================= */

filterPopup.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

    }
);


/* =========================================================
   CLEAR FILTERS
========================================================= */

clearFilters.addEventListener(
    "click",
    function () {

        const checkboxes =
            filterPopup.querySelectorAll(
                'input[type="checkbox"]'
            );

        const radios =
            filterPopup.querySelectorAll(
                'input[type="radio"]'
            );


        checkboxes.forEach(
            checkbox => {
                checkbox.checked = false;
            }
        );


        radios.forEach(
            radio => {
                radio.checked = false;
            }
        );


        document.getElementById(
            "filterSort"
        ).value = "relevance";

    }
);


/* =========================================================
   APPLY FILTERS
========================================================= */

applyFilters.addEventListener(
    "click",
    function () {

        const selectedFilters = {

            countries: [],

            contentTypes: [],

            uploadDate: null,

            sortBy:
                document.getElementById(
                    "filterSort"
                ).value

        };


        /* Countries */

        filterPopup
            .querySelectorAll(
                '.filter-group:first-child input[type="checkbox"]:checked'
            )
            .forEach(input => {

                selectedFilters.countries.push(
                    input.value
                );

            });


        /* Content types */

        filterPopup
            .querySelectorAll(
                '.filter-group:nth-child(2) input[type="checkbox"]:checked'
            )
            .forEach(input => {

                selectedFilters.contentTypes.push(
                    input.value
                );

            });


        /* Upload date */

        const selectedDate =
            filterPopup.querySelector(
                'input[name="uploadDate"]:checked'
            );


        if (selectedDate) {

            selectedFilters.uploadDate =
                selectedDate.value;

        }


        console.log(
            "Selected Nettoon search filters:",
            selectedFilters
        );


        /*
         * BACKEND SEARCH LOGIC WILL EVENTUALLY
         * USE selectedFilters.
         *
         * Example:
         *
         * searchContent({
         *     query: searchQuery,
         *     filters: selectedFilters
         * });
         */


        closeFilters();

    }
);