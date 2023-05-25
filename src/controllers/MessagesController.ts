import Store from "../core/Store";
import WebSockets, { WSEvents } from "../core/WebSockets";

export interface IMessage {
    time: string,
    user_id: number,
    content: string,
}

export class MessagesController {
    private socket: WebSockets;

    public connect(chat: number, user: number, token: string){
        this.socket = new WebSockets(`wss://ya-praktikum.tech/ws/chats/${user}/${chat}/${token}`);

        this.socket.on(WSEvents.Message, (result: unknown) => {
            const messages = result as IMessage | IMessage[]
            this.messageUpdated(messages)
        });

        this.socket.connect().then(() => {
            this.getMessages();
        });
    }

    public sendMessage(message: string) {
        this.socket.send({
            type: 'message',
            content: message,
        });
    }

    public messageUpdated(messages: IMessage | IMessage[]) {
        let messagesToAdd: IMessage[] = [];

        if (Array.isArray(messages)) {
            messagesToAdd = messages.reverse();
        } else {
            if (messages.user_id)
                messagesToAdd.push(messages);
        }

        const currentMessages = (Store.getState().messages || []) as IMessage[];

        messagesToAdd = [...currentMessages, ...messagesToAdd];

        Store.set('messages', messagesToAdd);
    }

    public getMessages() {
        this.socket.send({type: 'get old', content: '0'});
    }
}
