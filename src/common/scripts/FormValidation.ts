export const isValidFormInput = (name: string, value: string) => {
    let regStr = '';
    switch (name) {
        case "first_name":
        case "second_name":    
            regStr = '[A-ZА-ЯЁ]+[а-яa-z]*';
            break;
        case "login": 
            regStr = '(?![0-9_-]+$)[a-zA-Z0-9+_-]{3,20}';
            break;
        case "email":
            regStr = '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+';
            break;
        case "password":
            regStr = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,40}';
            break;  
        case "phone":
            regStr = '[\+]?[0-9]{10,15}';
            break;
        case "message":
            regStr = '^\.';
            break;          
        default:
            break;
    }

    const reg = new RegExp(regStr);
    return reg.test(value);
}
