var resultArray = [];
var customLocalStorage = {
    /**
     * This function helps to store Array
     * @param {*} arrayProvided An Array
     * @param {*} nameArrayProvided Set a name for the array
     */
    saveArrayToLocalStorage: function (arrayProvided, nameArrayProvided ) {
        // Stringify provided array (to String)
        var stringArrayProvided = JSON.stringify(arrayProvided);

        // Save stringified array to Local Storage
        localStorage.setItem(nameArrayProvided, stringArrayProvided);

        // Save stringified array to Cookies (5 is expire day to keep data in Cookies, Application -> Cookies )
        setCookie(nameArrayProvided, stringArrayProvided, 5);
    },

    /**
     * This function helps to get a stored Array
     * @param {*} nameArrayProvided Name of the stored Array
     * @returns An Array whose name matches nameArrayProvided
     */
    getArrayFromLocalStorage: function (nameArrayProvided) {
        // Check if localStorage have any Array whose name matches with nameArrayProvided
        if (localStorage.getItem(nameArrayProvided)) {
            var stringArrayProvided = localStorage.getItem(nameArrayProvided);
            resultArray = JSON.parse(stringArrayProvided);
        }
        return resultArray;
    }

}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}