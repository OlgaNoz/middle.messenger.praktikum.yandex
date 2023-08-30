import { ISignUpRequest } from "../../API/AuthApi";
import { ChatController } from "../../controllers/ChatController";
import { UserController } from "../../controllers/UserController";
import { Block } from "../../core/Block";
import { connect } from "../../core/Store";
import { ChatUser } from "../ChatUser/ChatUser";
import { FormInput } from "../FormComponents/FormInput/FormInput";
import { SearchUser } from "../SearchUser/SearchUser";
import template from "./ChatSettingsContent.hbs";
import "./ChatSettingsContent.scss"

export interface IChatUser extends ISignUpRequest {
    avatar: string,
    id: number,
    role: string,
}

export interface IChatSettingsModalContentProps {
    chatUsers: IChatUser[],
    foundUsers: IChatUser[]
    id: number,
}

const userController = new UserController();
const chatController = new ChatController();

class ChatSettingsContentComponent extends Block<IChatSettingsModalContentProps> {
    protected init(): void {
        this.children.newUserInput = new FormInput({
            type: "text",
            placeholder: "Добавить пользователя",
            events: {
                keyup: (ev: KeyboardEvent) => {
                    const value = (ev.target as HTMLInputElement).value;
                    userController.getUsersByLogin(value);
                }
            }
        });

        this.children.chatUsers = this.createChatUsersComponent(this.props.chatUsers);
        this.children.foundUsers = this.createSearchUsersComponent(this.props.foundUsers);
    }

    createChatUsersComponent(chatUsers: IChatUser[] | undefined) {
        if (!chatUsers) {
            return [];
        } else {
            return chatUsers.map((user) => {
                return new ChatUser({
                    id: user.id,
                    login: user.login,
                    clickRemove: () => {
                        chatController.deleteUserFromChat(user.id, this.props.id)
                    },
                });
            });
        }
    }

    createSearchUsersComponent(foundUsers: IChatUser[] | undefined) {
        if (!foundUsers) {
            return [];
        } else {
            return foundUsers.map((user) => {
                return new SearchUser({
                    id: user.id,
                    login: user.login,
                    events: {
                        click: () => {
                            chatController.addUsersToChat(user.id, this.props.id);
                        }
                    }
                });
            });
        }
    }

    protected componentDidUpdate(_oldProps: IChatSettingsModalContentProps, _newProps: IChatSettingsModalContentProps): boolean {
        this.children.chatUsers = this.createChatUsersComponent(_newProps.chatUsers);

        this.children.foundUsers = this.createSearchUsersComponent(_newProps.foundUsers);

        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}

const withChatUsers = connect((state) => {
    const chatUsers = state.chatUsers;
    const foundUsers = state.foundUsers;

    if (!chatUsers) {
        return {
            foundUsers: undefined,
            chatUsers: undefined,
        };
    }
  
    return {
        foundUsers: foundUsers,
        chatUsers: chatUsers
    };
});

export const ChatSettingsContent = withChatUsers(ChatSettingsContentComponent);
