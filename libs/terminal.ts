import { Dispatch, SetStateAction } from "react";
import { Log } from "../types/Terminal";
import { useRouter } from 'next/navigation';
import { HOME_HEADINGS } from "@/constants/label";
import { PATHS } from "@/constants/path";
import CONFIG from "@/constants/config";

type SetLogs = Dispatch<SetStateAction<Log[][]>>;
type Router = ReturnType<typeof useRouter>;
type CreateLogParams = Omit<Log, "id">;
interface CreateMethodsParams {
  setLogs: SetLogs;
  router: Router;
}

export class CreateTerminal {
  private inputs: string[] = [];
  private setLogs!: SetLogs;
  private router!: Router;

  private id: number = 0;
  private cmdIndex = -1;
  private headingMap = new Map(Object.values(HOME_HEADINGS).map((i) => [i.label, i.id]));

  create({
    setLogs, router }: CreateMethodsParams) {
    this.setLogs = setLogs;
    this.router = router;
  };

  private get methods() {
    const { router, setLogs, headingMap, downloadFile } = this;
    return {
      help() {
        return [
          `Available commands:`,
          `   about           Print profile`,
          `   echo <text>     Print text`,
          `   cd <page>       Navigate to page`,
          // `   grep <keyword>  Search contents`,
          `   wget <file>     Download pdf file`,
          `       portfolio`,
          `   clear           Clear terminal`,
        ].join('\n');
      },
      about() {
        return [
          `> ${CONFIG.NICKNAME}'s Portfolio v1.0`,
          `> Frontend Developer`,
          `> Contact: ${CONFIG.NEXT_PUBLIC_EMAIL}`,
        ].join('\n');
      },
      echo(value: string) { return value; },
      cd(value: string) {
        if (!value) {
          return router.push(`/`);
        }

        const headingId = headingMap.get(value);
        if (headingId) {
          return router.push(`#${headingId}`);
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
      // grep(value: string) { return `find ${value}`; },
      wget(filename: string) {
        switch (filename) {
          case "portfolio":
            return downloadFile(filename, "pdf");
          default:
            return `bash: wget: ${filename}: No such file`;
        }
      },
      clear() { setLogs([]); }
    };
  };

  private alias: Record<string, string> = {};

  private createLog({ type, text, path }: CreateLogParams) {
    const log: Log = {
      id: this.id,
      type,
      text,
      path
    };
    this.id++;
    return log;
  }

  private downloadFile(filename: string, ext: string) {
    const link = document.createElement('a');
    link.href = `${PATHS.STATIC_FILES}/${filename}.${ext}`;
    link.download = `${filename}.pdf`;
    link.click();
  };

  exec(name: string) {
    const [cmd, ...rest] = name.split(" ");
    const args = rest.join(" ");
    const key = this.alias[cmd] ?? cmd;
    if (!(key in this.methods)) {
      return `bash: ${key}: command not found\nType 'help' to see available commands`;
    }
    return this.methods[key as keyof typeof this.methods](args);
  };

  insertInput({ text, path }: Pick<CreateLogParams, "text" | "path">) {
    this.inputs.push(text);
    this.setLogs((prev) => {
      this.cmdIndex = prev.length + 1;
      const item = this.createLog({ type: "input", text, path });
      return [...prev, [item]];
    });
  }

  insertOutput({ text }: Pick<CreateLogParams, "text">) {
    this.setLogs((prev) => {
      const last = prev.at(-1)!;
      const item = this.createLog({ type: "output", text, path: last[0].path });
      return [...prev.slice(0, -1), [...last, item]];
    });
  }

  updateOutput({ text }: Pick<CreateLogParams, "text">) {
    this.setLogs((prev) => {
      const last = [...prev.at(-1)!];
      const newItem = { ...last.at(-1)!, text };
      return prev.with(-1, last.with(-1, newItem));
    });
  }

  get prevCmd() {
    if (this.inputs.length === 0 || this.cmdIndex === 0) return;
    this.cmdIndex--;
    return this.inputs[this.cmdIndex];
  }

  get nextCmd() {
    if (this.inputs.length === 0 || this.cmdIndex === this.inputs.length) return;
    this.cmdIndex++;
    const req = this.inputs?.[this.cmdIndex];
    return req ?? "";
  }
};

const terminal = new CreateTerminal();
export default terminal;