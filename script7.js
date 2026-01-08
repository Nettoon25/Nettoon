

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
  event.preventDefault();
  var dropdown = document.getElementById("accountDropdown");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
};

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
      event.stopPropagation();
      notificationContainer.classList.toggle("active");
  });

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


document.querySelectorAll('.shorts').forEach(shortsContainer => {
  const commentIcon = shortsContainer.querySelector('.comment-icon');

  commentIcon.addEventListener('click', () => {
    // Toggle the show-comments class on the shorts container
    shortsContainer.classList.toggle('show-comments');
  });
});



   document.addEventListener('DOMContentLoaded', () => {
    const scrollArea = document.querySelector('.scroll-area');
    const shorts = document.querySelectorAll('.shorts');
    const upBtn = document.querySelector('.up-btn');
    const downBtn = document.querySelector('.down-btn');

    let currentIndex = 0;

    function scrollToIndex(index) {
      if (index >= 0 && index < shorts.length) {
        shorts[index].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        currentIndex = index;
      }
    }

    downBtn.addEventListener('click', () => {
      scrollToIndex(currentIndex + 1);
    });

    upBtn.addEventListener('click', () => {
      scrollToIndex(currentIndex - 1);
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.caption-toggle').forEach(button => {
      button.addEventListener('click', () => {
        // Find this caption and its short-video wrapper
        const caption = button.closest('.caption');
        const profile = button.closest('.short-video').querySelector('.profile');
  
        // Toggle the expanded state
        const isExpanded = caption.classList.toggle('expanded');
  
        // Toggle profile shift
        profile.classList.toggle('shift-up', isExpanded);
  
        // Update button text
        button.textContent = isExpanded ? 'see less' : 'see more';
      });
    });
  });



  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.commentt').forEach(commentBox => {
      const textarea = commentBox.querySelector('textarea');

      textarea.addEventListener('input', () => {
        if (textarea.value.trim() !== "") {
          commentBox.classList.add('typing');
        } else {
          commentBox.classList.remove('typing');
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Loop through each short video block
    document.querySelectorAll(".shorts").forEach((short) => {
      const likeBtn = short.querySelector(".like");
      const dislikeBtn = short.querySelector(".dislike");
  
      const likeIcon = likeBtn.querySelector(".like-icon");
      const likedIcon = likeBtn.querySelector(".liked-icon");
      const likeCountSpan = likeBtn.querySelector("span");
  
      const dislikeIcon = dislikeBtn.querySelector(".dislike-icon");
      const dislikedIcon = dislikeBtn.querySelector(".disliked-icon");
      const dislikeCountSpan = dislikeBtn.querySelector("span");
  
      let isLiked = false;
      let isDisliked = false;
  
      likeBtn.addEventListener("click", () => {
        isLiked = !isLiked;
  
        if (isLiked) {
          likeIcon.classList.remove("visible");
          likedIcon.classList.add("visible");
          likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;
        } else {
          likedIcon.classList.remove("visible");
          likeIcon.classList.add("visible");
          likeCountSpan.textContent = Math.max(0, parseInt(likeCountSpan.textContent) - 1);
        }
      });
  
      dislikeBtn.addEventListener("click", () => {
        isDisliked = !isDisliked;
  
        if (isDisliked) {
          dislikeIcon.classList.remove("visible");
          dislikedIcon.classList.add("visible");
          dislikeCountSpan.textContent = parseInt(dislikeCountSpan.textContent) + 1;
        } else {
          dislikedIcon.classList.remove("visible");
          dislikeIcon.classList.add("visible");
          dislikeCountSpan.textContent = Math.max(0, parseInt(dislikeCountSpan.textContent) - 1);
        }
      });
    });
  });

  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
      const likeBox = section.querySelector('.likess');
      const dislikeBox = section.querySelector('.dislikee');
  
      const likeDefault = likeBox.querySelector('.like-icon-sec.default');
      const likeActive = likeBox.querySelector('.like-icon-sec.active');
      const likeCount = likeBox.querySelector('.like-count-sec');
  
      const dislikeDefault = dislikeBox.querySelector('.dislike-icon-sec.default');
      const dislikeActive = dislikeBox.querySelector('.dislike-icon-sec.active');
      const dislikeCount = dislikeBox.querySelector('.dislike-count-sec');
  
      let liked = false;
      let disliked = false;
  
      likeBox.addEventListener('click', () => {
        liked = !liked;
  
        if (liked) {
          likeDefault.classList.add('hidden');
          likeActive.classList.remove('hidden');
          likeCount.textContent = parseInt(likeCount.textContent) + 1;
        } else {
          likeDefault.classList.remove('hidden');
          likeActive.classList.add('hidden');
          likeCount.textContent = Math.max(0, parseInt(likeCount.textContent) - 1);
        }
      });
  
      dislikeBox.addEventListener('click', () => {
        disliked = !disliked;
  
        if (disliked) {
          dislikeDefault.classList.add('hidden');
          dislikeActive.classList.remove('hidden');
          dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
        } else {
          dislikeDefault.classList.remove('hidden');
          dislikeActive.classList.add('hidden');
          dislikeCount.textContent = Math.max(0, parseInt(dislikeCount.textContent) - 1);
        }
      });
    });
  });


  const videos = document.querySelectorAll('.short-video video');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
  
      if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
        // Pause all other videos
        videos.forEach(v => {
          if (v !== video) {
            v.pause();
            v.muted = true;
          }
        });
  
        // Play & unmute current
        video.play().catch(() => {});
        video.muted = false;
  
      } else {
        // Pause & mute when out of view
        video.pause();
        video.muted = true;
      }
    });
  }, {
    threshold: 0.75 // 75% visible = active video
  });
  
  videos.forEach(video => observer.observe(video));

