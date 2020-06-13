class Task {
    constructor(title, desc, date, time, id) {
        this.title = title;
        this.description = desc;
        this.date = date;
        this.time = time;
        this.id = id;
    }
}

var arrData = [];

document.addEventListener("DOMContentLoaded", init);

function init(){
    if(localStorage.getItem("tasks") !== null){
        arrData = JSON.parse(localStorage.getItem("tasks"));
        for(item of arrData) {
            createNote(item);
        }
    }
    document.getElementById("submitBtn").addEventListener("click", submitBtn);
    document.getElementById("clearBtn").addEventListener("click", clearfields);
}

function deleteNote(event){
    var xId = event.target.getAttribute("id");
    for(task of arrData) {
        if(task.id === parseInt(xId)) {
            arrData.splice(arrData.indexOf(task), 1);
            break;
        }
    }
    event.target.parentNode.remove();
    updateLocalStorage();
}

function updateLocalStorage() {
    if(localStorage.getItem("tasks") !== null){
        localStorage.removeItem("tasks");
    }
    if(arrData.length > 0) {
        localStorage.setItem("tasks", JSON.stringify(arrData));
    }
}

function submitBtn(event){

    //Get input of data
    var taskName = document.querySelector("#task").value;
    var newDesc = document.querySelector("#description").value;
    var newDate = document.querySelector("#date").value;
    var newHour = document.querySelector("#hour").value;
    var newId;

    if(!taskName || !newDesc || !newDate) {
        alert("You have not entered the data to the required fields.");
    } else if(!checkDate(newDate)){
        alert("The date you enetred has already passed. Please enter a valid date.");
    } else {
        switch (arrData.length){
            case 0:
                newId = 0;
                break;
            default:
                // newId = last task.id + 1 (if the last one is 8, the next will be 9 etc).
                var newId = arrData[arrData.length - 1].id + 1;
        }    
        
        //Store data in new task
        newTask = new Task(taskName, newDesc, newDate, newHour, newId);
        //Add task to data
        arrData.push(newTask);
        createNote(newTask);
        updateLocalStorage();
        clearfields();
    }
}

function clearfields(){

    document.querySelector("#task").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#hour").value = "";
}

function createNote(task) {

    //Create note
    var newNote = document.createElement("DIV");
    newNote.classList.add("note");
    document.body.appendChild(newNote);

    //Add task title
    var title = document.createElement("DIV");
    title.classList.add("title");
    title.appendChild(document.createTextNode(task.title));
    newNote.appendChild(title);
    
    // Add task description
    var text = document.createElement("DIV");
    text.classList.add("text");
    text.appendChild(document.createTextNode(task.description));
    newNote.appendChild(text);
    
    // Add date and accurate time
    var time = document.createElement("DIV");
    time.classList.add("time");
    time.appendChild(document.createTextNode(task.date));
    time.appendChild(document.createElement("BR"));
    time.appendChild(document.createTextNode(task.time));
    newNote.appendChild(time);
    
    // Create x
    var x = document.createElement("img");
    x.classList.add("x");
    newNote.appendChild(x);
    x.src = "x.png";
    x.setAttribute("ID", task.id);
    x.addEventListener("click",deleteNote);

    newNote.classList.add("fade-in");
}


function checkDate(date){
    var now = new Date();
    date = Date.parse(date);
    if (date < now) {
        return false;
    } else {
        return true;
}};