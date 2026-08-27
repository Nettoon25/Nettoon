

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
/* =========================================================
   NETTOON SERIES UPLOAD + EPISODE RELEASE TIMELINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MAIN ELEMENTS
     ======================================================= */

  const episodesWrapper =
    document.getElementById("episodesWrapper");

  const addEpisodeBtn =
    document.getElementById("addEpisodeBtn");

  const releaseTimeline =
    document.getElementById("releaseTimeline");

  const totalEpisodes =
    document.getElementById("totalEpisodes");

  const scheduledEpisodes =
    document.getElementById("scheduledEpisodes");

  const readyEpisodes =
    document.getElementById("readyEpisodes");


  /* =======================================================
     SAFETY CHECK
     ======================================================= */

  if (!episodesWrapper) {
    console.warn(
      "Nettoon: #episodesWrapper was not found."
    );
    return;
  }


  /* =======================================================
     UTILITY — ESCAPE HTML
     ======================================================= */

  function escapeHTML(value) {

    const div =
      document.createElement("div");

    div.textContent =
      value ?? "";

    return div.innerHTML;
  }


  /* =======================================================
     UTILITY — FORMAT DATE
     ======================================================= */

  function formatReleaseDate(date, time) {

    if (!date || !time) {
      return null;
    }

    const dateTime =
      new Date(`${date}T${time}`);

    if (isNaN(dateTime.getTime())) {
      return null;
    }

    return dateTime.toLocaleString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      }
    );
  }


  /* =======================================================
     GET EPISODE NUMBER
     ======================================================= */

  function getEpisodeNumber(episode) {

    const input =
      episode.querySelector(".episode-input");

    if (!input || !input.value.trim()) {
      return null;
    }

    const number =
      Number(input.value);

    if (
      !Number.isInteger(number) ||
      number < 1
    ) {
      return null;
    }

    return number;
  }


  /* =======================================================
     GET EPISODE TITLE
     ======================================================= */

  function getEpisodeTitle(episode) {

    /*
      Preferred class:
      .episode-title-input

      Fallback:
      first text input inside .title
    */

    let input =
      episode.querySelector(
        ".episode-title-input"
      );

    if (!input) {

      input =
        episode.querySelector(
          ".title input[type='text']"
        );

    }

    if (
      !input ||
      !input.value.trim()
    ) {

      return "Untitled Episode";

    }

    return input.value.trim();
  }


  /* =======================================================
     GET EPISODE RELEASE DATA
     ======================================================= */

  function getReleaseData(episode) {

    const dateInput =
      episode.querySelector(
        ".episode-release-date"
      );

    const timeInput =
      episode.querySelector(
        ".episode-release-time"
      );

    if (
      !dateInput ||
      !timeInput
    ) {

      return null;

    }


    if (
      !dateInput.value ||
      !timeInput.value
    ) {

      return null;

    }


    const releaseDate =
      new Date(
        `${dateInput.value}T${timeInput.value}`
      );


    if (
      isNaN(
        releaseDate.getTime()
      )
    ) {

      return null;

    }


    return {

      date:
        dateInput.value,

      time:
        timeInput.value,

      releaseDate

    };

  }


  /* =======================================================
     GET ALL EPISODES
     ======================================================= */

  function getAllEpisodes() {

    return [
      ...episodesWrapper.querySelectorAll(
        ".Episodess"
      )
    ];

  }


  /* =======================================================
     DETERMINE EPISODE STATUS
     ======================================================= */

  function getEpisodeStatus(episode) {

    const releaseData =
      getReleaseData(episode);


    /*
      No schedule yet
    */

    if (!releaseData) {

      return {
        type: "unscheduled",
        text: "Not scheduled"
      };

    }


    /*
      Release date has already arrived
    */

    if (
      releaseData.releaseDate.getTime()
      <= Date.now()
    ) {

      return {
        type: "ready",
        text: "Ready to Publish"
      };

    }


    /*
      Future release
    */

    return {
      type: "scheduled",
      text: "Scheduled"
    };

  }


  /* =======================================================
     UPDATE INDIVIDUAL EPISODE UI
     ======================================================= */

  function updateEpisodeUI(episode) {

    const status =
      getEpisodeStatus(episode);


    const statusElement =
      episode.querySelector(
        ".release-status"
      );


    const scheduleMessage =
      episode.querySelector(
        ".schedule-message"
      );


    const cancelButton =
      episode.querySelector(
        ".cancel-schedule-btn"
      );


    /*
      Remove previous states
    */

    episode.classList.remove(
      "is-scheduled",
      "is-ready"
    );


    /*
      NOT SCHEDULED
    */

    if (
      status.type === "unscheduled"
    ) {

      if (statusElement) {

        statusElement.textContent =
          "Not scheduled";

      }


      if (scheduleMessage) {

        scheduleMessage.textContent =
          "No release schedule has been set.";

      }


      if (cancelButton) {

        cancelButton.hidden =
          true;

      }

      return;

    }


    /*
      READY
    */

    if (
      status.type === "ready"
    ) {

      episode.classList.add(
        "is-ready"
      );

    }


    /*
      SCHEDULED
    */

    if (
      status.type === "scheduled"
    ) {

      episode.classList.add(
        "is-scheduled"
      );

    }


    /*
      Update status label
    */

    if (statusElement) {

      statusElement.textContent =
        status.text;

    }


    /*
      Update schedule message
    */

    const releaseData =
      getReleaseData(episode);


    if (
      scheduleMessage &&
      releaseData
    ) {

      const formatted =
        formatReleaseDate(
          releaseData.date,
          releaseData.time
        );

      scheduleMessage.textContent =
        `Scheduled for ${formatted}`;

    }


    /*
      Show cancel button
    */

    if (cancelButton) {

      cancelButton.hidden =
        false;

    }

  }


  /* =======================================================
     BUILD RELEASE TIMELINE
     ======================================================= */

  function updateTimeline() {

    if (!releaseTimeline) {
      return;
    }


    const episodes =
      getAllEpisodes();


    const scheduled =
      [];


    let readyCount =
      0;


    /*
      Collect scheduled episodes
    */

    episodes.forEach(
      (episode, index) => {

        const releaseData =
          getReleaseData(episode);


        /*
          Update individual episode UI
        */

        updateEpisodeUI(
          episode
        );


        /*
          Skip episodes without schedule
        */

        if (!releaseData) {
          return;
        }


        const episodeNumber =
          getEpisodeNumber(
            episode
          );


        const title =
          getEpisodeTitle(
            episode
          );


        const status =
          getEpisodeStatus(
            episode
          );


        if (
          status.type === "ready"
        ) {

          readyCount++;

        }


        scheduled.push({

          episode,

          index,

          episodeNumber:
            episodeNumber ??
            index + 1,

          title,

          date:
            releaseData.date,

          time:
            releaseData.time,

          releaseDate:
            releaseData.releaseDate,

          status

        });

      }
    );


    /*
      Sort by release date
    */

    scheduled.sort(
      (a, b) =>
        a.releaseDate -
        b.releaseDate
    );


    /*
      Clear existing timeline
    */

    releaseTimeline.innerHTML =
      "";


    /*
      Empty state
    */

    if (
      scheduled.length === 0
    ) {

      releaseTimeline.innerHTML = `

        <div class="timeline-empty">

          <div class="timeline-empty-icon">
            +
          </div>

          <div class="timeline-empty-title">
            No episodes scheduled
          </div>

          <div class="timeline-empty-text">
            Schedule your episodes above
            and they will appear here.
          </div>

        </div>

      `;

    }


    /*
      Create timeline items
    */

    scheduled.forEach(
      (item, position) => {

        const timelineItem =
          document.createElement(
            "div"
          );


        timelineItem.className =
          "release-timeline-item";


        /*
          Status class
        */

        timelineItem.classList.add(
          item.status.type
        );


        /*
          Format date
        */

        const formattedDate =
          formatReleaseDate(
            item.date,
            item.time
          );


        /*
          Timeline item HTML
        */

        timelineItem.innerHTML = `

          <!-- Timeline Marker -->

          <div class="release-timeline-marker">

            <span></span>

          </div>


          <!-- Episode Card -->

          <div class="release-episode-card">

            <div class="release-episode-top">

              <div class="release-episode-heading">

                <span class="release-episode-number">
                  Episode ${escapeHTML(
                    String(item.episodeNumber)
                  )}
                </span>

                <h4 class="release-episode-title">
                  ${escapeHTML(
                    item.title
                  )}
                </h4>

              </div>


              <span
                class="release-status ${item.status.type}"
              >
                ${item.status.text}
              </span>

            </div>


            <div class="release-episode-date">

              <span class="date-icon">
                ◷
              </span>

              <span>
                ${escapeHTML(
                  formattedDate || ""
                )}
              </span>

            </div>

          </div>

        `;


        releaseTimeline.appendChild(
          timelineItem
        );

      }
    );


    /*
      Update statistics
    */

    if (totalEpisodes) {

      totalEpisodes.textContent =
        episodes.length;

    }


    if (scheduledEpisodes) {

      scheduledEpisodes.textContent =
        scheduled.length;

    }


    if (readyEpisodes) {

      readyEpisodes.textContent =
        readyCount;

    }

  }


  /* =======================================================
     SCHEDULE ONE EPISODE
     ======================================================= */

  function scheduleEpisode(episode) {

    const dateInput =
      episode.querySelector(
        ".episode-release-date"
      );

    const timeInput =
      episode.querySelector(
        ".episode-release-time"
      );


    if (
      !dateInput ||
      !timeInput
    ) {

      console.warn(
        "Nettoon: Release date/time inputs were not found."
      );

      return;

    }


    /*
      Validate date
    */

    if (
      !dateInput.value
    ) {

      alert(
        "Please select a release date."
      );

      return;

    }


    /*
      Validate time
    */

    if (
      !timeInput.value
    ) {

      alert(
        "Please select a release time."
      );

      return;

    }


    /*
      Build release date
    */

    const releaseDate =
      new Date(
        `${dateInput.value}T${timeInput.value}`
      );


    if (
      isNaN(
        releaseDate.getTime()
      )
    ) {

      alert(
        "Please enter a valid release date and time."
      );

      return;

    }


    /*
      Prevent scheduling in the past
    */

    if (
      releaseDate.getTime()
      <= Date.now()
    ) {

      alert(
        "Please select a future release date and time."
      );

      return;

    }


    /*
      Update episode UI
    */

    updateEpisodeUI(
      episode
    );


    /*
      Update timeline
    */

    updateTimeline();


    /*
      Optional confirmation
    */

    console.log(
      "Nettoon: Episode scheduled:",
      {
        episode:
          getEpisodeNumber(
            episode
          ),

        title:
          getEpisodeTitle(
            episode
          ),

        releaseDate:
          releaseDate
      }
    );

  }


  /* =======================================================
     CANCEL EPISODE SCHEDULE
     ======================================================= */

  function cancelEpisodeSchedule(
    episode
  ) {

    const dateInput =
      episode.querySelector(
        ".episode-release-date"
      );

    const timeInput =
      episode.querySelector(
        ".episode-release-time"
      );


    if (dateInput) {

      dateInput.value =
        "";

    }


    if (timeInput) {

      timeInput.value =
        "";

    }


    /*
      Update episode
    */

    updateEpisodeUI(
      episode
    );


    /*
      Rebuild timeline
    */

    updateTimeline();

  }


  /* =======================================================
     ADD NEW EPISODE
     ======================================================= */

  if (addEpisodeBtn) {

    addEpisodeBtn.addEventListener(
      "click",
      () => {

        /*
          Get first episode as template
        */

        const template =
          episodesWrapper.querySelector(
            ".Episodess"
          );


        if (!template) {

          console.error(
            "Nettoon: No episode template found."
          );

          return;

        }


        /*
          Clone episode
        */

        const clone =
          template.cloneNode(
            true
          );


        /*
          Clear all form fields
        */

        clone
          .querySelectorAll(
            "input, textarea, select"
          )
          .forEach(
            (element) => {

              /*
                File inputs
              */

              if (
                element.type === "file"
              ) {

                /*
                  Replace file input
                  to completely clear it
                */

                const freshInput =
                  element.cloneNode(
                    true
                  );

                element.replaceWith(
                  freshInput
                );

                return;

              }


              /*
                Select
              */

              if (
                element.tagName === "SELECT"
              ) {

                element.selectedIndex =
                  0;

                return;

              }


              /*
                Other inputs
              */

              element.value =
                "";

            }
          );


        /*
          Reset schedule UI
        */

        const scheduleMessage =
          clone.querySelector(
            ".schedule-message"
          );


        if (scheduleMessage) {

          scheduleMessage.textContent =
            "No release schedule has been set.";

        }


        const status =
          clone.querySelector(
            ".release-status"
          );


        if (status) {

          status.textContent =
            "Not scheduled";

        }


        const cancelButton =
          clone.querySelector(
            ".cancel-schedule-btn"
          );


        if (cancelButton) {

          cancelButton.hidden =
            true;

        }


        /*
          Remove scheduled classes
        */

        clone.classList.remove(
          "is-scheduled",
          "is-ready"
        );


        /*
          Show delete button
        */

        const deleteContainer =
          clone.querySelector(
            ".delete"
          );


        if (deleteContainer) {

          deleteContainer.style.display =
            "flex";

        }


        /*
          Add clone
        */

        episodesWrapper.appendChild(
          clone
        );


        /*
          Update timeline
        */

        updateTimeline();


        /*
          Scroll new episode into view
        */

        clone.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }
    );

  }


  /* =======================================================
     DELETE EPISODE
     ======================================================= */

  episodesWrapper.addEventListener(
    "click",
    (event) => {

      const deleteButton =
        event.target.closest(
          ".delete"
        );


      if (!deleteButton) {
        return;
      }


      const episode =
        deleteButton.closest(
          ".Episodess"
        );


      if (!episode) {
        return;
      }


      const allEpisodes =
        getAllEpisodes();


      /*
        Do not allow deleting
        the final episode
      */

      if (
        allEpisodes.length <= 1
      ) {

        alert(
          "At least one episode must remain."
        );

        return;

      }


      /*
        Confirm deletion
      */

      const confirmed =
        confirm(
          "Delete this episode?"
        );


      if (!confirmed) {
        return;
      }


      /*
        Remove episode
      */

      episode.remove();


      /*
        Rebuild timeline
      */

      updateTimeline();

    }
  );


  /* =======================================================
     SCHEDULE / CANCEL BUTTONS
     ======================================================= */

  episodesWrapper.addEventListener(
    "click",
    (event) => {

      /*
        Schedule button
      */

      const scheduleButton =
        event.target.closest(
          ".update-schedule-btn"
        );


      if (scheduleButton) {

        const episode =
          scheduleButton.closest(
            ".Episodess"
          );


        if (episode) {

          scheduleEpisode(
            episode
          );

        }


        return;

      }


      /*
        Cancel schedule
      */

      const cancelButton =
        event.target.closest(
          ".cancel-schedule-btn"
        );


      if (cancelButton) {

        const episode =
          cancelButton.closest(
            ".Episodess"
          );


        if (episode) {

          cancelEpisodeSchedule(
            episode
          );

        }

      }

    }
  );


  /* =======================================================
     LIVE EPISODE DATA UPDATES
     ======================================================= */

  episodesWrapper.addEventListener(
    "input",
    (event) => {

      /*
        Episode number
      */

      if (
        event.target.matches(
          ".episode-input"
        )
      ) {

        saveEpisodeNumber(
          event.target
        );

      }


      /*
        Episode title
      */

      if (
        event.target.matches(
          ".episode-title-input, .title input[type='text']"
        )
      ) {

        updateTimeline();

      }


      /*
        Release date/time
      */

      if (
        event.target.matches(
          ".episode-release-date, .episode-release-time"
        )
      ) {

        updateTimeline();

      }

    }
  );


  /* =======================================================
     EPISODE NUMBER — AUTO SAVE
     ======================================================= */

  function saveEpisodeNumber(
    input
  ) {

    const episode =
      input.closest(
        ".Episodess"
      );


    if (!episode) {
      return;
    }


    /*
      Give every episode
      its own unique storage key
    */

    if (
      !episode.dataset.episodeId
    ) {

      episode.dataset.episodeId =
        createEpisodeId();

    }


    const value =
      input.value.trim();


    /*
      Empty number
    */

    if (!value) {

      localStorage.removeItem(
        `nettoonEpisode_${episode.dataset.episodeId}`
      );

      updateTimeline();

      return;

    }


    /*
      Validate positive integer
    */

    if (
      /^\d+$/.test(value) &&
      Number(value) >= 1
    ) {

      localStorage.setItem(
        `nettoonEpisode_${episode.dataset.episodeId}`,
        value
      );

    }


    /*
      Update timeline immediately
    */

    updateTimeline();

  }


  /* =======================================================
     CREATE UNIQUE EPISODE ID
     ======================================================= */

  function createEpisodeId() {

    return (
      "ep_" +
      Date.now() +
      "_" +
      Math.random()
        .toString(36)
        .substring(2, 9)
    );

  }


  /* =======================================================
     RESTORE EPISODE NUMBER
     ======================================================= */

  function restoreEpisodeNumber(
    episode
  ) {

    const input =
      episode.querySelector(
        ".episode-input"
      );


    if (!input) {
      return;
    }


    /*
      Create ID if necessary
    */

    if (
      !episode.dataset.episodeId
    ) {

      episode.dataset.episodeId =
        createEpisodeId();

    }


    const saved =
      localStorage.getItem(
        `nettoonEpisode_${episode.dataset.episodeId}`
      );


    if (saved) {

      input.value =
        saved;

    }

  }


  /* =======================================================
     RESTORE ALL EPISODE NUMBERS
     ======================================================= */

  getAllEpisodes()
    .forEach(
      (episode) => {

        restoreEpisodeNumber(
          episode
        );

      }
    );


  /* =======================================================
     KEEP TIMELINE CURRENT
     ======================================================= */

  setInterval(
    () => {

      updateTimeline();

    },
    30000
  );


  /* =======================================================
     INITIAL TIMELINE BUILD
     ======================================================= */

  updateTimeline();


  /* =======================================================
     DEBUG INFORMATION
     ======================================================= */

  console.log(
    "Nettoon Series Episode Scheduler initialized."
  );

});


