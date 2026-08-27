/* =========================================================
   NETTOON CREATOR STUDIO
   script27.js

   Handles:
   - Dashboard / Content view switching
   - Content filtering
   - Content type filtering
   - Search
   - Sorting
   - Scheduled content
   - Published content
   - Drafts
   - Edit Video
   - Delete Video
   - Edit Schedule
   - Publish Now
   - Cancel Schedule
   - Toast notifications
   ========================================================= */


/* =========================================================
   1. DEMO CONTENT DATA
   ========================================================= */

const makeDate = (days, hour, minute = 0) => {
    const d = new Date();

    d.setDate(d.getDate() + days);
    d.setHours(hour, minute, 0, 0);

    return d;
};


let items = [

    /* -------------------------
       SCHEDULED
       ------------------------- */

    {
        id: 1,
        title: "Zygote",
        type: "One-time Video",
        contentType: "video",
        release: makeDate(0, 22, 2),
        status: "scheduled",
        schedule: "One-time release",
        duration: "00:05",
        description: "A dystopian story about creation and consciousness.",
        genre: "Science Fiction",
        comments: true
    },

    {
        id: 2,
        title: "Episode 2 — Awakening",
        type: "Series • Episode 2",
        contentType: "series",
        series: "Zygote",
        release: makeDate(2, 19),
        status: "scheduled",
        schedule: "Series schedule",
        duration: "08:42",
        description: "The story continues as the protagonist begins to awaken.",
        genre: "Science Fiction",
        comments: true
    },

    {
        id: 3,
        title: "Episode 3 — The Choice",
        type: "Series • Episode 3",
        contentType: "series",
        series: "Zygote",
        release: makeDate(4, 19),
        status: "scheduled",
        schedule: "Series schedule",
        duration: "10:15",
        description: "A difficult decision changes everything.",
        genre: "Drama",
        comments: true
    },

    {
        id: 4,
        title: "Episode 4 — Origins",
        type: "Series • Episode 4",
        contentType: "series",
        series: "Zygote",
        release: makeDate(6, 19),
        status: "scheduled",
        schedule: "Series schedule",
        duration: "11:04",
        description: "The origins of Zygote are finally revealed.",
        genre: "Mystery",
        comments: true
    },

    {
        id: 5,
        title: "Episode 5 — The Signal",
        type: "Series • Episode 5",
        contentType: "series",
        series: "Zygote",
        release: makeDate(8, 19),
        status: "scheduled",
        schedule: "Series schedule",
        duration: "09:31",
        description: "A mysterious signal reaches the city.",
        genre: "Thriller",
        comments: true
    },

    {
        id: 11,
        title: "The 30-Second Origin",
        type: "Short",
        contentType: "short",
        release: makeDate(1, 12),
        status: "scheduled",
        schedule: "Short release",
        duration: "00:30",
        description: "A short introduction to the story.",
        genre: "Animation",
        comments: true
    },

    {
        id: 12,
        title: "Animation Fact #04",
        type: "Short",
        contentType: "short",
        release: makeDate(3, 18, 30),
        status: "scheduled",
        schedule: "Short release",
        duration: "00:27",
        description: "A quick animation fact.",
        genre: "Educational",
        comments: true
    },


    /* -------------------------
       PUBLISHED
       ------------------------- */

    {
        id: 6,
        title: "Behind the Scenes",
        type: "One-time Video",
        contentType: "video",
        release: makeDate(-1, 17),
        status: "published",
        schedule: "Published",
        duration: "06:12",
        description: "A look behind the scenes of the animation process.",
        genre: "Documentary",
        comments: true
    },


    /* -------------------------
       DRAFT
       ------------------------- */

    {
        id: 7,
        title: "Creator Intro",
        type: "One-time Video",
        contentType: "video",
        release: null,
        status: "draft",
        schedule: "Not scheduled",
        duration: "02:04",
        description: "Introduction to the creator and their work.",
        genre: "Animation",
        comments: true
    },

    {
        id: 13,
        title: "African Animation Journey",
        type: "One-time Video",
        contentType: "video",
        release: null,
        status: "draft",
        schedule: "Not scheduled",
        duration: "04:25",
        description: "Exploring the growth of African animation.",
        genre: "African Folklore & Mythology",
        comments: true
    },

    {
        id: 14,
        title: "Untitled Animation",
        type: "One-time Video",
        contentType: "video",
        release: null,
        status: "draft",
        schedule: "Not scheduled",
        duration: "01:48",
        description: "",
        genre: "Animation",
        comments: true
    },


    /* -------------------------
       PRIVATE
       ------------------------- */

    {
        id: 8,
        title: "My First Animation",
        type: "One-time Video",
        contentType: "video",
        release: null,
        status: "private",
        schedule: "Private",
        duration: "03:40",
        description: "Private animation project.",
        genre: "Animation",
        comments: true
    },


    /* -------------------------
       PROCESSING
       ------------------------- */

    {
        id: 9,
        title: "Trailer — Nettoon Originals",
        type: "One-time Video",
        contentType: "video",
        release: null,
        status: "processing",
        schedule: "Processing",
        duration: "00:48",
        description: "Official Nettoon Originals trailer.",
        genre: "Animation",
        comments: true
    },


    /* -------------------------
       FAILED
       ------------------------- */

    {
        id: 10,
        title: "Old Export",
        type: "One-time Video",
        contentType: "video",
        release: null,
        status: "failed",
        schedule: "Upload failed",
        duration: "00:31",
        description: "Previous export that failed processing.",
        genre: "Animation",
        comments: true
    }

];


