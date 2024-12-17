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
            <td> ${item.grade} </td>
            <td> ${item.score} </td>
            <td> <button class="js-delete"> Delete </button> </td>
        </tr> 
        `
    })

    document.querySelector('.js-main-body').innerHTML = moduleHTML;

    renderGPA();

    document.querySelectorAll('.js-delete').forEach((event,index) => {
        event.addEventListener('click', () => {
            moduleArray.splice(index, 1);
            renderModule();
            renderGPA()
        })
    })
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



    

