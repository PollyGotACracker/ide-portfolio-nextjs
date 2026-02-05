"use client";

import styles from "./Terminal.module.css";
import { JetBrains_Mono } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Log, LogType } from "../types/Terminal";
import { checkWindows } from "@/libs/checker";
import terminal from "@/libs/terminal";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const DynamicPromptText = dynamic(() => Promise.resolve(PromptText), {
  ssr: false,
  loading: () => <p className={styles.prompt} />
});

export default function Terminal() {
  const router = useRouter();
  const pathname = usePathname();
  const isWindows = checkWindows();
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const [logs, setLogs] = useState<Log[][]>([]);


  useEffect(() => {
    terminal.create({ setLogs, router });
    if (commandRef.current) {
      commandRef.current.focus();
    }
  }, [setLogs, router]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [logs]);

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const req = e.currentTarget.value;
      if (!req) return;

      terminal.insertInput({ text: req, path: pathname });
      const res = terminal.exec(req);
      if (res) {
        terminal.insertOutput({ text: res });
      }
      e.currentTarget.value = "";
    }
    if (e.key === "ArrowUp") {
      const value = terminal.prevCmd;
      if (value !== undefined) {
        e.currentTarget.value = value;
      }
    }
    if (e.key === "ArrowDown") {
      const value = terminal.nextCmd;
      if (value !== undefined) {
        e.currentTarget.value = value;
      }
    }
  }
  return (
    <div className={`${styles.terminal} ${jetBrainsMono.variable} scrollbarHidden`} ref={terminalRef}>
      <ul className={styles.logs}>
        {logs.length > 0 &&
          logs.map((log) => (
            <li className={styles.item} key={log[0].id}>
              <DynamicPromptText path={log[0].path} isWindows={isWindows} />
              {log.map((sublog, index) => (
                <LogText
                  key={sublog.id + index}
                  type={sublog.type}
                  text={sublog.text}
                />
              ))}
            </li>
          ))}
      </ul>
      <DynamicPromptText path={pathname} isWindows={isWindows} />
      <label className={styles.input} htmlFor="command">
        <input
          className={styles.command}
          ref={commandRef}
          id="command"
          name="command"
          onKeyDown={handleEnter}
          autoComplete="off"
          spellCheck="false"
        />
      </label>
    </div>
  );
}

function PromptText({ path, isWindows }: { path: string; isWindows: boolean; }) {
  const displayPath = path === '/' ? '~' : `~${path}`;
  return (
    <p className={styles.prompt}>
      <span className={styles.user}>portfolio@guest</span>
      {isWindows && <span className={styles.os}>MINGW64</span>}
      <span className={styles.path}>{displayPath}</span>
      <span className={styles.branch}>(master)</span>
    </p>
  );
}

function LogText({ type, text }: { type: LogType; text: string; }) {
  return <p className={styles[type]}>{text}</p>;
}