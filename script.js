/* =========================================
   VMC SYNC STUDENT FUNCTIONS
========================================= */


/* ================= NAVIGATION ================= */

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(".page-section");

    sections.forEach(section => {

        section.classList.add("hidden");

    });


    const selected =
        document.getElementById(sectionName);

    if (selected) {

        selected.classList.remove("hidden");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= DEFAULT DATA ================= */

const defaultAnnouncements = [

    {
        title: "Welcome to VMC Sync",
        content:
            "Welcome to the official VMC Sync student community. Check this page regularly for announcements and campus updates.",
        date: "September 2026"
    }

];


const defaultAssignments = [

    {
        subject: "Example Subject",
        title: "Sample Assignment",
        description:
            "This is an example assignment. The administrator can add actual assignments through the Admin Interface.",
        dueDate: "To be announced"
    }

];


const defaultLostFound = [

    {
        item: "Sample Item",
        description:
            "No new lost and found report has been posted yet.",
        location: "VMC Campus",
        status: "Found"
    }

];


/* ================= LOAD DATA ================= */

function getData(key, defaults) {

    const stored =
        localStorage.getItem(key);

    if (stored) {

        try {

            return JSON.parse(stored);

        } catch (error) {

            console.log("Data error:", error);

        }

    }

    return defaults;
}


/* ================= ANNOUNCEMENTS ================= */

function loadAnnouncements() {

    const container =
        document.getElementById(
            "announcementContainer"
        );

    if (!container) return;


    const announcements =
        getData(
            "vmcAnnouncements",
            defaultAnnouncements
        );


    container.innerHTML = "";


    if (announcements.length === 0) {

        container.innerHTML = `
            <div class="announcement-card">
                <h3>No announcements yet.</h3>
                <p>Check back later for campus updates.</p>
            </div>
        `;

        return;
    }


    announcements.forEach(item => {

        container.innerHTML += `

            <article class="announcement-card">

                <div class="post-header">

                    <div class="admin-avatar">
                        V
                    </div>

                    <div>

                        <strong>
                            VMC Administration
                        </strong>

                        <small>
                            ${item.date || "Recently"}
                        </small>

                    </div>

                </div>


                <h3>
                    ${escapeHTML(item.title)}
                </h3>


                <p>
                    ${escapeHTML(item.content)}
                </p>


                <div class="post-footer">

                    📢 Campus Announcement

                </div>

            </article>

        `;

    });

}


/* ================= ASSIGNMENTS ================= */

function loadAssignments() {

    const container =
        document.getElementById(
            "assignmentContainer"
        );

    if (!container) return;


    const assignments =
        getData(
            "vmcAssignments",
            defaultAssignments
        );


    container.innerHTML = "";


    if (assignments.length === 0) {

        container.innerHTML = `
            <div class="assignment-card">
                <h3>No assignments posted.</h3>
                <p>Your assignment list is currently empty.</p>
            </div>
        `;

        return;
    }


    assignments.forEach(item => {

        container.innerHTML += `

            <article class="assignment-card">

                <span class="assignment-subject">

                    ${escapeHTML(item.subject)}

                </span>


                <h3>

                    ${escapeHTML(item.title)}

                </h3>


                <p>

                    ${escapeHTML(item.description)}

                </p>


                <div class="due-date">

                    📅 Due:
                    ${escapeHTML(item.dueDate)}

                </div>

            </article>

        `;

    });

}


/* ================= LOST & FOUND ================= */

function loadLostFound() {

    const container =
        document.getElementById(
            "lostFoundContainer"
        );

    if (!container) return;


    const items =
        getData(
            "vmcLostFound",
            defaultLostFound
        );


    container.innerHTML = "";


    if (items.length === 0) {

        container.innerHTML = `
            <div class="lost-card">
                <h3>No items currently listed.</h3>
            </div>
        `;

        return;
    }


    items.forEach(item => {

        const statusClass =
            item.status.toLowerCase() === "lost"
                ? "lost"
                : "found";


        container.innerHTML += `

            <article class="lost-card">

                <span class="status ${statusClass}">

                    ${escapeHTML(item.status)}

                </span>


                <h3>

                    ${escapeHTML(item.item)}

                </h3>


                <p>

                    ${escapeHTML(item.description)}

                </p>


                <div class="item-location">

                    📍 Location:
                    ${escapeHTML(item.location)}

                </div>

            </article>

        `;

    });

}


/* ================= SEARCH ================= */

function searchContent() {

    const input =
        document.getElementById(
            "searchInput"
        );

    const query =
        input.value.toLowerCase();


    const cards =
        document.querySelectorAll(
            ".announcement-card, .assignment-card, .lost-card"
        );


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();


        if (text.includes(query)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= SECURITY HELPER ================= */

function escapeHTML(value) {

    if (!value) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAnnouncements();

        loadAssignments();

        loadLostFound();

    }
);


/* ================= REAL-TIME TAB SYNC ================= */

window.addEventListener(
    "storage",
    function () {

        loadAnnouncements();

        loadAssignments();

        loadLostFound();

    }
);
```
