
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
    listTeamMembers();
    console.log('submit teamMember');
});

// Create task after filling inputFields and clicking submit
document.querySelectorAll('.submit')[1].addEventListener('click', (Event) => {
    Event.preventDefault();
    createTask();
    console.log('submit new task');
});

//Create teammember
// clik on button for creating new teamMemeber.
// details: firstname, lastname, role.
// fill inputs.
// Must also be able to "hold onto tasks info"
// Store info in localStorage.

// Function that stores values from the inputFields into localStorage
function createTeamMember() {
    //const teamMemberList = [];
    const memberSet = new Set();

    const firstName = document.querySelector('[name=firstName]').value;
    const lastName = document.querySelector('[name=lastName]').value;
    
    const teamMember = {firstName, lastName};

    memberSet.add(teamMember);
    console.log(memberSet);

    if (localStorage.length === 0) {
        localStorage.setItem('teamMemberList', JSON.stringify([...memberSet]));
    } else {
        const teamMemberList = JSON.parse(localStorage.getItem('teamMemberList'));
        console.log(teamMemberList);

        

        if (teamMember === localStorage.key)

        teamMemberList.push(...memberSet);

        console.log(...memberSet);

        localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));
    //console.log([...memberSet]);
        
        
        
        
    }
    
    
    
    

    //const teamMemberArray = Object.entries(teamMemberList).map(member => teamMemberList[member]);

    
    
    
    //teamMemberList.push(memberSet);


    //localStorage.setItem('teamMemberList', JSON.stringify(teamMember));
    
    //teamMemberList.push(teamMember);
    //localStorage.setItem('teamMemberList', JSON.stringify(teamMemberList));

    
    
    return teamMember;
}

// This function is used to create and append inputFields for entering task-info
// I'll generalize it later so it can be used for creating fields for other things etc.
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
const listTeamMembers = (registeredMember) => {
    const teamMemberOutput = document.querySelector('#team-members-div');
    const memberList = JSON.parse(localStorage.getItem("teamMemberList"));

    // This can be moved into it's own functuon/be part of a factory function that generates HTML elements on page load
    const memberOutputHeader = document.createElement('h2');
    memberOutputHeader.className = 'header';
    memberOutputHeader.textContent = 'Team medlemmer';
    teamMemberOutput.prepend(memberOutputHeader);

    // for (const member of memberList) {
    //     const memberElement = document.createElement('p');
    //     memberElement.className = '.member';        
    //     teamMemberOutput.append(memberElement);
        
    //     console.log(member);

        

    //      if (registeredMember === member) {
    //          console.log("clear");            
    //      }
    //      memberElement.innerHTML = `<p>${member.firstName} ${member.lastName}</p>`;
        
        
    // }

    return memberList;
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



// function renderProductList(){
//     const productList = JSON.parse(localStorage.getItem("productList")) || [];
//     const productListEl = document.getElementById("productList");
//     productListEl = "";
//     for(const product of productList){
//         const productEl = document.createElement("div");
//         const{name, price, description} = product;
//         productEl.innerHTML = "<h4>" + name +"</h4>" +
//             "<div>" + description + "</div>" +
//             "<div><small>Price: "+ price + "</small></div>";
//         productListEl.appendChild(productEl);

//     }
// }
// function createNewProduct(event){
//     event.preventDefault();

//     const name = document.querySelector("[name='name']").value;
//     const price = document.querySelector("[name='price']").value;
//     const description = document.querySelector("[name='description']").value;

//     const product = {name, price, description}; 

    

//     const productList = JSON-parse(localStorage.getItem("productList")) || [];
//     productList.push(product);
//     localStorage.setItem("productList", JSON.stringify(productList));
//     renderProductList(); 
    
//     event.target.reset(); 


// }
// window.addEventListener("storage",function(event) {
//         if(event.key === "productList"){
//             renderProductList();
//         }
    
// });
