import { UserController } from "../../controllers/UserController";
import { Block, IComponentProps } from "../../core/Block";
import { ActionButton } from "../ActionButton/ActionButton";
import { FormInput } from "../FormComponents/FormInput/FormInput";
import template from "./ChangePasswordModal.hbs";
import "./ChangePasswordModal.scss"

const userController = new UserController();

export class ChangePasswordModal extends Block<IComponentProps> {
    private _oldPasswordInput: FormInput;
    private _newPasswordInput: FormInput;

    protected init(): void {
        this._oldPasswordInput = new FormInput({
            type: "password",
            placeholder: "Старый пароль"
        }),

        this.children.oldPasswordInput = this._oldPasswordInput;

        this._newPasswordInput = new FormInput({
            type: "password",
            placeholder: "Новый пароль"
        }),

        this.children.newPasswordInput = this._newPasswordInput;

        this.children.changePasswordButton = new ActionButton({
            buttonName: "Сохранить",
            buttonType: "button",
            events: {
                click: () => {
                    userController.changeUserPassword(this._oldPasswordInput.getInputValue(), this._newPasswordInput.getInputValue());
                }
            }
        })
    }
    
    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}
