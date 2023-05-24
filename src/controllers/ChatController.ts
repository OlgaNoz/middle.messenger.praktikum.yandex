import { ChatAPI } from "../API/ChatApi";
import { prettyDateFormat } from "../common/scripts/Utils";
import { IChatUser } from "../components/ChatSettingsModal/ChatSettingsContent";
import { IMessagePreview } from "../components/MessagePreview/MessagePreview";
import Store from "../core/Store";
import { IUserInfo } from "./AuthController";
import { MessagesController } from "./MessagesController";

const chatApi = new ChatAPI();
const messagesController = new MessagesController();

export interface IChatResponse {
    id:	number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: any,
} 

export interface ITokenResponse {
    token: string;
}

export class ChatController {
    public async getChatList() {
        return chatApi.getChatList().then((result) => {
            const chatList = result as IChatResponse[];
            const chatPreviews = [] as IMessagePreview[];
            chatList.forEach(element => {
                chatPreviews.push({
                    id: element.id,
                    contactUserUnreadMessageCount: element.unread_count,
                    contactUserChatMessage: element.last_message?.content,
                    contactUserChatName: element.title,
                    contactUserChatTime: element.last_message?.time ? prettyDateFormat(element.last_message?.time) : "",
                    contactUserName: element.title[0]
                })
            });
            Store.set('chats', chatPreviews);
        });
    }

    public async addNewChat(chatName: string) {
        return chatApi.addNewChat(chatName).then(async () => {
            this.getChatList().then(() => {
                this.isOpenAddChatModal(false);
            });
        });
    }

    public getChatUsers(id: number) {
        return chatApi.getChatUsers(id).then((result) => {
            const chatUsers = (result as IChatUser[]).filter(x => x.role !== "admin");
            Store.set('chatUsers', chatUsers);
        })
    }

    public getChatUserInfo(chatId: number, userId: number) {
        this.getChatUsers(chatId).then((result) => {
            return (Store.getState().chatUsers as IChatUser[]).find(x => x.id === userId);
        })
    }

    public async selectChat(chat: IMessagePreview | undefined) {
        Store.set('chat', chat);
        Store.set('messages', []);
        if (chat?.id) {
            this.getChatUsers(chat.id);
            this.getToken(chat.id).then((result) => {
                const token = result as ITokenResponse;
                const user = Store.getState().currentUser as IUserInfo;
                messagesController.connect(chat.id, user.id, token.token);
            });
        }
    }

    public sendMessage(message: string) {
        messagesController.sendMessage(message);
    }

    public async deleteChat(id: number | undefined) {
        if (id) {
            chatApi.deleteChat(id).then(() => {
                this.getChatList().then(() => {
                    this.selectChat(undefined);
                });
            });
        }
    }

    public async deleteUserFromChat(user: number, chat: number) {
        chatApi.deleteUsersFromChat(user, chat).then(() => {
            this.getChatUsers(chat);
        });
    }

    public isOpenAddChatModal(isOpen: boolean) {
        Store.set("isActiveAddChatModal", isOpen);
    }

    public isOpenEditChatModal(isOpen: boolean) {
        Store.set("isActiveEditChatModal", isOpen);
    }

    public addUsersToChat(user: number, chat: number) {
        return chatApi.addUsersToChat(user, chat).then(() => {
            this.getChatUsers(chat);
        });
    }

    public clearEditModalValues() {
        Store.set('foundUsers', []);
    }

    public getToken(chat: number) {
        return chatApi.getChatToken(chat);
    }
}
