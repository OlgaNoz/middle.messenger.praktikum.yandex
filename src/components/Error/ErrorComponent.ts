import { Block, IComponentProps } from "../../core/Block";
import { ActionButton } from "../ActionButton/ActionButton";
import errorTemplate from "./ErrorComponent.hbs";
import "./ErrorComponent.scss";

export interface IErrorProps extends IComponentProps {
    errorCode: string;
    errorText: string;
}

export class ErrorComponent extends Block<IErrorProps> {
    constructor(props: IErrorProps) {
        super(props);
    }

    protected init(): void {
        this.children.backButton = new ActionButton({
            buttonName: "Назад к списку чатов",
            buttonType: "button",
            classNames: ["error-back-button"]
        })
    }
    
    render() {
        return this.compile(errorTemplate, { ...this.props });
    }
}
