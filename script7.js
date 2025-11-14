

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



  document.addEventListener('DOMContentLoaded', () => {
    // Select all short video containers
    document.querySelectorAll('.short-video').forEach(container => {
        const video = container.querySelector('video');

        if (!video) {
            console.warn('Nettoon Shorts: Missing video element in a .short-video container. Skipping setup for this container.');
            return;
        }

        // The HTML already has 'autoplay', 'loop', 'muted', and 'controls'.
        // Browser policy will handle the initial muted autoplay.

        // Attempt to play explicitly. This should succeed given 'muted' attribute in HTML.
        video.play()
            .then(() => {
                // Video successfully started playing (it will be muted by browser due to policy)
                // No need to hide an overlay here, as you're using native controls
            })
            .catch(err => {
                // This catch block handles cases where even 'autoplay muted' fails (rare, but possible due to browser error or user settings)
                console.warn('Nettoon Shorts Autoplay failed entirely:', err.message);
                video.muted = true; // Ensure it's muted
                video.pause();      // Ensure it's paused if play failed
            });

        // The native controls (enabled by the 'controls' attribute in HTML)
        // will handle play/pause/volume/fullscreen interaction after autoplay.
        // You would typically not use a separate custom play overlay if native controls are visible.
        // If you still want a play overlay on pause, you'd integrate logic similar to the main player.
    });
});


  // Toggle share popup
  document.querySelectorAll('.share-icon').forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.stopPropagation();
      const popup = this.parentElement.querySelector('.share-popup');
      popup.classList.toggle('hidden');
    });
  });

  // Hide share popup when clicking outside
  document.addEventListener('click', function () {
    document.querySelectorAll('.share-popup').forEach(p => p.classList.add('hidden'));
  });

  // Copy share link
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.previousElementSibling;
      input.select();
      document.execCommand('copy');
      this.textContent = "Copied!";
      setTimeout(() => this.textContent = "Copy", 1500);
    });
  });




document.querySelectorAll('.options').forEach(option => {
  const popup = option.querySelector('.metadata-popup');

  option.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click bubbling
    popup.classList.toggle('hidden');

    // Close other open popups
    document.querySelectorAll('.metadata-popup').forEach(p => {
      if (p !== popup) p.classList.add('hidden');
    });
  });
});

// Close all popups when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.metadata-popup').forEach(p => {
    p.classList.add('hidden');
  });
});



 // Toggle the shareee popup
 document.querySelectorAll('.shareee').forEach(shareee => {
  const icon = shareee.querySelector('.reply-icon');
  const popup = shareee.querySelector('.shareee-popup');

  icon.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('hidden');
  });
});

// Close all shareee popups when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.shareee-popup').forEach(popup => {
    popup.classList.add('hidden');
  });
});