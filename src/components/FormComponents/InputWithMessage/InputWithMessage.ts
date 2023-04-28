import { Block, IComponentProps } from "../../../core/Block";
import { FormInput } from "../FormInput/FormInput";
import template from "./InputWithMessage.hbs";
import "./InputWithMessage.scss"

export interface IInputWithMessage extends IComponentProps {
    input: FormInput;
    errorText?: string;
}

export class InputWithMessage extends Block<IInputWithMessage> {
    input: FormInput;

    constructor(props: IInputWithMessage) {
        super(props);
    }

    protected init(): void {
        this.input = this.children.input as FormInput;
    }

    setErrorText(error: string) {
        this.setProps({
            errorText: error,
        })
    }

    protected render(): DocumentFragment {
        return (this.compile(template, {...this.props}));
    }
}
