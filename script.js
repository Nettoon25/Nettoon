

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


document.querySelectorAll('.videoo').forEach(videoContainer => {
  const video = videoContainer.querySelector('video');
  const timerEl = videoContainer.querySelector('.overlay-textt');

  let lastTime = 0;
  let totalDuration = 0;
  let countdownInterval;

  // Get video duration
  video.addEventListener('loadedmetadata', () => {
      totalDuration = video.duration;
      timerEl.textContent = formatTime(totalDuration);
  });

  // Hover ON → play from saved position
  videoContainer.addEventListener('mouseenter', () => {
      clearInterval(countdownInterval);

      // show video (so poster disappears)
      video.style.display = "block";

      // continue from last known time
      if (!isNaN(lastTime)) {
          try { video.currentTime = lastTime; } catch(e) {}
      }

      video.play().catch(()=>{});

      // Start countdown
      countdownInterval = setInterval(() => {
          const remaining = totalDuration - video.currentTime;

          timerEl.textContent = formatTime(remaining <= 0 ? 0 : remaining);

          if (remaining <= 0) clearInterval(countdownInterval);
      }, 200);
  });

  // Hover OUT → pause but DO NOT RESET
  videoContainer.addEventListener('mouseleave', () => {
      clearInterval(countdownInterval);

      // save current progress
      lastTime = video.currentTime;

      // pause the video
      video.pause();

      // force poster frame to show WITHOUT resetting playback
      video.style.display = "none";
      setTimeout(() => {
          video.style.display = "block";
      }, 10);

      // update overlay timer
      const remaining = totalDuration - lastTime;
      timerEl.textContent = formatTime(remaining);
  });
});

// time format helper
function formatTime(sec) {
  sec = Math.max(0, Math.floor(sec));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2,'0')}`;
}



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

  // helper: close all popups
  function closeAllPopups() {
    document.querySelectorAll(".opttions-popup").forEach(p => p.classList.add("hidden"));
    document.querySelectorAll(".share-popup").forEach(p => p.classList.add("hidden"));
    document.querySelectorAll(".playlist-popup").forEach(p => p.classList.add("hidden"));
    document.querySelectorAll(".report-popup").forEach(p => p.classList.add("hidden"));
  }

  // For each card make popups independent
  document.querySelectorAll(".profilee").forEach(card => {

    const optionsBtn = card.querySelector(".opttions");
    const optionsPopup = card.querySelector(".opttions-popup");

    // Safe guards
    if (!optionsBtn || !optionsPopup) return;

    const popupItems = optionsPopup.querySelectorAll(".popup-item");
    const shareBtn = popupItems[0];
    const playlistBtn = popupItems[1];
    const reportBtn = popupItems[2];

    const sharePopup = card.querySelector(".share-popup");
    const playlistPopup = card.querySelector(".playlist-popup");
    const reportPopup = card.querySelector(".report-popup");

    // ==== OPTIONS button toggles its menu ====
    optionsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // close other cards' popups
      closeAllPopups();
      optionsPopup.classList.toggle("hidden");
    });

    // ==== SHARE ====
    if (shareBtn && sharePopup) {
      shareBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllPopups();
        sharePopup.classList.toggle("hidden");
      });

      const shareClose = sharePopup.querySelector(".share-close");
      if (shareClose) {
        shareClose.addEventListener("click", (ev) => {
          ev.stopPropagation();
          sharePopup.classList.add("hidden");
        });
      }
    }

    // ==== PLAYLIST ====
    if (playlistBtn && playlistPopup) {
      playlistBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllPopups();
        playlistPopup.classList.toggle("hidden");
      });

      // find playlist list and add button by flexible selectors
      const playlistList = playlistPopup.querySelector(".playlist-list");
      // support both .add-playlist-btn OR #addPlaylistBtn OR .playlist-add
      const addBtn =
        playlistPopup.querySelector(".add-playlist-btn")
        || playlistPopup.querySelector("#addPlaylistBtn")
        || playlistPopup.querySelector(".playlist-add");

      if (addBtn && playlistList) {
        addBtn.addEventListener("click", (ev) => {
          ev.stopPropagation();

          const wrapper = document.createElement("label");
          wrapper.classList.add("playlist-option");

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("playlist-check");

          const input = document.createElement("input");
          input.type = "text";
          input.placeholder = "New Playlist";
          input.classList.add("playlist-input");

          wrapper.appendChild(checkbox);
          wrapper.appendChild(input);

          // If addBtn is a child of playlistList, insert before it, otherwise append to list
          if (playlistList.contains(addBtn)) {
            playlistList.insertBefore(wrapper, addBtn);
          } else {
            playlistList.appendChild(wrapper);
          }

          input.focus();

          const finalize = () => {
            if (!input.parentNode) return; // already finalized
            let name = input.value.trim() || "Unnamed Playlist";
            input.remove();
            const label = document.createElement("span");
            label.textContent = name;
            wrapper.appendChild(label);
          };

          input.addEventListener("keypress", (e2) => {
            if (e2.key === "Enter") finalize();
          });

          input.addEventListener("blur", finalize);
        });
      }
    }

    // ==== REPORT ====
    if (reportBtn && reportPopup) {
      reportBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllPopups();
        reportPopup.classList.toggle("hidden");
      });

      // close X
      const reportClose = reportPopup.querySelector(".report-close");
      if (reportClose) {
        reportClose.addEventListener("click", (ev) => {
          ev.stopPropagation();
          // reset checkboxes
          reportPopup.querySelectorAll(".report-check").forEach(cb => cb.checked = false);
          updateReportButtonState(reportPopup);
          reportPopup.classList.add("hidden");
        });
      }

      // delegated change handler: works for existing and future checkboxes
      reportPopup.addEventListener("change", (ev) => {
        if (ev.target && ev.target.matches(".report-check")) {
          updateReportButtonState(reportPopup);
        }
      });

      // initialize button state
      updateReportButtonState(reportPopup);
    }

  }); // end per-card loop



  // Update the report button enabled/disabled for a given reportPopup element
  function updateReportButtonState(reportPopupEl) {
    if (!reportPopupEl) return;
    const checks = Array.from(reportPopupEl.querySelectorAll(".report-check"));
    const submitBtn = reportPopupEl.querySelector(".report-submit");
    if (!submitBtn) return;
    const anyChecked = checks.some(c => c.checked);
    if (anyChecked) {
      submitBtn.disabled = false;
      submitBtn.classList.add("active");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove("active");
    }
  }

  // ---- IMPORTANT: close popups only when clicking completely outside any card ----
  document.addEventListener("click", (e) => {
    // if the click is inside any .profilee, do nothing
    if (e.target.closest(".profilee")) return;
    closeAllPopups();
  });

  // Optional: close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllPopups();
  });

}); // DOMContentLoaded


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



