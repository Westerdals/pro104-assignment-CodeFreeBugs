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

<<<<<<< HEAD
=======
// This function is used to create and append inputFields for entering task-info
// I'll generalize it later so it can be used for creating fields for other things etc.
>>>>>>> commit before merge

// Create assignment/task
// Click on button for creating a new task.
// fill input fields with info (se below)
// Task involves: name, description, startdate, enddate, deadline
// Store into localStorage
const createTask = () => {
    const inputFields = document.querySelectorAll('.input');
    const taskArray = [];

    inputFields.forEach(input => {
        taskArray.push(input.value);
        localStorage.setItem("taskList", JSON.stringify(taskArray));
    });
}

// List members
// Get info from localStorage.
// loop through and output to div.
// Should it run on interval?
const listTeamMembers = () => {
    const memberList = JSON.parse(localStorage.getItem('teamMemberList'));
    const memberOutputHeader = document.querySelector('#team-members-header');
    const teamMemberList = JSON.parse(localStorage.getItem('teamMemberList'));
    const teamMemberName = document.querySelector('[name=teamMemberName]').value;

<<<<<<< HEAD
    for (const member of teamMemberList) {        
        if (teamMemberName === member.name) {
=======
    for (const member of teamMemberList) {
        console.log(member);
        if (alreadyRegistered(member, teamMemberList))
        {
>>>>>>> commit before merge
            const memberItem = document.createElement('p');
            memberOutputHeader.append(memberItem);
            memberItem.textContent = member.name;
        }
    }
}

// List assignments/task
// Get info from localStorage.
// loop through and output to div.


// Assign task to teammember
// Remove task from page and put it under the "teamMember"?
// Make the teamMember "hold onto the task"

// create "case" based on task given to member
// Set owner from no-one to someone.

// list all "cases"
// List all cases with status?

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
            console.error(`The member ${this.member.name} has already been registered`);
            alreadyRegistered = true;
            return alreadyRegistered;
        }
    }
}

//IIFE (Imediatelly Inovked Function Expression, function that is invoked/runs before any other functions in the script)
(function(){
    createTaskInputFields();
    generateTeamMemberHeader();
}());