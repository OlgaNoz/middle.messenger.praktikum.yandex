export const isValidFormInput = (name: string, value: string) => {
    let regStr = '';
    let errorText = '';
    switch (name) {
        case "first_name":
        case "second_name":    
            regStr = '[A-ZА-ЯЁ]+[а-яa-z]*';
            errorText = 'Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
            break;
        case "login": 
            regStr = '(?![0-9_-]+$)[a-zA-Z0-9+_-]{3,20}';
            errorText = 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов';
            break;
        case "email":
            regStr = '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+';
            errorText = 'Некорректный email, строка должна содержать @';
            break;
        case "password":
            regStr = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,40}';
            errorText = 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
            break;  
        case "phone":
            regStr = '[\+]?[0-9]{10,15}';
            errorText = 'От 10 до 15 символов, состоит из цифр, может начинается с плюса';
            break;
        case "message":
            regStr = '^\.';
            break;          
        default:
            break;
    }

    const reg = new RegExp(regStr);

    const result = {
        valid: reg.test(value),
        errorText: errorText
    }
    
    return result;
}
