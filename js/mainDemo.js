// -by Mac Mie

// Import class TodoTask
import {
    TodoTask
} from "./TodoTask.js";

// Set some global variables
var valid = true;
var todoTaskContent = "";
var todoUncompletedTaskArray = [];
var todoCompletedTaskArray = [];
var todoTaskArray = customLocalStorage.getArrayFromLocalStorage("todoTaskArray");

// MAIN PART
// Render todoTaskArray from the Local Storage every time go to the website
renderTodoTaskArray(todoTaskArray);

// Set event for button Add-Todo-Task
document.querySelector('#addItem').onclick = function () {

    // Get the input
    todoTaskContent = document.querySelector('#newTask').value;

    // Standardise the input
    todoTaskContent = removeVietnameseTones(todoTaskContent);

    // Check if input valid (not null nor duplicate)
    valid = validation.checkNullInput(todoTaskContent, 'message-null-input', "Todo Task Content");
    valid &= checkDuplicateInput(todoTaskContent, 'message-duplicate-input', todoTaskArray);
    if (!valid) {
        return;
    }

    // Create new TodoTask and set the valid standardised input to todoTaskContent
    // Default value for the Status of new TodoTask is "todo" (not yet completed)
    var newTodoTask = new TodoTask(todoTaskContent, "todo");
    console.log(newTodoTask);

    // Add the new Todo Task to Array
    todoTaskArray.push(newTodoTask);

    // Save todoTaskArray to the Local Storage
    customLocalStorage.saveArrayToLocalStorage(todoTaskArray, "todoTaskArray");

    // Render todoTaskArray from the Local Storage (after Adding a new Todo Task)
    renderTodoTaskArray(todoTaskArray);
}

/**
 * This function helps to render todoTaskArray in a certain format
 */
function renderTodoTaskArray(todoTaskArray) {
    var contentHtmlCompletedTask = "";
    var contentHtmlUncompletedTask = "";
    for (var index = 0; index < todoTaskArray.length; index++) {
        if (todoTaskArray[index].todoTaskStatus === "todo"){
            contentHtmlUncompletedTask += `
            <li>
                    <span>${todoTaskArray[index].todoTaskContent}</span>
                    <div class="buttons">
                        <button class="remove" data-index="${index}" onclick="deleteTodoTask(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}" onclick="completeToDo(event)" >
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
        } else {
            contentHtmlCompletedTask += `
            <li>
                    <span>${todoTaskArray[index].todoTaskContent}</span>
                    <div class="buttons">
                        <button class="remove" data-index="${index}" onclick="deleteTodoTask(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}" onclick="completeToDo(event)" >
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
        }
        
    }
    document.getElementById("todo").innerHTML = contentHtmlUncompletedTask;
    document.getElementById("completed").innerHTML = contentHtmlCompletedTask;
}

const deleteTodoTask = (e)=>{
    console.log("remove click");
    var indexDel = e.currentTarget.getAttribute("data-index");
    for (var index = 0; index < todoTaskArray.length; index++) {

        if (todoTaskArray[index].todoTaskContent === todoTaskContent) {
            indexDel = index;
            break; 
        }
    }
    console.log(indexDel);
    todoTaskArray.splice(indexDel, 1);

    // Save todoTaskArray to the Local Storage
    customLocalStorage.saveArrayToLocalStorage(todoTaskArray, "todoTaskArray");

    renderTodoTaskArray(todoTaskArray);
}
window.deleteTodoTask = deleteTodoTask;

// function deleteTodoTask() {
//     console.log("remove click");
//     var indexDel = event.currentTarget.getAttribute("data-index");
//     for (var index = 0; index < todoTaskArray.length; index++) {

//         if (todoTaskArray[index].todoTaskContent === todoTaskContent) {
//             indexDel = index;
//             break; 
//         }
//     }
//     todoTaskArray.splice(index, 1);

//     // Save todoTaskArray to the Local Storage
//     customLocalStorage.saveArrayToLocalStorage(todoTaskArray, "todoTaskArray");

//     renderTodoTaskArray(todoTaskArray);
// }

// function deleteTodoTask(todoTaskContent) {
//     console.log("remove click");
//     var indexDel = -1; 
//     for (var index = 0; index < todoTaskArray.length; index++) {

