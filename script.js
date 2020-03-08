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

document.getElementById('assign-task-div').addEventListener('change', (Event) => {
    
});

// Assign the created task to the created teamMember and clear/reset the inputFields
document.querySelectorAll('.submit')[2].addEventListener('click', (Event) => {
    Event.preventDefault();
    assignTaskToTeamMember();
    listAssignedTasks();
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
        teamMemberList.push(this.member);
        localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));
        listTeamMembers();
    }
}

const listTeamMembers = () => {
    const memberOutputDiv = document.querySelector('#team-members-div');
    const teamMemberList = fetchListFromLocalStorage(localStorage.teamMemberList);

    for (const member of teamMemberList) {
        const memberItem = document.createElement('p');
        memberItem.textContent = member.memberName;
        memberOutputDiv.appendChild(memberItem);    
    }
}

function createTask() {
    const taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];
    const taskName = document.querySelector('[name=work]').value;
    
    const workersDataList = document.querySelector('#workers');
    const tasksDataList = document.querySelector('#tasks');
    workersDataList.innerHTML = '';
    tasksDataList.innerHTML = '';

    this.task = {taskName};

    if (!alreadyRegistered(this.task, taskList)) {
        taskList.push(this.task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        listTasks();
    }

    const owners = fetchListFromLocalStorage(localStorage.teamMemberList) ?? [];
    const tasks = fetchListFromLocalStorage(undefined, localStorage.taskList) ?? [];

    for (let i = 0; i < owners.length; i++) {
        let {memberName} = owners[i];
        let {taskName} = tasks[i];

        workersDataList.innerHTML = `<option>${memberName}</option>`;
        tasksDataList.innerHTML = `<option>${taskName}</option>`;
    }
}

// List assignments/task
const listTasks = () => {
    const taskOutputDiv = document.querySelector('#tasks-div');
    const taskList = fetchListFromLocalStorage(undefined, localStorage.taskList, undefined);

    for (const task of taskList) {    
        const taskItem = document.createElement('p');
        taskOutputDiv.appendChild(taskItem);
        taskItem.textContent = task.taskName;
    }
}

// Assign task to teammember
function assignTaskToTeamMember() {
    const assignedTaskList = JSON.parse(localStorage.getItem('assignedTaskList')) ?? [];
    const memberName = document.querySelector('[name=workers]').list.textContent;
    const taskName = document.querySelector('[name=tasks]').list.textContent;
    
    const assignment = `${taskName} has been assigned to ${memberName}`;

    this.assignedTask = {memberName, taskName, assignment};

   if (!alreadyRegistered(this.assignedTask, assignedTaskList)) {
        assignedTaskList.push(this.assignedTask);
        localStorage.setItem('assignedTaskList', JSON.stringify(assignedTaskList));        
    }
}

const listAssignedTasks = () => {
    const assignedTasksOutputDiv = document.querySelector('#current-task-div');
    const assignedTaskList = fetchListFromLocalStorage(undefined, undefined, localStorage.assignedTaskList); 

    for (const assignedTask of assignedTaskList) {
        const assignedTaskItem = document.createElement('p');
        assignedTasksOutputDiv.appendChild(assignedTaskItem);
        assignedTaskItem.textContent = assignedTask.assignment;
    }
}

function alreadyRegistered(entity, list) {
    let alreadyRegistered = false;

    if (list.length < 1) {
        alreadyRegistered = false;
        return alreadyRegistered;
    }

    const teamList = fetchListFromLocalStorage(localStorage.teamMemberList) ?? [];
    const taskList = fetchListFromLocalStorage(undefined,localStorage.taskList) ?? [];

    const listProps = Object.getOwnPropertyNames(list);
    const teamListProps = Object.getOwnPropertyNames(teamList);
    const taskListProps = Object.getOwnPropertyNames(taskList);

    if (listProps.length === teamListProps.length) {
        for (const item of list) {
            if (entity.memberName === item.memberName) {
                console.warn(`${item.memberName} has already been registered`);
                alreadyRegistered = true;
                return alreadyRegistered;
            }
        }
    }

    else if (listProps.length === taskListProps.length) {
        for (const item of list) {
            if (entity.taskName === item.taskName) {
                console.warn(`${item.taskName} has already been registered`);
                alreadyRegistered = true;
                return alreadyRegistered;
            }
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