import template from "./actionButtonTemplate.hbs"
import "./ActionButton.scss"
import { Block, IComponentProps } from "../../core/Block";

export interface IButtonProps extends IComponentProps {
    buttonType: string;
    buttonName: string;
}

export class ActionButton extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }
  
    render() {
        return this.compile(template, { ...this.props });
    }
}

