export interface Callable {
    [key: string]: Array<Function>;
}

export class EventBus {
    private _listeners: Callable;

    constructor() {
        this._listeners = {};
    }

    on(event: string, callback: Function) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(callback);
    }

    off(event: string, callback: () => {}) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this._listeners[event] = this._listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit<T>(event: string, ...args: T[]) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        const callbacks = this._listeners[event];
        callbacks.forEach(listener => listener(...args));
    }
}
