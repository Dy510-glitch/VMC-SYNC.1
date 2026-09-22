```javascript
/* =========================================
   VMC SYNC ADMIN FUNCTIONS
========================================= */


/* ================= HELPER ================= */

function getAdminData(key) {

    const data =
        localStorage.getItem(key);

    if (!data) return [];

    try {

        return JSON.parse(data);

    } catch {

        return [];

    }

}


function saveAdminData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


/* ================= ANNOUNCEMENT ================= */

function addAnnouncement() {

    const title =
        document.getElementById(
            "announcementTitle"
        ).value.trim();


    const content =
        document.getElementById(
            "announcementContent"
        ).value.trim();


    const date =
        document.getElementById(
            "announcementDate"
        ).value.trim();


    if (!title || !content) {

        alert(
            "Please enter the announcement title and details."
        );

        return;

    }


    const announcements =
        getAdminData(
            "vmcAnnouncements"
        );


    announcements.unshift({

        title: title,

        content: content,

        date: date || "Recently"

    });


    saveAdminData(
        "vmcAnnouncements",
        announcements
    );


    document.getElementById(
        "announcementTitle"
    ).value = "";


    document.getElementById(
        "announcementContent"
    ).value = "";


    document.getElementById(
        "announcementDate"
    ).value = "";


    refreshAdminData();


    alert(
        "Announcement published successfully!"
    );

}


/* ================= ASSIGNMENT ================= */

function addAssignment() {

    const subject =
        document.getElementById(
            "assignmentSubject"
        ).value.trim();


    const title =
        document.getElementById(
            "assignmentTitle"
        ).value.trim();


    const description =
        document.getElementById(
            "assignmentDescription"
        ).value.trim();


    const dueDate =
        document.getElementById(
            "assignmentDueDate"
        ).value;


    if (!subject || !title || !description) {

        alert(
            "Please complete the assignment information."
        );

        return;

    }


    const assignments =
        getAdminData(
            "vmcAssignments"
        );


    assignments.unshift({

        subject: subject,

        title: title,

        description: description,

        dueDate:
            dueDate || "To be announced"

    });


    saveAdminData(
        "vmcAssignments",
        assignments
    );


    document.getElementById(
        "assignmentSubject"
    ).value = "";


    document.getElementById(
        "assignmentTitle"
    ).value = "";


    document.getElementById(
        "assignmentDescription"
    ).value = "";


    document.getElementById(
        "assignmentDueDate"
    ).value = "";


    refreshAdminData();


    alert(
        "Assignment added successfully!"
    );

}


/* ================= LOST FOUND ================= */

function addLostFound() {

    const item =
        document.getElementById(
            "lostItem"
        ).value.trim();


    const description =
        document.getElementById(
            "lostDescription"
        ).value.trim();


    const location =
        document.getElementById(
            "lostLocation"
        ).value.trim();


    const status =
        document.getElementById(
            "lostStatus"
        ).value;


    if (!item || !description || !location) {

        alert(
            "Please complete all Lost & Found fields."
        );

        return;

    }


    const items =
        getAdminData(
            "vmcLostFound"
        );


    items.unshift({

        item: item,

        description: description,

        location: location,

        status: status

    });


    saveAdminData(
        "vmcLostFound",
        items
    );


    document.getElementById(
        "lostItem"
    ).value = "";


    document.getElementById(
        "lostDescription"
    ).value = "";


    document.getElementById(
        "lostLocation"
    ).value = "";


    refreshAdminData();


    alert(
        "Lost & Found record added!"
    );

}


/* ================= DELETE ANNOUNCEMENT ================= */

function deleteAnnouncement(index) {

    const data =
        getAdminData(
            "vmcAnnouncements"
        );


    data.splice(index, 1);


    saveAdminData(
        "vmcAnnouncements",
        data
    );


    refreshAdminData();

}


/* ================= DELETE ASSIGNMENT ================= */

function deleteAssignment(index) {

    const data =
        getAdminData(
            "vmcAssignments"
        );


    data.splice(index, 1);


    saveAdminData(
        "vmcAssignments",
        data
    );


    refreshAdminData();

}


/* ================= DELETE LOST FOUND ================= */

function deleteLostFound(index) {

    const data =
        getAdminData(
            "vmcLostFound"
        );


    data.splice(index, 1);


    saveAdminData(
        "vmcLostFound",
        data
    );


    refreshAdminData();

}


/* ================= DISPLAY ADMIN DATA ================= */

function refreshAdminData() {

    displayAnnouncements();

    displayAssignments();

    displayLostFound();

}


/* ================= DISPLAY ANNOUNCEMENTS ================= */

function displayAnnouncements() {

    const container =
        document.getElementById(
            "adminAnnouncements"
        );


    const data =
        getAdminData(
            "vmcAnnouncements"
        );


    container.innerHTML = "";


    if (data.length === 0) {

        container.innerHTML =
            "<p>No announcements yet.</p>";

        return;

    }


    data.forEach((item, index) => {

        container.innerHTML += `

            <div class="data-item">

                <h3>
                    ${escapeHTML(item.title)}
                </h3>

                <p>
                    ${escapeHTML(item.content)}
                </p>

                <small>
                    ${escapeHTML(item.date)}
                </small>

                <br><br>

                <button
                    class="danger-btn"
                    onclick="deleteAnnouncement(${index})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


/* ================= DISPLAY ASSIGNMENTS ================= */

function displayAssignments() {

    const container =
        document.getElementById(
            "adminAssignments"
        );


    const data =
        getAdminData(
            "vmcAssignments"
        );


    container.innerHTML = "";


    if (data.length === 0) {

        container.innerHTML =
            "<p>No assignments yet.</p>";

        return;

    }


    data.forEach((item, index) => {

        container.innerHTML += `

            <div class="data-item">

                <strong>
                    ${escapeHTML(item.subject)}
                </strong>

                <h3>
                    ${escapeHTML(item.title)}
                </h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <small>
                    Due:
                    ${escapeHTML(item.dueDate)}
                </small>

                <br><br>

                <button
                    class="danger-btn"
                    onclick="deleteAssignment(${index})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


/* ================= DISPLAY LOST FOUND ================= */

function displayLostFound() {

    const container =
        document.getElementById(
            "adminLostFound"
        );


    const data =
        getAdminData(
            "vmcLostFound"
        );


    container.innerHTML = "";


    if (data.length === 0) {

        container.innerHTML =
            "<p>No Lost & Found records yet.</p>";

        return;

    }


    data.forEach((item, index) => {

        container.innerHTML += `

            <div class="data-item">

                <strong>
                    ${escapeHTML(item.status)}
                </strong>

                <h3>
                    ${escapeHTML(item.item)}
                </h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <small>
                    📍
                    ${escapeHTML(item.location)}
                </small>

                <br><br>

                <button
                    class="danger-btn"
                    onclick="deleteLostFound(${index})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


/* ================= CLEAR ALL ================= */

function clearAllData() {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete ALL VMC Sync data?"
        );


    if (!confirmDelete) return;


    localStorage.removeItem(
        "vmcAnnouncements"
    );

    localStorage.removeItem(
        "vmcAssignments"
    );

    localStorage.removeItem(
        "vmcLostFound"
    );


    refreshAdminData();


    alert(
        "All data has been cleared."
    );

}


/* ================= SECURITY ================= */

function escapeHTML(value) {

    if (!value) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        refreshAdminData();

    }
);
```
