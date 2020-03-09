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
    createTask();
    document.getElementsByName("work")[0].value = "";
});

document.querySelectorAll('.submit')[2].addEventListener('click', (Event) => {
    Event.preventDefault();
    assignTaskToTeamMember();
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
    listTeamMembers();

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
    listTasks();
    

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
const listTeamMembers = () => {
    const memberOutputHeader = document.querySelector('#team-members-header');
    const memberOptionList = document.querySelector('#members-option');
    const teamMemberList = JSON.parse(localStorage.getItem('members'));
    const teamMemberName = document.querySelector('[name=teamMemberName]').value;

            const memberItem = document.createElement('p');
            memberOutputHeader.append(memberItem);
            memberItem.textContent = teamMemberList[teamMemberList.length - 1];

            const memberOpt = document.createElement('option');
            memberOptionList.append(memberOpt);
            memberOpt.setAttribute("value", teamMemberList[teamMemberList.length - 1]);
            memberOpt.textContent = teamMemberList[teamMemberList.length - 1];
        
    
}

// List assignments/task
// Get info from localStorage.
// loop through and output to div.
const listTasks = () => {
    const taskListHeader = document.querySelector('#tasks-header');
    const taskOptionList = document.querySelector('#task-option');
    const taskList = JSON.parse(localStorage.getItem('task'));
    const taskName = document.querySelector('[name=work]').value;

    
            const taskItem = document.createElement('p');
            taskListHeader.append(taskItem);
            taskItem.textContent = taskList[taskList.length - 1];

            const taskOpt = document.createElement('option');
            taskOptionList.append(taskOpt);
            taskOpt.setAttribute("value", taskList[taskList.length - 1]);
            taskOpt.textContent = taskList[taskList.length - 1];
        
    
}

// Assign task to teammember
// Remove task from page and put it under the "teamMember"?
// Make the teamMember "hold onto the task"
function assignTaskToTeamMember() {
    console.log(document.querySelector('#members-option').value);
    console.log(document.querySelector('#task-option').value);

   var name;
    var taskMember;
    if(localStorage.getItem("task-member") == null){
        taskMember = {
            member: document.querySelector('#members-option').value, 
            task: document.querySelector('#task-option').value
        };
        name.push(taskMember);
    }else{
        name = JSON.parse(localStorage.getItem("task-member"));
        taskMember = {
            member: document.querySelector('#members-option').value, 
            task: document.querySelector('#task-option').value
        };
        name.push(taskMember);
        localStorage.removeItem("member-task");
    }
    var nameString = JSON.stringify(name);
    localStorage.setItem("member-task", nameString);
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

const listAssignedTasks = () => {
    const assignedTasksHeader = document.querySelector('[name=assignedTasks]');
    const assignedTaskList = JSON.parse(localStorage.getItem('assignedTaskList'));
    const assignedTaskName = document.querySelector('[name=work]').value;
    const assignedTaskOwner = document.querySelector('[name=worker]').value;

    for (const assignedTask of assignedTaskList) {
        if (assignedTaskName === assignedTask.task) {
            
            const assignedTaskItem = document.createElement('p');
            assignedTasksHeader.append(assignedTaskItem);
            assignedTaskItem.textContent = assignedTask.task + " is assigned to " + assignedTaskOwner;
        }
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