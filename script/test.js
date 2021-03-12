    // Push to another array the other details of the student
    // for (let i = 0; i < mainData.length; ++i) {
    //     detailsArr.push(await GetData(BOOTCAMP_API + `/${i}`));
    // }
    // console.log(detailsArr);

    // Add to the mainData object the keys and values from detailsArr
    // for (let i = 0; i < mainData.length; ++i) {
    //     if (mainData[i].id === detailsResArr[i].id) {
    //         mainData[i].age = detailsResArr[i].age;
    //         mainData[i].city = detailsResArr[i].city;
    //         mainData[i].gender = detailsResArr[i].gender;
    //         mainData[i].hobby = detailsResArr[i].hobby;
    //     }
    // }
    // console.log(mainData);



        // console.log(list)
    // if (selectValue == 'id') {
    //     if (inputValue == '') {
    //         tableCont.innerHTML = tableContCopy;
    //     }
    //     else {
    //         let resObj = list.GetStudentById(parseInt(inputValue));
    //         // console.log(resObj);
    //         // tableCont.innerHTML = '';
    //         tableCont.innerHTML = `
    //             <tr>
    //                 <td> ${resObj.id} </td>
    //                 <td> ${resObj.firstName} </td>
    //                 <td> ${resObj.lastName} </td>
    //                 <td> ${resObj.capsule} </td>
    //                 <td> ${resObj.age} </td>
    //                 <td> ${resObj.city} </td>
    //                 <td> ${resObj.gender} </td>
    //                 <td> ${resObj.hobby} </td>
    //                 <td> 
    //                     <button type="submit" class="btn edit-btn" data-attr="edit-btn"></button>
    //                 </td>
    //                 <td> 
    //                     <button type="submit" class="btn remove-btn" data-attr="remove-btn"></button>
    //                 </td>
    //             </tr>
    //         `;
    //     }  
    // }


        // switch (selectValue){
    //     case 'id':
    //         let resObj = list.GetStudentById(parseInt(inputValue));
    //         tableCont.innerHTML = `
    //             <tr>
    //                 <td> ${resObj.id} </td>
    //                 <td> ${resObj.firstName} </td>
    //                 <td> ${resObj.lastName} </td>
    //                 <td> ${resObj.capsule} </td>
    //                 <td> ${resObj.age} </td>
    //                 <td> ${resObj.city} </td>
    //                 <td> ${resObj.gender} </td>
    //                 <td> ${resObj.hobby} </td>
    //                 <td> 
    //                     <button type="submit" class="btn edit-btn" data-attr="edit-btn"></button>
    //                 </td>
    //                 <td> 
    //                     <button type="submit" class="btn remove-btn" data-attr="remove-btn"></button>
    //                 </td>
    //             </tr>
    //         `;
    //         return;

    //     case 'firstName':
    //         let result = list.GetStudentByFirstName(inputValue);
    //         DisplaySearchedData(result);
    //         return;
    //     case 'lastName':
    //         let result = list.GetStudentByLastName(inputValue);
    //         DisplaySearchedData(result);
    //         return;

    // }





    // GetStudentById(studentId) {
    //     for (let i = 0; i < this.students.length; ++i) {
    //         if (this.students[i].id == studentId) {
    //             return (this.students[i]);
    //         }
            
    //     }
    //     return (false);
    // }

    // GetStudentByFirstName(studentFirstName) {
    //     let res = this.students.filter(obj => {
    //         return (obj.firstName.includes(studentFirstName));
    //     })
    //     return res;
    // }

    // GetStudentByLastName(studentLastName) {
    //     let res = this.students.filter(obj => {
    //         return (obj.lastName.includes(studentLastName));
    //     })
    //     return res;
    // }

    // GetStudentByLastCapsule(studentCapsule) {
    //     let res = this.students.filter(obj => {
    //         return (obj.capsule === studentCapsule);
    //     })
    //     return res;
    // }

    // GetStudentByAge(studentAge) {
    //     let res = this.students.filter(obj => {
    //         return (obj.age === studentAge);
    //     })
    //     return res;
    // }

    // GetStudentByGender(studentGender) {
    //     let res = this.students.filter(obj => {
    //         return (obj.gender === studentGender);
    //     })
    //     return res;
    // }

    // GetStudentByCity(studentCity) {
    //     let res = this.students.filter(obj => {
    //         return (obj.city.includes(studentCity));
    //     })
    //     return res;
    // }

    // GetStudentByHobby(studentHobby) {
    //     let res = this.students.filter(obj => {
    //         return (obj.hobby.includes(studentHobby));
    //     })
    //     return res;
    // }