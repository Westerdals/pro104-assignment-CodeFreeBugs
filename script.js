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
    createTeamMember();
});

// Create task after filling inputFields and clicking submit
document.querySelectorAll('.submit')[1].addEventListener('click', (Event) => {
    createTask();
});

document.querySelectorAll('.submit')[2].addEventListener('click', (Event) => {
    assignTaskToTeamMember();
});

window.addEventListener('storage', (Event) => {
console.group('Storage event fired: ' + Event.type)
    console.log("StorageArea");
    console.table(Event.storageArea)
    
    console.group("keys");
        console.log(`Key affected: ${Event.key}`);
    console.groupEnd();

    console.group("values");
        console.log("Old value(s) changed/deleted")
        console.table(JSON.parse(Event.oldValue));
        console.log("New value(s) added");
        console.table(JSON.parse(Event.newValue));
    console.groupEnd();

console.groupEnd();    
});

//Create teammember
// clik on button for creating new teamMemeber.
// details: firstname, lastname, role.
// fill inputs.
// Must also be able to "hold onto tasks info"
// Store info in localStorage.

// Function that stores values from the inputFields into localStorage
function createTeamMember() {
    const teamMemberList = JSON.parse(localStorage.getItem('teamMemberList')) ?? [];
    const memberName = document.querySelector('[name=teamMemberName]').value;
    const id = Math.floor(Math.random() * 100 + 1);

    this.member = {memberName, id};

    if (!alreadyRegistered(this.member, teamMemberList)) {
        this.member.id = id;
        teamMemberList.push(this.member);
        localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));
        listTeamMembers();
    }
}

// List members
// Get info from localStorage.
// loop through and output to div.
// Should it run on interval?
const listTeamMembers = () => {
    const memberOutputHeader = document.querySelector('#team-members-header');
    const teamMemberList = fetchListFromLocalStorage(localStorage.teamMemberList);

    for (const member of teamMemberList) {
        const memberItem = document.createElement('p');
        memberOutputHeader.append(memberItem);
        memberItem.textContent = member.memberName;
    }
}

// Create assignment/task
// Click on button for creating a new task.
// fill input fields with info (se below)
// Task involves: name, description, startdate, enddate, deadline
// Store into localStorage
function createTask() {
    const taskName = document.querySelector('[name=work]').value;
    const taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

    this.task = {taskName};

    if (!alreadyRegistered(this.task, taskList)) {
        taskList.push(this.task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        listTasks();
    }
}

// List assignments/task
// Get info from localStorage.
// loop through and output to div.
const listTasks = () => {
    const taskListHeader = document.querySelector('[name=tasks]');
    const taskList = fetchListFromLocalStorage(undefined, localStorage.taskList, undefined);

    for (const task of taskList) {    
        const taskItem = document.createElement('p');
        taskListHeader.append(taskItem);
        taskItem.textContent = task.taskName;
    }
}

// Assign task to teammember
// Remove task from page and put it under the "teamMember"?
// Make the teamMember "hold onto the task"
function assignTaskToTeamMember() {
    const assignedTaskList = JSON.parse(localStorage.getItem('assignedTaskList')) ?? [];
    const owners = fetchListFromLocalStorage(localStorage.teamMemberList);
    const tasks = fetchListFromLocalStorage(undefined, localStorage.taskList);
    
    for (let i = 0; i < owners.length; i++) {
        const {memberName, id} = owners[i];
        const {taskName} = tasks[i];

        const assignment = `${taskName} has been assigned to ${memberName}`;

        this.assignedTask = {memberName, taskName, assignment};
    }

   if (!alreadyRegistered(this.assignedTask, assignedTaskList)) {
        assignedTaskList.push(this.assignedTask);
        localStorage.setItem('assignedTaskList', JSON.stringify(assignedTaskList));
        listAssignedTasks();
    }
}

const listAssignedTasks = () => {
    const assignedTasksHeader = document.querySelector('[name=assignedTasks]');
    const assignedTaskList = fetchListFromLocalStorage(undefined, undefined, localStorage.assignedTaskList); 

    for (const assignedTask of assignedTaskList) {
        const assignedTaskItem = document.createElement('p');
        assignedTasksHeader.append(assignedTaskItem);
        assignedTaskItem.textContent = assignedTask.assignment;
    }
}   

// Create HTML content on page load
const generateTeamMemberHeader = () => {
    const teamMemberOutput = document.querySelector('#team-members-div');
    const memberOutputHeader = document.createElement('h2');
    memberOutputHeader.id = 'team-members-header';
    memberOutputHeader.className = 'header';
    memberOutputHeader.textContent = 'Team medlemmer';
    teamMemberOutput.prepend(memberOutputHeader);
}

function alreadyRegistered(entity, list) {
    let alreadyRegistered = false;
    for (const item of list) {
        if (entity.name === item.name) {
            console.warn(`${item.name} has already been registered`);
            alreadyRegistered = true;
            return alreadyRegistered;
        }
    }
    return alreadyRegistered;
}

function fetchListFromLocalStorage(memberList, taskList, assignedList) {
    this.memberList = memberList;
    this.taskList = taskList;
    this.assignedList = assignedList;

    if (this.memberList != undefined) {
        return this.memberList = JSON.parse(localStorage.getItem('teamMemberList'));
    } else {
        console.warn(`${this.memberList} is undefined`);
    }

    if (this.taskList != undefined) {
        return this.taskList = JSON.parse(localStorage.getItem('taskList'));
    } else {
        console.warn(`${this.taskList} is undefined`);
    }

    if (this.assignedList != undefined) {
        return this.assignedList = JSON.parse(localStorage.getItem('assignedTaskList'));
    } else {
        console.warn(`${this.assignedList} is undefined`);
    }
}

//IIFE (Imediatelly Inovked Function Expression, function that is invoked/runs before any other functions in the script)
(function(){
    generateTeamMemberHeader();
}());