//         if (todoTaskArray[index].todoTaskContent === todoTaskContent) {
//             indexDel = index;
//             break; 
//         }
//     }
//     todoTaskArray.splice(index, 1);

//     // Save todoTaskArray to the Local Storage
//     customLocalStorage.saveArrayToLocalStorage(todoTaskArray, "todoTaskArray");

//     renderTodoTaskArray(todoTaskArray);
// }

// document.querySelector(".remove").onclick = function (event) {
//     console.log("remove click");
//     var indexDel = event.currentTarget.getAttribute("data-index");
//     for (var index = 0; index < todoTaskArray.length; index++) {

//         if (todoTaskArray[index].todoTaskContent === todoTaskContent) {
//             indexDel = index;
//             break; 
//         }
//     }
//     todoTaskArray.splice(index, 1);

//     // Save todoTaskArray to the Local Storage
//     customLocalStorage.saveArrayToLocalStorage(todoTaskArray, "todoTaskArray");

//     renderTodoTaskArray(todoTaskArray);
// }

const completeToDo = (e)=>{
    console.log("complete click");
    var indexDel = e.currentTarget.getAttribute("data-index");
    var newTodoTaskTemp;
    for (var index = 0; index < todoTaskArray.length; index++) {

        if (todoTaskArray[index].todoTaskContent === todoTaskContent) {
            indexDel = index;
            break; 
        }
    }

    if(todoTaskArray[indexDel].todoTaskStatus === "todo"){
        newTodoTaskTemp = new TodoTask(todoTaskArray[indexDel].todoTaskContent, "completed");
    } else{
        newTodoTaskTemp = new TodoTask(todoTaskArray[indexDel].todoTaskContent, "todo");
    }

    todoTaskArray.splice(indexDel, 1, newTodoTaskTemp);

    // Save todoTaskArray to the Local Storage
    customLocalStorage.saveArrayToLocalStorage(todoTaskArray, "todoTaskArray");

    renderTodoTaskArray(todoTaskArray);
}

window.completeToDo = completeToDo;

// function completeToDo(todoTaskContent) {
//     console.log("remove click");
//     var indexDel = -1; 
//     var newTodoTaskTemp;
//     for (var index = 0; index < todoTaskArray.length; index++) {

//         if (todoTaskArray[index].todoTaskContent === todoTaskContent) {
//             indexDel = index;
//             break; 
//         }
//     }

//     if(todoTaskArray[index].todoTaskStatus === "todo"){
//         newTodoTaskTemp = new TodoTask(todoTaskArray[index].todoTaskStatus, "completed");
//     } else{
//         newTodoTaskTemp = new TodoTask(todoTaskArray[index].todoTaskStatus, "todo");
//     }

//     todoTaskArray.splice(indexDel, 1, newTodoTaskTemp);

//     // Save todoTaskArray to the Local Storage
//     customLocalStorage.saveArrayToLocalStorage(todoTaskArray, "todoTaskArray");

//     renderTodoTaskArray(todoTaskArray);
// }

/**
 * This function helps to check if the input is duplicate with any elements of an array
 * @param {*} value Value input
 * @param {*} errId 
 * @param {*} array 
 * @returns 
 */
function checkDuplicateInput(value, errId, array) {
    var flagDuplicate = false;
    for (var index = 0; index < array.length; index++) {
        // Check with array containing TodoTask 
        if (value === array[index].todoTaskContent) {
            // Turn the flag on if there are any duplicates
            flagDuplicate = true;
            break;
        }
    }

    if (flagDuplicate) {
        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `${value} was already in the List!`;
        return false;
    }

    document.getElementById(errId).style.display = 'none';
    return true;
}

/**
 * This function remove all the Vietnamese Tones
 * @param {*} str String need to be re-formated
 * @returns New re-formated string
 */
function removeVietnameseTones(str) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
    str = str.replace(/??|??|???|???|??/g, "I");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
    str = str.replace(/???|??|???|???|???/g, "Y");
    str = str.replace(/??/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ?? ?? ??  ??, ??, ??, ??, ??
    // Remove extra spaces
    // B??? c??c kho???ng tr???ng li???n nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // B??? d???u c??u, k?? t??? ?????c bi???t
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " "
    );
    return str;
}