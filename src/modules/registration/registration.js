import userSignForm from "../../components/form/userSignForm";
import actionButton from "../../components/form/actionButton/actionButton"

const registration = () => {
    const submitButton = actionButton({
        buttonType: "submit",
        buttonName: "Создать аккаунт"
    });

    const loginInputComponents = [
        {
            type: "text",
            name: "first_name",
            placeholder: "Имя"
        },
        {
            type: "text",
            name: "second_name",
            placeholder: "Фамилия"
        },
        {
            type: "text",
            name: "login",
            placeholder: "Логин"
        },
        {
            type: "tel",
            name: "phone",
            placeholder: "Номер"
        },
        {
            type: "email",
            name: "email",
            placeholder: "Почта"
        },
        {
            type: "password",
            name: "password",
            placeholder: "Пароль"
        },
        {
            type: "password",
            name: "password",
            placeholder: "Подтверждение"
        }
    ];

    const context = {
        formName: "Регистрация",
        loginInputComponents,
        submitButton,
        linkName: "Назад"
    }
    return userSignForm(context);
}

export default registration;