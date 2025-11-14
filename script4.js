

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




