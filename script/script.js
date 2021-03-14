
const body = document.body;
const mainCont = body.querySelector('.main-cont') ;
const tableCont = mainCont.querySelector('.table-cont');
const tableContInitial =`
    <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Capsule</th>
        <th>Age</th>
        <th>City</th>
        <th>Gender</th>
        <th>Hobby</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>
`;
const search = mainCont.querySelector('.search');
const select = mainCont.querySelector('#dropdown');

const BOOTCAMP_API = 'https://appleseed-wa.herokuapp.com/api/users/';

class Student {
    constructor(id, firstName, lastName, capsule, age, city, gender, hobby) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.capsule = capsule;
        this.age = age;
        this.city = city;
        this.gender = gender;
        this.hobby = hobby;
    }

    Print() {
        console.log(this.id, this.firstName, this.lastName, this.capsule
            , this.age, thi,this.city, this.gender, this.hobby);
    }
}


class StudentsList {
    constructor() {
        this.students = [];
    }

    AddNewStudent(newStudentObj) {
        if (newStudentObj != null) {
            const student = new Student(newStudentObj.id, newStudentObj.firstName, newStudentObj.lastName, newStudentObj.capsule,
                newStudentObj.age, newStudentObj.city, newStudentObj.gender, newStudentObj.hobby);
            this.students.push(newStudentObj);
            return (true);
        }
        return (false);
    }

    GetList() {
        return (this.students);
    }

    GetStudents(searchValue, keyName) {
        if (typeof(searchValue) === 'string') {
            let res = this.students.filter(obj => {
                return (obj[keyName].includes(searchValue));
            });
            return res;
        }
        else {
            let res = this.students.filter(obj => {
                return (obj[keyName] === searchValue);
            })
            return res;
        }
    }

    EditStudent(studentId, category, inputValue) {
        for (let i = 0; i < this.students.length; ++i) {
            if (this.students[i].id === studentId) {
                this.students[i][category] = inputValue;
                return (true);
            }
        }

        return (false);
    }

    RemoveStudent(studentId) {
        for (let i = 0; i < this.students.length; ++i) {
            if (this.students[i].id === studentId) {
                this.students.splice(i, 1);
                return (true);
            }
        }
        return (false);
    }

    Print() {
        console.log(this.students);
    }
}; let list = new StudentsList();

/*---------------------------------------------------------------------------*/
// This function take the url and return the data from the url's API
async function GetData(url) {
    const respone = await fetch(url);
    const data = await respone.json();
    return (data);
}

/*---------------------------------------------------------------------------*/
// Push to another array the other details of the student
async function GetDetailsData(data) {
    let detailsArr = [];

    for (let i = 0; i < data.length; ++i) {
        detailsArr.push(await GetData(BOOTCAMP_API + `/${i}`));
    }
    
    return (detailsArr);
}

/*---------------------------------------------------------------------------*/
// Add to the mainData object the keys and values from detailsArr
function AddDataToObject(mainDataObj, detailsArr) {
    for (let i = 0; i < mainDataObj.length; ++i) {
        if (mainDataObj[i].id === detailsArr[i].id) {
            mainDataObj[i].age = detailsArr[i].age;
            mainDataObj[i].city = detailsArr[i].city;
            mainDataObj[i].gender = detailsArr[i].gender;
            mainDataObj[i].hobby = detailsArr[i].hobby;
        }
    }

    return (mainDataObj);
}

/*---------------------------------------------------------------------------*/
// This function display the data as table
function DisplayData(dataList) {

    for (let i = 0; i < dataList.students.length; ++i) {
        tableCont.innerHTML += `
            <tr>
                <td> ${dataList.students[i].id} </td>
                <td> ${dataList.students[i].firstName} </td>
                <td> ${dataList.students[i].lastName} </td>
                <td> ${dataList.students[i].capsule} </td>
                <td> ${dataList.students[i].age} </td>
                <td> ${dataList.students[i].city} </td>
                <td> ${dataList.students[i].gender} </td>
                <td> ${dataList.students[i].hobby} </td>
                <td> 
                    <button type="submit" class="btn edit-btn" data-attr="edit-btn"></button>
                </td>
                <td> 
                    <button type="submit" class="btn remove-btn" data-attr="remove-btn"></button>
                </td>
            </tr>
        `; 
    }

    removeBtns = tableCont.querySelectorAll('.remove-btn');
    editBtns = tableCont.querySelectorAll('.edit-btn');

    AddEventListenerToBtns(removeBtns);
    AddEventListenerToBtns(editBtns);

    return (tableCont);
}

