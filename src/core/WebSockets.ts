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

        this.addEvents();

        const interval = setInterval(() => {
            this.send({ type: 'ping' });
        }, 5000)
      
        this.on(WSEvents.Close, () => {
            clearInterval(interval);
        });

        return new Promise((resolve) => {
            this.on(WSEvents.Connected, () => {
                resolve();
            });
        });
    }

    public close() {
        this.socket?.close();
    }

    private addEvents() {
        this.socket.addEventListener('open', () => {
            this.emit(WSEvents.Connected)
        });
    
        this.socket.addEventListener('close', () => {
            this.emit(WSEvents.Close)
        });

        this.socket.addEventListener('message', (message) => {
            const data = JSON.parse(message.data);
            if (data.type && data.type === 'pong') {
                return;
            }
            this.emit(WSEvents.Message, data)
        });
    }
}
