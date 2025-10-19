// builder.js

document.addEventListener("DOMContentLoaded", () => {
    const timetableGrid = document.getElementById("timetable-grid");
    const moduleForm = document.getElementById("module-form");

    // Create timetable grid dynamically (8AM–5PM)
    const startHour = 8;
    const endHour = 17;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    for (let hour = startHour; hour < endHour; hour++) {
        // Time column
        const timeLabel = document.createElement("div");
        timeLabel.classList.add("grid-cell", "time-col");
        timeLabel.textContent = `${hour}:00`;
        timetableGrid.appendChild(timeLabel);

        // Each day cell
        for (let d = 0; d < days.length; d++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.dataset.day = days[d];
            cell.dataset.hour = hour;
            timetableGrid.appendChild(cell);
        }
    }

    // Add new module
    moduleForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("moduleName").value.trim();
        const time = document.getElementById("moduleTime").value.trim();
        const day = document.getElementById("moduleDay").value;

        if (!name || !time || !day) return alert("Please fill all fields.");

        // Extract starting hour from time input (e.g., 09:00-10:00 → 9)
        const startHour = parseInt(time.split(":")[0]);

        const targetCell = [...document.querySelectorAll(".grid-cell")].find(
            (c) => c.dataset.day === day && parseInt(c.dataset.hour) === startHour
        );

        if (targetCell) {
            const moduleDiv = createModuleElement(name);
            targetCell.appendChild(moduleDiv);
            saveTimetable();
        }

        moduleForm.reset();
    });

    // Create draggable module element
    function createModuleElement(name) {
        const moduleDiv = document.createElement("div");
        moduleDiv.classList.add("module");
        moduleDiv.textContent = name;
        moduleDiv.draggable = true;

        moduleDiv.addEventListener("dragstart", handleDragStart);
        moduleDiv.addEventListener("dragend", handleDragEnd);
        return moduleDiv;
    }

    // Drag events for cells
    timetableGrid.addEventListener("dragover", (e) => e.preventDefault());
    timetableGrid.addEventListener("dragenter", (e) => {
        if (e.target.classList.contains("grid-cell")) {
            e.target.classList.add("drag-over");
        }
    });
    timetableGrid.addEventListener("dragleave", (e) => {
        if (e.target.classList.contains("grid-cell")) {
            e.target.classList.remove("drag-over");
        }
    });
    timetableGrid.addEventListener("drop", (e) => {
        if (e.target.classList.contains("grid-cell")) {
            e.preventDefault();
            const dragged = document.querySelector(".dragging");
            e.target.classList.remove("drag-over");
            if (dragged) e.target.appendChild(dragged);
            saveTimetable();
        }
    });

    // Handle drag start and end
    function handleDragStart(e) {
        this.classList.add("dragging");
    }
    function handleDragEnd(e) {
        this.classList.remove("dragging");
    }

    // Save timetable to localStorage
    function saveTimetable() {
        const data = [];
        document.querySelectorAll(".module").forEach((mod) => {
            const parent = mod.closest(".grid-cell");
            data.push({
                name: mod.textContent,
                day: parent.dataset.day,
                hour: parent.dataset.hour,
            });
        });
        localStorage.setItem("timetableData", JSON.stringify(data));
    }

    // Load timetable from localStorage
    function loadTimetable() {
        const data = JSON.parse(localStorage.getItem("timetableData") || "[]");
        data.forEach((item) => {
            const cell = [...document.querySelectorAll(".grid-cell")].find(
                (c) => c.dataset.day === item.day && parseInt(c.dataset.hour) === parseInt(item.hour)
            );
            if (cell) {
                const moduleDiv = createModuleElement(item.name);
                cell.appendChild(moduleDiv);
            }
        });
    }

    loadTimetable();
});
