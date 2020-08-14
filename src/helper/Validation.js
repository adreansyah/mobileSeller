const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const patternPhone = /^08[0-9]+$/;
const patternAlphaNumeric = /^[0-9a-zA-Z]+$/;
const patternAlphaNumericSp = /^[0-9a-zA-Z \n]+$/;
const patternDecimal = /^\d+(\.\d{1,3})?$/;
const patternNumber = /^[0-9]+$/;
const patternNumberSp = /^[0-9 ]+$/;
const patternLetter = /^[a-zA-Z]+$/;
const patternLetterSp = /^[a-zA-Z ]+$/;
const patternNpwp = /^(\d{2})\.(\d{3})\.(\d{3})\.(\d{1})-(\d{3})\.(\d{3})$/i;
const patternPassword = /^(?=[^\s]*?[0-9])(?=[^\s]*?[a-zA-Z])[a-zA-Z0-9]*$/;

export const validateInput = (target, showError = true) => {
    const targetArr = Array.isArray(target) ? target : [target];
    const reValidate = targetArr.map((key) => {
        const data = document.getElementById(key) ? document.getElementById(key) : document.getElementsByName(key)[0];
        if (data) {
            const form = extractForm(data.closest('form'));
            const getKey = data.name;
            const fieldType = data.type;
            let getValue = '';
            if (fieldType === "file") {
                getValue = data.files[0] ? data.files[0].name : data.getAttribute('data-file');
            }
            else if ((fieldType === "radio" || fieldType === "checkbox")) {
                if (form[getKey] && form[getKey].value.length > 0) {
                    getValue = form[getKey].value;
                } else {
                    getValue = data.checked ? data.value : '';
                }
            } else {
                getValue = data.value;
            }
            const getRules = /validate\[(.*)\]/.exec(data.className) ? /validate\[(.*)\]/.exec(data.className)[1] : '';
            const obj = {
                'value': getValue,
                'rules': getRules
            }
            return validateData(getKey, obj, form)
        } else return false;
    });
    const result = reValidate.map(a => a.error ? a.error : '').find((b) => {
        return b.length > 0;
    }) ? false : true;
    showError && showErrorMessage(reValidate, false);
    return result;
}

export const validateForm = (target, showError = true) => {
    const obj = document.getElementById(target);
    const form = obj ? extractForm(obj.elements) : {};
    const reValidate = Object.entries(form).map(([name, obj]) => {
        return validateData(name, obj, form);
    });
    const result = reValidate.map(a => a.error).find((b) => {
        return b.length > 0;
    }) ? false : true;
    showError && showErrorMessage(reValidate, true);
    return result;
}

export const validateInputClear = (target) => {
    if (Array.isArray(target)) {
        hideErrorMessage(target);
    } else {
        hideErrorMessage([target]);
    }
}

export const validateFormClear = (target) => {
    const obj = document.getElementById(target);
    const form = obj ? extractForm(obj.elements) : {};
    hideErrorMessage(form);
}

const extractForm = (obj) => {
    const form = {};
    if (obj)
        Object.keys(obj)
            .filter(key => obj[key].name && !obj[key].disabled)
            .forEach(key => {
                const getKey = obj[key].name;
                const fieldType = obj[key].type;
                let getValue = '';
                if (fieldType === "file") {
                    getValue = obj[key].files[0] ? obj[key].files[0].name : obj[key].getAttribute('data-file');
                }
                else if ((fieldType === "radio" || fieldType === "checkbox")) {
                    if (form[getKey] && form[getKey].value.length > 0) {
                        getValue = form[getKey].value;
                    } else {
                        getValue = obj[key].checked ? obj[key].value : '';
                    }
                } else {
                    getValue = obj[key].value;
                }
                const getRules = /validate\[(.*)\]/.exec(obj[key].className) ? /validate\[(.*)\]/.exec(obj[key].className)[1] : '';
                form[getKey] = {
                    'value': getValue,
                    'rules': getRules
                }
            });
    return form;
}

const hideErrorMessage = (obj) => {
    let list = [];
    if (Array.isArray(obj)) {
        list = obj;
    } else {
        list = Object.keys(obj);
    }
    //remove error message
    list.forEach(function (key) {
        const errorId = '3L3vEr0R-' + key
        const errorObj = document.getElementById(errorId);
        const dom = document.getElementsByName(key);
        const domTarget = dom[0] ? dom[0].closest('div.input-group') : null;

        //remove red border
        if (domTarget) domTarget.classList.remove('form-group--error')
        if (errorObj) errorObj.parentNode.removeChild(errorObj)
    });
}

