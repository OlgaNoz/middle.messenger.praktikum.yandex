import { ChatController } from "../../controllers/ChatController";
import { Block, IComponentProps } from "../../core/Block";
import { ActionButton } from "../ActionButton/ActionButton";
import { FormInput } from "../FormComponents/FormInput/FormInput";
import template from "./AddChatModalContent.hbs"
import "./AddChatModalContent.scss"

const chatController = new ChatController();

export class AddChatModalContent extends Block<IComponentProps> {
    private _chatNameInput: FormInput;

    protected init(): void {
        this._chatNameInput = new FormInput({
            type: "text",
            placeholder: "Название чата",
        });

        this.children.newChatInput = this._chatNameInput;

        this.children.createChatButton = new ActionButton({
            buttonName: "Добавить",
            buttonType: "button",
            classNames: ["action-button", "submit-button"],
            events: {
                click: () => {
                    chatController.addNewChat(this._chatNameInput.getInputValue());
                }
            }
        })
    }
    
    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}
