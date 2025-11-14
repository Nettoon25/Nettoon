

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

let userInteracted = false;

// Unlock autoplay with sound on first user interaction
window.addEventListener('click', () => {
  userInteracted = true;
}, { once: true });

document.querySelectorAll('.kontainer').forEach(kontainer => {
  const video = kontainer.querySelector('video');
  let hoverTimeout;
  let lastTime = 0;

  // Hover starts playback with optional sound
  kontainer.addEventListener('mouseenter', () => {
    hoverTimeout = setTimeout(() => {
      video.currentTime = lastTime;

      if (userInteracted) {
        video.muted = false; // Sound ON after user click
      } else {
        video.muted = true;  // Fallback silent autoplay
      }

      video.play();
    }, 300); // Add delay like YouTube
  });

  // Hover out: pause and reset to poster
  kontainer.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    lastTime = video.currentTime;
    video.pause();
    video.load(); // Reset to show poster
  });

  // Optional: toggle mute state on video click
  video.addEventListener('click', () => {
    video.muted = !video.muted;
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const rectangles = document.querySelectorAll(".rectanglee");
  const containers = document.querySelectorAll('[id^="container-"]');

  rectangles.forEach(rect => {
    rect.addEventListener("click", () => {
      // Remove 'active' from all tabs
      rectangles.forEach(r => r.classList.remove("active"));

      // Hide all containers
      containers.forEach(c => c.style.display = "none");

      // Activate clicked tab
      rect.classList.add("active");

      // Show corresponding container
      const targetId = rect.getAttribute("data-target");
      const targetContainer = document.getElementById(targetId);
      if (targetContainer) {
        targetContainer.style.display = "flex";
      }
    });
  });

  // Set "All" as default active
  const defaultRect = document.querySelector('.rectanglee[data-target="container-1"]');
  const defaultContainer = document.getElementById("container-1");

  if (defaultRect && defaultContainer) {
    defaultRect.classList.add("active");
    defaultContainer.style.display = "flex";
  }
});



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".opttions").forEach(opt => {
    const popup = opt.querySelector(".opttions-popup");

    opt.addEventListener("click", (e) => {
      e.stopPropagation();

      // Close others
      document.querySelectorAll(".opttions-popup").forEach(p => {
        if (p !== popup) p.classList.add("hidden");
      });

      popup.classList.toggle("hidden");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".opttions-popup").forEach(p => p.classList.add("hidden"));
  });
});