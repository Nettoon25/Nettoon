

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