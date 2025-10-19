// Example timetable data from localStorage
const timetables = JSON.parse(localStorage.getItem("timetables")) || [];
const timetableBody = document.getElementById("timetableBody");

// Render timetable (just using first saved timetable as example)
if(timetables.length > 0){
    const tt = timetables[0];
    // Suppose tt.modules = [{name:'Math', day:'Monday', hour:8}, ...]
    const hours = [...Array(10).keys()].map(i => i+8); // 08:00-17:00

    hours.forEach(hour => {
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        timeCell.textContent = hour + ":00";
        row.appendChild(timeCell);

        ["Monday","Tuesday","Wednesday","Thursday","Friday"].forEach(day=>{
            const cell = document.createElement("td");
            const module = tt.modules.find(m=>m.day===day && m.hour===hour);
            if(module) cell.textContent = module.name;
            row.appendChild(cell);
        });

        timetableBody.appendChild(row);
    });
} else {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No timetable found.";
    row.appendChild(cell);
    timetableBody.appendChild(row);
}

// Print button
document.getElementById("printBtn").addEventListener("click", () => {
    window.print();
});