/*---------------------------------------------------------------------------*/
// This function gets the caegories of the table
function GetCategories(dataList) {
    return (Object.keys(dataList.students[0]));
}

/*---------------------------------------------------------------------------*/
// This function create options for the select html tag
function CreateOptions(categoryArr) {
    categoryArr.forEach(category => {
        select.innerHTML += `<option value="${category}">${category}</option>`;
    });

    return (select);
}

/*---------------------------------------------------------------------------*/
// This function display only the relavent searched data
function DisplaySearchedData(objArr) {
    const tableContCopy = tableCont.innerHTML;
    tableCont.classList.add('table-cont-search');
    tableCont.innerHTML = `${tableContInitial}`;
    objArr.forEach(obj => {
        tableCont.innerHTML += `
        <tr>
        <td> ${obj.id} </td>
        <td> ${obj.firstName} </td>
        <td> ${obj.lastName} </td>
        <td> ${obj.capsule} </td>
        <td> ${obj.age} </td>
        <td> ${obj.city} </td>
        <td> ${obj.gender} </td>
        <td> ${obj.hobby} </td>
        <td> 
        <button type="submit" class="btn edit-btn" data-attr="edit-btn"></button>
        </td>
        <td> 
        <button type="submit" class="btn remove-btn" data-attr="remove-btn"></button>
        </td>
        </tr>
        `;
    });

    removeBtns = tableCont.querySelectorAll('.remove-btn');
    editBtns = tableCont.querySelectorAll('.edit-btn');

    AddEventListenerToBtns(removeBtns);
    AddEventListenerToBtns(editBtns);

    return (tableCont);
}

/*---------------------------------------------------------------------------*/
// This function search for the relevant data
function SearchFunction(e) {
    
    let selectValue  = select.value;
    let inputValue = e.target.value;
    const tableContCopy = tableCont.innerHTML;

    let checkType = parseInt(inputValue);

    // If it's a string
    if ((isNaN(checkType)) && (selectValue != 'id') && (selectValue != 'age') && (selectValue != 'capsule')) {
        let result = list.GetStudents(inputValue, selectValue);
        DisplaySearchedData(result);
    }
    else  if (!(isNaN(checkType))) {
        let result = list.GetStudents(parseInt(inputValue), selectValue);
        DisplaySearchedData(result);
    }
    return;
}

/*---------------------------------------------------------------------------*/
// This function add event listener to the remove and edit buttons
function AddEventListenerToBtns(nodeList) {
    if (nodeList[0].classList.contains('remove-btn')) {
        nodeList.forEach(btn => {
            btn.addEventListener('click', RemoveFunction);
        });
    }
    else if (nodeList[0].classList.contains('edit-btn')) {
        nodeList.forEach(btn => {
            btn.addEventListener('click', EditFunction);
        });
    }
}

/*---------------------------------------------------------------------------*/
// This function remove a student if the remove button was clicked
function RemoveFunction(e) {
    let rawData = e.target.parentElement.parentElement;
    let rawStudentId = parseInt(rawData.firstElementChild.innerHTML);

    list.RemoveStudent(rawStudentId);

    tableCont.innerHTML = `${tableContInitial}`;
    DisplayData(list);
}

