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

// Assign the created task to the created teamMember and clear/reset the inputFields
document.querySelectorAll('.submit')[2].addEventListener('click', (Event) => {
    Event.preventDefault();
    assignTaskToTeamMember();
    document.forms[0].reset();
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


// Function that stores entered teamMember details from inputField into localStorage
function createTeamMember() {
    // null-coalescing operator (??): Tries to get the localStorage item with key 'teamMemberList', 
    // Chooses the empty array if value on the left is null or undefined
    const teamMemberList = JSON.parse(localStorage.getItem('teamMemberList')) ?? [];

    // Fetch the value entered in the "teamMemberName"-inputField
    const memberName = document.querySelector('[name=teamMemberName]').value;

    // Generate a random number from 1-99 to use as an unique id for the teamMember (not required, but I like the idea of having it)
    // Another great thing is, it proves that the same member that gets registered is the same that recives a task later
    const id = Math.floor(Math.random() * 100 + 1);

    // Store the values into "this.member"-object 
    this.member = {memberName, id};

    // Calling function "alreadyRegistered", that takes in a "thing" we want to check and the list to check against
    // It returns false if the "thing" is already in the "list", and returns true if it's not already in the list
    // We give this specific member 

    if (!alreadyRegistered(this.member, teamMemberList)) {
        //this.member.id = id;
        teamMemberList.push(this.member);
        localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));
        listTeamMembers();
    }
}

const listTeamMembers = () => {
    const memberOutputHeader = document.querySelector('[name=teamMembersHeader]');
    const teamMemberList = fetchListFromLocalStorage(localStorage.teamMemberList);

    for (const member of teamMemberList) {
        const memberItem = document.createElement('p');
        memberOutputHeader.append(memberItem);
        memberItem.textContent = member.memberName;
    }
}

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
function assignTaskToTeamMember() {
    const assignedTaskList = JSON.parse(localStorage.getItem('assignedTaskList')) ?? [];
    const owners = fetchListFromLocalStorage(localStorage.teamMemberList);
    const tasks = fetchListFromLocalStorage(undefined, localStorage.taskList);
    
    for (let i = 0; i < owners.length; i++) {
        const {memberName, id} = owners[i];
        const {taskName} = tasks[i];

        const assignment = `${taskName} has been assigned to ${memberName}`;

        this.assignedTask = {memberName, id, taskName, assignment};
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

function alreadyRegistered(entity, list) {
    let alreadyRegistered = false;
    for (const item of list) {
        if (entity.memberName === item.memberName || entity.taskName === item.taskName) {
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
    }

    if (this.taskList != undefined) {
        return this.taskList = JSON.parse(localStorage.getItem('taskList'));
    }

    if (this.assignedList != undefined) {
        return this.assignedList = JSON.parse(localStorage.getItem('assignedTaskList'));
    }
}