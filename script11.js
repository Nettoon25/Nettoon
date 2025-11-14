

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
  

  function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
  
    if (input.type === "password") {
      input.type = "text";
      icon.src = "views.png"; // 👁 open eye image
      icon.alt = "Hide Password";
    } else {
      input.type = "password";
      icon.src = "closed eyes.png"; // 🙈 closed eye image
      icon.alt = "Show Password";
    }
  }
  
