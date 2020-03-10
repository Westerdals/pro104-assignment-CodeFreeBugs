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
    // PreventDefault: default-action of a sbumit-button on a form is to send the form and refresh the webpage, we don't want that now
    Event.preventDefault();
    createTeamMember();
});

// Create task after filling inputFields and clicking submit
document.querySelectorAll('.submit')[1].addEventListener('click', (Event) => {
    // PreventDefault: default-action of a sbumit-button on a form is to send the form and refresh the webpage, we don't want that now
    Event.preventDefault();
    createTask();
});

// Assign values afther choosing "member" to assign "task" to
document.querySelector('#assign-task-div').addEventListener('change', (Event) => {
    assignTaskToTeamMember(Event);
});

// Assign the created task to the created teamMember, list the assignment on the webpage and clear/reset the inputFields
document.querySelectorAll('.submit')[2].addEventListener('click', (Event) => {
    // PreventDefault: default-action of a sbumit-button on a form is to send the form and refresh the webpage, we don't want that now
    Event.preventDefault();
    listAssignedTasks();
});

// Eventlistener for localStorage events that can be used when changing values in localStorage through another browser-window
// NB: LocalStorage events get triggered on the "main browser-window" when something changes the values from "another browser-window"
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
    // After that the "listTeamMembers"-function gets called
    if (!alreadyRegistered(this.member, teamMemberList)) {
        teamMemberList.push(this.member);
        localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));
        listTeamMembers();
    }
}

// Function that fetch a list of teamMembers from localStorage (function at the bottom), and generates a "<p></p>"-element with details for each member
// NB: I've used ".textContent"-property instead of ".innerHTML" since I only need to store text and not HTML-content in the "p"-element, and textContent handles raw-text and therefore is parsed faster
// The element is appended to the "memberOutputDiv" on the website
const listTeamMembers = () => {
    const memberOutputDiv = document.querySelector('#team-members-div');
    const teamMemberList = fetchListFromLocalStorage(localStorage.teamMemberList);
    // Fetch the needed datalist (for choosing which teamMember should have which task)
    const workersDataList = document.querySelector('#workers');

    for (const member of teamMemberList) {
        // Check if "this particular member's ID-number" is the same as the "ID-number of the iterated member from the list"
        // If true: create details in datalist and output list of teamMembers
        // If false: continue iterating the list
        if (this.member.id === member.id) {
            const memberItem = document.createElement('p');
            const workerDataItem = document.createElement('option');
            memberItem.textContent = this.member.memberName;
            workerDataItem.value = `Name: ${this.member.memberName} - ID-number: ${this.member.id}`;
            memberOutputDiv.appendChild(memberItem);
            workersDataList.appendChild(workerDataItem);
        }   
    }
}

// Function that takes in the "registered task", check if it's already registered (the same way as teamMember) and list the tasks
// The memberdetails and task-details gets fetched and stored into "<option></option>"-elements inside their respective "<datalist></datalist>"-element
// That makes it possible to choose a member and what task that member should be assigned to
function createTask() {
    // Store empty array inside taskList variable when the localStorage isn't already created (if the left-side expression is null or undefined)
    const taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];
    // Store typed in task-value into variable
    const taskName = document.querySelector('[name=work]').value;

    // Store typed in task-value into "this.object"-reference
    this.task = {taskName};

    // Call function that checks if "the task that was typed in now" has already been stored in localStorage
    // if returnes true: Don't push "the task" into localStorage
    // if returnes false: Push "the task" into localStorage, and list the tasks on the webpage
    if (!alreadyRegistered(this.task, taskList)) {
        taskList.push(this.task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        listTasks();
    }
}

// Function that list tasks entered in the input-field the exact same way as the "listTeamMembers"-function
// TLDR: 
// 1. Get div-element for displaying output
// 2. Fetch list of tasks from localStorage
// 3. Fetch the datalist-element for displaying assignment-options
// 4. loop through the list and create "paragraph"-element for each that gets appended to the output-div
// 5. loop through the list and create "option"-element for each that gets appended to the datalist-element
const listTasks = () => {
    const taskOutputDiv = document.querySelector('#tasks-div');
    const taskList = fetchListFromLocalStorage(undefined, localStorage.taskList, undefined);
    // Fetch the needed datalist (for choosing which teamMember should have which task)
    const tasksDataList = document.querySelector('#tasks');

    for (const task of taskList) {
        // Check if "this particular tasks' name" is the same as the "taskName of the iterated task from the list"
        // If true: create details in datalist and output list of tasks
        // If false: continue iterating the list
        if (this.task.taskName === task.taskName) {
            const taskItem = document.createElement('p');
            const taskDataItem = document.createElement('option');
            taskOutputDiv.appendChild(taskItem);
            tasksDataList.appendChild(taskDataItem);
            taskItem.textContent = this.task.taskName;
            taskDataItem.value = this.task.taskName;
        }
    }
}

// Function that get the text values from the choosen options, and stores the details in "assignedTaskList"-key in localStorage
function assignTaskToTeamMember(Event) {
    // Stores javaScript objects parsed from JSON.string if the "assignedTaskList"-exists in localStorage (true) or returns and empty array (false)
    // Do you remember the rule with null coalescing operator?: "tries option on the left-side, if null or undefined -> chooses option on the right-side"
    const assignedTaskList = JSON.parse(localStorage.getItem('assignedTaskList')) ?? [];

    if (Event.target.name === 'worker') {
        const member = Event.target.value;
        this.assignedTask = {member};
    } else if (Event.target.name === 'tasks') {
        const task = Event.target.value;
        this.assignedTask = {task};
    }
    // Store the "assignemnt"-result into variable that will be displayed as "the assignemnt"
    const assignment = `${task.taskName} has been assigned to ${member.memberName}`;
    
    // Store the details into "this.object"-reference
    this.assignedTask = {member, task, assignment};

    // Check if the assignment has already been registered
    // if false: add "this specific assigned task" to localStorage
    // if true: Warn the user that the task has already been assigned to that member
   if (!alreadyRegistered(this.assignedTask, assignedTaskList)) {
        assignedTaskList.push(this.assignedTask);
        localStorage.setItem('assignedTaskList', JSON.stringify(assignedTaskList));        
    }
}

