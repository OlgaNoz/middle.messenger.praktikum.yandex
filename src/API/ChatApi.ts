import { BaseAPI } from "../core/BaseAPI";
import { HTTPTransport, Options } from "../core/HTTPTransport";

const chatApi = new HTTPTransport('/chats');

export class ChatAPI extends BaseAPI {
    getChatList() {
        return chatApi.get('');
    }

    addNewChat(chatName: string) {
        const options = {
            data: {
                title: chatName
            } 
        } as Options;
        return chatApi.post('', options)
    }

    getChatUsers(id: number) {
        return chatApi.get(`/${id}/users`);
    }

    deleteChat(id: number) {
        const options = {
            data: {
                chatId: id
            } 
        } as Options;
        return chatApi.delete('', options);
    }

    deleteUsersFromChat(user: number, chat: number) {
        const options = {
            data: {
                users: [user],
                chatId: chat
            } 
        } as Options;
        return chatApi.delete('/users', options)
    }

    addUsersToChat(user: number, chat: number) {
        const options = {
            data: {
                users: [user],
                chatId: chat
            } 
        } as Options;
        return chatApi.put('/users', options)
    }

    getChatToken(chat: number) {

        return chatApi.post(`/token/${chat}`, {})
    }
}
