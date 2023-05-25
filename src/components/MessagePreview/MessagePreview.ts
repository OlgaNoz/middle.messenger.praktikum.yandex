import { Block, IComponentProps } from "../../core/Block";
import template from "./MessagePreview.hbs";
import "./MessagePreview.scss";

export interface IMessagePreview extends IComponentProps{
    id: number,
    contactUserName: string,
    contactUserChatName: string,
    contactUserChatMessage: string,
    contactUserChatTime: string,
    contactUserUnreadMessageCount: number,
}
export class MessagePreview extends Block<IMessagePreview> {
    constructor(props: IMessagePreview) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}


