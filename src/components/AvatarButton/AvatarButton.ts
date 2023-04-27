import { Block, IComponentProps } from "../../core/Block";
import avatar from "./AvatarButton.hbs";
import "./AvatarButton.scss"

export class AvatarButton extends Block<IComponentProps> {
    protected render(): DocumentFragment {
        return this.compile(avatar, {});
    }
}
