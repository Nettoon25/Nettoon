

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


const commentsBtn =
document.querySelector('.commentss');

const commentContainer =
document.querySelector('.comment-container');

commentsBtn.addEventListener('click', () => {

    commentContainer.classList.toggle('active');

});


/* ===================================================== */
/* UNIVERSAL SIGN-IN POPUP */
/* ===================================================== */

const signinPopup =
document.getElementById('signinPopup');

const closeSigninPopup =
document.getElementById('closeSigninPopup');

const cancelSigninBtn =
document.querySelector('.signin-cancel-btn');

/* ========================================== */
/* OPEN POPUP TRIGGERS */
/* ========================================== */

const authTriggers = [

  '.likess',
  '.dislikee',
    '.send-btn',
  '.follow',
  '.reply'

];

/* ATTACH EVENTS */

authTriggers.forEach(selector => {

  document.querySelectorAll(selector).forEach(item => {

    item.addEventListener('click', (e) => {

      e.preventDefault();

      signinPopup.classList.remove('hidden');

    });

  });

});

/* ========================================== */
/* CLOSE POPUP */
/* ========================================== */

closeSigninPopup.addEventListener('click', () => {

  signinPopup.classList.add('hidden');

});

cancelSigninBtn.addEventListener('click', () => {

  signinPopup.classList.add('hidden');

});

/* ========================================== */
/* CLOSE WHEN CLICKING OUTSIDE */
/* ========================================== */

signinPopup.addEventListener('click', (e) => {

  if(e.target === signinPopup){

    signinPopup.classList.add('hidden');

  }

});

document.querySelector('.commentss')
.addEventListener('click', () => {

   document
   .querySelector('.comment-container')
   .classList.toggle('show-comments');

});
/* ================================================= */
/* COMMENT TEXTAREA INTERACTION */
/* ================================================= */

document.querySelectorAll('.commentt').forEach(commentBox => {

    const textarea =
    commentBox.querySelector('.comment-textarea');

    const cancelBtn =
    commentBox.querySelector('.cancel-btn');

    /* SHOW BUTTONS WHEN TYPING */

    textarea.addEventListener('input', () => {

        if(textarea.value.trim() !== ''){

            commentBox.classList.add('typing');

        }

        else{

            commentBox.classList.remove('typing');

        }

    });

    /* CANCEL COMMENT */

    cancelBtn.addEventListener('click', () => {

        textarea.value = '';

        commentBox.classList.remove('typing');

    });

});



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