/*---------------------------------------------------------------------------*/
// This function edit the student raw data if the edit button was clicked
function EditFunction(e) {
    rawDataArr = [];
    relevantCategoryArr = ['firstName', 'lastName', 'capsule', 
        'age', 'city', 'gender', 'hobby'];

    rawData = e.target.parentElement.parentElement;
    rawStudentId = parseInt(rawData.firstElementChild.innerHTML);
    rawDataCopy = rawData.innerHTML;

    rawStudentFirstName = rawData.children[1].innerHTML;
    rawStudentLastName = rawData.children[2].innerHTML;
    rawStudentCapsule = parseInt(rawData.children[3].innerHTML);
    rawStudentAge = parseInt(rawData.children[4].innerHTML);
    rawStudentCity = rawData.children[5].innerHTML;
    rawStudentGender = rawData.children[6].innerHTML;
    rawStudentHobby = rawData.children[7].innerHTML;
    rawStudentEditBtn = rawData.children[8];
    rawStudentDeleteBtn = rawData.children[9];

    rawDataArr.push(rawStudentFirstName, rawStudentLastName,
         rawStudentCapsule, rawStudentAge, 
         rawStudentCity, rawStudentGender, rawStudentHobby);

    rawData.innerHTML = `
        <td> ${rawStudentId} </td>
        <td> <input class="input-edit" type="text" value="${rawStudentFirstName}"> </input> </td>
        <td> <input class="input-edit" type="text" value="${rawStudentLastName}"> </input> </td>
        <td> <input class="input-edit" type="text" value="${rawStudentCapsule}"> </input> </td>
        <td> <input class="input-edit" type="text" value="${rawStudentAge}"> </input> </td>
        <td> <input class="input-edit" type="text" value="${rawStudentCity}"> </input> </td>
        <td> <input class="input-edit" type="text" value="${rawStudentGender}"> </input> </td>
        <td> <input class="input-edit" type="text" value="${rawStudentHobby}"> </input> </td>
        <td> 
            <button type="submit" class="btn confirm-btn" data-attr="confirm-btn"></button>
        </td>
        <td> 
            <button type="submit" class="btn cancel-btn" data-attr="cancel-btn"></button>
        </td>
    `;

    let rawStudentConfirmBtn = rawData.children[8];
    let rawStudentUndoBtn = rawData.children[9];
    rawStudentUndoBtn.addEventListener('click', UndoFunction);

    rawStudentConfirmBtn.addEventListener('click', ConfirmFunction);
}

/*---------------------------------------------------------------------------*/
// This function undo to the original table data if the cancel button was clicked
function UndoFunction(e) {
    tableCont.innerHTML = `${tableContInitial}`;
    DisplayData(list);
}

/*---------------------------------------------------------------------------*/
// This function change the table data if the confirm button was clicked
function ConfirmFunction(e) {
    for (let i = 1; i < rawData.children.length - 2; ++i) {

        let inputValue = rawData.children[i].firstElementChild.value;
        let categoryPlace = i - 1;

        if (inputValue != rawDataArr[categoryPlace]) {
            let inputValueArr = inputValue.split(' ');
            if (inputValueArr.length > 1) {
                if (inputValueArr.length > 3) {
                    inputValueArr = inputValueArr.filter(word => word != '');
                    inputValueArr = inputValueArr.join(' ');
                    inputValue = inputValueArr;
                }
                else {
                    inputValue = inputValueArr[1];
                }
            }

            list.EditStudent(rawStudentId, relevantCategoryArr[categoryPlace], inputValue);
            tableCont.innerHTML = `${tableContInitial}`;
            DisplayData(list);
        }
        else {
            tableCont.innerHTML = `${tableContInitial}`;
            DisplayData(list);
        }    
    }
}

/*---------------------------------------------------------------------------*/
// Main function that runs the program
async function MainFunction() {

    const mainData = await GetData(BOOTCAMP_API);
    let detailsResArr = await GetDetailsData(mainData);

    AddDataToObject(mainData, detailsResArr);

    // Create students with all the data
    for (let i = 0; i < mainData.length; ++i) {
        list.AddNewStudent(mainData[i]);
    }

    // Display the table data
    DisplayData(list);

    // Gets the table categories
    const categoriesArr = GetCategories(list);
    CreateOptions(categoriesArr);

    // Sent to hendler function when key is pressed
    search.addEventListener('keyup', SearchFunction);


}; MainFunction();

/* ASK:
 In css:

    normalize.css 
   ---------------------------------
    tbody tr:nth-child(2n) {
        border: 1px solid #000;
        background-color: #eee;
    }

    tbody tr:nth-child(2n + 1) {
        background-color: #fff;
    }
   ---------------------------------
    .edit-btn:active, 
    .btn:active
    .remove-btn:active {
        border: none;
        filter: invert(0%) sepia(48%) saturate(564%) hue-rotate(93deg) brightness(94%) contrast(92%);
    } 
*/