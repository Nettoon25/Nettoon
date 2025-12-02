

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
