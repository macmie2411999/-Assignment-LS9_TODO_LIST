var validation = {
    checkNullInput: function (value, errId, name) {
        if (value.trim() === '') {
            document.getElementById(errId).style.display = 'block';
            document.getElementById(errId).innerHTML = `${name} is Null!`;
            return false;
        }

        document.getElementById(errId).style.display = 'none';
        return true;
    },

    checkLetterInput: function (value, errId, name) {
        var regexLetter = /^[A-Za-z]+$/;
        if (regexLetter.test(value)) {
            document.getElementById(errId).style.display = 'none';
            return true;
        }

        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `${name} must be letter!`;
        return false;
    },

    checkEmailInput: function (value, errId, name) {
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexEmail.test(value)) {
            document.getElementById(errId).style.display = 'none';
            return true;
        }

        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `${name} not true to form!`;
        return false;
    },

    checkNumberInput: function (value, errId, name) {
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            document.getElementById(errId).style.display = 'none';
            return true;
        }

        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `${name} not true to form!`;
        return false;
    },

    checkLengthInput: function (value, errId, name, minLength, maxLength) {
        if (value.length > maxLength || value.length < minLength) {
            document.getElementById(errId).style.display = 'block';
            document.getElementById(errId).innerHTML = `${name} from ${minLength} to ${maxLength}letters`;
            return false;
        }
        document.getElementById(errId).style.display = 'none';
        return true;
    }

}