

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


function resizeVideoContainers() {
    const videos = document.querySelectorAll(".video video");
    const container = document.querySelector(".containerr");

    if (videos.length > 0 && container) {
        let width = container.clientWidth;
        let height = width * (9 / 16); // Maintain 16:9 aspect ratio

        videos.forEach(video => {
            video.style.width = `${width}px`;
            video.style.height = `${height}px`;
        });
    }
}

// Resize videos when the window loads or resizes
window.addEventListener("resize", resizeVideoContainers);
window.addEventListener("load", resizeVideoContainers);



// Select the comment icon, comment container, and container-1
const commentIcon = document.querySelector('.commentss');
const commentContainer = document.getElementById('commentContainer');
const container1 = document.querySelector('.container-1');

// Add event listener to the comment icon
commentIcon.addEventListener('click', function () {
    if (commentContainer.style.display === 'none' || commentContainer.style.display === '') {
        commentContainer.style.display = 'block'; // Show comment container
        container1.style.marginTop = '20px'; // Move container-1 down by 50px
    } else {
        commentContainer.style.display = 'none'; // Hide comment container
        container1.style.marginTop = '15px'; // Reset container-1 position
    }
});


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
    const buttons = document.querySelectorAll(".optionn > div");
    const sections = document.querySelectorAll(".video-group");

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        sections.forEach((sec, i) => {
          sec.style.display = i === index ? "flex" : "none";
        });
      });
    });

    // Default: Show "All" only
    sections.forEach((sec, i) => {
      sec.style.display = i === 0 ? "flex" : "none";
    });
  });


  const tabs = document.querySelectorAll('.optionn > div');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active')); // remove from all
      tab.classList.add('active'); // add to clicked
    });
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('.commentt textarea');

    textareas.forEach(textarea => {
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'; // Cap at 200px
      });
    });
  });
  

  const commentBox = document.querySelector('.commentt.new');
  const textarea = commentBox.querySelector('textarea');
  const cancelBtn = commentBox.querySelector('.cancel-btn');
  const sendBtn = commentBox.querySelector('.send-btn');

  textarea.addEventListener('input', () => {
    if (textarea.value.trim() !== '') {
      commentBox.classList.add('typing');
    } else {
      commentBox.classList.remove('typing');
    }
  });

  cancelBtn.addEventListener('click', () => {
    textarea.value = '';
    commentBox.classList.remove('typing');
  });

  sendBtn.addEventListener('click', () => {
    const comment = textarea.value.trim();
    if (comment) {
      console.log("Submitted comment:", comment);
      textarea.value = '';
      commentBox.classList.remove('typing');
    }
  });


  document.getElementById('submitCommentBtn').addEventListener('click', function () {
    const commentText = document.getElementById('newCommentText').value.trim();
  
    if (commentText === '') {
      alert('Please write a comment before submitting.');
      return;
    }
  
    // Create the main comment container
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('commentt', 'display');
  
    // Profile section
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('commentt-profile');
  
    const profileImg = document.createElement('img');
    profileImg.src = 'New folder/account.png'; // default profile image
    profileDiv.appendChild(profileImg);
  
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('commentt-name');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Afrilens'; // You can make this dynamic if needed
    nameDiv.appendChild(nameLabel);
    profileDiv.appendChild(nameDiv);
  
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('timer');
    const timeLabel = document.createElement('label');
    timeLabel.textContent = 'Just now';
    timeDiv.appendChild(timeLabel);
    profileDiv.appendChild(timeDiv);
  
    commentDiv.appendChild(profileDiv);
  
    // Comment text
    const commentTextarea = document.createElement('textarea');
    commentTextarea.rows = 5;
    commentTextarea.cols = 50;
    commentTextarea.readOnly = true;
    commentTextarea.textContent = commentText;
    commentDiv.appendChild(commentTextarea);
  
    // Action section
    const actionDiv = document.createElement('div');
    actionDiv.classList.add('commentt-Section');
  
    const likeDiv = document.createElement('div');
    likeDiv.classList.add('like');
    likeDiv.innerHTML = `<img src="New folder/like.png"><label>0</label>`;
  
    const replyDiv = document.createElement('div');
    replyDiv.classList.add('reply');
    replyDiv.innerHTML = `<img src="New folder/reply.png"><label>0</label>`;
  
    const sidebarDiv = document.createElement('div');
    sidebarDiv.classList.add('sidebarr');
    sidebarDiv.innerHTML = `<img src="New folder/sidebar 6.png">`;
  
    actionDiv.appendChild(likeDiv);
    actionDiv.appendChild(replyDiv);
    actionDiv.appendChild(sidebarDiv);
    commentDiv.appendChild(actionDiv);
  
    // Append the new comment to the scroll area
    const scrollArea = document.getElementById('commentScrollArea');
    scrollArea.appendChild(commentDiv);
  
    // Clear the textarea
    document.getElementById('newCommentText').value = '';
  
    // Optional: scroll to the bottom
    scrollArea.scrollTop = scrollArea.scrollHeight;
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


  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.video').forEach(container => {
        const video = container.querySelector('video');
        const overlay = container.querySelector('.play-overlay');

        if (!video || !overlay) {
            console.warn('Nettoon Main Player: Missing video or play overlay in a .video container. Skipping setup for this container.');
            return;
        }

        // We REMOVED video.controls = false; in the previous step,
        // so native controls will now appear as per your HTML 'controls' attribute.

        // Initial attempt to play. With 'autoplay muted' in HTML, this should succeed.
        video.play()
            .then(() => {
                // Video successfully started playing (muted by browser/HTML)
                overlay.style.opacity = '0'; // Hide the custom overlay
                // Attempt to unmute. THIS WILL ONLY WORK IF USER HAS ALREADY INTERACTED WITH THE PAGE.
                // Otherwise, the browser will likely re-mute it.
                video.muted = false;         
            })
            .catch(err => {
                // This catch block is for rare cases where even 'autoplay muted' fails completely.
                console.warn('Nettoon Main Player Autoplay failed completely:', err.message);
                overlay.style.opacity = '1'; // Show custom overlay
                video.muted = true; // Ensure it's muted if autoplay failed
            });

        // Show custom overlay when video is paused
        video.addEventListener('pause', () => {
            overlay.style.opacity = '1';
        });

        // Hide custom overlay when video starts playing
        video.addEventListener('play', () => {
            overlay.style.opacity = '0';
        });
        
        // Handle clicks on the custom overlay to toggle play/pause and unmute state
        overlay.addEventListener('click', () => {
            if (video.paused) {
                video.muted = false; // Unmute it when user explicitly clicks to play
                video.play();
            } else {
                video.pause();
            }
        });

        // When video ends, reset and show custom overlay
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.pause();
            overlay.style.opacity = '1';
        });
    });
});


  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sectionn').forEach(section => {
      // LIKE logic
      const likeBox = section.querySelector('.likess');
      const likeDefault = likeBox.querySelector('.like-icon.default');
      const likeActive = likeBox.querySelector('.like-icon.active');
      const likeCount = likeBox.querySelector('.like-count');
      let liked = false;
      let likeCounter = 0;
  
      likeBox.addEventListener('click', () => {
        liked = !liked;
        likeDefault.classList.toggle('hidden', liked);
        likeActive.classList.toggle('hidden', !liked);
        likeCounter = liked ? likeCounter + 1 : likeCounter - 1;
        likeCount.textContent = likeCounter;
      });
  
      // DISLIKE logic
      const dislikeBox = section.querySelector('.dislikee');
      const dislikeDefault = dislikeBox.querySelector('.dislike-icon.default');
      const dislikeActive = dislikeBox.querySelector('.dislike-icon.active');
      const dislikeCount = dislikeBox.querySelector('.dislike-count');
      let disliked = false;
      let dislikeCounter = 0;
  
      dislikeBox.addEventListener('click', () => {
        disliked = !disliked;
        dislikeDefault.classList.toggle('hidden', disliked);
        dislikeActive.classList.toggle('hidden', !disliked);
        dislikeCounter = disliked ? dislikeCounter + 1 : dislikeCounter - 1;
        dislikeCount.textContent = dislikeCounter;
      });
  
      // FOLLOW logic
      const followBox = section.querySelector('.follow');
      const followDefault = followBox.querySelector('.follow-icon.default');
      const followActive = followBox.querySelector('.follow-icon.active');
      const followLabel = followBox.querySelector('.follow-label');
      let following = false;
  
      followBox.addEventListener('click', () => {
        following = !following;
        followDefault.classList.toggle('hidden', following);
        followActive.classList.toggle('hidden', !following);
        followLabel.textContent = following ? 'Following' : 'Follow';
      });
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



