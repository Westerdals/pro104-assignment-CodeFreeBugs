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
    Event.preventDefault();
    createTeamMember();
});

// Create task after filling inputFields and clicking submit
document.querySelectorAll('.submit')[1].addEventListener('click', (Event) => {
    Event.preventDefault();
    createTask();
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
function createTeamMember() {
    const teamMemberList = JSON.parse(localStorage.getItem('teamMemberList')) ?? [];
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
    }
}

// Create assignment/task
// Click on button for creating a new task.
// fill input fields with info (se below)
// Task involves: name, description, startdate, enddate, deadline
// Store into localStorage
function createTask() {
    const name = document.querySelector('[name=work]').value;
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
    }
}

// List members
// Get info from localStorage.
// loop through and output to div.
// Should it run on interval?
const listTeamMembers = () => {
    const memberOutputHeader = document.querySelector('#team-members-header');
    const teamMemberList = JSON.parse(localStorage.getItem('teamMemberList'));
    const teamMemberName = document.querySelector('[name=teamMemberName]').value;

    for (const member of teamMemberList) {
        console.log(member);
        if (alreadyRegistered(member, teamMemberList))
        {
            const memberItem = document.createElement('p');
            memberOutputHeader.append(memberItem);
            memberItem.textContent = member.name;
        }
    }
}

// List assignments/task
// Get info from localStorage.
// loop through and output to div.
const listTasks = () => {
    const taskListHeader = document.querySelector('[name=tasks]');
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    const taskName = document.querySelector('[name=work]').value;

    for (const task of taskList) {
        if (taskName === task.name) {
            const taskItem = document.createElement('p');
            taskListHeader.append(taskItem);
            taskItem.textContent = task.name;
        }
    }
}

// Assign task to teammember
// Remove task from page and put it under the "teamMember"?
// Make the teamMember "hold onto the task"
function assignTaskToTeamMember() {
    const assignedTaskList = JSON.parse(localStorage.getItem('assignedTaskList')) ?? [];
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
}

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