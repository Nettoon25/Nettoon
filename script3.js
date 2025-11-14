

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



document.addEventListener("DOMContentLoaded", function () {
    const commentIcon = document.querySelector(".commentss img");
    const commentContainer = document.getElementById("commentContainer");
    const container3 = document.querySelector(".container-3");

    commentIcon.addEventListener("click", function () {
        if (commentContainer.style.display === "none" || commentContainer.style.display === "") {
            commentContainer.style.display = "block";
            container3.style.marginTop = "40px"; // Move down
        } else {
            commentContainer.style.display = "none";
            container3.style.marginTop = "2rem"; // Reset to original position
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let textarea = document.querySelector("textarea");

    textarea.addEventListener("input", function () {
        this.style.height = "auto"; // Reset height
        this.style.height = (this.scrollHeight) + "px"; // Expand dynamically
    });
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

  window.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.short-video');
    const playOverlay = document.querySelector('.play-overlay');

    // Ensure video is unmuted
    video.muted = false;

    // Attempt to autoplay with sound
    const attemptPlay = () => {
      video.play().then(() => {
        playOverlay.style.opacity = '0';
      }).catch((error) => {
        // If autoplay with sound fails (browser blocks it), wait for user interaction
        console.warn('Autoplay with sound failed:', error);
        playOverlay.style.opacity = '1';

        // Allow manual play
        playOverlay.addEventListener('click', () => {
          video.play();
        });
      });
    };

    // Try autoplay once DOM is ready
    attemptPlay();

    // Toggle overlay visibility on play/pause
    video.addEventListener('play', () => {
      playOverlay.style.opacity = '0';
    });

    video.addEventListener('pause', () => {
      playOverlay.style.opacity = '1';
    });

    // Click overlay to toggle play/pause
    playOverlay.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
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

