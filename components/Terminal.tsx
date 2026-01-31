"use client";

import styles from "./Terminal.module.css";
import { useEffect, useRef, useState } from "react";
import { Log, LogType } from "../types/Terminal";
import { createLog, methods } from "../libs/terminal";
import { checkWindows } from "@/libs/checker";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const DynamicPromptText = dynamic(() => Promise.resolve(PromptText), {
  ssr: false,
  loading: () => <p className={styles.prompt} />
});

export default function Terminal() {
  const pathname = usePathname();
  const isWindows = checkWindows();
  const terminalRef = useRef<HTMLElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const indexRef = useRef<number>(-1);
  const [logs, setLogs] = useState<Log[][]>([]);

  useEffect(() => {
    if (commandRef.current) {
      commandRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [logs]);

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const req = e.currentTarget.value;
      if (!req) return;

      const res = methods(req);
      setLogs((prev) => {
        indexRef.current = prev.length + 1;
        return [
          ...prev,
          [
            createLog({ type: "input", text: req, path: pathname }),
            createLog({ type: "output", text: res, path: pathname }),
          ],
        ];
      });
      e.currentTarget.value = "";
    }
    if (e.key === "ArrowUp") {
      if (logs.length === 0 || indexRef.current === 0) return;
      indexRef.current--;
      e.currentTarget.value = logs[indexRef.current][0].text;
    }
    if (e.key === "ArrowDown") {
      if (logs.length === 0 || indexRef.current === logs.length) return;
      const idx = indexRef.current + 1;
      const req = logs?.[idx]?.[0]?.text;
      e.currentTarget.value = req ?? "";
      indexRef.current = idx;
    }
  }
  return (
    <section className={styles.terminal} ref={terminalRef}>
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
      <div className={styles.input}>
        <input
          className={styles.command}
          ref={commandRef}
          onKeyDown={handleEnter}
          autoComplete="false"
        />
      </div>
    </section>
  );
}

function PromptText({ path, isWindows }: { path: string; isWindows: boolean; }) {
  return (
    <p className={styles.prompt}>
      <span className={styles.user}>Portfolio@Guest</span>
      {isWindows && <span className={styles.os}>MINGW64</span>}
      <span className={styles.path}>{`~${path}`}</span>
      <span className={styles.branch}>(master)</span>
    </p>
  );
}

function LogText({ type, text }: { type: LogType; text: string; }) {
  return <p className={styles[type]}>{text}</p>;
}