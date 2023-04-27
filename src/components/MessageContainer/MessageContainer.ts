import { isValidFormInput } from "../../common/scripts/FormValidation";
import { Block, IComponentProps } from "../../core/Block";
import { ActionButton } from "../ActionButton/ActionButton";
import { AvatarButton } from "../AvatarButton/AvatarButton";
import { FormInput } from "../FormComponents/FormInput/FormInput";
import { IMessageProps, Message } from "../Message/Message";
import messageContainer from "./MessageContainer.hbs"
import "./MessageContainer.scss";

export interface IMessageContainer extends IComponentProps {
    contactUserName: string;
    contactUserChatName: string;
    messages: IMessageProps[];
    hideChat: boolean;
}

export class MessageContainer extends Block<IMessageContainer> {
    private typeInput: FormInput;
    constructor(props: IMessageContainer) {
        super(props);

        this.typeInput = new FormInput({
            placeholder: "Введите сообщение...",
            type: "text",
            name: "message",
            classNames: ['user-search-field'],
            events: {
                keydown: (ev: KeyboardEvent ) => {
                    if (ev.key === "Enter") {
                        if (isValidFormInput(this.typeInput.getInputName() || "", this.typeInput.getInputValue())) {
                            this.sendNewMessage();
                        } 
                    }
                }
            }
        });
    }

    protected init(): void {

        this.children.typeInput = this.typeInput;

        this.children.contactUserChatButton = new AvatarButton({});

        this.children.deleteChatButton = new ActionButton({
            buttonName: '<div class="icon-trash"></div>',
            classNames: ["icon-transparent"],
            buttonType: "button"
        });

        this.children.chatMessages = this.props.messages.map(message => {
            return new Message(message);
        });
    }

    protected sendNewMessage() {
        const currDate = new Date();
        const time = currDate.getHours() + ':' + currDate.getMinutes();
        const value = this.typeInput.getInputValue() || "";
        this.props.messages.push({
            isOutgoing: true,
            contactUserChatMessage: value,
            contactUserChatTime: time.toString()
        })
        this.setProps({
            messages: this.props.messages
        });
        this.typeInput.setInputValue("");
    }

    protected componentDidUpdate(oldProps: IMessageContainer, newProps: IMessageContainer): boolean {    
        this.children.chatMessages = this.props.messages.map(message => {
            return new Message(message);
        });

        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(messageContainer, {...this.props});
    }
}
