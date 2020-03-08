
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
        window.localStorage.setItem("teamMember", JSON.stringify(teamMemberList));
        event.target.reset();
    
        
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
        taskList.push(task);
        window.localStorage.setItem("task", JSON.stringify(taskArray));
        event.target.reset();
    
        
    }