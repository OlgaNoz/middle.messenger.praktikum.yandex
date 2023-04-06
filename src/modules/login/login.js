import userSignForm from "../../components/form/userSignForm";
import actionButton from "../../components/form/actionButton/actionButton"

const login = () => {
    const submitButton = actionButton({
        buttonType: "submit",
        buttonName: "Вход"
    });

    const loginInputComponents = [
        {
            type: "text",
            name: "login",
            placeholder: "Логин"
        },
        {
            type: "password",
            name: "password",
            placeholder: "Пароль"
        }
    ];

    const context = {
        formName: "Вход",
        loginInputComponents,
        submitButton,
        linkName: "Создать аккаунт"
    }
    return userSignForm(context);
}

export default login;