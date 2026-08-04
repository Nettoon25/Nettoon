

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