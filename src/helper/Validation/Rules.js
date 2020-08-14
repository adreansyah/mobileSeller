const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const patternPhone = /^08[0-9]+$/;
const patternLetterNumber = /^[0-9a-zA-Z]+$/;
const patternLetterNumberSp = /^[0-9a-zA-Z \n]+$/;
const patternDecimal = /^\d+(\.\d{1,3})?$/;
const patternNumber = /^[0-9]+$/;
const patternNumberSp = /^[0-9 ]+$/;
const patternLetter = /^[a-zA-Z]+$/;
const patternLetterSp = /^[a-zA-Z ]+$/;
const patternNpwp = /^(\d{2})\.(\d{3})\.(\d{3})\.(\d{1})-(\d{3})\.(\d{3})$/i;
const patternPassword = /^(?=[^\s]*?[0-9])(?=[^\s]*?[a-zA-Z])[a-zA-Z0-9]*$/;

export default class validationList {
    required = (input) => {
        let error = false;
        if (input.value.length === 0) {
            error = true;
        }
        return error;
    }

    email = (input) => {
        let error = false;
        if (!patternEmail.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    length = (input, rule) => {
        let error = false;
        if (input.value.length !== (rule * 1) && input.value) {
            error = true;
        }
        return error;
    }

    minLength = (input, rule) => {
        let error = false;
        if (input.value.length < (rule * 1) && input.value) {
            error = true;
        }
        return error;
    }

    maxLength = (input, rule) => {
        let error = false;
        if (input.value.length > (rule * 1) && input.value) {
            error = true;
        }
        return error;
    }

    minValue = (input, rule) => {
        let error = false;
        if ((parseFloat(input.value) < (rule * 1) || isNaN(input.value)) && input.value) {
            error = true;
        }
        return error;
    }

    maxValue = (input, rule) => {
        let error = false;
        if ((parseFloat(input.value) > (rule * 1) || isNaN(input.value)) && input.value) {
            error = true;
        }
        return error;
    }

    equals = (input, rule, form) => {
        let targetForm = form[rule];
        let error = false;
        if (targetForm) {
            if (input.value !== targetForm.value) {
                error = true;
            }
        }
        return error;
    }

    matches = (input, rule) => {
        let error = false;
        if (input.value !== rule && input.value) {
            error = true;
        }
        return error;
    }

    phone = (input) => {
        let error = false;
        if (!patternPhone.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    letterNumber = (input) => {
        let error = false;
        if (!patternLetterNumber.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    letterNumberSp = (input) => {
        let error = false;
        if (!patternLetterNumberSp.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    decimal = (input) => {
        let error = false;
        if (!patternDecimal.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    number = (input) => {
        let error = false;
        if (!patternNumber.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    numberSp = (input) => {
        let error = false;
        if (!patternNumberSp.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    letter = (input) => {
        let error = false;
        if (!patternLetter.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    letterSp = (input) => {
        let error = false;
        if (!patternLetterSp.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    npwp = (input) => {
        let error = false;
        if (!patternNpwp.test(input.value) && input.value) {
            error = true;
        }
        return error;
    }

    passwordFormat = (input) => {
        let error = false;
        let formatInput = { name: input.name, value: input.value };
        if (this.minLength(formatInput, 6) || this.maxLength(formatInput, 32)) {
            error = 0;
        } else if (!patternPassword.test(input.value)) {
            error = 1;
        }
        return error;
    }

    fileSize = (input, rule, form) => {
        let fileSize = form[input.name].size;
        let error = false;
        if (fileSize > parseFloat(rule) * 1024 * 1000) {
            error = true;
        }
        return error;
    }

    fileType = (input, rule) => {
        let ext = rule.split('|');
        let fileType = input.value.split('.').pop() || '';
        let error = false;
        if (!ext.includes(fileType)) {
            error = true;
        }
        return error;
    }
}