// Function that display list of assignments by the exact same logic as "listTeamMembers" and "listTasks"
const listAssignedTasks = () => {
    const assignedTasksOutputDiv = document.querySelector('#current-task-div');
    // NB: I'm not sure if it's "good practise" to enter "undefined" as a argument-value for the parameters I don't want to fill in 
    // (I need to enter a value for parameter number three, but I can't do that without filling in the rest)
    // I can't make any of them optional (by filling in a default value in the parameters in the function declaration)...
    const assignedTaskList = fetchListFromLocalStorage(undefined, undefined, localStorage.assignedTaskList); 

    // Iterate through list of assignedTask from localStorage, generate paragraph for each and append to "output-div"
    for (const assignedTask of assignedTaskList) {
        // Check if "this particular tasks' name" is the same as the "taskName of the iterated task from the list"
        // If true: create details in datalist and output list of tasks
        // If false: continue iterating the list
        if (this.assignedTask.assignment === assignedTask.assignment) {
            const assignedTaskItem = document.createElement('p');
            assignedTasksOutputDiv.appendChild(assignedTaskItem);
            assignedTaskItem.textContent = this.assignedTask.assignment;
        }
    }

    // Clear/reset values entered after an assignment has been listed
    document.forms[0].reset();
}

// Function that takes in "a thing to check" and "a list that contains the other things of the same type"
// i.e: Takes in "this.member" and "teamMemberList"
function alreadyRegistered(entity, list) {
    // If the "list with things to check" is empty, then the "thing" shouldn't be registered alredy
    // We then return "false" to the place where the function was called (i.e: inside createTeamMember)
    if (list.length < 1) {
        return false;
    }

    // Fetch the list(s) with teamMembers and tasks from localStorage
    // We need to do this since the "list of things"-values and "the thing"-values will not be compared as expected
    const teamList = fetchListFromLocalStorage(localStorage.teamMemberList) ?? [];
    const taskList = fetchListFromLocalStorage(undefined,localStorage.taskList) ?? [];

    // NB: This is done to make the "list of things" recognize "who it is" (more details later)
    // The properties of the list(s) are stored into separate arrays (i.e: [0, 1, length]) 
    const listProps = Object.getOwnPropertyNames(list);
    const teamListProps = Object.getOwnPropertyNames(teamList);
    const taskListProps = Object.getOwnPropertyNames(taskList);


    // NB: I had to make an If-check for values in the "teamMemberList" and "taskList", since the property-names (i.e: .memberName and .taskName) -
    // wouldn't work as expected in the "assignTeamMemberToTask"-function if they where the same 
    // (the assignment description wouldn't differentiate between name of the teamMember and name of the task, and lead to stuff like this: bob has been assigned to bob, or bob has been assigned to make a task).

    // Check if the number of properties on the "list of things" match the number of properties on the "teamList" (make the list recognize that it is the "teamlist")
    // This works since the "teamListProps.length" is 0 if it's not supplied as an argument in the function-call
    if (listProps.length === teamListProps.length) {
        // iterate through the "list of things" supplied as argument on function-call
        for (const item of list) {
            // check if the "thing supplied as argument" has the same name as an entry in the "list of things"
            // if true: output warning and return "true" to the function-caller
            // if false: run next iteration or continue after the loop
            if (entity.memberName === item.memberName) {
                // Outputs warning that the "thing" has already been registered
                console.warn(`${item.memberName} has already been registered`);
                return true;
            }
        }
    }

    // Check if the number of properties on the "list of things" match the number of properties on the "taskList", if the "teamMemberList" isn't supplied.
    else if (listProps.length === taskListProps.length) {
        // Iterates through the "list of things"
        for (const item of list) {
            // Check name of the supplied task against task already in localStorage
            // if true: output warning and return "true" to the function-caller
            // if false: run next iteration or continue after the loop
            if (entity.taskName === item.taskName) {
                // Outputs warning that the "thing" has already been registered
                console.warn(`${item.taskName} has already been registered`);
                return true;
            }
        }
    }
}

// "Utility function" that fetches the list passed to it as an argument and returns it to the function caller.
// It's used for easy access to the list you need, where you need it. 
function fetchListFromLocalStorage(memberList, taskList, assignedList) {
    // Store the arguments passed in from the function-call into "this.object"-references
    this.memberList = memberList;
    this.taskList = taskList;
    this.assignedList = assignedList;

    // Returns the teamMemberList to the function-caller if it's supplied as an argument
    if (this.memberList != undefined) {
        return this.memberList = JSON.parse(localStorage.getItem('teamMemberList'));
    }
    
    // Returns the taskList to the function-caller if it's supplied as an argument
    if (this.taskList != undefined) {
        return this.taskList = JSON.parse(localStorage.getItem('taskList'));
    }

    // Returns the assignedTaskList to the function-caller if it's supplied as an argument
    if (this.assignedList != undefined) {
        return this.assignedList = JSON.parse(localStorage.getItem('assignedTaskList'));
    }
}