document.querySelectorAll('.shareee').forEach(shareee => {
  const icon = shareee.querySelector('.reply-icon');
  const popup = shareee.querySelector('.shareee-popup');

  icon.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('hidden');
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.shareee-popup').forEach(popup => {
    popup.classList.add('hidden');
  });
});



document.querySelectorAll('.share').forEach(share => {
  share.addEventListener('click', () => {
    share.classList.toggle('active');
  });
});




// Close ALL popups across ALL cards
function closeAllPopups() {
  document.querySelectorAll(
      ".metadata-popup-new, .share-popup, .report-popup"
  ).forEach(p => p.classList.add("hidden"));
}

// GLOBAL CLICK LISTENER (handles everything)
document.addEventListener("click", function (e) {

  /* ------------------------------
     OPEN SMALL POPUP (3-DOTS MENU)
     ------------------------------ */
  if (e.target.classList.contains("options-btn")) {
      const card = e.target.closest(".options");
      const popup = card.querySelector(".metadata-popup-new");

      closeAllPopups();
      popup.classList.toggle("hidden");
      e.stopPropagation();
      return;
  }

  /* ------------------------------
     OPEN SHARE POPUP
     ------------------------------ */
  const shareBtn = e.target.closest(".popup-item-new[data-action='share']");
  if (shareBtn) {
      const card = shareBtn.closest(".options");
      const popup = card.querySelector(".share-popup");

      closeAllPopups();
      popup.classList.toggle("hidden");
      e.stopPropagation();
      return;
  }

  /* ------------------------------
     OPEN REPORT POPUP
     ------------------------------ */
  const reportBtn = e.target.closest(".popup-item-new[data-action='report']");
  if (reportBtn) {
      const card = reportBtn.closest(".options");
      const popup = card.querySelector(".report-popup");

      closeAllPopups();
      popup.classList.toggle("hidden");
      e.stopPropagation();
      return;
  }

  /* ------------------------------
     CLOSE SHARE or REPORT POPUPS
     ------------------------------ */
  if (
      e.target.classList.contains("share-close") ||
      e.target.classList.contains("report-close") ||
      e.target.classList.contains("report-cancel")
  ) {
      const popup = e.target.closest(".share-popup, .report-popup");
      popup.classList.add("hidden");
      return;
  }

  /* ------------------------------
     CLICK OUTSIDE → CLOSE ALL POPUPS
     ------------------------------ */
  const insidePopup = e.target.closest(
      ".metadata-popup-new, .share-popup, .report-popup, .options-btn"
  );

  if (!insidePopup) {
      closeAllPopups();
  }
});

/* =========================================================
 REPORT CHECKBOX / SUBMIT BUTTON ACTIVATION
 ========================================================= */

document.addEventListener("change", function (e) {
  if (e.target.classList.contains("report-check")) {
      const popup = e.target.closest(".report-popup");
      const submitBtn = popup.querySelector(".report-submit");

      const atLeastOneChecked =
          popup.querySelectorAll(".report-check:checked").length > 0;

      submitBtn.disabled = !atLeastOneChecked;
  }
});



// ==========================
// FIXED JAVASCRIPT
// ==========================


const shareBtn = document.querySelector('.reply-icon');
const sharePopup = document.getElementById('mainSharePopup');
const reportCommentTrigger = document.querySelector('.report-comment-trigger');
const commentReportPopup = document.getElementById('commentReportPopup');
const commentReportClose = document.getElementById('commentReportClose');
const commentChecks = document.querySelectorAll('.crp-check');
const commentReportSubmit = document.getElementById('commentReportSubmit');
const cancelBtn = document.querySelector('.crp-cancel');
const spamBtn = document.querySelector('.mark-spam');
const blockBtn = document.querySelector('.block-user');


// Toggle MAIN share popup
shareBtn.addEventListener('click', (e) => {
e.stopPropagation();
sharePopup.classList.toggle('hidden');
});


// Prevent other buttons from opening the comment report popup
spamBtn.addEventListener('click', (e) => {
e.stopPropagation();
sharePopup.classList.add('hidden');
// action for spam goes here
});


