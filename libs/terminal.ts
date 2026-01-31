import { Dispatch, SetStateAction } from "react";
import { LogType, Log } from "../types/Terminal";

import { useRouter } from 'next/navigation';

type Router = ReturnType<typeof useRouter>;
export function createMethods({ router, setLogs }: { router: Router, setLogs: Dispatch<SetStateAction<Log[][]>>; }) {
  const methodsObj = {
    help() {
      return [
        `Available commands:`,
        `   about           Print profile`,
        `   echo <text>     Print text`,
        `   cd <page>       Navigate to page`,
        `   grep <keyword>  Search contents`,
        `   wget            Download portfolio`,
        `   clear           Clear terminal`,
      ].join('\n');
    },
    about() {
      return [
        `╔══════════════════════════════════════╗`,
        `║ ${process.env.NEXT_PUBLIC_NAME}'s Portfolio v1.0 ║`,
        `║ Frontend Developer                   ║`,
        `║ Contact: ${process.env.NEXT_PUBLIC_EMAIL}        ║`,
        `╚══════════════════════════════════════╝`,
      ].join('\n');
    },
    echo(value: string) { return value; },
    cd(value: string) {
      if (!value) {
        return router.push(`/`);
      }
      switch (value) {
        case ".":
          return;
        case "":
        case "~":
        case "/":
        case "~/":
        case "..":
          return router.push(`/`);
        case "/log":
        case "log":
          return router.push(`/log`);
        default:
          return `bash: cd: ${value}: No such page`;
      }
    },
    grep(value: string) { return `find ${value}`; },
    wget() { return "download"; },
    clear() { setLogs([]); }
  };

  return function (name: string) {
    const cmd = name.split(" ");
    const key = alias[cmd[0]] ?? cmd[0];
    if (!(key in methodsObj)) {
      return `bash: ${key}: command not found\nType 'help' to see available commands`;
    }
    return methodsObj[key as keyof typeof methodsObj](cmd[1]);
  };
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


const alias: Record<string, string> = {};


