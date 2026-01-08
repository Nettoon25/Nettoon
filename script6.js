

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

document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Remove active classes
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        // Add active to clicked tab + its content
        btn.classList.add("active");
        document.getElementById(btn.dataset.target).classList.add("active");
      });
    });
  });


  function previewNewSeriesThumbnail(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById("newSeriesThumbnailPreview");

    previewContainer.innerHTML = ""; // Clear old preview

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "180px";
        img.style.height = "auto";
        img.style.borderRadius = "10px";
        img.style.marginTop = "10px";

        previewContainer.appendChild(img);
    };

    reader.readAsDataURL(file);
}


















document.addEventListener("DOMContentLoaded", function() {
    const tagInput = document.getElementById("tagInput");
    const tagsContainer = document.getElementById("tags-container");
    let tags = []; // Store tags

    tagInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let tagText = tagInput.value.trim();
            
            if (tagText !== "" && !tags.includes(tagText)) {
                addTag(tagText);
            }
            
            tagInput.value = ""; // Clear input after adding
        }
    });

    function addTag(tagText) {
        if (tags.length >= 10) {
            alert("You can add a maximum of 10 tags.");
            return;
        }

        tags.push(tagText);
        
        let tagElement = document.createElement("span");
        tagElement.classList.add("tag");
        tagElement.innerHTML = `${tagText} <span class="remove-tag">&times;</span>`;
        
        tagElement.querySelector(".remove-tag").addEventListener("click", function() {
            removeTag(tagText, tagElement);
        });

        tagsContainer.insertBefore(tagElement, tagInput);
    }

    function removeTag(tagText, tagElement) {
        tags = tags.filter(tag => tag !== tagText);
        tagElement.remove();
    }
});


document.querySelectorAll('.playlist-dropdown').forEach(dropdown => {
  const toggleBtn = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  // Toggle on click
  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  // Close if clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove('show');
    }
  });
});


  
  document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('episodesWrapper');
    const addBtn  = document.getElementById('addEpisodeBtn');
    const template = wrapper.querySelector('.Episodess');

    // Add Episode
    addBtn.addEventListener('click', () => {
      const clone = template.cloneNode(true);

      // clear inputs in the clone
      clone.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.tagName === 'SELECT') {
          el.selectedIndex = 0;
        } else if (el.type === 'file') {
          const fresh = el.cloneNode(true); // reset file input
          el.replaceWith(fresh);
        } else {
          el.value = '';
        }
      });

      // show delete button on the clone
      clone.querySelector('.delete').style.display = 'flex';

      wrapper.appendChild(clone);
    });

    // Delete Episode
    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('.delete')) {
        const block = e.target.closest('.Episodess');
        const total = wrapper.querySelectorAll('.Episodess').length;
        if (total > 1) {
          block.remove();
        } else {
          alert('At least one episode must remain.');
        }
      }
    });
  });