blockBtn.addEventListener('click', (e) => {
e.stopPropagation();
sharePopup.classList.add('hidden');
// action for block goes here
});


// Open ONLY the Report Comment popup
reportCommentTrigger.addEventListener('click', (e) => {
e.stopPropagation();
sharePopup.classList.add('hidden');
commentReportPopup.classList.remove('hidden');
});


// Close popup
commentReportClose.addEventListener('click', () => {
commentReportPopup.classList.add('hidden');
});


cancelBtn.addEventListener('click', () => {
commentReportPopup.classList.add('hidden');
});


// Enable the submit button only when at least one checkbox is selected
commentChecks.forEach(check => {
check.addEventListener('change', () => {
const anyChecked = [...commentChecks].some(ch => ch.checked);
commentReportSubmit.disabled = !anyChecked;
});
});


// Close popups on outside click
window.addEventListener('click', (e) => {
if (!sharePopup.contains(e.target) && e.target !== shareBtn) {
sharePopup.classList.add('hidden');
}


if (!commentReportPopup.contains(e.target) && !reportCommentTrigger.contains(e.target)) {
commentReportPopup.classList.add('hidden');
}
});



document.addEventListener("DOMContentLoaded", () => {

  // When user clicks the 3-dots menu
  document.querySelectorAll(".shareee .reply-icon").forEach(icon => {
    icon.addEventListener("click", (e) => {
      const card = e.target.closest(".shareee");
      const mainPopup = card.querySelector(".shareee-popup");

      // Toggle main popup
      mainPopup.classList.toggle("hidden");
    });
  });

  // When user clicks "Report Comment"
  document.querySelectorAll(".report-comment-trigger").forEach(button => {
    button.addEventListener("click", (e) => {
      const menu = e.target.closest(".shareee-popup");
      const card = menu.closest(".shareee");
      const reportPopup = card.querySelector(".comment-report-popup");

      // Open report popup
      reportPopup.classList.remove("hidden");

      // Close main menu
      menu.classList.add("hidden");
    });
  });

  // Close report popup buttons
  document.querySelectorAll(".crp-close, .crp-cancel").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const popup = e.target.closest(".comment-report-popup");
      popup.classList.add("hidden");

      // Reset checkboxes and disable submit
      const checks = popup.querySelectorAll(".crp-check");
      const submit = popup.querySelector(".crp-submit");

      checks.forEach(ch => ch.checked = false);
      submit.disabled = true;
    });
  });

  // Enable "Report" button when any checkbox is checked
  document.querySelectorAll(".comment-report-popup").forEach(popup => {
    const checks = popup.querySelectorAll(".crp-check");
    const submit = popup.querySelector(".crp-submit");

    checks.forEach(ch => {
      ch.addEventListener("change", () => {
        const anyChecked = Array.from(checks).some(c => c.checked);
        submit.disabled = !anyChecked;
      });
    });
  });

  // Submit report (you can add backend later)
  document.querySelectorAll(".crp-submit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const popup = e.target.closest(".comment-report-popup");
      popup.classList.add("hidden");

      alert("Comment reported. Thank you.");
    });
  });

  // Close any open popups by clicking outside
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".shareee").forEach(container => {
      const mainPopup = container.querySelector(".shareee-popup");
      const reportPopup = container.querySelector(".comment-report-popup");

      if (!container.contains(e.target)) {
        mainPopup.classList.add("hidden");
        reportPopup.classList.add("hidden");
      }
    });
  });

});


document.addEventListener("DOMContentLoaded", () => {

  // Open playlist popup
  document.querySelectorAll(".add-playlist-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".video-card, .card, .container");
      const popup = card.querySelector(".playlist-popup-v2");

      popup.classList.remove("hidden");
    });
  });

  // Close playlist popup
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("playlist-close-v2")) {
      const popup = e.target.closest(".playlist-popup-v2");
      popup.classList.add("hidden");
    }
  });

  // Add new playlist
  document.querySelectorAll("#addPlaylistBtnV2").forEach(addBtn => {
    addBtn.addEventListener("click", (e) => {
      const popup = e.target.closest(".playlist-popup-v2");
      const list = popup.querySelector(".playlist-list-v2");

      // Ask user for a playlist name
      let newName = prompt("Enter playlist name:");

      if (!newName || newName.trim() === "") return;

      // Create new playlist element
      const newPlaylist = document.createElement("label");
      newPlaylist.classList.add("playlist-option-v2");

      newPlaylist.innerHTML = `
        <input type="checkbox" class="playlist-check-v2" checked>
        <span>${newName}</span>
      `;

      // Add to the playlist list
      list.appendChild(newPlaylist);
    });
  });

});


document.querySelectorAll('.favourites').forEach(fav => {
  fav.addEventListener('click', () => {
    fav.classList.toggle('active');
  });
});