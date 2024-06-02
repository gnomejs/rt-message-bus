import type { Message } from "./message.ts";

export interface MessageSink {
    (message: Message): void;
}

export interface MessageBus {
    addListener(listener: MessageSink): void;
    removeListener(listener: MessageSink): void;
    send(message: Message): void;
}

export class DefaultMessageBus {
    private listeners: MessageSink[] = [];

    addListener(listener: MessageSink): void {
        this.listeners.push(listener);
    }

    removeListener(listener: MessageSink): void {
        const index = this.listeners.indexOf(listener);
        if (index >= 0) {
            this.listeners.splice(index, 1);
        }
    }

    send(message: Message): void {
        this.listeners.forEach((listener) => listener(message));
    }
}