/* =========================================================
   2. APPLICATION STATE
   ========================================================= */

let currentFilter = "scheduled";
let currentType = "all";

let editingId = null;
let editingVideoId = null;
let pendingAction = null;


/* =========================================================
   3. STATUS LABELS
   ========================================================= */

const statusLabel = {

    scheduled: "Scheduled",

    published: "Published",

    draft: "Draft",

    private: "Private",

    processing: "Processing",

    failed: "Failed"

};


/* =========================================================
   4. DATE HELPERS
   ========================================================= */

function fmtDate(date) {

    if (!date) {
        return "—";
    }

    return date.toLocaleDateString(undefined, {

        month: "short",

        day: "numeric",

        year: "numeric"

    });

}


function fmtTime(date) {

    if (!date) {
        return "—";
    }

    return date.toLocaleTimeString(undefined, {

        hour: "numeric",

        minute: "2-digit"

    });

}


function fmtFull(date) {

    if (!date) {
        return "—";
    }

    return `${fmtDate(date)}, ${fmtTime(date)}`;

}


/* =========================================================
   5. ESCAPE HTML
   ========================================================= */

function esc(value) {

    return String(value ?? "").replace(

        /[&<>"']/g,

        function (match) {

            return {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            }[match];

        }

    );

}


/* =========================================================
   6. GET CONTENT ACTIONS
   ========================================================= */

function actionsFor(item) {


    /* -------------------------
       SCHEDULED
       ------------------------- */

    if (item.status === "scheduled") {

        return `

            <button
                class="iconbtn"
                title="Edit Schedule"
                onclick="editSchedule(${item.id})">

                Edit

            </button>


            <button
                class="iconbtn"
                title="Publish Now"
                onclick="askAction('publish', ${item.id})">

                Publish Now

            </button>


            <button
                class="iconbtn"
                title="Cancel Schedule"
                onclick="askAction('cancel', ${item.id})">

                Cancel

            </button>


            <button
                class="iconbtn danger"
                title="Delete Video"
                onclick="askAction('delete', ${item.id})">

                Delete

            </button>

        `;

    }


    /* -------------------------
       PUBLISHED
       ------------------------- */

    if (item.status === "published") {

        return `

            <button
                class="iconbtn"
                title="View Video"
                onclick="viewVideo(${item.id})">

                View

            </button>


            <button
                class="iconbtn"
                title="Edit Video"
                onclick="editVideo(${item.id})">

                Edit Video

            </button>


            <button
                class="iconbtn danger"
                title="Delete Video"
                onclick="askAction('delete', ${item.id})">

                Delete Video

            </button>

        `;

    }


    /* -------------------------
       DRAFT
       ------------------------- */

    if (item.status === "draft") {

        return `

            <button
                class="iconbtn"
                title="Edit Video"
                onclick="editVideo(${item.id})">

                Edit Video

            </button>


            <button
                class="iconbtn"
                title="Schedule"
                onclick="scheduleDraft(${item.id})">

                Schedule

            </button>


            <button
                class="iconbtn danger"
                title="Delete Video"
                onclick="askAction('delete', ${item.id})">

                Delete Video

            </button>

        `;

    }


    /* -------------------------
       PRIVATE
       ------------------------- */

    if (item.status === "private") {

        return `

            <button
                class="iconbtn"
                onclick="editVideo(${item.id})">

                Edit

            </button>


            <button
                class="iconbtn"
                onclick="makeScheduled(${item.id})">

                Schedule

            </button>


            <button
                class="iconbtn danger"
                onclick="askAction('delete', ${item.id})">

                Delete

            </button>

        `;

    }


    /* -------------------------
       PROCESSING
       ------------------------- */

    if (item.status === "processing") {

        return `

            <button
                class="iconbtn"
                onclick="processingDetails(${item.id})">

                Details

            </button>

        `;

    }


    /* -------------------------
       FAILED
       ------------------------- */

    if (item.status === "failed") {

        return `

            <button
                class="iconbtn"
                onclick="retryUpload(${item.id})">

                Retry

            </button>


            <button
                class="iconbtn danger"
                onclick="askAction('delete', ${item.id})">

                Delete

            </button>

        `;

    }


    return "";

}


/* =========================================================
   7. RENDER CONTENT TABLE
   ========================================================= */

function render() {

    const searchElement = document.getElementById("search");

    const sortElement = document.getElementById("sort");

    const rows = document.getElementById("rows");

    const empty = document.getElementById("empty");

    const table = document.querySelector(".table");


    if (!rows) {
        return;
    }


    const query = searchElement
        ? searchElement.value.trim().toLowerCase()
        : "";


    const sort = sortElement
        ? sortElement.value
        : "soonest";


    let list = items.filter(function (item) {

        const matchesStatus =
            item.status === currentFilter;


        const matchesType =
            currentType === "all" ||
            item.contentType === currentType;


        const searchableText = [

            item.title,

            item.type,

            item.genre,

            item.description,

            item.series || ""

        ]
            .join(" ")
            .toLowerCase();


        const matchesSearch =
            searchableText.includes(query);


        return (
            matchesStatus &&
            matchesType &&
            matchesSearch
        );

    });


    /* -------------------------
       SORT
       ------------------------- */

    if (sort === "soonest") {

        list.sort(function (a, b) {

            return (
                (a.release || new Date(9999, 0)) -
                (b.release || new Date(9999, 0))
            );

        });

    }


    if (sort === "latest") {

        list.sort(function (a, b) {

            return (
                (b.release || new Date(0)) -
                (a.release || new Date(0))
            );

        });

    }


    if (sort === "title") {

        list.sort(function (a, b) {

            return a.title.localeCompare(b.title);

        });

    }


    /* -------------------------
       CLEAR TABLE
       ------------------------- */

    rows.innerHTML = "";


    /* -------------------------
       CREATE ROWS
       ------------------------- */

    list.forEach(function (item) {

        const tr = document.createElement("tr");


        tr.innerHTML = `

            <td>

                <div class="content">

                    <div class="thumb">

                        <div class="play">

                            <b>▶</b>

                        </div>

                    </div>


                    <div>

                        <div class="name">

                            ${esc(item.title)}

                        </div>


                        <div class="meta">

                            ${esc(item.type)}
                            •
                            ${esc(item.duration)}

                        </div>

                    </div>

                </div>

            </td>


            <td>

                <div class="release">

                    ${item.release
                        ? fmtDate(item.release)
                        : "Not scheduled"
                    }


                    <small>

                        ${item.release
                            ? fmtTime(item.release)
                            : esc(item.schedule)
                        }

                    </small>

                </div>

            </td>


            <td>

                <span class="status ${item.status}">

                    <i class="dot"></i>

                    ${statusLabel[item.status]}

                </span>

            </td>


            <td>

                ${esc(item.schedule)}

            </td>


            <td>

                <div class="actions">

                    ${actionsFor(item)}

                </div>

            </td>

        `;


        rows.appendChild(tr);

    });


    /* -------------------------
       EMPTY STATE
       ------------------------- */

    if (empty) {

        empty.style.display =
            list.length ? "none" : "block";

    }


    if (table) {

        table.style.display =
            list.length ? "table" : "none";

    }


    /* -------------------------
       RESULT COUNT
       ------------------------- */

    const resultCount =
        document.getElementById("resultCount");


    if (resultCount) {

        let typeLabel = "";


        if (currentType === "video") {

            typeLabel = " one-time video";

        }

        else if (currentType === "series") {

            typeLabel = " series";

        }

        else if (currentType === "short") {

            typeLabel = " short";

        }


        resultCount.textContent =

            `Showing ${list.length}${typeLabel} ` +
            `${statusLabel[currentFilter].toLowerCase()} ` +
            `item${list.length === 1 ? "" : "s"}`;

    }


    updateCounts();

}


/* =========================================================
   8. UPDATE COUNTS
   ========================================================= */

function updateCounts() {


    /* -------------------------
       SCHEDULED TOTAL
       ------------------------- */

    const scheduledItems =
        items.filter(function (item) {

            return item.status === "scheduled";

        });


    const scheduledCount =
        document.getElementById("scheduledCount");


    if (scheduledCount) {

        scheduledCount.textContent =
            scheduledItems.length;

    }


    /* -------------------------
       SCHEDULED TYPE COUNTS
       ------------------------- */

    const scheduledVideo =
        scheduledItems.filter(function (item) {

            return item.contentType === "video";

        }).length;


    const scheduledSeries =
        scheduledItems.filter(function (item) {

            return item.contentType === "series";

        }).length;


    const scheduledShort =
        scheduledItems.filter(function (item) {

            return item.contentType === "short";

        }).length;


    setText("typeAllCount", scheduledItems.length);

    setText("typeVideoCount", scheduledVideo);

    setText("typeSeriesCount", scheduledSeries);

    setText("typeShortCount", scheduledShort);


    setText("summaryVideo", scheduledVideo);

    setText("summarySeries", scheduledSeries);

    setText("summaryShort", scheduledShort);


    /* =====================================================
       CONTENT PERFORMANCE

       IMPORTANT:
       These values come from the SAME items array
       rather than being independently hard-coded.
       ===================================================== */

    const libraryVideo =
        items.filter(function (item) {

            return item.contentType === "video";

        }).length;


    const librarySeries =
        items.filter(function (item) {

            return item.contentType === "series";

        }).length;


    const libraryShort =
        items.filter(function (item) {

            return item.contentType === "short";

        }).length;


    setText(
        "performanceVideoCount",
        `${libraryVideo} in library`
    );


    setText(
        "performanceSeriesCount",
        `${librarySeries} episodes in library`
    );


    setText(
        "performanceShortCount",
        `${libraryShort} in library`
    );


    /* -------------------------
       STATUS COUNTS
       ------------------------- */

    updateStatusCard("published");

    updateStatusCard("draft");

    updateStatusCard("private");

    updateStatusCard("processing");

    updateStatusCard("failed");

}


/* =========================================================
   9. STATUS CARD COUNTS
   ========================================================= */

function updateStatusCard(status) {

    const count =
        items.filter(function (item) {

            return item.status === status;

        }).length;


    const cards =
        document.querySelectorAll(".stat");


    cards.forEach(function (card) {

        const label =
            card.querySelector(".label");


        const number =
            card.querySelector(".num");


        if (!label || !number) {
            return;
        }


        const labelText =
            label.textContent.trim().toLowerCase();


        if (labelText === statusLabel[status].toLowerCase()) {

            number.textContent = count;

        }

    });

}


/* =========================================================
   10. SAFE TEXT HELPER
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent = value;

    }

}


/* =========================================================
   11. EDIT VIDEO
   ========================================================= */

function editVideo(id) {

    const item =
        items.find(function (entry) {

            return entry.id === id;

        });


    if (!item) {
        return;
    }


    editingVideoId = id;


    setText(
        "videoEditName",
        item.title
    );


    setText(
        "videoEditMeta",
        `${item.type} • ${item.duration}`
    );


    const title =
        document.getElementById("videoEditTitle");


    const description =
        document.getElementById("videoEditDescription");


    const genre =
        document.getElementById("videoEditGenre");


    const visibility =
        document.getElementById("videoEditVisibility");


    const comments =
        document.getElementById("videoEditComments");


    if (title) {

        title.value =
            item.title || "";

    }


    if (description) {

        description.value =
            item.description || "";

    }


    if (genre) {

        const matchingOption =
            [...genre.options].find(function (option) {

                return option.text === item.genre;

            });


        if (matchingOption) {

            genre.value =
                matchingOption.value;

        }

        else {

            genre.value =
                genre.options[0]?.value || "";

        }

    }


    if (visibility) {

        visibility.value =
            item.status === "private"
                ? "Private"
                : "Public";

    }


    if (comments) {

        comments.checked =
            item.comments !== false;

    }


    const overlay =
        document.getElementById("videoEditOverlay");


    if (overlay) {

        overlay.classList.add("open");

    }

}


/* =========================================================
   12. SAVE VIDEO EDIT
   ========================================================= */

function saveVideoEdit() {

    const item =
        items.find(function (entry) {

            return entry.id === editingVideoId;

        });


    if (!item) {
        return;
    }


    const title =
        document.getElementById("videoEditTitle");


    const description =
        document.getElementById("videoEditDescription");


    const genre =
        document.getElementById("videoEditGenre");


    const visibility =
        document.getElementById("videoEditVisibility");


    const comments =
        document.getElementById("videoEditComments");


    const newTitle =
        title ? title.value.trim() : "";


    if (!newTitle) {

        toast("Enter a video title.");

        return;

    }


    item.title =
        newTitle;


    item.description =
        description
            ? description.value.trim()
            : "";


    item.genre =
        genre
            ? genre.options[genre.selectedIndex]?.text || genre.value
            : item.genre;


    item.comments =
        comments
            ? comments.checked
            : true;


    /* -------------------------
       VISIBILITY
       ------------------------- */

    if (
        visibility &&
        visibility.value === "Private"
    ) {

        item.status = "private";

        item.schedule = "Private";

        item.release = null;

    }

    else {

        /*
           If it was already published,
           keep it published.

           If it was private and the creator
           changes visibility to Public,
           make it published.
        */

        if (
            item.status === "private" ||
            item.status === "published"
        ) {

            item.status = "published";

            item.schedule = "Published";

        }

    }


    closeModal("videoEditOverlay");


    render();


    toast(
        "Video changes saved successfully."
    );

}


/* =========================================================
   13. EDIT SCHEDULE
   ========================================================= */

function editSchedule(id) {

    const item =
        items.find(function (entry) {

            return entry.id === id;

        });


    if (!item) {
        return;
    }


    editingId = id;


    setText(
        "editTitle",
        item.title
    );


    const dateInput =
        document.getElementById("editDate");


    const timeInput =
        document.getElementById("editTime");


    const visibility =
        document.getElementById("editVisibility");


    const date =
        item.release || new Date();


    if (dateInput) {

        dateInput.value =
            date.toISOString().slice(0, 10);

    }


    if (timeInput) {

        timeInput.value =
            date.toTimeString().slice(0, 5);

    }


    if (visibility) {

        visibility.value =
            "Public";

    }


    const overlay =
        document.getElementById("editOverlay");


    if (overlay) {

        overlay.classList.add("open");

    }

}


/* =========================================================
   14. SAVE SCHEDULE
   ========================================================= */

function saveSchedule() {

    const item =
        items.find(function (entry) {

            return entry.id === editingId;

        });


    if (!item) {
        return;
    }


    const date =
        document.getElementById("editDate")?.value;


    const time =
        document.getElementById("editTime")?.value;


    if (!date || !time) {

        toast(
            "Choose a release date and time."
        );

        return;

    }


    const release =
        new Date(`${date}T${time}`);


    if (
        Number.isNaN(
            release.getTime()
        )
    ) {

        toast(
            "Invalid release date or time."
        );

        return;

    }


    if (release <= new Date()) {

        toast(
            "Release time must be in the future."
        );

        return;

    }


    item.release =
        release;


    item.status =
        "scheduled";


    item.schedule =
        "Scheduled release";


    closeModal("editOverlay");


    render();


    toast(
        "Schedule updated successfully."
    );

}


/* =========================================================
   15. CONFIRM ACTION
   ========================================================= */

function askAction(action, id) {

    const item =
        items.find(function (entry) {

            return entry.id === id;

        });


    if (!item) {
        return;
    }


    pendingAction = {

        action: action,

        id: id

    };


    const messages = {

        publish:
            `Publish “${item.title}” immediately? It will become public now.`,

        cancel:
            `Cancel the schedule for “${item.title}”? The content will remain available as a draft.`,

        delete:
            `Delete “${item.title}”? This removes it from your current content list.`

    };


    const title =
        document.getElementById("confirmTitle");


    const text =
        document.getElementById("confirmText");


    const button =
        document.getElementById("confirmBtn");


    if (title) {

        title.textContent =

            action === "delete"
                ? "Delete Content"
                : action === "publish"
                    ? "Publish Now"
                    : "Cancel Schedule";

    }


    if (text) {

        text.textContent =
            messages[action];

    }


    if (button) {

        button.textContent =

            action === "delete"
                ? "Delete"
                : action === "publish"
                    ? "Publish Now"
                    : "Cancel Schedule";

    }


    const overlay =
        document.getElementById("confirmOverlay");


    if (overlay) {

        overlay.classList.add("open");

    }

}


/* =========================================================
   16. EXECUTE CONFIRMED ACTION
   ========================================================= */

function executePendingAction() {

    if (!pendingAction) {
        return;
    }


    const action =
        pendingAction.action;


    const id =
        pendingAction.id;


    const item =
        items.find(function (entry) {

            return entry.id === id;

        });


    if (!item) {

        closeModal("confirmOverlay");

        return;

    }


    /* -------------------------
       PUBLISH NOW
       ------------------------- */

    if (action === "publish") {

        item.status =
            "published";

        item.schedule =
            "Published";

        item.release =
            new Date();


        toast(
            "Content published successfully."
        );

    }


    /* -------------------------
       CANCEL SCHEDULE
       ------------------------- */

    else if (action === "cancel") {

        item.status =
            "draft";

        item.schedule =
            "Not scheduled";

        item.release =
            null;


        toast(
            "Schedule cancelled. Content saved as a draft."
        );

    }


    /* -------------------------
       DELETE
       ------------------------- */

    else if (action === "delete") {

        items =
            items.filter(function (entry) {

                return entry.id !== id;

            });


        toast(
            "Content deleted."
        );

    }


    pendingAction = null;


    closeModal("confirmOverlay");


    render();

}


/* =========================================================
   17. VIEW VIDEO
   ========================================================= */

function viewVideo(id) {

    const item =
        items.find(function (entry) {

            return entry.id === id;

        });


    if (!item) {
        return;
    }


    toast(
        `Opening “${item.title}”…`
    );

}


/* =========================================================
   18. SCHEDULE DRAFT
   ========================================================= */

function scheduleDraft(id) {

    const item =
        items.find(function (entry) {

            return entry.id === id;

        });


    if (!item) {
        return;
    }


    editingId = id;


    setText(
        "editTitle",
        item.title
    );


    const dateInput =
        document.getElementById("editDate");


    const timeInput =
        document.getElementById("editTime");


    const tomorrow =
        new Date();


    tomorrow.setDate(
        tomorrow.getDate() + 1
    );


    tomorrow.setSeconds(0);

    tomorrow.setMilliseconds(0);


    if (dateInput) {

        dateInput.value =
            tomorrow.toISOString().slice(0, 10);

    }


    if (timeInput) {

        timeInput.value =
            "19:00";

    }


    const visibility =
        document.getElementById("editVisibility");


    if (visibility) {

        visibility.value =
            "Public";

    }


    const overlay =
        document.getElementById("editOverlay");


    if (overlay) {

        overlay.classList.add("open");

    }

}


/* =========================================================
   19. PRIVATE → SCHEDULED
   ========================================================= */

function makeScheduled(id) {

    scheduleDraft(id);

}


/* =========================================================
   20. PROCESSING DETAILS
   ========================================================= */

function processingDetails(id) {

    const item =
        items.find(function (entry) {

            return entry.id === id;

        });


    if (!item) {
        return;
    }


    toast(
        `Processing details for “${item.title}”…`
    );

}


/* =========================================================
   21. RETRY FAILED UPLOAD
   ========================================================= */

function retryUpload(id) {

    const item =
        items.find(function (entry) {

            return entry.id === id;

        });


    if (!item) {
        return;
    }


    item.status =
        "processing";


    item.schedule =
        "Processing";


    render();


    toast(
        "Upload retry started."
    );

}


/* =========================================================
   22. CLOSE MODAL
   ========================================================= */

function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.remove("open");

    }

}


