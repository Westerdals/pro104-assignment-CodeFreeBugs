function createNewTeamMember(event) {
    // Prevents browser for submitting page
    event.preventDefault();
 
    // Finds <input name='fName'> [propertyName='propertyValue']
    //   and gets the contents of the input field (value)
    const fName = document.querySelector("[name='fName']").value;
    // Ditto for <input name='lName' />
    const lName = document.querySelector("[name='lName']").value;
    
    const teamMember = {fName, lName };
    
    const teamMemberList = JSON.parse(window.localStorage.getItem("teamMemberList")) || [];
    // Adds the new product to the end of the list
    teamMemberList.push(teamMember);
    window.localStorage.setItem("teamMemberList", JSON.stringify(teamMemberList));
    event.target.reset();
}
function renderMemberList() {
    // Retrieves the value of the localStorage item "teamMemberList" AS A STRING (text)
    const teamMemberListJSON = window.localStorage.getItem("teamMemberList");

    // Parse (interpret) the textual product list as objects
    let teamMemberList = JSON.parse(teamMemberListJSON);
    if (teamMemberList === null) {
        teamMemberList = [];
    }

    // Retrieve the <div id='teamMemberList'></div>
    const teamMemberListEl = document.getElementById("team-members-div");

    // remove all the contents of the <div id='team-members-div"'></div>
    //teamMemberListEl.innerHTML = "";
    
    // In turn assign each product in teamMemberList to "product"
    for (const teamMember of teamMemberList) {
        // Creates a new <div> that can be placed in the document - currently it's living in the air
        const teamMemberEl = document.createElement("div");

        // Object destructoring - we're taking product apart
        const { fName, lName } = teamMember;
        


        // Replace the contents of the productEl
        teamMemberEl.innerHTML = `<p>${fName} ${lName}</p>`;

        // Finally add the <div> to the <div id="teamMemberList">
        teamMemberListEl.appendChild(teamMemberEl);
    }  
}

    


    function createNewTask(event) {
        // Prevents browser for submitting page
        event.preventDefault();
     
        // Finds <input name='task'> [propertyName='propertyValue']
        //   and gets the contents of the input field (value)
        const task = document.querySelector("[name='task']").value;
        const taskArray = {task};
    
    
        const taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
        // Adds the new product to the end of the list
        taskList.push(taskArray);
        window.localStorage.setItem("taskList", JSON.stringify(taskList));
        event.target.reset();    
    }

    function renderTaskList() {
        // Retrieves the value of the localStorage item "taskList" AS A STRING (text)
        const taskListJSON = window.localStorage.getItem("taskList");
    
        // Parse (interpret) the textual product list as objects
        let taskList = JSON.parse(taskListJSON);
        if (taskList === null) {
            taskList = [];
        }
    
        // Retrieve the <div id='taskList'></div>
        const taskListEl = document.getElementById("task-div");
    
        // remove all the contents of the <div id='team-members-div"'></div>
        //taskListEl.innerHTML = "";
        
        // In turn assign each product in taskList to "product"
        for (const taskArray of taskList) {
            // Creates a new <div> that can be placed in the document - currently it's living in the air
            const taskEl = document.createElement("div");
    
            // Object destructoring - we're taking product apart
            const {task} = taskArray;
            
    
    
            // Replace the contents of the productEl
            taskEl.innerHTML = `<p>${task}</p>`;
    
            // Finally add the <div> to the <div id="taskList">
            taskListEl.appendChild(taskEl);
        }  
    }
    