const option = document.querySelector('.option');
const popup = document.querySelector('.option-popup');

option.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent click bubbling
  popup.classList.toggle('hidden');
});

// Hide when clicking outside
document.addEventListener('click', () => {
  popup.classList.add('hidden');
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


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".sidebarr").forEach(sidebar => {
    const popup = sidebar.querySelector(".sidebarr-popup");

    sidebar.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".sidebarr-popup").forEach(p => {
        if (p !== popup) p.classList.add("hidden");
      });
      popup.classList.toggle("hidden");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".sidebarr-popup").forEach(p => p.classList.add("hidden"));
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".popupTrigger");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();

      const currentPopup = this.nextElementSibling;

      // Hide all other popups
      document.querySelectorAll(".popupMenu").forEach(menu => {
        if (menu !== currentPopup) {
          menu.classList.remove("show");
        }
      });

      // Toggle current one
      currentPopup.classList.toggle("show");
    });
  });

  // Close all popups when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".popupMenu").forEach(menu => {
      menu.classList.remove("show");
    });
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


document.querySelectorAll(".popup-item").forEach(item => {
  item.addEventListener("click", () => {

      // get the card this popup-item belongs to
      const card = item.closest(".containerr");
      if (!card) return;

      // close the option popup in THIS card
      card.querySelector(".option-popup").classList.add("hidden");

      const text = item.innerText.trim().toLowerCase();

      // SHARE
      if (text === "share") {
          const popup = card.querySelector(".share-popup-v2");
          if (popup) popup.classList.remove("hidden");
      }

      // PLAYLIST
      if (text === "add to playlist") {
          const popup = card.querySelector(".playlist-popup-v2");
          if (popup) popup.classList.remove("hidden");
      }

      // REPORT
      if (text === "report") {
          const popup = card.querySelector(".report-popup-v2");
          if (popup) popup.classList.remove("hidden");
      }

  });
});

