import { Block, IComponentProps } from "../../core/Block";
import { IChatUserProps } from "../ChatUser/ChatUser";
import template from "./SearchUser.hbs"

export class SearchUser extends Block<IChatUserProps> {
    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}
