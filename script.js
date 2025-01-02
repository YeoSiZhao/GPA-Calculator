let moduleArray = JSON.parse(localStorage.getItem('modules')) || [];

renderModule();
renderGPA();


document.querySelector('.js-add-button').addEventListener('click', () => {
    addModule();
})

function saveHistory () {
    localStorage.setItem('modules',JSON.stringify(moduleArray));
}


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
    renderGPA()
    saveHistory();
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
        case "SU":
            gpa = 0.0;     
            break;  
        case "CS":
            gpa = 0.0;     
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
                <th> Delete </th>
            </tr>
    `;

    moduleArray.forEach((item, index) => {
        const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "SU","CS"];

        const dropdownOptions = grades
            .filter(grade => grade !== item.grade)
            .map(grade => `<option value="${grade}">${grade}</option>`)
            .join('');

        moduleHTML += ` 
        <tr>
            <td> ${index+1} </td>
            <td> ${item.name} </td>
            <td> ${item.unit} </td>
            <td> 
                <select class="js-change-grade" data-index="${index}">
                    <option selected="selected">${item.grade}</option>
                    ${dropdownOptions}
                </select>
            </td>
            <td> ${item.score.toFixed(2)} </td>
            <td> <button data-index="${index}" class="js-delete"> Delete </button> </td>
        </tr> 
        `;
    });

    document.querySelector('.js-main-body').innerHTML = moduleHTML;

    document.querySelectorAll('.js-change-grade').forEach((select) => {
        select.addEventListener('change', (event) => {
            const index = event.target.dataset.index;
            const newGrade = event.target.value;

            moduleArray[index].grade = newGrade;
            moduleArray[index].score = calculateResult(newGrade);

            renderModule(); 
            renderGPA();
            saveHistory();
        });
    });

    document.querySelectorAll('.js-delete').forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            moduleArray.splice(index, 1);
            renderModule();
            renderGPA();
            saveHistory();
        });
    });

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
            if (item.grade == "SU" || item.grade == "CS")
            {
                totalmc += 0;
            }
            else {
                totalmc += Number(item.unit);
                totalpoints += Number(item.unit) * Number(item.score);
            }

        })
        finalGPA = totalpoints / totalmc;
    }
    else {
        finalGPA = "";
    }
    document.querySelector('.js-expected-gpa').innerHTML = finalGPA ? finalGPA.toFixed(2) : "";
}



    

