/* 
    Description of the requirements:
    -------------------------------
    Create assignment and store in localStorage
    Create teammember and store in localStorage
    List all assignments and memebers from localStorage
    Give a teammember an assignment and store the "case/request" in localStorage
    List all "cases/requests" from localStorage
    Use these:
    localStorage.setItem, -getItem
    querySelector, getElementById, createElement, append
    innerText, onsubmit events
*/

// Create teamMember after filling inputFields and clicking submit
document.querySelectorAll('.submit')[0].addEventListener('click', (Event) => {
    if(document.getElementsByName("teamMemberName")[0].value != ""){
        Event.preventDefault();
        createTeamMember();
        document.getElementsByName("teamMemberName")[0].value = "";
    }
});

// Create task after filling inputFields and clicking submit
document.querySelectorAll('.submit')[1].addEventListener('click', (Event) => {
    // PreventDefault: default-action of a sbumit-button on a form is to send the form and refresh the webpage, we don't want that now
    Event.preventDefault();
    if(document.getElementsByName("work")[0].value != ""){
        createTask();
        document.getElementsByName("work")[0].value = "";
    }
});

// Assign values afther choosing "member" to assign "task" to
document.querySelector('#assign-task-div').addEventListener('change', (Event) => {
    assignTaskToTeamMember(Event);
});

// Assign the created task to the created teamMember, list the assignment on the webpage and clear/reset the inputFields
document.querySelectorAll('.submit')[2].addEventListener('click', (Event) => {
    // PreventDefault: default-action of a sbumit-button on a form is to send the form and refresh the webpage, we don't want that now
    Event.preventDefault();
    if(document.querySelector('#members-option').value != "none" && document.querySelector('#task-option').value != "none"){
        assignTaskToTeamMember();    
        document.querySelector('#members-option').value = "none";
        document.querySelector('#task-option').value = "none";
    }
});


function createTeamMember() {
    var name;
    if(localStorage.getItem("members") == null){
        name = [document.querySelector('[name=teamMemberName]').value];
    }else{
        name = JSON.parse(localStorage.getItem("members"));
        name.push(document.querySelector('[name=teamMemberName]').value);
        localStorage.removeItem("members");
    }
    var nameString = JSON.stringify(name);
    localStorage.setItem("members", nameString);
    listTeamMembers(JSON.parse(localStorage.getItem('members')).length -1);

    
}

// Function that takes in the "registered task", check if it's already registered (the same way as teamMember) and list the tasks
// The memberdetails and task-details gets fetched and stored into "<option></option>"-elements inside their respective "<datalist></datalist>"-element
// That makes it possible to choose a member and what task that member should be assigned to
function createTask() {

    var name;
    if(localStorage.getItem("task") == null){
        name = [document.querySelector('[name=work]').value];
    }else{
        name = JSON.parse(localStorage.getItem("task"));
        name.push(document.querySelector('[name=work]').value);
        localStorage.removeItem("task");
    }
    var nameString = JSON.stringify(name);
    localStorage.setItem("task", nameString);
    listTasks(JSON.parse(localStorage.getItem('task')).length -1);
    
}

// List members
// Get info from localStorage.
// loop through and output to div.
// Should it run on interval?
listTeamMembers(0);
function listTeamMembers(a) {
    const memberOutputDiv = document.querySelector('#team-members-div');
    const memberOptionList = document.querySelector('#members-option');
    const teamMemberList = JSON.parse(localStorage.getItem('members'));


    if(teamMemberList != null){
        for(var i = a; i < teamMemberList.length; i++){
            const memberItem = document.createElement('p');
            memberOutputDiv.append(memberItem);
            memberItem.textContent = teamMemberList[i];

            const memberOpt = document.createElement('option');
            memberOptionList.append(memberOpt);
            memberOpt.setAttribute("value", teamMemberList[i]);
            memberOpt.textContent = teamMemberList[i];
        }
    }
    
}

// List assignments/task
// Get info from localStorage.
// loop through and output to div.
listTasks(0);
function listTasks(a) {
    const taskListDiv = document.querySelector('#tasks-div');
    const taskOptionList = document.querySelector('#task-option');
    const taskList = JSON.parse(localStorage.getItem('task'));
    const taskName = document.querySelector('[name=work]').value;

    if(taskList != null){
        for(var i = a; i < taskList.length; i++){
            const taskItem = document.createElement('p');
            taskListDiv.append(taskItem);
            taskItem.textContent = taskList[i];

            const taskOpt = document.createElement('option');
            taskOptionList.append(taskOpt);
            taskOpt.setAttribute("value", taskList[i]);
            taskOpt.textContent = taskList[i];
        }
    }
    
}

// Assign task to teammember
// Remove task from page and put it under the "teamMember"?
// Make the teamMember "hold onto the task"
function assignTaskToTeamMember() {

    var memberTask;
    if(localStorage.getItem("memberTask") == null){
        memberTask = [`${document.querySelector('#members-option').value} skal ${document.querySelector('#task-option').value}`];
    }else{
        memberTask = JSON.parse(localStorage.getItem("memberTask"));
        memberTask.push([`${document.querySelector('#members-option').value} skal ${document.querySelector('#task-option').value}`]);
        localStorage.removeItem("nameTask");
    }
    var memberTaskString = JSON.stringify(memberTask);
    localStorage.setItem("memberTask", memberTaskString);

    listAssignedTasks(JSON.parse(localStorage.getItem('memberTask')).length -1);
}

listAssignedTasks(0);
function listAssignedTasks(a) {
    const assignedTasksDiv = document.querySelector('#current-task-div');
    const assignedTaskList = JSON.parse(localStorage.getItem('memberTask'));

    if(assignedTaskList != null){
        for(var i = a; i < assignedTaskList.length; i++){
            const taskItem = document.createElement('p');
            assignedTasksDiv.append(taskItem);
            taskItem.textContent = assignedTaskList[i];
        }
    }
}