import template from "./userSettingsForm.hbs";
import formInput from "../../../../components/form/formInput";
import actionButton from "../../../../components/form/actionButton/actionButton";

const userSettingsForm = () => {
    const submitButton = actionButton({
        buttonType: "submit",
        buttonName: "Войти"
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
        formName: "Вход",
        loginInputComponents,
        submitButton
    }

    const settingsFormContext = {
        formName: "Информация",
        loginInputComponents: loginInputComponents.map(item => (
            `<li class="input-item"><label class="user-settings-label">${formInput(item)}</label></li>`
        )),
        submitButton: context.submitButton
    }
    return template(settingsFormContext);
}

export default userSettingsForm;