
export type LogType = "input" | "output";
export interface Log {
    id: number;
    type: LogType;
    text: string;
    path: string;
}