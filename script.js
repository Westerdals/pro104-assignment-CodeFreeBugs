
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
const createTeamMember = () => {
    const firstName = document.querySelector('[name=firstName]').value;
    const lastName = document.querySelector('[name=lastName]').value;
    
    const teamMember = {firstName, lastName};
    const teamMemberList = JSON.parse(window.localStorage.getItem('teamMemberList')) ?? [];
    teamMemberList.push(teamMember);

    window.localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));
}

// Create assignment/task
// Click on button for creating a new task.
// fill input fields with info (se below)
// Task involves: name, description, startdate, enddate, deadline
// Store into localStorage

const createTaskInputFields = () => {
    const taskInputField = document.querySelector('#register-task-div');

    const inputFieldAttribute = 
    {
        name: ['name', 'description', 'startdate', 'enddate', 'deadline'],
        placeholder: ['Enter taskname here', 'Enter description here'],
        type: ['text', 'textarea', 'date', 'date', 'date']
    };

    const date = new Date();
    const today = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDay()+1}`;
    const todayPlusOneYear = `${date.getFullYear()+1}-0${date.getMonth()+1}-0${date.getDay()+1}`;

    for (let i = 0; i < inputFieldAttribute.name.length; i++) {
        const inputField = document.createElement('input');
        inputField.name = inputFieldAttribute.name[i];
        inputField.type = inputFieldAttribute.type[i];
        inputField.placeholder = inputFieldAttribute.placeholder[i];
        inputField.className = 'input';
        taskInputField.appendChild(inputField);

        if (inputField.attributes.type.value === 'date') {
            inputField.setAttribute('required', true);
            inputField.setAttribute('min', today);
            inputField.setAttribute('max', todayPlusOneYear);
        }
    }
}

createTaskInputFields();

const createTask = () => {
    const inputFields = document.querySelectorAll('.input');
    const taskArray = [];

    inputFields.forEach(input => {
        taskArray.push(input.value);
        window.localStorage.setItem("taskList", JSON.stringify(taskArray));
    });
}