/* =========================================================
   23. TOAST
   ========================================================= */

function toast(message) {

    const toastElement =
        document.getElementById("toast");


    if (!toastElement) {
        return;
    }


    toastElement.textContent =
        message;


    toastElement.classList.add("show");


    clearTimeout(
        window.__nettoonToast
    );


    window.__nettoonToast =
        setTimeout(function () {

            toastElement.classList.remove("show");

        }, 2800);

}


/* =========================================================
   24. UPLOAD BUTTON
   ========================================================= */

function goUpload() {

    /*
       Your HTML currently uses this button
       to open the upload workflow.

       When your actual upload page is ready,
       this can simply become:

       window.location.href = "index5.html";

       For now we preserve the current behavior.
    */

    toast(
        "Opening Upload Content…"
    );

}


/* =========================================================
   25. CONTENT TABS
   ========================================================= */

document.querySelectorAll(".tab").forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".tab")
                    .forEach(function (tab) {

                        tab.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                currentFilter =
                    this.dataset.filter;


                render();

            }
        );

    }
);


/* =========================================================
   26. SEARCH
   ========================================================= */

const searchInput =
    document.getElementById("search");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            render();

        }
    );

}


/* =========================================================
   27. SORT
   ========================================================= */

const sortSelect =
    document.getElementById("sort");


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function () {

            render();

        }
    );

}


