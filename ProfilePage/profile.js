// Display username
document.getElementById("username").textContent = localStorage.getItem("username") || "Student";

// Fetch saved timetables
const timetables = JSON.parse(localStorage.getItem("timetables")) || [];
const container = document.getElementById("timetableContainer");

function renderTimetables() {
    container.innerHTML = "";
    timetables.forEach((tt, index) => {
        const card = document.createElement("div");
        card.classList.add("timetable-card");
        card.innerHTML = `
            <h3>${tt.name}</h3>
            <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i> Edit</button>
            <button class="delete-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Delete</button>
            <button class="export-btn" data-index="${index}"><i class="fas fa-file-pdf"></i> Export</button>
        `;
        container.appendChild(card);
    });
}

renderTimetables();

// Button Actions
container.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if(e.target.closest(".edit-btn")){
        const timetableToEdit = timetables[index];
        localStorage.setItem("currentEditingTimetable", JSON.stringify(timetableToEdit));
        window.location.href = "../StudyPage/builder.html";
    }
    if(e.target.closest(".delete-btn")){
        if(confirm("Are you sure you want to delete this timetable?")){
            timetables.splice(index,1);
            localStorage.setItem("timetables", JSON.stringify(timetables));
            renderTimetables();
        }
    }
    if(e.target.closest(".export-btn")){
        alert(`Export timetable #${index}`); // Replace with export/print logic
    }
});
