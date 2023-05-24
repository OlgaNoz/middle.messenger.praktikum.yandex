import { EventBus } from './EventBus';

export enum WSEvents {
    Connected = 'connected',
    Error = 'error',
    Message = 'message',
    Close = 'close',
}

export default class WebSockets extends EventBus {
    private socket: WebSocket;
    private url = ""

    constructor(url: string) {
        super();
        this.url = url;
    }

    public send(data: unknown) {
        if (!this.socket) {
            throw new Error('Socket is not connected');
        }

        this.socket.send(JSON.stringify(data))

        return new Promise((resolve) => {
            this.on(WSEvents.Message, (message: unknown) => {
                resolve(message);
            });
        });
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(this.url);

        this.subscribe();

        return new Promise((resolve) => {
            this.on(WSEvents.Connected, () => {
                resolve();
            });
        });
    }

    public close() {
        this.socket?.close();
    }

    private subscribe() {
        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this.emit(WSEvents.Connected)
        });
    
        this.socket.addEventListener('close', () => {
        // this.emit(WSEvents.Close)
        });

        this.socket.addEventListener('error', (e) => {
        //this.emit(WSEvents.Error, e)
        });

        this.socket.addEventListener('message', (message) => {
            const data = JSON.parse(message.data);
            this.emit(WSEvents.Message, data)
        });
    }
}
