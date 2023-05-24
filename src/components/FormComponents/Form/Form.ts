import { isValidFormInput } from "../../../common/scripts/FormValidation";
import { Block, IComponentProps } from "../../../core/Block";
import { ActionButton } from "../../ActionButton/ActionButton";
import { Link } from "../../Link/Link";
import { InputWithMessage } from "../InputWithMessage/InputWithMessage";
import template from "./Form.hbs";

export interface IFormProps extends IComponentProps {
    url: string;
    inputComponents: InputWithMessage[];
    buttons: (ActionButton | Link)[];
    submit: () => void;
}

export class Form extends Block<IFormProps> {
    _inputComponents: InputWithMessage[];

    constructor(props: IFormProps) {
        super(props);

        this._inputComponents = props.inputComponents;
    }

    protected init(): void {
        this.setProps({
            events: {
                submit: (event: MouseEvent) => {
                    event.preventDefault();
                    this.submitButtonClick();
                }
            }
        })
    }

    submitButtonClick() {
        const validationResult = this.formValidation();
        if (validationResult) {
            this.props.submit();
        }
    }

    formValidation() {
        const formInputValues = this.getFormInputValues();
        let validationResult = true;
        formInputValues.forEach(element => {
            const { name, value } = element;
            const validation = isValidFormInput(name, value);
            if (value !== "" && !validation.valid || value === "") {
                this.setValidInput(name, true, validation.errorText);
                validationResult = validationResult && false;
            } else {
                this.setValidInput(name, false, "");
                validationResult = validationResult && true;
            }
        });
        return validationResult;
    }

    getFormInputValues() {
        return this._inputComponents.map(element => {
            return {
                name: element.input.getInputName(),
                value: element.input.getInputValue()
            };
        });
    }

    setValidInput(name: string, value: boolean, errorText: string) {
        const input = this._inputComponents.find(element => element.input.getInputName() === name);
        if (input) {
            input.setProps({
                value: input.input.getInputValue(),
                invalid: value,
                errorText,
            })
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
