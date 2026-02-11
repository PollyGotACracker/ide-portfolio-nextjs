import { DATA_DIR_DEV, DATA_DIR_PROD } from '@/constants/dir';
import fs from 'fs/promises';
import path from 'path';

export function getDir(...paths: string[]) {
  const dataDir = process.env.NODE_ENV === "production" ? DATA_DIR_PROD : DATA_DIR_DEV;
  const resultPath = path.join(process.cwd(), ...dataDir, ...paths);
  return resultPath;
}

export async function getJson<T>(file: string): Promise<T> {
  const jsonPath = getDir(file);
  const data = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(data);
}