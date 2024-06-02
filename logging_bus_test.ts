import { DefaultLoggingMessageBus, LogLevel, LogMessage } from "./logging-bus.ts";
import { Message } from "./message.ts";
import { assertEquals as equals, assertInstanceOf } from "jsr:@std/assert@0.225.3";

export const loggingBus = new DefaultLoggingMessageBus();

Deno.test("send message", () => {
    const messages: Message[] = [];
    loggingBus.addListener((message) => {
        messages.push(message);
    });

    loggingBus.send(new Message("test"));

    equals(messages.length, 1);
    equals(messages[0].kind, "test");
});

Deno.test("send error", () => {
    const messages: Message[] = [];
    loggingBus.addListener((message) => {
        messages.push(message);
    });

    const error = new Error("test error");
    loggingBus.error(error, "test");

    equals(messages.length, 1);
    equals(messages[0].kind, "log");
    assertInstanceOf(messages[0], LogMessage);
    const logMessage = messages[0] as LogMessage;
    equals(logMessage.error, error);
    equals(logMessage.message, "test");
    equals(logMessage.level, LogLevel.Error);

    loggingBus.error("test");
    equals(messages.length, 2);
    equals(messages[1].kind, "log");
    assertInstanceOf(messages[1], LogMessage);
    const logMessage2 = messages[1] as LogMessage;
    equals(logMessage2.error, undefined);
    equals(logMessage2.message, "test");
    equals(logMessage2.level, LogLevel.Error);

    loggingBus.error("test", "arg1", "arg2");
    equals(messages.length, 3);
    equals(messages[2].kind, "log");
    assertInstanceOf(messages[2], LogMessage);
    const logMessage3 = messages[2] as LogMessage;
    equals(logMessage3.error, undefined);
    equals(logMessage3.message, "test");
    equals(logMessage3.level, LogLevel.Error);
    equals(logMessage3.args, ["arg1", "arg2"]);
});

Deno.test("send warn", () => {
    const messages: Message[] = [];
    loggingBus.addListener((message) => {
        messages.push(message);
    });

    const error = new Error("test error");
    loggingBus.warn(error, "test");

    equals(messages.length, 1);
    equals(messages[0].kind, "log");
    assertInstanceOf(messages[0], LogMessage);
    const logMessage = messages[0] as LogMessage;
    equals(logMessage.error, error);
    equals(logMessage.message, "test");
    equals(logMessage.level, LogLevel.Warn);

    loggingBus.warn("test");
    equals(messages.length, 2);
    equals(messages[1].kind, "log");
    assertInstanceOf(messages[1], LogMessage);
    const logMessage2 = messages[1] as LogMessage;
    equals(logMessage2.error, undefined);
    equals(logMessage2.message, "test");
    equals(logMessage2.level, LogLevel.Warn);

    loggingBus.warn("test", "arg1", "arg2");
    equals(messages.length, 3);
    equals(messages[2].kind, "log");
    assertInstanceOf(messages[2], LogMessage);
    const logMessage3 = messages[2] as LogMessage;
    equals(logMessage3.error, undefined);
    equals(logMessage3.message, "test");
    equals(logMessage3.level, LogLevel.Warn);
    equals(logMessage3.args, ["arg1", "arg2"]);
});

Deno.test("send info", () => {
    const messages: Message[] = [];
    loggingBus.addListener((message) => {
        messages.push(message);
    });

    const error = new Error("test error");
    loggingBus.info(error, "test");

    equals(messages.length, 1);
    equals(messages[0].kind, "log");
    assertInstanceOf(messages[0], LogMessage);
    const logMessage = messages[0] as LogMessage;
    equals(logMessage.error, error);
    equals(logMessage.message, "test");
    equals(logMessage.level, LogLevel.Info);

    loggingBus.info("test");
    equals(messages.length, 2);
    equals(messages[1].kind, "log");
    assertInstanceOf(messages[1], LogMessage);
    const logMessage2 = messages[1] as LogMessage;
    equals(logMessage2.error, undefined);
    equals(logMessage2.message, "test");
    equals(logMessage2.level, LogLevel.Info);

    loggingBus.info("test", "arg1", "arg2");
    equals(messages.length, 3);
    equals(messages[2].kind, "log");
    assertInstanceOf(messages[2], LogMessage);
    const logMessage3 = messages[2] as LogMessage;
    equals(logMessage3.error, undefined);
    equals(logMessage3.message, "test");
    equals(logMessage3.level, LogLevel.Info);
    equals(logMessage3.args, ["arg1", "arg2"]);
});

Deno.test("send debug", () => {
    const messages: Message[] = [];
    loggingBus.addListener((message) => {
        messages.push(message);
    });

    const error = new Error("test error");
    loggingBus.debug(error, "test");

    equals(messages.length, 1);
    equals(messages[0].kind, "log");
    assertInstanceOf(messages[0], LogMessage);
    const logMessage = messages[0] as LogMessage;
    equals(logMessage.error, error);
    equals(logMessage.message, "test");
    equals(logMessage.level, LogLevel.Debug);

    loggingBus.debug("test");
    equals(messages.length, 2);
    equals(messages[1].kind, "log");
    assertInstanceOf(messages[1], LogMessage);
    const logMessage2 = messages[1] as LogMessage;
    equals(logMessage2.error, undefined);
    equals(logMessage2.message, "test");
    equals(logMessage2.level, LogLevel.Debug);

    loggingBus.debug("test", "arg1", "arg2");
    equals(messages.length, 3);
    equals(messages[2].kind, "log");
    assertInstanceOf(messages[2], LogMessage);
    const logMessage3 = messages[2] as LogMessage;
    equals(logMessage3.error, undefined);
    equals(logMessage3.message, "test");
    equals(logMessage3.level, LogLevel.Debug);
    equals(logMessage3.args, ["arg1", "arg2"]);
});

Deno.test("remove listener", () => {
    const messages: Message[] = [];
    const listener = (message: Message) => {
        messages.push(message);
    };
    loggingBus.addListener(listener);

    loggingBus.send(new Message("test"));
    equals(messages.length, 1);

    loggingBus.removeListener(listener);
    loggingBus.send(new Message("test"));
    equals(messages.length, 1);
});

Deno.test("remove listener twice", () => {
    const messages: Message[] = [];
    const listener = (message: Message) => {
        messages.push(message);
    };
    loggingBus.addListener(listener);

    loggingBus.send(new Message("test"));
    equals(messages.length, 1);

    loggingBus.removeListener(listener);
    loggingBus.send(new Message("test"));
    equals(messages.length, 1);

    loggingBus.removeListener(listener);
    loggingBus.send(new Message("test"));
    equals(messages.length, 1);
});

Deno.test("set level", () => {
    loggingBus.setLevel(LogLevel.Error);
    equals(loggingBus.isEnabled(LogLevel.Error), true);
    equals(loggingBus.isEnabled(LogLevel.Warn), false);

    loggingBus.setLevel(LogLevel.Warn);
    equals(loggingBus.isEnabled(LogLevel.Error), true);
    equals(loggingBus.isEnabled(LogLevel.Warn), true);
    equals(loggingBus.isEnabled(LogLevel.Info), false);
});
