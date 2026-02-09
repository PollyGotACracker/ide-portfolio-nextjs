import fs from 'fs/promises';
import path from 'path';

export function getDir(...paths: string[]) {
  const dataDir = process.env.NODE_ENV === "production" ? ["data", "prod"] : ["data", "dev"];
  const resultPath = path.join(process.cwd(), ...dataDir, ...paths);
  return resultPath;
}

export async function getJson<T>(file: string): Promise<T> {
  const jsonPath = getDir(file);
  const data = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(data);
}