// CLOSE SHARE POPUP ON X CLICK
document.getElementById("shareCloseV2").addEventListener("click", () => {
  document.getElementById("sharePopupV2").classList.add("hidden");
});


// ========= PLAYLIST POPUP CONTROL =========
(function () {
  // Helper: close playlist popup and reset state
  function closePlaylistPopup(popup) {
    if (!popup) return;

    popup.classList.add("hidden");

    // uncheck playlist checkboxes
    const checks = popup.querySelectorAll(".playlist-check-v2");
    checks.forEach(cb => cb.checked = false);
  }

  // Close using the X button
  document.querySelectorAll(".playlist-close-v2").forEach(closeBtn => {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const card = closeBtn.closest(".containerr");
      let popup = null;

      if (card) popup = card.querySelector(".playlist-popup-v2");
      if (!popup) popup = document.getElementById("playlistPopupV2") || document.querySelector(".playlist-popup-v2");

      closePlaylistPopup(popup);
    });
  });

  // Optional: clicking outside closes the playlist popup
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".playlist-popup-v2:not(.hidden)").forEach(popup => {
      if (popup.contains(e.target)) return;
      closePlaylistPopup(popup);
    });
  });
})();



// ========= Report popup control (per-card, robust) =========
(function () {
  // Helper: close a popup and reset its state
  function closeReportPopup(popup) {
    if (!popup) return;
    // hide
    popup.classList.add("hidden");

    // uncheck all checkboxes inside this popup
    const checks = popup.querySelectorAll(".report-check-v2");
    checks.forEach(cb => cb.checked = false);

    // disable the submit button
    const submit = popup.querySelector(".report-submit-v2");
    if (submit) {
      submit.disabled = true;
      submit.classList.remove("active"); // if you use active class styling
    }
  }

  // Helper: update submit enabled state for the popup
  function updateReportSubmitState(popup) {
    if (!popup) return;
    const checks = Array.from(popup.querySelectorAll(".report-check-v2"));
    const anyChecked = checks.some(cb => cb.checked);
    const submit = popup.querySelector(".report-submit-v2");
    if (!submit) return;
    if (anyChecked) {
      submit.disabled = false;
      submit.classList.add("active");
    } else {
      submit.disabled = true;
      submit.classList.remove("active");
    }
  }

  // Attach to every close-X button for reports
  document.querySelectorAll(".report-close-v2").forEach(closeBtn => {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // find the card container
      const card = closeBtn.closest(".containerr");
      let popup = null;
      if (card) popup = card.querySelector(".report-popup-v2");
      // fallback: maybe popup is sibling or global with id
      if (!popup) popup = document.getElementById("reportPopupV2") || document.querySelector(".report-popup-v2");
      closeReportPopup(popup);
    });
  });

  // Attach to every Cancel button inside report popups
  document.querySelectorAll(".report-cancel-v2").forEach(cancelBtn => {
    cancelBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = cancelBtn.closest(".containerr");
      let popup = null;
      if (card) popup = card.querySelector(".report-popup-v2");
      if (!popup) popup = document.getElementById("reportPopupV2") || document.querySelector(".report-popup-v2");
      closeReportPopup(popup);
    });
  });

  // Wire up checkboxes inside report popups (per-card)
  document.querySelectorAll(".report-popup-v2").forEach(popup => {
    const checks = popup.querySelectorAll(".report-check-v2");
    checks.forEach(cb => {
      cb.addEventListener("change", () => updateReportSubmitState(popup));
    });

    // ensure initial state
    updateReportSubmitState(popup);
  });

  // Optional: clicking outside a visible report popup closes it (card-aware)
  document.addEventListener("click", (e) => {
    // find any visible report popups
    document.querySelectorAll(".report-popup-v2:not(.hidden)").forEach(popup => {
      // if the click happened inside the popup, do nothing
      if (popup.contains(e.target)) return;
      // if the click was on its card's option button etc., still close (You can tweak)
      closeReportPopup(popup);
    });
  });

})();



