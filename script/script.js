
const body = document.body;
const mainCont = body.querySelector('.main-cont') ;
const tableCont = mainCont.querySelector('.table-cont');

const BOOTCAMP_API = 'https://appleseed-wa.herokuapp.com/api/users/';


/*
API
[
  {
    "id": 0,
    "firstName": "Guy",
    "lastName": "Shefer",
    "capsule": 1
  },
-----------------------------------
USER
  {
  "id": 0,
  "age": 28,
  "city": "Rosh Haayin",
  "gender": "m",
  "hobby": "Frisbee"
}
*/
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

async function GetData(url) {
    const respone = await fetch(url);
    const data = await respone.json();
    return (data);
}

async function MainFunction() {

    const mainData = await GetData(BOOTCAMP_API);

    let detailsArr = [];

    let list = new StudentsList();

    // Push to another array the other details of the student
    for (let i = 0; i < mainData.length; ++i) {
        detailsArr.push(await GetData(BOOTCAMP_API + `/${i}`));
    }
    // console.log(detailsArr);

    // Add to the mainData object the keys and values from detailsArr
    for (let i = 0; i < mainData.length; ++i) {
        if (mainData[i].id === detailsArr[i].id) {
            mainData[i].age = detailsArr[i].age;
            mainData[i].city = detailsArr[i].city;
            mainData[i].gender = detailsArr[i].gender;
            mainData[i].hobby = detailsArr[i].hobby;
        }
    }
    // console.log(mainData);


    // Create students with all the data
    for (let i = 0; i < mainData.length; ++i) {
        list.AddNewStudent(mainData[i]);
    }
    // console.log(list);
    list.Print();

    // TODO: check how to read from storage!!!
    // localStorage.setItem("studentList", JSON.stringify(list));


    

    

}; MainFunction();
