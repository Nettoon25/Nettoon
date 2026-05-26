

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
  
  function toggleReadMore(event) {
    event.preventDefault();
  
    const moreText = document.getElementById("moreText");
    const toggleBtn = document.getElementById("toggleBtn");
    const container = document.getElementById("container2");
  
    const isHidden = moreText.style.display === "none" || moreText.style.display === "";
  
    moreText.style.display = isHidden ? "inline" : "none";
    toggleBtn.textContent = isHidden ? "See less" : "See more";
  
    container.classList.toggle("collapsed", !isHidden);
    container.classList.toggle("expanded", isHidden);
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    // For container-3 follow
    document.querySelectorAll('.container-3 .follow').forEach(followBox => {
      const followDefaultImg = followBox.querySelector('.follow-icon.default');
      const followActiveImg = followBox.querySelector('.follow-icon.active');
      const followLabel = followBox.querySelector('.follow-label:not(.active)');
      const followingLabel = followBox.querySelector('.follow-label.active');
      let isFollowing = false;

      followBox.addEventListener('click', () => {
        isFollowing = !isFollowing;
        followDefaultImg.classList.toggle('hidden', isFollowing);
        followActiveImg.classList.toggle('hidden', !isFollowing);
        followLabel.classList.toggle('hidden', isFollowing);
        followingLabel.classList.toggle('hidden', !isFollowing);
      });
    });
  });



          document.addEventListener('DOMContentLoaded', function () {
            const tabs = document.querySelectorAll('.container-4 .tab');
            const containers = document.querySelectorAll('.content-container');
          
            tabs.forEach(tab => {
              tab.addEventListener('click', () => {
                // Remove active-tab from all tabs
                tabs.forEach(t => t.classList.remove('active-tab'));
          
                // Hide all containers
                containers.forEach(c => c.style.display = 'none');
          
                // Activate clicked tab
                tab.classList.add('active-tab');
          
                // Show related container
                const targetSelector = tab.getAttribute('data-target');
                const target = document.querySelector(targetSelector);
                if (target) {
                  target.style.display = 'flex';
                }
              });
            });
          
            // Optional: Set default tab on load
            const defaultTab = document.querySelector('.tab.my-videos');
            if (defaultTab) {
              defaultTab.classList.add('active-tab');
              document.querySelector('.container-1').style.display = 'flex';
            }
          });




// Your JavaScript from the previous response is correct for the desired behavior
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shorts').forEach(container => {
      const video = container.querySelector('video');
      const overlay = container.querySelector('.play-overlay');

      if (!video || !overlay) {
          console.warn('Nettoon Shorts: Missing video or play overlay element in a .shorts container. Skipping setup for this container.');
          return;
      }

      video.controls = false; // Hide native video player controls
      video.muted = true;     // Videos start muted, user clicks to enable sound and play
      video.pause();          // Explicitly pause it initially to prevent any browser default autoplay

      overlay.style.opacity = '1'; // Ensure the play overlay is visible by default.

      overlay.addEventListener('click', () => {
          if (video.paused) {
              video.muted = false; // Unmute the video on the first click to play
              video.play().then(() => {
                  overlay.style.opacity = '0';
              }).catch(err => {
                  console.error('Nettoon Shorts: Playback failed after click:', err);
                  overlay.style.opacity = '1';
              });
          } else {
              video.pause();
          }
      });

      video.addEventListener('play', () => {
          overlay.style.opacity = '0';
      });

      video.addEventListener('pause', () => {
          overlay.style.opacity = '1';
      });

      video.addEventListener('ended', () => {
          video.pause();
          video.currentTime = 0;
          overlay.style.opacity = '1';
      });
  });
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



document.addEventListener("DOMContentLoaded", () => {

  const trigger = document.querySelector(".option-action-trigger");
  const menu = document.querySelector(".option-action-menu");

  const sharePanel = document.querySelector(".share-panel");
  const reportPanel = document.querySelector(".report-panel");

  const openShare = document.querySelector(".open-share-panel");
  const openReport = document.querySelector(".open-report-panel");

  const closeShare = document.querySelector(".share-panel-close");
  const closeReport = document.querySelector(".report-panel-close");

  // OPEN MAIN MENU
  trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");

      sharePanel.classList.add("hidden");
      reportPanel.classList.add("hidden");
  });

  // OPEN SHARE PANEL
  openShare.addEventListener("click", (e) => {
      e.stopPropagation();
      sharePanel.classList.remove("hidden");
      reportPanel.classList.add("hidden");
  });

  closeShare.addEventListener("click", () => {
      sharePanel.classList.add("hidden");
  });

  // OPEN REPORT PANEL
  openReport.addEventListener("click", (e) => {
      e.stopPropagation();
      reportPanel.classList.remove("hidden");
      sharePanel.classList.add("hidden");
  });

  closeReport.addEventListener("click", () => {
      reportPanel.classList.add("hidden");
  });

  // REPORT CHECKBOX LOGIC
  const reportChecks = document.querySelectorAll(".report-panel-check");
  const reportSubmit = document.querySelector(".report-panel-submit");
  const reportCancel = document.querySelector(".report-panel-cancel");

  reportChecks.forEach(check => {
      check.addEventListener("change", () => {
          const anyChecked = [...reportChecks].some(c => c.checked);
          reportSubmit.disabled = !anyChecked;
          reportSubmit.classList.toggle("active", anyChecked);
      });
  });

  reportCancel.addEventListener("click", () => {
      reportPanel.classList.add("hidden");
  });

  // CLOSE ALL ON OUTSIDE CLICK
  document.addEventListener("click", () => {
      menu.classList.add("hidden");
      sharePanel.classList.add("hidden");
      reportPanel.classList.add("hidden");
  });

  menu.addEventListener("click", e => e.stopPropagation());
  sharePanel.addEventListener("click", e => e.stopPropagation());
  reportPanel.addEventListener("click", e => e.stopPropagation());

});