document.addEventListener("DOMContentLoaded", () => {

  const playlistList = document.getElementById("playlistListV2");
  const addPlaylistBtn = document.getElementById("addPlaylistBtnV2");
  const template = document.querySelector(".playlist-template");

  // Attach delete to existing playlist rows
  playlistList.querySelectorAll(".playlist-delete").forEach(deleteBtn => {
      deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // prevent parent trigger
          deleteBtn.closest(".playlist-option-v2").remove();
      });
  });

  // Add new playlist
  addPlaylistBtn.addEventListener("click", () => {

      const newPlaylist = template.cloneNode(true);
      newPlaylist.classList.remove("hidden", "playlist-template");

      // Add delete functionality
      const deleteBtn = newPlaylist.querySelector(".playlist-delete");
      deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          newPlaylist.remove();
      });

      playlistList.appendChild(newPlaylist);

      // Auto focus on the editable name
      const editableName = newPlaylist.querySelector(".playlist-editable");
      editableName.focus();
      document.execCommand("selectAll", false, null);
  });

});


document.querySelectorAll('.optionss').forEach(option => {
  const trigger = option.querySelector('.popupTrigger');
  trigger.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent click from closing immediately
    // toggle the active class
    option.classList.toggle('active');
  });
});

// Close popup when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.optionss.active').forEach(option => {
    option.classList.remove('active');
  });
});
