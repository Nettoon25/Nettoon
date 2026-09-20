// ============================================================
// NETTOON CREATOR STUDIO
// CONTENT MANAGEMENT SCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================
  // THEME TOGGLE
  // ==========================================================

  const themeToggle =
    document.getElementById("themeToggle");

  const lightImg =
    document.getElementById("theme-toggle-light");

  const darkImg =
    document.getElementById("theme-toggle-dark");


  function setTheme(mode) {

    if (mode === "dark") {

      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");

      if (themeToggle) {
        themeToggle.checked = true;
      }

    } else {

      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");

      if (themeToggle) {
        themeToggle.checked = false;
      }

    }

  }


  function toggleAndSave() {

    if (!themeToggle) return;

    const newMode =
      themeToggle.checked
        ? "dark"
        : "light";

    setTheme(newMode);

    localStorage.setItem(
      "theme",
      newMode
    );

  }


  const storedTheme =
    localStorage.getItem("theme");


  if (storedTheme) {

    setTheme(storedTheme);

  } else {

    const prefersDark =
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    setTheme(
      prefersDark
        ? "dark"
        : "light"
    );

  }


  if (themeToggle) {

    themeToggle.addEventListener(
      "change",
      toggleAndSave
    );

  }


  function fallbackImage(
    imgEl,
    faClass
  ) {

    if (!imgEl) return;

    imgEl.addEventListener(
      "error",
      () => {

        const icon =
          document.createElement("i");

        icon.className =
          faClass;

        icon.style.width =
          imgEl.style.width ||
          "20px";

        icon.style.height =
          imgEl.style.height ||
          "20px";

        imgEl.replaceWith(icon);

      }
    );


    if (
      imgEl.complete &&
      imgEl.naturalWidth === 0
    ) {

      imgEl.dispatchEvent(
        new Event("error")
      );

    }

  }


  fallbackImage(
    lightImg,
    "fa-solid fa-sun"
  );

  fallbackImage(
    darkImg,
    "fa-solid fa-moon"
  );


  // ==========================================================
  // ACCOUNT DROPDOWN
  // ==========================================================

  const accountDropdown =
    document.querySelector(
      ".account-dropdown"
    );

  const accountMenu =
    document.getElementById(
      "accountDropdown"
    );


  if (
    accountDropdown &&
    accountMenu
  ) {

    accountDropdown.addEventListener(
      "click",
      event => {

        event.preventDefault();

        event.stopPropagation();

        accountMenu.style.display =
          accountMenu.style.display === "block"
            ? "none"
            : "block";

      }
    );

  }


  document.addEventListener(
    "click",
    event => {

      if (
        accountDropdown &&
        accountDropdown.contains(
          event.target
        )
      ) {
        return;
      }

      document
        .querySelectorAll(
          ".dropdown-content"
        )
        .forEach(
          dropdown => {

            dropdown.style.display =
              "none";

          }
        );

    }
  );


  // ==========================================================
  // NOTIFICATIONS
  // ==========================================================

  const notificationIcon =
    document.getElementById(
      "notification-icon"
    );

  const notificationContainer =
    document.getElementById(
      "notification-container"
    );


  if (
    notificationIcon &&
    notificationContainer
  ) {

    notificationIcon.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        notificationContainer.classList.toggle(
          "active"
        );

      }
    );


    document.addEventListener(
      "click",
      event => {

        if (
          !notificationContainer.contains(
            event.target
          ) &&
          !notificationIcon.contains(
            event.target
          )
        ) {

          notificationContainer.classList.remove(
            "active"
          );

        }

      }
    );

  }


  // ==========================================================
  // NETTOON CONTENT MANAGEMENT
  // ==========================================================


  // ==========================================================
  // CONFIGURATION
  // ==========================================================

  const PAGE_SIZE = 8;


  // ==========================================================
  // STATE
  // ==========================================================

  const state = {

    contentType:
      "one-time",

    status:
      "published",

    search:
      "",

    sort:
      "soonest",

    page:
      1,

    expandedSeries:
      new Set(),

    selectedSeason:
      {},

    editingId:
      null,

    schedulingId:
      null,

    confirmAction:
      null

  };


  // ==========================================================
  // STATUS CONFIGURATION
  // ==========================================================

  const STATUS_CONFIG = {

    "one-time": [
      "published",
      "scheduled",
      "draft",
      "private",
      "processing",
      "failed"
    ],

    "series": [
      "published",
      "scheduled",
      "draft",
      "private",
      "processing",
      "failed"
    ],

    "shorts": [
      "published",
      "draft",
      "private",
      "processing",
      "failed"
    ]

  };


  // ==========================================================
  // DEMO DATA
  //
  // IMPORTANT:
  // ALL CONTENT DATA LIVES INSIDE THIS ARRAY.
  // NOTHING SHOULD BE PASTED AFTER THE FINAL ];
  // ==========================================================

  let contentData = [

    // ========================================================
    // ONE-TIME VIDEOS
    // ========================================================

    {
      id: "video-001",
      type: "one-time",
      title: "Behind the Scenes",
      duration: "06:12",
      description:
        "A behind-the-scenes look at how this animation was created.",
      genre: "Animation",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-20T20:10",
      views: 0
    },

    {
      id: "video-002",
      type: "one-time",
      title:
        "I_m_In_the_Lord_s_Army_Yes_Sir_plus_more_Bible_songs_for_kids_720P",
      duration: "12:34",
      description:
        "Bible songs and animated stories for children.",
      genre: "Animation",
      visibility: "Public",
      comments: true,
      status: "scheduled",
      release: "2026-09-21T21:21",
      views: 0
    },

    {
      id: "video-003",
      type: "one-time",
      title: "Baboon",
      duration: "04:32",
      description:
        "A funny animated short story featuring a curious baboon.",
      genre: "Comedy",
      visibility: "Private",
      comments: true,
      status: "draft",
      release: null,
      views: 0
    },

    {
      id: "video-004",
      type: "one-time",
      title: "The Secret Forest",
      duration: "08:43",
      description:
        "An adventurous animated story set deep inside a mysterious forest.",
      genre: "Adventure",
      visibility: "Private",
      comments: true,
      status: "private",
      release: "2026-09-21T19:00",
      views: 0
    },

    {
      id: "video-005",
      type: "one-time",
      title: "Processing Animation",
      duration: "10:15",
      description:
        "This video is currently being processed.",
      genre: "Animation",
      visibility: "Public",
      comments: true,
      status: "processing",
      release: null,
      views: 0
    },

    {
      id: "video-006",
      type: "one-time",
      title: "Failed Upload Example",
      duration: "03:21",
      description:
        "This upload failed during processing.",
      genre: "Drama",
      visibility: "Public",
      comments: true,
      status: "failed",
      release: null,
      views: 0
    },


    // ========================================================
    // SERIES 001 — ARCANE ADVENTURES
    // 10 EPISODES
    // ========================================================

    {
      id: "series-001",
      type: "series",
      title: "Arcane Adventures",
      duration: "Series",
      description:
        "An animated adventure following a group of young heroes.",
      genre: "Adventure",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-18T18:00",
      views: 1245,

      seasons: [

        {
          number: 1,

          episodes: [

            {
              id: "episode-001",
              number: 1,
              title: "The Beginning",
              duration: "06:12",
              description:
                "The story begins.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-18T18:00",
              views: 523
            },

            {
              id: "episode-002",
              number: 2,
              title: "Into the Unknown",
              duration: "07:45",
              description:
                "The heroes venture into unknown territory.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-19T18:00",
              views: 481
            },

            {
              id: "episode-003",
              number: 3,
              title: "The Hidden Village",
              duration: "08:21",
              description:
                "The heroes discover a hidden village.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-20T18:00",
              views: 467
            },

            {
              id: "episode-004",
              number: 4,
              title: "A Stranger Arrives",
              duration: "06:58",
              description:
                "A mysterious stranger arrives.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-21T18:00",
              views: 439
            },

            {
              id: "episode-005",
              number: 5,
              title: "The Ancient Map",
              duration: "09:14",
              description:
                "An ancient map reveals a hidden destination.",
              genre: "Fantasy",
              visibility: "Public",
              comments: true,
              status: "scheduled",
              release: "2026-09-22T18:00",
              views: 0
            },

            {
              id: "episode-006",
              number: 6,
              title: "Across the Mountains",
              duration: "07:36",
              description:
                "The group begins a dangerous journey across the mountains.",
              genre: "Adventure",
              visibility: "Private",
              comments: true,
              status: "draft",
              release: null,
              views: 0
            },

            {
              id: "episode-007",
              number: 7,
              title: "The Forgotten Temple",
              duration: "10:02",
              description:
                "The heroes discover an ancient forgotten temple.",
              genre: "Fantasy",
              visibility: "Private",
              comments: true,
              status: "private",
              release: null,
              views: 0
            },

            {
              id: "episode-008",
              number: 8,
              title: "Guardians of the Gate",
              duration: "08:47",
              description:
                "The guardians stand between the heroes and their destination.",
              genre: "Action",
              visibility: "Public",
              comments: true,
              status: "processing",
              release: null,
              views: 0
            },

            {
              id: "episode-009",
              number: 9,
              title: "The Final Clue",
              duration: "09:33",
              description:
                "The final clue brings the heroes closer to the truth.",
              genre: "Mystery",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-26T18:00",
              views: 312
            },

            {
              id: "episode-010",
              number: 10,
              title: "The Adventure Begins",
              duration: "11:05",
              description:
                "The first major adventure reaches its conclusion.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-27T18:00",
              views: 289
            }

          ]

        }

      ]

    },


    // ========================================================
    // SERIES 002 — THE BEGINNING
    // 10 EPISODES
    // ========================================================

    {
      id: "series-002",
      type: "series",
      title: "The Beginning",
      duration: "Series",
      description:
        "A story about discovering a new world and finding your place in it.",
      genre: "Adventure",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-10T18:00",
      views: 812,

      seasons: [

        {
          number: 1,

          episodes: [

            {
              id: "episode-011",
              number: 1,
              title: "Before It All Began",
              duration: "06:12",
              description:
                "Everything starts somewhere.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-10T18:00",
              views: 812
            },

            {
              id: "episode-012",
              number: 2,
              title: "The First Day",
              duration: "07:04",
              description:
                "A new day brings unexpected possibilities.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-11T18:00",
              views: 756
            },

            {
              id: "episode-013",
              number: 3,
              title: "A New World",
              duration: "08:18",
              description:
                "A completely different world opens before them.",
              genre: "Fantasy",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-12T18:00",
              views: 701
            },

            {
              id: "episode-014",
              number: 4,
              title: "The First Friend",
              duration: "06:42",
              description:
                "An unexpected friendship begins.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-13T18:00",
              views: 668
            },

            {
              id: "episode-015",
              number: 5,
              title: "Something Has Changed",
              duration: "09:07",
              description:
                "The world around them begins to change.",
              genre: "Drama",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-14T18:00",
              views: 621
            },

            {
              id: "episode-016",
              number: 6,
              title: "The Secret",
              duration: "07:51",
              description:
                "A hidden secret finally begins to surface.",
              genre: "Mystery",
              visibility: "Public",
              comments: true,
              status: "scheduled",
              release: "2026-09-15T18:00",
              views: 0
            },

            {
              id: "episode-017",
              number: 7,
              title: "A Difficult Choice",
              duration: "10:13",
              description:
                "A difficult decision must be made.",
              genre: "Drama",
              visibility: "Private",
              comments: true,
              status: "draft",
              release: null,
              views: 0
            },

            {
              id: "episode-018",
              number: 8,
              title: "The Journey",
              duration: "08:36",
              description:
                "The journey finally begins.",
              genre: "Adventure",
              visibility: "Private",
              comments: true,
              status: "private",
              release: null,
              views: 0
            },

            {
              id: "episode-019",
              number: 9,
              title: "The Turning Point",
              duration: "09:48",
              description:
                "Everything changes at the turning point.",
              genre: "Drama",
              visibility: "Public",
              comments: true,
              status: "processing",
              release: null,
              views: 0
            },

            {
              id: "episode-020",
              number: 10,
              title: "What Comes Next",
              duration: "11:22",
              description:
                "The next chapter is about to begin.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-19T18:00",
              views: 544
            }

          ]

        }

      ]

    },


    // ========================================================
    // SERIES 003 — KIZAZI MOTO
    // 10 EPISODES
    // ========================================================

    {
      id: "series-003",
      type: "series",
      title: "Kizazi Moto",
      duration: "Series",
      description:
        "A futuristic animated story about a new generation.",
      genre: "Science Fiction",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-01T18:00",
      views: 1247,

      seasons: [

        {
          number: 1,

          episodes: [

            {
              id: "episode-021",
              number: 1,
              title: "The Awakening",
              duration: "06:44",
              description:
                "A new generation awakens.",
              genre: "Science Fiction",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-01T18:00",
              views: 1247
            },

            {
              id: "episode-022",
              number: 2,
              title: "The Fire Within",
              duration: "07:31",
              description:
                "An unexpected power begins to emerge.",
              genre: "Science Fiction",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-02T18:00",
              views: 1182
            },

            {
              id: "episode-023",
              number: 3,
              title: "City of Dreams",
              duration: "08:06",
              description:
                "The heroes enter a city unlike anything they have known.",
              genre: "Science Fiction",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-03T18:00",
              views: 1109
            },

            {
              id: "episode-024",
              number: 4,
              title: "The New Generation",
              duration: "09:15",
              description:
                "A new generation begins to take its place.",
              genre: "Science Fiction",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-04T18:00",
              views: 1043
            },

            {
              id: "episode-025",
              number: 5,
              title: "Rise of the Guardians",
              duration: "07:58",
              description:
                "The guardians rise to protect their world.",
              genre: "Action",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-05T18:00",
              views: 978
            },

            {
              id: "episode-026",
              number: 6,
              title: "The Hidden Power",
              duration: "10:21",
              description:
                "A hidden power changes the course of events.",
              genre: "Fantasy",
              visibility: "Public",
              comments: true,
              status: "scheduled",
              release: "2026-09-06T18:00",
              views: 0
            },

            {
              id: "episode-027",
              number: 7,
              title: "Into the Storm",
              duration: "08:42",
              description:
                "The heroes travel directly into danger.",
              genre: "Action",
              visibility: "Private",
              comments: true,
              status: "draft",
              release: null,
              views: 0
            },

            {
              id: "episode-028",
              number: 8,
              title: "The Last Defender",
              duration: "09:26",
              description:
                "The final defender stands alone.",
              genre: "Action",
              visibility: "Private",
              comments: true,
              status: "private",
              release: null,
              views: 0
            },

            {
              id: "episode-029",
              number: 9,
              title: "The Battle Ahead",
              duration: "10:04",
              description:
                "The final battle approaches.",
              genre: "Action",
              visibility: "Public",
              comments: true,
              status: "processing",
              release: null,
              views: 0
            },

            {
              id: "episode-030",
              number: 10,
              title: "A New Dawn",
              duration: "12:11",
              description:
                "A new dawn begins.",
              genre: "Adventure",
              visibility: "Public",
              comments: true,
              status: "published",
              release: "2026-09-10T18:00",
              views: 867
            }

          ]

        }

      ]

    },


    // ========================================================
    // SHORTS
    // ========================================================

    {
      id: "short-001",
      type: "shorts",
      title: "CTHULHU RES",
      duration: "00:41",
      description:
        "A short animated clip.",
      genre: "Horror",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-19T15:00",
      views: 42
    },

    {
      id: "short-002",
      type: "shorts",
      title:
        "I_m_In_the_Lord_s_Army_Yes_Sir_plus_more_Bible_songs_for_kids",
      duration: "00:53",
      description:
        "A short children's animation.",
      genre: "Animation",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-18T15:00",
      views: 87
    },

    {
      id: "short-003",
      type: "shorts",
      title: "Baboon",
      duration: "00:32",
      description:
        "A funny baboon animation.",
      genre: "Comedy",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-17T15:00",
      views: 128
    },

    {
      id: "short-004",
      type: "shorts",
      title:
        "Arcane Season 2 Official Trailer",
      duration: "00:46",
      description:
        "Animated trailer.",
      genre: "Fantasy",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-16T15:00",
      views: 210
    },

    {
      id: "short-005",
      type: "shorts",
      title: "ADAM Episode 2",
      duration: "00:59",
      description:
        "Episode two teaser.",
      genre: "Action",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-15T15:00",
      views: 321
    },

    {
      id: "short-006",
      type: "shorts",
      title: "Mason's Rats",
      duration: "00:38",
      description:
        "Mason encounters some unexpected visitors.",
      genre: "Comedy",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-14T15:00",
      views: 95
    },

    {
      id: "short-007",
      type: "shorts",
      title: "MOANA",
      duration: "00:43",
      description:
        "Animated short.",
      genre: "Adventure",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-13T15:00",
      views: 182
    },

    {
      id: "short-008",
      type: "shorts",
      title: "Ratatouille",
      duration: "00:37",
      description:
        "Animated short.",
      genre: "Comedy",
      visibility: "Public",
      comments: true,
      status: "published",
      release: "2026-09-12T15:00",
      views: 251
    },

    {
      id: "short-009",
      type: "shorts",
      title: "Funny Animation",
      duration: "00:29",
      description:
        "A short funny animation.",
      genre: "Comedy",
      visibility: "Public",
      comments: true,
      status: "draft",
      release: null,
      views: 0
    },

    {
      id: "short-010",
      type: "shorts",
      title: "Private Animation",
      duration: "00:48",
      description:
        "Private short animation.",
      genre: "Animation",
      visibility: "Private",
      comments: true,
      status: "private",
      release: null,
      views: 0
    },

    {
      id: "short-011",
      type: "shorts",
      title: "Processing Short",
      duration: "00:40",
      description:
        "Processing short.",
      genre: "Animation",
      visibility: "Public",
      comments: true,
      status: "processing",
      release: null,
      views: 0
    }

  ];


  // ==========================================================
  // DOM ELEMENTS
  // ==========================================================

  const elements = {

    tableBody:
      document.getElementById(
        "content-table-body"
      ),

    statusNavigation:
      document.getElementById(
        "status-navigation"
      ),

    emptyState:
      document.getElementById(
        "empty-state"
      ),

    search:
      document.getElementById(
        "content-search"
      ),

    sort:
      document.getElementById(
        "sort-content"
      ),

    previous:
      document.getElementById(
        "previous-page"
      ),

    next:
      document.getElementById(
        "next-page"
      ),

    pageNumbers:
      document.getElementById(
        "page-numbers"
      ),

    paginationInfo:
      document.getElementById(
        "pagination-info"
      ),

    viewModal:
      document.getElementById(
        "view-modal"
      ),

    viewTitle:
      document.getElementById(
        "view-modal-title"
      ),

    viewContent:
      document.getElementById(
        "view-content"
      ),

    editModal:
      document.getElementById(
        "edit-modal"
      ),

    editForm:
      document.getElementById(
        "edit-form"
      ),

    editId:
      document.getElementById(
        "edit-id"
      ),

    editTitle:
      document.getElementById(
        "edit-title"
      ),

    editDescription:
      document.getElementById(
        "edit-description"
      ),

    editGenre:
      document.getElementById(
        "edit-genre"
      ),

    editPublic:
      document.getElementById(
        "visibility-public"
      ),

    editPrivate:
      document.getElementById(
        "visibility-private"
      ),

    editComments:
      document.getElementById(
        "edit-comments"
      ),

    editPreviewTitle:
      document.getElementById(
        "edit-preview-title"
      ),

    editPreviewMeta:
      document.getElementById(
        "edit-preview-meta"
      ),

    scheduleModal:
      document.getElementById(
        "schedule-modal"
      ),

    scheduleForm:
      document.getElementById(
        "schedule-form"
      ),

    scheduleId:
      document.getElementById(
        "schedule-id"
      ),

    scheduleDate:
      document.getElementById(
        "schedule-date"
      ),

    confirmModal:
      document.getElementById(
        "confirm-modal"
      ),

    confirmTitle:
      document.getElementById(
        "confirm-title"
      ),

    confirmMessage:
      document.getElementById(
        "confirm-message"
      ),

    confirmButton:
      document.getElementById(
        "confirm-action"
      ),

    toast:
      document.getElementById(
        "toast"
      )

  };


  // ==========================================================
  // SAFE TEXT SETTER
  // ==========================================================

  function setText(
    element,
    value
  ) {

    if (element) {
      element.textContent = value;
    }

  }


  // ==========================================================
  // HELPERS
  // ==========================================================

  function getTypeLabel(type) {

    if (type === "one-time") {
      return "One-time Video";
    }

    if (type === "series") {
      return "Series";
    }

    if (type === "shorts") {
      return "Short";
    }

    return "Content";

  }


  function getStatusLabel(status) {

    const labels = {

      published: "Published",
      scheduled: "Scheduled",
      draft: "Draft",
      private: "Private",
      processing: "Processing",
      failed: "Failed"

    };

    return (
      labels[status] ||
      status
    );

  }


  function getStatusClass(status) {

    return `status-${status}`;

  }


  function formatDate(date) {

    if (!date) {
      return "—";
    }

    const value =
      new Date(date);

    if (
      Number.isNaN(
        value.getTime()
      )
    ) {
      return date;
    }

    return value.toLocaleString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );

  }


  function formatDateForInput(date) {

    if (!date) {
      return "";
    }

    const value =
      new Date(date);

    if (
      Number.isNaN(
        value.getTime()
      )
    ) {
      return "";
    }

    const year =
      value.getFullYear();

    const month =
      String(
        value.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        value.getDate()
      ).padStart(2, "0");

    const hour =
      String(
        value.getHours()
      ).padStart(2, "0");

    const minute =
      String(
        value.getMinutes()
      ).padStart(2, "0");

    return (
      `${year}-${month}-${day}` +
      `T${hour}:${minute}`
    );

  }


  function escapeHTML(value) {

    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return String(value)
      .replaceAll(
        "&",
        "&amp;"
      )
      .replaceAll(
        "<",
        "&lt;"
      )
      .replaceAll(
        ">",
        "&gt;"
      )
      .replaceAll(
        '"',
        "&quot;"
      )
      .replaceAll(
        "'",
        "&#039;"
      );

  }


  function showToast(message) {

    if (!elements.toast) {
      return;
    }

    elements.toast.textContent =
      message;

    elements.toast.classList.add(
      "show"
    );

    clearTimeout(
      showToast.timer
    );

    showToast.timer =
      setTimeout(
        () => {

          elements.toast.classList.remove(
            "show"
          );

        },
        2600
      );

  }


  // ==========================================================
  // FIND CONTENT
  // ==========================================================

  function findContent(id) {

    for (
      const item of contentData
    ) {

      if (item.id === id) {
        return item;
      }

      if (
        item.type === "series" &&
        Array.isArray(item.seasons)
      ) {

        for (
          const season of item.seasons
        ) {

          for (
            const episode of
            season.episodes || []
          ) {

            if (
              episode.id === id
            ) {
              return episode;
            }

          }

        }

      }

    }

    return null;

  }


  // ==========================================================
  // FIND PARENT SERIES
  // ==========================================================

  function findParentSeries(
    episodeId
  ) {

    for (
      const series of contentData
    ) {

      if (
        series.type !==
        "series"
      ) {
        continue;
      }

      for (
        const season of
        series.seasons || []
      ) {

        for (
          const episode of
          season.episodes || []
        ) {

          if (
            episode.id ===
            episodeId
          ) {

            return series;

          }

        }

      }

    }

    return null;

  }


  // ==========================================================
  // STATUS COUNTS
  //
  // IMPORTANT:
  // Counts are for parent/top-level content.
  // Episodes do not become separate Series entries.
  // ==========================================================

  function getStatusCount(
    type,
    status
  ) {

    return contentData.filter(
      item =>
        item.type === type &&
        item.status === status
    ).length;

  }


  // ==========================================================
  // STATUS NAVIGATION
  // ==========================================================

  function renderStatusNavigation() {

    if (
      !elements.statusNavigation
    ) {
      return;
    }

    const statuses =
      STATUS_CONFIG[
        state.contentType
      ] || [];


    elements.statusNavigation.innerHTML =
      statuses
        .map(
          status => {

            const count =
              getStatusCount(
                state.contentType,
                status
              );


            return `

              <button
                type="button"
                class="status-tab ${
                  state.status === status
                    ? "active"
                    : ""
                }"
                data-status="${status}"
              >

                ${getStatusLabel(
                  status
                )}

                <span class="status-count">
                  ${count}
                </span>

              </button>

            `;

          }
        )
        .join("");

  }


  // ==========================================================
  // CONTENT TYPE COUNTS
  // ==========================================================

  function updateContentTypeCounts() {

    setText(
      document.getElementById(
        "one-time-count"
      ),
      contentData.filter(
        item =>
          item.type ===
          "one-time"
      ).length
    );


    setText(
      document.getElementById(
        "series-count"
      ),
      contentData.filter(
        item =>
          item.type ===
          "series"
      ).length
    );


    setText(
      document.getElementById(
        "shorts-count"
      ),
      contentData.filter(
        item =>
          item.type ===
          "shorts"
      ).length
    );

  }


  // ==========================================================
  // SUMMARY
  // ==========================================================

  function updateSummary() {

    setText(
      document.getElementById(
        "summary-published"
      ),
      getStatusCount(
        state.contentType,
        "published"
      )
    );


    setText(
      document.getElementById(
        "summary-drafts"
      ),
      getStatusCount(
        state.contentType,
        "draft"
      )
    );


    setText(
      document.getElementById(
        "summary-processing"
      ),
      getStatusCount(
        state.contentType,
        "processing"
      )
    );


    setText(
      document.getElementById(
        "summary-failed"
      ),
      getStatusCount(
        state.contentType,
        "failed"
      )
    );

  }


  // ==========================================================
  // FILTER CONTENT
  // ==========================================================

  function getFilteredContent() {

    let items =
      contentData.filter(
        item => {

          if (
            item.type !==
            state.contentType
          ) {
            return false;
          }

          if (
            item.status !==
            state.status
          ) {
            return false;
          }


          const search =
            state.search
              .trim()
              .toLowerCase();


          if (!search) {
            return true;
          }


          return (
            item.title
              .toLowerCase()
              .includes(search)
          );

        }
      );


    // ========================================================
    // SORT
    // ========================================================

    items.sort(
      (a, b) => {

        if (
          state.sort ===
          "title"
        ) {

          return a.title.localeCompare(
            b.title
          );

        }


        if (
          state.sort ===
          "views"
        ) {

          return (
            (b.views || 0) -
            (a.views || 0)
          );

        }


        const aDate =
          a.release
            ? new Date(
                a.release
              ).getTime()
            : 0;


        const bDate =
          b.release
            ? new Date(
                b.release
              ).getTime()
            : 0;


        if (
          state.sort ===
          "latest"
        ) {

          return (
            bDate -
            aDate
          );

        }


        return (
          aDate -
          bDate
        );

      }
    );


    return items;

  }


  // ==========================================================
  // ACTIONS
  // ==========================================================

  function getActions(item) {

    const actions = [];


    // --------------------------------------------------------
    // VIEW
    // --------------------------------------------------------

    actions.push({

      action: "view",

      label: "View",

      className: ""

    });


    // --------------------------------------------------------
    // EDIT
    // --------------------------------------------------------

    actions.push({

      action: "edit",

      label: "Edit",

      className: ""

    });


    // --------------------------------------------------------
    // SCHEDULED
    // --------------------------------------------------------

    if (
      item.status ===
      "scheduled"
    ) {

      actions.push({

        action:
          "publish-now",

        label:
          "Publish Now",

        className:
          "success"

      });


      actions.push({

        action:
          "cancel-schedule",

        label:
          "Cancel",

        className:
          "blue"

      });

    }


    // --------------------------------------------------------
    // DRAFT
    // --------------------------------------------------------

    if (
      item.status ===
      "draft"
    ) {

      actions.push({

        action:
          "publish",

        label:
          "Publish",

        className:
          "success"

      });


      if (
        item.type !==
        "shorts"
      ) {

        actions.push({

          action:
            "schedule",

          label:
            "Schedule",

          className:
            "blue"

        });

      }

    }


    // --------------------------------------------------------
    // PRIVATE
    // --------------------------------------------------------

    if (
      item.status ===
      "private"
    ) {

      if (
        item.type !==
        "shorts"
      ) {

        actions.push({

          action:
            "schedule",

          label:
            "Schedule",

          className:
            "blue"

        });

      }

    }


    // --------------------------------------------------------
    // PROCESSING
    // --------------------------------------------------------

    if (
      item.status ===
      "processing"
    ) {

      actions.push({

        action:
          "retry",

        label:
          "Retry",

        className:
          "blue"

      });

    }


    // --------------------------------------------------------
    // FAILED
    // --------------------------------------------------------

    if (
      item.status ===
      "failed"
    ) {

      actions.push({

        action:
          "view-error",

        label:
          "View Error",

        className:
          ""

      });


      actions.push({

        action:
          "retry",

        label:
          "Retry",

        className:
          "blue"

      });

    }


    // --------------------------------------------------------
    // DELETE
    // --------------------------------------------------------

    actions.push({

      action:
        "delete",

      label:
        "Delete",

      className:
        "danger"

    });


    // --------------------------------------------------------
    // SERIES ONLY
    // --------------------------------------------------------

    if (
      item.type ===
      "series"
    ) {

      actions.push({

        action:
          "manage-episodes",

        label:
          state.expandedSeries.has(
            item.id
          )
            ? "Hide Episodes"
            : "Manage Episodes",

        className:
          "primary"

      });

    }


    return actions;

  }


  // ==========================================================
  // ACTION HTML
  // ==========================================================

  function renderActions(
    item,
    isEpisode = false
  ) {

    return `

      <div
        class="actions ${
          isEpisode
            ? "episode-actions"
            : ""
        }"
        data-content-id="${item.id}"
      >

        ${getActions(item)
          .map(
            button => `

              <button
                type="button"
                class="action-button ${
                  button.className
                }"
                data-action="${
                  button.action
                }"
                data-id="${item.id}"
              >

                ${button.label}

              </button>

            `
          )
          .join("")}

      </div>

    `;

  }


  // ==========================================================
  // RENDER PARENT SERIES / CONTENT ROW
  // ==========================================================

  function renderContentRow(
    item
  ) {

    const initials =
      item.title
        .split(/\s+/)
        .slice(0, 2)
        .map(
          word =>
            word.charAt(0)
        )
        .join("")
        .toUpperCase();


    const isExpanded =
      item.type === "series" &&
      state.expandedSeries.has(
        item.id
      );


    const mainRow = `

      <tr
        class="main-content-row ${
          isExpanded
            ? "series-expanded"
            : ""
        }"
        data-row-id="${item.id}"
      >

        <td>

          <div class="content-cell">

            <div class="thumbnail">

              ${escapeHTML(
                initials
              )}

            </div>

            <div class="content-details">

              <span class="content-title">

                ${escapeHTML(
                  item.title
                )}

              </span>

              <span class="content-subtitle">

                ${getTypeLabel(
                  item.type
                )}

                •

                ${
                  item.duration ||
                  "—"
                }

              </span>

            </div>

          </div>

        </td>


        <td>

          ${formatDate(
            item.release
          )}

        </td>


        <td>

          <span
            class="status-badge ${
              getStatusClass(
                item.status
              )
            }"
          >

            ${getStatusLabel(
              item.status
            )}

          </span>

        </td>


        <td>

          ${
            (
              item.views ||
              0
            ).toLocaleString()
          }

        </td>


        <td>

          ${renderActions(
            item
          )}

        </td>

      </tr>

    `;


    if (
      item.type ===
      "series"
    ) {

      return (
        mainRow +
        renderEpisodeRow(
          item
        )
      );

    }


    return mainRow;

  }


  // ==========================================================
  // RENDER EPISODE CONTAINER
  //
  // Hidden by default.
  // Appears directly below parent series.
  // ==========================================================

  function renderEpisodeRow(
    series
  ) {

    const isOpen =
      state.expandedSeries.has(
        series.id
      );


    const seasonNumber =
      state.selectedSeason[
        series.id
      ] ||
      series.seasons?.[0]?.number ||
      1;


    const season =
      series.seasons?.find(
        currentSeason =>
          currentSeason.number ===
          Number(
            seasonNumber
          )
      );


    const totalEpisodes =
      series.seasons?.reduce(
        (
          total,
          currentSeason
        ) =>
          total +
          (
            currentSeason
              .episodes
              ?.length ||
            0
          ),
        0
      ) || 0;


    return `

      <tr
        class="episode-row ${
          isOpen
            ? "open"
            : ""
        }"
        data-episode-container="${series.id}"
        ${isOpen ? "" : "hidden"}
      >

        <td colspan="5">

          <div class="episodes-container">

            <div class="episodes-header">

              <div class="episodes-heading">

                <strong>
                  Episodes
                </strong>

                <span>

                  ${escapeHTML(
                    series.title
                  )}

                  •

                  ${totalEpisodes}

                  episodes

                </span>

              </div>


              <select
                class="season-select"
                data-season-series="${series.id}"
              >

                ${
                  (
                    series.seasons ||
                    []
                  )
                  .map(
                    currentSeason => `

                      <option
                        value="${
                          currentSeason.number
                        }"
                        ${
                          currentSeason.number ===
                          Number(
                            seasonNumber
                          )
                            ? "selected"
                            : ""
                        }
                      >

                        Season
                        ${
                          currentSeason.number
                        }

                      </option>

                    `
                  )
                  .join("")
                }

              </select>

            </div>


            <div class="episode-list">

              <table class="episode-table">

                <thead>

                  <tr>

                    <th>
                      CONTENT
                    </th>

                    <th>
                      RELEASE
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th>
                      VIEWS
                    </th>

                    <th>
                      ACTIONS
                    </th>

                  </tr>

                </thead>


                <tbody>

                  ${
                    season &&
                    season.episodes &&
                    season.episodes.length

                      ? season.episodes
                          .map(
                            episode =>
                              renderEpisodeItem(
                                episode
                              )
                          )
                          .join("")

                      : `

                        <tr>

                          <td
                            colspan="5"
                            class="episode-empty"
                          >

                            No episodes found
                            for this season.

                          </td>

                        </tr>

                      `
                  }

                </tbody>

              </table>

            </div>

          </div>

        </td>

      </tr>

    `;

  }


  // ==========================================================
  // RENDER INDIVIDUAL EPISODE
  // ==========================================================

  function renderEpisodeItem(
    episode
  ) {

    return `

      <tr
        class="episode-item"
        data-episode-id="${episode.id}"
      >

        <td>

          <div class="episode-content-cell">

            <div class="episode-number">

              E${episode.number}

            </div>


            <div class="episode-info">

              <span class="episode-title">

                ${escapeHTML(
                  episode.title
                )}

              </span>


              <span class="episode-meta">

                Episode
                ${episode.number}

                •

                ${escapeHTML(
                  episode.duration ||
                  "—"
                )}

              </span>

            </div>

          </div>

        </td>


        <td>

          ${formatDate(
            episode.release
          )}

        </td>


        <td>

          <span
            class="status-badge ${
              getStatusClass(
                episode.status
              )
            }"
          >

            ${getStatusLabel(
              episode.status
            )}

          </span>

        </td>


        <td>

          ${
            (
              episode.views ||
              0
            ).toLocaleString()
          }

        </td>


        <td class="episode-actions-cell">

          ${renderActions(
            episode,
            true
          )}

        </td>

      </tr>

    `;

  }


  // ==========================================================
  // RENDER TABLE
  // ==========================================================

  function renderTable() {

    if (!elements.tableBody) {
      return;
    }


    const items =
      getFilteredContent();


    const total =
      items.length;


    const totalPages =
      Math.max(
        1,
        Math.ceil(
          total /
          PAGE_SIZE
        )
      );


    if (
      state.page >
      totalPages
    ) {

      state.page =
        totalPages;

    }


    const start =
      (
        state.page - 1
      ) *
      PAGE_SIZE;


    const visibleItems =
      items.slice(
        start,
        start +
        PAGE_SIZE
      );


    if (
      !visibleItems.length
    ) {

      elements.tableBody.innerHTML =
        "";


      if (
        elements.emptyState
      ) {

        elements.emptyState.classList.remove(
          "hidden"
        );

      }

    } else {

      if (
        elements.emptyState
      ) {

        elements.emptyState.classList.add(
          "hidden"
        );

      }


      elements.tableBody.innerHTML =
        visibleItems
          .map(
            item =>
              renderContentRow(
                item
              )
          )
          .join("");

    }


    renderPagination(
      total,
      totalPages,
      start,
      visibleItems.length
    );

  }


  // ==========================================================
  // PAGINATION
  // ==========================================================

  function renderPagination(
    total,
    totalPages,
    start,
    visibleCount
  ) {

    if (
      elements.paginationInfo
    ) {

      if (!total) {

        elements.paginationInfo.textContent =
          "Showing 0 of 0 items";

      } else {

        elements.paginationInfo.textContent =
          `Showing ${
            start + 1
          }–${
            start +
            visibleCount
          } of ${
            total
          } items`;

      }

    }


    if (
      elements.previous
    ) {

      elements.previous.disabled =
        state.page <= 1;

    }


    if (
      elements.next
    ) {

      elements.next.disabled =
        state.page >=
        totalPages;

    }


    if (
      !elements.pageNumbers
    ) {
      return;
    }


    elements.pageNumbers.innerHTML =
      "";


    for (
      let page = 1;
      page <= totalPages;
      page++
    ) {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        `page-number ${
          page === state.page
            ? "active"
            : ""
        }`;


      button.textContent =
        page;


      button.dataset.page =
        page;


      elements.pageNumbers.appendChild(
        button
      );

    }

  }


  // ==========================================================
  // COMPLETE RENDER
  // ==========================================================

  function render() {

    updateContentTypeCounts();

    updateSummary();

    renderStatusNavigation();

    renderTable();

  }


  // ==========================================================
  // CONTENT TYPE SWITCHING
  // ==========================================================

  document
    .querySelectorAll(
      ".content-type-card"
    )
    .forEach(
      card => {

        card.addEventListener(
          "click",
          () => {

            const type =
              card.dataset.contentType;


            if (
              !STATUS_CONFIG[type]
            ) {
              return;
            }


            state.contentType =
              type;


            state.status =
              STATUS_CONFIG[
                type
              ][0];


            state.page =
              1;


            state.search =
              "";


            if (
              elements.search
            ) {

              elements.search.value =
                "";

            }


            state.expandedSeries.clear();


            document
              .querySelectorAll(
                ".content-type-card"
              )
              .forEach(
                item =>
                  item.classList.remove(
                    "active"
                  )
              );


            card.classList.add(
              "active"
            );


            render();

          }
        );

      }
    );


  // ==========================================================
  // STATUS TAB CLICK
  // ==========================================================

  if (
    elements.statusNavigation
  ) {

    elements.statusNavigation.addEventListener(
      "click",
      event => {

        const tab =
          event.target.closest(
            "[data-status]"
          );


        if (!tab) {
          return;
        }


        state.status =
          tab.dataset.status;


        state.page =
          1;


        state.expandedSeries.clear();


        render();

      }
    );

  }


  // ==========================================================
  // SEARCH
  // ==========================================================

  if (
    elements.search
  ) {

    elements.search.addEventListener(
      "input",
      event => {

        state.search =
          event.target.value;


        state.page =
          1;


        renderTable();

      }
    );

  }


  // ==========================================================
  // SORT
  // ==========================================================

  if (
    elements.sort
  ) {

    elements.sort.addEventListener(
      "change",
      event => {

        state.sort =
          event.target.value;


        state.page =
          1;


        renderTable();

      }
    );

  }


  // ==========================================================
  // PREVIOUS PAGE
  // ==========================================================

  if (
    elements.previous
  ) {

    elements.previous.addEventListener(
      "click",
      () => {

        if (
          state.page >
          1
        ) {

          state.page--;

          renderTable();

        }

      }
    );

  }


  // ==========================================================
  // NEXT PAGE
  // ==========================================================

  if (
    elements.next
  ) {

    elements.next.addEventListener(
      "click",
      () => {

        const total =
          getFilteredContent()
            .length;


        const totalPages =
          Math.max(
            1,
            Math.ceil(
              total /
              PAGE_SIZE
            )
          );


        if (
          state.page <
          totalPages
        ) {

          state.page++;

          renderTable();

        }

      }
    );

  }


  // ==========================================================
  // PAGE NUMBER CLICK
  // ==========================================================

  if (
    elements.pageNumbers
  ) {

    elements.pageNumbers.addEventListener(
      "click",
      event => {

        const button =
          event.target.closest(
            "[data-page]"
          );


        if (!button) {
          return;
        }


        state.page =
          Number(
            button.dataset.page
          );


        renderTable();

      }
    );

  }


  // ==========================================================
  // TABLE ACTION DELEGATION
  // ==========================================================

  if (
    elements.tableBody
  ) {

    elements.tableBody.addEventListener(
      "click",
      event => {

        const button =
          event.target.closest(
            "[data-action]"
          );


        if (!button) {
          return;
        }


        const action =
          button.dataset.action;


        const id =
          button.dataset.id;


        handleAction(
          action,
          id
        );

      }
    );


    // --------------------------------------------------------
    // SEASON SELECT
    // --------------------------------------------------------

    elements.tableBody.addEventListener(
      "change",
      event => {

        const select =
          event.target.closest(
            "[data-season-series]"
          );


        if (!select) {
          return;
        }


        const seriesId =
          select.dataset.seasonSeries;


        state.selectedSeason[
          seriesId
        ] =
          Number(
            select.value
          );


        state.expandedSeries.add(
          seriesId
        );


        renderTable();

      }
    );

  }


  // ==========================================================
  // MANAGE EPISODES
  // ==========================================================

  function toggleSeriesEpisodes(
    seriesId
  ) {

    if (
      state.expandedSeries.has(
        seriesId
      )
    ) {

      state.expandedSeries.delete(
        seriesId
      );

    } else {

      state.expandedSeries.add(
        seriesId
      );

    }


    renderTable();

  }


  // ==========================================================
  // ACTION ROUTER
  // ==========================================================

  function handleAction(
    action,
    id
  ) {

    const item =
      findContent(id);


    if (!item) {

      showToast(
        "Content could not be found."
      );

      return;

    }


    switch (action) {

      // ------------------------------------------------------
      // VIEW
      // ------------------------------------------------------

      case "view":

        openViewModal(
          item
        );

        break;


      // ------------------------------------------------------
      // EDIT
      // ------------------------------------------------------

      case "edit":

        openEditModal(
          item
        );

        break;


      // ------------------------------------------------------
      // MANAGE EPISODES
      // ------------------------------------------------------

      case "manage-episodes":

        toggleSeriesEpisodes(
          item.id
        );

        break;


      // ------------------------------------------------------
      // PUBLISH
      // ------------------------------------------------------

      case "publish":

        confirmAction(
          "Publish Content",
          `Publish "${item.title}" now?`,
          () => {

            item.status =
              "published";

            item.visibility =
              "Public";

            item.release =
              new Date()
                .toISOString();

            render();

            showToast(
              "Content published successfully."
            );

          }
        );

        break;


      // ------------------------------------------------------
      // PUBLISH NOW
      // ------------------------------------------------------

      case "publish-now":

        confirmAction(
          "Publish Now",
          `Publish "${item.title}" immediately?`,
          () => {

            item.status =
              "published";

            item.visibility =
              "Public";

            item.release =
              new Date()
                .toISOString();

            render();

            showToast(
              "Scheduled content published."
            );

          }
        );

        break;


      // ------------------------------------------------------
      // CANCEL SCHEDULE
      // ------------------------------------------------------

      case "cancel-schedule":

        confirmAction(
          "Cancel Schedule",
          `Cancel the scheduled release for "${item.title}"? The content will become a draft.`,
          () => {

            item.status =
              "draft";

            item.release =
              null;

            render();

            showToast(
              "Schedule cancelled. Content saved as a draft."
            );

          }
        );

        break;


      // ------------------------------------------------------
      // SCHEDULE
      // ------------------------------------------------------

      case "schedule":

        openScheduleModal(
          item
        );

        break;


      // ------------------------------------------------------
      // RETRY
      // ------------------------------------------------------

      case "retry":

        retryContent(
          item
        );

        break;


      // ------------------------------------------------------
      // VIEW ERROR
      // ------------------------------------------------------

      case "view-error":

        showToast(
          "Processing failed. Open the content details to review the upload."
        );

        openViewModal(
          item
        );

        break;


      // ------------------------------------------------------
      // DELETE
      // ------------------------------------------------------

      case "delete":

        confirmAction(
          "Delete Content",
          `Delete "${item.title}"? This action cannot be undone.`,
          () => {

            deleteContent(
              item.id
            );

          }
        );

        break;

    }

  }


  // ==========================================================
  // VIEW MODAL
  // ==========================================================

  function openViewModal(
    item
  ) {

    if (
      !elements.viewTitle ||
      !elements.viewContent
    ) {
      return;
    }


    elements.viewTitle.textContent =
      item.title;


    const parent =
      findParentSeries(
        item.id
      );


    const type =
      parent
        ? "Episode"
        : getTypeLabel(
            item.type
          );


    elements.viewContent.innerHTML = `

      <div class="view-thumbnail">
        ▶
      </div>

      <div class="view-details">

        <div>

          <div class="view-title">

            ${escapeHTML(
              item.title
            )}

          </div>

          <span class="content-subtitle">

            ${type}

            •

            ${
              item.duration ||
              "—"
            }

          </span>

        </div>


        <div class="view-description">

          ${escapeHTML(
            item.description ||
            "No description available."
          )}

        </div>


        <div class="view-meta-grid">

          <div class="view-meta">

            <span>
              Status
            </span>

            <strong>

              ${getStatusLabel(
                item.status
              )}

            </strong>

          </div>


          <div class="view-meta">

            <span>
              Release
            </span>

            <strong>

              ${formatDate(
                item.release
              )}

            </strong>

          </div>


          <div class="view-meta">

            <span>
              Views
            </span>

            <strong>

              ${
                (
                  item.views ||
                  0
                ).toLocaleString()
              }

            </strong>

          </div>


          <div class="view-meta">

            <span>
              Genre
            </span>

            <strong>

              ${escapeHTML(
                item.genre ||
                "—"
              )}

            </strong>

          </div>


          <div class="view-meta">

            <span>
              Visibility
            </span>

            <strong>

              ${escapeHTML(
                item.visibility ||
                "—"
              )}

            </strong>

          </div>


          <div class="view-meta">

            <span>
              Comments
            </span>

            <strong>

              ${
                item.comments
                  ? "Allowed"
                  : "Disabled"
              }

            </strong>

          </div>

        </div>

      </div>

    `;


    openModal(
      "view-modal"
    );

  }


  // ==========================================================
  // EDIT MODAL
  // ==========================================================

  function openEditModal(
    item
  ) {

    if (
      !elements.editModal ||
      !elements.editForm
    ) {
      return;
    }


    state.editingId =
      item.id;


    if (
      elements.editId
    ) {

      elements.editId.value =
        item.id;

    }


    if (
      elements.editTitle
    ) {

      elements.editTitle.value =
        item.title ||
        "";

    }


    if (
      elements.editDescription
    ) {

      elements.editDescription.value =
        item.description ||
        "";

    }


    if (
      elements.editGenre
    ) {

      elements.editGenre.value =
        item.genre ||
        "Animation";

    }


    if (
      elements.editComments
    ) {

      elements.editComments.checked =
        Boolean(
          item.comments
        );

    }


    if (
      elements.editPrivate &&
      elements.editPublic
    ) {

      if (
        item.visibility ===
        "Private"
      ) {

        elements.editPrivate.checked =
          true;

      } else {

        elements.editPublic.checked =
          true;

      }

    }


    if (
      elements.editPreviewTitle
    ) {

      elements.editPreviewTitle.textContent =
        item.title;

    }


    const parent =
      findParentSeries(
        item.id
      );


    const typeLabel =
      parent
        ? "Episode"
        : getTypeLabel(
            item.type
          );


    if (
      elements.editPreviewMeta
    ) {

      elements.editPreviewMeta.textContent =
        `${typeLabel} • ${
          item.duration ||
          "—"
        }`;

    }


    openModal(
      "edit-modal"
    );

  }


  // ==========================================================
  // SAVE EDIT
  // ==========================================================

  if (
    elements.editForm
  ) {

    elements.editForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const id =
          elements.editId
            ? elements.editId.value
            : state.editingId;


        const item =
          findContent(id);


        if (!item) {
          return;
        }


        if (
          elements.editTitle
        ) {

          item.title =
            elements.editTitle.value.trim();

        }


        if (
          elements.editDescription
        ) {

          item.description =
            elements.editDescription.value.trim();

        }


        if (
          elements.editGenre
        ) {

          item.genre =
            elements.editGenre.value;

        }


        if (
          elements.editPrivate
        ) {

          item.visibility =
            elements.editPrivate.checked
              ? "Private"
              : "Public";

        }


        if (
          elements.editComments
        ) {

          item.comments =
            elements.editComments.checked;

        }


        closeModal(
          "edit-modal"
        );


        render();


        showToast(
          "Changes saved successfully."
        );

      }
    );

  }


  // ==========================================================
  // SCHEDULE MODAL
  // ==========================================================

  function openScheduleModal(
    item
  ) {

    if (
      !elements.scheduleModal
    ) {
      return;
    }


    state.schedulingId =
      item.id;


    if (
      elements.scheduleId
    ) {

      elements.scheduleId.value =
        item.id;

    }


    if (
      elements.scheduleDate
    ) {

      elements.scheduleDate.value =
        formatDateForInput(
          item.release
        );


      if (
        !elements.scheduleDate.value
      ) {

        const future =
          new Date();


        future.setDate(
          future.getDate() +
          1
        );


        future.setHours(
          12,
          0,
          0,
          0
        );


        elements.scheduleDate.value =
          formatDateForInput(
            future
          );

      }

    }


    openModal(
      "schedule-modal"
    );

  }


  // ==========================================================
  // SAVE SCHEDULE
  // ==========================================================

  if (
    elements.scheduleForm
  ) {

    elements.scheduleForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const id =
          elements.scheduleId
            ? elements.scheduleId.value
            : state.schedulingId;


        const item =
          findContent(id);


        if (!item) {
          return;
        }


        const selectedDate =
          elements.scheduleDate
            ? elements.scheduleDate.value
            : "";


        if (!selectedDate) {
          return;
        }


        item.release =
          new Date(
            selectedDate
          ).toISOString();


        item.status =
          "scheduled";


        item.visibility =
          "Public";


        closeModal(
          "schedule-modal"
        );


        render();


        showToast(
          "Content scheduled successfully."
        );

      }
    );

  }


  // ==========================================================
  // RETRY
  // ==========================================================

  function retryContent(
    item
  ) {

    item.status =
      "processing";


    render();


    showToast(
      "Retry started. Content is processing again."
    );


    setTimeout(
      () => {

        const current =
          findContent(
            item.id
          );


        if (
          current &&
          current.status ===
            "processing"
        ) {

          current.status =
            "published";


          current.visibility =
            "Public";


          current.release =
            new Date()
              .toISOString();


          render();


          showToast(
            "Processing completed successfully."
          );

        }

      },
      1800
    );

  }


  // ==========================================================
  // DELETE CONTENT
  // ==========================================================

  function deleteContent(
    id
  ) {

    // --------------------------------------------------------
    // TOP LEVEL
    // --------------------------------------------------------

    const topLevelIndex =
      contentData.findIndex(
        item =>
          item.id === id
      );


    if (
      topLevelIndex !== -1
    ) {

      const item =
        contentData[
          topLevelIndex
        ];


      if (
        item.type ===
        "series"
      ) {

        state.expandedSeries.delete(
          item.id
        );

      }


      contentData.splice(
        topLevelIndex,
        1
      );


      render();


      showToast(
        "Content deleted."
      );


      return;

    }


    // --------------------------------------------------------
    // EPISODE
    // --------------------------------------------------------

    for (
      const series of contentData
    ) {

      if (
        series.type !==
        "series"
      ) {
        continue;
      }


      for (
        const season of
        series.seasons || []
      ) {

        const episodeIndex =
          (
            season.episodes ||
            []
          ).findIndex(
            episode =>
              episode.id ===
              id
          );


        if (
          episodeIndex !==
          -1
        ) {

          season.episodes.splice(
            episodeIndex,
            1
          );


          render();


          showToast(
            "Episode deleted."
          );


          return;

        }

      }

    }

  }


  // ==========================================================
  // CONFIRMATION
  // ==========================================================

  function confirmAction(
    title,
    message,
    callback
  ) {

    state.confirmAction =
      callback;


    setText(
      elements.confirmTitle,
      title
    );


    setText(
      elements.confirmMessage,
      message
    );


    openModal(
      "confirm-modal"
    );

  }


  if (
    elements.confirmButton
  ) {

    elements.confirmButton.addEventListener(
      "click",
      () => {

        if (
          typeof state.confirmAction !==
          "function"
        ) {
          return;
        }


        const callback =
          state.confirmAction;


        state.confirmAction =
          null;


        closeModal(
          "confirm-modal"
        );


        callback();

      }
    );

  }


  // ==========================================================
  // OPEN MODAL
  // ==========================================================

  function openModal(
    id
  ) {

    const modal =
      document.getElementById(
        id
      );


    if (!modal) {
      return;
    }


    modal.classList.remove(
      "hidden"
    );


    document.body.style.overflow =
      "hidden";

  }


  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  function closeModal(
    id
  ) {

    const modal =
      document.getElementById(
        id
      );


    if (!modal) {
      return;
    }


    modal.classList.add(
      "hidden"
    );


    const openModals =
      document.querySelectorAll(
        ".modal-backdrop:not(.hidden)"
      );


    if (
      openModals.length ===
      0
    ) {

      document.body.style.overflow =
        "";

    }

  }


  // ==========================================================
  // CLOSE BUTTONS
  // ==========================================================

  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-close-modal]"
        );


      if (!button) {
        return;
      }


      closeModal(
        button.dataset.closeModal
      );

    }
  );


  // ==========================================================
  // BACKDROP CLICK
  // ==========================================================

  document
    .querySelectorAll(
      ".modal-backdrop"
    )
    .forEach(
      backdrop => {

        backdrop.addEventListener(
          "click",
          event => {

            if (
              event.target ===
              backdrop
            ) {

              closeModal(
                backdrop.id
              );

            }

          }
        );

      }
    );


  // ==========================================================
  // ESCAPE KEY
  // ==========================================================

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !==
        "Escape"
      ) {
        return;
      }


      document
        .querySelectorAll(
          ".modal-backdrop:not(.hidden)"
        )
        .forEach(
          modal => {

            closeModal(
              modal.id
            );

          }
        );

    }
  );


  // ==========================================================
  // INITIAL RENDER
  //
  // IMPORTANT:
  // There must be NOTHING below this except the closing
  // DOMContentLoaded wrapper.
  // ==========================================================

  render();

});