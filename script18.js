

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


const titleInput =
document.getElementById("videoTitleInput");

const videoTitle =
document.querySelector(".captionn h3");

titleInput.addEventListener("input", () => {

    videoTitle.textContent =
    titleInput.value;

});


const thumbnailInput = document.getElementById("thumbnailUpload");
const thumbnailPreview = document.getElementById("thumbnailPreview");
const videoPlayer = document.getElementById("videoPlayer");

thumbnailInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const image = e.target.result;

        // Update upload preview
        thumbnailPreview.src = image;

        // Update video poster
        videoPlayer.poster = image;

        // Save for refresh
        localStorage.setItem("videoThumbnail", image);

    };

    reader.readAsDataURL(file);

});


const saveBtn = document.getElementById("saveVideoBtn");

saveBtn.addEventListener("click", () => {

    // Disable button while saving
    saveBtn.disabled = true;

    // Show saving state
    saveBtn.textContent = "Saving...";

    // Simulate saving
    setTimeout(() => {

        // Show success state
        saveBtn.textContent = "Saved!";

        // Return to normal after 2 seconds
        setTimeout(() => {

            saveBtn.textContent = "Save Changes";
            saveBtn.disabled = false;

        }, 2000);

    }, 1500);

});

const textarea = document.getElementById("videoDescription");

const overlay = document.getElementById("descriptionOverlay");

textarea.addEventListener("input", () => {

    if(textarea.value.trim() !== ""){

        overlay.style.opacity = "0";

    }else{

        overlay.style.opacity = "1";

    }

});


const selector =
document.querySelector(".playlist-selected");

const dropdown =
document.querySelector(".playlist-dropdown");

selector.onclick = () => {

    dropdown.classList.toggle("hidden");

};



const createPlaylistBtn =
document.querySelector(".new-playlist-btn");

const playlistDropdown =
document.querySelector(".playlist-dropdown");


createPlaylistBtn.addEventListener("click", () => {

    const existing =
    document.querySelector(".playlist-new");

    if(existing) return;

    const playlist = document.createElement("label");

    playlist.className = "playlist-item playlist-new";

    playlist.innerHTML = `

        <input
        type="radio"
        name="playlist">

        <div class="playlist-thumbnail">

            <img src="playlist-default.png">

        </div>

        <div class="playlist-info">

            <input
            class="playlist-name-input"
            placeholder="New Playlist">

        </div>

    `;

    playlistDropdown.insertBefore(
        playlist,
        createPlaylistBtn
    );

    playlist.querySelector(".playlist-name-input").focus();

});


document.addEventListener("keydown",(e)=>{

    if(e.key !== "Enter") return;

    const input =
    e.target;

    if(!input.classList.contains("playlist-name-input"))
        return;

    e.preventDefault();

    if(input.value.trim()===""){

        input.value="Untitled Playlist";

    }

    input.blur();

});


playlist.querySelector("input[type='radio']").checked = true;


const playlistSelected =
document.querySelector(".playlist-selected span");

document.addEventListener("change",(e)=>{

    if(e.target.type!=="radio") return;

    const title =
    e.target.closest(".playlist-item")
    .querySelector(".playlist-info")
    .innerText;

    playlistSelected.textContent =
    title;

});


document.addEventListener("change",(e)=>{

    if(e.target.type!=="radio") return;

    playlistDropdown.classList.add("hidden");

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



const searchInput = document.getElementById("search");
const dropdown = document.getElementById("searchDropdown");

searchInput.addEventListener("input", () => {

    console.log("typing...");

    dropdown.classList.remove("hidden");

});



/* ===========================================
   DELETE VIDEO
=========================================== */

const deletePopup = document.getElementById("shortsDeletePopup");
const cancelDelete = document.getElementById("shortsCancelDelete");
const confirmDelete = document.getElementById("shortsConfirmDelete");

let selectedVideo = null;

/* Open popup */

document.querySelectorAll(".delete-trigger").forEach(btn => {

    btn.addEventListener("click", () => {

        selectedVideo = btn.closest(".kontainer");

        deletePopup.classList.remove("hidden");

    });

});

/* Cancel */

cancelDelete.addEventListener("click", () => {

    deletePopup.classList.add("hidden");

    selectedVideo = null;

});

/* Confirm Delete */

confirmDelete.addEventListener("click", () => {

    if(selectedVideo){

        selectedVideo.remove();   // Temporarily removes from page

    }

    deletePopup.classList.add("hidden");

    selectedVideo = null;

});

/* Close outside */

deletePopup.addEventListener("click",(e)=>{

    if(e.target===deletePopup){

        deletePopup.classList.add("hidden");

        selectedVideo=null;

    }

});