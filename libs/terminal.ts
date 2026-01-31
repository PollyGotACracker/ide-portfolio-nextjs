import { LogType, Log } from "../types/Terminal";

export function methods(name: string) {
    const cmd = name.split(" ");
    const key = alias[cmd[0]] || name;
    if (!(key in methodsObj)) {
        return `${key}: command not found`;
    }
    return methodsObj[key as keyof typeof methodsObj](cmd[1]);
}

let id = 0;
export function createLog({ type, text, path }: { type: LogType, text: string; path: string; }) {
    const log: Log = {
        id,
        type,
        text,
        path
    };
    id++;
    return log;
}

const methodsObj = {
    hello() { return "hi!"; },
    echo(value: string) { return value; },
    find(value: string) { return `find ${value}`; },
    download() { return "download"; },
};

const alias: Record<string, string> = {
    "hello": "hello",
    "echo": "echo",
    "find": "find",
    "download": "download",
};


