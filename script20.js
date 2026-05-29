

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


