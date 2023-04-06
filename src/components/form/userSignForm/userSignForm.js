import template from "./userSignForm.hbs";
import formInput from "../formInput";

const userSignForm = (context) => {
    const signFormContext = {
        formName: context.formName,
        loginInputComponents: context.loginInputComponents.map(item => (
            `<li class="input-item">${formInput(item)}</li>`
        )),
        submitButton: context.submitButton,
        linkName: context.linkName
    }
    return template(signFormContext);
}

export default userSignForm;