const showErrorMessage = (obj, scroll = false) => {
    let scrollFocus = false;
    //generate error message
    Object.values(obj).forEach(function (data) {
        const errorId = '3L3vEr0R-' + data.key;
        const errorObj = document.getElementById(errorId);
        const dom = document.getElementsByName(data.key);
        const domTarget = dom[0] ? dom[0].closest('div.input-group') : null;

        if (data && data.error.length > 0) {
            //add red border
            if (domTarget) domTarget.classList.add('form-group--error')
            scrollFocus = !scrollFocus ? errorId : scrollFocus;
            if (!errorObj) {
                var infoObj = document.createElement('p');
                infoObj.id = errorId;
                infoObj.className = 'u-tx-danger form-group__helptext';
                infoObj.innerHTML = data.error;
                if (domTarget) {
                    domTarget.insertAdjacentHTML('afterend', infoObj.outerHTML)
                }
                else if (dom[0]) dom[0].insertAdjacentHTML('afterend', infoObj.outerHTML)
            } else {
                errorObj.className = 'u-tx-danger form-group__helptext';
                errorObj.innerHTML = data.error;
            }
        } else {
            //remove red border
            if (domTarget) domTarget.classList.remove('form-group--error')

            if (errorObj) errorObj.parentNode.removeChild(errorObj)
        }
    });

    if (scroll && scrollFocus) {
        var element = document.getElementById(scrollFocus);
        element.scrollIntoView();
        element.scrollIntoView(true);
        element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
}

const validateData = (name, obj, form) => {
    //set input form
    let error = '';
    let inputName = name.trim();
    let inputValue = obj.value;

    let entries = obj.rules.split(',');
    let validate = new validationList();

    for (const inputRules of entries) {
        let splitRule = inputRules.split(/\[|,|\]/);
        let rulesName = splitRule[0];
        let rulesExt = splitRule[1] ? splitRule[1] : '';

        if (typeof validate[rulesName] === 'function') {
            error = validate[rulesName](inputValue, rulesExt, form);
        }
        if (error.length !== 0) break;
    }

    return { key: inputName, error }
}

class validationList {
    required = (value) => {
        let error = '';
        if (value.length === 0) {
            error = 'Harus diisi';
        }
        return error;
    }

    email = (value) => {
        let error = '';
        if (!patternEmail.test(value) && value) {
            error = 'Format email tidak benar';
        }
        return error;
    }

    length = (value, rule) => {
        let error = '';
        if (value.length !== (rule * 1) && value) {
            error = 'Panjang harus ' + rule + ' karakter';
        }
        return error;
    }

    minLength = (value, rule) => {
        let error = '';
        if (value.length < (rule * 1) && value) {
            error = 'Minimum ' + rule + ' karakter yang dibutuhkan';
        }
        return error;
    }

    maxLength = (value, rule) => {
        let error = '';
        if (value.length > (rule * 1) && value) {
            error = 'Maksimal ' + rule + ' karakter yang dibutuhkan';
        }
        return error;
    }

    minValue = (value, rule) => {
        let error = '';
        if ((parseInt(value) < (rule * 1) || isNaN(value)) && value) {
            error = 'Nilai minimum adalah ' + rule;
        }
        return error;
    }

    maxValue = (value, rule) => {
        let error = '';
        if ((parseInt(value) > (rule * 1) || isNaN(value)) && value) {
            error = 'Nilai maksimum adalah ' + rule;
        }
        return error;
    }

    equals = (value, rule, form) => {
        let targetForm = form[rule];
        let error = '';
        if (targetForm) {
            const targetValue = targetForm.value;
            if (value !== targetValue) {
                error = 'Bidang tidak cocok';
            }
        }
        return error;
    }

    matches = (value, rule) => {
        let error = '';
        if (value !== rule && value) {
            error = 'Bidang tidak benar';
        }
        return error;
    }


    phone = (value) => {
        let error = '';
        if (!patternPhone.test(value) && value) {
            error = 'Nomor ponsel salah';
        }
        return error;
    }

    alphaNumeric = (value) => {
        let error = '';
        if (!patternAlphaNumeric.test(value) && value) {
            error = 'Hanya boleh alphanumeric';
        }
        return error;
    }

    alphaNumericSp = (value) => {
        let error = '';
        if (!patternAlphaNumericSp.test(value) && value) {
            error = 'Karakter yang di perbolehkan adalah Huruf dan Angka';
        }
        return error;
    }

    decimal = (value) => {
        let error = '';
        if (!patternDecimal.test(value) && value) {
            error = 'Haya boleh desimal (3 digit dibelakang koma)';
        }
        return error;
    }

    number = (value) => {
        let error = '';
        if (!patternNumber.test(value) && value) {
            error = 'Hanya boleh angka';
        }
        return error;
    }

    numberSp = (value) => {
        let error = '';
        if (!patternNumberSp.test(value) && value) {
            error = 'Hanya boleh angka dan spasi';
        }
        return error;
    }

    letter = (value) => {
        let error = '';
        if (!patternLetter.test(value) && value) {
            error = 'Hanya boleh huruf';
        }
        return error;
    }

    letterSp = (value) => {
        let error = '';
        if (!patternLetterSp.test(value) && value) {
            error = 'Hanya boleh huruf dan spasi';
        }
        return error;
    }

    npwp = (value) => {
        let error = '';
        if (!patternNpwp.test(value) && value) {
            error = 'Format npwp salah';
        }
        return error;
    }

    passwordFormat = (value) => {
        let error = '';
        if (this.minLength(value, 6) || this.maxLength(value, 32)) {
            error = 'Silahkan masukkan password dengan 6-32 karakter';
        } else if (!patternPassword.test(value)) {
            error = 'Gunakan kombinasi huruf & angka';
        }
        return error;
    }
}