/* ================================================= */
/* GLOBAL DELETE VIDEO SYSTEM */
/* ================================================= */

const deletePopup = document.getElementById("deletePopup");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

let selectedCard = null;

/* ========================= */
/* OPEN DELETE POPUP */
/* ========================= */

document.querySelectorAll(".delete-trigger").forEach((btn) => {

  btn.addEventListener("click", function () {

    /* FIND PARENT VIDEO CARD */
    selectedCard = this.closest(".kontainer");

    /* SHOW DELETE POPUP */
    deletePopup.classList.remove("hidden");

  });

});

/* ========================= */
/* CANCEL DELETE */
/* ========================= */

cancelDelete.addEventListener("click", () => {

  deletePopup.classList.add("hidden");

});

/* ========================= */
/* CONFIRM DELETE */
/* ========================= */

confirmDelete.addEventListener("click", () => {

  if (selectedCard) {

    selectedCard.remove();

  }

  deletePopup.classList.add("hidden");

});
let currentShort = null;

/* ============================================ */
/* SHORTS MENU SYSTEM */
/* ============================================ */

document.querySelectorAll('.shorts').forEach(short => {

    const optionsBtn =
    short.querySelector('.options-btn');

    const optionsMenu =
    short.querySelector('.options-menu');

    const shareBtn =
    short.querySelector('.open-share');

    const deleteBtn =
    short.querySelector('.open-delete');

    /* ============================= */
    /* OPEN / CLOSE OPTIONS MENU */
    /* ============================= */

    optionsBtn.addEventListener('click', (e) => {

        e.stopPropagation();

        document.querySelectorAll('.options-menu')
        .forEach(menu => {

            if(menu !== optionsMenu){

                menu.classList.add('hidden');
            }
        });

        optionsMenu.classList.toggle('hidden');

    });

    /* ============================= */
    /* SHARE POPUP */
    /* ============================= */

    shareBtn.addEventListener('click', (e) => {

        e.stopPropagation();

        document
        .getElementById('shortsSharePopup')
        .classList.remove('hidden');

        optionsMenu.classList.add('hidden');

    });

    /* ============================= */
    /* DELETE POPUP */
    /* ============================= */

    deleteBtn.addEventListener('click', (e) => {

        e.stopPropagation();

        currentShort = short;

        document
        .getElementById('shortsDeletePopup')
        .classList.remove('hidden');

        optionsMenu.classList.add('hidden');

    });

});

/* ============================================ */
/* SHARE POPUP CLOSE */
/* ============================================ */

const shortsShareClose =
document.getElementById('shortsShareClose');

if(shortsShareClose){

    shortsShareClose.addEventListener('click', () => {

        document
        .getElementById('shortsSharePopup')
        .classList.add('hidden');

    });

}

/* ============================================ */
/* DELETE POPUP BUTTONS */
/* ============================================ */

const shortsCancelDelete =
document.getElementById('shortsCancelDelete');

const shortsConfirmDelete =
document.getElementById('shortsConfirmDelete');

if(shortsCancelDelete){

    shortsCancelDelete.addEventListener('click', () => {

        document
        .getElementById('shortsDeletePopup')
        .classList.add('hidden');

    });

}

if(shortsConfirmDelete){

    shortsConfirmDelete.addEventListener('click', () => {

        if(currentShort){

            currentShort.remove();

        }

        document
        .getElementById('shortsDeletePopup')
        .classList.add('hidden');

        currentShort = null;

    });

}

/* ============================================ */
/* CLOSE MENUS WHEN CLICKING OUTSIDE */
/* ============================================ */

document.addEventListener('click', () => {

    document.querySelectorAll('.options-menu')
    .forEach(menu => {

        menu.classList.add('hidden');

    });

});

document.querySelectorAll('.videoo').forEach(videoContainer => {
  const video = videoContainer.querySelector('video');
  const timerEl = videoContainer.querySelector('.overlay-textt');

  let lastTime = 0;
  let totalDuration = 0;
  let countdownInterval;

  // Load metadata to get total duration
  video.addEventListener('loadedmetadata', () => {
      totalDuration = video.duration;
      timerEl.textContent = formatTime(totalDuration);
  });

  // When user hovers ON
  videoContainer.addEventListener('mouseenter', () => {
      clearInterval(countdownInterval);

      video.currentTime = lastTime;

      video.play().catch(() => {});
      
      countdownInterval = setInterval(() => {
          const remaining = totalDuration - video.currentTime;

          if (remaining <= 0) {
              timerEl.textContent = "0:00";
              clearInterval(countdownInterval);
          } else {
              timerEl.textContent = formatTime(remaining);
          }
      }, 200); // update 5 times/sec like YouTube
  });

  // When user hovers OUT
  videoContainer.addEventListener('mouseleave', () => {
      clearInterval(countdownInterval);

      lastTime = video.currentTime;

      video.pause();
      video.load();

      // Reset overlay to latest remaining time
      const remaining = totalDuration - lastTime;
      timerEl.textContent = formatTime(remaining);
  });
});

// FORMAT TIMER LIKE YOUTUBE
function formatTime(seconds) {
  seconds = Math.max(0, Math.floor(seconds));
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
