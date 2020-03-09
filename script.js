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
    Event.preventDefault();
    if(document.getElementsByName("work")[0].value != ""){
        createTask();
        document.getElementsByName("work")[0].value = "";
    }
});

document.querySelectorAll('.submit')[2].addEventListener('click', (Event) => {
    Event.preventDefault();
    if(document.querySelector('#members-option').value != "none" && document.querySelector('#task-option').value != "none"){
        assignTaskToTeamMember();    
        document.querySelector('#members-option').value = "none";
        document.querySelector('#task-option').value = "none";
    }
});

//Create teammember
// clik on button for creating new teamMemeber.
// details: firstname, lastname, role.
// fill inputs.
// Must also be able to "hold onto tasks info"
// Store info in localStorage.

// Function that stores values from the inputFields into localStorage
/*makeObject()
function makeObject(){
    if(localStorage.getItem("members") == null){
        var members = {name = []};
        localStorage.setItem("members", JSON.stringify(members))
        
    }
}*/

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

    /*const teamMemberList = JSON.parse(localStorage.getItem('teamMemberList')) ?? [];
    const name = document.querySelector('[name=teamMemberName]').value;
    const id = Math.floor(Math.random() * 100 + 1);

    const teamMember = {name, id};
    this.member = teamMember;

    if (localStorage.length < 1) {
        teamMemberList.push(teamMember);
        localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));
        listTeamMembers();
    } else {
        alreadyRegistered(this.member, teamMemberList);
    }

    if (localStorage.length > 0 && !alreadyRegistered(this.member, teamMemberList)) {
        this.member.id = id;
        teamMemberList.push(teamMember);
        localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));
        listTeamMembers();
    }*/
}

// Create assignment/task
// Click on button for creating a new task.
// fill input fields with info (se below)
// Task involves: name, description, startdate, enddate, deadline
// Store into localStorage
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
    

    /*const name = document.querySelector('[name=work]').value;
    const taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

    const task = {name};
    this.task = task;

    if (localStorage.length < 1) {
        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        listTasks();
    } else {
        alreadyRegistered(this.task, taskList);
    }

    if (localStorage.length > 0 && !alreadyRegistered(this.task, taskList)) {
        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        listTasks();
    }*/
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
    const teamMemberName = document.querySelector('[name=teamMemberName]').value;

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

// List assignments/task
// Get info from localStorage.
// loop through and output to div.
listTasks(0);
function listTasks(a) {
    const taskListDiv = document.querySelector('#tasks-div');
    const taskOptionList = document.querySelector('#task-option');
    const taskList = JSON.parse(localStorage.getItem('task'));
    const taskName = document.querySelector('[name=work]').value;

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

    /*const assignedTaskList = JSON.parse(localStorage.getItem('assignedTaskList')) ?? [];
    const name = document.querySelector('[name=worker]').value;
    const task = document.querySelector('[name=work]').value;

    const assignedTask = {name, task};
    this.assignedTask = assignedTask;

    if (localStorage.length < 1) {
        assignedTaskList.push(assignedTask);
        localStorage.setItem('taskList', JSON.stringify(assignedTaskList));
        listAssignedTasks();
    } else {
        alreadyRegistered(this.assignedTask, assignedTaskList);
    }

    if (localStorage.length > 0 && !alreadyRegistered(this.assignedTask, assignedTaskList)) {
        assignedTaskList.push(assignedTask);
        localStorage.setItem('assignedTaskList', JSON.stringify(assignedTaskList));
        listAssignedTasks();
    }
}*/

listAssignedTasks(0);
function listAssignedTasks(a) {
    const assignedTasksDiv = document.querySelector('#current-task-div');
    const assignedTaskList = JSON.parse(localStorage.getItem('memberTask'));

    for(var i = a; i < assignedTaskList.length; i++){
        const taskItem = document.createElement('p');
        assignedTasksDiv.append(taskItem);
        taskItem.textContent = assignedTaskList[i];
    }
}   


function alreadyRegistered(entity, list) {
    let alreadyRegistered = false;
    for (const item of list) {
        if (entity.name === item.name) {
            console.error(`The member ${entity.name} has already been registered`);
            alreadyRegistered = true;
            return alreadyRegistered;
        }
    }
}