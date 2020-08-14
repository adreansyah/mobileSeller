import language from './language';
import validationList from './Rules';

export const validateInput = (targetForm, target, showError = true, scroll = false) => {
    const objForm = document.getElementById(targetForm);
    if (objForm) {
        const form = extractForm(objForm);
        const targetArr = Array.isArray(target) ? target : [target];
        const reValidate = targetArr.map((key) => {
            const data = findObj(targetForm, key);
            if (data) {
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
        showError && showErrorMessage(targetForm, reValidate, scroll);
        return result;
    } else return true;
}

export const validateForm = (targetForm, showError = true, scroll = true) => {
    const obj = document.getElementById(targetForm);
    const form = obj ? extractForm(obj.elements) : {};
    const reValidate = Object.entries(form).map(([name, obj]) => {
        return validateData(name, obj, form);
    });
    const result = reValidate.map(a => a.error).find((b) => {
        return b.length > 0;
    }) ? false : true;
    showError && showErrorMessage(targetForm, reValidate, scroll);
    return result;
}

export const validateInputClear = (targetForm, target) => {
    if (Array.isArray(target)) {
        hideErrorMessage(targetForm, target);
    } else {
        hideErrorMessage(targetForm, [target]);
    }
}

export const validateFormClear = (target) => {
    const obj = document.getElementById(target);
    const form = obj ? extractForm(obj.elements) : {};
    hideErrorMessage(target, form);
}

const getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

const findObj = (targetForm, targetField) => {
    let data = {};
    try {
        data =
            document.querySelector(`#${targetForm} input#${targetField}`) ? document.querySelector(`#${targetForm} input#${targetField}`)
                :
                document.querySelector(`#${targetForm} textarea[name="${targetField}"]`) ? document.querySelector(`#${targetForm} textarea[name="${targetField}"]`)
                    :
                    document.querySelector(`#${targetForm} select[name="${targetField}"]`) ? document.querySelector(`#${targetForm} select[name="${targetField}"]`)
                        :
                        document.querySelector(`#${targetForm} input[name="${targetField}"]`);
    }
    catch (err) {
        data =
            document.querySelector(`#${targetForm} textarea[name="${targetField}"]`) ? document.querySelector(`#${targetForm} textarea[name="${targetField}"]`)
                :
                document.querySelector(`#${targetForm} select[name="${targetField}"]`) ? document.querySelector(`#${targetForm} select[name="${targetField}"]`)
                    :
                    document.querySelector(`#${targetForm} input[name="${targetField}"]`);
    }
    return data;
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
                let getSize = '';

                if (fieldType === "file") {
                    getValue = obj[key].files[0] ? obj[key].files[0].name : (obj[key].getAttribute('data-file') || '');
                    getSize = obj[key].files[0] ? obj[key].files[0].size : obj[key].getAttribute('data-size') ? parseInt(obj[key].getAttribute('data-size')) : '';
                }
                else if ((fieldType === "radio" || fieldType === "checkbox")) {
                    if (form[getKey] && form[getKey].value.length > 0) {
                        getValue = form[getKey].value;
                    } else {
                        getValue = obj[key].checked ? obj[key].value : '';
                    }
                } else if (fieldType === "select-multiple") {
                    const selected = [...obj[key].options].filter((e) => (e.selected && e.value)).map((e) => e.value);
                    getValue = selected.length ? selected : '';
                } else {
                    getValue = obj[key].value;
                }

                const getRules = /validate\[(.*)\]/.exec(obj[key].className) ? /validate\[(.*)\]/.exec(obj[key].className)[1] : '';
                form[getKey] = {
                    'value': getValue,
                    'rules': getRules,
                    'size': getSize,
                    'type': fieldType
                }
            });
    return form;
}

const hideErrorMessage = (targetForm, obj) => {
    let list = [];
    if (Array.isArray(obj)) {
        list = obj;
    } else {
        list = Object.keys(obj);
    }
    //remove error message
    list.forEach(function (key) {
        const errorId = `error-${targetForm}-${key}`;
        const errorObj = document.getElementById(errorId);
        const dom = findObj(targetForm, key);
        //let currentElement = dom.closest('div.input-control') ? dom.closest('div.input-control') : '';
        let currentElementDiv = dom.closest('div.input-control div') ? dom.closest('div.input-control div') : '';

        if (currentElementDiv) {
            currentElementDiv.classList.replace('error', 'normal');
        }
        if (errorObj) {
            errorObj.classList.replace('u-tx-error', 'u-tx-normal');
            errorObj.innerHTML = '';
        }
    });
}

const showErrorMessage = (targetForm, obj, scroll = false) => {
    const objForm = document.getElementById(targetForm);

    if (objForm) {
        let scrollFocus = false;
        //generate error message
        Object.values(obj).forEach(function (data) {
            const errorId = `error-${targetForm}-${data.key}`;
            const errorObj = document.getElementById(errorId);
            const dom = findObj(targetForm, data.key);
            let currentElement = dom.closest('div.input-control') ? dom.closest('div.input-control') : '';
            let currentElementDiv = dom.closest('div.input-control div') ? dom.closest('div.input-control div') : '';

            if (data && data.error.length > 0) {
                //set autoscroll
                scrollFocus = !scrollFocus ? errorId : scrollFocus;

                var infoObj = document.createElement('span');
                infoObj.id = errorId;
                infoObj.className = 'form-helptext u-tx-error';
                infoObj.innerHTML = data.error;

                if (currentElement) {

                    if (['normal', 'error'].some(el => currentElementDiv.className.includes(el))) {
                        currentElementDiv.classList.replace('normal', 'error');
                    } else {
                        currentElementDiv.classList.add('error');
                    }

                    const nextElement = currentElement.nextElementSibling;

                    if (nextElement && nextElement.tagName.toLowerCase() === 'span' && ['form-helptext'].some(el => nextElement.className.includes(el))) {
                        if (!errorObj) {
                            nextElement.id = errorId;
                            nextElement.classList.replace('u-tx-normal', 'u-tx-error');
                            nextElement.innerHTML = data.error;
                        } else {
                            errorObj.classList.replace('u-tx-normal', 'u-tx-error');
                            errorObj.innerHTML = data.error;
                        }
                    } else {
                        currentElement.insertAdjacentHTML('afterend', infoObj.outerHTML)
                    }
                } else {
                    if (!errorObj) {
                        dom.insertAdjacentHTML('afterend', infoObj.outerHTML)
                    } else {
                        errorObj.classList.replace('u-tx-normal', 'u-tx-error');
                        errorObj.innerHTML = data.error;
                    }
                }

            } else {
                if (currentElementDiv) {
                    currentElementDiv.classList.replace('error', 'normal');
                }
                if (errorObj) {
                    errorObj.classList.replace('u-tx-error', 'u-tx-normal');
                    errorObj.innerHTML = '';
                }
            }
        });

        if (scroll && scrollFocus) {
            var element = document.getElementById(scrollFocus);
            element.scrollIntoView();
            element.scrollIntoView(true);
            element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
    }
}

const validateData = (name, obj, form) => {
    //get error language from cookie
    const errorLang = (getCookie('error_lang') || 'id');
    //set input form
    let error = false;
    let inputName = name.trim();
    let inputValue = obj.value;

    let entries = obj.rules.split(',');
    let validate = new validationList();

    for (const inputRules of entries) {
        let splitRule = inputRules.split(/\[|,|\]/);
        let rulesName = splitRule[0];
        let rulesExt = splitRule[1] ? splitRule[1] : '';

        if (typeof validate[rulesName] === 'function') {
            error = validate[rulesName]({ name: inputName, value: inputValue }, rulesExt, form);
            if (error !== false) {
                if (error === true) error = 0;
                try {
                    error = language(rulesExt)[errorLang][rulesName][error];
                } catch (e) {
                    error = '    ';
                }
                if (!error) error = '    ';
            } else error = '';
        }
        if (error.length !== 0) break;
    }

    return { key: inputName, error }
}