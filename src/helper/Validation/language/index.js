import id from './id';
import en from './en';

const errorMessage = (rule) => {
    return {
        id: id(rule),
        en: en(rule)
    }
}

export default errorMessage;