
const body = document.body;
const mainCont = body.querySelector('.main-cont') ;
const tableCont = mainCont.querySelector('.table-cont');
const select = mainCont.querySelector('#dropdown');
const options = document.createElement('option');

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

    RemoveStudent(studentId) {
        for (leti = 0; i < this.students.length; ++i) {
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
}


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
}

/*---------------------------------------------------------------------------*/
function GetCategories(dataList) {
    return (Object.keys(dataList.students[0]));
}

/*---------------------------------------------------------------------------*/
function CreateOptions(categoryArr) {
    categoryArr.forEach(category => {
        select.innerHTML += `<option value="${category}">${category}</option>`;
    });

    return (select);
}

/*---------------------------------------------------------------------------*/
async function MainFunction() {

    let list = new StudentsList();

    const mainData = await GetData(BOOTCAMP_API);
    let detailsResArr = await GetDetailsData(mainData);

    AddDataToObject(mainData, detailsResArr);

    // Create students with all the data
    for (let i = 0; i < mainData.length; ++i) {
        list.AddNewStudent(mainData[i]);
    }
    console.log(list);
    list.Print();

    // TODO: check how to read from storage!!!
    // localStorage.setItem("studentList", JSON.stringify(list));

    // Display the table data
    DisplayData(list);

    // Gets the table categories
    const categoriesArr = GetCategories(list);
    CreateOptions(categoriesArr);
    // console.log(categoriesArr);

    

}; MainFunction();