/* =========================================================
   28. CONTENT TYPE TABS
   ========================================================= */

document.querySelectorAll(".type-tab").forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".type-tab")
                    .forEach(function (tab) {

                        tab.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                currentType =
                    this.dataset.type;


                render();

            }
        );

    }
);


/* =========================================================
   29. OVERLAY CLICK TO CLOSE
   ========================================================= */

document.querySelectorAll(".overlay").forEach(
    function (overlay) {

        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {

                    overlay.classList.remove(
                        "open"
                    );

                }

            }
        );

    }
);


/* =========================================================
   30. CONFIRM BUTTON
   ========================================================= */

const confirmButton =
    document.getElementById("confirmBtn");


if (confirmButton) {

    confirmButton.addEventListener(
        "click",
        executePendingAction
    );

}


/* =========================================================
   31. CREATOR STUDIO VIEW SYSTEM
   =========================================================

   Dashboard and Content are separate views.

   Clicking Dashboard:
       Dashboard visible
       Content hidden

   Clicking Content:
       Content visible
       Dashboard hidden

   The same architecture can later be connected
   to real Next.js routes.
   ========================================================= */

const studioViews = {

    dashboard:
        document.getElementById(
            "dashboardView"
        ),

    content:
        document.getElementById(
            "contentView"
        ),

    upload:
        document.getElementById(
            "uploadView"
        ),

    analytics:
        document.getElementById(
            "analyticsView"
        ),

    comments:
        document.getElementById(
            "commentsView"
        ),

    earnings:
        document.getElementById(
            "earningsView"
        ),

    settings:
        document.getElementById(
            "settingsView"
        ),

    help:
        document.getElementById(
            "helpView"
        )

};


