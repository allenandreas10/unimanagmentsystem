document.addEventListener("DOMContentLoaded", () => {
    const timetableGrid = document.getElementById("timetable-grid");
    const moduleForm = document.getElementById("module-form");

    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const cancelEditBtn = document.getElementById("cancelEdit");
    const deleteBtn = document.getElementById("deleteModule");

    const editName = document.getElementById("editName");
    const editDay = document.getElementById("editDay");
    const editStart = document.getElementById("editStart");
    const editEnd = document.getElementById("editEnd");

    let currentModule = null;

    const startHour = 8;
    const endHour = 17;
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    const rowHeight = 60;

    // Build grid
    for(let hour=startHour; hour<endHour; hour++){
        const timeLabel = document.createElement("div");
        timeLabel.classList.add("grid-cell","time-col");
        timeLabel.textContent = `${hour}:00`;
        timetableGrid.appendChild(timeLabel);

        for(let d=0; d<days.length; d++){
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.dataset.day = days[d];
            cell.dataset.hour = hour;
            timetableGrid.appendChild(cell);
        }
    }

    // Add module
    moduleForm.addEventListener("submit", e=>{
        e.preventDefault();
        const name = document.getElementById("moduleName").value.trim();
        const time = document.getElementById("moduleTime").value.trim();
        const day = document.getElementById("moduleDay").value;
        if(!name || !time || !day) return alert("Fill all fields.");

        const parts = time.split("-");
        const startH = parseInt(parts[0].split(":")[0]);
        const endH = parseInt(parts[1].split(":")[0]);

        const cell = [...document.querySelectorAll(".grid-cell")]
            .find(c=>c.dataset.day===day && parseInt(c.dataset.hour)===startH);
        if(!cell) return;

        const moduleDiv = createModuleElement(name, startH, endH);
        moduleDiv.style.height = `${(endH-startH)*rowHeight-10}px`;
        cell.appendChild(moduleDiv);

        // Mark occupied cells for conflict
        for(let h=startH; h<endH; h++){
            const c = [...document.querySelectorAll(".grid-cell")]
                .find(c=>c.dataset.day===day && parseInt(c.dataset.hour)===h);
            if(c) c.dataset.occupied="true";
        }

        if(checkConflict(day, startH, endH)){
            alert("⚠️ Conflict detected!");
        }

        saveTimetable();
        moduleForm.reset();
    });

    function createModuleElement(name,start,end){
        const div = document.createElement("div");
        div.classList.add("module");
        div.textContent=name;
        div.draggable=true;

        div.addEventListener("dragstart",()=>div.classList.add("dragging"));
        div.addEventListener("dragend",()=>div.classList.remove("dragging"));
        div.addEventListener("click", ()=>{
            currentModule=div;
            const parent = div.closest(".grid-cell");
            editName.value = div.textContent;
            editDay.value = parent.dataset.day;
            editStart.value = parent.dataset.hour;
            editEnd.value = parseInt(parent.dataset.hour)+Math.round(parseInt(div.style.height)/rowHeight);
            editModal.classList.remove("hidden");
        });
        return div;
    }

    // Edit module
    editForm.addEventListener("submit", e=>{
        e.preventDefault();
        if(!currentModule) return;
        const name = editName.value.trim();
        const day = editDay.value;
        const startH = parseInt(editStart.value);
        const endH = parseInt(editEnd.value);
        if(!name) return alert("Module name cannot be empty.");

        const cell = [...document.querySelectorAll(".grid-cell")]
            .find(c=>c.dataset.day===day && parseInt(c.dataset.hour)===startH);
        if(!cell) return;
        currentModule.textContent = name;
        currentModule.style.height = `${(endH-startH)*rowHeight-10}px`;
        cell.appendChild(currentModule);

        if(checkConflict(day, startH, endH)) alert("⚠️ Conflict detected!");
        saveTimetable();
        closeModal();
    });

    cancelEditBtn.addEventListener("click", closeModal);

    deleteBtn.addEventListener("click", ()=>{
        if(!currentModule) return;
        if(confirm("Delete this module?")){
            currentModule.remove();
            saveTimetable();
            closeModal();
        }
    });

    function closeModal(){ editModal.classList.add("hidden"); currentModule=null; }

    // Conflict detection
    function checkConflict(day,start,end){
        let conflict=false;
        for(let h=start; h<end; h++){
            const cell = [...document.querySelectorAll(".grid-cell")]
                .find(c=>c.dataset.day===day && parseInt(c.dataset.hour)===h);
            if(!cell) continue;
            const modules = cell.querySelectorAll(".module");
            if(modules.length>1){
                modules.forEach(m=>m.closest(".grid-cell").classList.add("conflict"));
                conflict=true;
            }else cell.classList.remove("conflict");
        }
        return conflict;
    }

    // LocalStorage
    function saveTimetable(){
        const data=[];
        document.querySelectorAll(".module").forEach(m=>{
            const parent = m.closest(".grid-cell");
            const height = parseInt(m.style.height) || rowHeight;
            data.push({
                name:m.textContent,
                day:parent.dataset.day,
                start:parseInt(parent.dataset.hour),
                end:parseInt(parent.dataset.hour)+Math.round(height/rowHeight)
            });
        });
        localStorage.setItem("timetableData", JSON.stringify(data));
    }

    function loadTimetable(){
        const data=JSON.parse(localStorage.getItem("timetableData")||"[]");
        data.forEach(item=>{
            const cell = [...document.querySelectorAll(".grid-cell")]
                .find(c=>c.dataset.day===item.day && parseInt(c.dataset.hour)===item.start);
            if(cell){
                const div=createModuleElement(item.name, item.start, item.end);
                div.style.height = `${(item.end-item.start)*rowHeight-10}px`;
                cell.appendChild(div);
                checkConflict(item.day,item.start,item.end);
            }
        });
    }

    loadTimetable();

    // Print
    document.getElementById("printBuilderBtn").addEventListener("click", ()=>{
        const data=JSON.parse(localStorage.getItem("timetableData")||"[]");
        const printWindow = window.open("","PRINT","height=600,width=800");
        printWindow.document.write("<html><head><title>Timetable</title>");
        printWindow.document.write("<style>table{border-collapse:collapse;width:100%;}th,td{border:1px solid #333;padding:8px;text-align:center;}th{background:#0d6efd;color:white;} .conflict{background:#ffcccc;}</style>");
        printWindow.document.write("</head><body>");
        printWindow.document.write("<h2>Timetable</h2><table><thead><tr><th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr></thead><tbody>");
        for(let h=startHour; h<endHour; h++){
            printWindow.document.write("<tr>");
            printWindow.document.write(`<td>${h}:00</td>`);
            days.forEach(day=>{
                const mod=data.find(m=>m.day===day && m.start<=h && m.end>h);
                const conflict=data.filter(m=>m.day===day && m.start<=h && m.end>h).length>1;
                printWindow.document.write(`<td class="${conflict?'conflict':''}">${mod?mod.name:""}</td>`);
            });
            printWindow.document.write("</tr>");
        }
        printWindow.document.write("</tbody></table></body></html>");
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    });
});
