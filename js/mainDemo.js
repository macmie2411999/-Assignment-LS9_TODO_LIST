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
todoUncompletedTaskArray = customLocalStorage.getArrayFromLocalStorage("todoUncompletedTaskArray");
todoCompletedTaskArray = customLocalStorage.getArrayFromLocalStorage("todoCompletedTaskArray");

// MAIN PART
// Render todoTaskArray from the Local Storage every time go to the website
renderAllTodoTask();

// Set event for button Add-Todo-Task
document.querySelector('#addItem').onclick = function () {

    // Get the input
    todoTaskContent = document.querySelector('#newTask').value;

    // Standardise the input
    todoTaskContent = removeVietnameseTones(todoTaskContent);

    // Check if input valid (not null nor duplicate)
    valid = validation.checkNullInput(todoTaskContent, 'message-null-input', "Todo Task Content") &
        checkDuplicateInput(todoTaskContent, 'message-null-input', todoUncompletedTaskArray);
    if (!valid) {
        return;
    }

    // Create new TodoTask and set the valid standardised input to todoTaskContent
    // Default value for the Status of new TodoTask is "todo" (not yet completed)
    var newTodoTask = new TodoTask(todoTaskContent, "todo");
    console.log(newTodoTask);

    // Add the new Todo Task to Array
    todoUncompletedTaskArray.push(newTodoTask);

    // Save todoTaskArray to the Local Storage
    customLocalStorage.saveArrayToLocalStorage(todoUncompletedTaskArray, "todoUncompletedTaskArray");

    // Render todoTaskArray from the Local Storage (after Adding a new Todo Task)
    renderAllTodoTask();
}

document.querySelector(".remove").onclick = function (event) {
    var indexOfTodoTask = event.currentTarget.getAttribute("data-index");
    var statusOfTodoTask = event.currentTarget.getAttribute("data-status");
    if (statusOfTodoTask == "todo") {
        todoUncompletedTaskArray.splice(indexOfTodoTask, 1);
    } else if (statusOfTodoTask == "completed") {
        todoCompletedTaskArray.splice(indexOfTodoTask, 1);
    }
    renderAllTodoTask();
}

document.querySelector(".complete").onclick = function (event) {
    var indexOfTodoTask = event.currentTarget.getAttribute("data-index");
    var statusOfTodoTask = event.currentTarget.getAttribute("data-status");
    if (statusOfTodoTask == "todo") {
        todoUncompletedTaskArray.splice(indexOfTodoTask, 1);
        todoCompletedTaskArray.push(new TodoTask(statusOfTodoTask, "completed"))
    } else if (statusOfTodoTask == "completed") {
        todoCompletedTaskArray.splice(indexOfTodoTask, 1);
        todoUncompletedTaskArray.push(new TodoTask(statusOfTodoTask, "todo"))
    }
    renderAllTodoTask();
}

/**
 * This function helps to render todoTaskArray in a certain format
 * @param {*} todoTaskArray Array needs to be rendered
 * @param {*} typeArray Position to be rendered (ID TodoTask)
 */
function renderTodoTaskArray(todoTaskArray, typeArray) {
    var contentHTML = "";
    for (var index = 0; index < todoTaskArray.length; index++) {
        contentHTML += `
            <li>
                <span>${todoTaskArray[index].todoTaskContent}</span>
                <div class="buttons">
                    <button class="remove" data-index="${index}" data-status="${todoTaskArray[index].todoTaskStatus}">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" data-index="${index}"  data-status="${todoTaskArray[index].todoTaskStatus}" >
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>`;
    }
    document.getElementById(typeArray).innerHTML = contentHTML;
}

/**
 * This function helps to render all Todo Task
 */
function renderAllTodoTask() {
    renderTodoTaskArray(todoUncompletedTaskArray, "todo");
    renderTodoTaskArray(todoCompletedTaskArray, "completed");
}

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
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " "
    );
    return str;
}