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
    const teamMemberName = document.querySelector('[name=teamMemberName]').value;

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