/* =========================================================
   32. SHOW STUDIO VIEW
   ========================================================= */

function showStudioView(
    viewName,
    updateHash = true
) {

    const target =
        studioViews[viewName]
            ? viewName
            : "content";


    Object.entries(
        studioViews
    ).forEach(
        function ([name, element]) {

            if (element) {

                element.classList.toggle(
                    "active-view",
                    name === target
                );

            }

        }
    );


    /* -------------------------
       SIDEBAR ACTIVE STATE
       ------------------------- */

    document
        .querySelectorAll(
            ".nav a[data-view]"
        )
        .forEach(
            function (link) {

                link.classList.toggle(

                    "active",

                    link.dataset.view ===
                    target

                );

            }
        );


    /* -------------------------
       UPDATE URL HASH
       ------------------------- */

    if (updateHash) {

        history.replaceState(
            null,
            "",
            "#" + target
        );

    }


    /* -------------------------
       SCROLL TO TOP
       ------------------------- */

    window.scrollTo({

        top: 0,

        behavior: "instant"

    });


    /* -------------------------
       REFRESH CONTENT
       ------------------------- */

    if (
        target === "content"
    ) {

        render();

    }

}


/* =========================================================
   33. SIDEBAR NAVIGATION
   ========================================================= */

document
    .querySelectorAll(
        ".nav a[data-view]"
    )
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    showStudioView(
                        this.dataset.view
                    );

                }
            );

        }
    );


/* =========================================================
   34. INITIAL VIEW
   ========================================================= */

const initialView =
    location.hash
        .replace("#", "")
        .toLowerCase();


showStudioView(

    studioViews[initialView]
        ? initialView
        : "content",

    false

);


/* =========================================================
   35. HASH CHANGE
   ========================================================= */

window.addEventListener(
    "hashchange",
    function () {

        const requested =
            location.hash
                .replace("#", "")
                .toLowerCase();


        showStudioView(

            studioViews[requested]
                ? requested
                : "content",

            false

        );

    }
);


/* =========================================================
   36. INITIAL RENDER
   ========================================================= */

render();