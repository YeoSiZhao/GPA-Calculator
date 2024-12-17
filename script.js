let moduleArray = [];

document.querySelector('.js-add-button').addEventListener('click', () => {
    addModule();
})


function addModule(){
    const module = document.querySelector('.js-module-name').value;
    const mc = document.querySelector('.js-no-of-modules').value;
    const result = document.querySelector('.js-grade').value;

    const gpa = calculateResult(result);

    const perModule = {
        name: module,
        unit:mc,
        grade:result,
        score:gpa
    };

    moduleArray.push(perModule);

    renderModule()
    document.querySelector('.js-module-name').value = '';
}

function calculateResult(result) {
    let gpa;
    switch(result){
        case "A+":
            gpa = 5.0;
            break;
        case "A":
            gpa = 5.0;
            break;
        case "A-":
            gpa = 4.5;
            break;
        case "B+":
            gpa = 4.0;
            break;
        case "B":
            gpa = 3.5;
            break;
        case "B-":
            gpa = 3.0;
            break;
        case "C+":
            gpa = 2.5;
            break;
        case "C":
            gpa = 2.0;
            break;
        case "D+":
            gpa = 1.5;
            break;
        case "D":
            gpa = 1.0;     
            break;  
    }
    return gpa;
}

function renderModule(){
    let moduleHTML = `
        <table>
            <tr>
                <th>#</th>
                <th> Module </th>
                <th> No. of MC </th>
                <th> Grade </th>
                <th> Score </th>
                <th> </th>
            </tr>
    `;
    
    moduleArray.forEach((item,index) => {
        moduleHTML += ` 
        <tr>
            <td> ${index+1} </td>
            <td> ${item.name} </td>
            <td> ${item.unit} </td>
            <td> 
                <select name="grade"
        class="js-change-grade" data-index="${index}">
                <option selected="selected">
                ${item.grade} 
                </option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                </select></td>
            <td> ${item.score.toFixed(2)} </td>
            <td> <button data-index="${index}" class="js-delete"> Delete </button> </td>
        </tr> 
        `
    })

    document.querySelector('.js-main-body').innerHTML = moduleHTML;

    document.querySelectorAll('.js-change-grade').forEach((select) => {
        select.addEventListener('change', (event) => {
            const index = event.target.dataset.index; // Get the index of the row
            const newGrade = event.target.value;

            // Update moduleArray
            moduleArray[index].grade = newGrade;
            moduleArray[index].score = calculateResult(newGrade);

            renderModule(); // Re-render the table
            renderGPA();    // Recalculate GPA
        });
    });
    document.querySelectorAll('.js-delete').forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            moduleArray.splice(index, 1);
            renderModule();
            renderGPA()
        })
    })
    if (!moduleArray.length){
        document.querySelector('.js-main-body').innerHTML = "";
    }
}



function renderGPA(){
    let finalGPA;
    let totalmc = 0;
    let totalpoints = 0;
    let toDisplay = document.querySelector('.js-expected-gpa').innerHTML;

    if (moduleArray.length > 0){
        moduleArray.forEach((item) => {
            totalmc += Number(item.unit);
            totalpoints += Number(item.unit) * Number(item.score);
        })
        finalGPA = totalpoints / totalmc;
    }
    else{
        finalGPA = "";
    }
    document.querySelector('.js-expected-gpa').innerHTML = finalGPA ? finalGPA.toFixed(2) : "";
}



    

